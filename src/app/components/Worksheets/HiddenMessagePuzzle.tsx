'use client';

import React, { useState, useCallback, useMemo } from 'react';

interface HiddenMessagePuzzleProps {
  sectionId: string;
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
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
  onResponseChange
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [revealedMessage, setRevealedMessage] = useState<string>('');

  const puzzleItems: PuzzleItem[] = useMemo(() => [
    { number: 1, question: 'What subject does Mr. Devlin teach?', answer: 'CHEMISTRY', firstLetter: 'C', hint: 'Science class with experiments' },
    { number: 2, question: 'What does Dani use to open the door?', answer: 'HANDLE', firstLetter: 'H', hint: 'She touches the door with her...' },
    { number: 3, question: "Dani's favorite food?", answer: 'ONION', firstLetter: 'O', hint: 'Rings on pizza, makes her allergic friend sick' },
    { number: 4, question: 'The door is painted what color?', answer: 'OLD', firstLetter: 'O', hint: 'Ancient, aged, not new' },
    { number: 5, question: 'What does the hallway contain?', answer: 'SHELVES', firstLetter: 'S', hint: 'Drawers sit on these' },
    { number: 6, question: 'What happens to Trevor?', answer: 'ERASED', firstLetter: 'E', hint: 'Completely removed from existence' },
    { number: 7, question: 'What must Dani do at the end?', answer: 'WALK', firstLetter: 'W', hint: 'Move away on foot' },
    { number: 8, question: 'The brass object Dani finds?', answer: 'INSTRUMENT', firstLetter: 'I', hint: 'Musical tool, or in this case, a key' },
    { number: 9, question: 'What does the door do to Dani\'s life?', answer: 'SIMPLIFIES', firstLetter: 'S', hint: 'Makes easier, removes complications' },
    { number: 10, question: 'Who returns to Dani\'s class?', answer: 'EVA', firstLetter: 'E', hint: 'Friend whose name sounds like "Ava"' },
    { number: 11, question: 'Where does Dani first find the door?', answer: 'LOCKER', firstLetter: 'L', hint: 'Storage space in school hallway' },
    { number: 12, question: "What's Dani's friend with yogurt on chin?", answer: 'YOUNGSTER', firstLetter: 'Y', hint: 'Young person, kid' }
  ], []);

  const hiddenMessage = 'CHOOSE WISELY';

  const handleInputChange = useCallback((itemNumber: number, value: string) => {
    const newResponses = { ...responses, [`item-${itemNumber}`]: value };
    setResponses(newResponses);

    // Generate revealed message from first letters of correct answers
    let message = '';
    puzzleItems.forEach(item => {
      const userAnswer = itemNumber === item.number ? value : responses[`item-${item.number}`] || '';
      const isCorrect = userAnswer.toUpperCase().trim() === item.answer.toUpperCase();
      message += isCorrect ? item.firstLetter : '_';
      if (item.number === 6) message += ' '; // Add space between CHOOSE and WISELY
    });

    setRevealedMessage(message);

    onResponseChange?.(sectionId, {
      ...newResponses,
      'revealed-message': message,
      'puzzle-complete': message === hiddenMessage ? 'true' : 'false'
    });
  }, [responses, sectionId, onResponseChange, puzzleItems, hiddenMessage]);

  const checkAnswer = (itemNumber: number): 'correct' | 'incorrect' | 'none' => {
    const response = responses[`item-${itemNumber}`];
    if (!response || response.trim() === '') return 'none';

    const item = puzzleItems.find(p => p.number === itemNumber);
    if (!item) return 'none';

    return response.toUpperCase().trim() === item.answer.toUpperCase() ? 'correct' : 'incorrect';
  };

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


      {/* Puzzle Items */}
      <div className="space-y-4">
        {puzzleItems.map((item) => {
          const status = checkAnswer(item.number);
          const statusColor = getStatusColor(status);
          const statusIcon = getStatusIcon(status);

          return (
            <div
              key={item.number}
              className={`puzzle-item flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${statusColor}`}
            >
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

              <div className="answer-section flex items-center gap-3">
                <input
                  type="text"
                  value={responses[`item-${item.number}`] || ''}
                  onChange={(e) => handleInputChange(item.number, e.target.value)}
                  placeholder="Your answer..."
                  className="answer-input px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                />

                <div className="online-controls print:hidden text-xl min-w-[30px]">
                  {statusIcon}
                </div>
              </div>

              {/* Online Controls */}
              <div className="online-controls print:hidden">
                <button
                  onClick={() => handleInputChange(item.number, item.answer)}
                  className="px-2 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  Show
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hidden Message Display */}
      <div className="hidden-message-display bg-gray-100 border-3 border-gray-400 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hidden Message:</h3>
        <div className="text-3xl font-mono font-bold text-gray-800 tracking-widest">
          {revealedMessage || '_ _ _ _ _ _   _ _ _ _ _ _'}
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

      {/* Explanation */}
      <div className="bg-gray-100 border-l-4 border-gray-400 p-4 rounded">
        <p className="text-sm text-gray-700">
          <strong>How it works:</strong> The first letter of each correct answer spells out the hidden message.
          For example, if the answer to question 1 is &quot;CHEMISTRY&quot;, circle the &quot;C&quot;.
          When you put all the first letters together, they reveal an important message from the story!
        </p>
      </div>
    </div>
  );
};

export default HiddenMessagePuzzle;