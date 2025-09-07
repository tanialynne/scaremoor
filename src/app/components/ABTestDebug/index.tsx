"use client";

import { useState, useEffect } from "react";
import { generateVariantLinks, isDebugMode, useABTest } from "@/app/utils/abTesting";

interface ABTestDebugProps {
  testId: string;
  position?: 'top' | 'bottom' | 'fixed';
  className?: string;
}

/**
 * A/B Test Debug Component
 * Shows current variant and links to test all variants
 * Only shows in debug mode or when URL parameters are present
 */
export const ABTestDebug: React.FC<ABTestDebugProps> = ({ 
  testId, 
  position = 'fixed',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [variantLinks, setVariantLinks] = useState<any[]>([]);
  const { variant, isInTest, isHydrated } = useABTest(testId);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsVisible(isDebugMode() || process.env.NODE_ENV === 'development');
      setVariantLinks(generateVariantLinks(testId));
    }
  }, [testId]);

  if (!isVisible || !isHydrated) return null;

  const positionClasses = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0', 
    fixed: 'fixed top-4 right-4 max-w-sm'
  };

  return (
    <div className={`bg-gray-900 border border-orange-500 rounded-lg p-4 text-white text-sm z-[9999] ${positionClasses[position]} ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-orange-400">🧪 A/B Test Debug</h4>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white text-xs"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="text-xs">
          <span className="text-gray-400">Test:</span> <span className="font-mono">{testId}</span>
        </div>
        <div className="text-xs">
          <span className="text-gray-400">Current:</span> <span className="font-bold text-green-400">{variant}</span>
        </div>
        <div className="text-xs">
          <span className="text-gray-400">In Test:</span> <span className={isInTest ? 'text-green-400' : 'text-red-400'}>{isInTest ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {variantLinks.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">Test Variants:</p>
          <div className="space-y-1">
            {variantLinks.map((link) => (
              <a
                key={link.variant}
                href={link.url}
                className={`block px-2 py-1 rounded text-xs transition-colors ${
                  variant === link.variant 
                    ? 'bg-orange-600 text-white font-bold' 
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
        💡 Add <code className="bg-gray-800 px-1 rounded">?variant=control</code> to any URL
      </div>
    </div>
  );
};

export default ABTestDebug;