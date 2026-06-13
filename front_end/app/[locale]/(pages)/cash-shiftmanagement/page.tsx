'use client';

import React, { useState } from 'react';
import CashShiftNavbar from '@/app/components/cash-shiftmanagement/navbar';
import CashMovements from '@/app/components/cash-shiftmanagement/cash-movements';
import Reconciliation from '@/app/components/cash-shiftmanagement/reconciliation';
import CashierPerformance from '@/app/components/cash-shiftmanagement/cashier-performance';

const CashShiftManagementPage = () => {
  const [activeTab, setActiveTab] = useState('Shift Overview');

  const stats = [
    { label: "Today's Collections", value: 'KSh 385,700', sub: '↑ 12% vs yesterday', color: 'text-gray-800', subColor: 'text-green-600' },
    { label: 'Transactions', value: '103', sub: 'Across 3 cashiers', color: 'text-gray-800', subColor: 'text-gray-600' },
    { label: 'Active Shifts', value: '2', sub: 'Morn + Aft', color: 'text-blue-900', subColor: 'text-gray-600' },
    { label: 'Variance', value: '−KSh 50', sub: '1 cashier', color: 'text-red-500', subColor: 'text-red-600' },
    { label: 'Float Issued', value: 'KSh 25,500', sub: '3 drawers', color: 'text-orange-600', subColor: 'text-gray-600' },
  ];

  const cashiers = [
    {
      initials: 'AO',
      name: 'Amina Osei',
      shift: 'Morning Shift',
      status: 'Active',
      opened: '07:02',
      transactions: 34,
      collected: 'KSh 124,500',
      float: 'KSh 8,500',
      variance: 'KSh 0.00',
      closed: '—',
      action: 'Close Shift'
    },
    {
      initials: 'KA',
      name: 'Kwame Asante',
      shift: 'Afternoon Shift',
      status: 'Active',
      opened: '13:05',
      transactions: 21,
      collected: 'KSh 72,000',
      float: 'KSh 8,500',
      variance: '−KSh 50',
      closed: '—',
      action: 'Close Shift'
    },
    {
      initials: 'EM',
      name: 'Efua Mensah',
      shift: 'Morning Shift',
      status: 'Closed',
      opened: '07:00',
      transactions: 48,
      collected: 'KSh 189,200',
      float: 'KSh 8,500',
      variance: 'KSh 0.00',
      closed: '13:00',
      action: 'Shift Closed'
    },
    {
      initials: 'KB',
      name: 'Kofi Boateng',
      shift: 'Afternoon Shift',
      status: 'Idle',
      opened: '—',
      transactions: 0,
      collected: 'KSh 0.00',
      float: '—',
      variance: 'KSh 0.00',
      closed: '—',
      action: 'Open Shift'
    }
  ];

  const logEvents = [
    { time: '13:05', event: 'Shift opened', user: 'Kwame Asante', detail: 'Float: KSh 8,500 confirmed' },
    { time: '13:00', event: 'Shift closed', user: 'Efua Mensah', detail: 'Drawer balanced. Variance: KSh 0.00' },
    { time: '07:05', event: 'Shift opened', user: 'Amina Osei', detail: 'Float: KSh 8,500 confirmed' },
    { time: '07:00', event: 'Shift opened', user: 'Efua Mensah', detail: 'Float: KSh 8,500 confirmed' },
    { time: '06:48', event: 'System opened', user: 'System', detail: 'Daily float authorised by Bursar' },
  ];

  return (
    <div className="flex flex-col space-y-3">
      <CashShiftNavbar activeTab={activeTab} onTabChange={setActiveTab} slim={true} />
      
      <div className="flex-1 p-3 md:p-4 lg:p-10 pt-0 md:pt-0 lg:pt-0 space-y-3 md:space-y-4">
        
        {/* TOP COLLECTION STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-5 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center transition-all hover:shadow-xl cursor-default group">
              <p className="text-[10px] md:text-[10px] font-black text-slate-600 uppercase mb-1 group-hover:text-blue-900 transition-colors">{stat.label}</p>
              <p className={`text-xl md:text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className={`text-[10px] font-bold ${stat.subColor} uppercase mt-1.5`}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* MAIN DASHBOARD CONTENT */}
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          
          {/* CONTENT AREA */}
          <div className="flex-1 space-y-4">
            {activeTab === 'Cash Movements' ? (
              <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm p-4 md:p-5">
                 <CashMovements />
              </div>
            ) : activeTab === 'Reconciliation' ? (
              <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm p-4 md:p-5">
                 <Reconciliation />
              </div>
            ) : activeTab === 'Cashier Performance' ? (
              <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm p-4 md:p-5">
                 <CashierPerformance />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cashiers.map((cashier) => (
                  <div key={cashier.name} className="bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden hover:shadow-sm transition-all group">
                    {/* Card Header */}
                    <div className="p-3 pb-3 flex items-center justify-between border-b border-blue-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-900 rounded-sm flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:scale-110 transition-transform">
                          {cashier.initials}
                        </div>
                        <div>
                          <h3 className="text-sm font-black text-slate-800 uppercase line-clamp-1">{cashier.name}</h3>
                          <p className="text-[10px] font-bold text-slate-600 uppercase">{cashier.shift}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${
                        cashier.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 
                        cashier.status === 'Closed' ? 'bg-slate-100 text-slate-600 border-blue-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                      }`}>
                        {cashier.status}
                      </span>
                    </div>

                    {/* Card Body Metrics */}
                    <div className="p-3 grid grid-cols-2 gap-y-3 gap-x-3">
                      {[
                        { label: 'Opened', val: cashier.opened },
                        { label: 'Sales', val: cashier.transactions },
                        { label: 'Collected', val: cashier.collected, highlight: true },
                        { label: 'Float', val: cashier.float },
                        { label: 'Variance', val: cashier.variance, critical: cashier.variance.includes('−') },
                        { label: 'Closed', val: cashier.closed },
                      ].map((m) => (
                        <div key={m.label} className="flex flex-col space-y-1.5 border-b border-blue-50 pb-2">
                           <p className="text-[10px] font-black text-slate-700 uppercase">{m.label}</p>
                           <p className={`text-[11px] md:text-xs font-black uppercase ${m.highlight ? 'text-blue-900' : m.critical ? 'text-red-500' : 'text-slate-800'}`}>{m.val}</p>
                        </div>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="p-2 bg-slate-50/50 flex gap-3">
                      <button className="flex-1 py-3.5 bg-slate-200 border border-blue-100 rounded-sm text-[10px] font-black text-blue-700 uppercase hover:text-blue-900 transition-all shadow-sm">
                        Logs
                      </button>
                      <button className={`flex-2 py-3.5 rounded-sm text-[10px] font-black text-white uppercase shadow-lg transition-all active:scale-95 ${
                        cashier.action === 'Open Shift' ? 'bg-linear-to-l from-blue-800 to-blue-950 shadow-blue-200' : 
                        cashier.action === 'Close Shift' ? 'bg-linear-to-l from-blue-800 to-blue-950 shadow-blue-200' : 
                        'bg-slate-300 cursor-not-allowed shadow-none'
                      }`}>
                        {cashier.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: SHIFT LOG */}
          <div className="w-full lg:w-[400px] bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden shrink-0">
             <div className="p-4 border-b border-blue-50 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-sm font-black text-blue-900 uppercase">Operational Journal</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-black text-blue-500 uppercase">Live</span>
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                </div>
             </div>
             
             <div className="flex-1 max-h-[500px] lg:max-h-none overflow-y-auto p-3 space-y-3 custom-scrollbar relative no-scrollbar">
                {/* Vertical Line */}
                <div className="absolute left-[41px] top-10 bottom-10 w-px bg-slate-100"></div>
                
                {logEvents.map((log, index) => (
                  <div key={index} className="flex items-start space-x-4 relative group">
                    <div className="w-12 shrink-0 text-right">
                       <p className="text-[10px] font-black text-slate-600 tabular-nums uppercase">{log.time}</p>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-white border-2 border-blue-900 mt-0.5 relative z-10 shadow-sm group-hover:scale-125 transition-transform"></div>
                    <div className="flex-1">
                       <p className="text-[11px] font-black text-slate-800 uppercase">{log.event}</p>
                       <p className="text-[10px] font-bold text-blue-900 uppercase mt-1">{log.user}</p>
                       <p className="text-[10px] font-medium text-slate-700 mt-2 bg-slate-50 p-2 rounded-sm border border-blue-100 italic">{log.detail}</p>
                    </div>
                  </div>
                ))}
             </div>

             <div className="p-4 border-t border-blue-50">
                <button className="w-full py-5 bg-linear-to-l from-blue-800 to-blue-950 text-blue-100 rounded-sm text-[10px] font-black uppercase hover:bg-blue-900 hover:text-white transition-all shadow-sm active:scale-95 border border-blue-100">
                   Full Audit Trail →
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CashShiftManagementPage;
