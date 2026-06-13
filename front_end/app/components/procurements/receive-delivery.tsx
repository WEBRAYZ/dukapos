'use client';

import React, { useState } from 'react';

/**
 * ReceiveDelivery Component
 * 
 * Handles the process of receiving goods from suppliers, reconciling physical 
 * counts with purchase orders.
 */
const ReceiveDelivery = () => {
  const [receivingPO, setReceivingPO] = useState<string | null>('PO-2024-089');
  const [currentStep] = useState(2); // 1: Scan, 2: Count, 3: Confirm

  const pendingPOs = [
    { id: 'PO-2024-089', supplier: 'TechWorld Distributors', expected: '02 Jun 2024', status: 'Approved' },
    { id: 'PO-2024-088', supplier: 'Nairobi General Supplies', expected: '01 Jun 2024', status: 'Partial' },
    { id: 'PO-2024-084', supplier: 'Athi River Goods', expected: '03 Jun 2024', status: 'Approved' },
  ];

  const itemsToReceive = [
    { name: 'Samsung A55 5G', sku: 'SAM-A55-128GB', expected: 20, received: 20 },
    { name: 'Tecno Spark 20', sku: 'TEC-SP20-128', expected: 35, received: 33 },
    { name: 'Anker 65W Charger', sku: 'ANK-65W-USB', expected: 50, received: 50 },
  ];

  return (
    <div className="flex flex-col h-full space-y-8 overflow-y-auto custom-scrollbar pr-2">
      
      {/* AWAITING DELIVERY LEDGER */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">Awaiting Delivery</h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">6 POs</span>
        </div>
        <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50">
              <tr className="border-b border-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">PO Number</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4">Expected</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pendingPOs.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-black text-gray-800">{po.id}</td>
                  <td className="px-6 py-4 text-xs font-black text-olive uppercase">{po.supplier}</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">{po.expected}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                      po.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setReceivingPO(po.id)}
                      className="bg-olive text-white px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-olive transition-all"
                    >
                      Receive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECEIVE WORKFLOW */}
      {receivingPO && (
        <div className="space-y-6 bg-white border border-gray-100 rounded-[40px] p-8 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Receive: {receivingPO}</h3>
            
            {/* Step Indicator */}
            <div className="flex items-center space-x-6">
              {[
                { n: 1, label: 'Scan' },
                { n: 2, label: 'Count' },
                { n: 3, label: 'Confirm' }
              ].map((step) => (
                <div key={step.n} className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                    currentStep > step.n ? 'bg-green-500 text-white' : 
                    currentStep === step.n ? 'bg-olive text-white shadow-lg shadow-green-100' : 
                    'bg-gray-100 text-gray-300'
                  }`}>
                    {currentStep > step.n ? '✓' : step.n}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    currentStep === step.n ? 'text-olive' : 'text-gray-300'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {itemsToReceive.map((item) => (
              <div key={item.sku} className="flex items-center justify-between p-5 bg-gray-50 rounded-3xl border border-transparent hover:border-gray-200 transition-all group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                    📱
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-gray-800 uppercase tracking-tight">{item.name}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.sku}</p>
                    <p className="text-[10px] font-black text-olive uppercase tracking-tighter mt-1">Expected: {item.expected}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="flex flex-col items-center">
                    <input 
                      type="number" 
                      defaultValue={item.received}
                      className={`w-20 px-3 py-2 bg-white border-2 rounded-xl text-center font-black text-sm outline-none transition-all ${
                        item.received === item.expected ? 'border-green-100 text-green-600 focus:border-green-500' : 'border-orange-100 text-orange-600 focus:border-orange-500'
                      }`}
                    />
                    <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1">Received</span>
                  </div>
                  {item.received !== item.expected && (
                    <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 text-xs font-black">
                      -{item.expected - item.received}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
             <button className="px-8 py-3 bg-gray-50 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                Save Draft
             </button>
             <button className="px-10 py-3 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-md shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95">
                Confirm Receipt
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiveDelivery;
