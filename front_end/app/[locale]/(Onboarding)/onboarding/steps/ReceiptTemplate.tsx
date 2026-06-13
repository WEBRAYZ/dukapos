"use client";

import React, { useState } from "react";
import { useOnboarding } from "../../OnboardingContext";

const ReceiptTemplate = () => {
  const { data, updateData } = useOnboarding();

  const [barcodePattern] = useState(() => {
    return [...Array(100)].map(() => ({
      opacity: Math.random() > 0.5 ? 0.8 : 0.4,
      width: `${Math.floor(Math.random() * 9) + 0.5}px`
    }));
  });

  const toggleDeliveryMethod = (id: string) => {
    if (data.receiptConfig.deliveryMethods.includes(id)) {
      updateData({
        receiptConfig: {
          ...data.receiptConfig,
          deliveryMethods: data.receiptConfig.deliveryMethods.filter(m => m !== id),
        },
      });
    } else {
      updateData({
        receiptConfig: {
          ...data.receiptConfig,
          deliveryMethods: [...data.receiptConfig.deliveryMethods, id],
        },
      });
    }
  };

  return (
    <div className="animate-in fade-in bg-white p-3 slide-in-from-bottom-4 duration-700">
      <div className="mb-4 text-center lg:text-left">
        <h1 className="text-xl font-black text-blue-950 mb-1">Receipt Template</h1>
        <p className="text-slate-600 font-bold text-xs">
          Configure what appears on your printed and digital receipts. Changes preview live on the right.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
        {/* Configuration Form */}
        <div className="space-y-3">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Receipt Header Text</label>
            <input
              type="text"
              value={data.receiptConfig.header}
              onChange={(e) => updateData({ receiptConfig: { ...data.receiptConfig, header: e.target.value.toUpperCase() } })}
              className="w-full h-14 px-4 bg-white border border-blue-100 rounded-sm text-[11px] font-bold text-blue-950 shadow-sm focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Tagline / Slogan</label>
            <input
              type="text"
              value={data.receiptConfig.tagline}
              onChange={(e) => updateData({ receiptConfig: { ...data.receiptConfig, tagline: e.target.value } })}
              className="w-full h-14 px-4 bg-white border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-sm focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Footer Message</label>
            <input
              type="text"
              value={data.receiptConfig.footer}
              onChange={(e) => updateData({ receiptConfig: { ...data.receiptConfig, footer: e.target.value } })}
              className="w-full h-14 px-4 bg-white border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-sm focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Show VAT breakdown</label>
            <select
              value={data.receiptConfig.showVat ? "yes" : "no"}
              onChange={(e) => updateData({ receiptConfig: { ...data.receiptConfig, showVat: e.target.value === "yes" } })}
              className="w-full h-14 px-4 bg-white border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-sm focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="yes">Yes — show 16% VAT line</option>
              <option value="no">No — hide VAT details</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-[10px] font-black uppercase text-slate-600 ml-1">Delivery Method</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "thermal", label: "Thermal Printer (ESC/POS)" },
                { id: "email", label: "Email PDF receipt" },
                { id: "whatsapp", label: "WhatsApp receipt" },
                { id: "sms", label: "SMS summary" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => toggleDeliveryMethod(m.id)}
                  className={`p-3 rounded-sm border text-left transition-all ${
                    data.receiptConfig.deliveryMethods.includes(m.id)
                      ? "border-blue-500 bg-blue-50/50"
                      : "border-blue-100 bg-white hover:border-blue-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-all ${
                      data.receiptConfig.deliveryMethods.includes(m.id) ? "bg-blue-500 border-blue-500" : "border-blue-300"
                    }`}>
                      {data.receiptConfig.deliveryMethods.includes(m.id) && <span className="text-white text-[8px] font-black">✓</span>}
                    </div>
                    <span className="text-xs font-bold text-blue-950">{m.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="sticky top-32">
          <div className="flex items-baseline space-x-3 mb-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-950">Live Preview</h3>
            <p className="text-[10px] font-bold text-slate-700 italic">Actual output may vary by printer</p>
          </div>

          <div className="bg-blue-50 border-2 border-blue-100 rounded-sm p-4 shadow-sm shadow-blue-900/5 max-w-[380px] mx-auto relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(#000 0, #000 1px, transparent 1px, transparent 2px)" }} />
            
            <div className="relative z-10  font-mono text-[11px] text-blue-950 space-y-4">
              <div className="text-center w-full space-y-1 pb-4 border-b border-dashed border-blue-200">
                <p className="text-sm font-black text-blue-900">{data.receiptConfig.header}</p>
                <p className="text-[10px] font-bold text-blue-900 opacity-60">{data.receiptConfig.tagline}</p>
                <p className="text-blue-900">Tel: {data.phone}</p>
                <p className="max-w-[200px] text-blue-900 mx-auto">{data.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-1 py-2 opacity-80">
                <p>Date:</p><p className="text-right font-black">30/05/2026</p>
                <p>Time:</p><p className="text-right font-black">14:32:07</p>
                <p>Cashier:</p><p className="text-right font-black">Grace N.</p>
                <p>Receipt#:</p><p className="text-right font-black">TXN-00821</p>
              </div>

              <div className="space-y-1.5 py-4 border-y border-dashed border-blue-200">
                <div className="flex justify-between"><span>Paracetamol 500mg x2</span><span className="font-black">50.00</span></div>
                <div className="flex justify-between"><span>Vitamin C 1000mg x1</span><span className="font-black">95.00</span></div>
                <div className="flex justify-between"><span>Amoxicillin 250mg x1</span><span className="font-black">180.00</span></div>
              </div>

              <div className="space-y-1 pt-2">
                <div className="flex justify-between font-bold"><span>Subtotal</span><span>325.00</span></div>
                {data.receiptConfig.showVat && (
                  <div className="flex justify-between opacity-60 italic"><span>VAT (16%)</span><span>52.00</span></div>
                )}
                <div className="flex justify-between text-blue-600 font-bold"><span>Discount</span><span>-16.25</span></div>
                <div className="flex justify-between text-base font-black pt-4 border-t border-blue-100 mt-2">
                  <span>TOTAL</span>
                  <span>KSh 360.75</span>
                </div>
              </div>

              <div className="pt-2 pb-2">
                <p className="opacity-80">Paid via:</p>
                <p className="font-black text-xs">M-Pesa</p>
              </div>

              <div className="text-center pt-5 space-y-4 border-t border-dashed border-blue-200 mt-4">
                <p className="font-bold opacity-70 italic">&quot;{data.receiptConfig.footer}&quot;</p>
                
                {/* Barcode representation */}
                <div className="flex flex-col items-center space-y-1 py-2">
                  <div className="w-28 h-10 flex items-stretch space-x-px">
                    {barcodePattern.map((style, i) => (
                      <div 
                        key={i} 
                        className="bg-blue-950" 
                        style={style} 
                      />
                    ))}
                  </div>
                  <p className="font-mono text-[10px] opacity-90">TXN-00821-2026</p>
                </div>

                <p className="font-black text-blue-800 text-[10px] opacity-80">**** THANK YOU ****</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptTemplate;
