'use client';

import React from 'react';

const HowItWorksBeforeAfter = () => {
  return (
    <section className="bg-slate-100 text-slate-900 py-6 lg:py-8 border-t border-slate-100">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-left mb-3 lg:mb-4">
          <div className="inline-flex items-center space-x-3 px-4 py-1 bg-blue-100 border border-blue-200 rounded-full mb-4">
            <span className="text-[10px] font-black uppercase text-blue-600">Before & After</span>
          </div>
          <h2 className="text-3xl lg:text-3xl font-black uppercase text-slate-900">
            Retail without <br />
            <span className="text-blue-500">the chaos.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Without Nexus POS */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-br from-red-500/5 to-transparent rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-full p-5 lg:p-6 bg-slate-50 border border-slate-100 rounded-sm space-y-12 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center text-3xl shadow-sm">
                  😤
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase text-blue-800">Without Duka Pos</h3>
                  <p className="text-sm text-slate-800 font-medium">
                    Spreadsheets for inventory, manual cash counts, stock discrepancies discovered days later, 
                    no audit trail, disconnected channels, and reconciliation that takes half a day.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-sm border border-slate-100 space-y-3 shadow-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-xl opacity-40">🔌</span>
                  <h4 className="text-sm font-black uppercase text-blue-950">Siloed systems</h4>
                </div>
                <p className="text-[10px] font-bold text-slate-600 uppercase">
                  Five different tools that don't talk to each other. Your payment processor, inventory app, 
                  returns system, and reporting tool each live in a separate tab — and none of the data lines up.
                </p>
              </div>
            </div>
          </div>

          {/* With Nexus POS */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-br from-olive/10 to-blue-500/5 rounded-lg blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-full p-4 lg:p-6 bg-olive/5 border border-olive/10 rounded-lg space-y-12 flex flex-col justify-between shadow-sm group-hover:shadow-xl transition-all duration-500">
              <div className="space-y-4">
                <div className="bg-blue-900 w-15 h-15 rounded-2xl flex items-center justify-center text-4xl shadow-lg shadow-blue-900/20 text-white">
                  ✦
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black uppercase text-blue-900">With Duka Pos</h3>
                  <p className="text-sm text-slate-600 font-medium">
                    Every product, sale, return, payment, and shift update flows through a single platform. 
                    Inventory adjusts the moment a sale closes. Reconciliation takes seconds, not hours.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-sm border border-olive/10 space-y-3 shadow-md">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl text-blue-500">⚡</span>
                  <h4 className="text-sm font-black uppercase text-slate-800">Everything connected</h4>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  One platform. One login. Complete visibility across all locations and channels. 
                  Your team works faster, makes fewer errors, and you always know exactly where your business stands.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksBeforeAfter;
