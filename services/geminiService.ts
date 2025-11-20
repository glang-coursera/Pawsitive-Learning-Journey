
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QuestionType, LessonContent, UserProfile, Course, Lesson } from '../types';
import { MARKET_COURSE, DATA_SCIENCE_COURSE } from '../data/courses';

// --- Course Generation Schemas ---

const lessonSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
  },
  required: ["title", "description"]
};

const unitSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    lessons: { type: Type.ARRAY, items: lessonSchema }
  },
  required: ["title", "description", "lessons"]
};

const courseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    topic: { type: Type.STRING },
    units: { type: Type.ARRAY, items: unitSchema }
  },
  required: ["topic", "units"]
};

// --- Course Generation ---

export const generateCourseOutline = async (userProfile: UserProfile): Promise<Course | null> => {
  const goalLower = userProfile.goal.toLowerCase();

  // SPECIAL PATH: Market
  if (goalLower.includes('market')) {
    return MARKET_COURSE;
  }

  // SPECIAL PATH: Data Science
  if (goalLower.includes('data') && (goalLower.includes('science') || goalLower.includes('scientist') || goalLower.includes('engineer') || goalLower.includes('analy'))) {
    return DATA_SCIENCE_COURSE;
  }

  if (!process.env.API_KEY) throw new Error("API Key missing");
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Create a structured course outline for a user with the following profile:
    Goal: ${userProfile.goal}
    Background: ${userProfile.background}

    Requirements:
    1. Course Topic Name: Professional and concise.
    2. Structure: exactly 3 Units.
    3. Content: 2-3 Lessons per Unit.
    4. Tone: Educational and encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: courseSchema
        }
    });
    
    const data = JSON.parse(response.text || "{}");
    
    if (!data.topic || !data.units) return null;

    // Hydrate with IDs, colors, and default states
    const courseId = crypto.randomUUID();
    const colors = ['bg-brand', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-sky-500'];

    const units = data.units.map((u: any, idx: number) => ({
        id: crypto.randomUUID(),
        title: u.title,
        description: u.description,
        color: colors[idx % colors.length],
        lessons: (u.lessons || []).map((l: any, lIdx: number) => ({
            id: crypto.randomUUID(),
            title: l.title,
            description: l.description,
            isCompleted: false,
            // Unlock only the first lesson of the first unit
            isLocked: !(idx === 0 && lIdx === 0)
        }))
    }));

    return {
        id: courseId,
        topic: data.topic,
        units
    };

  } catch (e) {
    console.error("Course generation failed", e);
    return null;
  }
};

// --- Lesson Content Generation ---

const questionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    type: { type: Type.STRING, enum: [QuestionType.MULTIPLE_CHOICE, QuestionType.TRUE_FALSE, QuestionType.FILL_IN_BLANK, QuestionType.MATCHING] },
    prompt: { type: Type.STRING, description: "The question text. For MATCHING, say 'Match the pairs'." },
    options: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }, 
      description: "For MC/TF: List of choices. For MATCHING: List of strings in 'Term :: Definition' format (e.g. 'Cat :: Gato'). For FILL_IN_BLANK: List of word choices." 
    },
    correctAnswer: { type: Type.STRING, description: "The correct answer string. For MATCHING, leave empty or put 'MATCH_ALL'." },
    explanation: { type: Type.STRING, description: "Why this answer is correct." },
  },
  required: ["type", "prompt", "options", "correctAnswer", "explanation"]
};

const lessonContentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    theory: { 
      type: Type.STRING, 
      description: "A short, engaging educational text (approx 150 words) explaining the key concepts. Use Markdown." 
    },
    questions: {
      type: Type.ARRAY,
      items: questionSchema,
      description: "List of 3 questions testing the theory. ALWAYS include at least one MATCHING question."
    }
  },
  required: ["theory", "questions"]
};

export const generateLessonContent = async (courseTopic: string, lesson: Lesson, userProfile?: UserProfile): Promise<LessonContent> => {
  
  // STATIC OVERRIDE: If the lesson already has pre-generated content (e.g. MARKET_COURSE), use it.
  if (lesson.content) {
    return lesson.content;
  }

  if (!process.env.API_KEY) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let userContext = "";
  if (userProfile) {
    userContext = `
    ADAPTATION INSTRUCTIONS:
    The user is a ${userProfile.background} trying to ${userProfile.goal}. 
    Explain concepts using analogies relevant to their background if possible.
    `;
  }

  const prompt = `Create content for lesson "${lesson.title}" in course "${courseTopic}".
  ${userContext}
  1. Theory: clear, bite-sized explanation.
  2. Questions: 3 interactive questions. Mix Multiple Choice, True/False, Fill-in-Blank, and Matching.
  For Matching questions, provide exactly 3 pairs in the options array using '::' separator.
  Keep tone encouraging.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonContentSchema,
      }
    });

    const data = JSON.parse(response.text || "{}");
    
    return {
      theory: data.theory,
      questions: (data.questions || []).map((q: any) => ({
        ...q,
        id: crypto.randomUUID()
      }))
    };

  } catch (error) {
    console.error("Lesson generation failed", error);
    return {
      theory: "We couldn't generate the lesson theory right now. But you can still try the questions!",
      questions: [
        {
          id: 'err-1',
          type: QuestionType.TRUE_FALSE,
          prompt: "Gemini helps power this app.",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "It's the AI behind the scenes!"
        }
      ]
    };
  }
};
