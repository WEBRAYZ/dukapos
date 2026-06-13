"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NewPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Password requirements: 8+ chars, 1 uppercase, 1 number, 1 symbol
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const isLongEnough = newPassword.length >= 8;

    if (!newPassword) {
      newErrors.newPassword = "Enter a password";
    } else if (!isLongEnough || !hasUpperCase || !hasNumber || !hasSymbol) {
      newErrors.newPassword = "Password does not meet requirements";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Enter your password again";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      console.log("Password reset successfully");
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Section - Marketing & Branding (Reused) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2b3a12] p-12 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-green-950/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-16">
            <div className="bg-white p-2.5 rounded-sm shadow-2xl shadow-blue-950/40">
              <Image src="/logo.jpeg" alt="DUKAPOS Logo" width={44} height={44} className="rounded-sm object-contain" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight leading-none mb-1 text-blue-200">DUKAPOS</h2>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Inventory Management system</p>
            </div>
          </div>

          <h1 className="text-6xl font-black leading-[1.1] mb-8">
            Run your business <br />
            <span className="text-orange-400 italic font-serif font-light">with precision</span>
          </h1>
          
          <p className="text-gray-900/70 text-lg max-w-md font-medium leading-relaxed mb-16">
            Real-time inventory, M-Pesa payments, and data-driven analytics — all in one platform built for Kenyan SMEs.
          </p>

          <div className="grid grid-cols-3 gap-12">
            <div className="space-y-1.5 border-l-2 border-orange-500/30 pl-6">
              <p className="text-4xl font-black text-white">500ms</p>
              <p className="text-[10px] font-black text-gray-900/40 uppercase tracking-widest leading-tight">Cart response <br/>time</p>
            </div>
            <div className="space-y-1.5 border-l-2 border-orange-500/30 pl-6">
              <p className="text-4xl font-black text-white">100%</p>
              <p className="text-[10px] font-black text-gray-900/40 uppercase tracking-widest leading-tight">Data <br/>isolation</p>
            </div>
            <div className="space-y-1.5 border-l-2 border-orange-500/30 pl-6">
              <p className="text-4xl font-black text-white">8wk</p>
              <p className="text-[10px] font-black text-gray-900/40 uppercase tracking-widest leading-tight">MVP <br/>delivery</p>
            </div>
          </div>
        </div>

        {/* Live Stock Monitor Widget */}
        <div className="relative z-10 bg-green-950/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 shadow-2xl max-w-sm mb-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-sm tracking-wider uppercase opacity-80">Live Stock Monitor</h3>
            <span className="flex items-center space-x-2 text-[10px] font-black bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full border border-green-500/20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>LIVE</span>
            </span>
          </div>

          <div className="space-y-6">
            {[
              { name: "Colgate 150g", sku: "SKU-001 · Oral Care", units: "248 units", status: "normal" },
              { name: "Ariel 500g", sku: "SKU-033 · Detergents", units: "8 units ⚠", status: "warning" },
              { name: "Airtime 100", sku: "SKU-AIR · Vouchers", units: "2 units !", status: "critical" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center group cursor-default">
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{item.name}</p>
                  <p className="text-[11px] font-bold text-gray-900/30 mt-0.5">{item.sku}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-black px-2 py-1 rounded ${
                    item.status === 'critical' ? 'text-red-400 bg-red-400/10' : 
                    item.status === 'warning' ? 'text-orange-400 bg-orange-400/10' : 'text-green-400 bg-green-400/10'
                  }`}>
                    {item.units}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
           <p>© 2025 DUKAPOS · Nairobi, Kenya</p>
           <p className="hidden xl:block">Secured with JWT + bcrypt · HTTPS enforced</p>
        </div>
      </div>

      {/* Right Section - Reset Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-20 bg-white">
        <div className="w-full max-w-md">
          <Link href="/login" className="flex items-center text-xs font-black text-gray-400 hover:text-green-950 transition-colors uppercase tracking-widest mb-12 group">
            <span className="text-xl mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            Back to Sign In
          </Link>

          {!isSuccess ? (
            <>
              <div className="mb-12">
                <p className="text-orange-600 text-[11px] font-black uppercase tracking-[0.2em] mb-3">
                  New Password
                </p>
                <h2 className="text-4xl font-black text-green-950 mb-3 tracking-tight">Set a new password</h2>
                <p className="text-gray-500 font-bold text-sm">
                  Must be at least 8 characters with one uppercase, one number, and one symbol.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* New Password */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">New Password</label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (errors.newPassword) setErrors({ ...errors, newPassword: "" });
                      }}
                      className={`w-full h-16 pl-14 pr-14 bg-gray-50 border ${errors.newPassword ? "border-red-500" : "border-gray-100"} rounded-2xl text-[15px] font-bold text-green-950 placeholder:text-gray-300 focus:bg-white focus:border-orange-500 focus:ring-[6px] focus:ring-orange-500/5 transition-all outline-none`}
                    />
                    <span className={`absolute left-6 top-1/2 -translate-y-1/2 text-xl ${errors.newPassword ? "text-red-500" : "group-focus-within:text-orange-500"} transition-colors opacity-40 group-focus-within:opacity-100`}>
                      🔒
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-green-950 transition-colors"
                    >
                      👁
                    </button>
                  </div>
                  {errors.newPassword && <p className="text-[10px] font-black text-red-500 ml-1 uppercase tracking-wider">{errors.newPassword}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                      }}
                      className={`w-full h-16 pl-14 pr-14 bg-gray-50 border ${errors.confirmPassword ? "border-red-500" : "border-gray-100"} rounded-2xl text-[15px] font-bold text-green-950 placeholder:text-gray-300 focus:bg-white focus:border-orange-500 focus:ring-[6px] focus:ring-orange-500/5 transition-all outline-none`}
                    />
                    <span className={`absolute left-6 top-1/2 -translate-y-1/2 text-xl ${errors.confirmPassword ? "text-red-500" : "group-focus-within:text-orange-500"} transition-colors opacity-40 group-focus-within:opacity-100`}>
                      🔒
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-green-950 transition-colors"
                    >
                      👁
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-[10px] font-black text-red-500 ml-1 uppercase tracking-wider">{errors.confirmPassword}</p>}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-16 bg-[#2b3a12] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-olive transition-all shadow-xl shadow-green-900/10 active:scale-[0.98] flex items-center justify-center space-x-4 group mt-8 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <span>{isLoading ? "Resetting..." : "Reset Password"}</span>
                  {!isLoading && <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>}
                </button>
              </form>
            </>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center lg:text-left">
              <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mb-8 mx-auto lg:mx-0 shadow-inner">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-4xl font-black text-green-950 mb-2 tracking-tight">Success!</h2>
              <p className="text-orange-600 font-black text-xl mb-6">Password updated</p>
              <p className="text-gray-500 font-medium text-[15px] leading-relaxed mb-10">
                Your password has been successfully reset. You can now use your new password to sign in to your account.
              </p>
              <Link 
                href="/login"
                className="w-full h-16 bg-[#2b3a12] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-olive transition-all shadow-xl shadow-green-900/10 active:scale-[0.98] flex items-center justify-center"
              >
                Sign In Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
