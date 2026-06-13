'use client';

import React from 'react';

/**
 * FailedSubmissions Component
 * 
 * Displays eTIMS invoices that failed to submit to KRA.
 */
const FailedSubmissions = () => {
  const failedInvoices = [
    {
      id: 'INV-2024-0839',
      customer: 'Njoroge & Sons Supplies',
      pin: 'P050011122C',
      amount: 'KES 78,900',
      vat: 'KES 12,624',
      error: 'Submission failed — not reported to KRA',
    },
    {
      id: 'INV-2024-CR02',
      customer: 'Njoroge & Sons Supplies',
      pin: 'P050011122C',
      amount: 'KES 9,800',
      vat: 'KES 1,568',
      error: 'Submission failed — not reported to KRA',
    },
  ];

  return (
    <div className="flex flex-col space-y-4">
      {/* Warning Header */}
      <div className="bg-red-50 border border-red-100 p-4 rounded-sm flex items-start space-x-4">
        <div className="w-10 h-10 bg-red-100 rounded-sm flex items-center justify-center text-red-600 shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-black text-red-900 uppercase tracking-tight">
            Critical: 2 Invoices failed to reach KRA eTIMS servers.
          </p>
          <p className="text-[10px] font-bold text-red-700/70 uppercase tracking-widest mt-1">
            Manual intervention required to prevent compliance penalties.
          </p>
        </div>
      </div>

      {/* Failed Items List */}
      <div className="space-y-3">
        {failedInvoices.map((inv) => (
          <div key={inv.id} className="bg-white border border-gray-100 rounded-sm p-4 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Side: Invoice Info */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-50 rounded-sm flex items-center justify-center text-red-400 text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  📄
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-gray-800">{inv.id}</span>
                    <span className="text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase">Failed</span>
                  </div>
                  <h4 className="text-sm font-black text-olive uppercase tracking-tight mt-1">{inv.customer}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">PIN: {inv.pin}</p>
                </div>
              </div>

              {/* Middle: Financials */}
              <div className="flex flex-col md:items-end justify-center">
                <p className="text-lg font-black text-gray-800">{inv.amount}</p>
                <p className="text-[10px] font-bold text-orange-600 uppercase">VAT: {inv.vat}</p>
              </div>

              {/* Right Side: Actions & Error */}
              <div className="flex flex-col space-y-3 min-w-[200px]">
                <div className="flex items-center space-x-2 text-red-600">
                  <span className="text-sm">⚠</span>
                  <p className="text-[10px] font-black uppercase tracking-tighter">{inv.error}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md shadow-red-100 transition-all active:scale-95">
                    Retry Now
                  </button>
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-500 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200 transition-all">
                    Manual Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="text-center p-4">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
          Failed attempts are logged in the system audit trail
        </p>
      </div>
    </div>
  );
};

export default FailedSubmissions;
