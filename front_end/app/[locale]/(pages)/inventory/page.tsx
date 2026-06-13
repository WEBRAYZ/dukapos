'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';

import InventoryNavbar from '@/app/components/inventory/navbar';
import StockAdjustments from '@/app/components/inventory/stockadjustments';
import MovementHistory from '@/app/components/inventory/movementhistory';

interface Product {
  id: number;
  name: string;
  sku: string;
  category_name: string;
  stock_quantity: number;
  low_stock_threshold: number;
  selling_price: string;
  image?: string;
  status?: string;
}

const InventoryOverviewPage = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get<Product[]>('/products/');
        setProducts(response);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch inventory:', err);
        setError(err.message || 'Failed to load inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const stats = useMemo(() => {
    const totalValue = products.reduce((acc, p) => acc + (parseFloat(p.selling_price) * p.stock_quantity), 0);
    const lowStock = products.filter(p => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).length;
    const outOfStock = products.filter(p => p.stock_quantity === 0).length;

    return [
      { label: 'Total SKUs', value: products.length.toString(), change: '+12', meta: 'total unique items', icon: '📦' },
      { label: 'Inventory Value', value: `KSh ${(totalValue / 1000000).toFixed(1)}M`, change: '8.4%', meta: 'estimated market value', icon: '💰', isUp: true },
      { label: 'Low Stock Items', value: lowStock.toString(), change: '+3', meta: 'at or below threshold', icon: '⚠️', isWarning: lowStock > 0 },
      { label: 'Out of Stock', value: outOfStock.toString(), change: '+2', meta: 'requires urgent restock', icon: '🚫', isCritical: outOfStock > 0 },
    ];
  }, [products]);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category_name] = (counts[p.category_name] || 0) + 1;
    });

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / products.length) * 100) || 0,
      color: 'bg-blue-500'
    })).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-4">
          <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-black text-blue-900 uppercase tracking-widest animate-pulse">Scanning Inventory...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-4 text-center">
          <div className="text-5xl">📦</div>
          <h2 className="text-xl font-black text-red-700 uppercase">Sync Error</h2>
          <p className="text-sm text-slate-600 font-bold uppercase max-w-sm">{error}</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-blue-900 text-white font-black uppercase text-xs rounded-sm shadow-xl">Retry Connection</button>
        </div>
      );
    }

    switch (activeTab) {
      case 'Stock Adjustments':
        return <StockAdjustments />;
      case 'Movement History':
        return <MovementHistory />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all cursor-default">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-sm bg-slate-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className={`flex items-center space-x-1 text-[10px] font-black px-2 py-1 rounded-sm ${
                      stat.isCritical ? 'bg-red-50 text-red-600' : 
                      stat.isWarning ? 'bg-amber-50 text-amber-600' : 
                      'bg-green-50 text-green-600'
                    }`}>
                      <span>{stat.isUp || stat.change.startsWith('+') ? '↑' : '↓'}</span>
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{stat.label}</p>
                    <h4 className="text-2xl font-black text-blue-950 mt-1">{stat.value}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{stat.meta}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-blue-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black text-blue-900 uppercase">Inventory Master List</h3>
                        <p className='text-[10px] font-bold text-blue-400 uppercase tracking-widest'>Totaling {filteredProducts.length} items found</p>
                      </div>
                      <div className="flex flex-1 max-w-sm relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                          🔍
                        </span>
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search items, SKU, or category…" 
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-blue-50 rounded-sm text-[11px] font-black uppercase text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-900/10 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase">Product</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase hidden md:table-cell">Category</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase text-center">Stock</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase hidden lg:table-cell text-center">Threshold</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase text-right">Price</th>
                          <th className="px-6 py-4 text-[10px] font-black text-blue-900 uppercase text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredProducts.map((product) => (
                          <tr key={product.sku} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-4">
                                <div className="relative w-10 h-10 rounded-sm bg-slate-100 flex items-center justify-center font-black text-sm shadow-inner group-hover:scale-110 transition-transform overflow-hidden">
                                  {product.image ? (
                                    <img 
                                      src={product.image} 
                                      alt={product.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <span className="text-xl">📦</span>
                                  )}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-black text-blue-950 uppercase">{product.name}</span>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{product.sku}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                              <span className="text-[10px] font-black text-slate-500 uppercase">{product.category_name}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex flex-col items-center">
                                <span className={`text-xs font-black ${product.stock_quantity <= product.low_stock_threshold ? 'text-red-600' : 'text-blue-900'}`}>
                                  {product.stock_quantity}
                                </span>
                                <div className="w-12 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${product.stock_quantity === 0 ? 'bg-red-600' : product.stock_quantity <= product.low_stock_threshold ? 'bg-amber-500' : 'bg-green-500'}`}
                                    style={{ width: `${Math.min((product.stock_quantity / 100) * 100, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 hidden lg:table-cell text-center text-xs font-bold text-slate-400">
                              {product.low_stock_threshold}
                            </td>
                            <td className="px-6 py-4 text-right font-black text-blue-900 text-xs">
                              KSh {parseFloat(product.selling_price).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${
                                product.stock_quantity === 0 ? 'bg-red-50 text-red-700' : 
                                product.stock_quantity <= product.low_stock_threshold ? 'bg-amber-50 text-amber-700' : 
                                'bg-green-50 text-green-700'
                              }`}>
                                {product.stock_quantity === 0 ? 'Out of Stock' : product.stock_quantity <= product.low_stock_threshold ? 'Low Stock' : 'In Stock'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination placeholder */}
                  <div className="p-4 bg-slate-50 border-t border-blue-50 flex items-center justify-between">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Showing {filteredProducts.length} items</p>
                    <div className="flex items-center space-x-1">
                      <button className="px-3 py-1.5 bg-white border border-blue-100 text-[10px] font-black uppercase text-blue-900 rounded-sm disabled:opacity-50">Previous</button>
                      <button className="px-3 py-1.5 bg-blue-900 border border-blue-900 text-[10px] font-black uppercase text-white rounded-sm">1</button>
                      <button className="px-3 py-1.5 bg-white border border-blue-100 text-[10px] font-black uppercase text-blue-900 rounded-sm">Next</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* By Category Chart */}
                <div className="bg-white p-6 rounded-sm border border-blue-100 shadow-sm">
                  <h3 className="text-xs font-black text-blue-900 uppercase mb-5 border-b border-blue-50 pb-3 flex items-center">
                    <span className="mr-3">📊</span> Stock by Category
                  </h3>
                  
                  <div className="space-y-5">
                    {categories.map((cat) => (
                      <div key={cat.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">{cat.name}</span>
                          <span className="text-[10px] font-black text-blue-600">{cat.percentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div 
                            className={`h-full rounded-full ${cat.color} opacity-80`} 
                            style={{ width: `${cat.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    {categories.length === 0 && (
                      <p className="text-[10px] font-bold text-slate-400 uppercase text-center py-4 tracking-widest">No data analyzed</p>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-linear-to-b from-blue-900 to-blue-950 p-6 rounded-sm shadow-xl text-white relative overflow-hidden group">
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                   <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-blue-200 border-b border-white/10 pb-3">Inventory Ops</h3>
                   <div className="space-y-3 relative z-10">
                     <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">Add New Item</button>
                     <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">Bulk Import</button>
                     <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 border border-blue-400 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 mt-4 shadow-lg shadow-blue-500/20">Generate Report</button>
                   </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <InventoryNavbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 p-3 md:p-3 lg:p-4 pt-0 md:pt-0 lg:pt-0 overflow-y-auto no-scrollbar max-h-[calc(100vh-140px)]">
        {renderContent()}
      </div>
    </div>
  );
};

export default InventoryOverviewPage;
