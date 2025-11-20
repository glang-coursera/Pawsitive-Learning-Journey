
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  FILL_IN_BLANK = 'FILL_IN_BLANK',
  MATCHING = 'MATCHING'
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  options: string[]; // For MC and Matching (shuffled)
  correctAnswer: string | string[]; // String for MC, array for complex types
  explanation?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string; // Emoji char
  description: string;
  unlockedAt: number;
}

export interface LessonContent {
  theory: string;
  questions: Question[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  questions?: Question[]; // Populated on demand
  content?: LessonContent; // Static content injection
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string; // Tailwind class, e.g., 'bg-green-500'
  lessons: Lesson[];
}

export interface Course {
  id: string;
  topic: string;
  units: Unit[];
}

export interface UserProfile {
  goal: string;
  background: string;
  petPreference: 'dog' | 'cat';
}

export interface UserProgress {
  xp: number;
  streak: number;
  hearts: number;
  gems: number;
  food: number;
  foodEatenProgress: number; // Tracks progress to next level (0-5)
  mascotLevel: 1 | 2 | 3; // 1=Baby, 2=Teen, 3=Adult
  currentCourseId?: string;
  completedLessonIds: string[];
  badges: Badge[];
}
