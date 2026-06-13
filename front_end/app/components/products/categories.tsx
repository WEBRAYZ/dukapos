'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const CategoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('Medicine');

  const categories = [
    { image: '/ibuprofen.jpg', name: 'Medicine', count: 128 },
    { image: '/mdx-500mg.jpeg', name: 'Antibiotic', count: 34 },
    { image: '/vitamin-c.jpeg', name: 'Supplement', count: 47 },
    { image: '/bp-monitor.jpg', name: 'Device', count: 23 },
    { image: '/hand-sanitizer.jpg', name: 'Hygiene', count: 18 },
    { image: '/fifth-pulse-gloves.jpeg', name: 'Supply', count: 62 },
    { image: '/paracetamol-warning.jpeg', name: 'OTC', count: 91 },
  ];

  const categoryStats = {
    products: 5,
    totalStock: '427 units',
    retailValue: 'KSh 15,100',
    avgMargin: '53%',
  };

  const productsInCategory = [
    { image: '/paracetamol-warning.jpeg', name: 'Paracetamol 500mg', sku: 'PHM-001', price: 25, cost: 12, stock: 142, margin: '52%', status: 'Active' },
    { image: '/mdx-500mg.jpeg', name: 'Omeprazole 20mg', sku: 'PHM-004', price: 120, cost: 65, stock: 7, margin: '46%', status: 'Low' },
    { image: '/ibuprofen.jpg', name: 'Ibuprofen 400mg', sku: 'PHM-005', price: 45, cost: 20, stock: 98, margin: '56%', status: 'Active' },
    { image: '/vitamin-c.jpeg', name: 'Metformin 500mg', sku: 'PHM-006', price: 60, cost: 28, stock: 0, margin: '53%', status: 'Out' },
    { image: '/hand-sanitizer.jpg', name: 'Cetirizine 10mg', sku: 'PHM-007', price: 35, cost: 15, stock: 180, margin: '57%', status: 'Active' },
  ];

  return (
    <div className="flex gap-4 h-full overflow-hidden">
      {/* Left Sidebar: Categories List */}
      <div className="w-[350px] flex flex-col space-y-3 shrink-0 overflow-hidden">
        {/* Header & Add */}
        <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-olive uppercase">Categories ({categories.length})</h3>
            <div className="flex -space-x-1">
              {categories.slice(0, 4).map((cat, i) => (
                <div key={i} className="w-5 h-5 rounded-full bg-gray-50 border border-white flex items-center justify-center overflow-hidden shadow-sm relative">
                  <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs opacity-60">📁</span>
              <input
                type="text"
                placeholder="Category name…"
                className="w-full pl-8 pr-3 py-2 bg-slate-100 border border-transparent rounded-sm focus:none focus:bg-white focus:ring-1 focus:ring-olive transition-all font-bold text-xs"
              />
            </div>
            <button className="w-8 h-8 rounded-sm bg-linear-to-l from-blue-800 to-blue-950 text-white flex items-center justify-center font-black shadow-lg shadow-green-900/10">+</button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {categories.map((cat) => (
              <div 
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center justify-between p-3 border-b border-blue-50 cursor-pointer transition-all hover:bg-gray-50 ${selectedCategory === cat.name ? 'bg-blue-50/50 border-l-4 border-l-olive' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-sm bg-slate-100 flex items-center justify-center shadow-inner overflow-hidden relative">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-800 uppercase leading-none mb-1">{cat.name}</span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase">{cat.count} products</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1.5 text-slate-500 hover:text-blue-500 transition-colors">✎</button>
                  <button className="p-1.5 text-slate-300 hover:text-red-500 transition-colors">✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Category Detail & Products */}
      <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
        {/* Detail Header */}
        <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-xl flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-sm bg-gray-50 flex items-center justify-center shadow-inner border border-gray-100 overflow-hidden relative">
              {selectedCategory && (
                <Image 
                  src={categories.find(c => c.name === selectedCategory)?.image || '/logo.jpeg'} 
                  alt={selectedCategory} 
                  fill 
                  className="object-cover" 
                />
              )}
            </div>
            <div>
              <h2 className="text-xl font-black text-blue-800 uppercase">{selectedCategory}</h2>
              <p className="text-xs font-bold text-slate-600 uppercase">{categoryStats.products} products in this category</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-6 py-2.5 bg-slate-100 text-blue-900 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
              <span className="mr-2">✎</span> Edit
            </button>
            <button className="flex items-center px-6 py-2.5 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-olive transition-all shadow-lg shadow-green-900/10">
              <span className="mr-2 text-base leading-none">+</span> Add Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 shrink-0">
          {[
            { label: 'Products', value: categoryStats.products, icon: '📦' },
            { label: 'Total Stock', value: categoryStats.totalStock, icon: '📈' },
            { label: 'Retail Value', value: categoryStats.retailValue, icon: '💰' },
            { label: 'Avg Margin', value: categoryStats.avgMargin, icon: '📊' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-3 rounded-sm border border-blue-100 shadow-sm flex items-center space-x-3">
              <div className="w-7 h-7 rounded-sm bg-slate-100 flex items-center justify-center text-xl shadow-inner">{stat.icon}</div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{stat.label}</p>
                <h4 className="text-base font-black text-slate-800 uppercase">{stat.value}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Products Table */}
        <div className="flex-1 bg-white rounded-sm border border-blue-100 shadow-xl overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1 custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 sticky top-0 z-10 backdrop-blur-md border-b border-blue-100">
                  <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase ">Product</th>
                  <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase ">Price</th>
                  <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase ">Cost</th>
                  <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase ">Stock</th>
                  <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase ">Margin</th>
                  <th className="px-4 py-4 text-[11px] font-black text-blue-900 uppercase  text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {productsInCategory.map((product, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-7 h-7 rounded-sm bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden relative">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-800 uppercase ">{product.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase ">{product.sku}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4"><span className="text-sm font-black text-slate-800">KSh {product.price}</span></td>
                    <td className="px-8 py-4"><span className="text-sm font-bold text-slate-600">KSh {product.cost}</span></td>
                    <td className="px-8 py-4"><span className="text-sm font-black text-gray-800">{product.stock}</span></td>
                    <td className="px-8 py-4"><span className="text-xs font-black text-olive bg-green-50 px-2 py-0.5 rounded-lg">{product.margin}</span></td>
                    <td className="px-8 py-4 text-right">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                        product.status === 'Active' ? 'bg-green-100 text-green-700' : 
                        product.status === 'Low' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.status === 'Active' ? '● Active' : product.status === 'Low' ? '⚠ Low' : '✕ Out'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
