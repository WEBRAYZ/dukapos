'use client';

import React, { useState } from 'react';

const ReceiveStock = () => {
  const [selectedPO, setSelectedPO] = useState('PO-2026-0042');
  const [receivingDate, setReceivingDate] = useState('2026-05-31');
  const [reference, setReference] = useState('DN-9921');
  
  const items = [
    { sku: 'SKU-0041', product: 'Arabica Coffee Beans 1kg', ordered: 50, prev: 0, now: 50, cost: 12.40, location: 'Warehouse A' },
    { sku: 'SKU-0089', product: 'Cold Brew Concentrate 500ml', ordered: 24, prev: 0, now: 24, cost: 8.75, location: 'Warehouse A' },
    { sku: 'SKU-0112', product: 'Oat Milk Barista 1L', ordered: 60, prev: 0, now: 58, cost: 2.10, location: 'Warehouse A' },
    { sku: 'SKU-0155', product: 'Espresso Cups 80ml ×12', ordered: 10, prev: 0, now: 10, cost: 18.00, location: 'Warehouse A' },
    { sku: 'SKU-0203', product: 'Vanilla Syrup 750ml', ordered: 30, prev: 0, now: 30, cost: 6.50, location: 'Warehouse A' },
    { sku: 'SKU-0208', product: 'Caramel Sauce 500g', ordered: 20, prev: 0, now: 20, cost: 9.20, location: 'Warehouse A' },
    { sku: 'SKU-0214', product: 'Paper Cups 12oz ×50', ordered: 40, prev: 0, now: 40, cost: 7.00, location: 'Warehouse A' },
    { sku: 'SKU-0220', product: 'Lids for 12oz Cups ×100', ordered: 40, prev: 0, now: 40, cost: 4.80, location: 'Warehouse A' },
  ];

  const summary = {
    po: 'PO-2026-0042',
    supplier: 'Delta Distributors',
    totalSkus: items.length,
    totalOrdered: items.reduce((acc, item) => acc + item.ordered, 0),
    totalReceiving: items.reduce((acc, item) => acc + item.now, 0),
    totalCost: items.reduce((acc, item) => acc + (item.now * item.cost), 0),
  };

  const discrepancy = summary.totalReceiving - summary.totalOrdered;

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-800 uppercase">Receive Stock</h2>
          <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">Record incoming goods against purchase orders</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2.5 bg-white border border-blue-200 text-blue-800 rounded-sm font-black text-[10px] uppercase hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center">
            <span className="mr-2 text-sm">🔍</span> Scan Barcode
          </button>
          <button className="flex-1 md:flex-none px-6 py-2.5 bg-linear-to-l from-blue-800 to-blue-950  text-white rounded-sm font-black text-[10px] uppercase hover:bg-olive transition-all shadow-lg flex items-center justify-center">
            <span className="mr-2 text-sm">✓</span> Confirm Receipt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* PO Selection & Details */}
          <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-olive uppercase">Select Purchase Order</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-lg opacity-40 group-focus-within:opacity-100 transition-opacity">📋</span>
                  </div>
                  <select 
                    value={selectedPO}
                    onChange={(e) => setSelectedPO(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-100 border-2 border-slate-200 rounded-sm text-sm font-black text-slate-800 focus:outline-none focus:border-olive focus:bg-white transition-all appearance-none"
                  >
                    <option value="PO-2026-0042">PO-2026-0042 — Delta Distributors</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none opacity-40">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-olive uppercase">Receiving Date</label>
                <input 
                  type="date"
                  value={receivingDate}
                  onChange={(e) => setReceivingDate(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-100 border-2 border-slate-200 rounded-sm text-sm font-black text-slate-800 focus:outline-none focus:border-olive focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-olive uppercase">Received By</label>
                <div className="w-full px-6 py-4 bg-slate-100 border-2 border-slate-200 rounded-sm text-sm font-black text-slate-600">
                  Admin User
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-olive uppercase">Reference / Delivery Note</label>
                <input 
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. DN-9921"
                  className="w-full px-6 py-4 bg-slate-100 border-2 border-transparent rounded-sm text-sm font-black text-gray-800 placeholder-slate-500 focus:outline-none focus:border-olive focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-sm border border-blue-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-blue-50 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-blue-800 uppercase">Items to Receive</h3>
                <p className="text-[10px] font-bold text-slate-6400 uppercase mt-1">Enter actual quantities received</p>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-sm text-[10px] font-black uppercase hover:bg-blue-100 transition-all border border-blue-100">
                Receive All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-4 py-4 text-[10px] font-black text-blue-900 uppercase">SKU</th>
                    <th className="px-4 py-4 text-[10px] font-black text-blue-900 uppercase">Product</th>
                    <th className="px-4 py-4 text-[10px] font-black text-blue-900 uppercase text-center">Ordered</th>
                    <th className="px-4 py-4 text-[10px] font-black text-blue-900 uppercase text-center">Prev Rcvd</th>
                    <th className="px-4 py-4 text-[10px] font-black text-blue-900 uppercase text-center">Receive Now</th>
                    <th className="px-4 py-4 text-[10px] font-black text-blue-900 uppercase">Unit Cost</th>
                    <th className="px-4 py-4 text-[10px] font-black text-blue-900 uppercase">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {items.map((item) => (
                    <tr key={item.sku} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-4 py-4">
                        <span className="text-[10px] font-black text-olive uppercase">{item.sku}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs font-black text-slate-800 uppercase block max-w-[200px]">{item.product}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-bold text-slate-600">{item.ordered}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-bold text-slate-600">{item.prev}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <input 
                          type="number"
                          defaultValue={item.now}
                          className="w-14 px-2 py-2 bg-slate-100 border-2 border-slate-200 rounded-sm text-sm font-black text-center text-olive focus:outline-none focus:border-olive focus:bg-white transition-all"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-black text-slate-800">${item.cost.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-[10px] font-black text-slate-500 uppercase">{item.location}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Summary & Notes */}
        <div className="space-y-3">
          {/* Receipt Summary */}
          <div className="bg-linear-to-l from-blue-800 to-blue-950 p-4 rounded-sm shadow-xl text-white">
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">Receipt Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-black text-blue-200 uppercase">
                <span>{summary.po}</span>
                <span>{summary.supplier}</span>
              </div>
              
              <div className="space-y-3 bg-black/10 p-3 rounded-sm border border-blue-50">
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold text-white/60 uppercase">Total SKUs</span>
                  <span className="text-xs font-black">{summary.totalSkus} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold text-white/60 uppercase">Total Units Ordered</span>
                  <span className="text-xs font-black">{summary.totalOrdered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] font-bold text-white/60 uppercase">Total Units Receiving</span>
                  <span className="text-xs font-black">{summary.totalReceiving}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-50">
                  <span className="text-[10px] font-bold text-blue-200 uppercase">Discrepancy</span>
                  <span className={`text-xs font-black ${discrepancy < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {discrepancy < 0 ? discrepancy : `+${discrepancy}`} units
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center pt-2">
                <span className="text-[10px] font-black text-white/40 uppercase mb-1">Receipt Total</span>
                <span className="text-3xl font-black text-white">${summary.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <button className="w-full py-4 bg-linear-to-l from-blue-500 to-blue-700 hover:bg-blue-600 rounded-sm text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-black/20 mt-4">
                ✓ Confirm Receipt
              </button>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-blue-100">
                Save as Draft
              </button>
            </div>
          </div>

          {/* Notes & Documents */}
          <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-xl space-y-3">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-olive uppercase">Notes</label>
              <textarea 
                className="w-full px-6 py-4 bg-slate-100 border-2 border-slate-200 rounded-sm text-xs font-bold text-slate-800 placeholder-slate-600 focus:outline-none focus:bg-white transition-all h-28 resize-none"
                placeholder="Receiving Notes"
                defaultValue="2 units of Oat Milk Barista damaged in transit. Photographed and reported to supplier."
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-800 uppercase">Attach Documents</label>
              <div className="w-full px-3 py-5 bg-slate-100 border-2 border-dashed border-blue-200 rounded-sm flex flex-col items-center justify-center group transition-all cursor-pointer">
                <span className="text-2xl mb-1 grayscale group-hover:grayscale-0 transition-all">📎</span>
                <span className="text-[10px] font-black text-slate-600 uppercase group-hover:text-blue-800">Drop files or click to upload</span>
              </div>
            </div>
          </div>

          {/* Order Activity */}
          <div className="bg-white p-3 rounded-sm border border-blue-100 shadow-xl">
             <h3 className="text-sm font-black text-blue-800 uppercase mb-4">Order Activity</h3>
             <div className="space-y-4">
               {[
                 { action: 'PO Created', date: 'May 28, 10:45 AM', user: 'Admin' },
                 { action: 'PO Approved', date: 'May 29, 02:20 PM', user: 'Manager' },
                 { action: 'Delivery Scheduled', date: 'May 30, 09:00 AM', user: 'Supplier' },
               ].map((activity, i) => (
                 <div key={i} className="flex items-start space-x-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5" />
                   <div>
                     <p className="text-[10px] font-black text-slate-800 uppercase">{activity.action}</p>
                     <p className="text-[9px] font-bold text-slate-600 uppercase mt-0.5">{activity.date} • {activity.user}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveStock;
