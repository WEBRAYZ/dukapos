'use client';

import Sidebar from "@/app/components/shared/sidebar";
import Navbar from "@/app/components/usersdashboard/navbar";
import { SidebarProvider } from "@/app/components/shared/SidebarContext";

import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPOS = pathname === "/pos";

  return (
    <SidebarProvider>
      <div className="flex h-[100dvh] bg-blue-50 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <main className="flex-1 overflow-y-auto custom-scrollbar relative">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
