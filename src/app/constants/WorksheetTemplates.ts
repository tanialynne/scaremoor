// Worksheet template definitions that can be reused across stories
export interface WorksheetTemplate {
  id: string;
  name: string;
  type: 'story-elements' | 'sequencing' | 'vocabulary' | 'drawing' | 'cause-effect' |
        'theme-detective' | 'character-analysis' | 'creative-writing' | 'inference' |
        'plot-mountain' | 'figurative-language' | 'alternate-ending' | 'custom';
  grade: 3 | 4 | 5;
  title: string;
  description: string;
  instructions: string;
  timeEstimate: string;
  solStandards: string[];
  activityType: 'comprehension' | 'vocabulary' | 'creative-writing' | 'analysis' | 'art' | 'game';
  materials?: string[];
  customProps?: Record<string, unknown>;
}

export interface FunActivityTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  skills: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  componentType: 'word-search' | 'story-bingo' | 'cryptogram' | 'word-scramble' |
                 'crossword' | 'hidden-message' | 'custom';
  customProps?: Record<string, unknown>;
}

// Grade 3 Templates
export const GRADE_3_TEMPLATES: WorksheetTemplate[] = [
  {
    id: 'story-elements-3',
    name: 'Story Elements',
    type: 'story-elements',
    grade: 3,
    title: 'Story Elements',
    description: 'Identify characters, setting, problem, and solution',
    instructions: 'Every story has important parts called story elements. Complete the story elements chart by identifying who is in the story (characters), where and when it happens (setting), what goes wrong (problem), and how it gets fixed (solution). Use details from the story to support your answers.',
    timeEstimate: '15 minutes',
    solStandards: ['3.5'],
    activityType: 'comprehension',
    customProps: {
      templateText: 'Story elements are the building blocks of every story. They help us understand what happens and why. When you read any story, you can find these four important parts:',
      examples: {
        characters: {
          definition: 'The people, animals, or creatures in the story',
          examples: ['The main character who the story is about', 'Friends or family members', 'Animals that can talk', 'Villains or people causing problems']
        },
        setting: {
          definition: 'Where and when the story takes place',
          examples: ['A magical forest in ancient times', 'A modern school during the school year', 'A house during a thunderstorm', 'A spaceship in the future']
        },
        problem: {
          definition: 'The main trouble or challenge that needs to be solved',
          examples: ['A character is lost and needs to find their way home', 'Friends have an argument and stop talking', 'A magical object is stolen', 'Someone is being bullied at school']
        },
        solution: {
          definition: 'How the problem gets solved or what happens at the end',
          examples: ['The character asks for help and finds their way', 'Friends apologize and make up', 'The hero recovers the stolen object', 'Adults help stop the bullying']
        }
      }
    }
  },
  {
    id: 'sequencing-3',
    name: 'Sequencing Cards',
    type: 'sequencing',
    grade: 3,
    title: 'Sequencing Cards',
    description: 'Put story events in correct order',
    instructions: 'Cut out the event cards and arrange them in the order they happened in the story.',
    timeEstimate: '10 minutes',
    materials: ['Scissors', 'Event cards'],
    solStandards: ['3.5'],
    activityType: 'comprehension'
  },
  {
    id: 'vocabulary-context-3',
    name: 'Vocabulary from Context',
    type: 'vocabulary',
    grade: 3,
    title: 'Vocabulary from Context',
    description: 'Guess word meanings from story context',
    instructions: 'Read each sentence and use context clues to determine what the bold word means.',
    timeEstimate: '15 minutes',
    solStandards: ['3.6'],
    activityType: 'vocabulary'
  },
  {
    id: 'draw-describe-3',
    name: 'Draw & Describe',
    type: 'drawing',
    grade: 3,
    title: 'Draw & Describe',
    description: 'Illustrate a scene from the story',
    instructions: 'Draw your favorite scene from the story, then write 3 sentences describing your drawing.',
    timeEstimate: '20 minutes',
    materials: ['Drawing materials'],
    solStandards: ['3.5'],
    activityType: 'art'
  }
];

// Grade 4 Templates
export const GRADE_4_TEMPLATES: WorksheetTemplate[] = [
  {
    id: 'cause-effect-4',
    name: 'Cause and Effect',
    type: 'cause-effect',
    grade: 4,
    title: 'Cause and Effect',
    description: 'Identify cause and effect relationships in the story',
    instructions: 'Complete the cause and effect charts showing how actions led to specific consequences.',
    timeEstimate: '20 minutes',
    solStandards: ['4.5'],
    activityType: 'analysis'
  },
  {
    id: 'theme-detective-4',
    name: 'Theme Detective',
    type: 'theme-detective',
    grade: 4,
    title: 'Theme Detective',
    description: 'Identify the story\'s theme using text evidence',
    instructions: 'Use clues from the story to determine the author\'s message.',
    timeEstimate: '25 minutes',
    solStandards: ['4.5'],
    activityType: 'analysis'
  },
  {
    id: 'character-analysis-4',
    name: 'Character Analysis',
    type: 'character-analysis',
    grade: 4,
    title: 'Character Analysis',
    description: 'Analyze character traits with evidence',
    instructions: 'Identify character traits and support each one with evidence from the story.',
    timeEstimate: '20 minutes',
    solStandards: ['4.5'],
    activityType: 'analysis'
  },
  {
    id: 'creative-writing-4',
    name: 'Creative Writing Prompt',
    type: 'creative-writing',
    grade: 4,
    title: 'Creative Writing Prompt',
    description: 'Write about finding your own magical object',
    instructions: 'Write a short story about finding your own magical object. What would you be tempted to change?',
    timeEstimate: '30 minutes',
    solStandards: ['4.6'],
    activityType: 'creative-writing'
  }
];

