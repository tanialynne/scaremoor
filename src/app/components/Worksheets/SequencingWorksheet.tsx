'use client';

import React, { useState } from 'react';
import { SequencingCard } from './types';

interface SequencingWorksheetProps {
  sectionId: string;
  cards: SequencingCard[];
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
}

const SequencingWorksheet: React.FC<SequencingWorksheetProps> = ({
  sectionId,
  cards,
  onResponseChange
}) => {
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [orderedCards, setOrderedCards] = useState<SequencingCard[]>([...cards]);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();

    if (!draggedCard) return;

    const draggedIndex = orderedCards.findIndex(card => card.id === draggedCard);
    if (draggedIndex === -1) return;

    const newOrderedCards = [...orderedCards];
    const [draggedCardData] = newOrderedCards.splice(draggedIndex, 1);
    newOrderedCards.splice(targetIndex, 0, draggedCardData);

    setOrderedCards(newOrderedCards);
    setDraggedCard(null);

    // Send response
    const response = newOrderedCards.reduce((acc, card, index) => {
      acc[card.id] = (index + 1).toString();
      return acc;
    }, {} as Record<string, string>);

    onResponseChange?.(sectionId, response);
  };

  const checkAnswers = () => {
    setShowAnswers(true);
  };

  const resetCards = () => {
    setOrderedCards([...cards]);
    setShowAnswers(false);
    onResponseChange?.(sectionId, {});
  };

  const isCorrectOrder = () => {
    return orderedCards.every((card, index) => card.correctOrder === index + 1);
  };

  return (
    <div className="sequencing-worksheet">
      <style jsx>{`
        @media print {
          .sequencing-cards {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 15px !important;
          }

          .sequence-card {
            border: 2px dashed #333 !important;
            background: white !important;
            padding: 15px !important;
            min-height: 100px !important;
            page-break-inside: avoid;
          }

          .sequence-card .number {
            width: 30px !important;
            height: 30px !important;
            border: 2px solid #333 !important;
            background: white !important;
            color: #333 !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-weight: bold !important;
            margin: -10px 0 10px -10px !important;
          }

          .online-controls {
            display: none !important;
          }
        }
      `}</style>

      <div className="space-y-6">
        {/* Instructions */}
        <div className="instructions bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
          <h5 className="font-medium text-orange-800 mb-2">Instructions:</h5>
          <p className="text-base text-orange-700 mb-2">
            <strong>Online:</strong> Drag and drop the cards to put the events in the correct order.
          </p>
          <p className="text-base text-orange-700">
            <strong>Print:</strong> Cut out the cards and arrange them in order, then write the numbers 1-{cards.length} in the circles.
          </p>
        </div>

        {/* Online Controls */}
        <div className="online-controls print:hidden flex gap-3">
          <button
            onClick={checkAnswers}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
Check Answers
          </button>
          <button
            onClick={resetCards}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
Reset
          </button>
        </div>

        {/* Results */}
        {showAnswers && (
          <div className={`results p-4 rounded-lg border-2 ${
            isCorrectOrder()
              ? 'bg-green-50 border-green-400 text-green-800'
              : 'bg-red-50 border-red-400 text-red-800'
          }`}>
            <p className="font-medium">
              {isCorrectOrder() ? 'Perfect! You got the sequence right!' : 'Not quite right. Try again!'}
            </p>
          </div>
        )}

        {/* Sequencing Cards */}
        <div className="sequencing-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderedCards.map((card, index) => (
            <div
              key={card.id}
              draggable
              onDragStart={(e) => handleDragStart(e, card.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`sequence-card bg-white border-2 border-dashed border-blue-400 rounded-lg p-4 min-h-24 relative cursor-move hover:border-blue-600 transition-colors ${
                showAnswers && card.correctOrder !== index + 1 ? 'bg-red-50 border-red-400' : ''
              } ${
                showAnswers && card.correctOrder === index + 1 ? 'bg-green-50 border-green-400' : ''
              }`}
            >
              {/* Number Circle */}
              <div className="number absolute -top-3 -left-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-base">
                {/* Online: Show current position, Print: Empty for student to fill */}
                <span className="print:hidden">{index + 1}</span>
                <span className="hidden print:inline">___</span>
              </div>

              {/* Card Text */}
              <div className="mt-2 text-base leading-tight">
                {card.text}
              </div>

              {/* Correct Answer (only shown when checking) */}
              {showAnswers && (
                <div className="mt-2 text-sm font-medium">
                  Correct position: #{card.correctOrder}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Print Instructions */}
        <div className="print-instructions hidden print:block bg-gray-50 p-4 rounded border">
          <p className="font-medium mb-2">After cutting out the cards:</p>
          <ol className="text-base space-y-1">
            <li>1. Read each event carefully</li>
            <li>2. Think about what happened first, second, third, etc.</li>
            <li>3. Arrange the cards in order</li>
            <li>4. Write the numbers 1-{cards.length} in the circles</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SequencingWorksheet;