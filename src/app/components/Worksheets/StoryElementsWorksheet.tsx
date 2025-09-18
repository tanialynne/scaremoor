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
  templateData?: {
    templateText?: string;
    examples?: {
      [key: string]: {
        definition: string;
        examples: string[];
      };
    };
  };
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
  templateData,
  onResponseChange
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  // Ensure elements is always an array
  const safeElements = Array.isArray(elements) ? elements : defaultElements;

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

      {/* Template Text and Examples Section */}
      {templateData && (
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg print:bg-white print:border-gray-300">
          {templateData.templateText && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2 print:text-gray-800">
                What are Story Elements?
              </h3>
              <p className="text-blue-700 print:text-gray-700">
                {templateData.templateText}
              </p>
            </div>
          )}

          {templateData.examples && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(templateData.examples).map(([key, data]) => (
                <div key={key} className="bg-white p-4 rounded-md border border-blue-100 print:border-gray-200">
                  <h4 className="font-semibold text-blue-800 capitalize mb-1 print:text-gray-800">
                    {key}
                  </h4>
                  <p className="text-sm text-blue-600 mb-2 print:text-gray-600">
                    {data.definition}
                  </p>
                  <ul className="text-xs text-blue-500 space-y-1 print:text-gray-500">
                    {data.examples.slice(0, 2).map((example, index) => (
                      <li key={index}>• {example}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-6">
        {safeElements.map((element) => (
          <div
            key={element.id}
            className="story-element-box bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-400 transition-colors"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              {element.label} - {element.question}
            </h4>

            {/* Show definition if available */}
            {templateData?.examples?.[element.id] && (
              <p className="text-sm text-gray-600 mb-3 print:text-gray-500">
                <span className="font-medium">Hint:</span> {templateData.examples[element.id].definition}
              </p>
            )}

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