import { OnlineWorksheet, SequencingCard, CauseEffectPair } from '../components/Worksheets/types';

// Sequencing cards for "The Forgotten Door"
const forgottenDoorSequencingCards: SequencingCard[] = [
  {
    id: 'supply-closet',
    text: 'Dani goes to the supply closet to get a microscope kit',
    correctOrder: 1
  },
  {
    id: 'finds-door',
    text: 'Dani discovers a mysterious wooden door in the closet',
    correctOrder: 2
  },
  {
    id: 'first-change',
    text: 'Ava is back in class and Trevor has disappeared',
    correctOrder: 3
  },
  {
    id: 'pizza-lunch',
    text: 'Dani finds pizza in her lunch bag instead of her usual sandwich',
    correctOrder: 4
  },
  {
    id: 'finds-key',
    text: 'Dani discovers a brass key in her lunch bag',
    correctOrder: 5
  },
  {
    id: 'enters-hallway',
    text: 'Dani unlocks the door and enters the hallway of drawers',
    correctOrder: 6
  },
  {
    id: 'name-disappears',
    text: 'Dani realizes her name is missing from everything',
    correctOrder: 7
  },
  {
    id: 'escapes',
    text: 'Dani runs from the hallway back to the real world',
    correctOrder: 8
  }
];

// Cause and Effect pairs for "The Forgotten Door"
const forgottenDoorCauseEffectPairs: CauseEffectPair[] = [
  {
    id: 'door-appears',
    cause: 'Dani enters the supply closet looking for a microscope kit',
    effect: '' // Student fills in: A mysterious door appears that wasn't there before
  },
  {
    id: 'uses-door',
    cause: 'Dani touches the drawer labeled "Lunchtime"',
    effect: '' // Student fills in: Her lunch changes and reality shifts around her
  },
  {
    id: 'keeps-changing',
    cause: 'Dani continues to use the door to make her life "better"',
    effect: '' // Student fills in: Parts of her identity start disappearing
  },
  {
    id: 'runs-away',
    cause: 'Dani sees her name drawer is empty',
    effect: '' // Student fills in: She realizes the danger and runs back to reality
  }
];

// Grade 3 Worksheet for "The Forgotten Door"
export const forgottenDoorGrade3Worksheet: OnlineWorksheet = {
  id: 'forgotten-door-grade3',
  storyId: 'forgotten-door',
  title: 'The Forgotten Door - Grade 3 Activities',
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
        cards: forgottenDoorSequencingCards
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
          question: 'The door was painted a kind of gray that looked like it had forgotten how to be any other color.',
          fields: [
            {
              id: 'forgotten-meaning',
              type: 'text',
              label: 'I think "forgotten" means:',
              placeholder: 'Write your guess here...'
            }
          ]
        },
        {
          id: 'vocab-2',
          question: 'She felt like someone had moved her half an inch to the left—like the world was mostly the same, but not quite.',
          fields: [
            {
              id: 'quite-meaning',
              type: 'text',
              label: 'I think "not quite" means:',
              placeholder: 'Write your guess here...'
            }
          ]
        },
        {
          id: 'vocab-3',
          question: 'The hallway pulsed and the drawers shimmered.',
          fields: [
            {
              id: 'shimmered-meaning',
              type: 'text',
              label: 'I think "shimmered" means:',
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
      instructions: 'Draw your favorite scene from the story, then write 3 sentences describing your drawing.',
      questions: []
    }
  ]
};

