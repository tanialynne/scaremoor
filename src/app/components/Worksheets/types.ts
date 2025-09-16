export interface WorksheetField {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'drawing';
  label?: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  lines?: number; // For multi-line text fields
}

export interface WorksheetQuestion {
  id: string;
  question: string;
  fields: WorksheetField[];
  instructions?: string;
  example?: string;
}

export interface WorksheetSection {
  id: string;
  title: string;
  type: 'story-elements' | 'sequencing' | 'vocabulary' | 'drawing' | 'cause-effect' |
        'theme-detective' | 'character-analysis' | 'creative-writing' | 'inference' |
        'plot-mountain' | 'figurative-language' | 'alternate-ending' | 'custom';
  grade: 3 | 4 | 5;
  solStandards: string[];
  timeEstimate: string;
  instructions: string;
  questions: WorksheetQuestion[];
  customProps?: Record<string, unknown>;
}

export interface OnlineWorksheet {
  id: string;
  storyId: string;
  title: string;
  grade: 3 | 4 | 5;
  sections: WorksheetSection[];
  printFriendly?: boolean;
}

export interface WorksheetResponse {
  worksheetId: string;
  studentName?: string;
  responses: Record<string, string | string[]>;
  completedAt: Date;
}

// Sequencing specific types
export interface SequencingCard {
  id: string;
  text: string;
  correctOrder: number;
}

// Cause and Effect specific types
export interface CauseEffectPair {
  id: string;
  cause: string;
  effect?: string; // Optional for student to fill in
}

// Plot Mountain specific types
export interface PlotPoint {
  id: string;
  stage: 'exposition' | 'rising-action' | 'climax' | 'falling-action' | 'resolution';
  label: string;
  content?: string; // Student fills this in
}