import { OnlineWorksheet, SequencingCard, CauseEffectPair } from '../components/Worksheets/types';
import { getStoryBySlug } from './StoryContent';
import { buildOnlineWorksheetsForStory } from '../utils/StoryBuilder';

// Sequencing cards for "The Pencil"
const pencilSequencingCards: SequencingCard[] = [
  {
    id: 'lost-found',
    text: 'Narrator finds a strange pencil in the Lost & Found',
    correctOrder: 1
  },
  {
    id: 'draws-cat',
    text: 'Narrator draws a black cat in their notebook',
    correctOrder: 2
  },
  {
    id: 'cat-appears',
    text: 'A real black cat appears at the classroom window',
    correctOrder: 3
  },
  {
    id: 'draws-spill',
    text: 'Narrator draws a water bottle spilling',
    correctOrder: 4
  },
  {
    id: 'bottle-spills',
    text: 'A real water bottle spills in the exact same way',
    correctOrder: 5
  },
  {
    id: 'teacher-speaks',
    text: 'Teacher says the strange phrase about pencils',
    correctOrder: 6
  },
  {
    id: 'pencil-draws',
    text: 'The pencil makes drawing sounds by itself',
    correctOrder: 7
  }
];

// Cause and Effect pairs for "The Pencil"
const pencilCauseEffectPairs: CauseEffectPair[] = [
  {
    id: 'draws-cat',
    cause: 'The narrator draws a black cat on the windowsill',
    effect: '' // Student fills in: A real black cat appears at the window
  },
  {
    id: 'draws-spill',
    cause: 'The narrator sketches a water bottle spilling',
    effect: '' // Student fills in: A real water bottle spills in the exact same way
  },
  {
    id: 'ignores-pencil',
    cause: 'The narrator tries to ignore the pencil all night',
    effect: '' // Student fills in: The pencil draws by itself and makes scratching sounds
  }
];

// Grade 3 Worksheet for "The Pencil"
export const pencilGrade3Worksheet: OnlineWorksheet = {
  id: 'the-pencil-grade3',
  storyId: 'the-pencil',
  title: 'The Pencil - Grade 3 Activities',
  grade: 3,
  sections: [
    {
      id: 'story-elements',
      title: '📖 Story Elements',
      type: 'story-elements',
      grade: 3,
      solStandards: ['3.5'],
      timeEstimate: '15 minutes',
      instructions: 'Think about the story you just read. Fill in each box with information about that part of the story.',
      questions: [],
      customProps: {
        elements: [
          {
            id: 'characters',
            label: 'Characters',
            question: 'Who are the main people in the story?',
            lines: 2
          },
          {
            id: 'setting',
            label: 'Setting',
            question: 'Where and when does the story take place?',
            lines: 2
          },
          {
            id: 'problem',
            label: 'Problem',
            question: 'What is the main problem in the story?',
            lines: 2
          },
          {
            id: 'solution',
            label: 'Solution',
            question: 'How does the problem get solved (or not solved)?',
            lines: 2
          }
        ]
      }
    },
    {
      id: 'sequencing',
      title: '🔢 Put Events in Order',
      type: 'sequencing',
      grade: 3,
      solStandards: ['3.5'],
      timeEstimate: '10 minutes',
      instructions: 'Drag and drop the events to put them in the correct order from the story.',
      questions: [],
      customProps: {
        cards: pencilSequencingCards
      }
    },
    {
      id: 'vocabulary',
      title: '📝 Vocabulary from Context',
      type: 'vocabulary',
      grade: 3,
      solStandards: ['3.6'],
      timeEstimate: '15 minutes',
      instructions: 'Read each sentence and use context clues to determine what the bold word means.',
      questions: [
        {
          id: 'vocab-1',
          question: 'The pencil had this weird silvery shimmer in the grain.',
          fields: [
            {
              id: 'shimmer-meaning',
              type: 'text',
              label: 'I think "shimmer" means:',
              placeholder: 'Write your guess here...'
            }
          ]
        },
        {
          id: 'vocab-2',
          question: 'The cat looked curious. Hungry, maybe.',
          fields: [
            {
              id: 'curious-meaning',
              type: 'text',
              label: 'I think "curious" means:',
              placeholder: 'Write your guess here...'
            }
          ]
        },
        {
          id: 'vocab-3',
          question: 'It must be a coincidence that the cat appeared after I drew it.',
          fields: [
            {
              id: 'coincidence-meaning',
              type: 'text',
              label: 'I think "coincidence" means:',
              placeholder: 'Write your guess here...'
            }
          ]
        }
      ]
    },
    {
      id: 'drawing',
      title: '🎨 Draw & Describe',
      type: 'drawing',
      grade: 3,
      solStandards: ['3.5'],
      timeEstimate: '20 minutes',
      instructions: 'Draw your favorite scene from "The Pencil", then write 3 sentences describing your drawing.',
      questions: []
    }
  ]
};

