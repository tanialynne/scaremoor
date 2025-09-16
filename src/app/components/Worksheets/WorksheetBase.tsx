'use client';

import React, { useState } from 'react';
import { OnlineWorksheet, WorksheetResponse } from './types';

interface WorksheetBaseProps {
  worksheet: OnlineWorksheet;
  storyTitle: string;
  children: React.ReactNode;
  onSave?: () => void;
  onPrintWithAnswers?: () => void;
  onPrintBlank?: () => void;
  printMode?: boolean;
}

const WorksheetBase: React.FC<WorksheetBaseProps> = ({
  worksheet,
  storyTitle,
  children,
  onSave,
  onPrintWithAnswers,
  onPrintBlank,
  printMode = false
}) => {
  const [studentName, setStudentName] = useState('');
  const [responses] = useState<Record<string, string | string[]>>({});

  const getGradeColor = (grade: number) => {
    switch (grade) {
      case 3: return 'from-blue-600 to-blue-800';
      case 4: return 'from-purple-600 to-purple-800';
      case 5: return 'from-red-600 to-red-800';
      default: return 'from-gray-600 to-gray-800';
    }
  };

  const getGradeBorderColor = (grade: number) => {
    switch (grade) {
      case 3: return 'border-blue-500';
      case 4: return 'border-purple-500';
      case 5: return 'border-red-500';
      default: return 'border-gray-500';
    }
  };

  const handleSave = () => {
    onSave?.();
  };

  const handlePrintWithAnswers = () => {
    onPrintWithAnswers?.();
  };

  const handlePrintBlank = () => {
    onPrintBlank?.();
  };

  return (
    <div className={`worksheet-container ${printMode ? 'print-mode' : ''}`}>
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .worksheet-container {
            background: white !important;
            color: black !important;
            font-family: 'Georgia', 'Times New Roman', serif !important;
            font-size: 14px !important;
            line-height: 1.6 !important;
          }

          .no-print {
            display: none !important;
          }

          .page-break {
            page-break-before: always;
          }

          .worksheet-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .grade-banner {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }

        @page {
          size: letter;
          margin: 0.75in;
        }
      `}</style>

      {/* Worksheet Header */}
      <div className={`worksheet-header bg-gradient-to-r ${getGradeColor(worksheet.grade)} text-white p-6 rounded-t-xl`}>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Grade {worksheet.grade} Worksheet
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-1">
            {storyTitle}
          </h2>
          <div className="text-base opacity-90">
            {worksheet.sections.map(section => section.solStandards.join(', ')).join(' • ')}
          </div>
        </div>
      </div>

      {/* Student Info Section - Not printed if in online mode */}
      {!printMode && (
        <div className={`student-info bg-white border-l-4 ${getGradeBorderColor(worksheet.grade)} p-4 no-print`}>
          <div className="max-w-md">
            <label htmlFor="studentName" className="block text-base font-medium text-gray-700 mb-2">
              Student Name (Optional):
            </label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
        </div>
      )}

      {/* Print Info Section - Only shown in print */}
      <div className="print-only hidden print:block bg-white p-4 border-b-2 border-gray-300">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">Name: _________________________</p>
            <p className="font-semibold mt-2">Date: _________________________</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Grade: {worksheet.grade}</p>
            <p className="text-base">SOL Standards: {worksheet.sections.map(s => s.solStandards.join(', ')).join(' • ')}</p>
          </div>
        </div>
      </div>

      {/* Worksheet Content */}
      <div className="worksheet-content bg-white">
        {children}
      </div>

      {/* Controls - Not printed */}
      {!printMode && (
        <div className="worksheet-controls bg-gray-50 p-4 rounded-b-xl border-t no-print">
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <div className="text-base text-gray-600">
              Time Estimate: {worksheet.sections.map(s => s.timeEstimate).join(', ')}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handlePrintWithAnswers}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                🖨️ Print with Answers
              </button>
              <button
                onClick={handlePrintBlank}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                📄 Print Blank
              </button>
              {onSave && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  💾 Save Progress
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksheetBase;