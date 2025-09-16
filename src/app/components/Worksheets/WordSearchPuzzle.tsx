'use client';

import React, { useState, useCallback } from 'react';

interface WordSearchPuzzleProps {
  sectionId: string;
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
}

const WordSearchPuzzle: React.FC<WordSearchPuzzleProps> = ({
  sectionId,
  onResponseChange
}) => {
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

  // The word search grid from the HTML file
  const grid = [
    ['D', 'O', 'O', 'R', 'W', 'A', 'Y', 'S', 'M', 'E', 'M', 'O', 'R', 'Y', 'B'],
    ['R', 'E', 'P', 'L', 'M', 'I', 'C', 'R', 'O', 'S', 'C', 'O', 'P', 'E', 'R'],
    ['A', 'P', 'I', 'Z', 'Z', 'A', 'L', 'O', 'C', 'K', 'E', 'R', 'T', 'D', 'A'],
    ['W', 'I', 'D', 'E', 'N', 'T', 'I', 'T', 'Y', 'K', 'E', 'Y', 'R', 'I', 'S'],
    ['E', 'S', 'P', 'E', 'R', 'F', 'E', 'C', 'T', 'I', 'O', 'N', 'E', 'S', 'S'],
    ['R', 'C', 'H', 'O', 'I', 'C', 'E', 'S', 'T', 'A', 'V', 'A', 'V', 'A', 'K'],
    ['S', 'L', 'O', 'S', 'U', 'P', 'P', 'L', 'Y', 'M', 'A', 'X', 'O', 'P', 'E'],
    ['U', 'O', 'W', 'H', 'I', 'S', 'P', 'E', 'R', 'N', 'O', 'R', 'R', 'P', 'Y'],
    ['P', 'S', 'H', 'A', 'L', 'L', 'W', 'A', 'Y', 'I', 'T', 'M', 'T', 'E', 'H'],
    ['G', 'E', 'A', 'V', 'A', 'L', 'L', 'E', 'R', 'G', 'Y', 'A', 'R', 'A', 'O'],
    ['R', 'T', 'R', 'E', 'A', 'L', 'I', 'T', 'Y', 'O', 'U', 'L', 'R', 'R', 'L'],
    ['A', 'R', 'M', 'O', 'N', 'D', 'A', 'N', 'I', 'E', 'L', 'L', 'E', 'F', 'E'],
    ['D', 'O', 'O', 'R', 'K', 'N', 'O', 'B', 'C', 'H', 'A', 'N', 'G', 'E', 'S'],
    ['E', 'M', 'P', 'T', 'Y', 'F', 'O', 'R', 'G', 'O', 'T', 'T', 'E', 'N', 'D'],
    ['S', 'C', 'H', 'O', 'O', 'L', 'F', 'R', 'I', 'E', 'N', 'D', 'S', 'H', 'I']
  ];

  const targetWords = [
    'DOOR', 'DRAWER', 'KEY', 'BRASS', 'CLOSET', 'SUPPLY', 'MICROSCOPE',
    'PIZZA', 'ALLERGY', 'IDENTITY', 'CHOICES', 'WHISPER', 'HALLWAY',
    'TREVOR', 'AVA', 'MAX', 'LOCKER', 'PERFECT', 'DISAPPEAR', 'EMPTY',
    'FORGOTTEN', 'NORMAL', 'REALITY', 'CHANGES', 'DANI'
  ];

  const getCellId = (row: number, col: number) => `${row}-${col}`;

  const handleCellClick = useCallback((row: number, col: number) => {
    const cellId = getCellId(row, col);
    setSelectedCells(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(cellId)) {
        newSelected.delete(cellId);
      } else {
        newSelected.add(cellId);
      }
      return newSelected;
    });
  }, []);

  const handleWordFound = useCallback((word: string) => {
    setFoundWords(prev => {
      const newFound = new Set(prev);
      newFound.add(word);

      // Report progress
      const foundList = Array.from(newFound).sort();
      onResponseChange?.(sectionId, {
        'words-found': foundList.join(', '),
        'words-count': foundList.length.toString()
      });

      return newFound;
    });
  }, [sectionId, onResponseChange]);

  const checkForWord = useCallback((word: string) => {
    if (foundWords.has(word)) return;

    // Simple implementation - just mark as found when user clicks "Found it!"
    handleWordFound(word);
  }, [foundWords, handleWordFound]);

  return (
    <div className="word-search-puzzle space-y-6">
      <style jsx>{`
        @media print {
          .word-search-grid {
            font-family: 'Courier New', monospace !important;
            font-size: 16px !important;
            line-height: 1.2 !important;
          }

          .word-search-cell {
            width: 25px !important;
            height: 25px !important;
            border: 1px solid #333 !important;
            padding: 2px !important;
          }

          .online-controls {
            display: none !important;
          }
        }
      `}</style>


      {/* Word Search Grid */}
      <div className="word-search-grid font-mono text-sm bg-white border border-gray-300 p-4 rounded">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((letter, colIndex) => {
              const cellId = getCellId(rowIndex, colIndex);
              const isSelected = selectedCells.has(cellId);
              return (
                <div
                  key={colIndex}
                  className={`word-search-cell w-6 h-6 border border-gray-300 flex items-center justify-center cursor-pointer transition-colors ${
                    isSelected ? 'bg-gray-500 text-white' : 'bg-white hover:bg-gray-100'
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Word List */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">Find these words:</h4>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {targetWords.map((word) => {
            const isFound = foundWords.has(word);
            return (
              <div
                key={word}
                className={`text-sm p-2 rounded border-l-3 transition-all ${
                  isFound
                    ? 'bg-green-100 border-green-400 text-green-800 line-through'
                    : 'bg-gray-100 border-gray-400 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono">{word}</span>
                  {!isFound && (
                    <button
                      onClick={() => checkForWord(word)}
                      className="online-controls print:hidden text-xs px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                      title="Mark as found"
                    >
                      ✓
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Display */}
      <div className="bg-gray-50 p-4 rounded">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            Words Found: <span className="font-bold">{foundWords.size}</span> / {targetWords.length}
          </span>
          <div className="online-controls print:hidden">
            {foundWords.size === targetWords.length && (
              <span className="text-green-600 font-bold">🎉 All words found!</span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-gray-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(foundWords.size / targetWords.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WordSearchPuzzle;