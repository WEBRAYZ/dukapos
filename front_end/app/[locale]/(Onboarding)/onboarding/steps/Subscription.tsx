"use client";

import React from "react";
import { useOnboarding } from "../../OnboardingContext";

const Subscription = () => {
  const { data, updateData } = useOnboarding();

  const plans = [
    {
      id: "starter",
      name: "Starter",
      monthlyPrice: "2,999",
      annualPrice: "2,399",
      features: ["1,000 products", "10 users", "10 GB storage", "Basic POS", "Single tenant"],
    },
    {
      id: "growth",
      name: "Growth",
      monthlyPrice: "4,999",
      annualPrice: "3,999",
      features: ["5,000 products", "20 users", "50 GB storage", "Multi-tenant", "Advanced analytics"],
      recommended: true,
    },
    {
      id: "pro",
      name: "Pro",
      monthlyPrice: "7,999",
      annualPrice: "6,399",
      features: ["Unlimited products", "50 users", "100 GB storage", "API access", "Custom reports"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: "15,999",
      annualPrice: "12,799",
      features: ["Unlimited everything", "Multi-branch", "500 GB+", "Dedicated support", "SLA guarantee"],
    },
  ];

  return (
    <div className="animate-in fade-in bg-white p-3 slide-in-from-bottom-4 duration-700">
      <div className="mb-3 text-center lg:text-left">
        <h1 className="text-xl font-black text-blue-950">Subscription Plan</h1>
        <p className="text-slate-600 font-bold text-xs">
          Choose your plan. All plans include a 14-day free trial. No credit card required to start. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center lg:justify-start mb-4">
        <div className="bg-slate-100 p-1 rounded-sm flex items-center">
          <button 
            onClick={() => updateData({ billingCycle: "monthly" })}
            className={`px-8 py-3 rounded-sm text-[11px] font-black uppercase transition-all ${data.billingCycle === "monthly" ? "bg-white text-blue-950 shadow-md" : "text-slate-400 hover:text-slate-600"}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => updateData({ billingCycle: "annual" })}
            className={`px-8 py-3 rounded-sm text-[11px] font-black uppercase transition-all flex items-center space-x-2 ${data.billingCycle === "annual" ? "bg-white text-blue-950 shadow-md" : "text-slate-400 hover:text-gray-600"}`}
          >
            <span>Annual</span>
            <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => updateData({ selectedPlan: plan.id })}
            className={`relative p-5 pb-2 rounded-sm border transition-all text-left flex flex-col h-full group ${
              data.selectedPlan === plan.id 
                ? "border-blue-500 bg-white shadow-2xl shadow-blue-500/10 scale-[1]" 
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            {plan.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Recommended
              </span>
            )}
            
            <div className="mb-4">
              <p className={`text-[10px] font-black uppercase mb-4 ${data.selectedPlan === plan.id ? "text-blue-500" : "text-slate-600"}`}>
                {plan.name}
              </p>
              <div className="flex items-baseline space-x-1">
                <span className="text-xl font-black text-blue-950">
                  {data.billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                </span>
                <span className="text-xs font-bold text-slate-700">KSh</span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">per month</p>
            </div>

            <ul className="space-y-3 mb-3 flex-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <span className={`shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${data.selectedPlan === plan.id ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"}`}>
                    ✓
                  </span>
                  <span className="text-xs font-bold text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>

            <div className={`w-full py-3 rounded text-[10px] font-black uppercase text-center transition-all ${
              data.selectedPlan === plan.id 
                ? "bg-blue-900 text-white shadow-lg shadow-blue-500/20" 
                : "bg-slate-300 text-blue-900 group-hover:bg-slate-300"
            }`}>
              {data.selectedPlan === plan.id ? "Selected Plan" : "Choose Plan"}
            </div>
          </button>
        ))}
      </div>

      {/* Trial Info */}
      <div className="mt-6 bg-olive/5 border border-olive/10 p-3 rounded-sm flex items-start space-x-4">
        <span className="text-xl">ℹ️</span>
        <p className="text-xs font-bold text-blue-950">
          Your 14-day free trial starts today. You won&apos;t be charged until the trial ends. <br />
          <span className="text-slate-700 font-medium">Payment via M-Pesa, Stripe, or PayPal.</span>
        </p>
      </div>
    </div>
  );
};

export default Subscription;
