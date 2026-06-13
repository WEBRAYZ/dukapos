"use client";

import React, { useState, useEffect } from "react";
import AdjustPlansModal from "./adjust-plans-modal";
import TierDetailsModal from "./tier-details-modal";
import { api } from "@/lib/api";

const SubscriptionsManagement = () => {
  const [filter, setFilter] = useState("Active");
  const [isAdjustPlansOpen, setIsAdjustPlansOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isTierDetailsOpen, setIsTierDetailsOpen] = useState(false);
  const [tiers, setTiers] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tiersData, subsData] = await Promise.all([
          api.get<any[]>("/superadmin/subscriptions/tiers/"),
          api.get<any[]>("/superadmin/subscriptions/tenant-subscriptions/"),
        ]);
        setTiers(tiersData);
        setSubscriptions(subsData);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      label: "Active MRR",
      value: "KSh 840K",
      change: "↑ 8%",
      meta: "Monthly Recurring",
      color: "text-blue-900",
      bg: "bg-blue-50",
    },
    {
      label: "Churn Rate",
      value: "1.2%",
      change: "↓ 0.4%",
      meta: "Last 30 days",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Expiring soon",
      value: "14",
      change: "7 days",
      meta: "Action needed",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Failed Payments",
      value: "2",
      count: "KSh 12,500",
      meta: "Retry active",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "KSh 5,000",
      tenants: 42,
      features: ["2 Members", "100 SKUs", "1 Branch"],
      color: "border-blue-100 bg-linear-to-l from-slate-500 to-slate-600",
    },
    {
      name: "Professional",
      price: "KSh 12,000",
      tenants: 68,
      features: ["10 Members", "1,000 SKUs", "3 Branches"],
      color: "border-blue-100 bg-linear-to-l from-blue-800 to-blue-950",
    },
    {
      name: "Enterprise",
      price: "KSh 35,000",
      tenants: 14,
      features: ["Unlimited", "Unlimited", "Unlimited"],
      color:
        "border-blue-900 bg-linear-to-l from-slate-500 to-slate-600 shadow-xl",
    },
  ];

  const subscriptions = [
    {
      tenant: "Kamau Electronics",
      plan: "Enterprise",
      status: "Active",
      nextBilling: "Jun 12, 2026",
      amount: "KSh 35,000",
      method: "M-Pesa Paybill",
    },
    {
      tenant: "Amina Traders",
      plan: "Professional",
      status: "Active",
      nextBilling: "Jun 08, 2026",
      amount: "KSh 12,000",
      method: "Credit Card",
    },
    {
      tenant: "Njoroge Supplies",
      plan: "Starter",
      status: "Expiring",
      nextBilling: "Jun 02, 2026",
      amount: "KSh 5,000",
      method: "Bank Transfer",
    },
    {
      tenant: "Fatuma Stores",
      plan: "Professional",
      status: "Active",
      nextBilling: "Jun 24, 2026",
      amount: "KSh 12,000",
      method: "M-Pesa Paybill",
    },
  ];

  return (
    <div className="p-3 md:p-3 lg:p-3 space-y-3 md:space-y-3">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-blue-800 uppercase">
            Revenue <span className="text-blue-900">Engine</span>
          </h2>
          <p className="text-[10px] md:text-xs font-bold text-gray-700 uppercase">
            Manage subscription tiers, billing cycles and global MRR
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-slate-200 border border-blue-200 text-blue-800 hover:text-gray-800 rounded-sm font-black text-[9px] md:text-[10px] uppercase transition-all shadow-sm active:scale-95">
            Billing Log
          </button>
          <button 
            onClick={() => setIsAdjustPlansOpen(true)}
            className="flex-1 md:flex-none px-6 py-3 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-[9px] md:text-[10px] uppercase hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            + Adjust Plans
          </button>
        </div>
      </div>

      <AdjustPlansModal isOpen={isAdjustPlansOpen} onClose={() => setIsAdjustPlansOpen(false)} />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-3 rounded-sm md:rounded-sm border border-blue-100 shadow-sm flex flex-col justify-center group hover:shadow-xl transition-all cursor-default relative overflow-hidden"
          >
            <p className="text-[9px] md:text-[10px] font-black text-gray-700 uppercase group-hover:text-blue-900 transition-colors relative z-10">
              {stat.label}
            </p>
            <p
              className={`text-xl md:text-2xl font-black ${stat.color} relative z-10`}
            >
              {stat.value}
            </p>
            <p className="text-[10px] font-bold text-gray-600 uppercase mt-2 relative z-10">
              {stat.change || stat.count} · {stat.meta}
            </p>
            <div
              className={`absolute -right-2 -bottom-2 w-16 h-16 ${stat.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700`}
            />
          </div>
        ))}
      </div>

      {/* Plan Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-3 md:p-4 rounded-sm md:rounded-sm border flex flex-col transition-all hover:scale-[1.02] cursor-default group ${plan.color}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h3 className="text-sm md:text-lg font-black text-blue-300 uppercase">
                  {plan.name}
                </h3>
                <p className="text-[10px] font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 w-fit">
                  {plan.tenants} Businesses
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg md:text-xl font-black text-gray-200">
                  {plan.price}
                </p>
                <p className="text-[9px] font-bold text-gray-300 uppercase">
                  Per Month
                </p>
              </div>
            </div>
            <div className="space-y-1 flex-1">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center space-x-2 group/feat">
                  <span className="text-blue-300 font-black text-sm transition-transform group-hover/feat:scale-125">
                    ✓
                  </span>
                  <span className="text-[11px] font-bold text-gray-300 uppercase">
                    {f}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setSelectedPlan(plan);
                setIsTierDetailsOpen(true);
              }}
              className={`mt-10 w-full py-4 rounded-sm text-[10px] font-black uppercase transition-all active:scale-95 ${
                plan.name === "Enterprise"
                  ? "bg-linear-to-l from-blue-800 to-blue-950 text-white shadow-xl shadow-blue-900/20"
                  : "bg-slate-300 text-blue-800 border border-blue-100 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              Tier Details
            </button>
          </div>
        ))}
      </div>

      <TierDetailsModal 
        isOpen={isTierDetailsOpen} 
        onClose={() => setIsTierDetailsOpen(false)} 
        plan={selectedPlan} 
      />

      {/* Subscriptions Table */}
      <div className="bg-white rounded-sm md:rounded-sm border border-blue-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 md:p-4 border-b border-blue-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm md:text-base font-black text-blue-800 uppercase">
            Active Subscriptions
          </h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            {["Active", "Expiring", "Cancelled", "Failed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5  rounded-sm text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-linear-to-l from-blue-800 to-blue-950 text-blue-100 shadow-lg border border-blue-100"
                    : "text-blue-800 hover:text-blue-900 bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                           <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase whitespace-nowrap">Merchant Identity </th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase whitespace-nowrap text-center">Service Tier</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase hidden lg:table-cell">Next Sync</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase">Lifecycle</th>
                <th className="px-3 md:px-3 py-3 text-[11px] font-black text-blue-800 uppercase text-center">Actions</th>
   
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscriptions.map((s, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50/30 transition-colors group cursor-default"
                >
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-800 uppercase mb-1.5">
                        {s.tenant}
                      </span>
                      <span className="text-[10px] font-bold text-gray-700 uppercase">
                        {s.method}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex justify-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                          s.plan === "Enterprise"
                            ? "bg-blue-900 text-white border-blue-900"
                            : "bg-blue-50 text-blue-900 border-blue-100"
                        }`}
                      >
                        {s.plan}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3 hidden lg:table-cell">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-800 tabular-nums">
                        {s.nextBilling}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        KSh {s.amount.split(" ")[1]} Due
                      </span>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3">
                    <div className="flex items-center space-x-2.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${s.status === "Active" ? "bg-green-500 shadow-lg shadow-green-200" : "bg-blue-500 shadow-lg shadow-orange-100"} animate-pulse`}
                      />
                      <span
                        className={`text-[10px] font-black uppercase ${s.status === "Active" ? "text-green-600" : "text-blue-600"}`}
                      >
                        {s.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 md:px-3 py-3 md:py-3 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="px-4 py-2 bg-slate-100 hover:bg-gray-100 text-blue-800 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all">
                        Invoice
                      </button>
                      <button className="w-10 h-10 rounded-xl bg-slate-100 text-blue-800 hover:text-blue-900 hover:bg-white hover:shadow-md transition-all flex items-center justify-center border border-transparent hover:border-gray-100">
                        <span className="text-lg">⚙</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 md:p-4 bg-gray-50/50 border-t border-blue-50 text-center">
          <p className="text-[9px] md:text-[10px] font-black text-gray-700 uppercase">
            Global Billing Ledger · Multi-currency support active · All
            transactions SHA-256 authenticated
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsManagement;
