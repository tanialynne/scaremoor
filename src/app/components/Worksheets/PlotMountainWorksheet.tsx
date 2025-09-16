'use client';

import React, { useState } from 'react';
import { PlotPoint } from './types';

interface PlotMountainWorksheetProps {
  sectionId: string;
  plotPoints?: PlotPoint[];
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
}

const defaultPlotPoints: PlotPoint[] = [
  { id: 'exposition', stage: 'exposition', label: 'Exposition' },
  { id: 'rising-action', stage: 'rising-action', label: 'Rising Action' },
  { id: 'climax', stage: 'climax', label: 'Climax' },
  { id: 'falling-action', stage: 'falling-action', label: 'Falling Action' },
  { id: 'resolution', stage: 'resolution', label: 'Resolution' }
];

const PlotMountainWorksheet: React.FC<PlotMountainWorksheetProps> = ({
  sectionId,
  plotPoints = defaultPlotPoints,
  onResponseChange
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleInputChange = (pointId: string, value: string) => {
    const newResponses = { ...responses, [pointId]: value };
    setResponses(newResponses);
    onResponseChange?.(sectionId, newResponses);
  };

  const getPositionClass = (stage: string) => {
    switch (stage) {
      case 'exposition': return 'bottom-4 left-4';
      case 'rising-action': return 'bottom-20 left-1/4';
      case 'climax': return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'falling-action': return 'bottom-20 right-1/4';
      case 'resolution': return 'bottom-4 right-4';
      default: return 'bottom-4 left-4';
    }
  };

  return (
    <div className="plot-mountain-worksheet">
      <style jsx>{`
        @media print {
          .plot-mountain {
            position: relative !important;
            height: 400px !important;
            margin: 30px 0 !important;
            background: white !important;
            border: 2px solid #333 !important;
            border-radius: 10px !important;
            padding: 20px !important;
            page-break-inside: avoid;
          }

          .plot-point {
            position: absolute !important;
            background: white !important;
            border: 2px solid #333 !important;
            border-radius: 10px !important;
            padding: 10px !important;
            width: 120px !important;
            text-align: center !important;
            font-size: 12px !important;
          }

          .plot-lines {
            border-bottom: 1px solid #333 !important;
            height: 15px !important;
            margin: 3px 0 !important;
          }

          .online-input {
            display: none !important;
          }

          .mountain-line {
            stroke: #333 !important;
            stroke-width: 3 !important;
          }
        }

        @media (max-width: 768px) {
          .plot-mountain {
            height: auto !important;
          }

          .mobile-plot-points {
            display: block !important;
          }

          .desktop-plot-mountain {
            display: none !important;
          }
        }
      `}</style>

      <div className="space-y-6">

        {/* Desktop Plot Mountain */}
        <div className="desktop-plot-mountain hidden md:block">
          <div className="plot-mountain relative h-80 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-xl p-8">
            {/* Mountain Line SVG */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 300"
              preserveAspectRatio="none"
            >
              <path
                className="mountain-line"
                d="M 50 250 L 150 200 L 300 50 L 450 200 L 550 250"
                stroke="#4b5563"
                strokeWidth="3"
                fill="none"
              />
            </svg>

            {/* Plot Points */}
            {plotPoints.map((point) => (
              <div
                key={point.id}
                className={`plot-point absolute bg-white border-2 border-gray-400 rounded-lg p-3 w-32 text-center shadow-lg ${getPositionClass(point.stage)}`}
              >
                <div className="font-semibold text-gray-800 text-base mb-2">
                  {point.label}
                </div>

                {/* Online Input */}
                <div className="online-input print:hidden">
                  <textarea
                    value={responses[point.id] || ''}
                    onChange={(e) => handleInputChange(point.id, e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded resize-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                    rows={3}
                    placeholder="What happens here?"
                  />
                </div>

                {/* Print Lines */}
                <div className="print-lines hidden print:block">
                  <div className="plot-lines"></div>
                  <div className="plot-lines"></div>
                  <div className="plot-lines"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Plot Points (Stacked) */}
        <div className="mobile-plot-points md:hidden">
          <div className="space-y-4">
            {plotPoints.map((point) => (
              <div
                key={point.id}
                className="plot-point-mobile bg-white border-2 border-gray-400 rounded-lg p-4 shadow-sm"
              >
                <div className="font-semibold text-gray-800 mb-3">
                  {point.label}
                </div>

                {/* Online Input */}
                <div className="online-input print:hidden">
                  <textarea
                    value={responses[point.id] || ''}
                    onChange={(e) => handleInputChange(point.id, e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                    rows={3}
                    placeholder="Describe what happens in this part of the story..."
                  />
                </div>

                {/* Print Lines */}
                <div className="print-lines hidden print:block">
                  <div className="plot-lines border-b border-gray-400 h-5 mb-2"></div>
                  <div className="plot-lines border-b border-gray-400 h-5 mb-2"></div>
                  <div className="plot-lines border-b border-gray-400 h-5 mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlotMountainWorksheet;