'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

const Error404 = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center p-3 text-white relative overflow-hidden">
      {/* Branding Header */}
      <div className="absolute top-8 left-8">
        <Image
          src="/logo.jpeg"
          alt="DUKAPOS Logo"
          width={40}
          height={40}
          className="w-10 h-10 rounded-sm object-cover shadow-sm opacity-80"
        />
      </div>
      {/* Subtle Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10 text-center">
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-lg bg-primary/10 border border-primary/20 mb-8 relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
            <FileQuestion className="w-10 h-10 text-red-500 relative" />
          </div>
          
          <div className="relative inline-block mb-3">
            <h1 className="text-8xl font-black text-red-200/20 absolute -top-8 left-1/2 -translate-x-1/2 select-none">404</h1>
            <h2 className="text-4xl font-bold text-white relative">Page Not Found</h2>
          </div>
          
          <p className="text-blue-200/70 text-lg">
            Oops! The page you are looking for has vanished or never existed in our system.
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-sm bg-linear-to-l from-blue-800 to-blue-950 text-primary-foreground font-semibold transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Return to Dashboard
          </Link>
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-sm border border-blue-800 text-white bg-blue-900/50 font-medium transition-all hover:bg-blue-900 hover:text-white active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
        
        <div className="mt-12 pt-4 border-t border-blue-900 flex flex-col items-center gap-4">
          <p className="text-sm text-blue-300/60">
            Having trouble? <Link href="/support" className="text-blue-400 font-medium hover:underline underline-offset-4">Contact Support</Link>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/status" className="text-xs text-blue-400/60 hover:text-blue-300 transition-colors">System Health</Link>
            <span className="w-1 h-1 rounded-full bg-blue-800"></span>
            <Link href="/help" className="text-xs text-blue-400/60 hover:text-blue-300 transition-colors">Help Center</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;