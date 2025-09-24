'use client';

import React, { useEffect, useState } from 'react';

const StripeTest: React.FC = () => {
  const [status, setStatus] = useState('Testing...');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  };

  useEffect(() => {
    const testStripe = async () => {
      try {
        addLog('Starting Stripe connectivity test...');

        // Test 1: Check if we can reach Stripe's CDN
        addLog('Testing CDN connectivity...');
        const response = await fetch('https://js.stripe.com/v3/', { method: 'HEAD' });
        addLog(`CDN response status: ${response.status}`);

        // Test 2: Load script
        addLog('Loading Stripe script...');
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.async = true;

        const scriptPromise = new Promise((resolve, reject) => {
          script.onload = () => {
            addLog('Script loaded successfully');
            resolve(undefined);
          };
          script.onerror = (error) => {
            addLog(`Script load error: ${error}`);
            reject(error);
          };
        });

        document.head.appendChild(script);
        await scriptPromise;

        // Test 3: Check window.Stripe
        addLog(`window.Stripe available: ${!!window.Stripe}`);
        if (window.Stripe) {
          addLog(`Stripe version: ${window.Stripe.version || 'unknown'}`);
        }

        // Test 4: Create instance
        if (window.Stripe) {
          addLog('Creating Stripe instance...');
          const stripe = window.Stripe('pk_test_51S8nvFBSbZr6EENuESEeYrstjaErpdsNzlaXKGQTbBvJpMZ3iOrmwBBFXnnfQi9XYNE4SbI65ZBCqNJ0TOu0Gpno00vrKanCZ7');
          addLog(`Stripe instance created: ${!!stripe}`);

          if (stripe) {
            addLog('Creating elements...');
            const elements = stripe.elements();
            addLog(`Elements created: ${!!elements}`);

            addLog('Creating card element...');
            const card = elements.create('card');
            addLog(`Card element created: ${!!card}`);
          }
        }

        setStatus('✅ All tests passed!');

      } catch (error) {
        addLog(`Error: ${error}`);
        setStatus(`❌ Test failed: ${error}`);
      }
    };

    testStripe();
  }, []);

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <h3 className="text-white text-lg font-bold mb-4">Stripe Connectivity Test</h3>
      <p className="text-white mb-4">{status}</p>
      <div className="bg-black p-4 rounded text-green-400 text-sm font-mono max-h-64 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default StripeTest;