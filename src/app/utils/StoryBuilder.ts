import { WorksheetStory, WorksheetActivity } from '../constants/Worksheets';
import { StoryContent } from '../constants/StoryContent';
import {
  WorksheetTemplate,
  getTemplateById,
  getFunActivityTemplateById
} from '../constants/WorksheetTemplates';
import { OnlineWorksheet, WorksheetSection, WorksheetQuestion } from '../components/Worksheets/types';

// Build a complete WorksheetStory from StoryContent and templates
export const buildStoryFromTemplate = (storyContent: StoryContent): WorksheetStory => {
  return {
    id: storyContent.id,
    title: storyContent.title,
    slug: storyContent.slug,
    description: storyContent.description,
    storyText: storyContent.storyText,
    coverImage: storyContent.coverImage,
    gradeRange: storyContent.gradeRange,
    subjects: storyContent.subjects,
    themes: storyContent.themes,
    readingTime: storyContent.readingTime,
    published: storyContent.published,
    publishDate: storyContent.publishDate,
    solStandards: {
      grade3: getSOLStandardsForGrade(storyContent, 3),
      grade4: getSOLStandardsForGrade(storyContent, 4),
      grade5: getSOLStandardsForGrade(storyContent, 5)
    },
    activities: {
      grade3: buildActivitiesForGrade(storyContent, 3),
      grade4: buildActivitiesForGrade(storyContent, 4),
      grade5: buildActivitiesForGrade(storyContent, 5)
    },
    downloadableResources: storyContent.downloadableResources
  };
};

// Build activities for a specific grade using templates
const buildActivitiesForGrade = (storyContent: StoryContent, grade: 3 | 4 | 5): WorksheetActivity[] => {
  const templateIds = storyContent.worksheetTemplates[`grade${grade}` as keyof typeof storyContent.worksheetTemplates];

  return templateIds.map(templateId => {
    const template = getTemplateById(templateId);
    if (!template) {
      console.warn(`Template not found: ${templateId}`);
      return null;
    }

    return buildActivityFromTemplate(template, storyContent);
  }).filter(Boolean) as WorksheetActivity[];
};

// Convert a template to an activity with story-specific data
const buildActivityFromTemplate = (template: WorksheetTemplate, storyContent: StoryContent): WorksheetActivity => {
  // Customize instructions based on story content
  let customizedInstructions = template.instructions;

  // Story-specific customizations
  if (template.type === 'drawing' && storyContent.title) {
    customizedInstructions = customizedInstructions.replace(
      'your favorite scene from the story',
      `your favorite scene from "${storyContent.title}"`
    );
  }

  if (template.type === 'creative-writing' && storyContent.themes.length > 0) {
    customizedInstructions += ` Consider the themes: ${storyContent.themes.join(', ')}.`;
  }

  return {
    id: template.id,
    title: template.title,
    type: template.activityType,
    description: template.description,
    instructions: customizedInstructions,
    timeEstimate: template.timeEstimate,
    materials: template.materials,
    solStandards: template.solStandards
  };
};

// Get SOL standards for a specific grade
const getSOLStandardsForGrade = (storyContent: StoryContent, grade: 3 | 4 | 5): string[] => {
  const templateIds = storyContent.worksheetTemplates[`grade${grade}` as keyof typeof storyContent.worksheetTemplates];
  const allStandards: string[] = [];

  templateIds.forEach(templateId => {
    const template = getTemplateById(templateId);
    if (template) {
      allStandards.push(...template.solStandards);
    }
  });

  // Remove duplicates
  return [...new Set(allStandards)];
};

// Build fun activities for a story
export const buildFunActivitiesForStory = (storyContent: StoryContent): Array<{
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  skills: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}> => {
  return storyContent.funActivityTemplates.map(templateId => {
    const template = getFunActivityTemplateById(templateId);
    if (!template) {
      console.warn(`Fun activity template not found: ${templateId}`);
      return null;
    }

    return {
      id: template.id,
      title: template.title,
      description: template.description,
      icon: template.icon,
      estimatedTime: template.estimatedTime,
      skills: template.skills,
      difficulty: template.difficulty
    };
  }).filter(Boolean) as Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    estimatedTime: string;
    skills: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }>;
};

