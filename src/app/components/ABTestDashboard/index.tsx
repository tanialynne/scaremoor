"use client";

import { useState, useEffect } from "react";
import { AB_TESTS, getActiveTests, ABTestConfig } from "@/app/utils/abTesting";

/**
 * A/B Test Dashboard Component
 * Shows current test status, results, and management options
 * Add this to an admin page or development environment
 */
export const ABTestDashboard = () => {
  const [activeTests, setActiveTests] = useState<ABTestConfig[]>([]);
  const [allTests] = useState<ABTestConfig[]>(AB_TESTS);

  useEffect(() => {
    setActiveTests(getActiveTests());
  }, []);

  const getTestStatus = (test: ABTestConfig) => {
    const now = new Date();
    
    if (!test.isActive) return { status: 'inactive', color: 'text-gray-500' };
    if (now < test.startDate) return { status: 'scheduled', color: 'text-blue-500' };
    if (test.endDate && now > test.endDate) return { status: 'ended', color: 'text-red-500' };
    return { status: 'running', color: 'text-green-500' };
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-orange-400">A/B Test Dashboard</h2>
      
      {/* Active Tests Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-400">Active Tests</h3>
          <p className="text-3xl font-bold">{activeTests.length}</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400">Total Tests</h3>
          <p className="text-3xl font-bold">{allTests.length}</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-400">Coverage</h3>
          <p className="text-3xl font-bold">
            {activeTests.reduce((sum, test) => sum + test.targetPercentage, 0) / activeTests.length || 0}%
          </p>
        </div>
      </div>

      {/* Test List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">All Tests</h3>
        
        {allTests.map((test) => {
          const { status, color } = getTestStatus(test);
          
          return (
            <div key={test.id} className="bg-gray-800 p-6 rounded-lg border-l-4 border-orange-400">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white">{test.name}</h4>
                  <p className="text-gray-300 text-sm">{test.description}</p>
                  <p className="text-xs text-gray-400 mt-1">ID: {test.id}</p>
                </div>
                
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-700 ${color}`}>
                    {status.toUpperCase()}
                  </span>
                  <p className="text-sm text-gray-400 mt-1">{test.targetPercentage}% of users</p>
                </div>
              </div>

              {/* Variants */}
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-400 mb-2">Variants:</h5>
                <div className="flex flex-wrap gap-2">
                  {test.variants.map((variant) => (
                    <span 
                      key={variant.id}
                      className="px-2 py-1 bg-gray-700 rounded text-xs"
                    >
                      {variant.name} ({variant.weight}%)
                    </span>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <span className="font-medium">Start:</span> {test.startDate.toLocaleDateString()}
                </div>
                {test.endDate && (
                  <div>
                    <span className="font-medium">End:</span> {test.endDate.toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Implementation Status */}
              <div className="mt-4 p-3 bg-gray-700 rounded text-sm">
                <p className="text-yellow-400 font-medium mb-1">Implementation:</p>
                <p className="text-gray-300">
                  {test.id === 'book_cta_buttons' && "✅ Implemented in BookCTATest component"}
                  {test.id === 'home_hero_layout' && "✅ Implemented in HomeHeroTest component"}
                  {test.id === 'lead_magnet_layout' && "✅ Implemented in LeadMagnetTest component"}
                  {test.id === 'book_page_layout' && "⏳ Ready to implement"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Implementation Guide */}
      <div className="mt-8 p-6 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-orange-400 mb-4">Quick Implementation Guide</h3>
        
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-white">1. Book CTA Buttons</h4>
            <code className="block mt-1 p-2 bg-gray-900 rounded text-green-400">
              {`import { BookCTATest } from '@/app/components/ABTestExamples/BookCTATest';`}
            </code>
            <code className="block mt-1 p-2 bg-gray-900 rounded text-green-400">
              {`<BookCTATest purchaseLink={book.purchaseLink} bookTitle={book.title} onPurchaseClick={handleClick} />`}
            </code>
          </div>

          <div>
            <h4 className="font-medium text-white">2. Home Hero Layout</h4>
            <code className="block mt-1 p-2 bg-gray-900 rounded text-green-400">
              {`import { HomeHeroTest } from '@/app/components/ABTestExamples/HomeHeroTest';`}
            </code>
            <code className="block mt-1 p-2 bg-gray-900 rounded text-green-400">
              {`<HomeHeroTest className="lg:grid lg:grid-cols-2" />`}
            </code>
          </div>

          <div>
            <h4 className="font-medium text-white">3. Lead Magnet Forms</h4>
            <code className="block mt-1 p-2 bg-gray-900 rounded text-green-400">
              {`import { LeadMagnetTest } from '@/app/components/ABTestExamples/LeadMagnetTest';`}
            </code>
            <code className="block mt-1 p-2 bg-gray-900 rounded text-green-400">
              {`<LeadMagnetTest bookTitle={book.title} leadMagnetId={book.leadMagnetId} />`}
            </code>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-900/30 rounded border border-blue-500/50">
          <p className="text-blue-200 text-sm">
            <strong>📊 Analytics:</strong> All tests automatically track to Google Analytics and Microsoft Clarity. 
            Check your dashboards for conversion data, heatmaps, and user recordings segmented by test variant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ABTestDashboard;