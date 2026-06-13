'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSidebar } from './SidebarContext';
import {useTranslations, useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/routing';

interface BaseNavbarProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  stats?: React.ReactNode;
  onSearch?: (query: string) => void;
}

const BaseNavbar: React.FC<BaseNavbarProps> = ({ 
  title, 
  subtitle, 
  icon, 
  children, 
  stats,
  onSearch 
}) => {
  const [time, setTime] = useState(new Date());
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);
  const [isModuleMenuOpen, setIsModuleMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isMobileOpen, setIsMobileOpen } = useSidebar();
  
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const systemMenuRef = useRef<HTMLDivElement>(null);
  const moduleMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (systemMenuRef.current && !systemMenuRef.current.contains(event.target as Node)) {
        setIsSystemMenuOpen(false);
      }
      if (moduleMenuRef.current && !moduleMenuRef.current.contains(event.target as Node)) {
        setIsModuleMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' });
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleLangChange = (langCode: string) => {
    router.replace(pathname, {locale: langCode});
    setIsLangOpen(false);
  };

  return (
    <nav className="bg-linear-to-l from-blue-800 to-blue-950 text-white h-16 md:h-18 flex items-center justify-between px-4 md:px-6 shadow-lg shrink-0 sticky top-0 z-40 transition-all duration-300 w-full border-b border-blue-900/50">
      {/* Left Section: Mobile Toggle & Brand */}
      <div className="flex items-center space-x-3 shrink-0">
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-1.5 text-blue-200 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="flex items-center space-x-3">
          <Link href="/" className="group flex items-center shrink-0">
            <Image
              src="/logo.jpeg"
              alt="DUKAPOS Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-sm object-cover shadow-md transition-transform group-hover:scale-110"
            />
          </Link>
          {icon && (
            <div className="w-9 h-9 bg-blue-500 rounded-sm flex items-center justify-center font-black text-white text-lg shadow-inner">
              {icon}
            </div>
          )}
          <div className="flex flex-col text-left hidden sm:flex">
            <span className="font-black text-sm uppercase text-blue-300 leading-none">{title}</span>
            {subtitle && (
              <span className="text-[9px] font-bold text-blue-200 uppercase tracking-tighter mt-0.5 whitespace-nowrap">{subtitle}</span>
            )}
          </div>
        </div>
      </div>

      {/* Center Section: Global Search */}
      <div className="flex-1 flex justify-center px-4 max-w-xl">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-blue-300 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full bg-blue-900/40 border border-blue-700/50 rounded-sm py-2 pl-10 pr-4 text-xs font-bold text-white placeholder-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-blue-900/60 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Section: Stats, Lang, Notifications, User */}
      <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
        {stats}

        {/* Language Switcher */}
        <div className="relative" ref={langMenuRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="p-2 hover:bg-white/10 rounded-sm transition-colors flex items-center space-x-1"
          >
            <span className="text-sm">{currentLang.flag}</span>
            <span className="text-[10px] font-black uppercase hidden sm:inline">{currentLang.name}</span>
          </button>
          
          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-sm shadow-2xl py-1 border border-blue-100 z-50 overflow-y-auto max-h-80 custom-scrollbar">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                  className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase flex items-center space-x-2 hover:bg-blue-50 transition-colors ${
                    locale === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Time - Desktop only */}
        <div className="hidden xl:flex flex-col items-center border-l border-blue-700/50 pl-4">
          <span className="text-xs font-black tracking-tight leading-none">{formatTime(time)}</span>
          <span className="text-[8px] font-bold text-blue-300 uppercase mt-1">System Time</span>
        </div>
        
        {/* User Profile */}
        <div className="relative group ml-2" ref={systemMenuRef}>
          <button 
            onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)}
            className="flex items-center space-x-3 p-1 hover:bg-white/5 rounded-sm transition-all border border-transparent hover:border-blue-700/30"
          >
            <div className="w-8 h-8 rounded-sm bg-blue-600 flex items-center justify-center font-black text-white text-xs border border-blue-400 shadow-md group-hover:bg-blue-500 transition-colors uppercase">
              JD
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[10px] font-black leading-none uppercase tracking-tighter">John Doe</span>
              <span className="text-[8px] font-bold text-blue-300 uppercase mt-1">Super Admin</span>
            </div>
            <svg className={`w-3 h-3 text-blue-300 transition-transform duration-300 ${isSystemMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* System Dropdown */}
          {isSystemMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-sm shadow-2xl border border-blue-100 py-3 z-50 transform origin-top-right transition-all">
              <div className="px-4 pb-3 border-b border-gray-100 mb-2">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Station</p>
                <p className="text-sm font-black text-gray-800 uppercase mt-1">Main Warehouse (NBO)</p>
              </div>
              
              <div className="px-2 space-y-1">
                {children}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 px-4">
                <button className="flex items-center space-x-3 w-full text-left text-red-600 hover:text-red-700 transition-colors py-2 group">
                  <span className="text-sm group-hover:scale-110 transition-transform">🚪</span>
                  <span className="text-xs font-black uppercase tracking-tight">System Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BaseNavbar;
