'use client';

import React, { useState, useCallback, useMemo } from 'react';

interface HiddenMessagePuzzleProps {
  sectionId: string;
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
  storyData?: Record<string, unknown>;
  showInstructionsModal?: boolean;
  onCloseInstructions?: () => void;
}

interface PuzzleItem {
  number: number;
  question: string;
  answer: string;
  firstLetter: string;
  hint?: string;
}

const HiddenMessagePuzzle: React.FC<HiddenMessagePuzzleProps> = ({
  sectionId,
  onResponseChange,
  storyData,
  showInstructionsModal = false,
  onCloseInstructions,
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [revealedMessage, setRevealedMessage] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  // Get story-specific puzzle data or fallback to default
  const getStoryPuzzleData = useCallback((): { items: PuzzleItem[], message: string } => {
    const storyPuzzleData = (storyData?.hiddenMessagePuzzle as { items?: PuzzleItem[], message?: string }) ||
                           (storyData?.questions as { items?: PuzzleItem[], message?: string });

    if (storyPuzzleData && storyPuzzleData.items && storyPuzzleData.items.length > 0) {
      return {
        items: storyPuzzleData.items,
        message: storyPuzzleData.message || 'MYSTERY'
      };
    }

    // Default fallback puzzles (generic/template)
    return {
      items: [
        { number: 1, question: 'Main character in the story', answer: 'HERO', firstLetter: 'H', hint: 'Protagonist' },
        { number: 2, question: 'Where does the story take place?', answer: 'EDUCATION', firstLetter: 'E', hint: 'Learning environment' },
        { number: 3, question: 'What lesson is learned?', answer: 'LEARNING', firstLetter: 'L', hint: 'Gaining knowledge' },
        { number: 4, question: 'What do characters find?', answer: 'PURPOSE', firstLetter: 'P', hint: 'Reason or meaning' },
        { number: 5, question: 'Type of story genre?', answer: 'MYSTERY', firstLetter: 'M', hint: 'Unknown to be solved' },
        { number: 6, question: 'Story outcome?', answer: 'ENDING', firstLetter: 'E', hint: 'Conclusion' }
      ],
      message: 'HELP ME'
    };
  }, [storyData]);

  const puzzleData = useMemo(() => getStoryPuzzleData(), [getStoryPuzzleData]);
  const puzzleItems: PuzzleItem[] = puzzleData.items;
  const hiddenMessage = puzzleData.message;

  const handleInputChange = useCallback((itemNumber: number, value: string) => {
    const newResponses = { ...responses, [`item-${itemNumber}`]: value };
    setResponses(newResponses);

    onResponseChange?.(sectionId, newResponses);
  }, [responses, sectionId, onResponseChange]);

  const checkAnswer = (itemNumber: number): 'correct' | 'incorrect' | 'none' => {
    if (!checkedItems.has(itemNumber)) return 'none';

    const response = responses[`item-${itemNumber}`];
    if (!response || response.trim() === '') return 'none';

    const item = puzzleItems.find(p => p.number === itemNumber);
    if (!item) return 'none';

    return response.toUpperCase().trim() === item.answer.toUpperCase() ? 'correct' : 'incorrect';
  };

  const updateRevealedMessage = useCallback(() => {
    let message = '';
    puzzleItems.forEach((item) => {
      const userAnswer = responses[`item-${item.number}`] || '';
      const isCorrect = userAnswer.toUpperCase().trim() === item.answer.toUpperCase();
      message += isCorrect ? item.firstLetter : '_';

      // Add spaces based on the hidden message structure
      if (hiddenMessage.includes(' ')) {
        const currentLength = message.length;
        const targetChar = hiddenMessage[currentLength];
        if (targetChar === ' ') {
          message += ' ';
        }
      }
    });
    setRevealedMessage(message);
  }, [responses, puzzleItems, hiddenMessage]);

  const getStatusColor = (status: 'correct' | 'incorrect' | 'none') => {
    switch (status) {
      case 'correct': return 'border-green-500 bg-green-50';
      case 'incorrect': return 'border-red-500 bg-red-50';
      case 'none': return 'border-gray-300 bg-gray-50';
    }
  };

  const getStatusIcon = (status: 'correct' | 'incorrect' | 'none') => {
    switch (status) {
      case 'correct': return '✅';
      case 'incorrect': return '❌';
      case 'none': return '';
    }
  };

  return (
    <div className="hidden-message-puzzle space-y-6">
      <style jsx>{`
        @media print {
          .puzzle-item {
            border: 1px solid #333 !important;
            padding: 10px !important;
            page-break-inside: avoid !important;
          }

          .answer-input {
            border: 2px solid #333 !important;
            background: white !important;
            font-size: 14px !important;
            min-height: 25px !important;
          }

          .hidden-message-display {
            border: 3px solid #333 !important;
            background: #f5f5f5 !important;
            font-size: 24px !important;
            font-weight: bold !important;
            letter-spacing: 3px !important;
          }

          .online-controls {
            display: none !important;
          }
        }
      `}</style>



      {showInstructionsModal && (
        <div
          className="fixed inset-0 w-full h-full backdrop-blur-sm flex items-center justify-center z-50 print:hidden"
          style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(107, 114, 128, 0.3)'}}
          onClick={onCloseInstructions}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-2xl h-auto max-h-[80vh] mx-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800 text-lg">
                🔍 How to Find the Hidden Message:
              </h3>
              <button
                onClick={onCloseInstructions}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            <div className="text-gray-700 space-y-2">
              <p className="text-sm">
                <strong>1. Answer each question:</strong> Read the questions about the story and type your answers.
              </p>
              <p className="text-sm">
                <strong>2. Use the hints:</strong> Look for 💡 hints if you need help with any question.
              </p>
              <p className="text-sm">
                <strong>3. Check your work:</strong> Click "Check Answer" for each question to see if you're right.
              </p>
              <p className="text-sm">
                <strong>4. Watch the message appear:</strong> The first letter of each correct answer will spell out a secret message!
              </p>
              <p className="text-sm">
                <strong>5. Example:</strong> If answers are "PENCIL", "ERASER", "NOTEBOOK" → Hidden message: "P-E-N"
              </p>
              <p className="text-sm">
                <strong>Step-by-step process:</strong> Answer correctly → Take first letter → Put letters together → Reveal message!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Puzzle Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {puzzleItems.map((item) => {
          const status = checkAnswer(item.number);
          const statusColor = getStatusColor(status);
          const statusIcon = getStatusIcon(status);

          return (
            <div
              key={item.number}
              className={`puzzle-item flex flex-col gap-3 p-4 rounded-lg border-2 transition-all ${statusColor}`}
            >
              <div className="flex items-start gap-2">
                <div className="number font-bold text-gray-800 text-xl min-w-[30px]">
                  {item.number}.
                </div>
                <div className="question flex-1 text-gray-700">
                  {item.question}
                  {item.hint && (
                    <div className="text-sm text-gray-500 italic mt-1">
                      💡 {item.hint}
                    </div>
                  )}
                </div>
              </div>

              <div className="answer-section">
                <input
                  type="text"
                  value={responses[`item-${item.number}`] || ''}
                  onChange={(e) => handleInputChange(item.number, e.target.value)}
                  placeholder="Your answer..."
                  className="answer-input w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 mb-2"
                />
                <div className="flex items-center justify-between">
                  <div className="online-controls print:hidden text-xl">
                    {statusIcon}
                  </div>
                  <div className="online-controls print:hidden flex gap-2">
                    <button
                      onClick={() => {
                        setCheckedItems(prev => new Set([...prev, item.number]));
                        updateRevealedMessage();
                      }}
                      disabled={!responses[`item-${item.number}`] || responses[`item-${item.number}`].trim() === ''}
                      className={`px-3 py-2 rounded text-sm transition-colors min-h-[44px] ${
                        responses[`item-${item.number}`] && responses[`item-${item.number}`].trim() !== ''
                          ? "bg-gray-700 text-white hover:bg-gray-800"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Check Answer
                    </button>
                    <button
                      onClick={() => handleInputChange(item.number, item.answer)}
                      disabled={!checkedItems.has(item.number)}
                      className={`px-3 py-2 rounded text-sm transition-colors min-h-[44px] ${
                        checkedItems.has(item.number)
                          ? "bg-gray-600 text-white hover:bg-gray-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Show
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hidden Message Display */}
      <div className="hidden-message-display bg-gray-100 border-3 border-gray-400 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hidden Message:</h3>
        <div className="text-3xl font-mono font-bold text-gray-800 tracking-widest">
          {revealedMessage || hiddenMessage.split('').map(char => char === ' ' ? ' ' : '_').join(' ')}
        </div>
        {revealedMessage === hiddenMessage && (
          <div className="mt-4 text-green-600 font-bold text-lg">
            🎉 You discovered the hidden message! 🎉
          </div>
        )}
      </div>

      {/* Progress Display */}
      <div className="bg-gray-50 p-4 rounded">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            Questions Answered: <span className="font-bold">
              {puzzleItems.filter(item => checkAnswer(item.number) === 'correct').length}
            </span> / {puzzleItems.length}
          </span>
          <div className="online-controls print:hidden">
            {revealedMessage === hiddenMessage && (
              <span className="text-green-600 font-bold">🎉 Hidden message revealed!</span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-gray-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(puzzleItems.filter(item => checkAnswer(item.number) === 'correct').length / puzzleItems.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Print Instructions */}
      <div className="hidden print:block mt-8">
        <h3 className="font-semibold text-gray-800 text-lg mb-4">
          🔍 How to Find the Hidden Message:
        </h3>
        <div className="text-gray-700 space-y-2">
          <p className="text-sm">
            <strong>1. Answer each question:</strong> Read the questions about the story and type your answers.
          </p>
          <p className="text-sm">
            <strong>2. Use the hints:</strong> Look for 💡 hints if you need help with any question.
          </p>
          <p className="text-sm">
            <strong>3. Check your work:</strong> Click "Check Answer" for each question to see if you're right.
          </p>
          <p className="text-sm">
            <strong>4. Watch the message appear:</strong> The first letter of each correct answer will spell out a secret message!
          </p>
          <p className="text-sm">
            <strong>5. Example:</strong> If answers are "PENCIL", "ERASER", "NOTEBOOK" → Hidden message: "P-E-N"
          </p>
          <p className="text-sm">
            <strong>Step-by-step process:</strong> Answer correctly → Take first letter → Put letters together → Reveal message!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HiddenMessagePuzzle;