'use client';

import React, { useState, useEffect } from 'react';

const StripeDebug: React.FC = () => {
  const [status, setStatus] = useState('Starting...');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log('[Stripe Debug]:', message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const debug = async () => {
      try {
        addLog('Checking CSP headers...');

        addLog('Testing script loading...');
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.async = true;

        const loadPromise = new Promise((resolve, reject) => {
          script.onload = () => {
            addLog('✅ Script loaded successfully');
            resolve(undefined);
          };
          script.onerror = (error) => {
            addLog(`❌ Script failed to load: ${error}`);
            reject(error);
          };
          setTimeout(() => {
            reject(new Error('Timeout'));
          }, 5000);
        });

        document.head.appendChild(script);
        await loadPromise;

        // Wait for Stripe to be available
        await new Promise(resolve => setTimeout(resolve, 500));

        addLog(`window.Stripe available: ${!!window.Stripe}`);

        if (window.Stripe) {
          addLog('✅ Stripe is ready!');
          setStatus('✅ Stripe loaded successfully');
        } else {
          addLog('❌ Stripe not available');
          setStatus('❌ Stripe failed to load');
        }

      } catch (error) {
        addLog(`❌ Error: ${error}`);
        setStatus(`❌ Failed: ${error}`);
      }
    };

    debug();
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-lg mb-4">
      <h4 className="text-white font-bold mb-2">Stripe Debug</h4>
      <p className="text-sm text-gray-300 mb-2">{status}</p>
      <div className="bg-black p-2 rounded text-xs text-green-400 max-h-32 overflow-y-auto">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default StripeDebug;