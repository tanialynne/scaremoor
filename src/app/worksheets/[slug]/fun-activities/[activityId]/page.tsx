'use client';

import { useEffect, useState } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getWorksheetStoryBySlug, WorksheetStory } from "../../../../constants/Worksheets";
import { isFeatureEnabled } from "../../../../constants/FeatureFlags";
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
  difficulty: 'Easy' | 'Medium' | 'Hard';
  component: React.ComponentType<any>;
}

const FunActivityPage = ({ params }: Props) => {
  const [story, setStory] = useState<WorksheetStory | null>(null);
  const [activityId, setActivityId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadData = async () => {
      // Redirect if worksheets are disabled
      if (!isFeatureEnabled("WORKSHEETS_ENABLED")) {
        redirect("/");
        return;
      }

      const { slug: paramSlug, activityId: paramActivityId } = await params;
      const storyData = getWorksheetStoryBySlug(paramSlug);

      if (!storyData) {
        notFound();
        return;
      }

      setStory(storyData);
      setActivityId(paramActivityId);
      setLoading(false);

      // Set page title
      const activity = getActivityConfig(paramActivityId);
      if (activity) {
        document.title = `${storyData.title} - ${activity.title}`;
      }
    };

    loadData();
  }, [params]);

  const activities: ActivityConfig[] = [
    {
      id: 'word-search',
      title: 'Word Search Puzzle',
      description: 'Find hidden words from the story in an interactive grid. Words can go across, down, or diagonal.',
      icon: '🔤',
      estimatedTime: '15 minutes',
      skills: ['Vocabulary', 'Pattern Recognition', 'Spelling'],
      difficulty: 'Easy',
      component: WordSearchPuzzle
    },
    {
      id: 'story-bingo',
      title: 'Story Bingo',
      description: 'Mark off story elements as they appear. Get five in a row to win! Perfect for story review.',
      icon: '🎯',
      estimatedTime: '10 minutes',
      skills: ['Reading Comprehension', 'Listening Skills', 'Story Elements'],
      difficulty: 'Easy',
      component: StoryBingo
    },
    {
      id: 'cryptogram',
      title: 'Secret Message Puzzles',
      description: 'Decode three different cryptograms with important messages from the story using various cipher systems.',
      icon: '🔐',
      estimatedTime: '20 minutes',
      skills: ['Problem Solving', 'Logic', 'Pattern Recognition'],
      difficulty: 'Hard',
      component: CryptogramPuzzles
    },
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble mixed-up words from the story. Use hints to help you figure out each word.',
      icon: '🔤',
      estimatedTime: '15 minutes',
      skills: ['Vocabulary', 'Spelling', 'Word Recognition'],
      difficulty: 'Medium',
      component: WordScramble
    },
    {
      id: 'crossword',
      title: 'Crossword Puzzle',
      description: 'Complete a crossword puzzle with clues about characters, events, and themes from the story.',
      icon: '✏️',
      estimatedTime: '25 minutes',
      skills: ['Reading Comprehension', 'Vocabulary', 'Critical Thinking'],
      difficulty: 'Medium',
      component: CrosswordPuzzle
    },
    {
      id: 'hidden-message',
      title: 'Hidden Message Puzzle',
      description: 'Answer questions about the story, then use the first letter of each answer to reveal a secret message.',
      icon: '🔍',
      estimatedTime: '20 minutes',
      skills: ['Reading Comprehension', 'Critical Thinking', 'Problem Solving'],
      difficulty: 'Medium',
      component: HiddenMessagePuzzle
    }
  ];

  const getActivityConfig = (id: string): ActivityConfig | undefined => {
    return activities.find(activity => activity.id === id);
  };

  const getCurrentActivityIndex = (): number => {
    return activities.findIndex(activity => activity.id === activityId);
  };

  const getPrevActivity = (): ActivityConfig | undefined => {
    const currentIndex = getCurrentActivityIndex();
    return currentIndex > 0 ? activities[currentIndex - 1] : undefined;
  };

  const getNextActivity = (): ActivityConfig | undefined => {
    const currentIndex = getCurrentActivityIndex();
    return currentIndex < activities.length - 1 ? activities[currentIndex + 1] : undefined;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-700/30 text-green-300 border-green-600/50';
      case 'Medium': return 'bg-yellow-700/30 text-yellow-300 border-yellow-600/50';
      case 'Hard': return 'bg-red-700/30 text-red-300 border-red-600/50';
      default: return 'bg-gray-700/30 text-gray-300 border-gray-600/50';
    }
  };

  const handleSmartPrint = () => {
    window.print();
  };

  const handleResponseChange = (sectionId: string, newResponses: Record<string, string>) => {
    setResponses(prev => ({
      ...prev,
      [sectionId]: JSON.stringify(newResponses)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
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
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/worksheets" className="hover:text-orange-600">Worksheets</Link>
            <span>›</span>
            <Link href={`/worksheets/${story.slug}`} className="hover:text-orange-600">{story.title}</Link>
            <span>›</span>
            <Link href={`/worksheets/${story.slug}/fun-activities`} className="hover:text-orange-600">Fun Activities</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{activity.title}</span>
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
                font-family: 'Georgia', 'Times New Roman', serif !important;
                font-size: 14px !important;
                line-height: 1.6 !important;
              }

              .no-print {
                display: none !important;
              }

              .worksheet-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
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
                <label className="block text-xs text-white/80 mb-1">Name:</label>
                <div className="border-b border-white/50 h-6 w-48 print:border-black"></div>
              </div>
              <div className="text-right">
                <h1 className="text-base font-bold mb-0 print:text-sm">
                  {story.title} - {activity.title}
                </h1>
                <div className="text-xs opacity-90 print:text-xs">
                  Fun Activity • {activity.estimatedTime} • {activity.difficulty}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="bg-gray-50 border-l-4 border-gray-400 p-3 rounded mb-4 print:bg-white print:border-black print:p-2">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Instructions:</h4>
            <p className="text-gray-700 text-sm">{activity.description}</p>
          </div>

          {/* Activity Content */}
          <div className="worksheet-content bg-white rounded-lg p-6 mb-6">
            <ActivityComponent
              sectionId={activityId}
              onResponseChange={handleResponseChange}
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
        <div className="mt-8 flex justify-between items-center print:hidden">
          <div>
            {getPrevActivity() ? (
              <Link
                href={`/worksheets/${story.slug}/fun-activities/${getPrevActivity()?.id}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Previous: {getPrevActivity()?.title.replace(/[🔤🎯🔐✏️🔍]/g, '').trim()}
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
                Next: {getNextActivity()?.title.replace(/[🔤🎯🔐✏️🔍]/g, '').trim()} →
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
      </main>

      <WorksheetFooter />
    </div>
  );
};

export default FunActivityPage;