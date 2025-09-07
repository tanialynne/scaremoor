"use client";

import { useState } from "react";
import ABTestDashboard from "../components/ABTestDashboard";
import { BookCTATest } from "../components/ABTestExamples/BookCTATest";
import { HomeHeroTest } from "../components/ABTestExamples/HomeHeroTest";
import { LeadMagnetTest } from "../components/ABTestExamples/LeadMagnetTest";
import { useABTest } from "../utils/abTesting";

const ABTestDemoPage = () => {
  const [showDashboard, setShowDashboard] = useState(true);
  
  // Get current test assignments
  const ctaTest = useABTest('book_cta_buttons');
  const heroTest = useABTest('home_hero_layout');
  const leadTest = useABTest('lead_magnet_layout');

  const handlePurchaseClick = () => {
    console.log('Purchase clicked!');
    alert('This would take you to Amazon (demo mode)');
  };

  const clearUserData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('scaremoor_user_id');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-orange-400 mb-4">A/B Test Demo Page</h1>
          <p className="text-gray-300 mb-6">
            This page shows your A/B testing system in action. Each time you refresh, 
            you might see different variants based on your user assignment.
          </p>
          
          {/* Controls */}
          <div className="flex gap-4 justify-center mb-6">
            <button 
              onClick={() => setShowDashboard(!showDashboard)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              {showDashboard ? 'Hide' : 'Show'} Dashboard
            </button>
            
            <button 
              onClick={clearUserData}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Reset User (See Different Variants)
            </button>
          </div>
          
          {/* Current Test Status */}
          <div className="bg-gray-800 p-4 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Your Current Test Assignments:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-700 p-3 rounded">
                <p className="font-semibold">Book CTA Test:</p>
                <p className="text-green-400">{ctaTest.variant}</p>
                <p className="text-gray-400">In test: {ctaTest.isInTest ? 'Yes' : 'No'}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="font-semibold">Hero Layout Test:</p>
                <p className="text-green-400">{heroTest.variant}</p>
                <p className="text-gray-400">In test: {heroTest.isInTest ? 'Yes' : 'No'}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="font-semibold">Lead Magnet Test:</p>
                <p className="text-green-400">{leadTest.variant}</p>
                <p className="text-gray-400">In test: {leadTest.isInTest ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        {showDashboard && (
          <div className="mb-12">
            <ABTestDashboard />
          </div>
        )}

        {/* Live Test Examples */}
        <div className="space-y-12">
          
          {/* Book CTA Test */}
          <section className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-400 mb-6">1. Book Purchase Button Test</h2>
            <p className="text-gray-300 mb-6">
              Testing different button text to see what drives more clicks. 
              Your variant: <span className="font-bold text-green-400">{ctaTest.variant}</span>
            </p>
            
            <div className="max-w-md">
              <BookCTATest
                purchaseLink="https://amazon.com/demo"
                bookTitle="The Haunted Locker"
                onPurchaseClick={handlePurchaseClick}
              />
            </div>
          </section>

          {/* Hero Layout Test */}
          <section className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-400 mb-6">2. Homepage Hero Layout Test</h2>
            <p className="text-gray-300 mb-6">
              Testing video vs book covers in hero section.
              Your variant: <span className="font-bold text-green-400">{heroTest.variant}</span>
            </p>
            
            <HomeHeroTest />
          </section>

          {/* Lead Magnet Test */}
          <section className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-orange-400 mb-6">3. Lead Magnet Form Test</h2>
            <p className="text-gray-300 mb-6">
              Testing different form copy and layouts.
              Your variant: <span className="font-bold text-green-400">{leadTest.variant}</span>
            </p>
            
            <LeadMagnetTest
              bookTitle="The Haunted Locker"
              leadMagnetId="demo_lead_magnet"
            />
          </section>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-900/30 p-6 rounded-lg border border-blue-500/50">
          <h3 className="text-xl font-bold text-blue-200 mb-4">How to See Different Variants:</h3>
          <div className="text-blue-100 space-y-2">
            <p><strong>1. Click "Reset User"</strong> - This clears your user ID and assigns you to a new test group</p>
            <p><strong>2. Refresh the page</strong> - You might see different button text, layouts, or form copy</p>
            <p><strong>3. Try multiple times</strong> - The system uses statistical distribution, so you'll see different variants</p>
            <p><strong>4. Check the dashboard</strong> - See which tests are active and their configuration</p>
          </div>
        </div>

        {/* Implementation Status */}
        <div className="mt-8 bg-yellow-900/30 p-6 rounded-lg border border-yellow-500/50">
          <h3 className="text-xl font-bold text-yellow-200 mb-4">🚀 Ready to Go Live:</h3>
          <div className="text-yellow-100 space-y-3">
            <p>To activate these tests on your real site, simply replace the existing components:</p>
            <div className="bg-gray-800 p-4 rounded mt-4 font-mono text-sm">
              <p className="text-green-400">// In your book pages, replace:</p>
              <p className="text-gray-300">{'<Button text="Get The Book" />'}</p>
              <p className="text-green-400">// With:</p>
              <p className="text-gray-300">{'<BookCTATest purchaseLink={book.purchaseLink} bookTitle={book.title} />'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ABTestDemoPage;