'use client';

import React, { useState, useCallback } from 'react';

interface CrosswordPuzzleProps {
  sectionId: string;
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
}

interface Clue {
  number: number;
  direction: 'across' | 'down';
  clue: string;
  answer: string;
  startRow: number;
  startCol: number;
}

const CrosswordPuzzle: React.FC<CrosswordPuzzleProps> = ({
  sectionId,
  onResponseChange
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const clues: Clue[] = [
    // ACROSS
    { number: 2, direction: 'across', clue: "Dani's best friend who mysteriously returns", answer: 'AVA', startRow: 1, startCol: 0 },
    { number: 4, direction: 'across', clue: 'The type of key Dani finds in her lunch', answer: 'BRASS', startRow: 3, startCol: 0 },
    { number: 6, direction: 'across', clue: 'What Trevor used to call Dani', answer: 'WEIRDO', startRow: 5, startCol: 2 },
    { number: 8, direction: 'across', clue: 'The forgotten door leads to this magical place', answer: 'HALLWAY', startRow: 7, startCol: 0 },
    { number: 9, direction: 'across', clue: "Dani's favorite food she couldn't eat before", answer: 'PIZZA', startRow: 8, startCol: 8 },
    { number: 10, direction: 'across', clue: 'Each one contains a piece of Dani\'s life', answer: 'DRAWER', startRow: 9, startCol: 3 },
    { number: 11, direction: 'across', clue: 'The boy with yogurt on his chin', answer: 'MAX', startRow: 10, startCol: 10 },
    { number: 12, direction: 'across', clue: 'What Mr. _____ teaches', answer: 'DEVLIN', startRow: 11, startCol: 3 },

    // DOWN
    { number: 1, direction: 'down', clue: 'What Dani must make about changing her life', answer: 'CHOICE', startRow: 0, startCol: 4 },
    { number: 3, direction: 'down', clue: 'Where Dani first finds the door', answer: 'CLOSET', startRow: 1, startCol: 8 },
    { number: 5, direction: 'down', clue: '"Better means ____"', answer: 'GONE', startRow: 3, startCol: 4 },
    { number: 7, direction: 'down', clue: 'Color of the forgotten door', answer: 'GRAY', startRow: 6, startCol: 2 },
    { number: 9, direction: 'down', clue: 'What happens to Dani\'s identity', answer: 'PERFECT', startRow: 8, startCol: 8 },
    { number: 11, direction: 'down', clue: '"_____ it better" - the door\'s whisper', answer: 'MAKE', startRow: 10, startCol: 10 },
    { number: 12, direction: 'down', clue: 'What disappears when things get "better"', answer: 'FRIENDS', startRow: 11, startCol: 3 }
  ];

  const gridSize = 15; // 15x15 grid

  const generateGrid = () => {
    // Create empty grid
    const grid: (string | null)[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
    const numbers: (number | null)[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));

    // Place words and numbers
    clues.forEach(clue => {
      const { answer, startRow, startCol, direction, number } = clue;

      // Place number at start position
      if (!numbers[startRow][startCol]) {
        numbers[startRow][startCol] = number;
      }

      // Place letters
      for (let i = 0; i < answer.length; i++) {
        const row = direction === 'across' ? startRow : startRow + i;
        const col = direction === 'across' ? startCol + i : startCol;

        if (row < gridSize && col < gridSize) {
          grid[row][col] = answer[i];
        }
      }
    });

    return { grid, numbers };
  };

  const { grid, numbers } = generateGrid();

  const handleInputChange = useCallback((row: number, col: number, value: string) => {
    const key = `${row}-${col}`;
    const newResponses = { ...responses, [key]: value.toUpperCase() };
    setResponses(newResponses);

    onResponseChange?.(sectionId, newResponses);
  }, [responses, sectionId, onResponseChange]);

  const getInputValue = (row: number, col: number): string => {
    return responses[`${row}-${col}`] || '';
  };

  const isCorrectCell = (row: number, col: number): boolean => {
    const userValue = getInputValue(row, col);
    const correctValue = grid[row][col];
    return !!(userValue && correctValue && userValue === correctValue);
  };

  const checkClueComplete = (clue: Clue): boolean => {
    const { answer, startRow, startCol, direction } = clue;

    for (let i = 0; i < answer.length; i++) {
      const row = direction === 'across' ? startRow : startRow + i;
      const col = direction === 'across' ? startCol + i : startCol;

      if (!isCorrectCell(row, col)) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="crossword-puzzle space-y-6">
      <style jsx>{`
        @media print {
          .crossword-grid {
            font-family: 'Courier New', monospace !important;
            font-size: 12px !important;
          }

          .crossword-cell {
            width: 25px !important;
            height: 25px !important;
            border: 1px solid #333 !important;
            font-size: 12px !important;
          }

          .crossword-cell-active {
            background: white !important;
            border: 2px solid #333 !important;
          }

          .crossword-cell-blocked {
            background: #333 !important;
          }

          .cell-number {
            font-size: 8px !important;
            line-height: 1 !important;
          }

          .clues-section {
            font-size: 12px !important;
            page-break-inside: avoid !important;
          }

          .online-controls {
            display: none !important;
          }
        }
      `}</style>


      {/* Crossword Grid */}
      <div className="crossword-grid font-mono text-xs bg-white border border-gray-300 p-4 rounded inline-block">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => {
              const cellNumber = numbers[rowIndex][colIndex];
              const isActive = cell !== null;
              const isCorrect = isActive && isCorrectCell(rowIndex, colIndex);
              const userValue = getInputValue(rowIndex, colIndex);

              if (!isActive) {
                return (
                  <div
                    key={colIndex}
                    className="crossword-cell crossword-cell-blocked w-6 h-6 bg-gray-800 border border-gray-400"
                  />
                );
              }

              return (
                <div key={colIndex} className="relative">
                  <input
                    type="text"
                    maxLength={1}
                    value={userValue}
                    onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                    className={`crossword-cell crossword-cell-active w-6 h-6 text-center border border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500 ${
                      isCorrect ? 'bg-green-100' : 'bg-white'
                    }`}
                  />
                  {cellNumber && (
                    <div className="cell-number absolute top-0 left-0 text-xs font-bold text-gray-600 leading-none pointer-events-none">
                      {cellNumber}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Clues */}
      <div className="clues-section grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 border border-gray-300 rounded">
          <h4 className="font-bold text-gray-800 mb-3 text-lg">ACROSS:</h4>
          <div className="space-y-2">
            {clues
              .filter(clue => clue.direction === 'across')
              .sort((a, b) => a.number - b.number)
              .map(clue => {
                const isComplete = checkClueComplete(clue);
                return (
                  <div key={`across-${clue.number}`} className={`text-sm ${isComplete ? 'text-green-600 font-medium' : 'text-gray-700'}`}>
                    <span className="font-bold">{clue.number}.</span> {clue.clue}
                    {isComplete && <span className="ml-2">✅</span>}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-300 rounded">
          <h4 className="font-bold text-gray-800 mb-3 text-lg">DOWN:</h4>
          <div className="space-y-2">
            {clues
              .filter(clue => clue.direction === 'down')
              .sort((a, b) => a.number - b.number)
              .map(clue => {
                const isComplete = checkClueComplete(clue);
                return (
                  <div key={`down-${clue.number}`} className={`text-sm ${isComplete ? 'text-green-600 font-medium' : 'text-gray-700'}`}>
                    <span className="font-bold">{clue.number}.</span> {clue.clue}
                    {isComplete && <span className="ml-2">✅</span>}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Progress Display */}
      <div className="bg-gray-50 p-4 rounded">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            Clues Solved: <span className="font-bold">
              {clues.filter(checkClueComplete).length}
            </span> / {clues.length}
          </span>
          <div className="online-controls print:hidden">
            {clues.every(checkClueComplete) && (
              <span className="text-green-600 font-bold">🎉 Crossword complete!</span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-gray-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(clues.filter(checkClueComplete).length / clues.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Online Controls */}
      <div className="online-controls print:hidden flex gap-2">
        <button
          onClick={() => {
            const newResponses: Record<string, string> = {};
            clues.forEach(clue => {
              const { answer, startRow, startCol, direction } = clue;
              for (let i = 0; i < answer.length; i++) {
                const row = direction === 'across' ? startRow : startRow + i;
                const col = direction === 'across' ? startCol + i : startCol;
                newResponses[`${row}-${col}`] = answer[i];
              }
            });
            setResponses(newResponses);
            onResponseChange?.(sectionId, newResponses);
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Show All Answers
        </button>
        <button
          onClick={() => {
            setResponses({});
            onResponseChange?.(sectionId, {});
          }}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default CrosswordPuzzle;