'use client';

import React from 'react';
import WorksheetBase from './WorksheetBase';
import StoryElementsWorksheet from './StoryElementsWorksheet';
import SequencingWorksheet from './SequencingWorksheet';
import CauseEffectWorksheet from './CauseEffectWorksheet';
import PlotMountainWorksheet from './PlotMountainWorksheet';
import { OnlineWorksheet, WorksheetResponse, WorksheetSection, WorksheetQuestion, WorksheetField } from './types';

interface WorksheetRendererProps {
  worksheet: OnlineWorksheet;
  storyTitle: string;
  onSave?: (responses: WorksheetResponse) => void;
  printMode?: boolean;
}

const WorksheetRenderer: React.FC<WorksheetRendererProps> = ({
  worksheet,
  storyTitle,
  onSave,
  printMode = false
}) => {
  const [responses, setResponses] = React.useState<Record<string, Record<string, string>>>({});
  const [showBlankPrint, setShowBlankPrint] = React.useState(false);

  const handleSectionResponse = (sectionId: string, sectionResponses: Record<string, string>) => {
    setResponses(prev => ({
      ...prev,
      [sectionId]: sectionResponses
    }));
  };

  const handleSave = () => {
    // Flatten responses for the worksheet response format
    const flatResponses: Record<string, string | string[]> = {};

    Object.entries(responses).forEach(([sectionId, sectionResponses]) => {
      Object.entries(sectionResponses).forEach(([questionId, answer]) => {
        flatResponses[`${sectionId}_${questionId}`] = answer;
      });
    });

    const worksheetResponse: WorksheetResponse = {
      worksheetId: worksheet.id,
      responses: flatResponses,
      completedAt: new Date()
    };

    onSave?.(worksheetResponse);
  };

  const handlePrintWithAnswers = () => {
    setShowBlankPrint(false);
    setTimeout(() => window.print(), 100);
  };

  const handlePrintBlank = () => {
    setShowBlankPrint(true);
    setTimeout(() => {
      window.print();
      setShowBlankPrint(false);
    }, 100);
  };


  const updateFieldValue = (sectionId: string, fieldId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldId]: value
      }
    }));
  };

  const renderWorksheetSection = (section: WorksheetSection) => {
    const baseProps = {
      sectionId: section.id,
      onResponseChange: handleSectionResponse,
      responses: responses[section.id] || {},
      showBlank: showBlankPrint
    };

    switch (section.type) {
      case 'story-elements':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <StoryElementsWorksheet {...baseProps} elements={section.customProps?.elements as any} />;

      case 'sequencing':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <SequencingWorksheet {...baseProps} cards={section.customProps?.cards as any || []} />;

      case 'cause-effect':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <CauseEffectWorksheet {...baseProps} pairs={section.customProps?.pairs as any || []} />;

      case 'plot-mountain':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <PlotMountainWorksheet {...baseProps} plotPoints={section.customProps?.plotPoints as any} />;

      case 'vocabulary':
        return (
          <div className="vocabulary-worksheet space-y-4">
            <div className="instructions bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <h5 className="font-medium text-green-800 mb-2">Instructions:</h5>
              <p className="text-base text-green-700">{section.instructions}</p>
            </div>

            {section.questions.map((question: WorksheetQuestion) => (
              <div key={question.id} className="vocab-question bg-white border border-green-200 rounded-lg p-4">
                <p className="font-medium text-green-800 mb-3">{question.question}</p>

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
                          value={responses[section.id]?.[field.id] || ''}
                          onChange={(e) => updateFieldValue(section.id, field.id, e.target.value)}
                          className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border-b print:border-gray-800 print:bg-transparent print:rounded-none'}`}
                          placeholder={field.placeholder}
                        />
                        {showBlankPrint ? (
                          <div className="hidden print:block border-b border-gray-400 h-6 mb-2"></div>
                        ) : (
                          <div className="hidden print:block text-black border-b border-gray-800 min-h-6 mb-2">
                            {responses[section.id]?.[field.id] || ''}
                          </div>
                        )}
                      </>
                    )}

                    {field.type === 'textarea' && (
                      <>
                        <textarea
                          value={responses[section.id]?.[field.id] || ''}
                          onChange={(e) => updateFieldValue(section.id, field.id, e.target.value)}
                          className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border print:border-gray-800 print:bg-transparent print:rounded-none'}`}
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
                            {responses[section.id]?.[field.id] || ''}
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
            <div className="instructions bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
              <h5 className="font-medium text-purple-800 mb-2">Instructions:</h5>
              <p className="text-base text-purple-700">{section.instructions}</p>
            </div>

            {section.questions.map((question: WorksheetQuestion) => (
              <div key={question.id} className="writing-prompt bg-white border-2 border-purple-200 rounded-lg p-6">
                <h4 className="font-semibold text-purple-800 mb-4">{question.question}</h4>

                <div className="writing-area">
                  <textarea
                    value={responses[section.id]?.[`writing_${question.id}`] || ''}
                    onChange={(e) => updateFieldValue(section.id, `writing_${question.id}`, e.target.value)}
                    className={`w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border print:border-gray-800 print:bg-transparent print:rounded-none'}`}
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
                      {responses[section.id]?.[`writing_${question.id}`] || ''}
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
            <div className="instructions bg-pink-50 border-l-4 border-pink-400 p-4 rounded">
              <h5 className="font-medium text-pink-800 mb-2">Instructions:</h5>
              <p className="text-base text-pink-700">{section.instructions}</p>
            </div>

            <div className="drawing-area">
              <div className="border-2 border-dashed border-pink-400 rounded-lg p-8 bg-white min-h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">Draw</div>
                  <p>Draw your favorite scene from the story here</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium text-pink-800 mb-2">Write 3 sentences about your drawing:</p>
                <div className="space-y-2">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i}>
                      <input
                        type="text"
                        value={responses[section.id]?.[`drawing_sentence_${i + 1}`] || ''}
                        onChange={(e) => updateFieldValue(section.id, `drawing_sentence_${i + 1}`, e.target.value)}
                        className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border-b print:border-gray-800 print:bg-transparent print:rounded-none'}`}
                        placeholder={`Sentence ${i + 1}...`}
                      />
                      {showBlankPrint ? (
                        <div className="hidden print:block border-b border-gray-400 h-6 mb-2"></div>
                      ) : (
                        <div className="hidden print:block text-black border-b border-gray-800 min-h-6 mb-2">
                          {responses[section.id]?.[`drawing_sentence_${i + 1}`] || ''}
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
            <div className="instructions bg-gray-50 border-l-4 border-gray-400 p-4 rounded">
              <h5 className="font-medium text-gray-800 mb-2">Instructions:</h5>
              <p className="text-base text-gray-700">{section.instructions}</p>
            </div>

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
                          value={responses[section.id]?.[field.id] || ''}
                          onChange={(e) => updateFieldValue(section.id, field.id, e.target.value)}
                          className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border-b print:border-gray-800 print:bg-transparent print:rounded-none'}`}
                          placeholder={field.placeholder}
                        />
                        {showBlankPrint ? (
                          <div className="hidden print:block border-b border-gray-400 h-6 mb-2"></div>
                        ) : (
                          <div className="hidden print:block text-black border-b border-gray-800 min-h-6 mb-2">
                            {responses[section.id]?.[field.id] || ''}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <textarea
                          value={responses[section.id]?.[field.id] || ''}
                          onChange={(e) => updateFieldValue(section.id, field.id, e.target.value)}
                          className={`w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${showBlankPrint ? 'print:hidden' : 'print:text-black print:border print:border-gray-800 print:bg-transparent print:rounded-none'}`}
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
                            {responses[section.id]?.[field.id] || ''}
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
    <WorksheetBase
      worksheet={worksheet}
      storyTitle={storyTitle}
      onSave={handleSave}
      onPrintWithAnswers={handlePrintWithAnswers}
      onPrintBlank={handlePrintBlank}
      printMode={printMode}
    >
      <div className="worksheet-sections space-y-8 p-6">
        {worksheet.sections.map((section) => (
          <div key={section.id} className="worksheet-section">
            {/* Section Header */}
            <div className="section-header mb-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {section.title}
                </h3>
                <div className="flex items-center gap-3 text-base text-gray-600">
                  <span>Time: {section.timeEstimate}</span>
                  <div className="flex gap-1">
                    {section.solStandards.map(standard => (
                      <span
                        key={standard}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        SOL {standard}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section Content */}
            <div className="section-content">
              {renderWorksheetSection(section)}
            </div>
          </div>
        ))}
      </div>
    </WorksheetBase>
  );
};

export default WorksheetRenderer;