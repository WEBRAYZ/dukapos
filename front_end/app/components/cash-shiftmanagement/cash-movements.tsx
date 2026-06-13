'use client';

import React, { useState } from 'react';

/**
 * CashMovements Component
 * 
 * Displays a detailed log of all cash movements including collections,
 * expenses, and float adjustments.
 */
const CashMovements = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const movements = [
    { time: '14:32', type: 'collection', icon: '↑', description: 'School fees — Ama Boateng (Gr. 8)', cashier: 'Amina Osei', method: 'Cash', amount: '+GHS 1,200.00', ref: 'TXN-9042' },
    { time: '14:28', type: 'float_out', icon: '↓', description: 'Float withdrawal — change shortage', cashier: 'Kwame Asante', method: 'Internal', amount: '-GHS 200.00', ref: 'FLT-1023' },
    { time: '14:15', type: 'collection', icon: '↑', description: 'Canteen levy — Class 4B (12 students)', cashier: 'Kwame Asante', method: 'Cash', amount: '+GHS 360.00', ref: 'TXN-9041' },
    { time: '13:58', type: 'collection', icon: '↑', description: 'Exam fee — Kofi Mensah (Gr. 11)', cashier: 'Amina Osei', method: 'MoMo', amount: '+GHS 450.00', ref: 'TXN-9040' },
    { time: '13:44', type: 'expense', icon: '↓', description: 'Stationery purchase — Office', cashier: 'Amina Osei', method: 'Cash', amount: '-GHS 85.00', ref: 'EXP-312' },
    { time: '13:30', type: 'collection', icon: '↑', description: 'School fees — Esi Agyemang (Gr. 5)', cashier: 'Efua Mensah', method: 'Cash', amount: '+GHS 1,800.00', ref: 'TXN-9039' },
    { time: '12:45', type: 'float_in', icon: '↑', description: 'Float replenishment — drawer top-up', cashier: 'Efua Mensah', method: 'Internal', amount: '+GHS 500.00', ref: 'FLT-1022' },
    { time: '12:10', type: 'collection', icon: '↑', description: 'Bus fee — Q3 2024 — Ato Brew (Gr. 6)', cashier: 'Efua Mensah', method: 'Cheque', amount: '+GHS 600.00', ref: 'TXN-9038' },
  ];

  const filters = ['All', 'Collections', 'Expenses', 'Float In', 'Float Out'];

  const getFilteredMovements = () => {
    if (activeFilter === 'All') return movements;
    if (activeFilter === 'Collections') return movements.filter(m => m.type === 'collection');
    if (activeFilter === 'Expenses') return movements.filter(m => m.type === 'expense');
    if (activeFilter === 'Float In') return movements.filter(m => m.type === 'float_in');
    if (activeFilter === 'Float Out') return movements.filter(m => m.type === 'float_out');
    return movements;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Sub-Filters */}
      <div className="flex items-center space-x-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
              activeFilter === f 
                ? 'bg-olive text-white shadow-md' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <th className="px-4 py-4">Time</th>
              <th className="px-2 py-4 text-center">Type</th>
              <th className="px-4 py-4">Description</th>
              <th className="px-4 py-4">Cashier</th>
              <th className="px-4 py-4">Method</th>
              <th className="px-4 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-right">Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {getFilteredMovements().map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-4 py-4 text-[10px] font-black text-gray-400 tabular-nums">
                  {item.time}
                </td>
                <td className="px-2 py-4 text-center">
                  <span className={`text-sm font-black ${item.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {item.icon}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{item.description}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-[10px] font-bold text-olive uppercase tracking-widest">{item.cashier}</p>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[9px] font-black px-2 py-1 bg-gray-100 text-gray-500 rounded uppercase">
                    {item.method}
                  </span>
                </td>
                <td className={`px-4 py-4 text-right text-[11px] font-black ${item.amount.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                  {item.amount}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-[10px] font-bold text-gray-400 font-mono">{item.ref}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashMovements;
