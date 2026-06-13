"use client";

import { useOnboarding } from "../../OnboardingContext";

const Ready = () => {
  const { data } = useOnboarding();

  return (
    <div className="animate-in fade-in bg-white p-3 slide-in-from-bottom-4 duration-700">
      <div className="mb-3 text-center lg:text-left">
        <p className="text-blue-600 text-[12px] font-black uppercase mb-2">
          Setup Complete
        </p>
        <h1 className="text-2xl flex  items-center justfiy-center gap-3 font-black text-blue-950 mb-3">
          <div className="w-8 h-8 bg-white rounded-full border border-green-600 flex items-center justify-center text-green-600 text-3xl">
            ✓
          </div>
          Your store is ready!
        </h1>
        <p className="text-slate-700 font-bold text-xs">
          MediCare POS is fully configured for {data.businessName}. Here&apos;s
          a summary of your setup and what to explore next.
        </p>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[
          { label: "Store", value: data.businessName, icon: "🏪" },
          {
            label: "Products",
            value: data.importMethod === "skip" ? "0 Added" : "Ready",
            icon: "📦",
          },
          { label: "Team", value: "3 Members", icon: "👥" },
          { label: "Trial Ends", value: "Jun 14, 2026", icon: "📅" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-blue-100 p-2 rounded-sm shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-xl mb-2 block">{item.icon}</span>
            <p className="text-[10px] font-black uppercase text-slate-700">
              {item.label}
            </p>
            <p className="text-sm font-black text-blue-950 truncate">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Next Steps Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          {
            title: "Open POS Terminal",
            desc: "Start selling right now. Scan barcodes, accept M-Pesa, and generate receipts in seconds.",
            action: "Launch POS →",
            icon: "🖥️",
            color: "bg-green-50 text-green-700",
          },
          {
            title: "Manage Inventory",
            desc: "Add more products, set low-stock alerts, and organise your full catalogue.",
            action: "Go to Inventory →",
            icon: "📦",
            color: "bg-orange-50 text-orange-700",
          },
          {
            title: "View Dashboard",
            desc: "See your sales overview, top products, and key metrics all in one place.",
            action: "Open Dashboard →",
            icon: "📊",
            color: "bg-yellow-50 text-blue-700",
          },
          {
            title: "Complete Team Setup",
            desc: "Your team invitations are pending. Follow up with Sarah, James, and Grace to get them onboarded.",
            action: "Manage Team →",
            icon: "👥",
            color: "bg-brown/10 text-purple-700",
          },
        ].map((step, idx) => (
          <button
            key={idx}
            className="p-3 bg-white border border-blue-100 rounded-sm text-left hover:border-blue-500 hover:shadow-lg hover:shadow-orange-500/5 transition-all group"
          >
            <div
              className={`w-10 h-10 ${step.color} rounded-sm flex items-center justify-center text-xl mb-2 shadow-inner`}
            >
              {step.icon}
            </div>
            <h3 className="text-xs font-black text-blue-950">{step.title}</h3>
            <p className="text-[10px] font-bold text-slate-700 mb-3">
              {step.desc}
            </p>
            <p className="text-[10px] font-black uppercase text-blue-600 group-hover:translate-x-1 transition-transform inline-block">
              {step.action}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Ready;
