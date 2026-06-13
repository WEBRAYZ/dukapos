'use client';

import React, { useState } from 'react';
import SuperAdminSidebar from '@/app/components/superadmin/sidebar';
import SuperAdminNavbar from '@/app/components/superadmin/navbar';
import SuperAdminDashboard from '@/app/components/superadmin/dashboard';
import UsersManagement from '@/app/components/superadmin/users';
import BranchesManagement from '@/app/components/superadmin/branches';
import TenantsManagement from '@/app/components/superadmin/tenants';
import MonitoringManagement from '@/app/components/superadmin/monitoring';
import SubscriptionsManagement from '@/app/components/superadmin/subscriptions';
import GlobalReports from '@/app/components/superadmin/reports';
import SupportManagement from '@/app/components/superadmin/support';
import SecurityManagement from '@/app/components/superadmin/security';
import SettingsManagement from '@/app/components/superadmin/settings';
import { SidebarProvider, useSidebar } from '@/app/components/shared/SidebarContext';

const SuperAdminContent = () => {
  const [activeItem, setActiveItem] = useState('Overview');
  const { setIsCollapsed } = useSidebar();

  React.useEffect(() => {
    setIsCollapsed(true);
  }, [setIsCollapsed]);

  const renderContent = () => {
    switch (activeItem) {
      case 'Overview':
        return <SuperAdminDashboard />;
      case 'Users':
        return <UsersManagement />;
      case 'Branches':
        return <BranchesManagement />;
      case 'Tenants':
        return <TenantsManagement />;
      case 'Monitoring':
        return <MonitoringManagement />;
      case 'Subscriptions':
        return <SubscriptionsManagement />;
      case 'Reports':
        return <GlobalReports />;
      case 'Support':
        return <SupportManagement />;
      case 'Security':
        return <SecurityManagement />;
      case 'Settings':
        return <SettingsManagement />;
      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center h-full p-6">
            <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl shadow-inner flex items-center justify-center text-4xl mx-auto text-blue-900">
                 {activeItem === 'Tenants' ? '⬢' :
                  activeItem === 'Monitoring' ? '◎' :
                  activeItem === 'Subscriptions' ? '◆' :
                  activeItem === 'Reports' ? '▦' :
                  activeItem === 'Security' ? '⬡' : '◈'}
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-black text-blue-800 uppercase">{activeItem} Module</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  This control panel module is currently being initialized by the system architect.
                </p>
              </div>
              <div className="pt-4 grid grid-cols-2 gap-4">
                 <div className="bg-gray-50 p-3 rounded-sm border border-blue-100">
                    <p className="text-[9px] font-black text-gray-700 uppercase mb-1">Status</p>
                    <p className="text-sm font-black text-green-600 uppercase">Stable</p>
                 </div>
                 <div className="bg-gray-50 p-3 rounded-sm border border-blue-100">
                    <p className="text-[9px] font-black text-gray-700 uppercase mb-1">Entities</p>
                    <p className="text-sm font-black text-gray-800 uppercase">124</p>
                 </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-dvh overflow-hidden bg-blue-50">
      <SuperAdminSidebar activeItem={activeItem} onItemSelect={setActiveItem} />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <SuperAdminNavbar activeItem={activeItem} />
        <main className="flex-1 overflow-y-auto custom-scrollbar relative pt-6 md:pt-8 lg:pt-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const SuperAdminPage = () => {
  return (
    <SidebarProvider>
      <SuperAdminContent />
    </SidebarProvider>
  );
};

export default SuperAdminPage;
