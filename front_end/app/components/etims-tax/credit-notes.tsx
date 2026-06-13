'use client';

import React from 'react';

/**
 * CreditNotes Component
 * 
 * Displays and manages eTIMS tax credit notes.
 */
const CreditNotes = () => {
  const creditNotes = [
    {
      id: 'INV-2024-CR03',
      status: 'Submitted',
      customer: 'Kamau Electronics Ltd',
      pin: 'P051234567A',
      time: '1h ago',
      amount: 'KES 18,000',
      vatRefund: 'KES 2,880',
      cuSerial: 'KRA2024CU0087',
    },
    {
      id: 'INV-2024-CR02',
      status: 'Failed',
      customer: 'Njoroge & Sons Supplies',
      pin: 'P050011122C',
      time: '3h ago',
      amount: 'KES 9,800',
      vatRefund: 'KES 1,568',
      cuSerial: null,
    },
  ];

  return (
    <div className="flex flex-col space-y-4">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-black text-gray-800 uppercase">
          Active Credit Notes
        </h3>
        <button className="bg-blue-950 hover:bg-olive text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center space-x-2">
          <span className="text-lg leading-none">+</span>
          <span>New Credit Note</span>
        </button>
      </div>

      {/* Credit Notes List */}
      <div className="space-y-4">
        {creditNotes.map((note) => (
          <div key={note.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            {/* Left Status Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${note.status === 'Submitted' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Side: Note Info */}
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                  ↩
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-gray-800 tracking-tighter">{note.id}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                      note.status === 'Submitted' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {note.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-olive uppercase tracking-tight mt-1">{note.customer}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <span>PIN: {note.pin}</span>
                    <span className="mx-2 text-gray-200">·</span>
                    <span>{note.time}</span>
                  </p>
                </div>
              </div>

              {/* Middle: Financials */}
              <div className="flex flex-col md:items-end justify-center">
                <p className="text-lg font-black text-gray-800 tracking-tight">({note.amount})</p>
                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">VAT refund: {note.vatRefund}</p>
              </div>

              {/* Right Side: Compliance Data */}
              <div className="flex flex-col md:items-end justify-center space-y-1">
                {note.cuSerial ? (
                  <>
                    <p className="text-[9px] font-black text-gray-600 uppercase">KRA Fiscal ID</p>
                    <p className="text-[10px] font-black text-gray-700 font-mono">{note.cuSerial}</p>
                  </>
                ) : (
                  <button className="bg-red-500 text-white px-4 py-1.5 rounded-sm text-[10px] font-black uppercase hover:bg-red-600 transition-all shadow-sm">
                    Retry Submission
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="bg-blue-50/50 border border-blue-100/50 p-3 rounded-sm flex items-center space-x-3">
        <span className="text-lg">ℹ️</span>
        <p className="text-[10px] font-bold text-blue-800 uppercase tracking-tight">
          Credit notes must be linked to a valid original invoice and reported to KRA within 14 days.
        </p>
      </div>
    </div>
  );
};

export default CreditNotes;
