"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { WorksheetStory } from "../../../../constants/Worksheets";
import { getStoryBySlug } from "../../../../constants/StoryContent";
import { getFunActivityDataForActivity } from "../../../../utils/StoryBuilder";
import WorksheetHeader from "../../../../components/WorksheetLayout/WorksheetHeader";
import WorksheetFooter from "../../../../components/WorksheetLayout/WorksheetFooter";

// Import fun activity components
import WordSearchPuzzle from "../../../../components/Worksheets/WordSearchPuzzle";
import StoryBingo from "../../../../components/Worksheets/StoryBingo";
import CryptogramPuzzles from "../../../../components/Worksheets/CryptogramPuzzles";
import WordScramble from "../../../../components/Worksheets/WordScramble";
import CrosswordPuzzle from "../../../../components/Worksheets/CrosswordPuzzle";
import HiddenMessagePuzzle from "../../../../components/Worksheets/HiddenMessagePuzzle";

type Props = {
  params: Promise<{ slug: string; activityId: string }>;
};

interface ActivityConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  skills: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  component: React.ComponentType<{
    sectionId: string;
    onResponseChange: (
      sectionId: string,
      newResponses: Record<string, string>
    ) => void;
    storyData?: Record<string, unknown>;
    showInstructionsModal?: boolean;
    onCloseInstructions?: () => void;
  }>;
}

const activities: ActivityConfig[] = [
  {
    id: "word-search",
    title: "Word Search Puzzle",
    description:
      "Find hidden words from the story in an interactive grid. Words can go across, down, or diagonal.",
    icon: "🔤",
    estimatedTime: "15 minutes",
    skills: ["Vocabulary", "Pattern Recognition", "Spelling"],
    difficulty: "Easy",
    component: WordSearchPuzzle,
  },
  {
    id: "story-bingo",
    title: "Story Bingo",
    description:
      "Mark off story elements as they appear. Get five in a row to win! Perfect for story review.",
    icon: "🎯",
    estimatedTime: "10 minutes",
    skills: ["Reading Comprehension", "Listening Skills", "Story Elements"],
    difficulty: "Easy",
    component: StoryBingo,
  },
  {
    id: "cryptogram",
    title: "Secret Message Puzzles",
    description:
      "Decode three different cryptograms with important messages from the story using various cipher systems.",
    icon: "🔐",
    estimatedTime: "20 minutes",
    skills: ["Problem Solving", "Logic", "Pattern Recognition"],
    difficulty: "Hard",
    component: CryptogramPuzzles,
  },
  {
    id: "word-scramble",
    title: "Word Scramble",
    description:
      "Unscramble mixed-up words from the story. Use hints to help you figure out each word.",
    icon: "🔤",
    estimatedTime: "15 minutes",
    skills: ["Vocabulary", "Spelling", "Word Recognition"],
    difficulty: "Medium",
    component: WordScramble,
  },
  {
    id: "crossword",
    title: "Crossword Puzzle",
    description:
      "Complete a crossword puzzle with clues about characters, events, and themes from the story.",
    icon: "✏️",
    estimatedTime: "25 minutes",
    skills: ["Reading Comprehension", "Vocabulary", "Critical Thinking"],
    difficulty: "Medium",
    component: CrosswordPuzzle,
  },
  {
    id: "hidden-message",
    title: "Hidden Message Puzzle",
    description:
      "Answer questions about the story, then use the first letter of each answer to reveal a secret message.",
    icon: "🔍",
    estimatedTime: "20 minutes",
    skills: ["Reading Comprehension", "Critical Thinking", "Problem Solving"],
    difficulty: "Medium",
    component: HiddenMessagePuzzle,
  },
];

const getActivityConfig = (id: string): ActivityConfig | undefined => {
  return activities.find((activity) => activity.id === id);
};

