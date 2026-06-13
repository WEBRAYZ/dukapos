'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface Movement {
  id: number;
  created_at: string;
  product_name: string;
  type: string;
  quantity: string;
  before_quantity: string;
  after_quantity: string;
  reference: string;
  user_name: string;
}

const MovementHistory = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        setLoading(true);
        const data = await api.get<Movement[]>('/inventory/movements/');
        setMovements(data);
      } catch (err) {
        console.error('Failed to fetch movements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovements();
  }, []);

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'IN': return 'bg-green-100 text-green-700';
      case 'OUT': return 'bg-red-100 text-red-700';
      case 'ADJUSTMENT': return 'bg-blue-100 text-blue-700';
      case 'TRANSFER': return 'bg-purple-100 text-purple-700';
      case 'RETURN': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'IN': return 'Stock In';
      case 'OUT': return 'Stock Out';
      case 'ADJUSTMENT': return 'Adjustment';
      case 'TRANSFER': return 'Transfer';
      case 'RETURN': return 'Return';
      default: return type;
    }
  };

  const filteredMovements = movements.filter(m => 
    m.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header & Controls */}
      <div className="p-4 border-b border-blue-50 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-blue-800 uppercase">Stock Movement History</h3>
            <p className="text-[10px] font-bold text-gray-600 uppercase">All stock-in and stock-out events across all products</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-sm text-[10px] font-black uppercase transition-all border border-transparent hover:border-gray-200">
              📅 Date Range
            </button>
            <button className="px-4 py-2 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm text-[10px] font-black uppercase hover:bg-olive transition-all shadow-lg shadow-green-900/10">
              📥 Export CSV
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-2xl text-gray-700">
              ⌕
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product, ref, user…" 
              className="w-full pl-8 pr-4 py-2.5 bg-gray-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all"
            />
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="flex-1 md:flex-none bg-gray-100 p-1 rounded-sm border border-blue-100">
              <select className="bg-transparent border-none text-[10px] font-black uppercase text-gray-700 px-3 py-1 outline-none w-full">
                <option>All Types</option>
                <option>Stock In</option>
                <option>Stock Out</option>
                <option>Adjustment</option>
                <option>Transfer</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto flex-1">
        {loading ? (
            <div className="p-20 text-center font-black uppercase text-blue-900 animate-pulse">Loading movements...</div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-3 py-4 text-[10px] font-black text-blue-900 uppercase">Date & Time</th>
                <th className="px-3 py-4 text-[10px] font-black text-blue-900 uppercase">Product</th>
                <th className="px-3 py-4 text-[10px] font-black text-blue-900 uppercase">Type</th>
                <th className="px-3 py-4 text-[10px] font-black text-blue-900 uppercase text-center">Qty Change</th>
                <th className="px-3 py-4 text-[10px] font-black text-blue-900 uppercase text-center">Before</th>
                <th className="px-3 py-4 text-[10px] font-black text-blue-900 uppercase text-center">After</th>
                <th className="px-3 py-4 text-[10px] font-black text-blue-900 uppercase">Reference</th>
                <th className="px-3 py-4 text-[10px] font-black text-blue-900 uppercase text-right">User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredMovements.map((move) => (
                <tr key={move.id} className="hover:bg-gray-50/30 transition-colors group cursor-pointer">
                  <td className="px-3 py-4 text-[10px] font-bold text-gray-800 uppercase">
                    {new Date(move.created_at).toLocaleString()}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-sm bg-gray-100 flex items-center justify-center font-black text-[10px] text-gray-500 shadow-inner group-hover:scale-110 transition-transform">
                        {move.product_name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-black text-gray-800 uppercase">{move.product_name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${getTypeStyle(move.type)}`}>
                      {getTypeName(move.type)}
                    </span>
                  </td>
                  <td className={`px-3 py-5 text-center text-xs font-black tabular-nums ${
                    move.type === 'IN' ? 'text-green-600' : 
                    move.type === 'OUT' ? 'text-red-600' : 
                    'text-blue-600'
                  }`}>
                    {move.type === 'IN' ? '+' : move.type === 'OUT' ? '-' : '='} {Math.abs(parseFloat(move.quantity))}
                  </td>
                  <td className="px-3 py-3 text-center text-xs font-bold text-gray-400 tabular-nums">
                    {parseFloat(move.before_quantity)}
                  </td>
                  <td className="px-3 py-3 text-center text-xs font-black text-gray-800 tabular-nums">
                    {parseFloat(move.after_quantity)}
                  </td>
                  <td className="px-3 py-5 text-[10px] font-black text-blue-900/60 uppercase">
                    {move.reference || '—'}
                  </td>
                  <td className="px-3 py-4 text-right text-[10px] font-black text-gray-600 uppercase">
                    {move.user_name}
                  </td>
                </tr>
              ))}
              {filteredMovements.length === 0 && (
                  <tr>
                      <td colSpan={8} className="py-20 text-center font-black uppercase text-slate-400">No movement data found</td>
                  </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination placeholder */}
      <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
        <p className="text-[10px] font-black text-gray-700 uppercase ">Showing {filteredMovements.length} movements</p>
        <div className="flex items-center space-x-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-white border border-blue-100 text-gray-600 hover:text-blue-900 transition-colors">‹</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-blue-900 text-white font-black text-xs">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-white border border-blue-100 text-gray-600 hover:text-blue-900 transition-colors">›</button>
        </div>
      </div>
    </div>
  );
};

export default MovementHistory;


export default MovementHistory;
