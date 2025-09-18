"use client";

import React, { useState, useCallback, useMemo } from "react";

interface WordSearchPuzzleProps {
  sectionId: string;
  onResponseChange?: (
    sectionId: string,
    responses: Record<string, string>
  ) => void;
  storyData?: Record<string, unknown>;
  showInstructionsModal?: boolean;
  onCloseInstructions?: () => void;
}

interface WordPlacement {
  word: string;
  row: number;
  col: number;
  direction: "horizontal" | "vertical" | "diagonal";
  directionVector: [number, number];
}

const WordSearchPuzzle: React.FC<WordSearchPuzzleProps> = ({
  sectionId,
  onResponseChange,
  storyData,
  showInstructionsModal = false,
  onCloseInstructions,
}) => {
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [foundWordCells, setFoundWordCells] = useState<Set<string>>(new Set());

  // Word search generator
  const generateWordSearch = useCallback(
    (
      words: string[],
      gridSize: number = 18
    ): { grid: string[][]; placements: WordPlacement[] } => {
      const grid: string[][] = Array(gridSize)
        .fill(null)
        .map(() => Array(gridSize).fill(""));
      const placements: WordPlacement[] = [];
      const directions = [
        { name: "horizontal", vector: [0, 1] },
        { name: "vertical", vector: [1, 0] },
        { name: "diagonal", vector: [1, 1] },
      ] as const;

      // Sort words by length (place longer words first for better success rate)
      const sortedWords = [...words].sort((a, b) => b.length - a.length);

      // Try to place each word
      for (const word of sortedWords) {
        const upperWord = word.toUpperCase();
        let placed = false;
        let attempts = 0;
        const maxAttempts = 500; // Increased attempts for better placement

        while (!placed && attempts < maxAttempts) {
          attempts++;

          // Try directions in order of preference (horizontal first for readability)
          const directionOrder =
            attempts < 200 ? [0, 1, 2] : [Math.floor(Math.random() * 3)];

          for (const dirIndex of directionOrder) {
            if (placed) break;

            const direction = directions[dirIndex];
            const [dr, dc] = direction.vector;

            // Calculate valid starting positions
            let maxRow, maxCol;
            if (direction.name === "horizontal") {
              maxRow = gridSize - 1;
              maxCol = gridSize - upperWord.length;
            } else if (direction.name === "vertical") {
              maxRow = gridSize - upperWord.length;
              maxCol = gridSize - 1;
            } else {
              // diagonal
              maxRow = gridSize - upperWord.length;
              maxCol = gridSize - upperWord.length;
            }

            if (maxRow < 0 || maxCol < 0) continue;

            const startRow = Math.floor(Math.random() * (maxRow + 1));
            const startCol = Math.floor(Math.random() * (maxCol + 1));

            // Check if word fits without conflicts
            let canPlace = true;
            for (let i = 0; i < upperWord.length; i++) {
              const row = startRow + dr * i;
              const col = startCol + dc * i;

              // Check bounds
              if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
                canPlace = false;
                break;
              }

              // Allow overlapping if it's the same letter, but avoid conflicts
              if (grid[row][col] !== "" && grid[row][col] !== upperWord[i]) {
                canPlace = false;
                break;
              }
            }

            if (canPlace) {
              // Place the word
              for (let i = 0; i < upperWord.length; i++) {
                const row = startRow + dr * i;
                const col = startCol + dc * i;
                grid[row][col] = upperWord[i];
              }

              placements.push({
                word: upperWord,
                row: startRow,
                col: startCol,
                direction: direction.name,
                directionVector: [dr, dc],
              });

              placed = true;
            }
          }
        }

        // Log if word couldn't be placed for debugging
        if (!placed) {
          console.warn(`Could not place word: ${upperWord}`);
        }
      }

      // Fill empty cells with random letters
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          if (grid[i][j] === "") {
            grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
          }
        }
      }

      return { grid, placements };
    },
    []
  );

  // Get story-specific words
  const getStoryWords = useCallback((): string[] => {
    const storyWords =
      (storyData?.wordSearchWords as string[]) ||
      (storyData?.words as string[]) ||
      [];

    if (storyWords && storyWords.length > 0) {
      return storyWords.map((word) => word.toUpperCase()); // Ensure all words are uppercase
    }

    // Default fallback words (shorter words that fit better)
    return ["STORY", "HERO", "PLOT", "THEME", "BOOK", "READ", "TALE", "END"];
  }, [storyData]);

  const targetWords = useMemo(() => getStoryWords(), [getStoryWords]);

  const { grid, placements } = useMemo(() => {
    return generateWordSearch(targetWords);
  }, [targetWords, generateWordSearch]);

  const getCellId = (row: number, col: number) => `${row}-${col}`;

  const getWordCells = useCallback(
    (
      start: { row: number; col: number },
      end: { row: number; col: number }
    ): string[] => {
      const cells: string[] = [];
      const rowDiff = end.row - start.row;
      const colDiff = end.col - start.col;

      const rowStep = rowDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;
      const colStep = colDiff === 0 ? 0 : colDiff > 0 ? 1 : -1;

      let currentRow = start.row;
      let currentCol = start.col;

      while (
        currentRow >= 0 &&
        currentRow < grid.length &&
        currentCol >= 0 &&
        currentCol < grid[0].length
      ) {
        cells.push(getCellId(currentRow, currentCol));

        if (currentRow === end.row && currentCol === end.col) {
          break;
        }

        currentRow += rowStep;
        currentCol += colStep;
      }

      return cells;
    },
    [grid]
  );

  const handleWordFound = useCallback(
    (
      word: string,
      startPos?: { row: number; col: number },
      endPos?: { row: number; col: number }
    ) => {
      if (foundWords.has(word)) return;

      setFoundWords((prev) => {
        const newFound = new Set(prev);
        newFound.add(word);

        // Report progress
        const foundList = Array.from(newFound).sort();
        onResponseChange?.(sectionId, {
          "words-found": foundList.join(", "),
          "words-count": foundList.length.toString(),
        });

        return newFound;
      });

      // Highlight the word cells if positions are provided
      if (startPos && endPos) {
        const wordCells = getWordCells(startPos, endPos);
        setFoundWordCells((prev) => {
          const newCells = new Set(prev);
          wordCells.forEach((cell) => newCells.add(cell));
          return newCells;
        });
      } else {
        // Find the word in placements and highlight it
        const placement = placements.find((p) => p.word === word.toUpperCase());
        if (placement) {
          const wordCells = new Set<string>();
          for (let i = 0; i < placement.word.length; i++) {
            const row = placement.row + placement.directionVector[0] * i;
            const col = placement.col + placement.directionVector[1] * i;
            wordCells.add(getCellId(row, col));
          }
          setFoundWordCells((prev) => {
            const newCells = new Set(prev);
            wordCells.forEach((cell) => newCells.add(cell));
            return newCells;
          });
        }
      }
    },
    [sectionId, onResponseChange, foundWords, placements, getWordCells]
  );

  const checkForWord = useCallback(
    (word: string) => {
      if (foundWords.has(word)) return;

      // Simple implementation - just mark as found when user clicks "Found it!"
      handleWordFound(word);
    },
    [foundWords, handleWordFound]
  );

  const getSelectedWord = useCallback(
    (
      start: { row: number; col: number },
      end: { row: number; col: number }
    ): string => {
      const rowDiff = end.row - start.row;
      const colDiff = end.col - start.col;

      // Determine direction
      const rowStep = rowDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;
      const colStep = colDiff === 0 ? 0 : colDiff > 0 ? 1 : -1;

      // Only allow straight lines (horizontal, vertical, diagonal)
      if (
        rowDiff !== 0 &&
        colDiff !== 0 &&
        Math.abs(rowDiff) !== Math.abs(colDiff)
      ) {
        return "";
      }

      let word = "";
      let currentRow = start.row;
      let currentCol = start.col;

      while (
        currentRow >= 0 &&
        currentRow < grid.length &&
        currentCol >= 0 &&
        currentCol < grid[0].length
      ) {
        word += grid[currentRow][currentCol];

        if (currentRow === end.row && currentCol === end.col) {
          break;
        }

        currentRow += rowStep;
        currentCol += colStep;
      }

      return word;
    },
    [grid]
  );

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const cellId = getCellId(row, col);

      if (!isSelecting) {
        // Start selection
        setIsSelecting(true);
        setSelectionStart({ row, col });
        setSelectedCells(new Set([cellId]));
      } else {
        // End selection and check for words
        setIsSelecting(false);

        if (selectionStart) {
          const selectedWord = getSelectedWord(selectionStart, { row, col });
          if (
            selectedWord &&
            targetWords.some(
              (word) => word.toUpperCase() === selectedWord.toUpperCase()
            )
          ) {
            handleWordFound(selectedWord.toUpperCase(), selectionStart, {
              row,
              col,
            });
          }
        }

        setSelectedCells(new Set());
        setSelectionStart(null);
      }
    },
    [isSelecting, selectionStart, targetWords, handleWordFound, getSelectedWord]
  );

  return (
    <div
      className="word-search-puzzle space-y-6"
      role="application"
      aria-label="Interactive word search puzzle"
    >
      <style jsx>{`
        .word-search-grid {
          max-width: 100%;
          overflow-x: auto;
        }

        .word-search-cell {
          min-width: 32px;
          min-height: 32px;
          touch-action: manipulation;
        }

        @media (max-width: 640px) {
          .word-search-cell {
            min-width: 32px;
            min-height: 32px;
            font-size: 14px;
            width: 32px !important;
            height: 32px !important;
          }

          .word-search-grid {
            font-size: 14px;
          }

          .flex-col.lg\:flex-row {
            gap: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .word-search-cell {
            min-width: 28px;
            min-height: 28px;
            font-size: 12px;
            width: 28px !important;
            height: 28px !important;
          }

          .word-search-grid {
            font-size: 12px;
          }

          .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-1.xl\:grid-cols-2 {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }

        @media print {
          .word-search-grid {
            font-family: "Courier New", monospace !important;
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
                🔍 How to Play Word Search:
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
                <strong>1. Find the words:</strong> Look for the words from the list in the letter grid.
              </p>
              <p className="text-sm">
                <strong>2. Words can go:</strong> Across (→), down (↓), or diagonal (↘).
              </p>
              <p className="text-sm">
                <strong>3. Click and drag:</strong> Click the first letter, then click the last letter of the word.
              </p>
              <p className="text-sm">
                <strong>4. Found words turn green:</strong> Successfully found words will be highlighted.
              </p>
              <p className="text-sm">
                <strong>5. Use the ✓ button:</strong> If you can't find a word, mark it found with the checkmark.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Word Search Container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Word Search Grid */}
        <div className="flex-shrink-0">
          <div className="word-search-grid font-mono text-sm bg-white border border-gray-300 p-4 rounded inline-block">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((letter, colIndex) => {
                  const cellId = getCellId(rowIndex, colIndex);
                  const isSelected = selectedCells.has(cellId);
                  const isFoundWord = foundWordCells.has(cellId);
                  return (
                    <div
                      key={colIndex}
                      className={`word-search-cell w-8 h-8 sm:w-9 sm:h-9 border border-gray-300 flex items-center justify-center cursor-pointer transition-colors text-center min-h-[44px] min-w-[44px] ${
                        isFoundWord
                          ? "bg-green-200 text-green-900 font-bold"
                          : isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      role="button"
                      aria-label={`Word search cell row ${rowIndex + 1}, column ${colIndex + 1}, letter ${letter}`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleCellClick(rowIndex, colIndex);
                        }
                      }}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Word List */}
        <div className="flex-1 min-w-0">
          <h4
            className="font-semibold text-gray-800 mb-3"
            id="word-list-heading"
          >
            Find these words:
          </h4>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-3"
            role="list"
            aria-labelledby="word-list-heading"
          >
            {targetWords.map((word) => {
              const isFound = foundWords.has(word);
              return (
                <div
                  key={word}
                  className={`text-sm p-2 rounded border-l-4 transition-all ${
                    isFound
                      ? "bg-green-100 border-green-600 text-green-900"
                      : "bg-gray-100 border-gray-500 text-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono ${isFound ? "line-through" : ""}`}
                    >
                      {word}
                    </span>
                    {isFound ? (
                      <span className="text-green-700 font-bold">✓</span>
                    ) : (
                      <button
                        onClick={() => checkForWord(word)}
                        className="online-controls print:hidden text-xs px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px]"
                        aria-label={`Mark word ${word} as found`}
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
      </div>


      {/* Progress Display */}
      <div className="bg-gray-50 p-4 rounded">
        <div className="flex items-center justify-between">
          <span className="text-gray-800">
            Words Found: <span className="font-bold">{foundWords.size}</span> /{" "}
            {targetWords.length}
          </span>
          <div className="online-controls print:hidden">
            {foundWords.size === targetWords.length && (
              <span className="text-green-700 font-bold">
                🎉 All words found!
              </span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-gray-700 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(foundWords.size / targetWords.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Print Instructions */}
      <div className="hidden print:block mt-8">
        <h3 className="font-semibold text-gray-800 text-lg mb-4">
          🔍 How to Play Word Search:
        </h3>
        <div className="text-gray-700 space-y-2">
          <p className="text-sm">
            <strong>1. Find the words:</strong> Look for the words from the list in the letter grid.
          </p>
          <p className="text-sm">
            <strong>2. Words can go:</strong> Across (→), down (↓), or diagonal (↘).
          </p>
          <p className="text-sm">
            <strong>3. Click and drag:</strong> Click the first letter, then click the last letter of the word.
          </p>
          <p className="text-sm">
            <strong>4. Found words turn green:</strong> Successfully found words will be highlighted.
          </p>
          <p className="text-sm">
            <strong>5. Use the ✓ button:</strong> If you can't find a word, mark it found with the checkmark.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordSearchPuzzle;
