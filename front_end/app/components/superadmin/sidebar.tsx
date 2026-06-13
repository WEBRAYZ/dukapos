'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSidebar } from '../shared/SidebarContext';
import { useTranslations } from 'next-intl';

interface SuperAdminSidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
}

const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({ activeItem, onItemSelect }) => {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } = useSidebar();
  const t = useTranslations('SuperAdminSidebar');

  const menuItems = [
    { name: 'Overview', key: 'overview', icon: '◈' },
    { name: 'Users', key: 'users', icon: '◉' },
    { name: 'Branches', key: 'branches', icon: '⬡' },
    { name: 'Tenants', key: 'tenants', icon: '⬢' },
    { name: 'Monitoring', key: 'monitoring', icon: '◎' },
    { name: 'Subscriptions', key: 'subscriptions', icon: '◆' },
    { name: 'Reports', key: 'reports', icon: '▦' },
    { name: 'Support', key: 'support', icon: '✉' },
    { name: 'Security', key: 'security', icon: '⬡' },
    { name: 'Settings', key: 'settings', icon: '◈' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col bg-linear-to-b from-blue-900 to-blue-950 border-r border-blue-950 text-white h-full transition-all duration-500 shadow-2xl z-50 overflow-hidden ${
          isCollapsed ? 'w-12' : 'w-60'
        }`}
      >
        <SidebarContent 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          t={t}
          menuItems={menuItems}
          activeItem={activeItem}
          onItemSelect={onItemSelect}
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-blue-950/60 backdrop-blur-sm z-60 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-linear-to-b from-blue-900 to-blue-950 text-white z-70 transition-transform duration-500 w-72 lg:hidden ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <SidebarContent 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          t={t}
          menuItems={menuItems}
          activeItem={activeItem}
          onItemSelect={onItemSelect}
        />
      </aside>
    </>
  );
};

const SidebarContent = ({ 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen, 
  t, 
  menuItems, 
  activeItem, 
  onItemSelect 
}: { 
  isCollapsed: boolean, 
  setIsCollapsed: (v: boolean) => void, 
  isMobileOpen: boolean, 
  setIsMobileOpen: (v: boolean) => void, 
  t: any, 
  menuItems: any[], 
  activeItem: string, 
  onItemSelect: (item: string) => void 
}) => (
  <div className="flex flex-col h-full">
    {/* Brand Header */}
    <div className={`${isCollapsed ? 'h-24 flex-col justify-center' : 'h-20 flex-row justify-between'} flex items-center border-b border-white/10 shrink-0 transition-all duration-500 ${
      isCollapsed ? 'px-0' : 'px-4'
    }`}>
      <div className={`flex items-center overflow-hidden ${isCollapsed ? 'flex-col space-y-2' : 'space-x-4'}`}>
        <Image
          src="/logo.jpeg"
          alt="DUKAPOS Logo"
          width={32}
          height={32}
          className="w-8 h-8 rounded-sm object-cover shadow-lg backdrop-blur-md shrink-0"
        />
        {(!isCollapsed || isMobileOpen) && (
          <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-500">
            <span className="font-black text-lg uppercase text-blue-100 leading-none">{t('brand')}</span>
            <span className="text-[9px] font-black text-blue-300 uppercase mt-1">
              {t('systemCore')}
            </span>
          </div>
        )}
      </div>
      
      {/* Collapse/Expand Toggle (Desktop) */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`hidden lg:flex w-8 h-8 items-center justify-center rounded-sm text-blue-200/50 hover:text-white hover:bg-white/10 transition-all group ${
          isCollapsed ? 'mt-2' : ''
        }`}
      >
        <span className={`text-xl font-bold transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`}>
          «
        </span>
      </button>
    </div>

    {/* Navigation Menu */}
    <nav className="flex-1 py-4 px-2 space-y-2 overflow-y-auto no-scrollbar custom-scrollbar">
      {menuItems.map((item, index) => {
        const isActive = activeItem === item.name;

        return (
          <button
            key={item.name}
            onClick={() => {
              onItemSelect(item.name);
              if (isMobileOpen) setIsMobileOpen(false);
            }}
            className={`w-full flex items-center px-3 py-2 rounded-sm transition-all group relative ${
              isActive 
                ? 'bg-linear-to-l from-blue-200 to-blue-300 text-blue-900 shadow-sm shadow-blue-950/20' 
                : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
            } ${isCollapsed ? 'justify-center space-x-0' : 'space-x-2'}`}
          >
            <span className={`text-xl transition-transform group-hover:scale-110 ${
              isActive ? 'text-blue-900' : ''
            }`}>
              {item.icon}
            </span>
            {(!isCollapsed || isMobileOpen) && (
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                isActive ? 'text-blue-900' : ''
              }`}>
                {t(item.key)}
              </span>
            )}
            {isActive && (!isCollapsed || isMobileOpen) && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-900 shadow-sm" />
            )}
          </button>
        );
      })}
    </nav>

    {/* Sidebar Footer */}
    <div className="p-2 space-y-3 border-t border-white/10 shrink-0">
      {/* Profile Section */}
      <div className={`flex items-center p-2 rounded-sm bg-black/20 border border-white/5 backdrop-blur-md transition-all ${
        isCollapsed && !isMobileOpen ? 'justify-center space-x-0' : 'space-x-4'
      }`}>
        <div className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center font-black text-xs text-white shadow-inner shrink-0 border border-white/10">
          SA
        </div>
        {(!isCollapsed || isMobileOpen) && (
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-black uppercase tracking-tight truncate text-white">{t('systemAdmin')}</span>
            <span className="text-[8px] font-bold text-white/40 truncate lowercase">root@ndukapos.com</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default SuperAdminSidebar;