// Grade 4 Worksheet for "The Pencil"
export const pencilGrade4Worksheet: OnlineWorksheet = {
  id: 'the-pencil-grade4',
  storyId: 'the-pencil',
  title: 'The Pencil - Grade 4 Activities',
  grade: 4,
  sections: [
    {
      id: 'cause-effect',
      title: '➡️ Cause and Effect',
      type: 'cause-effect',
      grade: 4,
      solStandards: ['4.5'],
      timeEstimate: '20 minutes',
      instructions: 'Complete the cause and effect chains from the story. Think about what happened and what resulted from each action.',
      questions: [],
      customProps: {
        pairs: pencilCauseEffectPairs
      }
    },
    {
      id: 'theme-detective',
      title: '🔍 Theme Detective',
      type: 'custom',
      grade: 4,
      solStandards: ['4.5'],
      timeEstimate: '25 minutes',
      instructions: 'Use clues from the story to determine the author\'s message about creativity and consequences.',
      questions: [
        {
          id: 'theme-clues',
          question: 'What clues in the story help you understand the theme?',
          fields: [
            {
              id: 'clue-1',
              type: 'textarea',
              label: 'Clue 1: The pencil brings drawings to life',
              placeholder: 'What does this teach us about creativity?',
              lines: 2
            },
            {
              id: 'clue-2',
              type: 'textarea',
              label: 'Clue 2: The drawings have unexpected results',
              placeholder: 'What lesson does this show?',
              lines: 2
            },
            {
              id: 'clue-3',
              type: 'textarea',
              label: 'Clue 3: The pencil draws by itself at night',
              placeholder: 'What warning does this give us?',
              lines: 2
            }
          ]
        },
        {
          id: 'theme-statement',
          question: 'Based on these clues, what is the theme of "The Pencil"?',
          fields: [
            {
              id: 'theme',
              type: 'textarea',
              placeholder: 'The theme of this story is...',
              lines: 3
            }
          ]
        }
      ]
    },
    {
      id: 'character-analysis',
      title: '👤 Character Analysis',
      type: 'custom',
      grade: 4,
      solStandards: ['4.5'],
      timeEstimate: '20 minutes',
      instructions: 'Analyze the narrator\'s character traits and support each one with evidence from the story.',
      questions: [
        {
          id: 'character-traits',
          question: 'What kind of person is the narrator? Use evidence from the story!',
          fields: [
            {
              id: 'trait-1',
              type: 'text',
              label: 'Character Trait 1:',
              placeholder: 'curious, creative, cautious, etc.'
            },
            {
              id: 'evidence-1',
              type: 'textarea',
              label: 'Evidence from the story:',
              lines: 2
            },
            {
              id: 'trait-2',
              type: 'text',
              label: 'Character Trait 2:',
              placeholder: 'another trait...'
            },
            {
              id: 'evidence-2',
              type: 'textarea',
              label: 'Evidence from the story:',
              lines: 2
            },
            {
              id: 'trait-3',
              type: 'text',
              label: 'Character Trait 3:',
              placeholder: 'another trait...'
            },
            {
              id: 'evidence-3',
              type: 'textarea',
              label: 'Evidence from the story:',
              lines: 2
            }
          ]
        }
      ]
    },
    {
      id: 'creative-writing',
      title: '✍️ Creative Writing Prompt',
      type: 'creative-writing',
      grade: 4,
      solStandards: ['4.6'],
      timeEstimate: '30 minutes',
      instructions: 'Write a short story about finding your own magical art tool. What would you create? What might go wrong?',
      questions: [
        {
          id: 'writing-prompt',
          question: 'If you found a magical art tool like the pencil, what would you create? Write a story (5-8 sentences) about what happens.',
          fields: [
            {
              id: 'story',
              type: 'textarea',
              lines: 12
            }
          ]
        }
      ]
    }
  ]
};

