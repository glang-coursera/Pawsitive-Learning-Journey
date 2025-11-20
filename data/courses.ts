
import { Course, QuestionType } from '../types';

export const COURSES: Course[] = [
  {
    id: 'python-basics',
    topic: 'Python for Beginners',
    units: [
      {
        id: 'u1-python',
        title: 'Introduction to Python',
        description: 'Learn the basics of Python syntax and variables.',
        color: 'bg-brand',
        lessons: [
          {
            id: 'l1-python-vars',
            title: 'Variables and Data Types',
            description: 'Understanding how to store data in Python.',
            isCompleted: false,
            isLocked: false
          },
          {
            id: 'l2-python-ops',
            title: 'Basic Operators',
            description: 'Performing math and logic operations.',
            isCompleted: false,
            isLocked: true
          },
          {
            id: 'l3-python-str',
            title: 'Working with Strings',
            description: 'Manipulating text data.',
            isCompleted: false,
            isLocked: true
          }
        ]
      },
      {
        id: 'u2-python',
        title: 'Control Flow',
        description: 'Mastering loops and conditional statements.',
        color: 'bg-sky-500',
        lessons: [
          {
            id: 'l4-python-if',
            title: 'If Statements',
            description: 'Making decisions in your code.',
            isCompleted: false,
            isLocked: true
          },
          {
            id: 'l5-python-loops',
            title: 'For and While Loops',
            description: 'Repeating actions efficiently.',
            isCompleted: false,
            isLocked: true
          }
        ]
      },
      {
        id: 'u3-python',
        title: 'Functions & Modules',
        description: 'Organizing reusable code.',
        color: 'bg-purple-500',
        lessons: [
          {
            id: 'l6-python-func',
            title: 'Defining Functions',
            description: 'Creating your own commands.',
            isCompleted: false,
            isLocked: true
          },
          {
            id: 'l7-python-import',
            title: 'Importing Modules',
            description: 'Using external libraries.',
            isCompleted: false,
            isLocked: true
          }
        ]
      }
    ]
  }
];

