'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';
import ProductsNavbar from '@/app/components/products/navbar';
import AddProduct from '@/app/components/products/add';
import CategoryManagement from '@/app/components/products/categories';
import BarcodeManager from '@/app/components/products/barcodemanager';

const ProductsPage = () => {
  const [view, setView] = useState('Products List');
  const [activeCategory, setActiveCategory] = useState('All');
  const [layout, setLayout] = useState<'list' | 'grid'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState(['All']);
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          api.get<any[]>('/products/'),
          api.get<any[]>('/products/categories/'),
        ]);
        setProductList(productsData);
        setCategories(['All', ...categoriesData.map((c: any) => c.name)]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = (newProduct: any) => {
    setProductList([newProduct, ...productList]);
  };

  const getStats = () => {
    const total = productList.length;
    const active = productList.filter(p => p.status === 'Active' || p.status === 'active').length;
    const lowStock = productList.filter(p => p.stock_quantity > 0 && p.stock_quantity <= p.low_stock_threshold).length;
    const outOfStock = productList.filter(p => p.stock_quantity <= 0).length;
    const inventoryValue = productList.reduce((acc, p) => acc + (p.stock_quantity * p.cost_price), 0);

    return [
      { label: 'Total Products', value: total.toString(), icon: '📦', color: 'bg-yellow-50 text-yellow-600' },
      { label: 'Active', value: active.toString(), icon: '✅', color: 'bg-green-50 text-green-600' },
      { label: 'Low Stock', value: lowStock.toString(), icon: '⚠', color: 'bg-orange-50 text-orange-600' },
      { label: 'Out of Stock', value: outOfStock.toString(), icon: '✕', color: 'bg-red-50 text-red-600' },
      { label: 'Inventory Value', value: `KSh ${inventoryValue.toLocaleString()}`, icon: '💰', color: 'bg-olive/10 text-olive' },
    ];
  };

  const stats = getStats();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active': return <span className="text-green-600 flex items-center space-x-1"><span>●</span> <span className="text-[10px] font-black uppercase tracking-tighter">Active</span></span>;
      case 'Out': return <span className="text-red-600 flex items-center space-x-1"><span>✕</span> <span className="text-[10px] font-black uppercase tracking-tighter">Out</span></span>;
      case 'Low': return <span className="text-blue-500 flex items-center space-x-1"><span>⚠</span> <span className="text-[10px] font-black uppercase tracking-tighter">Low</span></span>;
      case 'Critical': return <span className="text-red-700 flex items-center space-x-1 font-black"><span>!!</span> <span className="text-[10px] font-black uppercase tracking-tighter">Critical</span></span>;
      default: return <span>{status}</span>;
    }
  };

  const renderContent = () => {
    if (view === 'Products List') {
      return (
        <div className="flex flex-col space-y-4 p-3 md:p-4 lg:p-4 pt-0 md:pt-0 lg:pt-0">
          {/* Actions & Search Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3 bg-white p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm shrink-0">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center flex-1 gap-3 md:gap-4">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search products…"
                  className="block w-full pl-12 pr-4 py-3 bg-gray-100 border border-blue-100 rounded-sm leading-5 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-900 transition-all font-bold text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select className="flex-1 sm:flex-none bg-gray-100 border-none rounded-sm px-4 py-3 text-[10px] font-black uppercase text-gray-700 focus:ring-1 focus:ring-blue-900 outline-none">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Low Stock</option>
                </select>

                <select className="flex-1 sm:flex-none bg-gray-100 border-none rounded-sm px-4 py-3 text-[10px] font-black uppercase text-gray-700 focus:ring-1 focus:ring-blue-900 outline-none">
                  <option>Sort: Name</option>
                  <option>Sort: Price</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between lg:justify-end space-x-3">
              <div className="flex bg-gray-100 p-1 rounded-sm border border-blue-100">
                <button 
                  onClick={() => setLayout('list')}
                  className={`px-3 py-2 rounded-sm transition-all ${layout === 'list' ? 'bg-white shadow-sm' : 'text-gray-700 hover:text-gray-800'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button 
                  onClick={() => setLayout('grid')}
                  className={`px-3 py-2 rounded-sm transition-all ${layout === 'grid' ? 'bg-white shadow-sm' : 'text-gray-700 hover:text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
              <button 
                onClick={() => setView('Add / Edit')}
                className="flex-1 lg:flex-none flex items-center justify-center px-6 py-2 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-xs uppercase hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
              >
                <span className="mr-2 text-lg">+</span> Add Product
              </button>
            </div>
          </div>

          {/* Category Row */}
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide shrink-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase transition-all whitespace-nowrap shadow-sm border ${
                  activeCategory === cat 
                    ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white border-blue-900 shadow-blue-200' 
                    : 'bg-slate-100 text-blue-800 hover:bg-gray-200 border-blue-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 shrink-0">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex items-center space-x-3 group hover:shadow-sm transition-all cursor-default">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-sm flex items-center justify-center text-xl md:text-2xl ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-700 uppercase">{stat.label}</p>
                  <h4 className="text-sm md:text-base font-black text-blue-800">{stat.value}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Product Content Area */}
          <div className="flex flex-col">
            {layout === 'list' ? (
              <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col">
                <div className="overflow-x-auto custom-scrollbar no-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md border-b border-gray-100">
                        <th className="px-3 py-3 text-[10px] font-black text-blue-900 uppercase">Product</th>
                        <th className="px-3 py-3 text-[10px] font-black text-blue-900 uppercase hidden md:table-cell">Category</th>
                        <th className="px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-center">Price</th>
                        <th className="px-3 py-3 text-[10px] font-black text-blue-900 uppercase hidden lg:table-cell">Cost</th>
                        <th className="px-3 py-3 text-[10px] font-black text-blue-900 uppercase hidden lg:table-cell">Margin</th>
                        <th className="px-3 py-3 text-[10px] font-black text-blue-900 uppercase">Stock</th>
                        <th className="px-3 py-3 text-[10px] font-black text-blue-900 uppercase hidden md:table-cell">Expiry</th>
                        <th className="px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-center">Status</th>
                        <th className="px-3 py-3 text-[10px] font-black text-blue-900 uppercase text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {productList
                        .filter(p => (activeCategory === 'All' || p.category_name === activeCategory) && 
                          (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.barcode?.toLowerCase().includes(searchQuery.toLowerCase())))
                        .map((product, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                          <td className="px-3 py-3 md:py-3">
                            <div className="flex items-center space-x-3">
                              <div className="relative w-10 h-10 rounded-sm bg-gray-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform overflow-hidden shadow-inner">
                                {product.image ? (
                                  <Image 
                                    src={product.image} 
                                    alt={product.name} 
                                    fill 
                                    className="object-cover"
                                  />
                                ) : (
                                  <span className="text-sm">📦</span>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-black text-blue-800 uppercase">{product.name}</span>
                                <span className="text-[10px] font-bold text-gray-600 uppercase">{product.sku}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3 md:py-3 hidden md:table-cell">
                            <span className="px-3 py-1 bg-gray-100 text-gray-900 rounded-full text-[9px] font-black uppercase">
                              {product.category_name}
                            </span>
                          </td>
                          <td className="px-3 py-3 md:py-3">
                            <span className="text-sm font-black text-gray-800">KSh {Number(product.selling_price).toLocaleString()}</span>
                          </td>
                          <td className="px-3 py-3 md:py-3 hidden lg:table-cell">
                            <span className="text-sm font-bold text-gray-700">KSh {Number(product.cost_price).toLocaleString()}</span>
                          </td>
                          <td className="px-3 py-3 md:py-3 hidden lg:table-cell">
                            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                              {product.selling_price > 0 ? Math.round(((product.selling_price - product.cost_price) / product.selling_price) * 100) : 0}%
                            </span>
                          </td>
                          <td className="px-3 py-3 md:py-3">
                            <div className="flex flex-col">
                              <span className={`text-sm font-black ${product.stock_quantity <= product.low_stock_threshold ? 'text-blue-500' : 'text-gray-800'}`}>
                                {product.stock_quantity}
                              </span>
                              <span className="text-[10px] font-bold text-gray-700 uppercase">re: {product.low_stock_threshold}</span>
                            </div>
                          </td>
                          <td className="px-3 py-3 md:py-3 hidden md:table-cell">
                            <span className="text-[10px] font-bold text-gray-800 uppercase">N/A</span>
                          </td>
                          <td className="px-3 py-3 md:py-3 text-center">
                            <div className="flex justify-center">
                              {getStatusBadge(product.status)}
                            </div>
                          </td>
                          <td className="px-3 py-3 md:py-3">
                            <div className="flex items-center justify-center space-x-3">
                              <button className="text-[10px] font-black uppercase text-blue-900 hover:text-blue-700 transition-colors">Edit</button>
                              <button className="text-[10px] font-black uppercase text-red-400 hover:text-red-600 transition-colors">Del</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="custom-scrollbar pr-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 pb-3">
                  {productList
                    .filter(p => (activeCategory === 'All' || p.category_name === activeCategory) && 
                      (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.barcode?.toLowerCase().includes(searchQuery.toLowerCase())))
                    .map((product, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm hover:shadow-sm hover:border-blue-500/30 transition-all group flex flex-col h-full relative overflow-hidden"
                    >
                      {/* Product Image Background */}
                      <div className="h-40 sm:h-48 w-full relative overflow-hidden bg-gray-50">
                        {product.image && (
                          <Image 
                            src={product.image} 
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform">
                            <button className="bg-white text-blue-900 p-2 rounded-sm shadow-lg hover:scale-110 transition-all">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button className="bg-white text-red-600 p-2 rounded-sm shadow-lg hover:scale-110 transition-all">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 bg-slate-100 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-blue-900 shadow-sm border border-white/20">
                            {product.sku}
                          </span>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-sm shadow-sm">
                            {getStatusBadge(product.status)}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[9px] font-black text-blue-700 uppercase bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                            {product.category_name}
                          </span>
                        </div>
                        <p className="text-xs font-black text-blue-900 uppercase mb-2 line-clamp-2">
                          {product.name}
                        </p>
                        
                        <div className="mt-auto space-y-3 pt-3 border-t border-blue-50">
                          <div className="flex justify-between items-end">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-gray-700 uppercase ">Sale Price</span>
                              <span className="text-sm font-black text-gray-800">KSh {Number(product.selling_price).toLocaleString()}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-black text-gray-700 uppercase">In Stock</span>
                              <p className={`text-xs font-black ${product.stock_quantity <= product.low_stock_threshold ? 'text-green-500' : 'text-blue-900'}`}>
                                {product.stock_quantity} Units
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center py-2.5 bg-gray-100 rounded-sm px-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-gray-700 uppercase">Margin</span>
                              <span className="text-[11px] font-black text-blue-600">
                                {product.selling_price > 0 ? Math.round(((product.selling_price - product.cost_price) / product.selling_price) * 100) : 0}%
                              </span>
                            </div>
                            <div className="h-6 w-px bg-gray-200" />
                            <div className="flex flex-col text-right">
                              <span className="text-[10px] font-black text-gray-700 uppercase">Unit Cost</span>
                              <span className="text-[11px] font-black text-gray-600">KSh {Number(product.cost_price).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else if (view === 'Add / Edit') {
      return <AddProduct onBack={() => setView('Products List')} onAdd={handleAddProduct} />;
    } else if (view === 'Categories') {
      return <CategoryManagement />;
    } else if (view === 'Barcode Manager') {
      return <BarcodeManager />;
    } else {
      return (
        <div className="h-full flex items-center justify-center p-4">
          <div className="text-center space-y-4 bg-white p-5 rounded-sm shadow-sm border border-blue-100 max-w-sm w-full">
            <div className="text-6xl grayscale opacity-50 mb-4">⚙️</div>
            <h3 className="text-sm font-black text-gray-800 uppercase">{view} Coming Soon</h3>
            <p className="text-[10px] font-bold text-gray-700 uppercase">This module is currently under development for our retail partners.</p>
            <button onClick={() => setView('Products List')} className="w-full py-3 bg-blue-900 text-white rounded-sm text-[10px] font-black uppercase shadow-lg">Back to List</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-blue-50 overflow-hidden">
        <ProductsNavbar currentView={view} onViewChange={setView} />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {renderContent()}
        </div>
    </div>
  );
};

export default ProductsPage;
