import { StaticImageData } from "next/image";
import { buildStoryFromTemplate } from '../utils/StoryBuilder';
import { getStoryBySlug, getPublishedStories, getAllStories } from './StoryContent';

export type WorksheetStory = {
  id: string;
  title: string;
  slug: string;
  description: string;
  storyText: string;
  coverImage?: StaticImageData;
  gradeRange: string;
  subjects: string[];
  themes: string[];
  readingTime: string;
  published: boolean;
  publishDate: string;
  solStandards: {
    grade3: string[];
    grade4: string[];
    grade5: string[];
  };
  activities: {
    grade3: WorksheetActivity[];
    grade4: WorksheetActivity[];
    grade5: WorksheetActivity[];
  };
  downloadableResources: DownloadableResource[];
};

export type WorksheetActivity = {
  id: string;
  title: string;
  type: 'comprehension' | 'vocabulary' | 'creative-writing' | 'analysis' | 'art' | 'game';
  description: string;
  instructions: string;
  timeEstimate: string;
  materials?: string[];
  solStandards: string[];
};

export type DownloadableResource = {
  id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'docx' | 'png' | 'zip';
  url: string;
  category: 'educator-packet' | 'student-worksheet' | 'answer-key' | 'extension-activity';
};

// Build stories from template system
export const WORKSHEET_STORIES: WorksheetStory[] = getAllStories().map(buildStoryFromTemplate);

// Helper functions - these now use the template system
export const getWorksheetStoryBySlug = (slug: string): WorksheetStory | undefined => {
  const storyContent = getStoryBySlug(slug);
  return storyContent ? buildStoryFromTemplate(storyContent) : undefined;
};

export const getPublishedWorksheetStories = (): WorksheetStory[] => {
  return getPublishedStories().map(buildStoryFromTemplate);
};

export const getWorksheetStoriesByGrade = (grade: 3 | 4 | 5): WorksheetStory[] => {
  return getAllStories()
    .filter(story => story.gradeRange.includes(grade.toString()))
    .map(buildStoryFromTemplate);
};

export const getWorksheetStoriesBySubject = (subject: string): WorksheetStory[] => {
  return getAllStories()
    .filter(story => story.subjects.some(s => s.toLowerCase().includes(subject.toLowerCase())))
    .map(buildStoryFromTemplate);
};