export const MARKET_COURSE: Course = {
  id: 'gen-ai-content-creation',
  topic: "Generative AI Content Creation",
  units: [
    {
      id: 'u1-genai-intro',
      title: "Introduction to Generative AI",
      description: "Learn the fundamentals of Generative AI technology and tools.",
      color: "bg-brand",
      lessons: [
        {
          id: 'l1-what-is-genai',
          title: "What is Generative AI",
          description: "Understanding the core concepts of generative technology.",
          isCompleted: false,
          isLocked: false,
          content: {
            theory: "## Understanding Generative AI\n\nGenerative AI is a type of artificial intelligence technology that can produce various types of content, including text, imagery, audio, and synthetic data. Unlike traditional AI, which focuses on recognizing patterns and making predictions (like classifying emails as spam), Generative AI creates **new** content.\n\nIt works by learning patterns from existing data and using that knowledge to generate new, original artifacts that resemble the training data but are not identical to it. This technology is powering a revolution in creative workflows, enabling creators to ideate faster and produce content more efficiently.",
            questions: [
              {
                id: 'q1-genai-def',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What is the primary difference between Traditional AI and Generative AI?",
                options: ["Traditional AI creates new content, Generative AI analyzes patterns", "Traditional AI analyzes patterns, Generative AI creates new content", "There is no difference", "Generative AI is only for images"],
                correctAnswer: "Traditional AI analyzes patterns, Generative AI creates new content",
                explanation: "Traditional AI is discriminative (analyzing), while Generative AI is creative (producing)."
              },
              {
                id: 'q3-genai-match',
                type: QuestionType.MATCHING,
                prompt: "Match the concept to its definition.",
                options: [
                  "Generative AI :: Creates new data",
                  "Discriminative AI :: Classifies existing data",
                  "Training Data :: Information AI learns from",
                  "Output :: The content AI produces"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "These are the fundamental components of the AI ecosystem."
              },
              {
                id: 'q4-genai-fill',
                type: QuestionType.FILL_IN_BLANK,
                prompt: "Generative AI learns from ___ to create new content.",
                options: ["Patterns", "Nothing", "Magic", "Hardware"],
                correctAnswer: "Patterns",
                explanation: "AI identifies statistical patterns in training data to generate new outputs."
              }
            ]
          }
        },
        {
          id: 'l2-firefly',
          title: "What is Adobe Firefly",
          description: "Introduction to Adobe's family of creative generative AI models.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Adobe Firefly\n\nAdobe Firefly is a family of creative generative AI models coming to Adobe products, focusing initially on image and text effect generation. \n\nWhat makes Firefly unique is its training data. It is trained on Adobe Stock images, openly licensed content, and public domain content where copyright has expired. This creates a commercially safe model for creators. Firefly is designed to give creators a superpower to work at the speed of their imagination.",
            questions: [
              {
                id: 'q1-firefly-train',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What is Adobe Firefly primarily trained on?",
                options: ["Random internet images", "Adobe Stock and open license content", "Private user data", "Social media posts"],
                correctAnswer: "Adobe Stock and open license content",
                explanation: "This ensures the content generated is safe for commercial use."
              },
              {
                id: 'q3-firefly-match',
                type: QuestionType.MATCHING,
                prompt: "Match the Firefly feature to its description.",
                options: [
                  "Text to Image :: Generate images from words",
                  "Text Effects :: Apply styles to letters",
                  "Commercial Safety :: Safe for business use",
                  "Adobe Stock :: Training source"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "These are key attributes of the Firefly ecosystem."
              },
              {
                id: 'q5-firefly-mc',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "Where can you find Adobe Firefly features?",
                options: ["Only in Photoshop", "In Adobe Creative Cloud apps", "Only in a web browser", "It is a standalone hardware"],
                correctAnswer: "In Adobe Creative Cloud apps",
                explanation: "Firefly is integrated into apps like Photoshop, Illustrator, and Express."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'u2-express',
      title: "Generative AI in Adobe Express",
      description: "Practical applications of GenAI in creative workflows.",
      color: 'bg-purple-500',
      lessons: [
        {
          id: 'l1-ideate',
          title: "Ideate and create quickly",
          description: "Speed up your creative process with AI tools.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Rapid Ideation in Adobe Express\n\nAdobe Express integrates Firefly to allow users to generate text effects and images directly within their workflows. This significantly speeds up the **ideation phase**.\n\nInstead of searching for hours for the perfect stock photo, you can describe what you need and generate options in seconds. This allows for rapid prototyping of different concepts, moods, and styles before settling on a final direction for your project.",
            questions: [
              {
                id: 'q1-ideate-benefit',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What is the main benefit of GenAI in Express for ideation?",
                options: ["It makes the file size smaller", "Rapid prototyping of concepts", "It automatically posts to social media", "It edits video faster"],
                correctAnswer: "Rapid prototyping of concepts",
                explanation: "You can visualize ideas instantly without searching for assets."
              },
              {
                id: 'q3-ideate-match',
                type: QuestionType.MATCHING,
                prompt: "Match the workflow step to the AI benefit.",
                options: [
                  "Brainstorming :: Visualizing concepts instantly",
                  "Asset Creation :: Custom images on demand",
                  "Refining :: Quick variations",
                  "Final Polish :: Smart edits"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "AI enhances every stage of the creative process."
              },
              {
                id: 'q4-ideate-fill',
                type: QuestionType.FILL_IN_BLANK,
                prompt: "Adobe Express uses ___ language prompts to generate content.",
                options: ["Natural", "Binary", "Coding", "Complex"],
                correctAnswer: "Natural",
                explanation: "You simply type what you want to see in plain English."
              }
            ]
          }
        },
        {
          id: 'l2-gen-image',
          title: "What is generate image?",
          description: "Creating images from text descriptions.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Text-to-Image Generation\n\n'Generate Image' is a feature that converts a text description (a prompt) into a visual image. \n\nIn Adobe Express, you select the 'Text to Image' tool, type a description like 'a futuristic city with flying cars at sunset', and the AI renders distinct variations based on that text. You can then choose an art style (e.g., photo, art, graphic) and an aspect ratio to fit your needs.",
            questions: [
              {
                id: 'q1-t2i-input',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What is the input for the Generate Image feature?",
                options: ["A reference image", "A text prompt", "A voice command", "A video file"],
                correctAnswer: "A text prompt",
                explanation: "You describe the image using text."
              },
              {
                id: 'q3-t2i-match',
                type: QuestionType.MATCHING,
                prompt: "Match the parameter to its effect.",
                options: [
                  "Prompt :: The content description",
                  "Aspect Ratio :: The shape of the image",
                  "Content Type :: Photo or Art style",
                  "Variation :: Alternative version"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "These controls help refine the generated output."
              },
              {
                id: 'q5-t2i-mc',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "If the result isn't right, what should you do?",
                options: ["Give up", "Refine the prompt", "Restart the computer", "Pay more"],
                correctAnswer: "Refine the prompt",
                explanation: "Adjusting your text description gives the AI better instructions."
              }
            ]
          }
        },
        {
          id: 'l3-prompts',
          title: "Working with prompts",
          description: "How to write effective text prompts.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## The Art of Prompting\n\nA **prompt** is the text instruction you give to the Generative AI. The quality of the output depends heavily on the quality of your prompt.\n\n**Best Practices:**\n1. **Be Specific:** Instead of 'a dog', try 'a golden retriever puppy sitting on a porch'.\n2. **Describe Style:** Add keywords like 'cinematic lighting', 'oil painting', or 'minimalist'.\n3. **Set the Mood:** Use words like 'cheerful', 'gloomy', or 'energetic'.\n\nThe more descriptive you are, the closer the result will be to your vision.",
            questions: [
              {
                id: 'q1-prompt-def',
                type: QuestionType.FILL_IN_BLANK,
                prompt: "A ___ is the text instruction you give to the AI.",
                options: ["Prompt", "Code", "Script", "Tag"],
                correctAnswer: "Prompt",
                explanation: "It is the primary way to communicate with the model."
              },
              {
                id: 'q2-prompt-better',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "Which prompt is likely to yield better results?",
                options: ["Cat", "A fluffy white cat sitting on a velvet blue sofa, warm lighting", "Animal", "Blue thing"],
                correctAnswer: "A fluffy white cat sitting on a velvet blue sofa, warm lighting",
                explanation: "It includes subject, details, and lighting context."
              },
              {
                id: 'q3-prompt-match',
                type: QuestionType.MATCHING,
                prompt: "Match the prompt element to an example.",
                options: [
                  "Subject :: A red sports car",
                  "Style :: Cyberpunk aesthetic",
                  "Lighting :: Golden hour sun",
                  "Composition :: Wide angle shot"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "Combining these elements creates a complete prompt."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'u3-responsible',
      title: "Using AI responsibly",
      description: "Ethics, safety, and best practices.",
      color: 'bg-orange-500',
      lessons: [
        {
          id: 'l1-authenticity',
          title: "Content authenticity",
          description: "Verifying and trusting AI content.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Content Credentials\n\nAs AI-generated content becomes more common, transparency is crucial. **Content Credentials** (CR) act like a digital 'nutrition label' for content. \n\nThey are secure metadata attached to a file that discloses who created it, when, and what tools were used (including AI). This helps build trust by allowing viewers to verify the origin of an image and understand if AI played a role in its creation.",
            questions: [
              {
                id: 'q1-cr-def',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What is the purpose of Content Credentials?",
                options: ["To increase file size", "To track user location", "To provide transparency about content origin", "To block downloads"],
                correctAnswer: "To provide transparency about content origin",
                explanation: "It helps viewers know how content was made."
              },
              {
                id: 'q2-cr-tf',
                type: QuestionType.TRUE_FALSE,
                prompt: "Content Credentials can indicate if AI was used to create an image.",
                options: ["True", "False"],
                correctAnswer: "True",
                explanation: "They explicitly list AI tools used in the process."
              },
              {
                id: 'q3-cr-match',
                type: QuestionType.MATCHING,
                prompt: "Match the term to its meaning.",
                options: [
                  "Transparency :: Being open about methods",
                  "Metadata :: Data about data",
                  "Verification :: Checking the truth",
                  "Trust :: Result of transparency"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "These are key concepts in digital ethics."
              }
            ]
          }
        },
        {
          id: 'l2-ownership',
          title: "Ownership and safety",
          description: "Legal considerations and guidelines.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Commercial Safety and Ownership\n\nWhen using Generative AI for work, you need to know if you have the rights to use the output. \n\nTools like Adobe Firefly are trained on licensed images to ensure that the outputs are safe for commercial use. This means you can use the images in ads, websites, and products without worrying about copyright strikes from the training data. Always check the terms of service of the specific AI tool you are using.",
            questions: [
              {
                id: 'q1-safe-comm',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "Why is Adobe Firefly considered commercially safe?",
                options: ["It's expensive", "It's trained on licensed content", "It's fast", "It's new"],
                correctAnswer: "It's trained on licensed content",
                explanation: "This mitigates copyright risks for users."
              },
              {
                id: 'q3-safe-match',
                type: QuestionType.MATCHING,
                prompt: "Match the stakeholder to their concern.",
                options: [
                  "Creator :: Right to use output",
                  "Business :: Avoiding lawsuits",
                  "Artist :: Credit for style",
                  "Platform :: Safe training data"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "Responsible AI balances these needs."
              },
              {
                id: 'q5-safe-mc',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What allows businesses to confidently use Firefly assets?",
                options: ["Indemnification", "Secrecy", "Low cost", "Speed"],
                correctAnswer: "Indemnification",
                explanation: "Enterprise users often get legal protection (indemnification) from Adobe."
              }
            ]
          }
        },
        {
          id: 'l3-prompts-adv',
          title: "Working with prompts",
          description: "Responsible prompting techniques.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Responsible Prompting\n\nResponsible AI usage also involves the user. When writing prompts, avoid generating content that reinforces harmful stereotypes, violence, or bias. \n\nGood AI tools have 'guardrails' to prevent the generation of offensive content, but users should also practice ethical prompting. Be mindful of how you describe people and cultures, aiming for inclusivity and respect in your creative outputs.",
            questions: [
              {
                id: 'q1-resp-guard',
                type: QuestionType.FILL_IN_BLANK,
                prompt: "AI tools use ___ to prevent generating offensive content.",
                options: ["Guardrails", "Walls", "Viruses", "Nets"],
                correctAnswer: "Guardrails",
                explanation: "These are safety filters built into the model."
              },
              {
                id: 'q2-resp-tf',
                type: QuestionType.TRUE_FALSE,
                prompt: "The user is responsible for the intent of their prompt.",
                options: ["True", "False"],
                correctAnswer: "True",
                explanation: "Tools facilitate creation, but the user guides the direction."
              },
              {
                id: 'q3-resp-match',
                type: QuestionType.MATCHING,
                prompt: "Match the action to the ethical principle.",
                options: [
                  "Diverse description :: Inclusivity",
                  "Avoiding stereotypes :: Fairness",
                  "Safety filters :: Harm reduction",
                  "User intent :: Responsibility"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "These align with ethical AI principles."
              }
            ]
          }
        }
      ]
    }
  ]
};

export const DATA_SCIENCE_COURSE: Course = {
  id: 'gen-ai-data-science',
  topic: "Generative AI for Data Scientists",
  units: [
    {
      id: 'u1-ds-intro',
      title: "GenAI for Data Teams",
      description: "Explore the fundamentals and applications of Generative AI in data science.",
      color: "bg-blue-500",
      lessons: [
        {
          id: 'l1-ds-understanding',
          title: "Understanding Generative Models",
          description: "Learn the basics of generative models and their relevance in data science.",
          isCompleted: false,
          isLocked: false,
          content: {
            theory: "## Generative vs. Discriminative AI\n\nFor Data Scientists, understanding the distinction between **Discriminative** and **Generative** models is fundamental. \n\nDiscriminative models model the conditional probability **P(Y|X)**—they learn the boundary between classes (e.g., 'Is this transaction fraudulent?'). Generative models, however, model the joint probability **P(X,Y)** or just **P(X)**. They learn the underlying distribution of the data itself, allowing them to generate new data points that statistically resemble the training set. This capability opens up new avenues for data augmentation, simulation, and anomaly detection.",
            questions: [
              {
                id: 'q1-ds-dist',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What probability does a Generative model primarily learn?",
                options: ["P(Y|X) - The boundary", "P(X) - The distribution", "P(Error) - The noise", "None of the above"],
                correctAnswer: "P(X) - The distribution",
                explanation: "Generative models learn the distribution of the input data to create new samples."
              },
              {
                id: 'q2-ds-match',
                type: QuestionType.MATCHING,
                prompt: "Match the model type to its task.",
                options: [
                  "Discriminative :: Classify an image",
                  "Generative :: Create a new image",
                  "Regression :: Predict a value",
                  "Clustering :: Group similar data"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "Discriminative separates, Generative creates."
              },
              {
                id: 'q3-ds-tf',
                type: QuestionType.TRUE_FALSE,
                prompt: "Generative models can be used for data augmentation.",
                options: ["True", "False"],
                correctAnswer: "True",
                explanation: "They can generate synthetic examples to balance datasets."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'u2-ds-apps',
      title: "Elevate Your Data Science Career",
      description: "Discover how to implement Generative AI techniques in your data projects.",
      color: "bg-purple-500",
      lessons: [
        {
          id: 'l1-ds-realworld',
          title: "Real-World Applications",
          description: "Investigate case studies showcasing the impact of Generative AI.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## GenAI Applications in Data Science\n\nBeyond text and image generation, GenAI is transforming core data science workflows.\n\n1. **Synthetic Data Generation**: Creating privacy-compliant datasets for testing or training other models where real data is scarce or sensitive (e.g., financial records).\n2. **Code Generation**: Using LLMs to write boilerplate SQL queries, optimize Python pandas code, or document complex legacy codebases.\n3. **Anomaly Detection**: Generative models can learn 'normal' patterns so well that they identify anomalies by checking which data points have low probability under the learned distribution.",
            questions: [
              {
                id: 'q1-app-syn',
                type: QuestionType.FILL_IN_BLANK,
                prompt: "___ data is artificially created data that mimics real-world data properties.",
                options: ["Synthetic", "Raw", "Big", "Dirty"],
                correctAnswer: "Synthetic",
                explanation: "It is useful for privacy and augmentation."
              },
              {
                id: 'q2-app-match',
                type: QuestionType.MATCHING,
                prompt: "Match the use case to the benefit.",
                options: [
                  "Synthetic Data :: Privacy preservation",
                  "Code Gen :: Increased productivity",
                  "Anomaly Detection :: Fraud identification",
                  "Summarization :: Faster reporting"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "GenAI solves different problems in the data pipeline."
              },
              {
                id: 'q3-app-mc',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "How does a generative model detect anomalies?",
                options: ["By finding data with low probability", "By deleting data", "By asking a human", "By crashing"],
                correctAnswer: "By finding data with low probability",
                explanation: "Outliers do not fit the learned 'normal' distribution."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'u3-ds-tech',
      title: "Generative AI Techniques",
      description: "Deep dive into various techniques of Generative AI.",
      color: "bg-green-500",
      lessons: [
        {
          id: 'l1-ds-vae',
          title: "Variational Autoencoders Explained",
          description: "Understand the principles behind VAEs.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Variational Autoencoders (VAEs)\n\nVAEs are a foundational architecture in modern generative AI. Unlike a standard autoencoder that compresses data into a fixed point, a VAE compresses data into a **probability distribution** (usually Gaussian) in the latent space.\n\nThis consists of two parts:\n1. **Encoder**: Maps input data to a mean and variance vector.\n2. **Decoder**: Samples from that distribution to reconstruct the data.\n\nBecause the latent space is continuous and smooth, we can sample from the gaps between known data points to generate entirely new, valid data samples.",
            questions: [
              {
                id: 'q1-vae-comp',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What does the Encoder in a VAE output?",
                options: ["A compressed image", "Mean and Variance parameters", "A label", "A SQL query"],
                correctAnswer: "Mean and Variance parameters",
                explanation: "It maps the input to a distribution, not a single point."
              },
              {
                id: 'q2-vae-match',
                type: QuestionType.MATCHING,
                prompt: "Match the VAE component to its function.",
                options: [
                  "Encoder :: Input to Latent Space",
                  "Decoder :: Latent Space to Output",
                  "Latent Space :: Compressed representation",
                  "Reconstruction Loss :: Measures error"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "These components work together to learn the data manifold."
              },
              {
                id: 'q3-vae-tf',
                type: QuestionType.TRUE_FALSE,
                prompt: "VAEs allow for generating new data by sampling from the latent space.",
                options: ["True", "False"],
                correctAnswer: "True",
                explanation: "The continuous latent space is key to generation."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'u4-ds-gemini',
      title: "Gemini for Data Analysts",
      description: "Learn how Gemini can assist in advanced data analysis tasks.",
      color: "bg-red-500",
      lessons: [
        {
          id: 'l1-ds-workflow',
          title: "Integrating Gemini into Your Workflow",
          description: "Practical ways to incorporate Gemini into daily processes.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Gemini in the Data Loop\n\nGoogle's Gemini is a multimodal model, meaning it can process text, code, and images. For data scientists, this is powerful.\n\n**Example Workflow:**\n1. **Data Cleaning**: Pass dirty JSON logs to Gemini and ask it to extract structured fields.\n2. **Semantic Search**: Use embeddings API to turn text data into vectors for similarity search.\n3. **Reporting**: Upload a chart image to Gemini and ask it to generate a textual summary of the trends for a stakeholder presentation.\n\nIntegrating these API calls directly into Python notebooks accelerates the time from raw data to insight.",
            questions: [
              {
                id: 'q1-gem-multi',
                type: QuestionType.FILL_IN_BLANK,
                prompt: "Gemini is a ___ model, capable of understanding text, code, and images.",
                options: ["Multimodal", "Linear", "Simple", "Regression"],
                correctAnswer: "Multimodal",
                explanation: "It handles multiple types of input data simultaneously."
              },
              {
                id: 'q2-gem-match',
                type: QuestionType.MATCHING,
                prompt: "Match the task to the Gemini capability.",
                options: [
                  "Chart Analysis :: Image understanding",
                  "Log Parsing :: text-to-structure",
                  "Semantic Search :: Embeddings",
                  "Coding :: Code generation"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "Gemini is a versatile tool for the data stack."
              },
              {
                id: 'q3-gem-mc',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "How can Gemini help with unstructured text data?",
                options: ["It can't", "It can extract structured entities", "It deletes it", "It encrypts it"],
                correctAnswer: "It can extract structured entities",
                explanation: "It is excellent at parsing unstructured info into JSON/tables."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'u5-ds-eng',
      title: "Data Engineering with Generative AI",
      description: "Explore advanced techniques combining data engineering and generative AI.",
      color: "bg-yellow-500",
      lessons: [
        {
          id: 'l1-ds-pipelines',
          title: "Building Data Pipelines with AI",
          description: "Utilize Generative AI for building efficient data pipelines.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Intelligent Data Pipelines\n\nTraditional ETL (Extract, Transform, Load) pipelines are rigid. If the input format changes, the pipeline breaks. GenAI allows for **Self-Healing Pipelines**.\n\nAn AI agent in the pipeline can analyze an error message or a schema mismatch, infer the necessary transformation, and dynamically adjust the code or the mapping logic to keep the data flowing. Furthermore, LLMs can be used as a 'Transformation' step to summarize large text blobs or perform sentiment analysis on the fly as data streams in.",
            questions: [
              {
                id: 'q1-pipe-etl',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What does ETL stand for?",
                options: ["Extract, Transform, Load", "Eat, Train, Live", "Enter, Test, Loop", "Easy, Technical, Logical"],
                correctAnswer: "Extract, Transform, Load",
                explanation: "The standard process for moving data."
              },
              {
                id: 'q2-pipe-heal',
                type: QuestionType.TRUE_FALSE,
                prompt: "GenAI can help create self-healing pipelines that adapt to schema changes.",
                options: ["True", "False"],
                correctAnswer: "True",
                explanation: "AI can interpret errors and suggest fixes dynamically."
              },
              {
                id: 'q3-pipe-match',
                type: QuestionType.MATCHING,
                prompt: "Match the pipeline stage to the AI value add.",
                options: [
                  "Ingestion :: Schema inference",
                  "Transformation :: Unstructured text processing",
                  "Monitoring :: Anomaly explanation",
                  "Orchestration :: Dynamic scheduling"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "AI enhances every step of data engineering."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'u6-ds-forecast',
      title: "GenAI for Data Scientists",
      description: "Investigate the impact of GenAI on traditional data science methods.",
      color: "bg-indigo-500",
      lessons: [
        {
          id: 'l1-ds-forecast-tech',
          title: "GenAI Techniques for Enhanced Forecasting",
          description: "Utilize GenAI methods to improve forecasting models.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## Synthetic Scenarios for Forecasting\n\nForecasting often fails when 'black swan' events occur (events not seen in historical data). GenAI improves forecasting resilience by generating **Synthetic Scenarios**.\n\nA data scientist can prompt a model to generate realistic data for hypothetical scenarios (e.g., 'generate sales data if a competitor lowers prices by 20%'). By training forecasting models on both historical and these diverse synthetic futures, the models become more robust and generalize better to unseen conditions.",
            questions: [
              {
                id: 'q1-fore-swan',
                type: QuestionType.FILL_IN_BLANK,
                prompt: "A '___ swan' event is a rare, unpredictable event.",
                options: ["Black", "White", "Red", "Blue"],
                correctAnswer: "Black",
                explanation: "Historical data often lacks these rare events."
              },
              {
                id: 'q2-fore-match',
                type: QuestionType.MATCHING,
                prompt: "Match the concept to the forecasting benefit.",
                options: [
                  "Synthetic Scenarios :: Stress testing",
                  "Historical Data :: Baseline trends",
                  "GenAI :: Creating hypothetical data",
                  "Robustness :: Performance in new conditions"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "Combining real and synthetic data builds better models."
              },
              {
                id: 'q3-fore-mc',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "Why use synthetic data in forecasting?",
                options: ["To prepare for events not in history", "Because real data is expensive", "To make the graph look better", "It is required by law"],
                correctAnswer: "To prepare for events not in history",
                explanation: "It helps model behavior in edge cases."
              }
            ]
          }
        }
      ]
    },
    {
      id: 'u7-ai-eng',
      title: "Intro to AI Engineering",
      description: "An introduction to the principles and practices of AI engineering.",
      color: "bg-teal-500",
      lessons: [
        {
          id: 'l1-ai-lifecycle',
          title: "AI Engineering Lifecycle",
          description: "Explore the lifecycle of AI engineering, from inception to deployment.",
          isCompleted: false,
          isLocked: true,
          content: {
            theory: "## The AI Engineering Lifecycle\n\nAI Engineering is the discipline of making AI work in the real world. It moves beyond just training a model (Data Science) to deploying, monitoring, and maintaining it reliably.\n\n**Key Stages:**\n1. **Data Preparation**: Sourcing and cleaning.\n2. **Model Development**: Training and experimenting.\n3. **Deployment**: Serving the model via API.\n4. **Monitoring**: Tracking drift and performance.\n5. **Retraining**: Updating the model with new data.\n\nGenAI introduces new challenges here, such as 'Prompt Engineering' and managing 'Hallucinations' in production.",
            questions: [
              {
                id: 'q1-life-drift',
                type: QuestionType.MULTIPLE_CHOICE,
                prompt: "What is 'Model Drift'?",
                options: ["When model performance degrades over time", "When the model moves servers", "When the code is deleted", "A racing game"],
                correctAnswer: "When model performance degrades over time",
                explanation: "Real-world data changes, causing old models to fail."
              },
              {
                id: 'q2-life-match',
                type: QuestionType.MATCHING,
                prompt: "Match the stage to the activity.",
                options: [
                  "Deployment :: Exposing an API",
                  "Monitoring :: Checking accuracy",
                  "Development :: Training weights",
                  "Data Prep :: Cleaning CSVs"
                ],
                correctAnswer: "MATCH_ALL",
                explanation: "A robust lifecycle covers all these bases."
              },
              {
                id: 'q3-life-tf',
                type: QuestionType.TRUE_FALSE,
                prompt: "AI Engineering focuses only on training the model.",
                options: ["True", "False"],
                correctAnswer: "False",
                explanation: "It focuses on the entire production lifecycle, especially deployment and maintenance."
              }
            ]
          }
        }
      ]
    }
  ]
};
