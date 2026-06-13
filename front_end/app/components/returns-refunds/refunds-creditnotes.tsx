'use client';

import React from 'react';

/**
 * RefundsCreditNotes Component
 * 
 * Manages financial records for refunds and store credit notes.
 * Features a detailed ledger and summary metrics for financial oversight.
 */
const RefundsCreditNotes = ({ onManualRefund }: { onManualRefund?: () => void }) => {
  const stats = [
    { label: 'Total Refunded (MTD)', value: '$4,210', sub: '28 transactions', color: 'text-gray-800' },
    { label: 'Store Credits Issued', value: '$1,340', sub: '12 credit notes', color: 'text-olive' },
    { label: 'Card Refunds', value: '$2,870', sub: '16 transactions', color: 'text-yellow-600' },
    { label: 'Avg Refund Value', value: '$150.36', sub: 'This month', color: 'text-gray-500' },
  ];

  const refunds = [
    { id: 'REF-5501', returnRef: 'RET-2038', customer: 'Carlos Diaz', amount: '-$34.50', type: 'Store Credit', creditNote: 'CN-0088', date: '2026-05-30', status: 'Issued' },
    { id: 'REF-5499', returnRef: 'RET-2035', customer: 'Sophie Lang', amount: '-$120.00', type: 'Card Refund', creditNote: 'CN-0087', date: '2026-05-28', status: 'Issued' },
    { id: 'REF-5495', returnRef: 'RET-2031', customer: 'Mark Owens', amount: '-$68.75', type: 'Store Credit', creditNote: 'CN-0085', date: '2026-05-27', status: 'Pending' },
    { id: 'REF-5490', returnRef: 'RET-2028', customer: 'Nina Petrov', amount: '-$210.00', type: 'Card Refund', creditNote: 'CN-0084', date: '2026-05-26', status: 'Issued' },
  ];

  return (
    <div className="flex flex-col h-full space-y-8 p-4 overflow-y-auto custom-scrollbar">
      
      {/* SUMMARY STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-50 p-5 rounded-[24px] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* LEDGER SECTION */}
      <div className="flex-1 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">
            Credit Notes & Refund Ledger
          </h3>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center space-x-2">
              <span>↓</span>
              <span>Export CSV</span>
            </button>
            <button 
              onClick={onManualRefund}
              className="px-4 py-2 bg-orange-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-md active:scale-95"
            >
              + Manual Refund
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 sticky top-0 z-10">
              <tr className="border-b border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Refund ID</th>
                <th className="px-6 py-4">Return Ref</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Credit Note</th>
                <th className="px-6 py-4">Date Issued</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {refunds.map((ref) => (
                <tr key={ref.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-black text-gray-800 tracking-tighter">{ref.id}</td>
                  <td className="px-6 py-4 text-[10px] font-bold text-olive uppercase">{ref.returnRef}</td>
                  <td className="px-6 py-4 text-[10px] font-black text-gray-700 uppercase tracking-tight">{ref.customer}</td>
                  <td className="px-6 py-4 text-right text-xs font-black text-red-500">{ref.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      ref.type === 'Store Credit' ? 'bg-orange-50 text-orange-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {ref.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-gray-400 font-mono">{ref.creditNote}</td>
                  <td className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase">{ref.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-1.5 ${
                      ref.status === 'Issued' ? 'text-green-500' : 'text-orange-400 animate-pulse'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${ref.status === 'Issued' ? 'bg-green-500' : 'bg-orange-400'}`}></span>
                      <span>{ref.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-olive/5 p-6 rounded-[32px] border border-olive/10 text-center">
         <p className="text-[10px] font-bold text-olive uppercase tracking-widest">
           All credit notes are automatically synced with the Point of Sale and Accounting modules.
         </p>
      </div>
    </div>
  );
};

export default RefundsCreditNotes;