const FunActivityPage = ({ params }: Props) => {
  const [story, setStory] = useState<WorksheetStory | null>(null);
  const [activityId, setActivityId] = useState<string>("");
  const [storyActivityData, setStoryActivityData] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { slug: paramSlug, activityId: paramActivityId } = await params;

        // Get story content directly without relying on template system
        const storyContent = getStoryBySlug(paramSlug);

        if (!storyContent) {
          notFound();
          return;
        }

        // Create minimal story object
        const storyData: WorksheetStory = {
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
          solStandards: { grade3: [], grade4: [], grade5: [] },
          activities: { grade3: [], grade4: [], grade5: [] },
          downloadableResources: storyContent.downloadableResources,
        };

        // Get activity data
        const activityData = getFunActivityDataForActivity(
          storyContent,
          paramActivityId
        );

        setStory(storyData);
        setActivityId(paramActivityId);
        setStoryActivityData(activityData);
        setIsLoading(false);

        // Set page title
        const activity = getActivityConfig(paramActivityId);
        if (activity) {
          document.title = `${storyData.title} - ${activity.title}`;
        }
      } catch (error) {
        console.error("Error loading activity data:", error);
        setIsLoading(false);
        notFound();
      }
    };

    loadData();
  }, [params]);

  const getCurrentActivityIndex = (): number => {
    return activities.findIndex((activity) => activity.id === activityId);
  };

  const getPrevActivity = (): ActivityConfig | undefined => {
    const currentIndex = getCurrentActivityIndex();
    return currentIndex > 0 ? activities[currentIndex - 1] : undefined;
  };

  const getNextActivity = (): ActivityConfig | undefined => {
    const currentIndex = getCurrentActivityIndex();
    return currentIndex < activities.length - 1
      ? activities[currentIndex + 1]
      : undefined;
  };

  const handleSmartPrint = () => {
    window.print();
  };

  const handleResponseChange = () => {
    // Response change handler for activities
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading activity...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-gray-600">Activity not found</p>
        </div>
      </div>
    );
  }

  const activity = getActivityConfig(activityId);
  if (!activity) {
    notFound();
    return null;
  }

  const ActivityComponent = activity.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <WorksheetHeader />

      {/* Navigation breadcrumb */}
      <div className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex flex-wrap items-baseline text-sm text-gray-600">
            <Link
              href="/worksheets"
              className="hover:text-orange-600 whitespace-nowrap breadcrumb"
            >
              Worksheets
            </Link>
            <span className="mx-2">›</span>
            <Link
              href={`/worksheets/${story.slug}`}
              className="hover:text-orange-600 whitespace-nowrap breadcrumb"
            >
              {story.title}
            </Link>
            <span className="mx-2">›</span>
            <Link
              href={`/worksheets/${story.slug}/fun-activities`}
              className="hover:text-orange-600 whitespace-nowrap breadcrumb"
            >
              Fun Activities
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium whitespace-nowrap breadcrumb">
              {activity.title}
            </span>
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="worksheet-container">
          {/* Print Styles */}
          <style jsx>{`
            @media print {
              .worksheet-container {
                background: white !important;
                color: black !important;
                font-family: "Georgia", "Times New Roman", serif !important;
                font-size: 14px !important;
                line-height: 1.6 !important;
              }

              .no-print {
                display: none !important;
              }

              .worksheet-header {
                background: linear-gradient(
                  135deg,
                  #667eea 0%,
                  #764ba2 100%
                ) !important;
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
            }

            @page {
              size: letter;
              margin: 0.75in;
            }
          `}</style>

          {/* Compact Worksheet Header with Name */}
          <div className="worksheet-header bg-gradient-to-r from-gray-600 to-gray-800 text-white p-2 rounded-t-xl mb-3 print:p-1 print:mb-2 print:bg-gray-100 print:text-black print:border print:border-black print:rounded-none">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <label className="block text-xs text-white/80 mb-1">
                  Name:
                </label>
                <div className="border-b border-white/50 h-6 w-48 print:border-black"></div>
              </div>
              <div className="text-right">
                <h1 className="text-base font-bold mb-0 print:text-sm">
                  {story.title} - {activity.title}
                </h1>
                <div className="text-xs opacity-90 print:text-xs">
                  Fun Activity • {activity.estimatedTime} •{" "}
                  {activity.difficulty}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-3 rounded mb-4 print:bg-white print:border-black print:p-2">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                  Instructions:
                </h4>
                <p className="text-gray-700 text-sm leading-5">{activity.description}</p>
              </div>
              <button
                onClick={() => setShowInstructions(true)}
                className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm print:hidden ml-4 flex-shrink-0"
              >
                More Info
              </button>
            </div>
          </div>

          {/* Activity Content */}
          <div className="worksheet-content bg-white rounded-lg p-6 mb-6">
            <ActivityComponent
              sectionId={activityId}
              onResponseChange={handleResponseChange}
              storyData={storyActivityData || undefined}
              showInstructionsModal={showInstructions}
              onCloseInstructions={() => setShowInstructions(false)}
            />
          </div>

          {/* Controls - Not printed */}
          <div className="worksheet-controls bg-gray-50 p-4 rounded-lg border print:hidden">
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <button
                onClick={handleSmartPrint}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                🖨️ Print Worksheet
              </button>
            </div>
          </div>
        </div>

        {/* Navigation between activities */}
        <div className="mt-8 print:hidden">
          {/* Desktop layout */}
          <div className="hidden md:flex justify-between items-center">
            <div>
              {getPrevActivity() ? (
                <Link
                  href={`/worksheets/${story.slug}/fun-activities/${getPrevActivity()?.id}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  ← Previous:{" "}
                  {getPrevActivity()
                    ?.title.replace(/[🔤🎯🔐✏️🔍]/g, "")
                    .trim()}
                </Link>
              ) : (
                <Link
                  href={`/worksheets/${story.slug}/fun-activities`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  ← Back to Fun Activities
                </Link>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Activity {getCurrentActivityIndex() + 1} of {activities.length}
              </p>
            </div>

            <div>
              {getNextActivity() ? (
                <Link
                  href={`/worksheets/${story.slug}/fun-activities/${getNextActivity()?.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  Next:{" "}
                  {getNextActivity()
                    ?.title.replace(/[🔤🎯🔐✏️🔍]/g, "")
                    .trim()}{" "}
                  →
                </Link>
              ) : (
                <Link
                  href={`/worksheets/${story.slug}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View All Materials
                </Link>
              )}
            </div>
          </div>

          {/* Mobile layout - 3 lines */}
          <div className="md:hidden space-y-3">
            {/* Line 1: Next button */}
            <div className="text-center">
              {getNextActivity() ? (
                <Link
                  href={`/worksheets/${story.slug}/fun-activities/${getNextActivity()?.id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                >
                  Next:{" "}
                  {getNextActivity()
                    ?.title.replace(/[🔤🎯🔐✏️🔍]/g, "")
                    .trim()}{" "}
                  →
                </Link>
              ) : (
                <Link
                  href={`/worksheets/${story.slug}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View All Materials
                </Link>
              )}
            </div>

            {/* Line 2: Activity counter */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Activity {getCurrentActivityIndex() + 1} of {activities.length}
              </p>
            </div>

            {/* Line 3: Previous button */}
            <div className="text-center">
              {getPrevActivity() ? (
                <Link
                  href={`/worksheets/${story.slug}/fun-activities/${getPrevActivity()?.id}`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  ← Previous:{" "}
                  {getPrevActivity()
                    ?.title.replace(/[🔤🎯🔐✏️🔍]/g, "")
                    .trim()}
                </Link>
              ) : (
                <Link
                  href={`/worksheets/${story.slug}/fun-activities`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  ← Back to Fun Activities
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <WorksheetFooter />
    </div>
  );
};

export default FunActivityPage;