// Grade 5 Worksheet for "The Pencil"
export const pencilGrade5Worksheet: OnlineWorksheet = {
  id: 'the-pencil-grade5',
  storyId: 'the-pencil',
  title: 'The Pencil - Grade 5 Activities',
  grade: 5,
  sections: [
    {
      id: 'inference',
      title: '🧠 Inference Questions',
      type: 'custom',
      grade: 5,
      solStandards: ['5.5'],
      timeEstimate: '25 minutes',
      instructions: 'Read between the lines! What can you figure out that the author doesn\'t directly tell you?',
      questions: [
        {
          id: 'inference-1',
          question: 'Why do you think the pencil was in the Lost & Found?',
          fields: [
            {
              id: 'inference',
              type: 'textarea',
              label: 'Your inference:',
              lines: 2
            },
            {
              id: 'evidence',
              type: 'textarea',
              label: 'Evidence that supports this:',
              lines: 2
            }
          ]
        },
        {
          id: 'inference-2',
          question: 'What do you think will happen to the next person who finds the pencil?',
          fields: [
            {
              id: 'inference',
              type: 'textarea',
              label: 'Your inference:',
              lines: 2
            },
            {
              id: 'evidence',
              type: 'textarea',
              label: 'Evidence that supports this:',
              lines: 2
            }
          ]
        },
        {
          id: 'inference-3',
          question: 'Why doesn\'t the narrator throw the pencil away?',
          fields: [
            {
              id: 'prediction',
              type: 'textarea',
              label: 'Your inference:',
              lines: 2
            },
            {
              id: 'clues',
              type: 'textarea',
              label: 'Clues from the story:',
              lines: 2
            }
          ]
        }
      ]
    },
    {
      id: 'plot-mountain',
      title: '⛰️ Plot Mountain',
      type: 'plot-mountain',
      grade: 5,
      solStandards: ['5.5'],
      timeEstimate: '20 minutes',
      instructions: 'Identify the main events that make up the story\'s plot structure.',
      questions: [],
      customProps: {}
    },
    {
      id: 'figurative-language',
      title: '🎨 Figurative Language Hunt',
      type: 'custom',
      grade: 5,
      solStandards: ['5.5'],
      timeEstimate: '25 minutes',
      instructions: 'Find examples of descriptive language that creates mood and imagery in the story.',
      questions: [
        {
          id: 'example-given',
          question: 'Here\'s an example of figurative language from the story:',
          fields: [
            {
              id: 'example-text',
              type: 'text',
              label: 'Example: "The pencil had this weird silvery shimmer in the grain"',
              placeholder: 'This creates a mysterious mood'
            },
            {
              id: 'example-meaning',
              type: 'textarea',
              label: 'What it means/why the author used it:',
              placeholder: 'The unusual description makes the pencil seem magical and otherworldly',
              lines: 2
            }
          ]
        },
        {
          id: 'find-your-own',
          question: 'Now find your own examples:',
          fields: [
            {
              id: 'student-example-1',
              type: 'textarea',
              label: 'Example 1 from the story:',
              lines: 2
            },
            {
              id: 'type-1',
              type: 'text',
              label: 'Type of figurative language:',
              placeholder: 'descriptive language, simile, metaphor, etc.'
            },
            {
              id: 'meaning-1',
              type: 'textarea',
              label: 'What it means/why the author used it:',
              lines: 2
            },
            {
              id: 'student-example-2',
              type: 'textarea',
              label: 'Example 2 from the story:',
              lines: 2
            },
            {
              id: 'type-2',
              type: 'text',
              label: 'Type of figurative language:',
              placeholder: 'descriptive language, simile, metaphor, etc.'
            },
            {
              id: 'meaning-2',
              type: 'textarea',
              label: 'What it means/why the author used it:',
              lines: 2
            }
          ]
        }
      ]
    },
    {
      id: 'alternate-ending',
      title: '✍️ Write an Alternate Ending',
      type: 'custom',
      grade: 5,
      solStandards: ['5.6'],
      timeEstimate: '30 minutes',
      instructions: 'Starting from when the narrator first hears the pencil drawing at night, write a different ending that maintains the story\'s mood.',
      questions: [
        {
          id: 'alternate-ending',
          question: 'Write your alternate ending:',
          fields: [
            {
              id: 'new-ending',
              type: 'textarea',
              placeholder: 'That night, when I heard the pencil drawing by itself...',
              lines: 15
            }
          ]
        }
      ]
    }
  ]
};

// Helper function to get worksheet by story and grade - now uses template system
export const getOnlineWorksheet = (storySlug: string, grade: 3 | 4 | 5): OnlineWorksheet | null => {
  // Return specific worksheets for each story
  if (storySlug === 'the-pencil') {
    switch (grade) {
      case 3: return pencilGrade3Worksheet;
      case 4: return pencilGrade4Worksheet;
      case 5: return pencilGrade5Worksheet;
    }
  }

  // Fallback to template system for other stories
  const worksheets = getStoryWorksheets(storySlug);
  const result = worksheets.find(w => w.grade === grade) || null;
  return result;
};

// Get all available worksheets for a story - now uses template system
export const getStoryWorksheets = (storySlug: string): OnlineWorksheet[] => {
  // Return specific worksheets for each story
  if (storySlug === 'the-pencil') {
    return [pencilGrade3Worksheet, pencilGrade4Worksheet, pencilGrade5Worksheet];
  }

  // Fallback to template system for other stories
  const storyContent = getStoryBySlug(storySlug);
  if (!storyContent) {
    return [];
  }

  // Use the new template system to build worksheets
  return buildOnlineWorksheetsForStory(storyContent);
};