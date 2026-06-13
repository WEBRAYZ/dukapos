"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.identifier) {
      newErrors.identifier = loginMethod === "email" ? "Please enter a valid email address" : "Please enter a valid phone number";
    } else if (loginMethod === "email" && !/\S+@\S+\.\S+/.test(formData.identifier)) {
      newErrors.identifier = "Please enter a valid email address";
    } else if (loginMethod === "phone" && !/^\d{10,12}$/.test(formData.identifier.replace(/\s/g, ""))) {
      newErrors.identifier = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await api.post<{ access: string; refresh: string; user: Record<string, string | boolean | number> }>("/auth/login/", {
        username: formData.identifier,
        password: formData.password,
      });

      console.log("Login successful:", response);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      if (response.user.is_superuser || response.user.is_staff) {
        router.push("/superadmin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Invalid credentials. Please try again.";
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    // Simulate Google Login Redirect/Flow
    setTimeout(() => {
      console.log("Redirecting to Google Auth...");
      // In a real scenario: window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`;
      setIsGoogleLoading(false);
    }, 1500);
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white animate-in fade-in duration-700">
      {/* Left Section - Marketing & Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-950 p-6 flex-col justify-between text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10 animate-in slide-in-from-left duration-1000">
          <div className="shrink-0 flex items-center mb-5">
            <Link href="/" className="group flex items-center">
              <Image
                src="/logo.jpeg"
                alt="DUKAPOS Logo"
                width={150}
                height={50}
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="ml-5">
                <h2 className="text-2xl font-black text-blue-200">
                  DUKAPOS
                </h2>
                <p className="text-blue-100/60 text-xs font-bold uppercase tracking-wider">
                  Inventory Management System
                </p>
              </div>
            </Link>
          </div>

          <h1 className="text-3xl font-black leading-[1.1] mb-4">
            {t('marketingTitle')} <br />
            <span className="text-blue-400 font-serif font-light italic">{t('marketingSubtitle')}</span>
          </h1>

          <p className="text-gray-100 text-xs max-w-md font-medium mb-8 leading-relaxed">
            {t('marketingDesc')}
          </p>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1.5 border-l-2 border-blue-600 pl-6 group">
              <p className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">500ms</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Cart response <br />time</p>
            </div>
            <div className="space-y-1.5 border-l-2 border-blue-600 pl-6 group">
              <p className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">100%</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Data <br />isolation</p>
            </div>
            <div className="space-y-1.5 border-l-2 border-blue-600 pl-6 group">
              <p className="text-xl font-black text-white group-hover:text-blue-400 transition-colors">8wk</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">MVP <br />delivery</p>
            </div>
          </div>
        </div>

        {/* Live Stock Monitor Widget */}
        <div className="relative z-10 bg-blue-900/20 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl max-w-sm mb-12 animate-in slide-up-from-bottom-8 duration-1000 delay-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[10px] uppercase tracking-widest opacity-60">{t('liveStockMonitor')}</h3>
            <span className="flex items-center space-x-2 text-[10px] font-black bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span>{t('live')}</span>
            </span>
          </div>

          <div className="space-y-4">
            {[
              { name: "Colgate 150g", sku: "SKU-001 · Oral Care", units: `248 ${t('units')}`, status: "normal" },
              { name: "Ariel 500g", sku: "SKU-033 · Detergents", units: `8 ${t('units')} ⚠`, status: "warning" },
              { name: "Airtime 100", sku: "SKU-AIR · Vouchers", units: `2 ${t('units')} !`, status: "critical" },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center group cursor-default p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</p>
                  <p className="text-[10px] font-bold text-gray-500 mt-0.5">{item.sku}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${
                    item.status === 'critical' ? 'text-red-400 bg-red-400/10' :
                    item.status === 'warning' ? 'text-orange-400 bg-orange-400/10' : 
                    'text-blue-400 bg-blue-400/10'
                  }`}>
                    {item.units}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-[9px] font-bold text-gray-500 uppercase tracking-widest">
          <p>© 2025 DUKAPOS · Nairobi, Kenya</p>
          <p className="hidden xl:block">Secured with JWT + bcrypt · HTTPS enforced</p>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-12 bg-white animate-in slide-in-from-right duration-1000">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{t('welcomeBack')}</h2>
            <p className="text-slate-500 font-medium text-sm">
              {t('signInToAccount')}{" "}
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4 transition-all">
                {t('createOneFree')}
              </Link>
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1.5 bg-slate-100 rounded-xl mb-8 border border-slate-200 shadow-inner">
            <button
              onClick={() => {
                setLoginMethod("email");
                setErrors({});
              }}
              className={`flex-1 py-3 text-[11px] font-bold uppercase rounded-lg transition-all duration-300 ${loginMethod === "email" ? "bg-white text-blue-600 shadow-md ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {t('email')}
            </button>
            <button
              onClick={() => {
                setLoginMethod("phone");
                setErrors({});
              }}
              className={`flex-1 py-3 text-[11px] font-bold uppercase rounded-lg transition-all duration-300 ${loginMethod === "phone" ? "bg-white text-blue-600 shadow-md ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {t('phone')}
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-bold animate-in shake duration-500">
                {errors.submit}
              </div>
            )}
            
            {/* Email / Phone Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-slate-500 ml-1 tracking-widest">
                {loginMethod === "email" ? t('emailLabel') : t('phoneLabel')}
              </label>
              <div className="relative group">
                <input
                  type={loginMethod === "email" ? "email" : "tel"}
                  placeholder={loginMethod === "email" ? "jane@example.co.ke" : "0700 000 000"}
                  value={formData.identifier}
                  onChange={(e) => {
                    setFormData({ ...formData, identifier: e.target.value });
                    if (errors.identifier) setErrors({ ...errors, identifier: "" });
                  }}
                  className={`w-full h-14 pl-14 pr-6 bg-slate-50 border-2 ${errors.identifier ? "border-red-500" : "border-slate-100"} rounded-xl text-[15px] font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none`}
                />
                <span className={`absolute left-5 top-1/2 -translate-y-1/2 text-xl ${errors.identifier ? "text-red-500" : "text-slate-300 group-focus-within:text-blue-500"} transition-colors`}>
                  {loginMethod === "email" ? "✉" : "📞"}
                </span>
              </div>
              {errors.identifier && (
                <p className="text-[10px] font-bold text-red-500 ml-1 uppercase">{errors.identifier}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                  {t('passwordLabel')}
                </label>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  className={`w-full h-14 pl-14 pr-14 bg-slate-50 border-2 ${errors.password ? "border-red-500" : "border-slate-100"} rounded-xl text-[15px] font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none`}
                />
                <span className={`absolute left-5 top-1/2 -translate-y-1/2 text-xl ${errors.password ? "text-red-500" : "text-slate-300 group-focus-within:text-blue-500"} transition-colors`}>
                  🔒
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-lg text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? "👁️" : "👁"}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] font-bold text-red-500 ml-1 uppercase">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between px-1">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="remember"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs font-bold text-slate-600 cursor-pointer select-none">{t('rememberMe')}</label>
              </div>
              <Link href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-tight">
                {t('forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className={`w-full h-14 bg-blue-600 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center space-x-3 group ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                   <span>{t('signingIn')}</span>
                </div>
              ) : (
                <>
                  <span>{t('signIn')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {t('orContinueWith')}
              </span>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading || isGoogleLoading}
            className={`w-full h-14 border-2 border-slate-100 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center justify-center space-x-3 active:scale-[0.98] ${isGoogleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isGoogleLoading ? (
               <div className="w-5 h-5 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            <span>{t('continueWithGoogle')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
