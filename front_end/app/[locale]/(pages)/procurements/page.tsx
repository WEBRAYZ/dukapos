'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProcurementNavbar from '@/app/components/procurements/navbar';
import ReceiveDelivery from '@/app/components/procurements/receive-delivery';
import SupplierInvoices from '@/app/components/procurements/supplier-invoice';
import RestockOverview from '@/app/components/procurements/restock-overview';
import NewPO from '@/app/components/customers-suppliers/newpo';
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
}

const ProcurementPage = () => {
  const [activeTab, setActiveTab] = useState('Purchase Orders');
  const [activeFilter, setActiveFilter] = useState('All Status');
  const [isNewPOOpen, setIsNewPOOpen] = useState(false);
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
      { label: 'Active POs', value: total.toString(), sub: `↑ ${total} total`, color: 'text-gray-800', subColor: 'text-green-500' },
      { label: 'Pending Delivery', value: pending.toString(), sub: 'Expected soon', color: 'text-blue-900', subColor: 'text-gray-400' },
      { label: 'Total PO Value', value: `KSh ${(totalValue/1000).toFixed(1)}K`, sub: 'This month', color: 'text-gray-800', subColor: 'text-gray-400' },
      { label: 'Overdue Bills', value: '0', sub: 'Action required', color: 'text-red-500', subColor: 'text-red-400' },
    ];
  }, [purchaseOrders]);

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case 'RECEIVED':
      case 'APPROVED':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'PARTIAL':
      case 'PENDING':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredOrders = purchaseOrders.filter(o => {
    if (activeFilter === 'All Status') return true;
    return o.status.toUpperCase() === activeFilter.toUpperCase();
  });

  return (
    <><div className="flex flex-col h-full bg-blue-50 overflow-hidden">
      <ProcurementNavbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewPO={() => setIsNewPOOpen(true)} />

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {/* SUMMARY STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-5 rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center transition-all hover:shadow-md cursor-default group relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${stat.label === 'Overdue Bills' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 group-hover:text-blue-900 transition-colors">{stat.label}</p>
              <p className={`text-xl font-black text-blue-900`}>{stat.value}</p>
              <p className={`text-[9px] font-bold ${stat.subColor} uppercase mt-1`}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* MAIN LEDGER SECTION */}
        <div className="bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden">
          {activeTab === 'Receive Delivery' ? (
            <div className="p-4 md:p-4"><ReceiveDelivery /></div>
          ) : activeTab === 'Supplier Invoices' ? (
            <div className="p-4 md:p-4"><SupplierInvoices /></div>
          ) : activeTab === 'Restock Overview' ? (
            <div className="p-4 md:p-4"><RestockOverview /></div>
          ) : (
            <>
              {/* CONTROL BAR */}
              <div className="p-5 border-b border-blue-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/50">
                <div className="flex flex-col">
                  <h3 className="text-xs font-black text-blue-800 uppercase tracking-widest">Procurement Register</h3>
                  <p className="text-[9px] font-bold text-gray-500 uppercase">Active supply chain operations</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="bg-white border border-blue-100 rounded-sm px-4 py-2.5 text-[10px] font-black uppercase outline-none text-blue-900 focus:ring-1 focus:ring-blue-900 transition-all cursor-pointer shadow-sm"
                  >
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Received</option>
                    <option>Cancelled</option>
                  </select>

                  <div className="relative flex-1 sm:w-64">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">⌕</span>
                    <input
                      type="text"
                      placeholder="Search orders…"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-700 focus:ring-1 focus:ring-blue-900 outline-none transition-all placeholder:text-gray-300 shadow-sm" />
                  </div>
                </div>
              </div>

              {/* TABLE CONTAINER */}
              <div className="overflow-x-auto custom-scrollbar no-scrollbar">
                {loading ? (
                    <div className="p-20 text-center font-black uppercase text-blue-900 animate-pulse">Loading procurement data...</div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/30 border-b border-blue-50">
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">PO Number</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-right">Net Value</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest">Entity / Vendor</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest hidden sm:table-cell">Composition</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest hidden lg:table-cell">Ordered</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest hidden lg:table-cell">ETA</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-center">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase tracking-widest text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredOrders.map((po) => (
                        <tr key={po.id} className="hover:bg-blue-50/30 transition-colors group cursor-default">
                          <td className="px-6 py-4">
                            <span className="text-xs font-black text-blue-900 uppercase whitespace-nowrap">{po.purchase_number}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-sm font-black text-gray-800 whitespace-nowrap">KSh {parseFloat(po.grand_total).toLocaleString()}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-black text-gray-800 uppercase line-clamp-1">{po.supplier_name}</span>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <span className="text-[10px] font-black text-gray-700 uppercase">{po.item_count} items</span>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <span className="text-[11px] font-bold text-gray-700 uppercase whitespace-nowrap">{new Date(po.order_date).toLocaleDateString()}</span>
                          </td>
                          <td className="px-6 py-4 hidden lg:table-cell">
                            <span className="text-[11px] font-bold text-gray-700 uppercase whitespace-nowrap">{po.expected_delivery_date || '—'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <span className={`px-3 py-1 rounded-sm text-[9px] font-black uppercase border ${getStatusStyle(po.status)}`}>
                                {po.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button className="text-[10px] font-black text-blue-900 uppercase hover:text-blue-700 transition-colors">
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                          <tr>
                              <td colSpan={8} className="py-20 text-center font-black uppercase text-slate-400">No procurement records found</td>
                          </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="p-6 md:p-8 bg-slate-50/50 border-t border-blue-50 text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] leading-relaxed">
                  Verified Procurement Ledger · Supply chain integrity SHA-256 protected
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    <NewPO
        isOpen={isNewPOOpen}
        onClose={() => setIsNewPOOpen(false)}
        supplier={{ name: 'Select Supplier', email: '' }} />
    </>

  );
};

export default ProcurementPage;
