'use client';

import { Link, useRouter, usePathname } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLangChange = (langCode: string) => {
    router.replace(pathname, {locale: langCode});
  };

  return (
    <footer className="bg-blue-950 pt-6 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="shrink-0 flex items-center mb-5">
            <Link href="/" className="group flex items-center">
              <Image
                src="/logo.jpeg"
                alt="DUKAPOS Logo"
                width={150}
                height={50}
                className="h-12 w-auto object-contain"
              />
              <div className="ml-5">
                <h2 className="text-2xl font-black text-blue-400">
                  DUKAPOS
                </h2>
                <p className="text-blue-200 text-xs font-bold">
                  {t('subtitle')}
                </p>
              </div>
            </Link>
          </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-medium">
              {t('description')}
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 text-sm font-bold">
                <span className="text-blue-400">✉</span>
                <Link href="mailto:hello@dukapos.co.ke" className="hover:text-white transition-colors">hello@dukapos.co.ke</Link>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm font-bold">
                <span className="text-blue-400">📞</span>
                <Link href="tel:+254700000000" className="hover:text-white transition-colors">+254 700 000 000</Link>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm font-bold">
                <span className="text-blue-400">📍</span>
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#FF0033" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="#0077B5">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="instagram-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="5%" stopColor="#fdf497" />
                    <stop offset="45%" stopColor="#fd5949" />
                    <stop offset="60%" stopColor="#d6249f" />
                    <stop offset="100%" stopColor="#285AEB" />
                  </linearGradient>
                </defs>
                <path fill="url(#instagram-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-blue-400 font-black text-sm uppercase tracking-widest mb-6">{t('product')}</h4>
            <ul className="space-y-2">
              {[
                { key: 'features', label: t('features') },
                { key: 'modules', label: t('modules') },
                { key: 'analytics', label: t('analytics') },
                { key: 'pricing', label: t('pricing') },
                { key: 'changelog', label: t('changelog') },
                { key: 'apiDocs', label: t('apiDocs') }
              ].map((item) => (
                <li key={item.key}>
                  <Link href="#" className="text-gray-400 text-xs font-bold hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Column */}
          <div>
            <h4 className="text-blue-400 font-black text-sm uppercase tracking-widest mb-6">{t('business')}</h4>
            <ul className="space-y-2">
              {[
                { key: 'aboutUs', label: t('aboutUs') },
                { key: 'blog', label: t('blog') },
                { key: 'careers', label: t('careers') },
                { key: 'partners', label: t('partners') },
                { key: 'pressKit', label: t('pressKit') },
                { key: 'contact', label: t('contact') }
              ].map((item) => (
                <li key={item.key}>
                  <Link href="#" className="text-gray-400 text-xs font-bold hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-blue-400 font-black text-sm uppercase tracking-widest mb-6">{t('support')}</h4>
            <ul className="space-y-2">
              {[
                { key: 'helpCentre', label: t('helpCentre') },
                { key: 'systemStatus', label: t('systemStatus') },
                { key: 'security', label: t('security') },
                { key: 'dataPrivacy', label: t('dataPrivacy') },
                { key: 'gdpr', label: t('gdpr') },
                { key: 'sla', label: t('sla') }
              ].map((item) => (
                <li key={item.key}>
                  <Link href="#" className="text-gray-400 text-sm font-bold hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0 text-center md:text-left">
            <p className="text-xs font-bold text-gray-500">
              {t('copyright')}
            </p>
            <div className="flex items-center space-x-4">
              {[
                { code: 'en', name: 'English' },
                { code: 'sw', name: 'Kiswahili' }
              ].map((lang) => (
                <button 
                  key={lang.code} 
                  onClick={() => handleLangChange(lang.code)}
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${locale === lang.code ? 'text-blue-400' : 'text-gray-600 hover:text-white'}`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="#" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">{t('privacyPolicy')}</Link>
            <Link href="#" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">{t('termsOfService')}</Link>
            <Link href="#" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">{t('cookiePolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
