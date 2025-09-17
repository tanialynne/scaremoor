'use client';

import React, { useState, useCallback, useMemo } from 'react';

interface CryptogramPuzzlesProps {
  sectionId: string;
  onResponseChange?: (sectionId: string, responses: Record<string, string>) => void;
  storyData?: Record<string, unknown>;
}

interface CryptogramData {
  id: string;
  title: string;
  cipher: string;
  encoded: string;
  answer: string;
  hint: string;
}

const CryptogramPuzzles: React.FC<CryptogramPuzzlesProps> = ({
  sectionId,
  onResponseChange,
  storyData
}) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  // Cipher encoding functions
  const encodeCaesar = (text: string, shift: number = 3): string => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const encodeReverse = (text: string): string => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
      }
      return char;
    }).join('');
  };

  const encodeAtbash = (text: string): string => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        // A=65, Z=90. ROT13: A→N, B→O, C→P, etc.
        return String.fromCharCode(((char.charCodeAt(0) - 65 + 13) % 26) + 65);
      }
      return char;
    }).join('');
  };

  const encodeMessage = useCallback((message: string, cipher: string): string => {
    switch (cipher) {
      case 'caesar-3':
        return encodeCaesar(message, 3);
      case 'reverse':
        return encodeReverse(message);
      case 'atbash':
        return encodeAtbash(message);
      default:
        return message;
    }
  }, []);

  const getCipherDescription = (cipher: string): string => {
    switch (cipher) {
      case 'caesar-3':
        return 'Caesar Cipher (shift 3): A→D, B→E, C→F, etc.';
      case 'reverse':
        return 'Reverse Alphabet: A→Z, B→Y, C→X, etc.';
      case 'atbash':
        return 'ROT13 Cipher: A→N, B→O, C→P, etc.';
      default:
        return 'Unknown cipher';
    }
  };

  const cryptograms: CryptogramData[] = useMemo(() => {
    const storyMessages = (storyData?.cryptogramMessages as Array<{message: string, cipher: string}>) || (storyData?.messages as Array<{message: string, cipher: string}>) || [];

    return storyMessages.map((messageData, index) => ({
      id: `crypto${index + 1}`,
      title: `Cryptogram #${index + 1}`,
      cipher: getCipherDescription(messageData.cipher),
      encoded: encodeMessage(messageData.message, messageData.cipher),
      answer: messageData.message,
      hint: `Hidden message from the story`
    }));
  }, [storyData, encodeMessage]);

  const handleInputChange = useCallback((cryptogramId: string, value: string) => {
    const newResponses = { ...responses, [cryptogramId]: value };
    setResponses(newResponses);

    // Check if answer is correct
    const cryptogram = cryptograms.find(c => c.id === cryptogramId);
    const isCorrect = cryptogram && value.toUpperCase().replace(/[^A-Z]/g, '') === cryptogram.answer.replace(/[^A-Z]/g, '');

    onResponseChange?.(sectionId, {
      ...newResponses,
      [`${cryptogramId}-correct`]: isCorrect ? 'true' : 'false'
    });
  }, [responses, sectionId, onResponseChange, cryptograms]);

  const checkAnswer = (cryptogramId: string): 'correct' | 'incorrect' | 'none' => {
    const response = responses[cryptogramId];
    if (!response || response.trim() === '') return 'none';

    const cryptogram = cryptograms.find(c => c.id === cryptogramId);
    if (!cryptogram) return 'none';

    const cleanResponse = response.toUpperCase().replace(/[^A-Z]/g, '');
    const cleanAnswer = cryptogram.answer.replace(/[^A-Z]/g, '');

    return cleanResponse === cleanAnswer ? 'correct' : 'incorrect';
  };

  const getStatusColor = (status: 'correct' | 'incorrect' | 'none') => {
    switch (status) {
      case 'correct': return 'border-green-500 bg-green-50';
      case 'incorrect': return 'border-red-500 bg-red-50';
      case 'none': return 'border-gray-300 bg-gray-50';
    }
  };

  const getStatusIcon = (status: 'correct' | 'incorrect' | 'none') => {
    switch (status) {
      case 'correct': return '✅';
      case 'incorrect': return '❌';
      case 'none': return '';
    }
  };

  return (
    <div className="cryptogram-puzzles space-y-8">
      <style jsx>{`
        @media print {
          .cryptogram-box {
            border: 2px solid #333 !important;
            background: #f5f5f5 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            page-break-inside: avoid !important;
          }

          .encoded-text {
            font-family: 'Courier New', monospace !important;
            font-size: 18px !important;
            font-weight: bold !important;
            letter-spacing: 2px !important;
          }

          .cipher-info {
            font-size: 12px !important;
            background: #e5e5e5 !important;
            border: 1px solid #999 !important;
          }

          .online-controls {
            display: none !important;
          }

          .answer-input {
            border: 2px solid #333 !important;
            background: white !important;
            min-height: 30px !important;
          }
        }
      `}</style>


      {cryptograms.map((crypto) => {
        const status = checkAnswer(crypto.id);
        const statusColor = getStatusColor(status);
        const statusIcon = getStatusIcon(status);

        return (
          <div key={crypto.id} className={`cryptogram-box bg-gray-50 rounded-lg p-6 border-2 ${statusColor}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{crypto.title}</h3>
              <div className="online-controls print:hidden text-2xl">
                {statusIcon}
              </div>
            </div>

            {/* Cipher Information */}
            <div className="cipher-info bg-gray-100 border border-gray-300 rounded p-3 mb-4">
              <p className="text-sm text-gray-700">
                <strong>Cipher:</strong> {crypto.cipher}
              </p>
            </div>

            {/* Encoded Message */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Encoded Message:</p>
              <div className="encoded-text bg-gray-800 text-gray-200 p-4 rounded font-mono text-lg tracking-wider print:bg-gray-200 print:text-black print:border-2 print:border-black">
                {crypto.encoded}
              </div>
            </div>

            {/* Answer Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer:
              </label>
              <input
                type="text"
                value={responses[crypto.id] || ''}
                onChange={(e) => handleInputChange(crypto.id, e.target.value)}
                placeholder="Decode the message here..."
                className="answer-input w-full p-3 border border-gray-300 rounded font-mono text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>

            {/* Hint */}
            <div className="bg-gray-100 border-l-4 border-gray-400 p-3 rounded">
              <p className="text-sm text-gray-600">
                <strong>💡 Hint:</strong> {crypto.hint}
              </p>
            </div>

            {/* Online Controls */}
            <div className="online-controls print:hidden mt-4 flex gap-2">
              <button
                onClick={() => {
                  const newResponses = { ...responses, [crypto.id]: crypto.answer };
                  setResponses(newResponses);
                  onResponseChange?.(sectionId, {
                    ...newResponses,
                    [`${crypto.id}-correct`]: 'true'
                  });
                }}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
              >
                Show Answer
              </button>
              <button
                onClick={() => handleInputChange(crypto.id, '')}
                className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        );
      })}

      {/* Progress Display */}
      <div className="bg-gray-50 p-4 rounded">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            Solved: <span className="font-bold">
              {cryptograms.filter(c => checkAnswer(c.id) === 'correct').length}
            </span> / {cryptograms.length}
          </span>
          <div className="online-controls print:hidden">
            {cryptograms.every(c => checkAnswer(c.id) === 'correct') && (
              <span className="text-green-600 font-bold">🎉 All cryptograms solved!</span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-gray-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(cryptograms.filter(c => checkAnswer(c.id) === 'correct').length / cryptograms.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CryptogramPuzzles;