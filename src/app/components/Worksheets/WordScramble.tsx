'use client';

import React, { useState, useCallback, useMemo } from 'react';

interface WordScrambleProps {
  sectionId: string;
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
  storyData?: Record<string, unknown>;
  showInstructionsModal?: boolean;
  onCloseInstructions?: () => void;
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
  storyData,
  showInstructionsModal = false,
  onCloseInstructions,
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [checkedWords, setCheckedWords] = useState<Set<string>>(new Set());

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

    onResponseChange?.(sectionId, newResponses);
  }, [responses, sectionId, onResponseChange]);

  const checkAnswer = (wordId: string): 'correct' | 'incorrect' | 'none' => {
    if (!checkedWords.has(wordId)) return 'none';

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
                🔤 How to Unscramble Words:
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
                <strong>1. Look at the scrambled letters:</strong> Each box shows mixed-up letters from a story word.
              </p>
              <p className="text-sm">
                <strong>2. Use the hint:</strong> Read the 💡 hint to help you figure out the word.
              </p>
              <p className="text-sm">
                <strong>3. Type your guess:</strong> Write what you think the unscrambled word is.
              </p>
              <p className="text-sm">
                <strong>4. Check your answer:</strong> Click &ldquo;Check Answer&rdquo; to see if you&rsquo;re right (✅) or wrong (❌).
              </p>
              <p className="text-sm">
                <strong>5. Need help?</strong> Click &ldquo;Show Answer&rdquo; after checking to see the correct word.
              </p>
            </div>
          </div>
        </div>
      )}

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
                  onClick={() => {
                    setCheckedWords(prev => new Set([...prev, word.id]));
                  }}
                  disabled={!responses[word.id] || responses[word.id].trim() === ''}
                  className={`px-4 py-2 rounded text-sm transition-colors min-h-[44px] ${
                    responses[word.id] && responses[word.id].trim() !== ''
                      ? "bg-gray-700 text-white hover:bg-gray-800"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Check Answer
                </button>
                <button
                  onClick={() => handleInputChange(word.id, word.answer)}
                  disabled={!checkedWords.has(word.id)}
                  className={`px-4 py-2 rounded text-sm transition-colors min-h-[44px] ${
                    checkedWords.has(word.id)
                      ? "bg-gray-600 text-white hover:bg-gray-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Show Answer
                </button>
                <button
                  onClick={() => {
                    handleInputChange(word.id, '');
                    setCheckedWords(prev => {
                      const newSet = new Set(prev);
                      newSet.delete(word.id);
                      return newSet;
                    });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors min-h-[44px]"
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

      {/* Print Instructions */}
      <div className="hidden print:block mt-8">
        <h3 className="font-semibold text-gray-800 text-lg mb-4">
          🔤 How to Unscramble Words:
        </h3>
        <div className="text-gray-700 space-y-2">
          <p className="text-sm">
            <strong>1. Look at the scrambled letters:</strong> Each box shows mixed-up letters from a story word.
          </p>
          <p className="text-sm">
            <strong>2. Use the hint:</strong> Read the 💡 hint to help you figure out the word.
          </p>
          <p className="text-sm">
            <strong>3. Type your guess:</strong> Write what you think the unscrambled word is.
          </p>
          <p className="text-sm">
            <strong>4. Check your answer:</strong> Click &ldquo;Check Answer&rdquo; to see if you&rsquo;re right (✅) or wrong (❌).
          </p>
          <p className="text-sm">
            <strong>5. Need help?</strong> Click &ldquo;Show Answer&rdquo; after checking to see the correct word.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordScramble;