'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import CustomersSuppliersNavbar from '@/app/components/customers-suppliers/navbar';
import Suppliers from '@/app/components/customers-suppliers/suppliers';
import CustomerDetails from '@/app/components/customers-suppliers/customerdetails';
import SupplierDetails from '@/app/components/customers-suppliers/supplierdetails';
import AddCustomer from '@/app/components/customers-suppliers/addcustomer';

const CustomersSuppliersPage = () => {
  const [activeTab, setActiveTab] = useState('Customers');
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const data = await api.get<any[]>('/customers/');
        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      } finally {
        setLoading(false);
      }
    };
    if (activeTab === 'Customers') {
      fetchCustomers();
    }
  }, [activeTab]);

  React.useEffect(() => {
    if (isAddCustomerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAddCustomerOpen]);

  const getStats = () => {
    const total = customers.length;
    const vip = customers.filter(c => c.customer_type === 'VIP').length;
    const totalLtv = customers.reduce((acc, c) => acc + (parseFloat(c.store_credit_balance) || 0), 0);
    const outstanding = customers.filter(c => parseFloat(c.store_credit_balance) > 0).length;

    return [
      { label: 'Total Customers', value: total.toString(), change: '↑', meta: 'total', icon: '👥', color: 'bg-yellow-50 text-yellow-600' },
      { label: 'VIP Members', value: vip.toString(), change: '↑', meta: 'members', icon: '⭐', color: 'bg-yellow-50 text-yellow-600' },
      { label: 'Avg. Credit Balance', value: `KSh ${(total > 0 ? totalLtv / total : 0).toLocaleString()}`, change: '↑', meta: '', icon: '💰', color: 'bg-green-50 text-green-600' },
      { label: 'Outstanding Accounts', value: outstanding.toString(), change: '↑', meta: 'accounts', icon: '💳', color: 'bg-red-50 text-red-600' },
    ];
  };

  const stats = getStats();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-yellow-100 text-yellow-700';
      case 'Active': return 'bg-green-100 text-green-700';
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Overdue': return 'bg-red-100 text-red-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderCustomers = () => (
    <div className="space-y-3 md:space-y-3">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="text-xl md:text-xl font-black text-blue-800 uppercase">Customers</h2>
          <p className="text-[10px] md:text-xs font-bold text-slate-700 uppercase">Manage your customer base and loyalty</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-slate-300 border border-blue-100 text-blue-700 hover:text-slate-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all shadow-sm flex items-center justify-center">
            <span className="mr-2 text-base">⬇</span> Export
          </button>
          <button 
            onClick={() => setIsAddCustomerOpen(true)}
            className="flex-1 md:flex-none px-6 md:px-8 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-olive transition-all shadow-lg shadow-olive/20 flex items-center justify-center"
          >
            <span className="mr-2 text-base">+</span> Add Customer
          </button>
        </div>
      </div>

      <AddCustomer isOpen={isAddCustomerOpen} onClose={() => setIsAddCustomerOpen(false)} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all cursor-default">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-sm flex items-center justify-center text-xl md:text-2xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-[10px] font-black px-2 py-1 rounded-full ${
                stat.label === 'Outstanding Credit' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
              }`}>
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-600 uppercase">{stat.label}</p>
              <h4 className="text-lg md:text-lg font-black text-blue-800 mt-1">{stat.value}</h4>
              <p className="text-[9px] md:text-[10px] font-bold text-slate-600 uppercase mt-1">{stat.meta}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3 md:p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex bg-slate-50 p-1 rounded-sm w-full lg:w-auto overflow-x-auto no-scrollbar border border-blue-100">
          {['All', 'VIP', 'Active', 'Inactive', 'New'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2.5 rounded-sm text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                filter === t ? 'bg-linear-to-l from-blue-800 to-blue-950 text-blue-100 shadow-sm border border-blue-100' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search customers…"
              className="w-full pl-11 pr-4 py-3 bg-slate-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="hidden sm:flex px-5 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-sm text-[10px] font-black uppercase transition-all border border-blue-100 items-center space-x-2">
            <span>⚙</span>
            <span>Columns</span>
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 md:p-4 border-b border-blue-50 flex items-center justify-between">
          <span className="text-[11px] font-black text-slate-700 uppercase">{customers.length} members</span>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black text-slate-700 uppercase hidden sm:inline">Sort by:</span>
            <select className="bg-transparent border-none text-[10px] font-black uppercase text-blue-900 outline-none cursor-pointer">
              <option>Name A–Z</option>
              <option>Highest LTV</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar no-scrollbar">
          {loading ? (
            <div className="p-10 text-center font-black uppercase text-blue-900">Loading Customers...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[10px] font-black text-blue-800 uppercase">Customer</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[10px] font-black text-blue-800 uppercase hidden lg:table-cell">Contact</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[10px] font-black text-blue-800 uppercase hidden xl:table-cell">Member Since</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[10px] font-black text-blue-800 uppercase text-center">Purchases</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[10px] font-black text-blue-800 uppercase">LTV</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[10px] font-black text-blue-800 uppercase">Status</th>
                  <th className="px-3 md:px-3 py-3 md:py-3 text-[10px] font-black text-blue-800 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {customers.map((c) => (
                  <tr 
                    key={c.id} 
                    className="hover:bg-slate-50/30 transition-colors group cursor-pointer"
                    onClick={() => setActiveTab('Customer Details')}
                  >
                    <td className="px-4 md:px-4 py-3 md:py-3">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 md:w-8 md:h-8 rounded-sm flex items-center justify-center font-black text-sm shadow-inner group-hover:scale-110 transition-transform bg-blue-100 text-blue-600`}>
                          {c.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-800 uppercase line-clamp-1">{c.name}</span>
                          <span className="text-[10px] md:text-[10px] font-bold text-slate-600 lowercase line-clamp-1">{c.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 md:px-3 py-3 md:py-3 hidden lg:table-cell text-[11px] font-bold text-slate-500 whitespace-nowrap">{c.phone}</td>
                    <td className="px-3 md:px-3 py-3 md:py-3 hidden xl:table-cell text-[11px] font-bold text-slate-600 uppercase whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</td>
                    <td className="px-3 md:px-3 py-3 md:py-3 text-center text-sm font-black text-slate-800">{c.purchases_count || 0}</td>
                    <td className="px-3 md:px-3 py-3 md:py-3 text-xs font-black text-blue-900 whitespace-nowrap">
                      KSh {(parseFloat(c.store_credit_balance) || 0).toLocaleString()}
                    </td>
                    <td className="px-4 md:px-4 py-3 md:py-3">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center w-fit space-x-1 whitespace-nowrap ${getStatusStyle(c.customer_type)}`}>
                        {c.customer_type === 'VIP' && <span className="mr-1">⭐</span>}
                        <span>{c.customer_type}</span>
                      </span>
                    </td>
                    <td className="px-4 md:px-4 py-3 md:py-3">
                      <div className="flex items-center justify-end space-x-2 md:space-x-3">
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-50 text-slate-700 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-blue-100">
                          <span className="text-base">👁</span>
                        </button>
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-50 text-slate-700 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-blue-100">
                          <span className="text-base">✏</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="p-6 md:p-8 bg-slate-50/50 border-t border-blue-50 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-600 uppercase hidden sm:block">Showing {customers.length} of {customers.length} members</p>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-slate-100 border border-blue-100 text-slate-600 hover:text-blue-900 transition-colors">‹</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-blue-900 text-white font-black text-sm">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-slate-100 border border-blue-100 text-slate-600 hover:bg-gray-50 font-black text-sm transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-slate-100 border border-blue-100 text-slate-600 hover:bg-gray-50 font-black text-sm transition-colors sm:flex">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-slate-100 border border-blue-100 text-slate-600 hover:text-blue-900 transition-colors">›</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-blue-50 overflow-hidden">
      <CustomersSuppliersNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 lg:p-8">
        {activeTab === 'Customers' ? (
          renderCustomers()
        ) : activeTab === 'Suppliers' ? (
          <Suppliers onSelectSupplier={() => setActiveTab('Supplier Details')} />
        ) : activeTab === 'Customer Details' ? (
          <CustomerDetails onBack={() => setActiveTab('Customers')} />
        ) : activeTab === 'Supplier Details' ? (
          <SupplierDetails onBack={() => setActiveTab('Suppliers')} />
        ) : (
          <div className="h-full flex items-center justify-center py-8">
            <div className="text-center space-y-4 bg-white p-5 rounded-sm shadow-xl border border-blue-100 max-w-sm w-full">
              <div className="text-6xl grayscale opacity-70 mb-3">👥</div>
              <h3 className="text-sm font-black text-slate-800 uppercase">{activeTab} Coming Soon</h3>
              <p className="text-[10px] font-bold text-slate-700 uppercase">This module is currently under development for our retail partners.</p>
              <button onClick={() => setActiveTab('Customers')} className="w-full py-3 bg-blue-900 text-white rounded-sm text-[10px] font-black uppercase shadow-lg">Back to List</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersSuppliersPage;
