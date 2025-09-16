'use client';

import React, { useState, useCallback } from 'react';

interface CrosswordPuzzleProps {
  sectionId: string;
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
  storyData?: Record<string, unknown>;
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
  onResponseChange,
  storyData
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  // Get story-specific crossword clues or fallback to default
  const getStoryCrosswordClues = (): Clue[] => {
    // Check both possible data structures
    const storyCrosswordData = (storyData?.crosswordClues as Clue[]) || (storyData?.clues as Clue[]) || [];


    if (storyCrosswordData && storyCrosswordData.length > 0) {
      return storyCrosswordData;
    }

    // Default fallback clues (generic/template) - positions will be auto-generated
    return [
      // ACROSS
      { number: 1, direction: 'across', clue: "Main character in the story", answer: 'HERO', startRow: 0, startCol: 0 },
      { number: 3, direction: 'across', clue: 'Setting of the story', answer: 'SCHOOL', startRow: 0, startCol: 0 },
      { number: 5, direction: 'across', clue: 'Important theme', answer: 'LESSON', startRow: 0, startCol: 0 },
      { number: 7, direction: 'across', clue: 'Story outcome', answer: 'END', startRow: 0, startCol: 0 },

      // DOWN
      { number: 2, direction: 'down', clue: 'Type of story', answer: 'TALE', startRow: 0, startCol: 0 },
      { number: 4, direction: 'down', clue: 'Story problem', answer: 'CONFLICT', startRow: 0, startCol: 0 },
      { number: 6, direction: 'down', clue: 'Story mood', answer: 'TONE', startRow: 0, startCol: 0 },
      { number: 8, direction: 'down', clue: 'Character trait', answer: 'BRAVE', startRow: 0, startCol: 0 }
    ];
  };

  // Simple crossword layout - ensure we get both across and down words
  const generateCrosswordLayout = (inputClues: Clue[]): Clue[] => {
    const gridSize = 15;
    const grid: (string | null)[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
    const placedWords: Clue[] = [];

    // Separate across and down words
    const acrossWords = inputClues.filter(c => c.direction === 'across');
    const downWords = inputClues.filter(c => c.direction === 'down');

    // Place all across words first with enough vertical spacing
    let currentNumber = 1;
    const rowSpacing = 2; // 2 rows between each across word
    let currentRow = 2; // Start at row 2 to leave room for down words above

    // Place across words
    acrossWords.forEach((word, index) => {
      if (currentRow + (index * rowSpacing) < gridSize - 1) {
        const row = currentRow + (index * rowSpacing);
        const startCol = Math.max(1, Math.floor((gridSize - word.answer.length) / 2));

        // Check if word fits
        if (startCol + word.answer.length < gridSize) {
          const clue: Clue = {
            ...word,
            startRow: row,
            startCol: startCol,
            number: currentNumber++
          };

          // Place letters in grid
          for (let i = 0; i < word.answer.length; i++) {
            grid[row][startCol + i] = word.answer[i];
          }

          placedWords.push(clue);
        }
      }
    });

    // Now place down words by finding intersections
    downWords.forEach(downWord => {
      let placed = false;

      // Try to intersect with each placed across word
      for (const acrossClue of placedWords.filter(p => p.direction === 'across')) {
        if (placed) break;

        // Look for common letters
        for (let acrossPos = 0; acrossPos < acrossClue.answer.length; acrossPos++) {
          if (placed) break;

          for (let downPos = 0; downPos < downWord.answer.length; downPos++) {
            if (acrossClue.answer[acrossPos].toLowerCase() === downWord.answer[downPos].toLowerCase()) {
              const newRow = acrossClue.startRow - downPos;
              const newCol = acrossClue.startCol + acrossPos;

              // Check if placement is valid (within bounds and no conflicts)
              if (newRow >= 0 && newRow + downWord.answer.length <= gridSize && newCol >= 0 && newCol < gridSize) {
                let canPlace = true;

                for (let k = 0; k < downWord.answer.length; k++) {
                  const checkRow = newRow + k;
                  if (grid[checkRow][newCol] !== null && grid[checkRow][newCol] !== downWord.answer[k]) {
                    canPlace = false;
                    break;
                  }
                }

                if (canPlace) {
                  const clue: Clue = {
                    ...downWord,
                    startRow: newRow,
                    startCol: newCol,
                    number: currentNumber++
                  };

                  // Place letters in grid
                  for (let k = 0; k < downWord.answer.length; k++) {
                    grid[newRow + k][newCol] = downWord.answer[k];
                  }

                  placedWords.push(clue);
                  placed = true;
                  break;
                }
              }
            }
          }
        }
      }
    });

    return placedWords;
  };

  // Validate if a word can be placed at the given position
  const isValidPlacement = (grid: (string | null)[][], word: string, startRow: number, startCol: number, direction: 'across' | 'down', gridSize: number): boolean => {
    // Check bounds
    const endRow = direction === 'down' ? startRow + word.length - 1 : startRow;
    const endCol = direction === 'across' ? startCol + word.length - 1 : startCol;

    if (startRow < 0 || startCol < 0 || endRow >= gridSize || endCol >= gridSize) {
      return false;
    }

    // Check each letter position
    for (let i = 0; i < word.length; i++) {
      const row = direction === 'across' ? startRow : startRow + i;
      const col = direction === 'across' ? startCol + i : startCol;

      const currentCell = grid[row][col];

      // Cell must be empty or contain the same letter
      if (currentCell !== null && currentCell !== word[i]) {
        return false;
      }
    }

    return true;
  };


  const rawClues = getStoryCrosswordClues();
  const clues: Clue[] = generateCrosswordLayout(rawClues);

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