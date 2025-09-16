'use client';

import React, { useState } from 'react';
import StoryElementsWorksheet from './StoryElementsWorksheet';
import SequencingWorksheet from './SequencingWorksheet';
import CauseEffectWorksheet from './CauseEffectWorksheet';
import PlotMountainWorksheet from './PlotMountainWorksheet';
import { OnlineWorksheet, WorksheetSection, WorksheetQuestion, WorksheetField } from './types';

interface SingleSectionRendererProps {
  section: WorksheetSection;
  storyTitle: string;
  worksheet: OnlineWorksheet;
  onSave?: () => void;
}

const SingleSectionRenderer: React.FC<SingleSectionRendererProps> = ({
  section,
  storyTitle,
  worksheet,
  onSave
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showBlankPrint, setShowBlankPrint] = useState(false);

  const updateFieldValue = (fieldId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleSectionResponse = (sectionId: string, sectionResponses: Record<string, string>) => {
    setResponses(sectionResponses);
  };

  const handleSmartPrint = () => {
    // Check if there's any content in responses
    const hasContent = Object.values(responses).some(value => value && value.trim().length > 0);

    if (hasContent) {
      // Print with answers
      setShowBlankPrint(false);
      setTimeout(() => window.print(), 100);
    } else {
      // Print blank
      setShowBlankPrint(true);
      setTimeout(() => {
        window.print();
        setShowBlankPrint(false);
      }, 100);
    }
  };

  const getGradeColor = () => {
    // All worksheets use gray theme for better printing
    return 'from-gray-600 to-gray-800';
  };

  const renderWorksheetSection = (section: WorksheetSection) => {
    const baseProps = {
      sectionId: section.id,
      onResponseChange: handleSectionResponse,
      responses: responses,
      showBlank: showBlankPrint
    };

    switch (section.type) {
      case 'story-elements':
        return <StoryElementsWorksheet {...baseProps} elements={section.customProps?.elements as any} />;

      case 'sequencing':
        return <SequencingWorksheet {...baseProps} cards={section.customProps?.cards as any || []} />;

      case 'cause-effect':
        return <CauseEffectWorksheet {...baseProps} pairs={section.customProps?.pairs as any || []} />;

      case 'plot-mountain':
        return <PlotMountainWorksheet {...baseProps} plotPoints={section.customProps?.plotPoints as any} />;

      case 'vocabulary':
        return (
          <div className="vocabulary-worksheet space-y-4">
            {section.questions.map((question: WorksheetQuestion) => (
              <div key={question.id} className="vocab-question bg-white border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-800 mb-3">{question.question}</p>

                {question.fields.map((field: WorksheetField) => (
                  <div key={field.id} className="mb-4">
                    {field.label && (
                      <label className="block text-base font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                    )}

                    {field.type === 'text' && (
                      <>
                        <input
                          type="text"
                          value={responses[field.id] || ''}
                          onChange={(e) => updateFieldValue(field.id, e.target.value)}
                          className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border-b print:border-gray-800 print:bg-transparent print:rounded-none'}`}
                          placeholder={field.placeholder}
                        />
                        {showBlankPrint ? (
                          <div className="hidden print:block border-b border-gray-400 h-6 mb-2"></div>
                        ) : (
                          <div className="hidden print:block text-black border-b border-gray-800 min-h-6 mb-2">
                            {responses[field.id] || ''}
                          </div>
                        )}
                      </>
                    )}

                    {field.type === 'textarea' && (
                      <>
                        <textarea
                          value={responses[field.id] || ''}
                          onChange={(e) => updateFieldValue(field.id, e.target.value)}
                          className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border print:border-gray-800 print:bg-transparent print:rounded-none'}`}
                          rows={field.lines || 3}
                          placeholder={field.placeholder}
                        />
                        {showBlankPrint ? (
                          <div className="hidden print:block">
                            {Array.from({ length: field.lines || 3 }, (_, i) => (
                              <div key={i} className="border-b border-gray-400 h-6 mb-2"></div>
                            ))}
                          </div>
                        ) : (
                          <div className="hidden print:block text-black border border-gray-800 min-h-16 p-2 mb-2 whitespace-pre-wrap">
                            {responses[field.id] || ''}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case 'creative-writing':
        return (
          <div className="creative-writing-worksheet space-y-4">
            {section.questions.map((question: WorksheetQuestion) => (
              <div key={question.id} className="writing-prompt bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">{question.question}</h4>

                <div className="writing-area">
                  <textarea
                    value={responses[`writing_${question.id}`] || ''}
                    onChange={(e) => updateFieldValue(`writing_${question.id}`, e.target.value)}
                    className={`w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border print:border-gray-800 print:bg-transparent print:rounded-none'}`}
                    rows={12}
                    placeholder="Write your story here..."
                  />

                  {showBlankPrint ? (
                    <div className="hidden print:block space-y-2">
                      {Array.from({ length: 15 }, (_, i) => (
                        <div key={i} className="border-b border-gray-400 h-6"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="hidden print:block text-black border border-gray-800 min-h-96 p-4 mb-2 whitespace-pre-wrap">
                      {responses[`writing_${question.id}`] || ''}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'drawing':
        return (
          <div className="drawing-worksheet space-y-4">
            <div className="drawing-area">
              <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 bg-white min-h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🎨</div>
                  <p>Draw your favorite scene from the story here</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium text-gray-800 mb-2">Write 3 sentences about your drawing:</p>
                <div className="space-y-2">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i}>
                      <input
                        type="text"
                        value={responses[`drawing_sentence_${i + 1}`] || ''}
                        onChange={(e) => updateFieldValue(`drawing_sentence_${i + 1}`, e.target.value)}
                        className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border-b print:border-gray-800 print:bg-transparent print:rounded-none'}`}
                        placeholder={`Sentence ${i + 1}...`}
                      />
                      {showBlankPrint ? (
                        <div className="hidden print:block border-b border-gray-400 h-6 mb-2"></div>
                      ) : (
                        <div className="hidden print:block text-black border-b border-gray-800 min-h-6 mb-2">
                          {responses[`drawing_sentence_${i + 1}`] || ''}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="generic-worksheet space-y-4">
            {section.questions.map((question: WorksheetQuestion) => (
              <div key={question.id} className="question bg-white border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-800 mb-3">{question.question}</p>

                {question.fields.map((field: WorksheetField) => (
                  <div key={field.id} className="mb-4">
                    {field.label && (
                      <label className="block text-base font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                    )}
                    {field.type === 'text' ? (
                      <>
                        <input
                          type="text"
                          value={responses[field.id] || ''}
                          onChange={(e) => updateFieldValue(field.id, e.target.value)}
                          className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border-b print:border-gray-800 print:bg-transparent print:rounded-none'}`}
                          placeholder={field.placeholder}
                        />
                        {showBlankPrint ? (
                          <div className="hidden print:block border-b border-gray-400 h-6 mb-2"></div>
                        ) : (
                          <div className="hidden print:block text-black border-b border-gray-800 min-h-6 mb-2">
                            {responses[field.id] || ''}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <textarea
                          value={responses[field.id] || ''}
                          onChange={(e) => updateFieldValue(field.id, e.target.value)}
                          className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border print:border-gray-800 print:bg-transparent print:rounded-none'}`}
                          rows={field.lines || 3}
                          placeholder={field.placeholder}
                        />
                        {showBlankPrint ? (
                          <div className="hidden print:block">
                            {Array.from({ length: field.lines || 3 }, (_, i) => (
                              <div key={i} className="border-b border-gray-400 h-6 mb-2"></div>
                            ))}
                          </div>
                        ) : (
                          <div className="hidden print:block text-black border border-gray-800 min-h-16 p-2 mb-2 whitespace-pre-wrap">
                            {responses[field.id] || ''}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
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
      <div className={`worksheet-header bg-gradient-to-r ${getGradeColor()} text-white p-2 rounded-t-xl mb-3 print:p-1 print:mb-2`}>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <label className="block text-xs text-white/80 mb-1">Name:</label>
            <div className="border-b border-white/50 h-6 w-48 print:border-black"></div>
          </div>
          <div className="text-right">
            <h1 className="text-base font-bold mb-0 print:text-sm">
              {storyTitle} - {section.title}
            </h1>
            <div className="text-xs opacity-90 print:text-xs">
              Grade {worksheet.grade} • SOL: {section.solStandards.join(', ')}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="bg-gray-50 border-l-4 border-gray-400 p-3 rounded mb-4 print:bg-white print:border-black print:p-2">
        <h4 className="font-semibold text-gray-800 mb-2 text-sm">Instructions:</h4>
        <p className="text-gray-700 text-sm">{section.instructions}</p>
      </div>

      {/* Section Content */}
      <div className="worksheet-content bg-white rounded-lg p-6 mb-6">
        {renderWorksheetSection(section)}
      </div>

      {/* Controls - Not printed */}
      <div className="worksheet-controls bg-gray-50 p-4 rounded-lg border print:hidden">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <button
            onClick={handleSmartPrint}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center gap-2"
          >
            🖨️ Print Worksheet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleSectionRenderer;