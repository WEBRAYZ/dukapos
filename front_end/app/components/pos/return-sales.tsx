'use client';

import React, { useState } from 'react';

const ReturnSales = () => {
  const [receiptId, setReceiptId] = useState('');
  const [refundMethod, setRefundMethod] = useState('original');

  return (
    <div className="flex bg-slate-100 flex-col lg:flex-row gap-3 h-full overflow-hidden">
      {/* Left Column: Lookup and Original Sale */}
      <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
        {/* Lookup Box */}
        <div className="bg-slate-50 p-3 rounded-sm border border-blue-200 shadow-sm shrink-0">
          <h3 className="text-md font-black text-blue-900 uppercase flex items-center">
            <span className="mr-2">🔍</span>
            Find Original Sale
          </h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[10px] font-black text-gray-700 uppercase">Enter Receipt ID</label>
              <input
                type="text"
                value={receiptId}
                onChange={(e) => setReceiptId(e.target.value)}
                placeholder="e.g. TXN-4818"
                className="w-full px-4 py-3 bg-slate-100 border border-blue-100 rounded-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-olive transition-all font-bold text-sm"
              />
            </div>
            <button className="self-end px-8 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-xs uppercase hover:bg-olive transition-all shadow-lg shadow-green-900/10">
              Look Up
            </button>
          </div>
        </div>

        {/* Placeholder for Sale Details */}
        <div className="flex-1 bg-white rounded-sm border border-dashed border-blue-200 flex flex-col items-center justify-center text-gray-700 space-y-4">
          <div className="text-6xl opacity-50">🧾</div>
          <p className="text-xs font-black uppercase">Enter a receipt ID to load sale details</p>
        </div>
      </div>

      {/* Right Column: Return Summary */}
      <div className="w-[400px] bg-white rounded-sm border border-blue-200 shadow-sm flex flex-col shrink-0">
        <div className="p-4 border-b border-blue-50">
          <h3 className="text-sm font-black text-olive uppercase">
            Return Summary
          </h3>
        </div>

        <div className="flex-1 p-3 flex flex-col items-center justify-center text-center space-y-2">
          <div className="p-3 px-5.5 bg-blue-50 rounded-full text-4xl">↩</div>
          <div className="space-y-1">
            <p className="text-2xl font-black text-blue-800 uppercase">KSh 0</p>
            <p className="text-[10px] font-bold text-gray-700 uppercase">Refund Amount</p>
          </div>
          <p className="text-xs font-medium text-gray-700 max-w-[200px]">
            Select items from the original sale to calculate the refund amount
          </p>
        </div>

        <div className="p-4 border-t border-blue-50 bg-gray-50/50 rounded-b-3xl space-y-3">
          {/* Refund Method Selection */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-gray-700 uppercase">Refund Method</p>
            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => setRefundMethod('original')}
                className={`flex items-center space-x-4 p-3 rounded-sm border transition-all ${
                  refundMethod === 'original' 
                    ? 'bg-slate-100 border-olive shadow-md ring-1 ring-olive' 
                    : 'bg-slate-100 border-blue-100 hover:border-blue-200'
                }`}
              >
                <span className="text-2xl">📱</span>
                <div className="text-left">
                  <p className="text-[10px] font-black text-gray-800 uppercase">Original Method (M-Pesa)</p>
                  <p className="text-[9px] font-bold text-gray-600 uppercase">Refund to same source</p>
                </div>
              </button>
              
              <button 
                onClick={() => setRefundMethod('cash')}
                className={`flex items-center space-x-4 p-3 rounded-sm border transition-all ${
                  refundMethod === 'cash' 
                    ? 'bg-slate-100 border-olive shadow-md ring-1 ring-olive' 
                    : 'bg-slate-100 border-blue-100 hover:border-blue-200'
                }`}
              >
                <span className="text-2xl">💵</span>
                <div className="text-left">
                  <p className="text-[10px] font-black text-gray-800 uppercase">Cash Refund</p>
                  <p className="text-[9px] font-bold text-gray-600 uppercase">Hand over cash to customer</p>
                </div>
              </button>

              <button 
                onClick={() => setRefundMethod('credit')}
                className={`flex items-center space-x-4 p-3 rounded-sm border transition-all ${
                  refundMethod === 'credit' 
                    ? 'bg-slate-100 border-olive shadow-md ring-1 ring-olive' 
                    : 'bg-slate-100 border-blue-100 hover:border-blue-200'
                }`}
              >
                <span className="text-2xl">📋</span>
                <div className="text-left">
                  <p className="text-[10px] font-black text-gray-800 uppercase">Store Credit</p>
                  <p className="text-[9px] font-bold text-gray-600 uppercase">Add to customer balance</p>
                </div>
              </button>
            </div>
          </div>

          <button className="w-full py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-xs uppercase shadow-lg shadow-orange-900/20 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center">
            <span className="mr-2 text-lg">↩</span>
            Process Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnSales;
