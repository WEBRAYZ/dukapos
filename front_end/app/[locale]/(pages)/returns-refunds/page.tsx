'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ReturnsRefundsNavbar from '@/app/components/returns-refunds/navbar';
import ExchangeWorkflows from '@/app/components/returns-refunds/exchange-workflows';
import RefundsCreditNotes from '@/app/components/returns-refunds/refunds-creditnotes';
import InventoryRestock from '@/app/components/returns-refunds/inventory-restock';
import NewReturnModal from '@/app/components/returns-refunds/new-return-modal';
import ManualRefundModal from '@/app/components/returns-refunds/manual-refund-modal';
import { api } from '@/lib/api';

interface Return {
  id: number;
  customer_name: string;
  first_item_name: string;
  item_count: number;
  reason: string;
  refund_amount: string;
  status: string;
  timestamp: string;
}

const ReturnsRefundsPage = () => {
  const [activeTab, setActiveTab] = useState('Returns Queue');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManualRefundModalOpen, setIsManualRefundModalOpen] = useState(false);
  const [returns, setReturns] = useState<Return[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const data = await api.get<Return[]>('/returns/');
      setReturns(data);
    } catch (err) {
      console.error('Failed to fetch returns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  const stats = useMemo(() => {
    const total = returns.length;
    const pending = returns.filter(r => r.status === 'PENDING').length;
    const totalRefunded = returns.filter(r => r.status === 'COMPLETED').reduce((acc, r) => acc + parseFloat(r.refund_amount), 0);
    
    return [
      { label: 'Open Returns', value: total.toString(), sub: `↑${total} total`, color: 'text-gray-800', subColor: 'text-green-500' },
      { label: 'Pending Approval', value: pending.toString(), sub: 'Needs review', color: 'text-orange-500', subColor: 'text-orange-400' },
      { label: 'Refund Value', value: `KSh ${totalRefunded.toLocaleString()}`, sub: `${returns.length} total requests`, color: 'text-gray-800', subColor: 'text-gray-400' },
      { label: 'Completion', value: `${total > 0 ? Math.round((returns.filter(r => r.status === 'COMPLETED').length / total) * 100) : 0}%`, sub: 'Success Rate', color: 'text-blue-900', subColor: 'text-gray-400' },
    ];
  }, [returns]);

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
      case 'APPROVED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'PENDING':
      case 'PROCESSING':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredReturns = returns.filter(r => {
    if (activeFilter === 'All') return true;
    return r.status.toUpperCase() === activeFilter.toUpperCase();
  });

  return (
    <div className="flex flex-col h-full bg-blue-50 overflow-hidden">
      <ReturnsRefundsNavbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onNewReturn={() => setIsModalOpen(true)}
      />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
          
          {/* SUMMARY STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-5 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center transition-all hover:shadow-md cursor-default group relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${stat.label === 'Pending Approval' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-hover:text-blue-900 transition-colors">{stat.label}</p>
                <p className={`text-xl font-black text-blue-900`}>{stat.value}</p>
                <p className={`text-[9px] font-bold ${stat.subColor} uppercase mt-1`}>{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
            {activeTab === 'Exchange Workflow' ? (
              <div className="p-4 md:p-6"><ExchangeWorkflows onGoToQueue={() => setActiveTab('Returns Queue')} /></div>
            ) : activeTab === 'Refunds & Credit Notes' ? (
              <div className="p-4 md:p-6"><RefundsCreditNotes onManualRefund={() => setIsManualRefundModalOpen(true)} /></div>
            ) : activeTab === 'Inventory Restock' ? (
              <div className="p-4 md:p-6"><InventoryRestock /></div>
            ) : (
              <>
                {/* CONTROL BAR */}
                <div className="p-5 border-b border-blue-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/50">
                  <div className="flex bg-white p-1 rounded-sm border border-blue-100 overflow-x-auto no-scrollbar shadow-sm">
                    {['All', 'Pending', 'Approved', 'Processing', 'Completed'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-5 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                          activeFilter === f 
                            ? 'bg-blue-900 text-white shadow-md' 
                            : 'bg-transparent text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex-1 lg:flex-none px-6 py-2.5 bg-white border border-blue-100 text-slate-500 hover:text-slate-800 rounded-sm font-black text-[10px] uppercase tracking-widest transition-all shadow-sm">
                      Export
                    </button>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 lg:flex-none px-6 py-2.5 bg-blue-900 text-white rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
                    >
                      + New Return
                    </button>
                  </div>
                </div>

                {/* TABLE CONTAINER */}
                <div className="overflow-x-auto custom-scrollbar no-scrollbar">
                  {loading ? (
                      <div className="p-20 text-center font-black uppercase text-blue-900 animate-pulse">Loading returns queue...</div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/30 border-b border-blue-50">
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest whitespace-nowrap">Return ID</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest whitespace-nowrap">Customer</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest hidden sm:table-cell">Product</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest hidden md:table-cell">Reason</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-right">Net Amount</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-center">Status</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredReturns.map((ret) => (
                          <tr key={ret.id} className="hover:bg-blue-50/30 transition-colors group cursor-default">
                            <td className="px-6 py-4 text-xs font-black text-blue-900 uppercase whitespace-nowrap">RET-{ret.id.toString().padStart(4, '0')}</td>
                            <td className="px-6 py-4 text-xs font-black text-slate-800 uppercase whitespace-nowrap">{ret.customer_name}</td>
                            <td className="px-6 py-4 hidden sm:table-cell">
                              <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight line-clamp-1">{ret.first_item_name}</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Items: {ret.item_count}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{ret.reason}</td>
                            <td className="px-6 py-4 text-right text-xs font-black text-slate-800 whitespace-nowrap">KSh {parseFloat(ret.refund_amount).toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <div className="flex justify-center">
                                <span className={`px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(ret.status)}`}>
                                  {ret.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {(ret.status.toUpperCase() === 'PENDING' || ret.status.toUpperCase() === 'APPROVED') ? (
                                <div className="flex justify-end space-x-2">
                                   <button className="px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-100 rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all active:scale-95">
                                     Refund
                                   </button>
                                   <button className="px-3 py-1.5 bg-blue-900 text-white rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all active:scale-95 shadow-md">
                                     Exchange
                                   </button>
                                </div>
                              ) : (
                                <div className="flex justify-end">
                                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${
                                    ret.status.toUpperCase() === 'COMPLETED' ? 'text-green-500' : 'text-red-400'
                                  }`}>
                                    {ret.status.toUpperCase() === 'COMPLETED' ? 'Processed' : 'Archived'}
                                  </span>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                        {filteredReturns.length === 0 && (
                            <tr>
                                <td colSpan={7} className="py-20 text-center font-black uppercase text-slate-400">No return records found</td>
                            </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="p-6 bg-slate-50/50 border-t border-blue-50 text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                    Showing latest active returns · Secure Ledger Verified
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <NewReturnModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onReturnAdded={fetchReturns} />
      <ManualRefundModal isOpen={isManualRefundModalOpen} onClose={() => setIsManualRefundModalOpen(false)} />
    </div>
  );
};

export default ReturnsRefundsPage;
