'use client';

import { useEffect, useState } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getWorksheetStoryBySlug, WorksheetStory } from "../../../constants/Worksheets";
import { isFeatureEnabled } from "../../../constants/FeatureFlags";
import Herobox from "../../../components/Herobox";
import Button from "../../../components/Button";
import WorksheetFooter from "../../../components/WorksheetLayout/WorksheetFooter";

import BackgroundImage from "../../../../../public/images/bookspage-image.png";
import OrangeBackground from "../../../../../public/images/orangeBackground.png";
import YellowBackground from "../../../../../public/images/yellowBackground.png";

type Props = {
  params: Promise<{ slug: string }>;
};

interface FunActivity {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  skills: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const FunActivitiesPage = ({ params }: Props) => {
  const [story, setStory] = useState<WorksheetStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Redirect if worksheets are disabled
      if (!isFeatureEnabled("WORKSHEETS_ENABLED")) {
        redirect("/");
        return;
      }

      const { slug: paramSlug } = await params;
      const storyData = getWorksheetStoryBySlug(paramSlug);

      if (!storyData) {
        notFound();
        return;
      }

      setStory(storyData);
      setLoading(false);

      // Set page title
      document.title = `${storyData.title} - Fun Activities`;
    };

    loadData();
  }, [params]);

  const funActivities: FunActivity[] = [
    {
      id: 'word-search',
      title: 'Word Search Puzzle',
      description: 'Find hidden words from the story in an interactive grid. Words can go across, down, or diagonal.',
      icon: '🔤',
      estimatedTime: '15 minutes',
      skills: ['Vocabulary', 'Pattern Recognition', 'Spelling'],
      difficulty: 'Easy'
    },
    {
      id: 'story-bingo',
      title: 'Story Bingo',
      description: 'Mark off story elements as they appear. Get five in a row to win! Perfect for story review.',
      icon: '🎯',
      estimatedTime: '10 minutes',
      skills: ['Reading Comprehension', 'Listening Skills', 'Story Elements'],
      difficulty: 'Easy'
    },
    {
      id: 'cryptogram',
      title: 'Secret Message Puzzles',
      description: 'Decode three different cryptograms with important messages from the story using various cipher systems.',
      icon: '🔐',
      estimatedTime: '20 minutes',
      skills: ['Problem Solving', 'Logic', 'Pattern Recognition'],
      difficulty: 'Hard'
    },
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble mixed-up words from the story. Use hints to help you figure out each word.',
      icon: '🔤',
      estimatedTime: '15 minutes',
      skills: ['Vocabulary', 'Spelling', 'Word Recognition'],
      difficulty: 'Medium'
    },
    {
      id: 'crossword',
      title: 'Crossword Puzzle',
      description: 'Complete a crossword puzzle with clues about characters, events, and themes from the story.',
      icon: '✏️',
      estimatedTime: '25 minutes',
      skills: ['Reading Comprehension', 'Vocabulary', 'Critical Thinking'],
      difficulty: 'Medium'
    },
    {
      id: 'hidden-message',
      title: 'Hidden Message Puzzle',
      description: 'Answer questions about the story, then use the first letter of each answer to reveal a secret message.',
      icon: '🔍',
      estimatedTime: '20 minutes',
      skills: ['Reading Comprehension', 'Critical Thinking', 'Problem Solving'],
      difficulty: 'Medium'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-700/30 text-green-300 border-green-600/50';
      case 'Medium': return 'bg-yellow-700/30 text-yellow-300 border-yellow-600/50';
      case 'Hard': return 'bg-red-700/30 text-red-300 border-red-600/50';
      default: return 'bg-gray-700/30 text-gray-300 border-gray-600/50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-gray-600">Loading fun activities...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-gray-600">Activities not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Herobox backgroundImage={BackgroundImage} contentPaddingTop="lg:pt-22">
        <div className="items-center">
          <div className="space-y-5 lg:pt-10">
            <div className="font-trickordead font-normal space-y-4 [text-shadow:0_0_10px_rgba(0,0,0,0.8)]">
              <h2 className="hero-text-large">Fun Activities & Puzzles</h2>
              <h1 className="hero-text-xlarge max-w-[20ch]">
                {story.title}
              </h1>
            </div>

            <p
              className="max-w-[80ch] font-light"
              style={{
                textShadow: "0 0 10px rgba(0, 0, 0, 0.8)",
              }}
            >
              Interactive games and brain teasers to review the story while building vocabulary,
              critical thinking, and problem-solving skills.
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                🎮 {funActivities.length} Activities
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                📚 All Grade Levels
              </div>
              <div className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-orange-700/30">
                🖨️ Print Friendly
              </div>
            </div>
          </div>
        </div>
      </Herobox>

      <main className="text-white">
        <section className="px-8 md:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-trickordead font-normal text-4xl sm:text-5xl gradient-text-accessible mb-4">
                🎯 Choose Your Activity
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Each activity offers a fun way to review the story while building different skills.
                Perfect for centers, homework, or extension activities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {funActivities.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/worksheets/${story.slug}/fun-activities/${activity.id}`}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-xl p-6 border border-gray-700/30 hover:border-gray-500/50 transition-all duration-300 hover:bg-gray-700/40 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl flex-shrink-0">{activity.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                          {activity.title}
                        </h3>
                        <span className={`inline-block text-xs px-2 py-1 rounded border ${getDifficultyColor(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {activity.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{activity.estimatedTime}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {activity.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-600/30">
                      <div className="text-orange-400 font-medium group-hover:text-orange-300 transition-colors">
                        Start Activity →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="px-8 md:px-20 py-20 space-y-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-lg p-8 border border-gray-700/30">
              <h3 className="font-trickordead text-3xl mb-4 text-orange-400">
                Ready to Try the Activities?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Return to the main worksheet page or explore other grade levels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/worksheets/${story.slug}`}>
                  <Button
                    buttonImage={OrangeBackground}
                    altText="back-to-worksheets"
                    text="Back to Worksheets"
                  />
                </Link>
                <Link href="/worksheets">
                  <Button
                    buttonImage={YellowBackground}
                    altText="view-all-worksheets"
                    text="All Worksheets"
                    textColor="text-black"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default FunActivitiesPage;