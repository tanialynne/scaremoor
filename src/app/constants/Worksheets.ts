import { StaticImageData } from "next/image";

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

// Sample story data - "The Forgotten Door"
export const WORKSHEET_STORIES: WorksheetStory[] = [
  {
    id: "forgotten-door",
    title: "The Forgotten Door",
    slug: "forgotten-door",
    description: "A mysterious tale about a seventh-grader who discovers a magical door that can change her life - but every improvement comes with a hidden cost. Perfect for teaching theme, consequences, and character development.",
    storyText: `**The Forgotten Door**

Most kids hated supply closet duty.
Dani didn't mind it. It meant leaving class.
Plus, it smelled like dust, old hand sanitizer, and printer paper—a weird combo she'd grown to like.

She was halfway through seventh grade and still not sure if she liked school.
Mostly she liked the parts where she wasn't being looked at. Or talked to. Or asked why she ate lunch alone sometimes.

"Grab the microscope kit," Mr. Devlin had said, tossing her the closet key like it was no big deal.
She'd been in that closet a dozen times.

But today was different.

Today, there was a **door**.

Not just a door—an invitation. Something in her gut told her this wasn't for janitors or teachers. It was for her. And it wasn't just a way through a wall—it felt like a way *out* of something she couldn't name.

Not the usual metal panel in the back that led to pipes and wires.
This one was *wooden*. Old. Painted a kind of gray that looked like it had forgotten how to be any other color.

She blinked.
The flickering ceiling bulb buzzed like it always did.
But the door was still there.

It didn't match the walls. Or the school. Or *anything*.

There was no knob. Just a tarnished keyhole and a long, hairline crack down the center.

Dani took a step closer.
Then another.
She pressed her fingers against the door. Cold. Solid. Real.

Something shifted behind it—like air moving through a space that hadn't breathed in years.

She didn't hear a voice.
Not really.
But her brain translated the silence anyway:

> *Make it better.*

Dani pulled her hand back.

The regular supply closet light flickered once, then held steady.
The door was still there.

She grabbed the microscope kit, shut the closet, and locked it.

But the image burned in her mind like static on a screen.

A door that wasn't there yesterday.

A whisper she never heard.

And the unmistakable feeling that whatever was behind it—

Was *waiting for her*.

---

[Story continues with the full text from the original...]`,
    gradeRange: "3-5",
    subjects: ["English Language Arts", "Character Education", "Creative Writing"],
    themes: ["Consequences", "Identity", "Choices", "Be Careful What You Wish For"],
    readingTime: "10-15 minutes",
    published: true,
    publishDate: "2024-09-15",
    solStandards: {
      grade3: ["3.5", "3.6"],
      grade4: ["4.5", "4.6"],
      grade5: ["5.5", "5.6"]
    },
    activities: {
      grade3: [
        {
          id: "story-elements",
          title: "Story Elements",
          type: "comprehension",
          description: "Identify characters, setting, problem, and solution",
          instructions: "Complete the story elements chart by identifying who, where, what problem, and how it was solved.",
          timeEstimate: "15 minutes",
          solStandards: ["3.5"]
        },
        {
          id: "sequencing-cards",
          title: "Sequencing Cards",
          type: "comprehension",
          description: "Put story events in correct order",
          instructions: "Cut out the event cards and arrange them in the order they happened in the story.",
          timeEstimate: "10 minutes",
          materials: ["Scissors", "Event cards"],
          solStandards: ["3.5"]
        },
        {
          id: "vocabulary-context",
          title: "Vocabulary from Context",
          type: "vocabulary",
          description: "Guess word meanings from story context",
          instructions: "Read each sentence and use context clues to determine what the bold word means.",
          timeEstimate: "15 minutes",
          solStandards: ["3.6"]
        },
        {
          id: "draw-describe",
          title: "Draw & Describe",
          type: "art",
          description: "Illustrate a scene from the story",
          instructions: "Draw the mysterious door or hallway of drawers, then write 3 sentences describing your drawing.",
          timeEstimate: "20 minutes",
          materials: ["Drawing materials"],
          solStandards: ["3.5"]
        }
      ],
      grade4: [
        {
          id: "cause-effect",
          title: "Cause and Effect",
          type: "analysis",
          description: "Identify cause and effect relationships in the story",
          instructions: "Complete the cause and effect charts showing how Dani's actions led to specific consequences.",
          timeEstimate: "20 minutes",
          solStandards: ["4.5"]
        },
        {
          id: "theme-detective",
          title: "Theme Detective",
          type: "analysis",
          description: "Identify the story's theme using text evidence",
          instructions: "Use clues from the story to determine the author's message about choices and consequences.",
          timeEstimate: "25 minutes",
          solStandards: ["4.5"]
        },
        {
          id: "character-analysis",
          title: "Character Analysis",
          type: "analysis",
          description: "Analyze Dani's character traits with evidence",
          instructions: "Identify Dani's character traits and support each one with evidence from the story.",
          timeEstimate: "20 minutes",
          solStandards: ["4.5"]
        },
        {
          id: "creative-writing",
          title: "Creative Writing Prompt",
          type: "creative-writing",
          description: "Write about finding your own magical door",
          instructions: "Write a short story about finding your own magical door. What would you be tempted to change?",
          timeEstimate: "30 minutes",
          solStandards: ["4.6"]
        }
      ],
      grade5: [
        {
          id: "inference-questions",
          title: "Inference Questions",
          type: "analysis",
          description: "Make inferences about unstated information",
          instructions: "Read between the lines to answer questions about what the author implies but doesn't directly state.",
          timeEstimate: "25 minutes",
          solStandards: ["5.5"]
        },
        {
          id: "plot-mountain",
          title: "Plot Mountain",
          type: "analysis",
          description: "Chart the story's plot structure",
          instructions: "Identify the exposition, rising action, climax, falling action, and resolution on the plot diagram.",
          timeEstimate: "20 minutes",
          solStandards: ["5.5"]
        },
        {
          id: "figurative-language",
          title: "Figurative Language Hunt",
          type: "analysis",
          description: "Find and analyze descriptive language",
          instructions: "Locate examples of similes, metaphors, and personification, then explain their effect on the story.",
          timeEstimate: "25 minutes",
          solStandards: ["5.5"]
        },
        {
          id: "alternate-ending",
          title: "Write an Alternate Ending",
          type: "creative-writing",
          description: "Create a different conclusion to the story",
          instructions: "Starting from 'That night, Dani lay in bed...', write a different ending that maintains the story's mood.",
          timeEstimate: "30 minutes",
          solStandards: ["5.6"]
        }
      ]
    },
    downloadableResources: [
      {
        id: "complete-educator-packet",
        title: "Complete Educator Packet",
        description: "Full PDF with story, all grade-level activities, implementation guide, and answer keys",
        fileType: "pdf",
        url: "/downloads/forgotten-door-educator-packet.pdf",
        category: "educator-packet"
      },
      {
        id: "grade3-worksheets",
        title: "Grade 3 Student Worksheets",
        description: "Printable worksheets designed for 3rd grade reading level",
        fileType: "pdf",
        url: "/downloads/forgotten-door-grade3-worksheets.pdf",
        category: "student-worksheet"
      },
      {
        id: "grade4-worksheets",
        title: "Grade 4 Student Worksheets",
        description: "Printable worksheets designed for 4th grade reading level",
        fileType: "pdf",
        url: "/downloads/forgotten-door-grade4-worksheets.pdf",
        category: "student-worksheet"
      },
      {
        id: "grade5-worksheets",
        title: "Grade 5 Student Worksheets",
        description: "Printable worksheets designed for 5th grade reading level",
        fileType: "pdf",
        url: "/downloads/forgotten-door-grade5-worksheets.pdf",
        category: "student-worksheet"
      },
      {
        id: "answer-keys",
        title: "Complete Answer Keys",
        description: "Teacher answer keys for all grade levels and activities",
        fileType: "pdf",
        url: "/downloads/forgotten-door-answer-keys.pdf",
        category: "answer-key"
      },
      {
        id: "extension-activities",
        title: "Extension Activities Pack",
        description: "Additional enrichment activities and cross-curricular connections",
        fileType: "pdf",
        url: "/downloads/forgotten-door-extensions.pdf",
        category: "extension-activity"
      }
    ]
  }
];

// Helper functions
export const getWorksheetStoryBySlug = (slug: string): WorksheetStory | undefined => {
  return WORKSHEET_STORIES.find(story => story.slug === slug);
};

export const getPublishedWorksheetStories = (): WorksheetStory[] => {
  return WORKSHEET_STORIES.filter(story => story.published);
};

export const getWorksheetStoriesByGrade = (grade: 3 | 4 | 5): WorksheetStory[] => {
  return WORKSHEET_STORIES.filter(story =>
    story.gradeRange.includes(grade.toString())
  );
};

export const getWorksheetStoriesBySubject = (subject: string): WorksheetStory[] => {
  return WORKSHEET_STORIES.filter(story =>
    story.subjects.some(s => s.toLowerCase().includes(subject.toLowerCase()))
  );
};