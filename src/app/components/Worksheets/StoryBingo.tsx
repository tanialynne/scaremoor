'use client';

import React, { useState, useCallback } from 'react';

interface StoryBingoProps {
  sectionId: string;
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
}

const StoryBingo: React.FC<StoryBingoProps> = ({
  sectionId,
  onResponseChange
}) => {
  const [markedCells, setMarkedCells] = useState<Set<number>>(new Set());
  const [bingoAchieved, setBingoAchieved] = useState<string[]>([]);

  // Bingo card items from the HTML file
  const bingoItems = [
    'Brass Key', 'Pizza', 'Trevor Gone', 'Supply Closet', 'Whisper',
    'Ava Returns', 'Gray Door', 'Empty Drawer', 'Hallway', 'Max',
    'Microscope', 'Locker', '🆓 FREE', 'Mr. Devlin', 'Identity',
    'Forgotten', 'Choose Wisely', 'Yogurt', 'Note from Mom', 'Changes',
    'Perfect Life', 'Disappeared', 'Reality', 'Running Away', '"Make it Better"'
  ];

  const checkForBingo = useCallback((marked: Set<number>) => {
    const bingos: string[] = [];

    // Check rows
    for (let row = 0; row < 5; row++) {
      const rowCells = [];
      for (let col = 0; col < 5; col++) {
        rowCells.push(row * 5 + col);
      }
      if (rowCells.every(cell => marked.has(cell))) {
        bingos.push(`Row ${row + 1}`);
      }
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      const colCells = [];
      for (let row = 0; row < 5; row++) {
        colCells.push(row * 5 + col);
      }
      if (colCells.every(cell => marked.has(cell))) {
        bingos.push(`Column ${col + 1}`);
      }
    }

    // Check diagonals
    const diagonal1 = [0, 6, 12, 18, 24];
    const diagonal2 = [4, 8, 12, 16, 20];

    if (diagonal1.every(cell => marked.has(cell))) {
      bingos.push('Diagonal (top-left to bottom-right)');
    }
    if (diagonal2.every(cell => marked.has(cell))) {
      bingos.push('Diagonal (top-right to bottom-left)');
    }

    return bingos;
  }, []);

  const handleCellClick = useCallback((index: number) => {
    if (index === 12) return; // Free space is always marked

    setMarkedCells(prev => {
      const newMarked = new Set(prev);
      if (newMarked.has(index)) {
        newMarked.delete(index);
      } else {
        newMarked.add(index);
      }

      // Always include free space
      newMarked.add(12);

      const bingos = checkForBingo(newMarked);
      setBingoAchieved(bingos);

      // Report progress
      onResponseChange?.(sectionId, {
        'marked-cells': Array.from(newMarked).sort((a, b) => a - b).join(','),
        'bingo-achieved': bingos.length > 0 ? 'Yes' : 'No',
        'bingo-lines': bingos.join(', ')
      });

      return newMarked;
    });
  }, [sectionId, onResponseChange, checkForBingo]);

  // Initialize with free space marked
  React.useEffect(() => {
    setMarkedCells(new Set([12]));
  }, []);

  return (
    <div className="story-bingo space-y-6">
      <style jsx>{`
        @media print {
          .bingo-card {
            border: 3px solid #333 !important;
            page-break-inside: avoid !important;
          }

          .bingo-cell {
            border: 2px solid #333 !important;
            font-size: 12px !important;
            min-height: 60px !important;
          }

          .bingo-header {
            background: #666 !important;
            color: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .free-space {
            background: #ddd !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .online-controls {
            display: none !important;
          }
        }
      `}</style>


      {/* Bingo Card */}
      <div className="bingo-card grid grid-cols-5 gap-1 max-w-2xl mx-auto p-4 bg-white border-3 border-gray-600 rounded-lg">
        {/* Header Row */}
        <div className="bingo-cell bingo-header bg-gray-600 text-white font-bold text-2xl flex items-center justify-center p-2 min-h-[60px]">
          B
        </div>
        <div className="bingo-cell bingo-header bg-gray-600 text-white font-bold text-2xl flex items-center justify-center p-2 min-h-[60px]">
          I
        </div>
        <div className="bingo-cell bingo-header bg-gray-600 text-white font-bold text-2xl flex items-center justify-center p-2 min-h-[60px]">
          N
        </div>
        <div className="bingo-cell bingo-header bg-gray-600 text-white font-bold text-2xl flex items-center justify-center p-2 min-h-[60px]">
          G
        </div>
        <div className="bingo-cell bingo-header bg-gray-600 text-white font-bold text-2xl flex items-center justify-center p-2 min-h-[60px]">
          O
        </div>

        {/* Bingo Items */}
        {bingoItems.map((item, index) => {
          const isMarked = markedCells.has(index + 5); // +5 because header takes first 5 positions
          const isFreeSpace = index === 7; // Index 7 in bingoItems is the free space
          const actualIndex = index + 5;

          return (
            <div
              key={actualIndex}
              className={`bingo-cell border-2 border-gray-300 flex items-center justify-center text-center p-2 min-h-[60px] text-sm cursor-pointer transition-all ${
                isFreeSpace
                  ? 'free-space bg-gray-200 font-bold'
                  : isMarked
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => !isFreeSpace && handleCellClick(actualIndex)}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* Bingo Status */}
      {bingoAchieved.length > 0 && (
        <div className="bg-green-100 border border-green-400 rounded-lg p-4 text-center">
          <div className="text-green-800 font-bold text-lg mb-2">
            🎉 BINGO! 🎉
          </div>
          <div className="text-green-700">
            You achieved BINGO on: {bingoAchieved.join(', ')}
          </div>
        </div>
      )}

      {/* Progress Display */}
      <div className="bg-gray-50 p-4 rounded">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            Squares Marked: <span className="font-bold">{markedCells.size}</span> / 25
          </span>
          <div className="online-controls print:hidden">
            <button
              onClick={() => {
                setMarkedCells(new Set([12])); // Reset to just free space
                setBingoAchieved([]);
                onResponseChange?.(sectionId, {
                  'marked-cells': '12',
                  'bingo-achieved': 'No',
                  'bingo-lines': ''
                });
              }}
              className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
            >
              Reset Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryBingo;