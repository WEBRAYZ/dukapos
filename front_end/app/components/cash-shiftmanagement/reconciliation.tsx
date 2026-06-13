'use client';

import React, { useState, useMemo } from 'react';

/**
 * Reconciliation Component
 * 
 * Facilitates the balancing of physical cash against expected system totals.
 * Features a detailed denomination breakdown and automatic variance calculation.
 */
const Reconciliation = () => {
  const [counts, setCounts] = useState({
    '200': 5,
    '100': 12,
    '50': 18,
    '20': 34,
    '10': 22,
    '5': 41,
    '2': 15,
    '1': 27,
    'pesewas': 0
  });

  const denominations = [
    { label: 'GHS 200', value: 200, key: '200' },
    { label: 'GHS 100', value: 100, key: '100' },
    { label: 'GHS 50', value: 50, key: '50' },
    { label: 'GHS 20', value: 20, key: '20' },
    { label: 'GHS 10', value: 10, key: '10' },
    { label: 'GHS 5', value: 5, key: '5' },
    { label: 'GHS 2', value: 2, key: '2' },
    { label: 'GHS 1', value: 1, key: '1' },
    { label: 'Pesewas', value: 0.01, key: 'pesewas' },
  ];

  const summary = {
    openingFloat: 850.00,
    totalReceived: 38570.00,
    totalExpenses: 285.00,
  };

  const expectedTotal = summary.openingFloat + summary.totalReceived - summary.totalExpenses;

  const countedTotal = useMemo(() => {
    return Object.entries(counts).reduce((acc, [key, count]) => {
      const denom = denominations.find(d => d.key === key);
      return acc + (count * (denom?.value || 0));
    }, 0);
  }, [counts]);

  const variance = countedTotal - expectedTotal;

  const handleCountChange = (key: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setCounts(prev => ({ ...prev, [key]: numValue }));
  };

  return (
    <div className="flex flex-col h-full space-y-8 overflow-y-auto custom-scrollbar">
      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Opening Float', value: `GHS ${summary.openingFloat.toFixed(2)}`, color: 'text-gray-800' },
          { label: 'Total Received', value: `GHS ${summary.totalReceived.toFixed(2)}`, color: 'text-green-600' },
          { label: 'Total Expenses', value: `GHS ${summary.totalExpenses.toFixed(2)}`, color: 'text-red-500' },
          { label: 'Expected in Drawer', value: `GHS ${expectedTotal.toFixed(2)}`, color: 'text-olive' },
        ].map((item) => (
          <div key={item.label} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
            <p className={`text-sm font-black ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Denomination Counter */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-[0.2em]">Denomination Count</h3>
            <button className="text-[9px] font-black text-olive uppercase tracking-widest hover:underline">Reset Counts</button>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {denominations.map((d) => (
              <div key={d.key} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-all">
                <span className="text-[10px] font-black text-gray-400 w-20 uppercase">{d.label}</span>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={counts[d.key as keyof typeof counts]}
                    onChange={(e) => handleCountChange(d.key, e.target.value)}
                    className="w-16 px-2 py-1 bg-gray-50 border border-gray-100 rounded text-center text-xs font-black focus:outline-none focus:ring-1 focus:ring-olive"
                  />
                  <span className="text-gray-300">=</span>
                  <span className="text-[10px] font-black text-gray-800 w-24 text-right">
                    GHS {(counts[d.key as keyof typeof counts] * d.value).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Calculation & Action */}
        <div className="w-full md:w-[320px] flex flex-col space-y-6">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Counted Total</p>
                <p className="text-3xl font-black text-gray-800">GHS {countedTotal.toFixed(2)}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Variance</p>
                  <p className={`text-lg font-black ${variance === 0 ? 'text-green-500' : 'text-red-500'}`}>
                    GHS {variance.toFixed(2)} {variance === 0 && <span className="ml-1 text-sm">✓</span>}
                  </p>
                </div>
              </div>
            </div>

            <button 
              className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-md active:scale-95 ${
                variance === 0 
                  ? 'bg-olive text-white shadow-green-100 hover:bg-olive' 
                  : 'bg-orange-500 text-white shadow-orange-100 hover:bg-orange-600'
              }`}
            >
              Submit Reconciliation
            </button>
          </div>

          <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
            <p className="text-[9px] font-bold text-yellow-800 uppercase tracking-tight leading-relaxed italic">
              * By submitting, you confirm that the physical cash in the drawer matches the counted total above. Any variance will be logged and reported to the system audit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reconciliation;
