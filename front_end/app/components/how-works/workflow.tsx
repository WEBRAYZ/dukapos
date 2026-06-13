'use client';

import React from 'react';

const HowItWorksWorkflow = () => {
  const steps = [
    {
      id: '01',
      title: 'Product Management',
      subtitle: 'Build your catalogue.',
      description: 'Start by loading your products into Nexus. Import thousands of SKUs in seconds, set up variants, assign barcodes, and define pricing tiers. Your entire product universe — organized, searchable, and always up to date.',
      features: ['Bulk CSV Import', 'SKU & Barcode Gen', 'Variants & Bundles', 'Price Rules'],
      preview: (
        <div className="bg-white rounded-sm border border-blue-200 overflow-hidden shadow-lg">
          <div className="p-3 border-b border-blue-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-600">Products — Catalogue</span>
          </div>
          <div className="p-3 overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead>
                <tr className="text-slate-600 uppercase border-b border-blue-100">
                  <th className="pb-3 font-black">Product</th>
                  <th className="pb-3 font-black">SKU</th>
                  <th className="pb-3 font-black">Stock</th>
                  <th className="pb-3 font-black">Price</th>
                  <th className="pb-3 font-black">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b border-blue-100">
                  <td className="py-3 font-bold">Trail Runner X2</td>
                  <td className="py-3 uppercase text-slate-600">SPT-1104</td>
                  <td className="py-3">84</td>
                  <td className="py-3">$129.99</td>
                  <td className="py-3"><span className="text-blue-600 font-bold">● Active</span></td>
                </tr>
                <tr className="border-b border-blue-100">
                  <td className="py-3 font-bold">Wireless Headphones</td>
                  <td className="py-3 uppercase text-slate-600">ELC-2201</td>
                  <td className="py-3 text-blue-600">3</td>
                  <td className="py-3">$149.99</td>
                  <td className="py-3"><span className="text-blue-600 font-bold">● Low Stock</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-bold">USB-C Hub 7-in-1</td>
                  <td className="py-3 uppercase text-slate-600">ELC-3310</td>
                  <td className="py-3">41</td>
                  <td className="py-3">$55.00</td>
                  <td className="py-3"><span className="text-blue-600 font-bold">● Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: '02',
      title: 'Sales Processing',
      subtitle: 'Sell faster, never miss a beat.',
      description: 'Your sales team works from a blazing-fast POS interface. Scan products, apply discounts, split bills, and handle complex orders in seconds. Every sale is logged, categorized, and linked to inventory in real time.',
      features: ['Barcode Scanner', 'Discount Engine', 'Split Payments', 'Hold & Resume'],
      preview: (
        <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm max-w-sm mx-auto">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-600">POS — Order #ORD-8815</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-3">
              {[
                { name: 'Trail Runner X2 (UK 9)', price: '$129.99' },
                { name: 'USB-C Hub 7-in-1', price: '$55.00' },
                { name: 'Wireless Earbuds', price: '$89.99' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center group">
                  <span className="text-xs font-bold text-slate-700">{item.name}</span>
                  <span className="text-xs font-black text-slate-900">{item.price}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-blue-100 space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold text-blue-600">
                <span>Discount (LOYAL10)</span>
                <span>-$27.50</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold text-slate-600">
                <span>Tax (9%)</span>
                <span>$22.28</span>
              </div>
              <div className="flex justify-between text-lg font-black text-slate-900 pt-2">
                <span>Total</span>
                <span className="text-blue-500">$269.76</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '03',
      title: 'Payment Processing',
      subtitle: 'Every payment, every method.',
      description: 'Accept cash, cards, digital wallets, and store credit — all in one flow. Nexus integrates with major payment processors, handles split-tender transactions, and reconciles every cent automatically at shift close.',
      features: ['Card & Contactless', 'Stripe / Square', 'Store Credit', 'Auto-Reconcile'],
      preview: (
        <div className="bg-white rounded-sm border border-blue-100 overflow-hidden shadow-sm max-w-sm mx-auto">
          <div className="p-4 border-b border-blue-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-600">Payment — $269.76</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="text-center space-y-1">
              <p className="text-[9px] font-black uppercase text-slate-600">Select Payment Method</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '💳', name: 'Card' },
                { icon: '📱', name: 'Tap to Pay' },
                { icon: '💵', name: 'Cash' },
                { icon: '🏷️', name: 'Store Credit' },
                { icon: '🔗', name: 'Split' },
                { icon: '📲', name: 'QR Pay' }
              ].map((m, i) => (
                <div key={i} className={`p-3 rounded-sm border flex flex-col items-center space-y-2 transition-all cursor-pointer ${i === 0 ? 'bg-olive border-olive text-white' : 'bg-slate-50 border-slate-100 hover:border-blue-200 text-slate-600'}`}>
                  <span className="text-lg">{m.icon}</span>
                  <span className="text-[8px] font-black uppercase">{m.name}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-sm flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-xl">💳</span>
                <span className="text-[10px] font-black uppercase text-slate-700">Card ending 4242</span>
              </div>
              <span className="text-[10px] font-black text-blue-600">$269.76 ✓</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '04',
      title: 'Data Synchronisation',
      subtitle: 'All locations. One truth.',
      description: 'Every sale, return, and inventory change propagates instantly across all your locations, channels, and integrations. Whether you have one store or twenty, every terminal sees the same live data — zero lag, zero drift.',
      features: ['Real-time Sync', 'Multi-location', 'Offline Mode', 'Webhook API'],
      preview: (
        <div className="bg-white rounded-sm border border-blue-100 overflow-hidden shadow-sm max-w-sm mx-auto">
          <div className="p-3 border-b border-blue-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-600">Sync Status — Live</span>
          </div>
          <div className="py-5 gap-6">
            <div className="flex items-center justify-center py-3 space-x-8">
              <div className="w-12 h-12 rounded-sm bg-blue-50 border border-blue-200 flex flex-col items-center justify-center space-y-1 text-slate-400">
                <span className="text-lg">🏪</span>
                <span className="text-[7px] font-black uppercase text-slate-800">Store A</span>
              </div>
              <div className="flex w-12 h-12 rounded-sm bg-blue-50 border border-blue-200 flex-col items-center ">
                <span className="text-xl text-blue-800 animate-pulse">⇄</span>
                <span className="text-[12px] font-black uppercase text-slate-700">⚡</span>
              </div>
              <div className="w-12 h-12 rounded-sm  bg-blue-500 flex flex-col items-center justify-center shadow-lg shadow-orange-900/10 scale-110 text-white">
                <span className="text-sm">Nexus</span>
                <span className="text-[7px] font-black uppercase text-white/90">Core</span>
              </div>
              <div className="flex w-12 h-12 rounded-sm bg-slate-200 flex-col items-center">
                <span className="text-lg text-blue-800 animate-pulse">⇄</span>
                <span className="text-[12px] font-black uppercase text-slate-700">🏬</span>
              </div>
              <div className="w-12 h-12 rounded-sm bg-blue-50 border border-blue-200 flex flex-col items-center justify-center space-y-1 text-slate-400">
                <span className="text-lg">🌐</span>
                <span className="text-[7px] font-black uppercase text-slate-800">Online</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 border-t border-blue-100 pt-5">
              <div className="space-y-1 text-center">
                <p className="text-[9px] font-black uppercase text-slate-900">Last sync</p>
                <p className="text-xs font-black text-slate-900">0.3s ago</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-[8px] font-black uppercase text-slate-900">Events</p>
                <p className="text-xs font-black text-slate-900">1,204</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-[8px] font-black uppercase text-slate-900">Health</p>
                <p className="text-xs font-black text-green-600 uppercase">● Nominal</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: '05',
      title: 'Daily Operations',
      subtitle: 'Run the day. Own the data.',
      description: 'Close the loop on daily operations with shift management, cash reconciliation, audit logs, backup scheduling, and returns processing. Everything your team needs to open, run, and close a shift — without guesswork.',
      features: ['Shift Management', 'Audit Logs', 'Returns & Refunds', 'Backup & Recovery'],
      preview: (
        <div className="bg-white rounded-sm border border-blue-100 overflow-hidden shadow-2xl max-w-sm mx-auto">
          <div className="p-4 border-b border-blue-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-600">Operations Dashboard</span>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-100 rounded-sm border border-slate-100 space-y-3 group hover:border-blue-500/30 transition-all">
              <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">🕐</span>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-slate-600">Shift Open</p>
                <p className="text-[8px] font-bold text-slate-600 ">James Kim · 16:00</p>
              </div>
            </div>
            <div className="p-4 bg-slate-100 rounded-sm border border-slate-100 space-y-3 group hover:border-blue-500/30 transition-all">
              <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">💰</span>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-slate-600">Cash Drawer</p>
                <p className="text-[8px] font-bold text-slate-600">$1,820 in drawer</p>
              </div>
            </div>
            <div className="p-4 bg-slate-100 rounded-sm border border-slate-100 space-y-3 group hover:border-blue-500/30 transition-all">
              <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">↩</span>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-slate-600">Returns Queue</p>
                <p className="text-[8px] font-bold text-blue-600">3 pending · 1 urgent</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-sm border border-blue-200 space-y-3 group hover:border-blue-500/30 transition-all">
              <span className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">📦</span>
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-blue-500">Backup Status</p>
                <p className="text-[8px] font-bold text-green-600">Last: 3h ago · OK</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="bg-white text-slate-900 py-4 lg:py-6 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl mb-7 lg:mb-3">
          <div className="inline-flex items-center space-x-3 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-4">
            <span className="text-[10px] font-black uppercase text-blue-600">The Platform Workflow</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black uppercase mb-2 text-blue-950">
            Five steps. <br />
            <span className="text-blue-200">One seamless operation.</span>
          </h2>
          <p className="text-sm text-slate-700 font-medium">
            Each module is purpose-built for a specific part of your retail workflow. 
            Together, they form a complete operating system for modern retail businesses of any scale.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 lg:space-y-8">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Side */}
              <div className={`lg:col-span-5 space-y-6 ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                <div className="space-y-6">
                  <div className="text-8xl font-black text-slate-200 -mb-8 select-none">
                    {step.id}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-black uppercase text-blue-500">{step.title}</h3>
                    <h4 className="text-2xl lg:text-3xl font-black text-blue-950">{step.subtitle}</h4>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">
                    {step.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {step.features.map(feature => (
                    <div key={feature} className="flex items-center space-x-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-olive group-hover:scale-150 transition-transform" />
                      <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-700 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Side */}
              <div className="lg:col-span-7 relative group">
                <div className="absolute -inset-4 bg-linear-to-br from-blue-500/5 to-olive/5 rounded-sm blur-2xl group-hover:opacity-100 opacity-50 transition-opacity" />
                <div className="relative">
                  {step.preview}
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100/30 blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50/30 blur-[80px] pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksWorkflow;
