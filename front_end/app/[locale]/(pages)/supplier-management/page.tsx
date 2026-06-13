'use client';

import React, { useState, useEffect, useMemo } from 'react';
import SupplierManagementNavbar from '@/app/components/supplier-management/navbar';
import AddSupplierModal from '@/app/components/supplier-management/add-supplier-modal';
import { api } from '@/lib/api';

interface Supplier {
  id: number;
  company_name: string;
  contact_person: string;
  category: string;
  status: 'ACTIVE' | 'INACTIVE';
  rating: number;
  total_spend: string;
  outstanding_balance: string;
  order_count: number;
  lead_time: string;
  location: string;
  last_order_date: string;
}

const SupplierManagementPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const data = await api.get<Supplier[]>('/suppliers/');
      setSuppliers(data);
    } catch (err: any) {
      console.error('Failed to fetch suppliers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const stats = useMemo(() => {
    const totalSpend = suppliers.reduce((acc, s) => acc + parseFloat(s.total_spend), 0);
    const totalOutstanding = suppliers.reduce((acc, s) => acc + parseFloat(s.outstanding_balance), 0);
    const activeCount = suppliers.filter(s => s.status === 'ACTIVE').length;
    
    return [
      { label: 'Total Suppliers', value: suppliers.length.toString(), sub: `${activeCount} active · ${suppliers.length - activeCount} inactive`, icon: '🏪', color: 'text-gray-800' },
      { label: 'Total Spend (YTD)', value: `KSh ${totalSpend.toLocaleString()}`, sub: 'Across all vendors', icon: '💰', color: 'text-green-600' },
      { label: 'Outstanding Balance', value: `KSh ${totalOutstanding.toLocaleString()}`, sub: `${suppliers.filter(s => parseFloat(s.outstanding_balance) > 0).length} suppliers with open balances`, icon: '⏳', color: 'text-red-500' },
      { label: 'Preferred Suppliers', value: suppliers.filter(s => s.rating >= 4).length.toString(), sub: 'High rated vendors', icon: '⭐', color: 'text-olive' },
    ];
  }, [suppliers]);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => {
      const matchesFilter = activeFilter === 'All' || s.status === activeFilter.toUpperCase();
      const matchesSearch = s.company_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.contact_person?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [suppliers, activeFilter, searchQuery]);

  const renderRating = (rating: number) => {
    return (
      <div className="flex text-blue-400 text-xs">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < rating ? '★' : '☆'}</span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-blue-50 items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-xs font-black text-blue-900 uppercase tracking-widest">Scanning Vendors...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-blue-50 font-sans">
      <SupplierManagementNavbar onAddSupplier={() => setIsModalOpen(true)} />
      
      <div className="flex-1 flex flex-col p-3 overflow-hidden max-w-7xl mx-auto w-full space-y-3">
        
        {/* TOP SUMMARY STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex items-center space-x-4 transition-transform hover:scale-[1.02]">
               <div className="w-9 h-9 bg-gray-50 rounded-sm flex items-center justify-center text-xl shadow-inner">
                  {stat.icon}
               </div>
               <div className='space-y-1'>
                  <p className="text-[10px] font-black text-gray-600 uppercase">{stat.label}</p>
                  <p className={`text-lg font-black ${stat.color}`}>{stat.value}</p>
                  <p className="text-[9px] font-bold text-gray-600 uppercase">{stat.sub}</p>
               </div>
            </div>
          ))}
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
           <div className="flex items-center flex-1 min-w-[300px] relative">
              <span className="absolute left-4 text-gray-700 text-2xl">⌕</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search suppliers, contacts, IDs…" 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-sm text-xs font-bold focus:ring-1 focus:ring-olive/20 outline-none"
              />
           </div>
           
           <div className="flex items-center space-x-3">
              <select className="bg-slate-100 border-none rounded-sm px-4 py-2.5 text-[10px] font-black uppercase outline-none text-slate-800">
                 <option>All Categories</option>
                 {Array.from(new Set(suppliers.map(s => s.category).filter(Boolean))).map(cat => (
                   <option key={cat}>{cat}</option>
                 ))}
              </select>

              <div className="flex gap-2 rounded-sm">
                 {['All', 'Active', 'Inactive'].map(f => (
                   <button 
                     key={f}
                     onClick={() => setActiveFilter(f)}
                     className={`px-4 py-2 rounded-xs text-[10px] font-black uppercase transition-all ${activeFilter === f ? ' bg-linear-to-l from-blue-800 to-blue-950 text-blue-100 shadow-sm' : 'bg-slate-200 textblue-800 hover:text-blue-900'}`}
                   >
                     {f}
                   </button>
                 ))}
              </div>

              <div className="flex bg-slate-100 p-2 rounded-sm">
                 <button onClick={() => setViewMode('grid')} className={`px-2 py-1 rounded-xs transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'opacity-40'}`}>⊞</button>
                 <button onClick={() => setViewMode('list')} className={`px-2 py-1 rounded-xs transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'opacity-40'}`}>☰</button>
              </div>
           </div>
        </div>

        {/* SUPPLIER GRID */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center justify-between mb-3 px-2">
             <p className="text-[10px] font-black text-gray-700 uppercase">{filteredSuppliers.length} of {suppliers.length} suppliers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-3">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-sm border border-blue-100 shadow-sm flex flex-col overflow-hidden hover:shadow-xl transition-all group relative">
                {/* Status Badge Overlay */}
                <div className="absolute top-2 right-2">
                   <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border ${supplier.status === 'ACTIVE' ? 'bg-green-100 text-green-600 border-green-100' : 'bg-gray-100 text-gray-400 border-gray-200'}`}>
                      {supplier.status}
                   </span>
                </div>

                {/* Header Section */}
                <div className="p-4 pb-3 border-b border-blue-50">
                  <div className="flex items-center space-x-5 mb-4">
                    <div className="w-12 h-12 bg-blue-900 rounded-sm flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:rotate-2 transition-transform">
                      {supplier.company_name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-blue-800 uppercase">{supplier.company_name}</h3>
                      <p className="text-[10px] font-bold text-gray-700 uppercase">SUP-{supplier.id.toString().padStart(3, '0')} · {supplier.category || 'No Category'}</p>
                    </div>
                  </div>
                  
                  {renderRating(supplier.rating)}
                </div>

                {/* Metrics Section */}
                <div className="p-4 grid grid-cols-2 gap-y-3 gap-x-4 border-b border-blue-50">
                  <div>
                    <p className="text-[10px] font-black text-gray-700 uppercase">Total Spend</p>
                    <p className="text-xs font-black text-gray-800">KSh {parseFloat(supplier.total_spend).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-700 uppercase">Outstanding</p>
                    <p className={`text-xs font-black ${parseFloat(supplier.outstanding_balance) > 0 ? 'text-red-500' : 'text-green-500'}`}>KSh {parseFloat(supplier.outstanding_balance).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-700 uppercase">Orders</p>
                    <p className="text-xs font-black text-gray-800">{supplier.order_count}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-700 uppercase">Lead Time</p>
                    <p className="text-xs font-black text-blue-900">{supplier.lead_time || 'N/A'}</p>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="px-3 py-3 bg-gray-50/50 flex flex-col space-y-2">
                   <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold text-gray-700 uppercase flex items-center">
                         <span className="mr-1.5">📍</span> {supplier.location || 'No Location'}
                      </p>
                      <p className="text-[10px] font-bold text-gray-700 uppercase">Last: {supplier.last_order_date || 'None'}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddSupplierModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSupplierAdded={fetchSuppliers} />
    </div>
  );
};

export default SupplierManagementPage;
