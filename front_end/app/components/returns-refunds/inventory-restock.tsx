'use client';

import React from 'react';

/**
 * InventoryRestock Component
 * 
 * Tracks the return of products to inventory or their disposal.
 * Features a restock tracker ledger and summary metrics for warehouse operations.
 */
const InventoryRestock = () => {
  const stats = [
    { label: 'Items Awaiting Restock', value: '2', sub: 'From approved returns', color: 'text-orange-500' },
    { label: 'Restocked Today', value: '2', sub: 'Back in sellable inventory', color: 'text-green-600' },
    { label: 'Defective / Write-off', value: '1', sub: 'Needs inspection', color: 'text-red-500' },
    { label: 'Restock Progress', value: '50%', sub: 'This batch', color: 'text-olive' },
  ];

  const restockItems = [
    { item: 'Running Shoes (UK 9)', sku: 'SHO-4421', ref: 'RET-2040', condition: 'Resellable', location: '—', status: 'Pending', action: 'Mark Restocked' },
    { item: 'Wireless Headphones', sku: 'ELC-2201', ref: 'RET-2039', condition: 'Defective', location: '—', status: 'Pending', action: 'Write Off' },
    { item: 'Yoga Mat + Blocks', sku: 'SPT-0982', ref: 'RET-2038', condition: 'Resellable', location: 'Shelf B-12', status: 'Restocked', action: 'Undo' },
    { item: 'USB-C Hub (7-in-1)', sku: 'ELC-3310', ref: 'RET-2033', condition: 'Resellable', location: 'Shelf A-03', status: 'Restocked', action: 'Undo' },
  ];

  return (
    <div className="flex flex-col h-full space-y-8 p-4 overflow-y-auto custom-scrollbar">
      
      {/* SUMMARY STATS & PROGRESS */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-50 p-5 rounded-[24px] border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* PROGRESS CARD */}
        <div className="w-full md:w-64 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-3 shrink-0">
           <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                 <circle cx="40" cy="40" r="34" className="stroke-gray-100 fill-none" strokeWidth="8" />
                 <circle cx="40" cy="40" r="34" className="stroke-olive fill-none" strokeWidth="8" strokeDasharray="213.6" strokeDashoffset="106.8" strokeLinecap="round" />
              </svg>
              <span className="absolute text-sm font-black text-gray-800">50%</span>
           </div>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Restock Completion</p>
        </div>
      </div>

      {/* TRACKER LEDGER */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
            Returned Items — Restock Tracker
          </h3>
          <button className="px-4 py-2 bg-gray-100 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center space-x-2">
            <span>↓</span>
            <span>Export</span>
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 sticky top-0 z-10">
              <tr className="border-b border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Return Ref</th>
                <th className="px-6 py-4 text-center">Condition</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-center">Restocked</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {restockItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-xs font-black text-gray-800 uppercase tracking-tight">{item.item}</p>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-gray-400 font-mono">{item.sku}</td>
                  <td className="px-6 py-4 text-[10px] font-black text-olive uppercase">{item.ref}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      item.condition === 'Resellable' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {item.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">{item.location}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-1.5 ${
                      item.status === 'Restocked' ? 'text-green-500' : 'text-orange-400 animate-pulse'
                    }`}>
                      {item.status === 'Restocked' && <span>✓</span>}
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 ${
                      item.action === 'Mark Restocked' ? 'bg-olive text-white hover:bg-olive' :
                      item.action === 'Write Off' ? 'bg-red-500 text-white hover:bg-red-600' :
                      'bg-gray-50 text-gray-400 hover:bg-gray-100'
                    }`}>
                      {item.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default InventoryRestock;