// Grade 5 Templates
export const GRADE_5_TEMPLATES: WorksheetTemplate[] = [
  {
    id: 'inference-5',
    name: 'Inference Questions',
    type: 'inference',
    grade: 5,
    title: 'Inference Questions',
    description: 'Make inferences about unstated information',
    instructions: 'Read between the lines to answer questions about what the author implies but doesn\'t directly state.',
    timeEstimate: '25 minutes',
    solStandards: ['5.5'],
    activityType: 'analysis'
  },
  {
    id: 'plot-mountain-5',
    name: 'Plot Mountain',
    type: 'plot-mountain',
    grade: 5,
    title: 'Plot Mountain',
    description: 'Chart the story\'s plot structure',
    instructions: 'Identify the exposition, rising action, climax, falling action, and resolution on the plot diagram.',
    timeEstimate: '20 minutes',
    solStandards: ['5.5'],
    activityType: 'analysis'
  },
  {
    id: 'figurative-language-5',
    name: 'Figurative Language Hunt',
    type: 'figurative-language',
    grade: 5,
    title: 'Figurative Language Hunt',
    description: 'Find and analyze descriptive language',
    instructions: 'Locate examples of similes, metaphors, and personification, then explain their effect on the story.',
    timeEstimate: '25 minutes',
    solStandards: ['5.5'],
    activityType: 'analysis'
  },
  {
    id: 'alternate-ending-5',
    name: 'Write an Alternate Ending',
    type: 'alternate-ending',
    grade: 5,
    title: 'Write an Alternate Ending',
    description: 'Create a different conclusion to the story',
    instructions: 'Write a different ending that maintains the story\'s mood and themes.',
    timeEstimate: '30 minutes',
    solStandards: ['5.6'],
    activityType: 'creative-writing'
  }
];

// Fun Activity Templates
export const FUN_ACTIVITY_TEMPLATES: FunActivityTemplate[] = [
  {
    id: 'word-search',
    title: 'Word Search Puzzle',
    description: 'Find hidden words from the story in an interactive grid. Words can go across, down, or diagonal.',
    icon: '🔤',
    estimatedTime: '15 minutes',
    skills: ['Vocabulary', 'Pattern Recognition', 'Spelling'],
    difficulty: 'Easy',
    componentType: 'word-search'
  },
  {
    id: 'story-bingo',
    title: 'Story Bingo',
    description: 'Mark off story elements as they appear. Get five in a row to win! Perfect for story review.',
    icon: '🎯',
    estimatedTime: '10 minutes',
    skills: ['Reading Comprehension', 'Listening Skills', 'Story Elements'],
    difficulty: 'Easy',
    componentType: 'story-bingo'
  },
  {
    id: 'cryptogram',
    title: 'Secret Message Puzzles',
    description: 'Decode cryptograms with important messages from the story using various cipher systems.',
    icon: '🔐',
    estimatedTime: '20 minutes',
    skills: ['Problem Solving', 'Logic', 'Pattern Recognition'],
    difficulty: 'Hard',
    componentType: 'cryptogram'
  },
  {
    id: 'word-scramble',
    title: 'Word Scramble',
    description: 'Unscramble mixed-up words from the story. Use hints to help you figure out each word.',
    icon: '🔤',
    estimatedTime: '15 minutes',
    skills: ['Vocabulary', 'Spelling', 'Word Recognition'],
    difficulty: 'Medium',
    componentType: 'word-scramble'
  },
  {
    id: 'crossword',
    title: 'Crossword Puzzle',
    description: 'Complete a crossword puzzle with clues about characters, events, and themes from the story.',
    icon: '✏️',
    estimatedTime: '25 minutes',
    skills: ['Reading Comprehension', 'Vocabulary', 'Critical Thinking'],
    difficulty: 'Medium',
    componentType: 'crossword'
  },
  {
    id: 'hidden-message',
    title: 'Hidden Message Puzzle',
    description: 'Answer questions about the story, then use the first letter of each answer to reveal a secret message.',
    icon: '🔍',
    estimatedTime: '20 minutes',
    skills: ['Reading Comprehension', 'Critical Thinking', 'Problem Solving'],
    difficulty: 'Medium',
    componentType: 'hidden-message'
  }
];

// Helper functions
export const getTemplatesByGrade = (grade: 3 | 4 | 5): WorksheetTemplate[] => {
  switch (grade) {
    case 3: return GRADE_3_TEMPLATES;
    case 4: return GRADE_4_TEMPLATES;
    case 5: return GRADE_5_TEMPLATES;
    default: return [];
  }
};

export const getTemplateById = (id: string): WorksheetTemplate | undefined => {
  const allTemplates = [...GRADE_3_TEMPLATES, ...GRADE_4_TEMPLATES, ...GRADE_5_TEMPLATES];
  return allTemplates.find(template => template.id === id);
};

export const getFunActivityTemplateById = (id: string): FunActivityTemplate | undefined => {
  return FUN_ACTIVITY_TEMPLATES.find(template => template.id === id);
};