"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } =
    useSidebar();
  const pathname = usePathname();

  const menuItems = [
    { name: "Executive Dashboard", icon: "📊", href: "/dashboard" },
    { name: "Ops Overview", icon: "👁️", href: "/overview" },
    { name: "Terminal Workspace", icon: "🛒", href: "/pos" },
    { name: "Inventory Control", icon: "📦", href: "/inventory" },
    { name: "Customers & Suppliers", icon: "👥", href: "/customers-suppliers" },
    { name: "Procurements", icon: "🚚", href: "/procurements" },
    { name: "Products", icon: "🏷️", href: "/products" },
    { name: "Purchases", icon: "🛍️", href: "/purchases" },
    { name: "Returns & Refunds", icon: "↺", href: "/returns-refunds" },
    { name: "Management", icon: "💼", href: "/management" },
    { name: "Cash & Shift", icon: "💵", href: "/cash-shiftmanagement" },
    { name: "Backup & Recovery", icon: "💾", href: "/backup-recovery" },
    { name: "Audit Logs", icon: "📜", href: "/audit-logs" },
    { name: "Financials", icon: "📈", href: "/financials" },
    { name: "Branches", icon: "🏪", href: "/branches" },
    { name: "Users & Roles", icon: "🔐", href: "/roles" },
    { name: "eTIMS Tax", icon: "🧾", href: "/etims-tax" },
    { name: "Device Management", icon: "📱", href: "/devicemanagement" },
    { name: "Synchronization", icon: "🔄", href: "/synchronization" },
    { name: "Reports", icon: "📋", href: "/reports" },
    { name: "Supplier Management", icon: "🏢", href: "/supplier-management" },
    { name: "Settings", icon: "⚙️", href: "/settings" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[80] lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Desktop */}
      <aside
        className={`hidden lg:flex flex-col h-full bg-white border-r border-gray-100 transition-all duration-300 z-50 flex-none ${
          isCollapsed ? "w-12" : "w-64"
        }`}
      >
        <SidebarContent 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          pathname={pathname}
          menuItems={menuItems}
        />
      </aside>

      {/* Sidebar Mobile */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white z-[90] transition-transform duration-300 w-64 flex flex-col lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          pathname={pathname}
          menuItems={menuItems}
        />
      </aside>
    </>
  );
};

const SidebarContent = ({ 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  pathname, 
  menuItems 
}: { 
  isCollapsed: boolean, 
  setIsCollapsed: (v: boolean) => void, 
  isMobileOpen: boolean, 
  pathname: string, 
  menuItems: any[] 
}) => {
  const { isDataEntryMode } = useSidebar();

  return (
    <div className="bg-linear-to-t from-blue-950 to-slate-950 flex flex-col h-full">
      {/* Brand Header & Toggle */}
      <div
        className={`${isDataEntryMode ? "h-14" : "h-20"} flex items-center justify-between px-3 border-b border-blue-800 transition-all duration-300 ${isCollapsed && !isMobileOpen ? "justify-center" : ""}`}
      >
        {(!isCollapsed || isMobileOpen) && (
          <div className="flex items-center space-x-3 overflow-hidden">
            <Image
              src="/logo.jpeg"
              alt="DUKAPOS Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-sm object-cover shadow-sm shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-black text-sm uppercase text-blue-100">
                DUKAPOS
              </span>
              <span className="text-[9px] font-bold text-blue-500 uppercase -mt-1">
                Management
              </span>
            </div>
          </div>
        )}

        {/* Logo for collapsed state */}
        {isCollapsed && !isMobileOpen && (
          <Image
            src="/logo.jpeg"
            alt="DUKAPOS Logo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-sm object-cover shadow-sm shrink-0"
          />
        )}

        {/* Desktop Toggle Arrow */}
        {!isMobileOpen && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden lg:flex w-8 h-8 items-center justify-center rounded-sm text-blue-400 hover:text-white hover:bg-blue-800/50 transition-all ${isCollapsed ? "w-full" : ""}`}
          >
            <span
              className={`text-xl font-bold transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`}
            >
              ◂
            </span>
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav
        className={`flex-1 py-5 px-2 space-y-1 overflow-y-auto custom-scrollbar ${isCollapsed && !isMobileOpen ? "items-center" : ""}`}
      >
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          const colors = [
            "text-green-600",
            "text-orange-500",
            "text-olive",
            "text-yellow-600",
            "text-brown",
          ];
          const iconColor = colors[index % colors.length];

          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : ""}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-sm transition-all group ${
                isActive
                  ? "bg-blue-200 text-blue-900 shadow-sm border border-blue-200"
                  : "text-slate-400 hover:bg-blue-100 hover:text-slate-600"
              } ${isCollapsed && !isMobileOpen ? "justify-center px-0" : ""}`}
            >
              <span
                className={`text-lg transition-transform group-hover:scale-110 ${
                  isActive ? iconColor : ""
                }`}
              >
                {item.icon}
              </span>
              {(!isCollapsed || isMobileOpen) && (
                <span
                  className={`text-[10px] font-black uppercase tracking-widest truncate ${
                    isActive ? "text-slate-900" : ""
                  }`}
                >
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-700 bg-blue-900">
        <div
          className={`flex items-center space-x-3 p-2 rounded-sm bg-blue-800 border border-blue-700 ${
            isCollapsed && !isMobileOpen ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 bg-olive rounded-lg flex items-center justify-center font-black text-[10px] text-white shrink-0 shadow-inner">
            AD
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-black uppercase tracking-tight truncate text-gray-900">
                Admin User
              </span>
              <span className="text-[8px] font-bold text-gray-400 truncate lowercase">
                admin@dukapos.ke
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
