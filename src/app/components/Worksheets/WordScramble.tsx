'use client';

import React, { useState, useCallback, useMemo } from 'react';

interface WordScrambleProps {
  sectionId: string;
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
  storyData?: Record<string, unknown>;
}

interface ScrambledWord {
  id: string;
  scrambled: string;
  answer: string;
  hint?: string;
}

const WordScramble: React.FC<WordScrambleProps> = ({
  sectionId,
  onResponseChange,
  storyData
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  // Function to scramble a word
  const scrambleWord = (word: string): string => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  };

  const scrambledWords: ScrambledWord[] = useMemo(() => {
    const storyWords = (storyData?.scrambledWords as Array<{word: string, hint: string}>) || [];

    return storyWords.map((wordData, index) => ({
      id: `word${index + 1}`,
      scrambled: scrambleWord(wordData.word),
      answer: wordData.word,
      hint: wordData.hint
    }));
  }, [storyData]);

  const handleInputChange = useCallback((wordId: string, value: string) => {
    const newResponses = { ...responses, [wordId]: value };
    setResponses(newResponses);

    // Check if answer is correct
    const word = scrambledWords.find(w => w.id === wordId);
    const isCorrect = word && value.toUpperCase().replace(/[^A-Z\s]/g, '').trim() === word.answer;

    onResponseChange?.(sectionId, {
      ...newResponses,
      [`${wordId}-correct`]: isCorrect ? 'true' : 'false'
    });
  }, [responses, sectionId, onResponseChange, scrambledWords]);

  const checkAnswer = (wordId: string): 'correct' | 'incorrect' | 'none' => {
    const response = responses[wordId];
    if (!response || response.trim() === '') return 'none';

    const word = scrambledWords.find(w => w.id === wordId);
    if (!word) return 'none';

    const cleanResponse = response.toUpperCase().replace(/[^A-Z\s]/g, '').trim();
    return cleanResponse === word.answer ? 'correct' : 'incorrect';
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
    <div className="word-scramble space-y-6">
      <style jsx>{`
        @media print {
          .scramble-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }

          .scramble-item {
            border: 2px solid #333 !important;
            padding: 15px !important;
            page-break-inside: avoid !important;
          }

          .scrambled-word {
            font-size: 18px !important;
            font-weight: bold !important;
            font-family: 'Courier New', monospace !important;
          }

          .answer-input {
            border: 2px solid #333 !important;
            background: white !important;
            font-size: 16px !important;
            min-height: 30px !important;
          }

          .online-controls {
            display: none !important;
          }
        }
      `}</style>


      {/* Scrambled Words Grid */}
      <div className="scramble-grid grid grid-cols-1 md:grid-cols-2 gap-4">
        {scrambledWords.map((word) => {
          const status = checkAnswer(word.id);
          const statusColor = getStatusColor(status);
          const statusIcon = getStatusIcon(status);

          return (
            <div
              key={word.id}
              className={`scramble-item flex flex-col gap-3 p-4 rounded-lg border-2 transition-all ${statusColor}`}
            >
              <div className="flex items-center justify-between">
                <div className="scrambled-word text-xl font-bold text-gray-800 font-mono tracking-wider">
                  {word.scrambled}
                </div>
                <div className="online-controls print:hidden text-xl">
                  {statusIcon}
                </div>
              </div>

              {/* Hint */}
              {word.hint && (
                <div className="text-sm text-gray-600 italic">
                  💡 Hint: {word.hint}
                </div>
              )}

              {/* Answer Input */}
              <input
                type="text"
                value={responses[word.id] || ''}
                onChange={(e) => handleInputChange(word.id, e.target.value)}
                placeholder="Your answer..."
                className="answer-input w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg"
              />

              {/* Online Controls */}
              <div className="online-controls print:hidden flex gap-2">
                <button
                  onClick={() => handleInputChange(word.id, word.answer)}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  Show Answer
                </button>
                <button
                  onClick={() => handleInputChange(word.id, '')}
                  className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Display */}
      <div className="bg-gray-50 p-4 rounded">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            Words Unscrambled: <span className="font-bold">
              {scrambledWords.filter(w => checkAnswer(w.id) === 'correct').length}
            </span> / {scrambledWords.length}
          </span>
          <div className="online-controls print:hidden">
            {scrambledWords.every(w => checkAnswer(w.id) === 'correct') && (
              <span className="text-green-600 font-bold">🎉 All words unscrambled!</span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-gray-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(scrambledWords.filter(w => checkAnswer(w.id) === 'correct').length / scrambledWords.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WordScramble;