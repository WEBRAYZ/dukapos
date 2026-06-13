"use client";

import React, { useState } from "react";
import Image from "next/image";
import {useTranslations, useLocale} from 'next-intl';
import {Link, useRouter, usePathname} from '@/i18n/routing';

const Navbar = () => {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const features = [
    {
      name: t('inventory'),
      description: "Real-time stock tracking and alerts",
      href: "/inventory",
    },
    {
      name: t('reports'),
      description: "Detailed insights into your business growth",
      href: "/reports",
    },
    {
      name: t('products'),
      description: "Manage your items and barcodes",
      href: "/products",
    },
    {
      name: t('suppliers'),
      description: "Streamline procurement and orders",
      href: "/customers-suppliers",
    },
  ];

  const posFeatures = [
    {
      name: t('pos'),
      description: "Fast checkout for retail sales",
      href: "/pos",
    },
    {
      name: t('history'),
      description: "Track every transaction in real-time",
      href: "/purchases",
    },
  ];

  const handleLangChange = (langCode: string) => {
    router.replace(pathname, {locale: langCode});
    setIsLangOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 shadow-sm w-full">
      {/* --- TOP UTILITY BAR --- */}
      <div className="bg-linear-to-l from-blue-700 to-blue-950 border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            {/* Left: Contact & Location */}
            <div className="flex items-center space-x-10">
              <div className="flex items-center space-x-2 text-[11px] font-bold text-gray-400">
                <span className="text-blue-400">✉</span>
                <Link
                  href="mailto:hello@dukapos.co.ke"
                  className="hover:text-white transition-colors"
                >
                  hello@dukapos.co.ke
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-bold text-gray-400 border-l border-gray-800 pl-6">
                <span className="text-blue-400">📞</span>
                <Link
                  href="tel:+254700000000"
                  className="hover:text-white transition-colors"
                >
                  +254 700 000 000
                </Link>
              </div>
              <div className="flex items-center space-x-2 text-[11px] font-black text-gray-300 border-l border-gray-800 pl-6">
                <span>🇰🇪</span>
                <span className="uppercase tracking-tighter">
                  {t('proudlyKenyan')}
                </span>
              </div>
            </div>

            {/* Right: Language & Auth */}
            <div className="flex items-center space-x-6">
              {/* Language Switcher */}
              <div
                className="relative"
                onMouseEnter={() => setIsLangOpen(true)}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button className="flex items-center space-x-2 text-[11px] font-black text-gray-300 hover:text-orange-blue transition-colors uppercase tracking-widest outline-none">
                  <span className="text-sm">{currentLang.flag}</span>
                  <span>{currentLang.name}</span>
                  <svg
                    className={`w-2.5 h-2.5 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-0 w-40 bg-white rounded-xl shadow-2xl py-2 transform transition-all origin-top-right border border-blue-100 z-[70] ${
                    isLangOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center space-x-2 ${
                        locale === lang.code
                          ? "text-blue-500 bg-orange-50"
                          : "text-olive hover:bg-yellow-50"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href="/login"
                className="text-[11px] font-black text-gray-100 hover:text-blue-400 transition-colors uppercase tracking-widest border-l border-gray-100 pl-6"
              >
                {t('login')}
              </Link>
              <Link
                href="/pos"
                className="bg-blue-500 text-white px-3 py-1 rounded text-[10px] font-black hover:bg-blue-600 transition-all uppercase"
              >
                {t('freeTrial')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN NAVIGATION BAR --- */}
      <div className="bg-blue-100 border-b border-blue-100 h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center">
            {/* Brand Logo */}
            <div className="shrink-0 flex items-center">
              <Link href="/" className="group flex items-center">
                <Image
                  src="/logo.jpeg"
                  alt="DUKAPOS Logo"
                  width={150}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
                <div className="ml-5">
                  <h2 className="text-2xl font-black text-blue-950">
                    DUKAPOS
                  </h2>
                  <p className="text-slate-900/60 text-xs font-bold">
                    Inventory Management System
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1 items-center">
              {/* Features Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("features")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                    activeDropdown === "features"
                      ? "bg-blue-100 text-olive"
                      : "text-olive hover:bg-blue-100"
                  }`}
                >
                  {t('features')}
                  <svg
                    className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${activeDropdown === "features" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute left-0 mt-0 w-80 bg-white border border-blue-100 rounded-xl shadow-2xl py-3 transform transition-all duration-200 origin-top-left ${
                    activeDropdown === "features"
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {features.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex flex-col px-4 py-3 rounded-lg hover:bg-yellow-50 transition-colors group"
                      >
                        <span className="text-sm font-bold text-olive group-hover:text-blue-600">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* POS System Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("pos")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                    activeDropdown === "pos"
                      ? "bg-blue-100 text-olive"
                      : "text-olive hover:bg-blue-100"
                  }`}
                >
                  {t('posSystem')}
                  <svg
                    className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${activeDropdown === "pos" ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`absolute left-0 mt-0 w-80 bg-white border border-blue-100 rounded-xl shadow-2xl py-3 transform transition-all duration-200 origin-top-left ${
                    activeDropdown === "pos"
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {posFeatures.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex flex-col px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors group"
                      >
                        <span className="text-sm font-bold text-olive group-hover:text-blue-600">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/how-works"
                className="px-4 py-2 rounded-md text-sm font-semibold text-olive hover:bg-blue-100 transition-colors"
              >
                {t('howItWorks')}
              </Link>
              <Link
                href="/cash-shiftmanagement"
                className="px-4 py-2 rounded-md text-sm font-semibold text-olive hover:bg-blue-100 transition-colors"
              >
                {t('analytics')}
              </Link>
              <Link
                href="#pricing"
                className="px-4 py-2 rounded-md text-sm font-semibold text-olive hover:bg-blue-100 transition-colors"
              >
                {t('pricing')}
              </Link>
            </div>

            {/* Action Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/signup"
                className="bg-linear-to-l from-blue-700 to-blue-950 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-olive transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              >
                {t('getStarted')}
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-olive p-2 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isMobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[800px] border-t border-blue-100 shadow-xl"
            : "max-h-0"
        }`}
      >
        <div className="bg-white px-4 pt-4 pb-8 space-y-2">
          <div className="space-y-1">
            <p className="px-3 py-2 text-xs font-bold text-blue-500 uppercase tracking-wider">
              {t('features')}
            </p>
            {features.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-olive hover:bg-yellow-50 rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="space-y-1 border-t border-blue-5 pt-2">
            <p className="px-3 py-2 text-xs font-bold text-blue-500 uppercase tracking-wider">
              {t('posSystem')}
            </p>
            {posFeatures.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-olive hover:bg-yellow-50 rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 space-y-1 border-t border-blue-50">
            <Link
              href="/how-works"
              className="block px-3 py-2 text-base font-medium text-olive hover:bg-blue-50 rounded-md"
            >
              {t('howItWorks')}
            </Link>
            <Link
              href="/audit-logs"
              className="block px-3 py-2 text-base font-medium text-olive hover:bg-yellow-50 rounded-md"
            >
              {t('analytics')}
            </Link>
            <Link
              href="#pricing"
              className="block px-3 py-2 text-base font-medium text-olive hover:bg-blue-50 rounded-md"
            >
              {t('pricing')}
            </Link>
          </div>
          <div className="pt-6 flex flex-col space-y-3">
            <Link
              href="/login"
              className="w-full text-center py-3 text-base font-bold text-olive border-2 border-olive rounded-xl hover:bg-blue-50"
            >
              {t('login')}
            </Link>
            <Link
              href="/signup"
              className="w-full text-center py-3 text-base font-bold text-white bg-blue-900 rounded-xl shadow-lg"
            >
              {t('getStarted')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
