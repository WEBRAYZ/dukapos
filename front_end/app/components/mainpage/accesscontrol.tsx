'use client';

import { useTranslations } from 'next-intl';

const AccessControl = () => {
  const t = useTranslations('AccessControl');
  const roles = [
    {
      name: t('adminName'),
      subtitle: t('adminSubtitle'),
      description: t('adminDesc'),
      icon: '🔐',
      color: 'bg-blue-50 border-blue-100',
      iconColor: 'bg-blue-950',
      permissions: [
        'Complete system access',
        'User & role management',
        'Product & pricing control',
        'All financial reports',
        'System configuration',
        'Supplier management',
        'Data export & backup'
      ]
    },
    {
      name: t('managerName'),
      subtitle: t('managerSubtitle'),
      description: t('managerDesc'),
      icon: '👔',
      color: 'bg-blue-50 border-blue-100',
      iconColor: 'bg-blue-700',
      permissions: [
        'Sales & inventory reports',
        'Purchase order creation',
        'Stock adjustments',
        'Customer management',
        'Discount approvals',
        'Daily financial summaries',
        'Low-stock notifications'
      ]
    },
    {
      name: t('cashierName'),
      subtitle: t('cashierSubtitle'),
      description: t('cashierDesc'),
      icon: '💵',
      color: 'bg-blue-50 border-blue-100',
      iconColor: 'bg-blue-600',
      permissions: [
        'Process sales & checkout',
        'Print receipts',
        'Accept M-Pesa payments',
        'View product catalogue',
        'Apply pre-approved discounts',
        'Own shift summary',
        'Customer lookup'
      ]
    }
  ];

  return (
    <section className="py-5 bg-slate-50 relative">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-4">
          <h2 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3">{t('sectionHeader')}</h2>
          <h3 className="text-2xl lg:text-3xl font-extrabold text-olive mb-3">
            {t('title')}
          </h3>
          <p className="text-xs text-gray-600  leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid lg:grid-cols-3 gap-3">
          {roles.map((role) => (
            <div 
              key={role.name}
              className={`relative p-3 rounded-sm border ${role.color} shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white group overflow-hidden`}
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full -translate-y-12 translate-x-12 ${role.iconColor}`}></div>

              <div className="flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${role.iconColor} text-white flex items-center justify-center text-xl shadow-lg group-hover:rotate-6 transition-transform`}>
                    {role.icon}
                  </div>
                  <div >
                    <h4 className="text-lg font-black text-olive">{role.name}</h4>
                    <p className="text-xs font-bold text-blue-600">{role.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-500 text-xs mb-5 leading-relaxed">
                  {role.description}
                </p>

                {/* Permissions List */}
                <div className="space-y-2 grow">
                  {role.permissions.map((permission, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className={`mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center`}>
                        <svg className={`w-4 h-4 text-olive`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-gray-700">{permission}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Decorator */}
                <div className="mt-6 pt-3 border-t border-gray-50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>{t('isolatedPermissions')}</span>
                  <span className="text-blue-500">{t('securityReady')} ✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Note */}
        <div className="mt-8 bg-blue-50 border-2 border-dashed border-blue-200 p-4 rounded-lg flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-sm font-black text-olive uppercase tracking-tight">{t('enterpriseSecurity')}</span>
          </div>
          <p className="text-xs font-bold text-gray-500 text-center md:text-left">
            {t('securityNote')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccessControl;
