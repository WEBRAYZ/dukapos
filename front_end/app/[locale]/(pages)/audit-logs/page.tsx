'use client';

import React, { useState } from 'react';
import AuditLogsNavbar from '@/app/components/audit-logs/navbar';
import UserActivities from '@/app/components/audit-logs/user-activities';
import SecurityEvents from '@/app/components/audit-logs/security-events';
import ApiAccess from '@/app/components/audit-logs/api-access';

const AuditLogsPage = () => {
  const [activeTab, setActiveTab] = useState('System Logs');
  const [isSensitiveOnly, setIsSensitiveOnly] = useState(false);

  const stats = [
    { label: 'Total Events', value: '20', sub: 'Today', color: 'text-slate-800' },
    { label: 'Sensitive Ops', value: '7', sub: 'Require review', color: 'text-red-500' },
    { label: 'Active Users', value: '4', sub: 'Sessions open', color: 'text-blue-900' },
    { label: 'Top Action', value: 'UPDATE', sub: '4 events', color: 'text-green-500' },
  ];

  const activity24h = [
    { action: 'UPDATE', count: 4, color: 'bg-green-500' },
    { action: 'DELETE', count: 2, color: 'bg-red-500' },
    { action: 'REFUND', count: 2, color: 'bg-green-500' },
    { action: 'OVERRIDE', count: 2, color: 'bg-blue-900' },
  ];

  const logs = [
    { id: 'EVT-9901', timestamp: '2026-06-01 16:42:11', user: 'admin@store.io', action: 'DELETE', module: 'Inventory', description: 'Deleted SKU ELC-2201 (Wireless Headphones)', ip: '192.168.1.4', flag: '⚠ SENS', icon: '✕', iconColor: 'text-red-500' },
    { id: 'EVT-9900', timestamp: '2026-06-01 16:38:05', user: 'maya.r@store.io', action: 'REFUND', module: 'Returns', description: 'Issued refund KSh 14,999 for RET-2040', ip: '192.168.1.12', flag: '', icon: '💰', iconColor: 'text-orange-500' },
    { id: 'EVT-9899', timestamp: '2026-06-01 16:31:44', user: 'james.k@store.io', action: 'UPDATE', module: 'Sales', description: 'Modified order ORD-8812 — applied 15% discount', ip: '192.168.1.9', flag: '', icon: '✎', iconColor: 'text-yellow-500' },
    { id: 'EVT-9898', timestamp: '2026-06-01 16:22:00', user: 'admin@store.io', action: 'OVERRIDE', module: 'Cash', description: 'Override: manually adjusted drawer balance +KSh 20,000', ip: '192.168.1.4', flag: '⚠ SENS', icon: '!', iconColor: 'text-blue-900' },
    { id: 'EVT-9897', timestamp: '2026-06-01 16:18:33', user: 'system', action: 'BACKUP', module: 'Backup', description: 'Scheduled incremental backup BK-0090 completed', ip: 'internal', flag: '', icon: '⬡', iconColor: 'text-green-500' },
    { id: 'EVT-9896', timestamp: '2026-06-01 16:10:02', user: 'lucia.v@store.io', action: 'LOGIN', module: 'Auth', description: 'User login — session started (Chrome, macOS)', ip: '10.0.0.55', flag: '', icon: '→', iconColor: 'text-gray-400' },
    { id: 'EVT-9895', timestamp: '2026-06-01 15:58:49', user: 'admin@store.io', action: 'EXPORT', module: 'Backup', description: 'Exported full backup archive (encrypted, 2.4 GB)', ip: '192.168.1.4', flag: '⚠ SENS', icon: '↑', iconColor: 'text-blue-400' },
    { id: 'EVT-9894', timestamp: '2026-06-01 15:44:21', user: 'maya.r@store.io', action: 'CREATE', module: 'Inventory', description: 'Added new product: Trail Runner X2 (SKU SPT-1104)', ip: '192.168.1.12', flag: '', icon: '＋', iconColor: 'text-green-600' },
    { id: 'EVT-9893', timestamp: '2026-06-01 15:30:07', user: 'james.k@store.io', action: 'UPDATE', module: 'Users', description: 'Changed role for lucia.v@store.io: Staff → Manager', ip: '192.168.1.9', flag: '', icon: '✎', iconColor: 'text-yellow-500' },
    { id: 'EVT-9892', timestamp: '2026-06-01 15:11:55', user: 'admin@store.io', action: 'RESTORE', module: 'Backup', description: 'Restore initiated from BK-0088 → staging env', ip: '192.168.1.4', flag: '⚠ SENS', icon: '↺', iconColor: 'text-yellow-600' },
  ];

  return (
    <div className="flex flex-col space-y-3">
      <AuditLogsNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 p-3 md:p-3 lg:p-3 pt-0 md:pt-0 lg:pt-0 space-y-3 md:space-y-5">
        
        {activeTab === 'User Activities' ? (
          <UserActivities />
        ) : activeTab === 'Security Events' ? (
          <SecurityEvents />
        ) : activeTab === 'API Access' ? (
          <ApiAccess />
        ) : (
          <div className="space-y-3">
            {/* SUMMARY STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-3 md:p-4 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center transition-all hover:shadow-xl cursor-default group">
                  <p className="text-[10px] md:text-[10px] font-black text-slate-600 uppercase mb-1 group-hover:text-blue-900 transition-colors">{stat.label}</p>
                  <p className={`text-xl md:text-2xl font-black ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-800 uppercase mt-1.5">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-3">
              {/* CONTROL & FILTER BAR */}
              <div className="bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm space-y-3">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="flex flex-col text-center sm:text-left">
                      <span className="text-[9px] font-black text-slate-600 uppercase">Filtered Events</span>
                      <span className="text-xl font-black text-slate-800">20 <span className="text-slate-600 font-bold text-sm">of 20 total</span></span>
                    </div>
                    <div className="hidden sm:block h-10 w-px bg-slate-100" />
                    <div className="flex flex-col items-center sm:items-start">
                      <span className="text-[9px] font-black text-slate-600 uppercase">Global Activity (24h)</span>
                      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-2 mt-2">
                        {activity24h.map(act => (
                          <span key={act.action} className="text-[9px] font-black text-slate-600 uppercase flex items-center bg-slate-100 px-2 py-0.5 rounded-sm border border-blue-100">
                            <span className={`w-1.5 h-1.5 ${act.color} rounded-full mr-1.5`} />
                            {act.action}: {act.count}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
                    <button 
                      onClick={() => setIsSensitiveOnly(!isSensitiveOnly)}
                      className={`flex items-center space-x-3 px-6 py-3.5 rounded-sm border transition-all active:scale-95 ${
                        isSensitiveOnly 
                          ? 'bg-red-50 border-red-100 text-red-600 shadow-xs shadow-red-100' 
                          : 'bg-white border-blue-100 text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      <span className="text-xs">⚠️</span>
                      <span className="text-[10px] font-black uppercase">Flagged Only {isSensitiveOnly ? 'ON' : 'OFF'}</span>
                    </button>
                    <button className="bg-linear-to-l from-blue-800 to-blue-950 text-white px-8 py-3.5 rounded-sm text-[10px] font-black uppercase hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                      Export Log
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 border-t border-blue-50 pt-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] font-black text-slate-600 uppercase ml-1">Identity Filter</label>
                    <select className="bg-slate-100 border border-slate-200 rounded-sm px-4 py-3 text-[10px] font-black uppercase text-slate-700 focus:bg-white focus:ring-1 focus:ring-blue-900 outline-none cursor-pointer">
                      <option>All System Users</option>
                      <option>admin@store.io</option>
                      <option>maya.r@store.io</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-1">Functional Module</label>
                    <select className="bg-slate-100 border border-slate-200 rounded-sm px-4 py-3 text-[10px] font-black uppercase text-slate-700 focus:bg-white focus:ring-1 focus:ring-blue-900 outline-none cursor-pointer">
                      <option>All System Modules</option>
                      <option>Inventory</option>
                      <option>Sales</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] font-black text-slate-600 uppercase ml-1">Behavioral Type</label>
                    <select className="bg-slate-100 border border-blue-200 rounded-sm px-4 py-3 text-[10px] font-black uppercase text-slate-700 focus:bg-white focus:ring-1 focus:ring-blue-900 outline-none cursor-pointer">
                      <option>All Interaction Types</option>
                      <option>UPDATE</option>
                      <option>DELETE</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-[9px] font-black text-slate-600 uppercase ml-1">Universal Search</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Event ID, User, Hash…" 
                        className="w-full bg-slate-100 border border-blue-200 rounded-sm pl-4 pr-10 py-3 text-[10px] font-black uppercase text-slate-700 focus:bg-white focus:ring-1 focus:ring-blue-900 outline-none placeholder:text-slate-300 transition-all"
                      />
                      <span className="absolute right-4 top-3 text-xs grayscale opacity-40">🔍</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIVITY TIMELINE TABLE */}
              <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
                <div className="px-3 md:px-3 py-3 border-b border-blue-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-[10px] font-black text-blue-900 uppercase">Transaction Ledger</span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase">— 20 events</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-[10px] font-black text-slate-600 uppercase hover:text-blue-900 disabled:opacity-30 transition-colors" disabled>Prev</button>
                    <span className="text-[10px] font-black text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 shadow-sm">Page 1 / 2</span>
                    <button className="text-[10px] font-black text-slate-600 uppercase hover:text-blue-900 transition-colors">Next</button>
                  </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar no-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50">
                        <th className="px-3 md:px-4 py-3 text-[10px] font-black text-blue-800 uppercase whitespace-nowrap">Timestamp</th>
                        <th className="px-3 md:px-4 py-3 text-[10px] font-black text-blue-800 uppercase whitespace-nowrap">Identity</th>
                        <th className="px-3 md:px-4 py-3 text-[10px] font-black text-blue-800 uppercase whitespace-nowrap">Interaction</th>
                        <th className="px-3 md:px-4 py-3 text-[10px] font-black text-blue-800 uppercase hidden lg:table-cell">Functional Layer</th>
                        <th className="px-3 md:px-4 py-3 text-[10px] font-black text-blue-800 uppercase">Details</th>
                        <th className="px-3 md:px-4 py-3 text-[10px] font-black text-blue-800 uppercase text-center whitespace-nowrap">Risk Flag</th>
                        <th className="px-3 md:px-4 py-3 text-[10px] font-black text-blue-800 uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {logs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/30 transition-colors group cursor-default">
                          <td className="px-3 md:px-4 py-3">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black text-slate-800 tabular-nums whitespace-nowrap">{log.timestamp.split(' ')[1]}</span>
                              <span className="text-[11px] font-bold text-slate-600 uppercase whitespace-nowrap">{log.timestamp.split(' ')[0]}</span>
                            </div>
                          </td>
                          <td className="px-3 md:px-4 py-3">
                            <span className="text-[11px] font-black text-blue-900 whitespace-nowrap uppercase">{log.user.split('@')[0]}</span>
                          </td>
                          <td className="px-3 md:px-4 py-3">
                            <div className="flex items-center space-x-2.5">
                              <span className={`text-xs ${log.iconColor} group-hover:scale-125 transition-transform`}>{log.icon}</span>
                              <span className="text-[11px] font-black uppercase text-slate-800">{log.action}</span>
                            </div>
                          </td>
                          <td className="px-3 md:px-4 py-3 hidden lg:table-cell">
                            <span className="text-[11px] font-black px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase">{log.module}</span>
                          </td>
                          <td className="px-3 md:px-4 py-3">
                            <p className="text-[11px] font-bold text-slate-600 line-clamp-1 max-w-xs">{log.description}</p>
                          </td>
                          <td className="px-3 md:px-4 py-3">
                            <div className="flex justify-center">
                              {log.flag ? (
                                <span className="text-[11px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-full uppercase border border-red-100">{log.flag}</span>
                              ) : (
                                <span className="text-[11px] font-black text-slate-500 uppercase">Clean</span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 md:px-4 py-3 text-right">
                            <button className="text-[10px] font-black text-blue-900 uppercase hover:underline active:scale-95 transition-all">Inspect</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-3 md:p-4 bg-slate-50/50 border-t border-blue-50 text-center">
                  <p className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase">
                    Immutable Operation Ledger · Proof of Stake Verified · Secure Storage Layer
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogsPage;