// Helper to get worksheet data for a specific activity type
export const getWorksheetDataForActivity = (
  storyContent: StoryContent,
  activityType: string
): Record<string, unknown> => {
  const data = storyContent.worksheetData;

  switch (activityType) {
    case 'story-elements':
      return { elements: data.storyElements };
    case 'sequencing':
      return { cards: data.sequencingEvents };
    case 'vocabulary':
      return { words: data.vocabularyWords };
    case 'cause-effect':
      return { pairs: data.causeEffectPairs };
    case 'plot-mountain':
      return { plotPoints: data.plotPoints };
    case 'theme-detective':
      return { clues: data.themeClues };
    case 'character-analysis':
      return { traits: data.characterTraits };
    case 'inference':
      return { questions: data.inferenceQuestions };
    case 'figurative-language':
      return { examples: data.figurativeLanguageExamples };
    case 'creative-writing':
    case 'alternate-ending':
      return { prompts: data.creativeWritingPrompts };
    default:
      return {};
  }
};

// Helper to get fun activity data
export const getFunActivityDataForActivity = (
  storyContent: StoryContent,
  activityId: string
): Record<string, unknown> => {
  const data = storyContent.funActivityData;

  switch (activityId) {
    case 'word-search':
      return { wordSearchWords: data.wordSearchWords };
    case 'story-bingo':
      return { bingoItems: data.bingoItems };
    case 'cryptogram':
      return { cryptogramMessages: data.cryptogramMessages };
    case 'word-scramble':
      return { scrambledWords: data.scrambledWords };
    case 'crossword':
      return { crosswordClues: data.crosswordClues };
    case 'hidden-message':
      return { hiddenMessagePuzzle: data.hiddenMessagePuzzle };
    default:
      return {};
  }
};

