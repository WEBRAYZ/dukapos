'use client';

import React, { useState } from 'react';
import ETIMSTaxNavbar from '@/app/components/etims-tax/navbar';
import FailedSubmissions from '@/app/components/etims-tax/failed-submissions';
import CreditNotes from '@/app/components/etims-tax/credit-notes';

const ETIMSTaxPage = () => {
  const [activeTab, setActiveTab] = useState('Invoice Register');
  const [activeFilter, setActiveFilter] = useState('all');

  const invoices = [
    { id: 'INV-2024-0841', type: 'SALE', customer: 'Kamau Electronics Ltd', pin: 'P051234567A', amount: 'KES 148,500', vat: 'KES 23,760', cuSerial: 'KRA2024CU0091', sig: '✓', status: 'Submitted', time: '2m ago', action: null },
    { id: 'INV-2024-0840', type: 'SALE', customer: 'Amina Hassan Traders', pin: 'P051987654B', amount: 'KES 34,200', vat: 'KES 5,472', cuSerial: '—', sig: '—', status: 'Pending', time: '8m ago', action: 'Submit' },
    { id: 'INV-2024-0839', type: 'SALE', customer: 'Njoroge & Sons Supplies', pin: 'P050011122C', amount: 'KES 78,900', vat: 'KES 12,624', cuSerial: '—', sig: '—', status: 'Failed', time: '14m ago', action: 'Retry' },
    { id: 'INV-2024-0838', type: 'SALE', customer: 'Fatuma General Store', pin: 'P052233445D', amount: 'KES 12,600', vat: 'KES 2,016', cuSerial: 'KRA2024CU0089', sig: '✓', status: 'Submitted', time: '31m ago', action: null },
    { id: 'INV-2024-0837', type: 'SALE', customer: 'Joseph Waweru & Co.', pin: 'P050099887E', amount: 'KES 56,000', vat: 'KES 8,960', cuSerial: 'KRA2024CU0088', sig: '✓', status: 'Submitted', time: '45m ago', action: null },
    { id: 'INV-2024-CR03', type: 'CREDIT', customer: 'Kamau Electronics Ltd', pin: 'P051234567A', amount: 'KES 18,000', vat: 'KES 2,880', cuSerial: 'KRA2024CU0087', sig: '✓', status: 'Submitted', time: '1h ago', action: null },
    { id: 'INV-2024-0836', type: 'SALE', customer: 'Rehema Wanjiku Stores', pin: 'P053344556F', amount: 'KES 94,500', vat: 'KES 15,120', cuSerial: '—', sig: '—', status: 'Queued', time: '1h ago', action: null },
    { id: 'INV-2024-0835', type: 'SALE', customer: 'David Ochieng Ltd', pin: 'P054455667G', amount: 'KES 22,300', vat: 'KES 3,568', cuSerial: 'KRA2024CU0086', sig: '✓', status: 'Submitted', time: '2h ago', action: null },
    { id: 'INV-2024-CR02', type: 'CREDIT', customer: 'Njoroge & Sons Supplies', pin: 'P050011122C', amount: 'KES 9,800', vat: 'KES 1,568', cuSerial: '—', sig: '—', status: 'Failed', time: '3h ago', action: 'Retry' },
    { id: 'INV-2024-0834', type: 'SALE', customer: 'Mary Akinyi Holdings', pin: 'P055566778H', amount: 'KES 31,500', vat: 'KES 5,040', cuSerial: 'KRA2024CU0085', sig: '✓', status: 'Submitted', time: '4h ago', action: null },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <ETIMSTaxNavbar activeTab={activeTab} onTabChange={setActiveTab} slim={true} />
      
      <div className="flex-1 p-4 md:p-6 lg:p-10 pt-0 md:pt-0 lg:pt-0 space-y-6 md:space-y-8">
        
        {/* COMPLIANCE & SUMMARY HEADER */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Compliance Rate Card */}
          <div className="flex-1 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-xl relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-3 relative z-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Global Compliance</p>
                <p className="text-4xl md:text-5xl font-black text-red-500 tracking-tighter">60%</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="px-4 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase border border-red-100 shadow-sm w-fit">Incomplete Status</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">6 of 10 events submitted</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 shadow-inner">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-200"></span>
                <p className="text-[9px] font-black text-blue-900 uppercase tracking-widest">Fiscal Session active</p>
              </div>
            </div>
            {/* Visual Decoration */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 md:w-40 md:h-40 border-[20px] border-blue-50 rounded-full flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform duration-1000">
               <div className="w-20 h-20 md:w-28 md:h-28 border-[15px] border-blue-900 rounded-full border-t-transparent -rotate-45"></div>
            </div>
          </div>

          {/* Counts Grid */}
          <div className="flex-[2] grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Submitted', count: 6, sub: 'KRA eTIMS', color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Queued', count: 2, sub: 'Local buffer', color: 'text-orange-500', bg: 'bg-orange-50' },
              { label: 'Failed', count: 2, sub: 'Attention', color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'VAT Paid', count: '40.5K', sub: 'KES Total', color: 'text-blue-900', bg: 'bg-blue-50' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-center group hover:shadow-xl transition-all cursor-default">
                <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-blue-900 transition-colors">{stat.label}</p>
                <p className={`text-xl md:text-2xl font-black ${stat.color} tracking-tight`}>{stat.count}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* STATUS DETAILS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-2xl">
          {[
            { label: 'Fiscal Layer', value: 'Authorized', color: 'text-green-600' },
            { label: 'CU Unit', value: 'KRA-CU-001', color: 'text-gray-800' },
            { label: 'Reporting Period', value: 'June 2026', color: 'text-gray-800' },
            { label: 'Last Handshake', value: '2m ago', color: 'text-blue-900' },
            { label: 'Daily Ledger', value: '10 Entries', color: 'text-gray-800' },
            { label: 'Session Gross', value: 'KES 478,500', color: 'text-gray-800' },
          ].map((item) => (
            <div key={item.label} className="space-y-1.5 border-l-2 border-gray-50 pl-4 first:border-l-0 first:pl-0">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
              <p className={`text-[11px] font-black uppercase tracking-tight ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* INVOICE REGISTER SECTION */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-2xl flex flex-col overflow-hidden">
          {/* CONTROL BAR */}
          <div className="p-6 md:p-8 border-b border-gray-50 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 overflow-x-auto no-scrollbar">
                {['all', 'submitted', 'pending', 'failed', 'queued'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeFilter === f 
                        ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' 
                        : 'bg-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex-1 lg:flex-none px-6 py-3 bg-red-50 text-red-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all active:scale-95 border border-red-100">
                  Retry All Failures
                </button>
                <button className="flex-1 lg:flex-none px-6 py-3 bg-blue-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                  Force Sync Now
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto custom-scrollbar no-scrollbar">
            {activeTab === 'Failed Submissions (2)' ? (
              <div className="p-6"><FailedSubmissions /></div>
            ) : activeTab === 'Credit Notes' ? (
              <div className="p-6"><CreditNotes /></div>
            ) : (
              <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 md:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Internal ID</th>
                  <th className="px-2 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Type</th>
                  <th className="px-6 md:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Entity / PIN</th>
                  <th className="px-6 md:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Gross Amount</th>
                  <th className="px-6 md:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Tax (VAT)</th>
                  <th className="px-6 md:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">CU Serial</th>
                  <th className="px-4 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Sig</th>
                  <th className="px-6 md:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 md:px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices
                  .filter(inv => activeFilter === 'all' || inv.status.toLowerCase() === activeFilter)
                  .map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/30 transition-colors group cursor-default">
                    <td className="px-6 md:px-8 py-5">
                      <span className="text-xs font-black text-blue-900 uppercase tracking-tighter whitespace-nowrap">{inv.id}</span>
                    </td>
                    <td className="px-2 py-5 text-center">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter ${inv.type === 'CREDIT' ? 'bg-orange-50 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                        {inv.type}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <div className="flex flex-col max-w-[200px]">
                        <span className="text-[11px] font-black text-gray-800 uppercase tracking-tight line-clamp-1">{inv.customer}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{inv.pin}</span>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-5 text-right">
                      <span className="text-[11px] font-black text-gray-800 whitespace-nowrap">{inv.amount}</span>
                    </td>
                    <td className="px-6 md:px-8 py-5 text-right">
                      <span className="text-[11px] font-black text-blue-900 whitespace-nowrap">{inv.vat}</span>
                    </td>
                    <td className="px-6 md:px-8 py-5 hidden lg:table-cell">
                      <span className="text-[10px] font-bold text-gray-400 font-mono tracking-tighter uppercase whitespace-nowrap">{inv.cuSerial}</span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`text-xs font-black ${inv.sig === '✓' ? 'text-green-500' : 'text-gray-300'}`}>{inv.sig}</span>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <div className="flex justify-center">
                        <div className="flex items-center space-x-2 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                          <span className={`w-1.5 h-1.5 rounded-full ${inv.status === 'Submitted' ? 'bg-green-500 shadow-lg shadow-green-200' : inv.status === 'Failed' ? 'bg-red-500' : 'bg-blue-500 animate-pulse'}`}></span>
                          <span className={`text-[9px] font-black uppercase tracking-widest ${
                            inv.status === 'Submitted' ? 'text-green-700' : 
                            inv.status === 'Failed' ? 'text-red-700' : 'text-blue-900'
                          }`}>
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-5 text-right">
                      {inv.action ? (
                        <button className={`px-5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm ${
                          inv.action === 'Retry' 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-blue-900 text-white hover:bg-blue-800'
                        }`}>
                          {inv.action}
                        </button>
                      ) : (
                        <div className="flex justify-end">
                          <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center border border-green-100 shadow-sm">
                            <span className="text-green-600 text-[10px]">✓</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
              )}
              </div>
          <div className="p-6 md:p-8 bg-gray-50/50 border-t border-gray-50 text-center">
            <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
              Global Compliance Registry · Fiscal session SHA-256 authenticated · Distributed ledger verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETIMSTaxPage;
