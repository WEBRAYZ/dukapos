'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';

const BarcodeManager = () => {
  const [selectedProduct, setSelectedProduct] = useState('001');
  const [format, setFormat] = useState('EAN-13');
  const [size, setSize] = useState('2x1 inch');

  const [barcodePattern] = useState(() => {
    return [...Array(40)].map(() => ({
      width: Math.random() > 0.7 ? '2px' : '1px',
      height: Math.random() > 0.2 ? '80%' : '70%',
      opacity: Math.random() > 0.1 ? 1 : 0.4
    }));
  });

  const products = [
    { id: '001', image: '/paracetamol-warning.jpeg', name: 'Paracetamol 500mg', sku: 'PHM-001', barcode: '6900000000001', type: 'EAN-13', price: '25' },
    { id: '002', image: '/mdx-500mg.jpeg', name: 'Amoxicillin 250mg', sku: 'PHM-002', barcode: '6900000000002', type: 'EAN-13', price: '180' },
    { id: '003', image: '/vitamin-c.jpeg', name: 'Vitamin C 1000mg', sku: 'PHM-003', barcode: '6900000000003', type: 'EAN-13', price: '95' },
    { id: '004', image: '/ibuprofen.jpg', name: 'Omeprazole 20mg', sku: 'PHM-004', barcode: '6900000000004', type: 'EAN-13', price: '120' },
    { id: '005', image: '/bp-monitor.jpg', name: 'BP Monitor', sku: 'DEV-001', barcode: '6900000000005', type: 'EAN-13', price: '4500' },
    { id: '006', image: '/hand-sanitizer.jpg', name: 'Hand Sanitizer 500ml', sku: 'HYG-001', barcode: '6900000000006', type: 'EAN-13', price: '220' },
    { id: '007', image: '/fifth-pulse-gloves.jpeg', name: 'Surgical Gloves', sku: 'SUP-001', barcode: '6900000000007', type: 'EAN-13', price: '350' },
    { id: '008', image: '/ibuprofen.jpg', name: 'Ibuprofen 400mg', sku: 'PHM-005', barcode: '6900000000008', type: 'EAN-13', price: '45' },
    { id: '009', image: '/infrared-thermometer.jpeg', name: 'Thermometer Digital', sku: 'DEV-002', barcode: '6900000000009', type: 'EAN-13', price: '1200' },
    { id: '010', image: '/mdx-500mg.jpeg', name: 'Metformin 500mg', sku: 'PHM-006', barcode: '6900000000010', type: 'EAN-13', price: '60' },
    { id: '011', image: '/paracetamol-warning.jpeg', name: 'Cetirizine 10mg', sku: 'PHM-007', barcode: '6900000000011', type: 'EAN-13', price: '35' },
    { id: '012', image: '/vitamin-c.jpeg', name: 'Strepsils Lemon', sku: 'SUP-002', barcode: '6900000000012', type: 'EAN-13', price: '85' },
  ];

  const activeProduct = products.find(p => p.id === selectedProduct) || products[0];

  return (
    <div className="flex gap-3 p-5 h-full overflow-hidden">
      {/* Left Column: Product Selection */}
      <div className="flex-1 flex flex-col bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden shrink-0">
        <div className="p-3 border-b border-blue-50 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-olive uppercase">Barcode Manager</h3>
            <div className="flex items-center space-x-2">
              <button className="flex items-center px-4 py-2 bg-slate-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-600 hover:bg-gray-100 transition-all">
                <span>🖨</span>
                <span className="ml-2">Bulk Print Selected</span>
              </button>
              <button className="flex items-center px-4 py-2 bg-slate-100 border border-blue-100 rounded-sm text-[10px] font-black uppercase text-gray-600 hover:bg-gray-100 transition-all">
                <span>⬇</span>
                <span className="ml-2">Export All</span>
              </button>
            </div>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-700">⌕</span>
            <input
              type="text"
              placeholder="Search product, barcode or SKU…"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-blue-100 rounded-sm focus:none focus:bg-white focus:ring-1 focus:ring-olive transition-all font-bold text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 sticky top-0 backdrop-blur-sm border-b border-blue-100">
              <tr>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Product</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">SKU</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Barcode</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Type</th>
                <th className="px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr 
                  key={p.id} 
                  onClick={() => setSelectedProduct(p.id)}
                  className={`hover:bg-gray-50/50 cursor-pointer transition-colors ${selectedProduct === p.id ? 'bg-blue-50/50' : ''}`}
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-sm bg-slate-50 flex items-center justify-center overflow-hidden relative shadow-inner">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <span className="text-xs font-black text-gray-800 uppercase">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3"><span className="text-[11px] font-bold text-gray-600 uppercase">{p.sku}</span></td>
                  <td className="px-3 py-3"><span className="text-xs font-bold text-gray-600 font-mono">{p.barcode}</span></td>
                  <td className="px-3 py-3"><span className="text-[11px] font-black text-olive bg-blue-100 px-2 py-0.5 rounded-full uppercase">{p.type}</span></td>
                  <td className="px-3 py-3 text-center">
                    <button className="text-[10px] font-black text-gray-700 hover:text-olive uppercase underline">Print</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column: Label Preview & Settings */}
      <div className="w-[400px] flex flex-col space-y-3 shrink-0 overflow-hidden">
        {/* Settings */}
        <div className="bg-white p-4 rounded-sm border border-blue-100 shadow-sm space-y-4">
          <div>
            <h4 className="text-lg font-black text-gray-800 uppercase">{activeProduct.name}</h4>
            <p className="text-[10px] font-bold text-gray-700 uppercase">
              {activeProduct.sku} · Barcode: {activeProduct.barcode}
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-3">
              <label className="block text-[12px] font-black text-gray-700 uppercase">Barcode Format</label>
              <div className="grid grid-cols-2 gap-2">
                {['EAN-13', 'CODE-128', 'QR Code', 'Code 39'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`py-2.5 rounded-sm text-[10px] font-black uppercase transition-all ${format === f ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-md' : 'bg-slate-200 text-blue-800 border border-blue-200'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[12px] font-black text-gray-700 uppercase">Label Size</label>
              <div className="grid grid-cols-2 gap-2">
                {['A4', '2x1 inch', '3x2 inch', 'label'].map(s => (
                  <button 
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2.5 rounded-sm text-[10px] font-black uppercase transition-all ${size === s ? 'bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-md' : 'bg-slate-200 text-blue-800 border border-blue-200'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="flex-1 bg-slate-200/50 rounded-sm border border-dashed border-blue-300 p-4 flex items-center justify-center relative group">
          <div className="absolute top-4 left-6 text-[13px] font-black text-blue-700 uppercase opacity-80">
            {size === 'label' ? 'High-Visibility (Big Barcode)' : 'High-Fidelity Preview'}
          </div>
          
          {size === 'label' ? (
            /* BIG BARCODE LAYOUT */
            <div className="bg-white shadow-sm w-[320px] p-0 flex flex-col border border-blue-900 scale-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden rounded-md">
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start border-b-2 border-blue-900 pb-3">
                  <div className="flex-1">
                    <h5 className="text-sm font-black uppercase text-blue-900">
                      {activeProduct.name}
                    </h5>
                    <p className="text-[10px] font-bold text-blue-700 uppercase">{activeProduct.sku}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] font-black text-white bg-blue-900 px-2 py-0.5 rounded-full inline-block uppercase mb-1">Price</div>
                    <div className="text-2xl font-black text-slate-900">KSh {activeProduct.price}</div>
                  </div>
                </div>

                <div className="py-4 flex-1 flex flex-col items-center justify-center space-y-3">
                  {/* HUGE BARCODE */}
                  <div className="h-28 w-full flex items-end justify-center gap-[1.5px] px-2 overflow-hidden">
                    {[...Array(60)].map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-black" 
                        style={{ 
                          width: `${i % 7 === 0 ? '4px' : i % 3 === 0 ? '2.5px' : '1px'}`,
                          height: '100%',
                        }} 
                      />
                    ))}
                  </div>
                  <div className="text-2xl font-mono font-black text-black bg-white px-4 -mt-4">
                    {activeProduct.barcode}
                  </div>
                </div>

                <div className="flex justify-between items-end border-t-2 border-slate-900 pt-3">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-700 uppercase">Department</span>
                    <span className="text-[10px] font-black text-slate-900 uppercase">Pharmacy / OTC</span>
                  </div>
                  <div className="text-[10px] font-black text-white bg-slate-900 px-3 py-1 rounded-sm uppercase">
                    STOCK ITEM: {activeProduct.id}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STANDARD HIGH-FIDELITY LAYOUT */
            <div className="bg-white shadow-2xl w-[300px] p-0 flex flex-col items-center text-center border border-blue-200 scale-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden rounded-sm">
              {/* Store Header */}
              <div className="w-full bg-slate-900 py-2 px-4 flex justify-between items-center">
                <span className="text-[8px] font-black text-white uppercase uppercase tabular-nums">{new Date().toLocaleDateString()}</span>
              </div>

              <div className="p-4 w-full space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-700 uppercase">{activeProduct.sku}</p>
                  <h5 className="text-sm font-black uppercase text-blue-800 min-h-10 flex items-center justify-center">
                    {activeProduct.name}
                  </h5>
                </div>
                
                <div className="flex items-baseline justify-center gap-1 border-y border-blue-100 py-3">
                  <span className="text-[10px] font-black text-slate-800">KSh</span>
                  <span className="text-3xl font-black text-blue-900">{activeProduct.price}</span>
                  <span className="text-[10px] font-bold text-slate-800">.00</span>
                </div>
                
                <div className="w-full space-y-2 pt-2">
                  {/* Simulated CSS Barcode */}
                  <div className="h-14 w-full flex items-end justify-center gap-px px-2 overflow-hidden">
                    {barcodePattern.map((style, i) => (
                      <div 
                        key={i} 
                        className="bg-blue-900" 
                        style={style} 
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[8px] font-black text-slate-700 uppercase">EAN-13 GEN</span>
                    <div className="text-[11px] font-mono font-black text-slate-900 pl-4">{activeProduct.barcode}</div>
                    <span className="text-[8px] font-black text-slate-800 uppercase">ORIGIN-KE</span>
                  </div>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="w-full bg-slate-50 border-t border-slate-100 py-1.5 px-4">
                <p className="text-[9px] font-bold text-slate-900 uppercase italic">Professional Pharmaceutical Labeling System</p>
              </div>
            </div>
          )}
        </div>

        <button className="w-full py-4 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-xs uppercase shadow-lg shadow-green-900/20 hover:bg-olive transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center">
          <span className="mr-2 text-lg">🖨</span>
          Generate & Print
        </button>
      </div>
    </div>
  );
};

export default BarcodeManager;
