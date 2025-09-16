'use client'

import { useState } from 'react';
import Link from 'next/link';
import { OnlineWorksheet } from '../Worksheets/types';

interface WorksheetAccordionProps {
  worksheet: OnlineWorksheet;
  storySlug: string;
  isOpen: boolean;
  onToggle: () => void;
  gradeDescription?: string;
}

interface ActivityCardProps {
  section: any;
  storySlug: string;
  grade: number;
  index: number;
}

const getActivityTypeName = (type: string, title: string) => {
  // Map current types to standardized display names
  switch (type) {
    case 'story-elements':
    case 'sequencing':
    case 'comprehension':
      return 'Comprehension';
    case 'vocabulary':
      return 'Vocabulary';
    case 'cause-effect':
    case 'plot-mountain':
    case 'analysis':
      return 'Analysis';
    case 'drawing':
    case 'art':
      return 'Art';
    case 'creative-writing':
      return 'Creative writing';
    case 'game':
      return 'Game';
    case 'custom':
      // For custom types, derive from title and map to standard types
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('theme') || lowerTitle.includes('detective')) return 'Analysis';
      if (lowerTitle.includes('character')) return 'Analysis';
      if (lowerTitle.includes('inference')) return 'Analysis';
      if (lowerTitle.includes('figurative') || lowerTitle.includes('language')) return 'Analysis';
      if (lowerTitle.includes('alternate') || lowerTitle.includes('ending')) return 'Creative writing';
      return 'Analysis';
    default:
      return type.replace('-', ' ');
  }
};

const getActivityDescription = (type: string, title: string) => {
  const lowerTitle = title.toLowerCase();

  switch (type) {
    case 'story-elements': return 'Identify characters, setting, problem, and solution';
    case 'sequencing': return 'Put story events in correct order';
    case 'vocabulary': return 'Guess word meanings from story context';
    case 'cause-effect': return 'Identify cause and effect relationships in the story';
    case 'plot-mountain': return 'Chart the story\'s plot structure';
    case 'drawing': return 'Illustrate a scene from the story';
    case 'creative-writing': return 'Write about finding your own magical door';
    case 'custom':
      if (lowerTitle.includes('theme') || lowerTitle.includes('detective')) return 'Identify the story\'s theme using text evidence';
      if (lowerTitle.includes('character')) return 'Analyze Dani\'s character traits with evidence';
      if (lowerTitle.includes('inference')) return 'Make inferences about unstated information';
      if (lowerTitle.includes('figurative') || lowerTitle.includes('language')) return 'Find and analyze descriptive language';
      if (lowerTitle.includes('alternate') || lowerTitle.includes('ending')) return 'Create a different conclusion to the story';
      return 'Complete analysis activity';
    default: return 'Complete the worksheet activity';
  }
};

const getActivityMaterials = (type: string, title: string) => {
  const lowerTitle = title.toLowerCase();

  switch (type) {
    case 'sequencing': return 'Scissors, Event cards';
    case 'drawing': return 'Drawing materials';
    default: return null;
  }
};

