'use client';

import React from 'react';

/**
 * CashierPerformance Component
 * 
 * Tracks individual cashier productivity, collection totals, and accuracy.
 */
const CashierPerformance = () => {
  const performanceData = [
    { name: 'Efua Mensah', transactions: 48, collected: 'GHS 18,920.00', variance: 0, status: 'Closed' },
    { name: 'Amina Osei', transactions: 34, collected: 'GHS 12,450.00', variance: 0, status: 'Active' },
    { name: 'Kwame Asante', transactions: 21, collected: 'GHS 7,200.00', variance: -5.00, status: 'Active' },
    { name: 'Kofi Boateng', transactions: 0, collected: 'GHS 0.00', variance: 0, status: 'Idle' },
  ];

  const summary = {
    totalCollected: 'GHS 38,570.00',
    totalTransactions: 103,
    activeCashiers: '2 / 4',
    totalVariance: '−GHS 5.00',
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
          Today's Cashier Performance
        </h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Ranked by collection volume
        </span>
      </div>

      {/* Performance List */}
      <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
        {performanceData.map((cashier, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between hover:shadow-md transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-olive font-black text-xs shadow-inner group-hover:bg-olive group-hover:text-white transition-all">
                {index + 1}
              </div>
              <div>
                <p className="text-xs font-black text-gray-800 uppercase tracking-tight">{cashier.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {cashier.transactions} transactions
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-right">
                <p className="text-xs font-black text-olive">{cashier.collected}</p>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">Total Collected</p>
              </div>
              
              <div className="w-24 text-center">
                {cashier.variance === 0 ? (
                  <span className="text-green-500 text-lg font-black leading-none">✓</span>
                ) : (
                  <span className="text-[10px] font-black text-red-500 uppercase">
                    {cashier.variance < 0 ? `−GHS ${Math.abs(cashier.variance).toFixed(2)}` : `+GHS ${cashier.variance.toFixed(2)}`}
                  </span>
                )}
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-tighter">Variance</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary Footer */}
      <div className="bg-olive rounded-[24px] p-6 shadow-xl relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          <div>
            <p className="text-[9px] font-black text-gray-900/60 uppercase tracking-widest mb-1">Total Collected Today</p>
            <p className="text-xl font-black text-white">{summary.totalCollected}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-900/60 uppercase tracking-widest mb-1">Total Transactions</p>
            <p className="text-xl font-black text-white">{summary.totalTransactions}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-900/60 uppercase tracking-widest mb-1">Active Cashiers</p>
            <p className="text-xl font-black text-white">{summary.activeCashiers}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-900/60 uppercase tracking-widest mb-1">Total Variance</p>
            <p className="text-xl font-black text-red-300">{summary.totalVariance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierPerformance;
