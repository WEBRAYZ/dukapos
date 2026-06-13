'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
          {/* Subtle background element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>

          <div className="max-w-md w-full relative z-10 text-center">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-100 mb-8">
                <span className="text-4xl">🛠️</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Critical System Error</h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                The application encountered a critical error and could not recover.
              </p>
              {error.digest && (
                <div className="p-3 bg-gray-50 rounded-md text-xs font-mono text-gray-400 break-all mb-4">
                  Error ID: {error.digest}
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => reset()}
                className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-black text-white font-medium transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                Attempt Recovery
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                Reload Application
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