// Convert markdown to HTML (simple implementation)
export const markdownToHtml = (markdown: string): string => {
  return markdown
    // Headers
    .replace(/^### \*\*(.*?)\*\*/gim, '<h3 class="font-bold text-lg mb-2">$1</h3>')
    .replace(/^### (.*$)/gim, '<h3 class="font-bold text-lg mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="font-bold text-xl mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="font-bold text-2xl mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    // Italic/Emphasis
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    // Blockquotes (styled for story thoughts)
    .replace(/^> \*(.*?)\*/gim, '<blockquote class="italic text-orange-300 border-l-2 border-orange-500 pl-3 my-2">"$1"</blockquote>')
    .replace(/^> (.*$)/gim, '<blockquote class="italic text-orange-300 border-l-2 border-orange-500 pl-3 my-2">$1</blockquote>')
    // Horizontal rules (scene breaks)
    .replace(/^---$/gim, '<hr class="border-gray-600 my-6">')
    // Paragraphs
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => {
      // Skip if already HTML
      if (paragraph.startsWith('<')) {
        return paragraph;
      }
      // Convert line breaks within paragraphs
      const content = paragraph.replace(/\n/g, '<br>');
      return `<p class="mb-4">${content}</p>`;
    })
    .join('');
};

// Build online worksheets for a story using templates
export const buildOnlineWorksheetsForStory = (storyContent: StoryContent): OnlineWorksheet[] => {
  const worksheets: OnlineWorksheet[] = [];

  // Build worksheet for each grade
  [3, 4, 5].forEach(grade => {
    const gradeKey = `grade${grade}` as keyof typeof storyContent.worksheetTemplates;
    const templateIds = storyContent.worksheetTemplates[gradeKey];

    if (templateIds.length > 0) {
      const sections: WorksheetSection[] = templateIds.map(templateId => {
        const template = getTemplateById(templateId);
        if (!template) {
          console.warn(`Template not found: ${templateId}`);
          return null;
        }

        return buildWorksheetSectionFromTemplate(template, storyContent);
      }).filter(Boolean) as WorksheetSection[];

      const worksheet: OnlineWorksheet = {
        id: `${storyContent.slug}-grade${grade}`,
        storyId: storyContent.id,
        title: `${storyContent.title} - Grade ${grade} Activities`,
        grade: grade as 3 | 4 | 5,
        sections: sections
      };

      worksheets.push(worksheet);
    }
  });

  return worksheets;
};

// Build a worksheet section from a template and story content
const buildWorksheetSectionFromTemplate = (
  template: WorksheetTemplate,
  storyContent: StoryContent
): WorksheetSection => {
  const worksheetData = getWorksheetDataForActivity(storyContent, template.type);

  return {
    id: template.type,
    title: `${getIconForType(template.type)} ${template.title}`,
    type: template.type,
    grade: template.grade,
    solStandards: template.solStandards,
    timeEstimate: template.timeEstimate,
    instructions: template.instructions,
    questions: buildQuestionsForType(template.type, worksheetData),
    customProps: worksheetData
  };
};

// Get icon for worksheet type
const getIconForType = (type: string): string => {
  const icons: Record<string, string> = {
    'story-elements': '📖',
    'sequencing': '🔢',
    'vocabulary': '📝',
    'drawing': '🎨',
    'cause-effect': '➡️',
    'theme-detective': '🔍',
    'character-analysis': '👤',
    'creative-writing': '✍️',
    'inference': '🧠',
    'plot-mountain': '⛰️',
    'figurative-language': '🎨',
    'alternate-ending': '✍️'
  };
  return icons[type] || '📝';
};

// Build questions for specific worksheet types
const buildQuestionsForType = (type: string, data: Record<string, unknown>): WorksheetQuestion[] => {
  switch (type) {
    case 'story-elements':
      // Return empty array - story elements uses custom component that doesn't need questions
      return [];

    case 'sequencing':
      // Return empty array - sequencing uses custom component that doesn't need questions
      return [];

    case 'vocabulary':
      const words = data.words as Array<{ word: string; sentence: string; definition?: string }>;
      return words?.map((word, index) => ({
        id: `vocab-${index + 1}`,
        question: word.sentence,
        fields: [{
          id: `${word.word}-meaning`,
          type: 'text',
          label: `I think "${word.word}" means:`,
          placeholder: 'Write your guess here...'
        }]
      })) || [];

    case 'cause-effect':
      // Return empty array - cause effect uses custom component that doesn't need questions
      return [];

    case 'plot-mountain':
      // Return empty array - plot mountain uses custom component that doesn't need questions
      return [];

    case 'theme-detective':
      return [
        {
          id: 'theme-clues',
          question: 'What clues in the story help you understand the theme?',
          fields: [
            {
              id: 'clue-1',
              type: 'textarea',
              label: 'Clue 1: The door grants wishes',
              placeholder: 'What does this teach us about getting what we want?',
              lines: 2
            },
            {
              id: 'clue-2',
              type: 'textarea',
              label: 'Clue 2: Every wish has a hidden cost',
              placeholder: 'What lesson does this show about consequences?',
              lines: 2
            },
            {
              id: 'clue-3',
              type: 'textarea',
              label: 'Clue 3: Dani becomes trapped by the door\'s power',
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
      ];

    case 'character-analysis':
      return [{
        id: 'character-traits',
        question: 'What kind of person is Dani? Use evidence from the story!',
        fields: [
          {
            id: 'trait-1',
            type: 'text',
            label: 'Character Trait 1:',
            placeholder: 'curious, lonely, desperate, etc.'
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
      }];

    case 'inference':
      return [
        {
          id: 'inference-1',
          question: 'Why do you think the door appeared only when Dani was alone?',
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
          question: 'What do you think will happen to the next student who finds the door?',
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
          question: 'Why doesn\'t Dani tell anyone about the door?',
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
      ];

    case 'figurative-language':
      return [
        {
          id: 'example-given',
          question: 'Here\'s an example of figurative language from the story:',
          fields: [
            {
              id: 'example-text',
              type: 'text',
              label: 'Example: "Painted a kind of gray that looked like it had forgotten how to be any other color"',
              placeholder: 'This creates a mysterious, forgotten mood'
            },
            {
              id: 'example-meaning',
              type: 'textarea',
              label: 'What it means/why the author used it:',
              placeholder: 'The unusual description makes the door seem ancient and otherworldly',
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
      ];

    case 'alternate-ending':
      return [{
        id: 'alternate-ending',
        question: 'Write your alternate ending:',
        fields: [{
          id: 'new-ending',
          type: 'textarea',
          placeholder: 'Starting from when Dani first touches the door, write a different ending where she makes a different choice...',
          lines: 15
        }]
      }];

    case 'creative-writing':
      const prompts = data.prompts as Array<{ prompt: string; startingText?: string }>;
      return prompts?.map((prompt, index) => ({
        id: `writing-${index + 1}`,
        question: prompt.prompt,
        fields: [{
          id: 'story',
          type: 'textarea',
          lines: 12,
          placeholder: prompt.startingText || ''
        }]
      })) || [{
        id: 'writing-1',
        question: 'Write your creative response:',
        fields: [{
          id: 'story',
          type: 'textarea',
          lines: 12
        }]
      }];

    default:
      return [];
  }
};