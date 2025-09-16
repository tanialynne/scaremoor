'use client';

import React, { useState } from 'react';
import { CauseEffectPair } from './types';

interface CauseEffectWorksheetProps {
  sectionId: string;
  pairs: CauseEffectPair[];
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
}

const CauseEffectWorksheet: React.FC<CauseEffectWorksheetProps> = ({
  sectionId,
  pairs,
  onResponseChange
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleInputChange = (pairId: string, value: string) => {
    const newResponses = { ...responses, [pairId]: value };
    setResponses(newResponses);
    onResponseChange?.(sectionId, newResponses);
  };

  return (
    <div className="cause-effect-worksheet">
      <style jsx>{`
        @media print {
          .cause-effect-chart {
            display: grid !important;
            grid-template-columns: 1fr auto 1fr !important;
            gap: 20px !important;
            align-items: center !important;
            margin: 20px 0 !important;
            page-break-inside: avoid;
          }

          .cause-box, .effect-box {
            background: white !important;
            border: 2px solid #333 !important;
            border-radius: 10px !important;
            padding: 15px !important;
            min-height: 80px !important;
          }

          .arrow {
            font-size: 30px !important;
            color: #333 !important;
          }

          .online-input {
            display: none !important;
          }

          .print-lines {
            display: block !important;
          }

          .effect-lines {
            border-bottom: 1px solid #333 !important;
            height: 20px !important;
            margin: 5px 0 !important;
          }

          @media (max-width: 768px) {
            .cause-effect-chart {
              grid-template-columns: 1fr !important;
              gap: 10px !important;
            }
          }
        }
      `}</style>

      <div className="space-y-8">

        {/* Cause and Effect Pairs */}
        {pairs.map((pair) => (
          <div key={pair.id} className="cause-effect-chart grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4 items-center">
            {/* Cause Box */}
            <div className="cause-box bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
              <div className="font-semibold text-gray-800 mb-2">CAUSE:</div>
              <div className="text-base text-gray-700 leading-relaxed">
                {pair.cause}
              </div>
            </div>

            {/* Arrow */}
            <div className="arrow text-center text-3xl text-gray-600 lg:my-0 my-2">
              <span className="hidden lg:inline">→</span>
              <span className="lg:hidden">↓</span>
            </div>

            {/* Effect Box */}
            <div className="effect-box bg-white border-2 border-gray-300 rounded-lg p-4">
              <div className="font-semibold text-gray-800 mb-3">EFFECT:</div>

              {/* Pre-filled effect (if provided) */}
              {pair.effect ? (
                <div className="text-base text-gray-700 leading-relaxed">
                  {pair.effect}
                </div>
              ) : (
                <>
                  {/* Online Input */}
                  <div className="online-input print:hidden">
                    <textarea
                      value={responses[pair.id] || ''}
                      onChange={(e) => handleInputChange(pair.id, e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                      rows={3}
                      placeholder="What happened as a result?"
                    />
                  </div>

                  {/* Print Lines */}
                  <div className="print-lines hidden print:block">
                    <div className="effect-lines border-b border-gray-400"></div>
                    <div className="effect-lines border-b border-gray-400"></div>
                    <div className="effect-lines border-b border-gray-400"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CauseEffectWorksheet;