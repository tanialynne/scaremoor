'use client';

import React from 'react';
import Link from 'next/link';

interface FunActivitiesAccordionProps {
  storySlug: string;
  isOpen: boolean;
  onToggle: () => void;
}

interface FunActivity {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  skills: string[];
}

const FunActivitiesAccordion: React.FC<FunActivitiesAccordionProps> = ({
  storySlug,
  isOpen,
  onToggle
}) => {
  const funActivities: FunActivity[] = [
    {
      id: 'word-search',
      title: 'Word Search Puzzle',
      description: 'Find hidden words from the story in an interactive grid. Words can go across, down, or diagonal.',
      icon: '🔤',
      estimatedTime: '15 minutes',
      skills: ['Vocabulary', 'Pattern Recognition', 'Spelling']
    },
    {
      id: 'story-bingo',
      title: 'Story Bingo',
      description: 'Mark off story elements as they appear. Get five in a row to win! Perfect for story review.',
      icon: '🎯',
      estimatedTime: '10 minutes',
      skills: ['Reading Comprehension', 'Listening Skills', 'Story Elements']
    },
    {
      id: 'cryptogram',
      title: 'Secret Message Puzzles',
      description: 'Decode three different cryptograms with important messages from the story using various cipher systems.',
      icon: '🔐',
      estimatedTime: '20 minutes',
      skills: ['Problem Solving', 'Logic', 'Pattern Recognition']
    },
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble mixed-up words from the story. Use hints to help you figure out each word.',
      icon: '🔤',
      estimatedTime: '15 minutes',
      skills: ['Vocabulary', 'Spelling', 'Word Recognition']
    },
    {
      id: 'crossword',
      title: 'Crossword Puzzle',
      description: 'Complete a crossword puzzle with clues about characters, events, and themes from the story.',
      icon: '✏️',
      estimatedTime: '25 minutes',
      skills: ['Reading Comprehension', 'Vocabulary', 'Critical Thinking']
    },
    {
      id: 'hidden-message',
      title: 'Hidden Message Puzzle',
      description: 'Answer questions about the story, then use the first letter of each answer to reveal a secret message.',
      icon: '🔍',
      estimatedTime: '20 minutes',
      skills: ['Reading Comprehension', 'Critical Thinking', 'Problem Solving']
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/30 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left hover:bg-gray-700/20 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-trickordead text-2xl text-white mb-1">
              Fun Activities & Puzzles
            </h3>
            <p className="text-gray-400 text-base">
              Interactive games and brain teasers • All Grade Levels • 6 Activities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm bg-purple-700/30 text-purple-300 px-2 py-1 rounded border border-purple-600/50">
              All Grades
            </span>
            <svg
              className={`w-6 h-6 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="border-t border-gray-600/30 pt-6">
            <div className="mb-6">
              <p className="text-gray-300 text-base">
                These engaging puzzles and games help students review the story while building vocabulary,
                critical thinking, and problem-solving skills. Perfect for centers, homework, or extension activities!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {funActivities.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/worksheets/${storySlug}/fun-activities/${activity.id}`}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:bg-gray-700/40">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl flex-shrink-0">{activity.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-orange-300 transition-colors">
                          {activity.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {activity.estimatedTime}
                      </span>
                      <span>•</span>
                      <span>{activity.skills.join(', ')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 bg-purple-900/20 rounded-lg p-4 border border-purple-700/30">
              <h4 className="font-semibold text-purple-300 mb-2">💡 Perfect For:</h4>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-purple-200">
                <div className="space-y-1">
                  <div>• Learning centers and stations</div>
                  <div>• Indoor recess activities</div>
                  <div>• Early finisher tasks</div>
                </div>
                <div className="space-y-1">
                  <div>• Homework extensions</div>
                  <div>• Review and reinforcement</div>
                  <div>• Family learning time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunActivitiesAccordion;