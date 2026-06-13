"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    // Mock API call
    setTimeout(() => {
      console.log("Sending reset link to:", email);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-blue-50">
      {/* Left Section - Marketing & Branding (Reused) */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-950 p-4 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-green-950/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className=" rounded-sm shadow-2xl shadow-green-950/40">
              <Image src="/logo.jpeg" alt="DUKAPOS Logo" width={44} height={44} className="object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-black mb-1">DUKAPOS</h2>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Inventory management system</p>
            </div>
          </div>

          <h1 className="text-2xl font-black mb-4">
            Run your business <br />
            <span className="text-blue-400 font-serif font-light">with precision</span>
          </h1>
          
          <p className="text-slate-600 text-sm max-w-md font-medium mb-8">
            Real-time inventory, M-Pesa payments, and data-driven analytics — all in one platform built for Kenyan SMEs.
          </p>

          <div className="grid grid-cols-3 mb-6 gap-4">
            <div className="border-l-2 border-blue-300 pl-4">
              <p className="text-xl font-black text-white">500ms</p>
              <p className="text-[10px] font-black text-slate-500 uppercase">Cart response <br/>time</p>
            </div>
            <div className="border-l-2 border-blue-300 pl-4">
              <p className="text-xl font-black text-white">100%</p>
              <p className="text-[10px] font-black text-slate-500 uppercase">Data <br/>isolation</p>
            </div>
            <div className="border-l-2 border-blue-300 pl-3">
              <p className="text-xl font-black text-white">8wk</p>
              <p className="text-[10px] font-black text-slate-500 uppercase">MVP <br/>delivery</p>
            </div>
          </div>
        </div>

        {/* Live Stock Monitor Widget */}
        <div className="relative z-10 bg-blue-900/30 backdrop-blur-xl rounded-sm p-3 border border-blue-900 shadow-sm max-w-sm mb-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm uppercase opacity-80">Live Stock Monitor</h3>
            <span className="flex items-center space-x-2 text-[10px] font-black bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20">
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
                  <p className="text-[11px] font-bold text-slate-400">{item.sku}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-black px-2 py-1 rounded-full ${
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

        <div className="relative z-10 flex justify-between items-center text-[10px] font-black text-slate-500 uppercase">
           <p>© 2025 DUKAPOS · Nairobi, Kenya</p>
           <p className="hidden xl:block">Secured with JWT + bcrypt · HTTPS enforced</p>
        </div>
      </div>

      {/* Right Section - Recovery Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 lg:p-6 bg-white">
        <div className="w-full max-w-md">
          <Link href="/login" className="flex items-center text-xs font-black text-blue-600 hover:text-blue-950 transition-colors uppercase tracking-widest mb-12 group">
            <span className="text-xl mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            Back to Sign In
          </Link>

          {!isSubmitted ? (
            <>
              <div className="mb-6">
                <p className="text-blue-600 text-[11px] font-black uppercase mb-1">
                  Password Recovery
                </p>
                <h2 className="text-3xl font-black text-blue-950 mb-2">Reset your password</h2>
                <p className="text-slate-700 font-bold text-sm">
                  Enter your email and we&apos;ll send a secure reset link valid for 15 minutes.
                </p>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <input
                      type="email"
                      placeholder="jane@mybusiness.co.ke"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      className={`w-full h-16 pl-14 pr-6 bg-slate-100 border ${error ? "border-blue-500" : "border-slate-100"} rounded-sm text-[15px] font-bold text-blue-950 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none`}
                    />
                    <span className={`absolute left-6 top-1/2 -translate-y-1/2 text-xl ${error ? "text-red-500" : "group-focus-within:text-blue-500"} transition-colors opacity-40 group-focus-within:opacity-100`}>
                      ✉
                    </span>
                  </div>
                  {error && (
                    <p className="text-[10px] font-black text-red-500 ml-1 uppercase tracking-wider">{error}</p>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-16  bg-linear-to-l from-blue-700 to-blue-950 text-white rounded-sm font-black text-sm uppercase hover:bg-olive transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] flex items-center justify-center space-x-4 group ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <span>{isLoading ? "Sending..." : "Send Reset Link"}</span>
                  {!isLoading && <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link href="/login" className="text-xs font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider">
                  Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-6 text-center lg:text-left">
                <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center mb-4 mx-auto lg:mx-0 shadow-inner">
                  <span className="text-3xl animate-pulse">✉</span>
                </div>
                <h2 className="text-2xl font-black text-blue-950 mb-2">Check your email</h2>
                <p className="text-blue-600 font-black text-xl mb-3">Reset link sent!</p>
                <p className="text-slate-500 font-medium text-[13px]">
                  We&apos;ve sent a secure password reset link to <span className="font-black text-blue-950">{email}</span>. 
                  Please check your inbox (and spam folder) to proceed.
                </p>
              </div>

              <div className="bg-slate-100 rounded-sm p-3 border border-blue-100 mb-5 text-center">
                <p className="text-sm font-bold text-slate-600">
                  Didn&apos;t receive it?{" "}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-600 hover:underline font-black"
                  >
                    Try again
                  </button>
                </p>
              </div>

              <Link 
                href="/login"
                className="w-full h-16 border-2 border-blue-900 text-blue-900 rounded-sm font-black text-sm uppercase hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
