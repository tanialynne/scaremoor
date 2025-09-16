'use client';

import React, { useState } from 'react';

interface StoryElement {
  id: string;
  label: string;
  question: string;
  lines: number;
}

interface StoryElementsWorksheetProps {
  sectionId: string;
  elements?: StoryElement[];
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
}

const defaultElements: StoryElement[] = [
  {
    id: 'characters',
    label: 'Characters',
    question: 'Who is in the story?',
    lines: 2
  },
  {
    id: 'setting',
    label: 'Setting',
    question: 'Where and when does the story happen?',
    lines: 2
  },
  {
    id: 'problem',
    label: 'Problem',
    question: 'What goes wrong in the story?',
    lines: 2
  },
  {
    id: 'solution',
    label: 'Solution',
    question: 'How is the problem solved (or not solved)?',
    lines: 2
  }
];

const StoryElementsWorksheet: React.FC<StoryElementsWorksheetProps> = ({
  sectionId,
  elements = defaultElements,
  onResponseChange
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleInputChange = (elementId: string, value: string) => {
    const newResponses = { ...responses, [elementId]: value };
    setResponses(newResponses);
    onResponseChange?.(sectionId, newResponses);
  };

  return (
    <div className="story-elements-worksheet">
      <style jsx>{`
        @media print {
          .story-element-box {
            border: 2px solid #333 !important;
            background: white !important;
            margin-bottom: 20px !important;
            padding: 15px !important;
            page-break-inside: avoid;
          }

          .story-element-box h4 {
            color: #333 !important;
            font-weight: bold !important;
            margin-bottom: 10px !important;
          }

          .story-lines {
            border-bottom: 1px solid #333 !important;
            height: 25px !important;
            margin: 8px 0 !important;
            background: transparent !important;
          }

          .online-input {
            display: none !important;
          }
        }
      `}</style>

      <div className="space-y-6">
        {elements.map((element) => (
          <div
            key={element.id}
            className="story-element-box bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-400 transition-colors"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              {element.label} - {element.question}
            </h4>

            {/* Online Version - Interactive */}
            <div className="online-input print:hidden">
              <textarea
                value={responses[element.id] || ''}
                onChange={(e) => handleInputChange(element.id, e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                rows={element.lines}
                placeholder={`Type your answer about ${element.label.toLowerCase()} here...`}
              />
            </div>

            {/* Print Version - Lines */}
            <div className="print-lines hidden print:block">
              {Array.from({ length: element.lines }, (_, i) => (
                <div
                  key={i}
                  className="story-lines border-b border-gray-400 h-6 mb-2"
                />
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default StoryElementsWorksheet;