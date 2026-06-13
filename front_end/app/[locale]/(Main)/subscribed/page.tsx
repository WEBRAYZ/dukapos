'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navbar from "@/app/components/mainpage/navbar";
import Footer from "@/app/components/mainpage/footer";

const SubscribedPage = () => {
  const t = useTranslations('SubscribedPage');

  return (
    <main className="flex flex-col min-h-screen relative">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20 bg-gray-50/30">
        <div className="max-w-3xl w-full px-6 text-center">
          <div className="mb-12 relative inline-block">
             <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 scale-150"></div>
             <div className="relative w-24 h-24 bg-white border border-blue-100 rounded-full flex items-center justify-center text-5xl shadow-xl mx-auto">
               🎉
             </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-6 uppercase tracking-tight">
            {t('title') || 'Welcome to the inner circle!'}
          </h1>
          
          <p className="text-lg text-gray-600 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
            {t('description') || "You've successfully subscribed to our newsletter. Get ready for exclusive POS tips, business growth strategies, and early access to new NDUKAPOS features."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="px-10 py-4 bg-olive text-white rounded-sm font-black text-sm uppercase tracking-widest hover:bg-olive transition-all shadow-lg active:scale-95"
            >
              {t('goHome') || 'Go Back Home'}
            </Link>
            <Link 
              href="/request-demo" 
              className="px-10 py-4 bg-white border border-blue-100 text-blue-800 rounded-sm font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm active:scale-95"
            >
              {t('demo') || 'Request a Demo'}
            </Link>
          </div>
          
          <div className="mt-20 pt-12 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4">
               <div className="text-2xl mb-2">📚</div>
               <h4 className="text-xs font-black text-blue-900 uppercase mb-1">Weekly Guides</h4>
               <p className="text-[10px] font-bold text-gray-500 uppercase">Expert retail management advice</p>
            </div>
            <div className="p-4">
               <div className="text-2xl mb-2">🎁</div>
               <h4 className="text-xs font-black text-blue-900 uppercase mb-1">Exclusive Offers</h4>
               <p className="text-[10px] font-bold text-gray-500 uppercase">Early bird discounts on features</p>
            </div>
            <div className="p-4">
               <div className="text-2xl mb-2">⚡</div>
               <h4 className="text-xs font-black text-blue-900 uppercase mb-1">Update Logs</h4>
               <p className="text-[10px] font-bold text-gray-500 uppercase">Be the first to see what&apos;s new</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default SubscribedPage;