// Grade 4 Worksheet for "The Forgotten Door"
export const forgottenDoorGrade4Worksheet: OnlineWorksheet = {
  id: 'forgotten-door-grade4',
  storyId: 'forgotten-door',
  title: 'The Forgotten Door - Grade 4 Activities',
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
        pairs: forgottenDoorCauseEffectPairs
      }
    },
    {
      id: 'theme-detective',
      title: '🔍 Theme Detective',
      type: 'custom',
      grade: 4,
      solStandards: ['4.5'],
      timeEstimate: '25 minutes',
      instructions: 'Use clues from the story to determine the author\'s message about choices and consequences.',
      questions: [
        {
          id: 'theme-clues',
          question: 'What clues in the story help you understand the theme?',
          fields: [
            {
              id: 'clue-1',
              type: 'textarea',
              label: 'Clue 1: Dani can change things but can\'t control them',
              placeholder: 'What does this teach us?',
              lines: 2
            },
            {
              id: 'clue-2',
              type: 'textarea',
              label: 'Clue 2: Each change has unexpected consequences',
              placeholder: 'What lesson does this show?',
              lines: 2
            },
            {
              id: 'clue-3',
              type: 'textarea',
              label: 'Clue 3: Dani almost loses herself completely',
              placeholder: 'What warning does this give us?',
              lines: 2
            }
          ]
        },
        {
          id: 'theme-statement',
          question: 'Based on these clues, what is the theme of "The Forgotten Door"?',
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
      instructions: 'Analyze Dani\'s character traits and support each one with evidence from the story.',
      questions: [
        {
          id: 'character-traits',
          question: 'What kind of person is Dani? Use evidence from the story!',
          fields: [
            {
              id: 'trait-1',
              type: 'text',
              label: 'Character Trait 1:',
              placeholder: 'curious, brave, lonely, etc.'
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
      instructions: 'Write a short story about finding your own magical door. What would you be tempted to change? What might go wrong?',
      questions: [
        {
          id: 'writing-prompt',
          question: 'If you found a door like Dani\'s, what would you change about your life? Write a story (5-8 sentences) about what happens.',
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

// Grade 5 Worksheet for "The Forgotten Door"
export const forgottenDoorGrade5Worksheet: OnlineWorksheet = {
  id: 'forgotten-door-grade5',
  storyId: 'forgotten-door',
  title: 'The Forgotten Door - Grade 5 Activities',
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
          question: 'Why do you think the door only appeared for Dani?',
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
          question: 'What do you think the whisper "Make it better" really wanted?',
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
          question: 'What do you think will happen after the story ends?',
          fields: [
            {
              id: 'prediction',
              type: 'textarea',
              label: 'Your prediction:',
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
              label: 'Example: "The image burned in her mind like static on a screen"',
              placeholder: 'This is a simile'
            },
            {
              id: 'example-meaning',
              type: 'textarea',
              label: 'What it means/why the author used it:',
              placeholder: 'The memory is stuck and uncomfortable, like TV static',
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
              placeholder: 'simile, metaphor, personification, etc.'
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
              placeholder: 'simile, metaphor, personification, etc.'
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
      instructions: 'Starting from "That night, Dani lay in bed...", write a different ending that maintains the story\'s mood.',
      questions: [
        {
          id: 'alternate-ending',
          question: 'Write your alternate ending:',
          fields: [
            {
              id: 'new-ending',
              type: 'textarea',
              placeholder: 'That night, Dani lay in bed...',
              lines: 15
            }
          ]
        }
      ]
    }
  ]
};

// Helper function to get worksheet by story and grade
export const getOnlineWorksheet = (storySlug: string, grade: 3 | 4 | 5): OnlineWorksheet | null => {
  const worksheetId = `${storySlug}-grade${grade}`;

  switch (worksheetId) {
    case 'forgotten-door-grade3':
      return forgottenDoorGrade3Worksheet;
    case 'forgotten-door-grade4':
      return forgottenDoorGrade4Worksheet;
    case 'forgotten-door-grade5':
      return forgottenDoorGrade5Worksheet;
    default:
      return null;
  }
};

// Get all available worksheets for a story
export const getStoryWorksheets = (storySlug: string): OnlineWorksheet[] => {
  const worksheets: OnlineWorksheet[] = [];

  for (let grade = 3; grade <= 5; grade++) {
    const worksheet = getOnlineWorksheet(storySlug, grade as 3 | 4 | 5);
    if (worksheet) {
      worksheets.push(worksheet);
    }
  }

  return worksheets;
};