"use client";

import React, { useState, useCallback } from "react";

interface CrosswordPuzzleProps {
  sectionId: string;
  onResponseChange?: (
    sectionId: string,
    responses: Record<string, string>
  ) => void;
  storyData?: Record<string, unknown>;
}

interface Clue {
  number: number;
  direction: "across" | "down";
  clue: string;
  answer: string;
  startRow: number;
  startCol: number;
}

const CrosswordPuzzle: React.FC<CrosswordPuzzleProps> = ({
  sectionId,
  onResponseChange,
  storyData,
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [hasCheckedAnswers, setHasCheckedAnswers] = useState(false);
  const [checkedCells, setCheckedCells] = useState<Set<string>>(new Set());

  // Get story-specific crossword clues or fallback to default
  const getStoryCrosswordClues = (): Clue[] => {
    // Check both possible data structures
    const storyCrosswordData =
      (storyData?.crosswordClues as Clue[]) ||
      (storyData?.clues as Clue[]) ||
      [];

    if (storyCrosswordData && storyCrosswordData.length > 0) {
      return storyCrosswordData;
    }

    // Default fallback clues (generic/template) - positions will be auto-generated
    return [
      // ACROSS
      {
        number: 1,
        direction: "across",
        clue: "Main character in the story",
        answer: "HERO",
        startRow: 0,
        startCol: 0,
      },
      {
        number: 3,
        direction: "across",
        clue: "Setting of the story",
        answer: "SCHOOL",
        startRow: 0,
        startCol: 0,
      },
      {
        number: 5,
        direction: "across",
        clue: "Important theme",
        answer: "LESSON",
        startRow: 0,
        startCol: 0,
      },
      {
        number: 7,
        direction: "across",
        clue: "Story outcome",
        answer: "END",
        startRow: 0,
        startCol: 0,
      },

      // DOWN
      {
        number: 2,
        direction: "down",
        clue: "Type of story",
        answer: "TALE",
        startRow: 0,
        startCol: 0,
      },
      {
        number: 4,
        direction: "down",
        clue: "Story problem",
        answer: "CONFLICT",
        startRow: 0,
        startCol: 0,
      },
      {
        number: 6,
        direction: "down",
        clue: "Story mood",
        answer: "TONE",
        startRow: 0,
        startCol: 0,
      },
      {
        number: 8,
        direction: "down",
        clue: "Character trait",
        answer: "BRAVE",
        startRow: 0,
        startCol: 0,
      },
    ];
  };

  // Enhanced crossword generation algorithm that places all words
  const generateCrosswordLayout = (inputClues: Clue[]): Clue[] => {
    const gridSize = 20; // Larger grid to accommodate more words
    const grid: (string | null)[][] = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));
    const placedWords: Clue[] = [];
    const unplacedWords = [...inputClues]; // Copy all clues to place

    let currentNumber = 1;

    // Helper function to check if a word can be placed at a position
    const canPlaceWord = (
      word: string,
      row: number,
      col: number,
      direction: "across" | "down",
      allowIntersection: boolean = true
    ): boolean => {
      const dr = direction === "down" ? 1 : 0;
      const dc = direction === "across" ? 1 : 0;

      // Check bounds
      if (direction === "across" && col + word.length > gridSize) return false;
      if (direction === "down" && row + word.length > gridSize) return false;

      let hasIntersection = false;

      // Check each position
      for (let i = 0; i < word.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;

        if (r < 0 || r >= gridSize || c < 0 || c >= gridSize) return false;

        const currentCell = grid[r][c];

        // If cell is occupied, it must be the same letter (intersection)
        if (currentCell !== null) {
          if (currentCell !== word[i]) {
            return false;
          }
          hasIntersection = true;
        } else {
          // For empty cells, check proper crossword spacing

          // Check cell before word start
          if (i === 0) {
            const prevR = r - dr;
            const prevC = c - dc;
            if (
              prevR >= 0 &&
              prevR < gridSize &&
              prevC >= 0 &&
              prevC < gridSize &&
              grid[prevR][prevC] !== null
            ) {
              return false;
            }
          }

          // Check cell after word end
          if (i === word.length - 1) {
            const nextR = r + dr;
            const nextC = c + dc;
            if (
              nextR >= 0 &&
              nextR < gridSize &&
              nextC >= 0 &&
              nextC < gridSize &&
              grid[nextR][nextC] !== null
            ) {
              return false;
            }
          }

          // Check perpendicular cells for proper crossword spacing
          const perpR1 = r + (direction === "across" ? 1 : 0);
          const perpC1 = c + (direction === "down" ? 1 : 0);
          const perpR2 = r - (direction === "across" ? 1 : 0);
          const perpC2 = c - (direction === "down" ? 1 : 0);

          // Only allow perpendicular adjacency if it's part of an intersecting word
          if (
            perpR1 >= 0 &&
            perpR1 < gridSize &&
            perpC1 >= 0 &&
            perpC1 < gridSize
          ) {
            const perpCell1 = grid[perpR1][perpC1];
            if (perpCell1 !== null) {
              // Check if this is a valid intersection
              const isValidIntersection = placedWords.some((placed) => {
                const placedDr = placed.direction === "down" ? 1 : 0;
                const placedDc = placed.direction === "across" ? 1 : 0;

                for (let j = 0; j < placed.answer.length; j++) {
                  const placedR = placed.startRow + placedDr * j;
                  const placedC = placed.startCol + placedDc * j;

                  if (
                    placedR === perpR1 &&
                    placedC === perpC1 &&
                    placedR === r &&
                    placedC === c
                  ) {
                    return true;
                  }
                }
                return false;
              });

              if (!isValidIntersection) return false;
            }
          }

          if (
            perpR2 >= 0 &&
            perpR2 < gridSize &&
            perpC2 >= 0 &&
            perpC2 < gridSize
          ) {
            const perpCell2 = grid[perpR2][perpC2];
            if (perpCell2 !== null) {
              // Check if this is a valid intersection
              const isValidIntersection = placedWords.some((placed) => {
                const placedDr = placed.direction === "down" ? 1 : 0;
                const placedDc = placed.direction === "across" ? 1 : 0;

                for (let j = 0; j < placed.answer.length; j++) {
                  const placedR = placed.startRow + placedDr * j;
                  const placedC = placed.startCol + placedDc * j;

                  if (
                    placedR === perpR2 &&
                    placedC === perpC2 &&
                    placedR === r &&
                    placedC === c
                  ) {
                    return true;
                  }
                }
                return false;
              });

              if (!isValidIntersection) return false;
            }
          }
        }
      }

      // If this is not the first word and we require intersection, ensure we have one
      if (allowIntersection && placedWords.length > 0 && !hasIntersection) {
        return false;
      }

      return true;
    };

    // Helper function to place a word
    const placeWord = (
      word: string,
      row: number,
      col: number,
      direction: "across" | "down",
      clue: Clue
    ): void => {
      const dr = direction === "down" ? 1 : 0;
      const dc = direction === "across" ? 1 : 0;

      for (let i = 0; i < word.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        grid[r][c] = word[i];
      }

      placedWords.push({
        ...clue,
        startRow: row,
        startCol: col,
        number: currentNumber++,
      });
    };

    // Find intersections between two words
    const findIntersections = (
      word1: string,
      word2: string
    ): Array<{ pos1: number; pos2: number }> => {
      const intersections: Array<{ pos1: number; pos2: number }> = [];

      for (let i = 0; i < word1.length; i++) {
        for (let j = 0; j < word2.length; j++) {
          if (word1[i].toLowerCase() === word2[j].toLowerCase()) {
            intersections.push({ pos1: i, pos2: j });
          }
        }
      }

      return intersections;
    };

    // Helper function to try placing a word with any direction
    const tryPlaceWord = (
      clue: Clue,
      forceDirection?: "across" | "down"
    ): boolean => {
      const directions = forceDirection ? [forceDirection] : ["across", "down"];

      for (const direction of directions as ("across" | "down")[]) {
        // If no words placed yet, place first word in center
        if (placedWords.length === 0) {
          const centerRow = Math.floor(gridSize / 2);
          const startCol = Math.floor((gridSize - clue.answer.length) / 2);

          if (canPlaceWord(clue.answer, centerRow, startCol, direction)) {
            placeWord(clue.answer, centerRow, startCol, direction, {
              ...clue,
              direction,
            });
            return true;
          }
        } else {
          // Try to intersect with any existing word
          for (const existingWord of placedWords) {
            const intersections = findIntersections(
              existingWord.answer,
              clue.answer
            );

            for (const intersection of intersections) {
              let newRow: number, newCol: number;

              if (direction === "across" && existingWord.direction === "down") {
                // New across word intersecting existing down word
                newRow = existingWord.startRow + intersection.pos1;
                newCol = existingWord.startCol - intersection.pos2;
              } else if (
                direction === "down" &&
                existingWord.direction === "across"
              ) {
                // New down word intersecting existing across word
                newRow = existingWord.startRow - intersection.pos2;
                newCol = existingWord.startCol + intersection.pos1;
              } else {
                continue; // Skip same-direction intersections
              }

              if (canPlaceWord(clue.answer, newRow, newCol, direction)) {
                placeWord(clue.answer, newRow, newCol, direction, {
                  ...clue,
                  direction,
                });
                return true;
              }
            }
          }
        }
      }

      return false;
    };

    // Sort words by length (longer words first for better grid utilization)
    unplacedWords.sort((a, b) => b.answer.length - a.answer.length);

    // Place words iteratively
    const maxAttempts = 100;
    let attempts = 0;

    while (unplacedWords.length > 0 && attempts < maxAttempts) {
      attempts++;
      let placedThisRound = false;

      // Try to place each unplaced word
      for (let i = unplacedWords.length - 1; i >= 0; i--) {
        const clue = unplacedWords[i];

        if (tryPlaceWord(clue)) {
          unplacedWords.splice(i, 1);
          placedThisRound = true;
        }
      }

      // If we couldn't place any words this round, try with more flexibility
      if (!placedThisRound && unplacedWords.length > 0) {
        // Try placing words without intersection (standalone)
        for (let i = unplacedWords.length - 1; i >= 0; i--) {
          const clue = unplacedWords[i];
          let placed = false;

          // Try multiple positions across the grid with spacing
          for (let row = 2; row < gridSize - 2 && !placed; row += 3) {
            for (let col = 2; col < gridSize - 2 && !placed; col += 3) {
              for (const direction of ["across", "down"] as const) {
                if (canPlaceWord(clue.answer, row, col, direction, false)) {
                  placeWord(clue.answer, row, col, direction, {
                    ...clue,
                    direction,
                  });
                  unplacedWords.splice(i, 1);
                  placed = true;
                  placedThisRound = true;
                  break;
                }
              }
            }
          }
        }
      }

      if (!placedThisRound) break; // Avoid infinite loop
    }

    // Log any words that couldn't be placed
    if (unplacedWords.length > 0) {
      console.warn(
        `Could not place ${unplacedWords.length} words:`,
        unplacedWords.map((w) => w.answer)
      );
    }

    return placedWords;
  };

  const rawClues = getStoryCrosswordClues();
  const clues: Clue[] = generateCrosswordLayout(rawClues);

  const gridSize = 20; // Match the grid size used in generation

  const generateGrid = () => {
    // Create empty grid
    const grid: (string | null)[][] = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));
    const numbers: (number | null)[][] = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null));

    // Place words and numbers
    clues.forEach((clue) => {
      const { answer, startRow, startCol, direction, number } = clue;

      // Bounds check before accessing arrays
      if (
        startRow >= 0 &&
        startRow < gridSize &&
        startCol >= 0 &&
        startCol < gridSize
      ) {
        // Place number at start position
        if (!numbers[startRow][startCol]) {
          numbers[startRow][startCol] = number;
        }

        // Place letters
        for (let i = 0; i < answer.length; i++) {
          const row = direction === "across" ? startRow : startRow + i;
          const col = direction === "across" ? startCol + i : startCol;

          if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
            grid[row][col] = answer[i];
          }
        }
      } else {
        console.warn(
          `Clue out of bounds: ${answer} at (${startRow}, ${startCol})`
        );
      }
    });

    return { grid, numbers };
  };

  const { grid, numbers } = generateGrid();

  const handleInputChange = useCallback(
    (row: number, col: number, value: string) => {
      const key = `${row}-${col}`;
      const newResponses = { ...responses, [key]: value.toUpperCase() };
      setResponses(newResponses);

      onResponseChange?.(sectionId, newResponses);
    },
    [responses, sectionId, onResponseChange]
  );

  const getInputValue = (row: number, col: number): string => {
    return responses[`${row}-${col}`] || "";
  };

  const isCorrectCell = (row: number, col: number): boolean => {
    const userValue = getInputValue(row, col);
    const correctValue = grid[row][col];
    return !!(userValue && correctValue && userValue === correctValue);
  };

  const isIncorrectCell = (row: number, col: number): boolean => {
    const cellKey = `${row}-${col}`;
    if (!hasCheckedAnswers || !checkedCells.has(cellKey)) return false;

    const userValue = getInputValue(row, col);
    const correctValue = grid[row][col];
    return !!(userValue && correctValue && userValue !== correctValue);
  };

  const hasAnyInput = (): boolean => {
    return Object.values(responses).some((value) => value.trim() !== "");
  };

  const checkClueComplete = (clue: Clue): boolean => {
    const { answer, startRow, startCol, direction } = clue;

    for (let i = 0; i < answer.length; i++) {
      const row = direction === "across" ? startRow : startRow + i;
      const col = direction === "across" ? startCol + i : startCol;

      if (!isCorrectCell(row, col)) {
        return false;
      }
    }
    return true;
  };

  const findNextInput = useCallback(
    (currentRow: number, currentCol: number, direction: string) => {
      let nextRow = currentRow;
      let nextCol = currentCol;

      switch (direction) {
        case "ArrowLeft":
          nextCol = Math.max(0, currentCol - 1);
          break;
        case "ArrowRight":
          nextCol = Math.min(grid[0].length - 1, currentCol + 1);
          break;
        case "ArrowUp":
          nextRow = Math.max(0, currentRow - 1);
          break;
        case "ArrowDown":
          nextRow = Math.min(grid.length - 1, currentRow + 1);
          break;
      }

      // Find the next input element
      const selector = `input[data-row="${nextRow}"][data-col="${nextCol}"]`;
      return document.querySelector(selector) as HTMLInputElement;
    },
    [grid]
  );

  return (
    <div
      className="crossword-puzzle space-y-6"
      role="application"
      aria-label="Interactive crossword puzzle"
    >
      <style jsx>{`
        @media (max-width: 1024px) {
          .crossword-grid {
            overflow-x: auto;
            max-width: 100vw;
          }
        }

        @media (max-width: 768px) {
          .crossword-cell-active {
            width: 36px !important;
            height: 36px !important;
            font-size: 14px;
            min-width: 36px !important;
            min-height: 36px !important;
          }

          .crossword-cell-blocked {
            width: 36px !important;
            height: 36px !important;
            min-width: 36px !important;
            min-height: 36px !important;
          }

          .crossword-grid {
            font-size: 14px;
            padding: 8px !important;
          }

          .clues-section {
            gap: 2rem !important;
          }
        }

        @media (max-width: 480px) {
          .crossword-cell-active {
            width: 32px !important;
            height: 32px !important;
            font-size: 12px;
            min-width: 32px !important;
            min-height: 32px !important;
          }

          .crossword-cell-blocked {
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
            min-height: 32px !important;
          }

          .crossword-grid {
            font-size: 12px;
            padding: 6px !important;
          }

          .cell-number {
            font-size: 8px !important;
          }

          .clues-section {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }

        @media print {
          .crossword-grid {
            font-family: "Courier New", monospace !important;
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
            background: #d1d5db !important;
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

      {/* Crossword Container */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Crossword Grid */}
        <div className="flex-shrink-0 w-full lg:w-auto overflow-x-auto">
          <div className="crossword-grid font-mono text-xs bg-white border border-gray-300 p-2 sm:p-4 rounded inline-block min-w-fit">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, colIndex) => {
                  const cellNumber = numbers[rowIndex][colIndex];
                  const isActive = cell !== null;
                  const isCorrect =
                    isActive && isCorrectCell(rowIndex, colIndex);
                  const userValue = getInputValue(rowIndex, colIndex);

                  if (!isActive) {
                    return (
                      <div
                        key={colIndex}
                        className="crossword-cell crossword-cell-blocked w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 border border-gray-600"
                        aria-hidden="true"
                      />
                    );
                  }

                  return (
                    <div key={colIndex} className="relative">
                      <input
                        type="text"
                        maxLength={1}
                        value={userValue}
                        onChange={(e) =>
                          handleInputChange(rowIndex, colIndex, e.target.value)
                        }
                        className={`crossword-cell crossword-cell-active w-8 h-8 sm:w-9 sm:h-9 text-center border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                          isCorrect
                            ? "bg-green-100 border-green-600 text-green-900"
                            : isIncorrectCell(rowIndex, colIndex)
                              ? "bg-red-100 border-red-600 text-red-900"
                              : "bg-white text-gray-900"
                        }`}
                        aria-label={`Crossword cell row ${rowIndex + 1}, column ${colIndex + 1}${cellNumber ? `, number ${cellNumber}` : ""}`}
                        tabIndex={0}
                        data-row={rowIndex}
                        data-col={colIndex}
                        onKeyDown={(e) => {
                          if (
                            e.key === "ArrowLeft" ||
                            e.key === "ArrowRight" ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowDown"
                          ) {
                            e.preventDefault();
                            const nextInput = findNextInput(
                              rowIndex,
                              colIndex,
                              e.key
                            );
                            if (nextInput) nextInput.focus();
                          }
                        }}
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
        </div>

        {/* Clues */}
        <div className="flex-1 min-w-0">
          <div className="clues-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-4">
            <div
              className="bg-white p-4 border border-gray-300 rounded"
              role="region"
              aria-labelledby="across-clues-heading"
            >
              <h4
                id="across-clues-heading"
                className="font-bold text-gray-800 mb-3 text-lg"
              >
                ACROSS:
              </h4>
              <div className="space-y-2">
                {clues
                  .filter((clue) => clue.direction === "across")
                  .sort((a, b) => a.number - b.number)
                  .map((clue) => {
                    const isComplete = checkClueComplete(clue);
                    return (
                      <div
                        key={`across-${clue.number}`}
                        className={`text-sm ${isComplete ? "text-green-700 font-medium" : "text-gray-800"}`}
                      >
                        <span className="font-bold">{clue.number}.</span>{" "}
                        {clue.clue}
                        {isComplete && <span className="ml-2">✅</span>}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div
              className="bg-white p-4 border border-gray-300 rounded"
              role="region"
              aria-labelledby="down-clues-heading"
            >
              <h4
                id="down-clues-heading"
                className="font-bold text-gray-800 mb-3 text-lg"
              >
                DOWN:
              </h4>
              <div className="space-y-2">
                {clues
                  .filter((clue) => clue.direction === "down")
                  .sort((a, b) => a.number - b.number)
                  .map((clue) => {
                    const isComplete = checkClueComplete(clue);
                    return (
                      <div
                        key={`down-${clue.number}`}
                        className={`text-sm ${isComplete ? "text-green-700 font-medium" : "text-gray-800"}`}
                      >
                        <span className="font-bold">{clue.number}.</span>{" "}
                        {clue.clue}
                        {isComplete && <span className="ml-2">✅</span>}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Display */}
      <div className="bg-gray-50 p-4 rounded">
        <div className="flex items-center justify-between">
          <span className="text-gray-800">
            Clues Solved:{" "}
            <span className="font-bold">
              {clues.filter(checkClueComplete).length}
            </span>{" "}
            / {clues.length}
          </span>
          <div className="online-controls print:hidden">
            {clues.every(checkClueComplete) && (
              <span className="text-green-700 font-bold">
                🎉 Crossword complete!
              </span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-gray-700 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(clues.filter(checkClueComplete).length / clues.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Online Controls */}
      <div className="online-controls print:hidden flex gap-2">
        <button
          onClick={() => {
            const newCheckedCells = new Set<string>();
            clues.forEach((clue) => {
              const { answer, startRow, startCol, direction } = clue;
              for (let i = 0; i < answer.length; i++) {
                const row = direction === "across" ? startRow : startRow + i;
                const col = direction === "across" ? startCol + i : startCol;
                newCheckedCells.add(`${row}-${col}`);
              }
            });
            setCheckedCells(newCheckedCells);
            setHasCheckedAnswers(true);
          }}
          disabled={!hasAnyInput()}
          className={`px-6 py-3 rounded transition-colors min-h-[44px] min-w-[44px] ${
            hasAnyInput()
              ? "bg-gray-700 text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-label="Check crossword answers"
        >
          Check Answers
        </button>
        <button
          onClick={() => {
            const newResponses: Record<string, string> = {};
            clues.forEach((clue) => {
              const { answer, startRow, startCol, direction } = clue;
              for (let i = 0; i < answer.length; i++) {
                const row = direction === "across" ? startRow : startRow + i;
                const col = direction === "across" ? startCol + i : startCol;
                newResponses[`${row}-${col}`] = answer[i];
              }
            });
            setResponses(newResponses);
            onResponseChange?.(sectionId, newResponses);
          }}
          disabled={!hasCheckedAnswers}
          className={`px-6 py-3 rounded transition-colors min-h-[44px] min-w-[44px] ${
            hasCheckedAnswers
              ? "bg-gray-600 text-white hover:bg-gray-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-label="Show all crossword answers"
        >
          Show All Answers
        </button>
        <button
          onClick={() => {
            setResponses({});
            setHasCheckedAnswers(false);
            setCheckedCells(new Set());
            onResponseChange?.(sectionId, {});
          }}
          className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors min-h-[44px] min-w-[44px]"
          aria-label="Clear all crossword answers"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default CrosswordPuzzle;
