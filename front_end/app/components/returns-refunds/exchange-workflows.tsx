'use client';

import React from 'react';

/**
 * ExchangeWorkflows Component
 * 
 * Provides a guided interface for processing product exchanges.
 * Includes steps for original item selection, replacement selection, and payment reconciliation.
 */
const ExchangeWorkflows = ({ onGoToQueue }: { onGoToQueue: () => void }) => {
  const workflowSteps = [
    { n: 1, title: 'Original Item', sub: 'Verified & Approved', status: 'completed' },
    { n: 2, title: 'Replacement', sub: 'Select new product', status: 'active' },
    { n: 3, title: 'Difference', sub: 'Reconcile payment', status: 'pending' },
  ];

  return (
    <div className="flex flex-col h-full space-y-8 p-4">
      {/* Informational Header */}
      <div className="bg-orange-50 border border-orange-100 p-8 rounded-[40px] flex items-center justify-between group">
        <div className="flex items-start space-x-6">
          <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white text-3xl shadow-lg shadow-orange-100 group-hover:rotate-12 transition-transform">
            🔄
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Exchange Workflow</h3>
            <p className="text-sm font-bold text-gray-500 mt-1 max-w-md leading-relaxed">
              Start an exchange from the <span className="text-olive">Returns Queue</span> tab by clicking "Exchange" on any approved return.
            </p>
          </div>
        </div>
        <button 
          onClick={onGoToQueue}
          className="bg-white border-2 border-orange-200 text-orange-600 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-sm active:scale-95 flex items-center space-x-2"
        >
          <span>Go to Returns Queue</span>
          <span className="text-lg leading-none">→</span>
        </button>
      </div>

      {/* Guided Workflow UI (Empty State Placeholder) */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-12 opacity-40 grayscale pointer-events-none">
        
        {/* Step Indicator */}
        <div className="flex items-center space-x-12">
          {workflowSteps.map((step) => (
            <div key={step.n} className="flex flex-col items-center space-y-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm border-4 ${
                step.status === 'completed' ? 'bg-green-500 border-green-100 text-white' :
                step.status === 'active' ? 'bg-olive border-green-50 text-white' :
                'bg-gray-100 border-gray-50 text-gray-300'
              }`}>
                {step.status === 'completed' ? '✓' : step.n}
              </div>
              <div className="text-center">
                <p className={`text-[10px] font-black uppercase tracking-widest ${step.status === 'active' ? 'text-olive' : 'text-gray-400'}`}>
                  {step.title}
                </p>
                <p className="text-[8px] font-bold text-gray-300 uppercase mt-0.5">{step.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Artwork / Text */}
        <div className="text-center space-y-4 max-w-sm">
           <div className="text-6xl mb-4">📦</div>
           <h4 className="text-sm font-black text-gray-800 uppercase tracking-[0.2em]">No Active Exchange</h4>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-relaxed">
             Select an item from the queue to begin the step-by-step reconciliation process.
           </p>
        </div>
      </div>

      {/* Footer Pro Tip */}
      <div className="bg-olive/5 p-6 rounded-[32px] border border-olive/10 flex items-center space-x-4">
         <span className="text-xl">💡</span>
         <p className="text-[10px] font-bold text-olive uppercase tracking-tight">
           Pro Tip: If the replacement item is more expensive, the system will automatically generate a pending payment request at checkout.
         </p>
      </div>
    </div>
  );
};

export default ExchangeWorkflows;
