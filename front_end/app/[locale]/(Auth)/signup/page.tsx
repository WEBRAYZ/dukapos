"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { api } from "@/lib/api";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [onboardingResult, setOnboardingResult] = useState<Record<string, string | number | boolean> | null>(null);
  const [formData, setFormData] = useState({
    // Step 1: Account
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    // Step 2: Business
    businessName: "",
    businessType: "",
    location: "",
    kraPin: "",
    // Step 3: Plan & Role
    plan: "starter",
    billingCycle: "monthly",
    role: "",
    referralCode: "",
    agreeToTerms: false,
  });

  const plans = [
    { id: "starter", name: "Starter", price: "2,999", icon: "🌱" },
    { id: "growth", name: "Growth", price: "4,999", icon: "🚀", recommended: true },
    { id: "pro", name: "Pro", price: "7,999", icon: "💼" },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval!);
  }, [timer]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.businessName) newErrors.businessName = "Business name is required";
    if (!formData.businessType) newErrors.businessType = "Business type is required";
    if (!formData.location) newErrors.location = "Location is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.role) newErrors.role = "Please select your role";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
        setErrors({});
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
        setErrors({});
      }
    } else if (step === 3) {
      if (validateStep3()) {
        setStep(4);
        setErrors({});
        setTimer(60);
      }
    } else if (step === 4) {
        setIsLoading(true);
        try {
          // Real API call to the onboarding endpoint
          const response = await api.post<Record<string, string | number | boolean>>("/tenants/onboarding/", {
            company_name: formData.businessName,
            domain_prefix: formData.businessName.toLowerCase().replace(/\s+/g, '-'),
            business_type: formData.businessType,
            location: formData.location,
            kra_pin: formData.kraPin,
            email: formData.email,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone_number: formData.phone,
            plan: formData.plan,
            billing_cycle: formData.billingCycle,
          });

          console.log("Onboarding successful:", response);
          setOnboardingResult(response);
          setIsLoading(false);
          setStep(5); // Move to Success State
        } catch (err: unknown) {
          console.error("Onboarding failed:", err);
          const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
          setErrors({ submit: errorMessage });
          setIsLoading(false);
        }
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 5) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return false;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (value && e.target.nextSibling instanceof HTMLInputElement) {
      e.target.nextSibling.focus();
    }
  };

  const roles = [
    { id: "owner", title: "Owner / Admin", desc: "Full system access and control", icon: "👑" },
    { id: "manager", title: "Manager", desc: "Reports, orders, stock alerts", icon: "📊" },
    { id: "cashier", title: "Cashier", desc: "POS terminal, daily sales", icon: "🖥️" },
    { id: "superadmin", title: "Super Admin", desc: "Platform-wide management", icon: "🏢" },
  ];

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-white">
      {/* Left Section - Marketing & Branding (Reused) */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-950 p-5 h-screen flex-col justify-between text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-950/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="shrink-0 flex items-center mb-3">
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
                <p className="text-slate-50 text-xs font-bold">
                  Inventory Management System
                </p>
              </div>
            </Link>
          </div>

          <h1 className="text-2xl font-black mb-2">
            Run your business <br />
            <span className="text-blue-400 italic font-serif font-light">with precision</span>
          </h1>
          
          <p className="text-slate-400 text-sm max-w-md font-medium mb-3">
            Real-time inventory, M-Pesa payments, and data-driven analytics — all in one platform built for Kenyan SMEs.
          </p>

          <div className="grid grid-cols-3">
            <div className="space-y-1.5 border-l-2 border-blue-400 pl-3">
              <p className="text-xl font-black text-white">500ms</p>
              <p className="text-[10px] font-black text-slate-400 uppercase">Cart response <br/>time</p>
            </div>
            <div className="space-y-1.5 border-l-2 border-blue-400 pl-3">
              <p className="text-xl font-black text-white">100%</p>
              <p className="text-[10px] font-black text-slate-400 uppercase">Data <br/>isolation</p>
            </div>
            <div className="space-y-1.5 border-l-2 border-blue-400 pl-3">
              <p className="text-xl font-black text-white">8wk</p>
              <p className="text-[10px] font-black text-slate-400 uppercase">MVP <br/>delivery</p>
            </div>
          </div>
        </div>

        {/* Live Stock Monitor Widget */}
        <div className="relative z-10 bg-blue-900/30 backdrop-blur-xl rounded-sm p-4 border border-blue-900 shadow-lg max-w-sm mb-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-sm uppercase opacity-80">Live Stock Monitor</h3>
            <span className="flex items-center space-x-2 text-[10px] font-black bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-blue-500/20">
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
                  <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</p>
                  <p className="text-[10px] font-bold text-slate-500 mt-0.5">{item.sku}</p>
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

        <div className="relative z-10 flex justify-between items-center text-[10px] font-black text-slate-600 uppercase">
           <p>© 2025 DUKAPOS · Nairobi, Kenya</p>
           <p className="hidden xl:block">Secured with JWT + bcrypt · HTTPS enforced</p>
        </div>
      </div>

      {/* Right Section - Signup Form / Success Screen */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 lg:p-4 bg-white ">
        <div className="w-full max-w-md">
          {step < 5 && (
            <>
              {step === 1 ? (
                <Link href="/login" className="flex items-center text-[10px] font-black text-slate-700 hover:text-blue-950 transition-colors uppercase  mb-4 group">
                  <span className="text-lg mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                  Back to Sign In
                </Link>
              ) : (
                <button 
                  onClick={handleBack}
                  className="flex items-center text-xs font-black text-slate-700 hover:text-blue-950 transition-colors uppercase  mb-4 group"
                >
                  <span className="text-xl mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                  Back
                </button>
              )}

              <div className="mb-6">
                <p className="text-blue-600 text-[11px] font-black uppercase mb-3">
                  {step === 4 ? "Verification" : `Step ${step} of 3 — ${step === 1 ? "Account" : step === 2 ? "Business" : "Your Role"}`}
                </p>
                <h2 className="text-xl font-black text-blue-950 mb-2">
                  {step === 4 ? "Check your email & phone" : step === 1 ? "Create your account" : step === 2 ? "Tell us about your business" : "What's your role in this business?"}
                </h2>
                <p className="text-gray-500 font-bold text-xs">
                  {step === 4 ? (
                    `We sent a 6-digit code to ${formData.email || "jane@mybusiness.co.ke"} and ${formData.phone || "+254 712 XXX XXX"}`
                  ) : step === 1 ? (
                    <>Already have one? <Link href="/login" className="text-blue-600 hover:text-blue-700 transition-colors border-b-2 border-blue-600/20 hover:border-blue-600 pb-0.5">Sign in here</Link></>
                  ) : step === 2 ? (
                    "This sets up your tenant profile and customises the platform for you."
                  ) : (
                    "You can invite your team and assign roles after signing up."
                  )}
                </p>
              </div>
            </>
          )}

          {step === 5 ? (
            /* Success State */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-5 text-center lg:text-left">
                <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto lg:mx-0 shadow-inner">
                  <span className="text-3xl animate-bounce">✅</span>
                </div>
                <h2 className="text-3xl font-black text-blue-950 mb-2 ">You&apos;re in</h2>
                <p className="text-blue-600 font-black text-sm mb-3">Account ready!</p>
                <p className="text-slate-600 font-medium text-[12px]">
                  Welcome to DUKAPOS. Your tenant workspace has been
                  created at <strong className="text-blue-900">{onboardingResult?.domain}</strong>.
                </p>
              </div>

              <div className="bg-slate-100 rounded-lg p-4 border border-blue-100 mb-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 mb-3">
                  Your Workspace Link
                </h3>
                <div className="p-3 bg-white border border-blue-100 rounded-sm font-bold text-blue-900 text-sm break-all">
                  http://{onboardingResult?.domain}:3000/login
                </div>
              </div>

              <a 
                href={`http://${onboardingResult?.domain}:3000/login`}
                className="w-full h-14 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-sm uppercase hover:bg-olive transition-all shadow-xl shadow-green-900/10 active:scale-[0.98] flex items-center justify-center space-x-4 group"
              >
                <span>Go to Workspace</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ) : (
            /* Form Steps 1-4 */
            <form className="space-y-3" onSubmit={handleContinue}>
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {/* First Name */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-700 ml-1">First Name</label>
                      <input
                        type="text"
                        placeholder="Jane"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`w-full h-14 px-6 bg-slate-100 border ${errors.firstName ? "border-red-500" : "border-blue-100"} rounded-sm text-[15px] font-bold text-blue-950 placeholder:text-slate-300 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none`}
                      />
                    </div>
                    {/* Last Name */}
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Last Name</label>
                      <input
                        type="text"
                        placeholder="Mwangi"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={`w-full h-14 px-6 bg-slate-100 border ${errors.lastName ? "border-red-500" : "border-blue-100"} rounded-sm text-[15px] font-bold text-blue-950 placeholder:text-slate-300 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none`}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Email Address</label>
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="jane@mybusiness.co.ke"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full h-14 pl-14 pr-6 bg-slate-100 border ${errors.email ? "border-red-500" : "border-blue-100"} rounded-sm text-[15px] font-bold text-blue-950 placeholder:text-slate-300 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none`}
                      />
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl opacity-40 group-focus-within:opacity-100 transition-opacity">✉</span>
                    </div>
                    {errors.email && <p className="text-[10px] font-black text-red-500 ml-1 uppercase tracking-wider">{errors.email}</p>}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Phone Number</label>
                    <div className="relative group">
                      <input
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full h-14 pl-14 pr-6 bg-slate-100 border ${errors.phone ? "border-red-500" : "border-blue-100"} rounded-sm text-[15px] font-bold text-blue-950 placeholder:text-slate-300 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none`}
                      />
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl opacity-40 group-focus-within:opacity-100 transition-opacity">📱</span>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Password</label>
                    <div className="relative group">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full h-14 pl-14 pr-14 bg-slate-100 border ${errors.password ? "border-red-500" : "border-blue-100"} rounded-sm text-[15px] font-bold text-blue-950 placeholder:text-slate-300 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none`}
                      />
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl opacity-80 group-focus-within:opacity-100 transition-opacity">🔒</span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-lg text-slate-600 hover:text-blue-950 transition-colors"
                      >
                        👁
                      </button>
                    </div>
                    {errors.password && <p className="text-[10px] font-black text-red-500 ml-1 uppercase">{errors.password}</p>}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Business Name */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Business Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Amina's General Store"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className={`w-full h-14 px-6 bg-slate-100 border ${errors.businessName ? "border-red-500" : "border-blue-100"} rounded-sm text-[15px] font-bold text-blue-950 placeholder:text-slate-300 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none`}
                    />
                    {errors.businessName && <p className="text-[10px] font-black text-red-500 ml-1 uppercase">{errors.businessName}</p>}
                  </div>

                  {/* Business Type */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Business Type</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className={`w-full h-14 px-6 bg-slate-100 border ${errors.businessType ? "border-red-500" : "border-blue-100"} rounded-sm text-[15px] font-bold text-blue-950 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none appearance-none`}
                    >
                      <option value="" disabled>Select your business type</option>
                      <option value="retail">Retail Store</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="hardware">Hardware</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.businessType && <p className="text-[10px] font-black text-red-500 ml-1 uppercase">{errors.businessType}</p>}
                  </div>

                  {/* Location / County */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Location / County</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={`w-full h-14 px-6 bg-slate-100 border ${errors.location ? "border-red-500" : "border-blue-100"} rounded-sm text-[15px] font-bold text-blue-950 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none appearance-none`}
                    >
                      <option value="" disabled>Select county</option>
                      <option value="nairobi">Nairobi</option>
                      <option value="mombasa">Mombasa</option>
                      <option value="kisumu">Kisumu</option>
                      <option value="nakuru">Nakuru</option>
                      <option value="kiambu">Kiambu</option>
                    </select>
                    {errors.location && <p className="text-[10px] font-black text-red-500 ml-1 uppercase">{errors.location}</p>}
                  </div>

                  {/* KRA PIN */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-700 ml-1">KRA PIN (optional)</label>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="A123456789B"
                        value={formData.kraPin}
                        onChange={(e) => setFormData({ ...formData, kraPin: e.target.value.toUpperCase() })}
                        className="w-full h-14 px-6 bg-slate-100 border border-blue-100 rounded-sm text-[15px] font-bold text-green-950 placeholder:text-slate-300 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 cursor-help" title="Kenya Revenue Authority Personal Identification Number">ℹ</span>
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  {/* Plan Selection */}
                  <div className="space-y-3 mb-6">
                    <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Select your plan</label>
                    <div className="grid grid-cols-3 gap-2">
                      {plans.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, plan: p.id })}
                          className={`flex flex-col items-center p-3 rounded-sm border-2 transition-all text-center ${
                            formData.plan === p.id 
                              ? "border-blue-500 bg-blue-50/50 shadow-md" 
                              : "border-blue-100 bg-slate-100 hover:border-blue-200"
                          }`}
                        >
                          <span className="text-xl mb-1">{p.icon}</span>
                          <p className="text-[10px] font-black text-blue-950 uppercase">{p.name}</p>
                          <p className="text-[9px] font-bold text-slate-500">KSh {p.price}</p>
                          {formData.plan === p.id && (
                            <span className="mt-1 text-blue-500 font-black text-[10px]">✓ Selected</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-700 ml-1">Select your role</label>
                    <div className="grid grid-cols-1 gap-3">
                      {roles.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, role: r.id })}
                          className={`flex items-center p-3 rounded-sm border-2 transition-all text-left ${
                            formData.role === r.id 
                              ? "border-blue-500 bg-blue-50/50 shadow-md" 
                              : "border-blue-100 bg-slate-100 hover:border-blue-200"
                          }`}
                        >
                          <span className="text-lg mr-3">{r.icon}</span>
                          <div>
                            <p className="text-sm font-black text-blue-950">{r.title}</p>
                            <p className="text-[11px] font-bold text-slate-500">{r.desc}</p>
                          </div>
                          {formData.role === r.id && (
                            <span className="ml-auto text-blue-500 font-black">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.role && <p className="text-[10px] font-black text-red-500 ml-1 uppercase">{errors.role}</p>}
                  </div>

                  {/* Referral Code */}
                  <div className="space-y-3 pt-4">
                    <label className="text-[10px] font-black uppercase  text-slate-700 ml-1">Referral Code (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. FRIEND2025"
                      value={formData.referralCode}
                      onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                      className="w-full h-14 px-6 bg-slate-100 border border-blue-100 rounded-sm text-[15px] font-bold text-blue-950 placeholder:text-slate-300 focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none"
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="pt-3">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={formData.agreeToTerms}
                          onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                          className="peer hidden"
                        />
                        <div className={`w-4 h-4 border-2 transition-all flex items-center justify-center ${
                          formData.agreeToTerms ? "bg-blue-950 border-blue-950" : "bg-slate-100 border-blue-200 peer-hover:border-blue-400"
                        }`}>
                          {formData.agreeToTerms && <span className="text-white text-xs font-black">✓</span>}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        I agree to the <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="text-[10px] font-black text-red-500 ml-1 mt-1 uppercase">{errors.agreeToTerms}</p>}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="flex justify-between items-center space-x-2">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={data}
                        onChange={(e) => handleOtpChange(e, index)}
                        onFocus={(e) => e.target.select()}
                        className="w-full h-14 text-center text-sm font-black bg-slate-100 border border-blue-100 rounded-sm focus:bg-white focus:border-blue-500 focus:ring-[6px] focus:ring-blue-500/5 transition-all outline-none"
                      />
                    ))}
                  </div>

                  <div className="text-center pt-3">
                    <p className="text-xs font-bold text-slate-600">
                      Didn&apos;t receive it?{" "}
                      <button 
                        type="button"
                        disabled={timer > 0}
                        onClick={() => setTimer(60)}
                        className={`text-blue-600 hover:underline ${timer > 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        Resend code
                      </button>
                      {timer > 0 && <span className="ml-2">· 0:{timer.toString().padStart(2, '0')}</span>}
                    </p>
                  </div>

                  <div className="mt-6 bg-slate-100 border border-blue-100 p-4 rounded-sm flex items-start space-x-3">
                    <span className="text-xl">💡</span>
                    <p className="text-[11px] font-bold text-slate-800">
                      Demo tip: Enter any 6 digits or click &quot;Verify & Continue&quot; to proceed to the success screen.
                    </p>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full h-14 bg-linear-to-l from-blue-800 to-blue-950 text-white rounded-sm font-black text-sm uppercase hover:bg-olive transition-all shadow-sm shadow-blue-900/10 active:scale-[0.98] flex items-center justify-center space-x-4 group mt-5 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <span>{isLoading ? "Verifying..." : step === 4 ? "Verify & Continue" : step === 3 ? "Create Account & Verify" : "Continue"}</span>
                {!isLoading && <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
