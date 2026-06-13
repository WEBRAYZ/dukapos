'use client';

import React, { useState, useEffect, useMemo } from 'react';
import PurchasesNavbar from '@/app/components/purchases/navbar';
import ReceiveStock from '@/app/components/purchases/receivestock';
import PurchaseHistory from '@/app/components/purchases/purchasehistory';
import { api } from '@/lib/api';

interface PurchaseOrder {
  id: number;
  purchase_number: string;
  supplier_name: string;
  item_count: number;
  order_date: string;
  expected_delivery_date: string;
  grand_total: string;
  status: string;
  items_received?: number;
}

const PurchaseOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('Purchase Orders');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await api.get<PurchaseOrder[]>('/purchases/');
      setPurchaseOrders(data);
    } catch (err) {
      console.error('Failed to fetch purchase orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = useMemo(() => {
    const total = purchaseOrders.length;
    const pending = purchaseOrders.filter(o => o.status === 'PENDING').length;
    const totalValue = purchaseOrders.reduce((acc, o) => acc + parseFloat(o.grand_total), 0);
    
    return [
      { label: 'Total Orders', value: total.toString(), change: '↑', meta: 'this week', icon: '📋', color: 'bg-yellow-50 text-yellow-600' },
      { label: 'Pending Approval', value: pending.toString(), change: pending.toString(), meta: 'urgent', icon: '⏳', color: 'bg-orange-50 text-orange-600', isWarning: true },
      { label: 'Total Value', value: `KSh ${(totalValue/1000).toFixed(1)}K`, change: '↑', meta: 'All time', icon: '💰', color: 'bg-green-50 text-green-600' },
      { label: 'Completion', value: `${total > 0 ? Math.round((purchaseOrders.filter(o => o.status === 'RECEIVED').length / total) * 100) : 0}%`, change: 'rate', meta: '', icon: '🚚', color: 'bg-blue-50 text-blue-900' },
    ];
  }, [purchaseOrders]);

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case 'APPROVED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'PENDING': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'PARTIAL': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'RECEIVED': return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
      case 'DRAFT': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredOrders = purchaseOrders.filter(o => {
    const matchesFilter = filter === 'All' || o.status.toUpperCase() === filter.toUpperCase();
    const matchesSearch = o.purchase_number.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.supplier_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const renderPOContent = () => (
    <div className="space-y-3 md:space-y-3">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-blue-800 uppercase">Purchase Orders</h2>
          <p className="text-[10px] md:text-xs font-bold text-gray-700 uppercase">Manage vendor procurement workflow</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-slate-100 border border-blue-100 text-blue-900 hover:text-blue-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all shadow-sm">
            Export List
          </button>
          <button className="flex-1 md:flex-none px-3 md:px-8 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
            + New Order
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all cursor-default">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 md:w-9 md:h-9 rounded-sm flex items-center justify-center text-2xl md:text-3xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-[10px] font-black px-2 py-1 rounded-full ${
                stat.isWarning ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}>
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-600 uppercase">{stat.label}</p>
              <h4 className="text-xl md:text-2xl font-black text-blue-800">{stat.value}</h4>
              <p className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase">{stat.meta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-2 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex p-1.5 gap-4 rounded-sm w-full lg:w-auto overflow-x-auto no-scrollbar">
          {['All', 'Pending', 'Received', 'Cancelled'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2.5 rounded-sm text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                filter === t ? 'bg-linear-to-r from-blue-800 to-blue-950 text-white border border-blue-200' : 'text-blue-800 hover:text-gray-600 border border-blue-200 bg-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search orders, vendors…"
              className="w-full pl-11 pr-4 py-3 bg-gray-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-500 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* PO Table */}
      <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto custom-scrollbar no-scrollbar">
          {loading ? (
              <div className="p-20 text-center font-black uppercase text-blue-900 animate-pulse">Loading orders...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[11px] font-black text-blue-800 uppercase">Order #</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[11px] font-black text-blue-800 uppercase">Vendor</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[11px] font-black text-blue-800 uppercase hidden sm:table-cell">Items</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[11px] font-black text-blue-800 uppercase hidden lg:table-cell">Order Date</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[11px] font-black text-blue-800 uppercase whitespace-nowrap">Net Value</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[11px] font-black text-blue-800 uppercase">Status</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[11px] font-black text-blue-800 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50/30 transition-colors group cursor-pointer">
                    <td className="px-3 md:px-3 py-3 md:py-3">
                      <span className="text-xs font-black text-blue-900 uppercase">{po.purchase_number}</span>
                    </td>
                    <td className="px-3 md:px-3 py-3 md:py-3">
                      <span className="text-[11px] font-black text-gray-800 uppercase">{po.supplier_name}</span>
                    </td>
                    <td className="px-3 md:px-3 py-3 md:py-3 hidden sm:table-cell">
                      <span className="text-[11px] font-black text-gray-600 uppercase">{po.item_count} SKUs</span>
                    </td>
                    <td className="px-3 md:px-3 py-3 md:py-3 hidden lg:table-cell">
                      <span className="text-[11px] font-bold text-gray-600 uppercase">{new Date(po.order_date).toLocaleDateString()}</span>
                    </td>
                    <td className="px-3 md:px-3 py-3 md:py-3">
                      <span className="text-sm font-black text-gray-800">KSh {parseFloat(po.grand_total).toLocaleString()}</span>
                    </td>
                    <td className="px-3 md:px-3 py-3 md:py-3">
                      <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${getStatusStyle(po.status)}`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="px-3 md:px-3 py-3 md:py-3">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-sm bg-gray-100 text-gray-700 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-gray-100">
                          <span className="text-base">👁</span>
                        </button>
                        {po.status !== 'RECEIVED' && (
                            <button className="w-8 h-8 md:w-10 md:h-10 rounded-sm bg-gray-100 text-gray-700 hover:text-green-600 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-gray-100" title="Receive Stock">
                                <span className="text-base">📥</span>
                            </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                    <tr>
                        <td colSpan={7} className="py-20 text-center font-black uppercase text-slate-400">No purchase orders found</td>
                    </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-3 md:p-3 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-700 uppercase hidden sm:block">Showing {filteredOrders.length} of {purchaseOrders.length} orders</p>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-blue-100 text-blue-700 hover:text-blue-900 transition-colors">‹</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-linear-to-l from-blue-800 to-blue-950 text-white font-black text-sm">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-blue-100 text-blue-700 hover:bg-gray-50 font-black text-sm transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-blue-100 text-blue-700 hover:text-blue-900 transition-colors">›</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-blue-50 overflow-hidden">
      <PurchasesNavbar activeTab={activeTab} onTabChange={setActiveTab}/>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
        {activeTab === 'Purchase Orders' ? (
          renderPOContent()
        ) : activeTab === 'Receive Stock' ? (
          <ReceiveStock />
        ) : activeTab === 'Purchase History' ? (
          <PurchaseHistory />
        ) : (
          <div className="h-full flex items-center justify-center py-10 px-4">
             <div className="text-center space-y-3 bg-white p-6 md:p-8 rounded-sm shadow-sm border border-blue-100 max-w-md w-full">
              <div className="text-7xl grayscale opacity-20 mb-4">⚙️</div>
              <h3 className="text-base font-black text-gray-800 uppercase">{activeTab} Pending</h3>
              <p className="text-[10px] md:text-xs font-bold text-gray-600 uppercase">This procurement module is currently being optimized for retail operations.</p>
              <button onClick={() => setActiveTab('Purchase Orders')} className="w-full py-4 bg-linear-to-l from-blue-700 to-blue-950 text-white rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm shadow-blue-900/20 active:scale-95 transition-all">Back to Orders</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseOrdersPage;
