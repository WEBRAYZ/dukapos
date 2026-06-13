'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { api } from '@/lib/api';
import AddSupplier from './addsupplier';

interface Supplier {
  id: number;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  kra_pin: string;
  status: 'ACTIVE' | 'INACTIVE';
  rating: number;
  total_spend: string;
  outstanding_balance: string;
  order_count: number;
}

interface SuppliersProps {
  onSelectSupplier: () => void;
}

const Suppliers: React.FC<SuppliersProps> = ({ onSelectSupplier }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await api.get<Supplier[]>('/suppliers/');
      setSuppliers(data);
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const stats = useMemo(() => {
    const total = suppliers.length;
    const active = suppliers.filter(s => s.status === 'ACTIVE').length;
    const totalSpend = suppliers.reduce((acc, s) => acc + parseFloat(s.total_spend), 0);
    const totalOutstanding = suppliers.reduce((acc, s) => acc + parseFloat(s.outstanding_balance), 0);

    return [
      { label: 'Total Suppliers', value: total.toString(), change: '↑', meta: 'total', icon: '🏭', color: 'bg-yellow-50 text-yellow-600' },
      { label: 'Active Suppliers', value: active.toString(), change: `${total > 0 ? Math.round((active / total) * 100) : 0}%`, meta: 'rate', icon: '✅', color: 'bg-green-50 text-green-600' },
      { label: 'Purchases (YTD)', value: `KSh ${totalSpend.toLocaleString()}`, change: '↑', meta: '', icon: '📦', color: 'bg-olive/10 text-olive' },
      { label: 'Outstanding Bills', value: `KSh ${totalOutstanding.toLocaleString()}`, change: 'due', meta: suppliers.filter(s => parseFloat(s.outstanding_balance) > 0).length.toString(), icon: '⚠', color: 'bg-red-50 text-red-600' },
    ];
  }, [suppliers]);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => {
      const matchesFilter = filter === 'All' || s.status === filter.toUpperCase();
      const matchesSearch = s.company_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.contact_person?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [suppliers, filter, searchQuery]);

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        <span className="text-blue-900 font-black">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
        <span className="text-[10px] font-black text-gray-400">{rating}</span>
      </div>
    );
  };

  return (
    <div className="space-y-3 md:space-y-3">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="text-xl md:text-xl font-black text-blue-800 uppercase">Suppliers</h2>
          <p className="text-[10px] md:text-xs font-bold text-slate-600 uppercase">Manage vendor relationships and performance</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 md:px-4 py-3 bg-slate-200 border border-blue-100 text-blue-700 hover:text-slate-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase transition-all shadow-sm flex items-center justify-center">
            <span className="mr-2 text-base">⬇</span> Export
          </button>
          <button 
            onClick={() => setIsAddSupplierOpen(true)}
            className="flex-1 md:flex-none px-6 md:px-8 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase hover:bg-olive transition-all shadow-lg shadow-olive/20 flex items-center justify-center"
          >
            <span className="mr-2 text-base">+</span> Add Supplier
          </button>
        </div>
      </div>

      <AddSupplier isOpen={isAddSupplierOpen} onClose={() => setIsAddSupplierOpen(false)} onSupplierAdded={fetchSuppliers} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-sm md:rounded-sm border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all cursor-default">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 md:w-8 md:h-8 rounded-sm flex items-center justify-center text-xl md:text-2xl shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 text-[10px] font-black px-2 py-1 rounded-full ${
                stat.label === 'Outstanding Bills' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}>
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-600 uppercase">{stat.label}</p>
              <h4 className="text-xl md:text-2xl font-black text-slate-800">{stat.value}</h4>
              <p className="text-[10px] font-black text-slate-600 uppercase mt-1">{stat.meta}</p>
          </div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 md:p-4 rounded-sm md:rounded-sm border border-blue-100 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex bg-slate-100 p-0.5 rounded-sm w-full lg:w-auto overflow-x-auto no-scrollbar border border-blue-100">
          {['All', 'Active', 'Inactive', 'Preferred'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2.5 rounded-sm text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                filter === t ? 'bg-linear-to-l from-blue-800 to-blue-950 text-blue-100 shadow-sm border' : 'text-slate-700 hover:text-slate-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search suppliers, categories..."
              className="w-full pl-11 pr-4 py-3 bg-slate-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-slate-600 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="hidden sm:flex px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-sm text-[10px] font-black uppercase transition-all border border-blue-100 items-center space-x-2">
            <span>⚙</span>
            <span>Columns</span>
          </button>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 md:p-4 border-b border-blue-100 flex items-center justify-between">
          <span className="text-[11px] font-black text-blue-800 uppercase">{filteredSuppliers.length} vendors</span>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black text-slate-600 uppercase hidden sm:inline">Sort by:</span>
            <select className="bg-slate-200 p-3 border-none text-[10px] font-black uppercase text-blue-900 outline-none cursor-pointer">
              <option>Name A–Z</option>
              <option>Highest Spend</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar no-scrollbar">
          {loading ? (
            <div className="p-10 text-center font-black uppercase text-blue-900">Loading Suppliers...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-4 md:px-4 py-3 md:py-3 text-[10px] font-black text-blue-900 uppercase">Supplier</th>
                  <th className="px-4 md:px-4 py-3 md:py-3 text-[10px] font-black text-blue-900 uppercase hidden lg:table-cell">Contact Person</th>
                  <th className="px-4 md:px-4 py-3 md:py-3 text-[10px] font-black text-blue-900 uppercase hidden xl:table-cell">Phone</th>
                  <th className="px-4 md:px-4 py-3 md:py-3 text-[10px] font-black text-blue-900 uppercase">Spend</th>
                  <th className="px-4 md:px-4 py-3 md:py-3 text-[10px] font-black text-blue-900 uppercase text-center">Status</th>
                  <th className="px-4 md:px-4 py-3 md:py-3 text-[10px] font-black text-blue-900 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredSuppliers.map((s) => (
                  <tr 
                    key={s.id} 
                    className="hover:bg-slate-50/30 transition-colors group cursor-pointer"
                    onClick={onSelectSupplier}
                  >
                    <td className="px-4 md:px-4 py-3 md:py-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 md:w-8 md:h-8 rounded-sm flex items-center justify-center font-black text-sm shadow-inner group-hover:scale-110 transition-transform bg-blue-100 text-blue-600`}>
                          {s.company_name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-800 uppercase  line-clamp-1">{s.company_name}</span>
                          <span className="text-[9px] md:text-[10px] font-bold text-slate-600 lowercase line-clamp-1">{s.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-4 py-3 md:py-3 hidden lg:table-cell text-[10px] font-black text-slate-600 uppercase whitespace-nowrap">{s.contact_person || 'N/A'}</td>
                    <td className="px-4 md:px-4 py-3 md:py-3 hidden xl:table-cell text-[11px] font-bold text-slate-600 uppercase whitespace-nowrap">{s.phone}</td>
                    <td className="px-4 md:px-4 py-3 md:py-3 text-sm font-black text-blue-900 whitespace-nowrap">
                      KSh {parseFloat(s.total_spend).toLocaleString()}
                    </td>
                    <td className="px-4 md:px-4 py-3 md:py-3 text-center">
                      <span className={`text-[10px] font-black uppercase whitespace-nowrap px-2 py-1 rounded-full ${s.status === 'ACTIVE' ? 'text-green-500 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-4 py-3 md:py-3">
                      <div className="flex items-center justify-end space-x-2 md:space-x-3">
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-sm bg-transparent text-slate-700 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-gray-100">
                          <span className="text-base">👁</span>
                        </button>
                        <button className="w-8 h-8 md:w-10 md:h-10 rounded-sm bg-transparent text-slate-700 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-gray-100">
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
        <div className="p-4 md:p-4 bg-gray-50/50 border-t border-blue-50 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-700 uppercase hidden sm:block">Showing {filteredSuppliers.length} of {suppliers.length} vendors</p>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-slate-100 border border-blue-100 text-gray-600 hover:text-blue-900 transition-colors">‹</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-blue-900 text-white font-black text-sm">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-slate-100 border border-blue-100 text-gray-600 hover:bg-gray-50 font-black text-sm transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-sm bg-slate-100 border border-blue-100 text-gray-600 hover:text-blue-900 transition-colors">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
