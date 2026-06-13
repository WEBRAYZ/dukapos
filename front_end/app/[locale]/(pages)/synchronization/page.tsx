'use client';

import React, { useState } from 'react';
import SynchronizationNavbar from '@/app/components/synchronization/navbar';
import SynchronizationConflicts from '@/app/components/synchronization/conflicts';
import NetworkLog from '@/app/components/synchronization/networklog';

const SynchronizationPage = () => {
  const [activeLogFilter, setActiveLogFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('Transaction Queue');

  const transactions = [
    { id: 'TXN-9841', type: 'Invoice', icon: '▤', entity: 'Kamau Electronics', size: '12 KB', retries: 0, status: 'Pending', time: '2m ago', action: 'Force' },
    { id: 'TXN-9840', type: 'Inventory', icon: '⊞', entity: 'Stock Adjustment #44', size: '4 KB', retries: 1, status: 'Pending', time: '5m ago', action: 'Force' },
    { id: 'TXN-9839', type: 'Customer', icon: '◎', entity: 'Amina Hassan', size: '2 KB', retries: 0, status: 'Syncing', time: '6m ago', action: null },
    { id: 'TXN-9838', type: 'Payment', icon: '◈', entity: 'M-Pesa #78234', size: '1 KB', retries: 3, status: 'Failed', time: '12m ago', action: 'Retry' },
    { id: 'TXN-9837', type: 'Invoice', icon: '▤', entity: 'Njoroge Supplies', size: '8 KB', retries: 0, status: 'Synced', time: '18m ago', action: null },
    { id: 'TXN-9836', type: 'Inventory', icon: '⊞', entity: 'Stock Count #43', size: '6 KB', retries: 0, status: 'Synced', time: '23m ago', action: null },
    { id: 'TXN-9835', type: 'Customer', icon: '◎', entity: 'Joseph Waweru', size: '2 KB', retries: 2, status: 'Failed', time: '31m ago', action: 'Retry' },
    { id: 'TXN-9834', type: 'Invoice', icon: '▤', entity: 'Fatuma Traders', size: '9 KB', retries: 0, status: 'Synced', time: '45m ago', action: null },
    { id: 'TXN-9833', type: 'Payment', icon: '◈', entity: 'Card #••4421', size: '1 KB', retries: 0, status: 'Synced', time: '52m ago', action: null },
    { id: 'TXN-9832', type: 'Inventory', icon: '⊞', entity: 'Return #88', size: '3 KB', retries: 1, status: 'Pending', time: '1h ago', action: 'Force' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-orange-600';
      case 'Syncing': return 'text-blue-600';
      case 'Failed': return 'text-red-600';
      case 'Synced': return 'text-green-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <SynchronizationNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 p-3 md:p-3 lg:p-4 pt-0 md:pt-0 lg:pt-0 space-y-3 md:space-y-3">
        
        {/* TOP STATUS BAR */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch">
          {/* Network & Sync Info */}
          <div className="flex-1 bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex items-center justify-between group">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-sm shadow-blue-200"></span>
                <span className="text-sm md:text-base font-black uppercase text-gray-800">Edge Gateway Online</span>
              </div>
              <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase">Active handshake — 48ms latency</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-600 uppercase">Global Heartbeat</p>
              <p className="text-lg md:text-xl font-black text-blue-900 group-hover:scale-110 transition-transform">2m ago</p>
            </div>
          </div>

          {/* Local Storage Stats */}
          <div className="flex-[1.5] bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-4">
              <div>
                <p className="text-[10px] font-black text-gray-600 uppercase">Cache Capacity</p>
                <p className="text-xl md:text-xl font-black text-gray-800">68 MB <span className="text-gray-600 font-bold text-base">/ 100 MB</span></p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <p className="text-[9px] font-black text-blue-500 uppercase">Queued</p>
                  <p className="text-sm font-black text-gray-800">42 MB</p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[9px] font-black text-green-600 uppercase">Synced</p>
                  <p className="text-sm font-black text-gray-800">26 MB</p>
                </div>
              </div>
            </div>
            <div className="h-2 bg-gray-50 rounded-full overflow-hidden flex border border-blue-100">
              <div className="h-full bg-blue-400 shadow-lg shadow-blue-100 transition-all duration-1000" style={{ width: '42%' }}></div>
              <div className="h-full bg-blue-900 shadow-lg shadow-blue-100 transition-all duration-1000" style={{ width: '26%' }}></div>
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4">
          {[
            { label: 'Pending', count: 3, sub: 'Buffer queue', color: 'border-orange-100 bg-orange-50', text: 'text-orange-600' },
            { label: 'Failed', count: 2, sub: 'Conflict zone', color: 'border-red-100 bg-red-50', text: 'text-red-600' },
            { label: 'Synced', count: 4, sub: 'Session total', color: 'border-green-100 bg-green-50', text: 'text-green-600' },
            { label: 'Conflicts', count: 2, sub: 'Root issues', color: 'border-blue-100 bg-blue-50', text: 'text-blue-900' },
          ].map((card) => (
            <div key={card.label} className={`p-3 md:p-3 rounded-sm border ${card.color} shadow-sm transition-all hover:shadow-xl cursor-default group`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-[9px] md:text-[10px] font-black text-gray-600 uppercase group-hover:text-blue-900 transition-colors">{card.label}</p>
                  <p className={`text-2xl md:text-3xl font-black ${card.text}`}>{card.count}</p>
                </div>
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${card.text} ${card.color} shadow-sm`}>LIVE</span>
              </div>
              <p className="text-[9px] font-bold text-gray-600 uppercase">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* TRANSACTION QUEUE SECTION */}
        <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
          {/* CONTROL BAR */}
          <div className="p-3 md:p-3 border-b border-blue-50 space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex bg-white p-1 gap-4 rounded-sm overflow-x-auto no-scrollbar">
                {['all', 'pending', 'syncing', 'failed', 'synced'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveLogFilter(f)}
                    className={`px-5 py-2 rounded-full text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                      activeLogFilter === f 
                        ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-lg shadow-blue-900/20' 
                        : 'bg-slate-200 text-blue-900 hover:text-gray-600'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex-1 lg:flex-none px-6 py-3 bg-red-50 text-red-600 rounded-sm font-black text-[10px] uppercase hover:bg-red-100 transition-all active:scale-95 border border-red-100">
                  Retry All Failures
                </button>
                <button className="flex-1 lg:flex-none px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[10px] uppercase hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                  Clear Session Cache
                </button>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto custom-scrollbar no-scrollbar">
            {activeTab === 'Conflicts' ? (
              <div className="p-3 md:p-3"><SynchronizationConflicts /></div>
            ) : activeTab === 'Network Log' ? (
              <div className="p-3 md:p-3"><NetworkLog /></div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-3 md:px-3 py-3 text-[10px] font-black text-blue-800 uppercase whitespace-nowrap">Transaction ID</th>
                    <th className="px-2 py-3 text-[10px] font-black text-blue-800 uppercase text-center">Type</th>
                    <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase whitespace-nowrap">Entity Signature</th>
                    <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Payload</th>
                    <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Retry</th>
                    <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Status</th>
                    <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-right">Age</th>
                    <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions
                    .filter(t => activeLogFilter === 'all' || t.status.toLowerCase() === activeLogFilter)
                    .map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50/30 transition-colors group cursor-default">
                      <td className="px-3 md:px-3 py-3">
                        <span className="text-xs font-black text-blue-900 uppercase whitespace-nowrap">{txn.id}</span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-sm grayscale group-hover:grayscale-0 transition-all">{txn.icon}</span>
                          <span className="text-[10px] font-black text-gray-600 uppercase hidden sm:inline">{txn.type}</span>
                        </div>
                      </td>
                      <td className="px-3 md:px-3 py-3">
                        <span className="text-[11px] font-black text-gray-800 uppercase">{txn.entity}</span>
                      </td>
                      <td className="px-3 md:px-3 py-3 text-center">
                        <span className="text-[10px] font-bold text-gray-600 uppercase">{txn.size}</span>
                      </td>
                      <td className="px-3 md:px-3 py-3 text-center">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${txn.retries > 0 ? 'bg-red-50 text-red-600' : 'text-gray-400'}`}>{txn.retries}</span>
                      </td>
                      <td className="px-3 md:px-3 py-3">
                        <div className="flex justify-center">
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg border bg-gray-50 ${getStatusColor(txn.status).replace('text-', 'border-').replace('600', '100')}`}>
                            {txn.status === 'Syncing' && <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></span>}
                            <span className={`text-[10px] font-black uppercase ${getStatusColor(txn.status)}`}>
                              {txn.status}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 md:px-3 py-3 text-right">
                        <span className="text-[10px] font-bold text-gray-600 uppercase whitespace-nowrap">{txn.time}</span>
                      </td>
                      <td className="px-3 md:px-3 py-3 text-right">
                        {txn.action ? (
                          <button className={`px-5 py-1.5 rounded-sm text-[10px] font-black uppercase transition-all active:scale-95 shadow-sm ${
                            txn.action === 'Retry' 
                              ? 'bg-red-500 text-white hover:bg-red-600' 
                              : 'bg-linear-to-l from-blue-800 to-blue-950 text-white hover:bg-blue-800'
                          }`}>
                            {txn.action}
                          </button>
                        ) : (
                          <div className="flex justify-end pr-4">
                            <span className="text-[11px] text-gray-500">•••</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="p-4 md:p-4 bg-gray-50/50 border-t border-blue-50 text-center">
            <p className="text-[9px] md:text-[10px] font-black text-gray-700 uppercase">
              Continuous Integrity Sync active · End-to-end encryption enforced · Decentralized state validation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynchronizationPage;
