"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const LoginSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Section - Marketing & Branding (Reused from Login) */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-950 p-6 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-950/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="shrink-0 flex items-center mb-5">
            <Link href="/" className="group flex items-center">
              <Image
                src="/logo.jpeg"
                alt="DUKAPOS Logo"
                width={150}
                height={50}
                className="h-12 w-auto object-contain"
              />
              <div className="ml-5">
                <h2 className="text-2xl font-black text-blue-200">
                  DUKAPOS
                </h2>
                <p className="text-green-50 text-xs font-bold">
                  Inventory Management System
                </p>
              </div>
            </Link>
          </div>

          <h1 className="text-3xl font-black leading-[1.1] mb-4">
            Run your business <br />
            <span className="text-blue-400 italic font-serif font-light">with precision</span>
          </h1>
          
          <p className="text-gray-200 text-xs max-w-md font-medium leading-relaxed mb-6">
            Real-time inventory, M-Pesa payments, and data-driven analytics — all in one platform built for Kenyan SMEs.
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1.5 border-l-2 border-blue-300 pl-6">
              <p className="text-xl font-black text-white">500ms</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Cart response <br/>time</p>
            </div>
            <div className="space-y-1.5 border-l-2 border-blue-300 pl-6">
              <p className="text-xl font-black text-white">100%</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Data <br/>isolation</p>
            </div>
            <div className="space-y-1.5 border-l-2 border-blue-300 pl-6">
              <p className="text-xl font-black text-white">8wk</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">MVP <br/>delivery</p>
            </div>
          </div>
        </div>

        {/* Live Stock Monitor Widget */}
        <div className="relative z-10 bg-blue-900/40 backdrop-blur-xl rounded-lg p-4 border border-gray-600 shadow-2xl max-w-sm mb-5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-xs tracking-wider uppercase opacity-80">Live Stock Monitor</h3>
            <span className="flex items-center space-x-2 text-[10px] font-black bg-blue-900 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>

          <div className="space-y-3">
            {[
              { name: "Colgate 150g", sku: "SKU-001 · Oral Care", units: "248 units", status: "normal" },
              { name: "Ariel 500g", sku: "SKU-033 · Detergents", units: "8 units ⚠", status: "warning" },
              { name: "Airtime 100", sku: "SKU-AIR · Vouchers", units: "2 units !", status: "critical" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center group cursor-default">
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</p>
                  <p className="text-[10px] font-bold text-gray-500 mt-0.5">{item.sku}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-black px-2 py-1 rounded ${
                    item.status === 'critical' ? 'text-red-400 bg-red-400/10' : 
                    item.status === 'warning' ? 'text-blue-400 bg-blue-400/10' : 'text-green-400 bg-green-400/10'
                  }`}>
                    {item.units}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-[10px] font-black text-gray-300 uppercase tracking-[0.15em]">
           <p>© 2025 DUKAPOS · Nairobi, Kenya</p>
           <p className="hidden xl:block">Secured with JWT + bcrypt · HTTPS enforced</p>
        </div>
      </div>

      {/* Right Section - Success Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 lg:p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center lg:text-left">
            <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center mb-4 mx-auto lg:mx-0 shadow-inner">
              <span className="text-2xl animate-bounce">✅</span>
            </div>
            <h2 className="text-3xl font-black text-blue-950 mb-2 tracking-tight">You&apos;re in</h2>
            <p className="text-blue-600 font-black text-lg mb-4">Account ready!</p>
            <p className="text-gray-500 font-medium text-[11px] leading-relaxed">
              Welcome to DUKAPOS. Your tenant workspace has been
              created and your 14-day free trial has started.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 mb-5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-5">
              What happens next
            </h3>
            <div className="space-y-5">
              {[
                "Complete your tenant onboarding (5 min)",
                "Add your first products to inventory",
                "Make your first sale on the POS terminal",
              ].map((step, idx) => (
                <div key={idx} className="flex items-start space-x-5">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-950 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-green-950/20">
                    {idx + 1}
                  </div>
                  <p className="text-xs font-bold text-blue-950 pt-1.5 leading-tight">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Link 
            href="/dashboard"
            className="w-full h-14 bg-linear-to-l from-blue-700 to-blue-950 text-white rounded-lg font-black text-sm uppercase tracking-widest hover:bg-olive transition-all shadow-xl shadow-green-900/10 active:scale-[0.98] flex items-center justify-center space-x-4 group"
          >
            <span>Go to Dashboard</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessPage;
