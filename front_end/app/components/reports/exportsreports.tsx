'use client';

import React from 'react';

const ExportsReports = () => {
  const exportItems = [
    {
      title: 'Sales Report',
      description: 'Full transaction history with product details, cashier info, and payment methods.',
      icon: '📊',
      formats: ['Excel', 'CSV', 'PDF'],
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      title: 'Profit & Loss',
      description: 'P&L statement with revenue breakdown, COGS, expenses, and net income.',
      icon: '💰',
      formats: ['Excel', 'PDF'],
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Inventory Report',
      description: 'Stock levels, movement history, valuations, and low stock alerts.',
      icon: '📦',
      formats: ['Excel', 'CSV'],
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Tax Report',
      description: 'VAT/GST summary with taxable sales, exemptions, and liability by period.',
      icon: '🧾',
      formats: ['Excel', 'PDF'],
      color: 'bg-red-50 text-red-600',
    },
    {
      title: 'Cashier Report',
      description: 'Per-cashier performance, transaction counts, discounts, and shift summaries.',
      icon: '👤',
      formats: ['Excel', 'CSV'],
      color: 'bg-brown/10 text-brown',
    },
    {
      title: 'Financial Summary',
      description: 'Balance sheet, cash flow, and income statement for the selected period.',
      icon: '🏦',
      formats: ['Excel'],
      color: 'bg-olive/10 text-olive',
    },
  ];

  return (
    <div className="space-y-3 max-w-6xl mx-auto py-3">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-blue-800 uppercase">Export Reports</h2>
        <p className="text-sm font-bold text-gray-700 uppercase max-w-xl mx-auto">
          Download your data in multiple formats for accounting, analysis, or compliance.
        </p>
      </div>

      {/* Export Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {exportItems.map((item) => (
          <div key={item.title} className="bg-white p-4 rounded-sm border border-blue-100 shadow-xl flex flex-col group hover:shadow-2xl transition-all">
            <div className={`w-8 h-8 rounded-sm ${item.color} flex items-center justify-center text-xl mb-3 shadow-inner group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-bold text-blue-800 uppercase">{item.title}</h3>
              <p className="text-xs font-medium text-gray-700">
                {item.description}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.formats.map((format) => (
                <button 
                  key={format}
                  className="flex-1 min-w-[80px] bg-linear-to-l from-blue-800 to-blue-950 px-4 py-2.5 text-white text-[10px] font-medium uppercase transition-all border border-blue-100 flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span className="text-xs">⬇</span>
                  <span>{format}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-4 p-3 bg-linear-to-l from-blue-900 to-blue-800 rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center space-x-6">
          <div className="w-12 h-12 bg-white/10 rounded-sm flex items-center justify-center text-2xl">
            📅
          </div>
          <div>
            <p className="text-[10px] font-black text-orange-200 uppercase">Selected Export Period</p>
            <p className="text-lg font-black uppercase">May 1, 2026 – May 31, 2026</p>
          </div>
        </div>
        <button className="px-6 py-4 bg-linear-to-l from-blue-800 to-blue-950 border border-blue-900 rounded-sm text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-black/20">
          Export All Data (Full Backup)
        </button>
      </div>
    </div>
  );
};

export default ExportsReports;