// Activity Card Component (matching the Grade-Level Activities design)
const ActivityCard: React.FC<ActivityCardProps> = ({ section, storySlug, grade, index }) => {
  const getActivityIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('story') || lowerTitle.includes('elements')) return '📖';
    if (lowerTitle.includes('sequencing') || lowerTitle.includes('order')) return '🔢';
    if (lowerTitle.includes('vocabulary')) return '📝';
    if (lowerTitle.includes('inference') || lowerTitle.includes('think')) return '🧠';
    if (lowerTitle.includes('plot') || lowerTitle.includes('mountain')) return '⛰️';
    if (lowerTitle.includes('drawing') || lowerTitle.includes('draw')) return '🎨';
    if (lowerTitle.includes('cause') || lowerTitle.includes('effect')) return '➡️';
    if (lowerTitle.includes('writing') || lowerTitle.includes('creative')) return '✍️';
    if (lowerTitle.includes('analysis') || lowerTitle.includes('detective')) return '🔍';
    return '📋';
  };

  const getTypeColor = (type: string, title: string) => {
    // Map to standardized activity type first
    const standardType = getStandardActivityType(type, title);

    switch (standardType) {
      case 'comprehension':
        return 'border-blue-700/50 bg-blue-900/20';
      case 'vocabulary':
        return 'border-green-700/50 bg-green-900/20';
      case 'analysis':
        return 'border-orange-700/50 bg-orange-900/20';
      case 'creative-writing':
        return 'border-purple-700/50 bg-purple-900/20';
      case 'art':
        return 'border-pink-700/50 bg-pink-900/20';
      case 'game':
        return 'border-cyan-700/50 bg-cyan-900/20';
      default:
        return 'border-gray-700/50 bg-gray-900/20';
    }
  };

  // Helper function to get standardized activity type
  const getStandardActivityType = (type: string, title: string) => {
    switch (type) {
      case 'story-elements':
      case 'sequencing':
      case 'comprehension':
        return 'comprehension';
      case 'vocabulary':
        return 'vocabulary';
      case 'cause-effect':
      case 'plot-mountain':
      case 'analysis':
        return 'analysis';
      case 'drawing':
      case 'art':
        return 'art';
      case 'creative-writing':
        return 'creative-writing';
      case 'game':
        return 'game';
      case 'custom':
        // For custom types, derive from title
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('theme') || lowerTitle.includes('detective')) return 'analysis';
        if (lowerTitle.includes('character')) return 'analysis';
        if (lowerTitle.includes('inference')) return 'analysis';
        if (lowerTitle.includes('figurative') || lowerTitle.includes('language')) return 'analysis';
        if (lowerTitle.includes('alternate') || lowerTitle.includes('ending')) return 'creative-writing';
        return 'analysis';
      default:
        return 'comprehension';
    }
  };

  return (
    <div className={`rounded-lg p-6 border ${getTypeColor(section.type, section.title)} hover:border-opacity-70 transition-all duration-300 flex flex-col h-full`}>
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">{getActivityIcon(section.title)}</span>
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{section.title.replace(/[📖🔢📝🧠⛰️🎨➡️✍️🔍📋]/g, '').trim()}</h4>
          <p className="text-base text-gray-400">{getActivityTypeName(section.type, section.title)} • {section.timeEstimate}</p>
        </div>
      </div>

      <div className="flex-1">
        <p className="text-gray-300 text-base mb-2">{getActivityDescription(section.type, section.title)}</p>

        <p className="text-gray-400 text-sm mb-4">Instructions: {section.instructions}</p>

        {getActivityMaterials(section.type, section.title) && (
          <p className="text-blue-300 text-sm mb-4">
            Materials: {getActivityMaterials(section.type, section.title)}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mb-4">
          {section.solStandards.map((standard: string) => (
            <span key={standard} className="text-sm bg-gray-700/50 text-gray-300 px-2 py-1 rounded">
              SOL {standard}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <Link
          href={`/worksheets/${storySlug}/online/grade/${grade}/section/${section.id}`}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm font-medium"
        >
          🖥️ Start Activity
        </Link>
        <button
          onClick={() => window.open(`/worksheets/${storySlug}/online/grade/${grade}/section/${section.id}?print=true`, '_blank')}
          className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
          title="Print this activity"
        >
          🖨️ Print
        </button>
      </div>
    </div>
  );
};

const WorksheetAccordion: React.FC<WorksheetAccordionProps> = ({
  worksheet,
  storySlug,
  isOpen,
  onToggle,
  gradeDescription
}) => {
  const getGradeColors = (grade: number) => {
    switch (grade) {
      case 3: return {
        header: 'bg-blue-900/30 border-blue-700/50',
        headerText: 'text-blue-300',
        headerDesc: 'text-blue-200',
        content: 'bg-blue-900/10 border-blue-700/30'
      };
      case 4: return {
        header: 'bg-purple-900/30 border-purple-700/50',
        headerText: 'text-purple-300',
        headerDesc: 'text-purple-200',
        content: 'bg-purple-900/10 border-purple-700/30'
      };
      case 5: return {
        header: 'bg-red-900/30 border-red-700/50',
        headerText: 'text-red-300',
        headerDesc: 'text-red-200',
        content: 'bg-red-900/10 border-red-700/30'
      };
      default: return {
        header: 'bg-gray-900/30 border-gray-700/50',
        headerText: 'text-gray-300',
        headerDesc: 'text-gray-200',
        content: 'bg-gray-900/10 border-gray-700/30'
      };
    }
  };

  const colors = getGradeColors(worksheet.grade);

  const getGradeDescription = (grade: number) => {
    switch (grade) {
      case 3: return 'Focus on story elements, sequencing, and basic comprehension';
      case 4: return 'Focus on cause & effect, theme analysis, and character development';
      case 5: return 'Focus on inference, literary analysis, and advanced writing';
      default: return 'Grade-level differentiated activities';
    }
  };

  return (
    <div className="space-y-0">
      {/* Header - Matches Grade-Level Activities design */}
      <button
        onClick={onToggle}
        className={`w-full ${colors.header} ${isOpen ? 'rounded-t-xl border-b-0' : 'rounded-xl'} p-4 border text-left hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`font-trickordead text-2xl ${colors.headerText} mb-1`}>
              Grade {worksheet.grade} Activities
            </h3>
            <p className={`${colors.headerDesc} text-base`}>
              {gradeDescription || getGradeDescription(worksheet.grade)}
            </p>
          </div>
          <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className={`w-6 h-6 ${colors.headerText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Content - Collapsible, matches Grade-Level Activities design */}
      {isOpen && (
        <div className={`${colors.content} rounded-b-xl p-6 border border-t-0`}>
          {/* Activities Grid - matching ActivityCard design */}
          <div className="grid md:grid-cols-2 gap-6">
            {worksheet.sections.map((section, index) => (
              <ActivityCard
                key={section.id}
                section={section}
                storySlug={storySlug}
                grade={worksheet.grade}
                index={index}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-500/20 pt-6 mt-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href={`/worksheets/${storySlug}/online/grade/${worksheet.grade}/section/${worksheet.sections[0].id}`}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                📚 Start All Activities
              </Link>
              <button
                onClick={() => {
                  worksheet.sections.forEach((section, index) => {
                    setTimeout(() => {
                      window.open(`/worksheets/${storySlug}/online/grade/${worksheet.grade}/section/${section.id}?print=true`, '_blank');
                    }, index * 100);
                  });
                }}
                className="px-4 py-2 bg-yellow-600 text-black rounded-md hover:bg-yellow-700 transition-colors text-sm font-medium"
                title="Print all activities"
              >
                🖨️ Print All Activities
              </button>
              <Link
                href={`/worksheets/${storySlug}/online/grade/${worksheet.grade}`}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
              >
                📋 View Full Page
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksheetAccordion;