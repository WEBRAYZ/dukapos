"use client";

import React, { useState } from "react";
import { useOnboarding } from "../../OnboardingContext";
import { isValueExpired } from "next/dist/client/components/segment-cache/cache-map";

const PaymentMethods = () => {
  const { data, updateData } = useOnboarding();
  const [mpesaConfig, setMpesaConfig] = useState({
    paybill: "522533",
    accountName: data.businessName,
    consumerKey: "••••••••••••••••••••••••",
    consumerSecret: "••••••••••••••••••••••••",
  });

  const paymentMethods = [
    { id: "mpesa", title: "M-Pesa", desc: "Lipa Na M-Pesa · Till Number or Paybill · Safaricom API", icon: "📱" },
    { id: "cash", title: "Cash", desc: "Manual cash handling with automatic change calculation", icon: "💵" },
    { id: "card", title: "Card (Visa / MC)", desc: "Requires card terminal integration via PesaLink or iPay", icon: "💳" },
    { id: "bank", title: "Bank Transfer", desc: "RTGs, EFT, and direct bank payments for large orders", icon: "🏦" },
    { id: "loyalty", title: "Loyalty Points", desc: "Redeem accumulated points at checkout as partial payment", icon: "⭐" },
    { id: "partial", title: "Partial Payment", desc: "Allow split payments across multiple methods in one transaction", icon: "🔄" },
  ];

  const togglePayment = (id: string) => {
    if (data.selectedPayments.includes(id)) {
      updateData({ selectedPayments: data.selectedPayments.filter(p => p !== id) });
    } else {
      updateData({ selectedPayments: [...data.selectedPayments, id] });
    }
  };

  return (
    <div className="animate-in fade-in bg-white p-3 slide-in-from-bottom-4 duration-700">
      <div className="mb-4 text-center lg:text-left">
        <h1 className="text-xl font-black text-blue-950 mb-1">Payment Methods</h1>
        <p className="text-slate-600 font-bold text-xs">
          Configure how you accept payments. Enable the payment methods your customers use. You can configure M-Pesa API keys here or add them later from Settings.
        </p>
      </div>

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => togglePayment(method.id)}
            className={`p-3 rounded-sm border transition-all text-left flex flex-col h-full group ${
              data.selectedPayments.includes(method.id)
                ? "border-blue-500 bg-white shadow-lg shadow-blue-500/10 scale-[1.02]"
                : "border-blue-100 bg-white hover:border-blue-200"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl group-hover:scale-110 transition-transform">{method.icon}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                data.selectedPayments.includes(method.id) ? "bg-blue-500 border-blue-500" : "border-blue-200"
              }`}>
                {data.selectedPayments.includes(method.id) && <span className="text-white text-[10px] font-black">✓</span>}
              </div>
            </div>
            <div className="flex-1">
              <p className={`text-sm font-black uppercase ${data.selectedPayments.includes(method.id) ? "text-blue-500" : "text-blue-950"}`}>
                {method.title}
              </p>
              <p className="text-[11px] font-bold text-slate-600">{method.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {data.selectedPayments.includes("mpesa") && (
        <div className="animate-in zoom-in-95 duration-500 bg-slate-100 border border-blue-100 rounded-sm p-4 lg:p-3 mb-3">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">📱</span>
            <div>
              <h3 className="text-lg font-black text-blue-950">M-Pesa Configuration</h3>
              <span className="bg-green-300 text-white text-[10px] font-black uppercase px-2 py-1.5 rounded-full">Safaricom API</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Paybill / Till Number</label>
              <input
                type="text"
                value={mpesaConfig.paybill}
                onChange={(e) => setMpesaConfig({ ...mpesaConfig, paybill: e.target.value })}
                className="w-full h-14 px-6 bg-white border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-sm focus:border-orange-500 focus:ring-[6px] focus:ring-orange-500/5 transition-all outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Account Name (for receipts)</label>
              <input
                type="text"
                value={mpesaConfig.accountName}
                onChange={(e) => setMpesaConfig({ ...mpesaConfig, accountName: e.target.value })}
                className="w-full h-14 px-6 bg-white border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-sm focus:border-orange-500 focus:ring-[6px] focus:ring-orange-500/5 transition-all outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Consumer Key</label>
              <input
                type="password"
                value={mpesaConfig.consumerKey}
                className="w-full h-14 px-6 bg-white border border-blue-100 rounded-sm text-[12px] font-bold text-blue-950 shadow-sm focus:border-orange-500 focus:ring-[6px] focus:ring-orange-500/5 transition-all outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Consumer Secret</label>
              <input
                type="password"
                value={mpesaConfig.consumerSecret}
                className="w-full h-14 px-6 bg-white border border-slate-100 rounded-sm text-[12px] font-bold text-green-950 shadow-sm focus:border-orange-500 focus:ring-[6px] focus:ring-orange-500/5 transition-all outline-none"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-3 text-[12px] font-bold text-slate-600 italic">
            <span>🔐 Keys are encrypted at rest. Get yours at developer.safaricom.co.ke</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
