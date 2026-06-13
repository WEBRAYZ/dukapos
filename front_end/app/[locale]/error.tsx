'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Branding Header */}
      <div className="absolute top-8 left-8">
        <Image
          src="/logo.jpeg"
          alt="DUKAPOS Logo"
          width={40}
          height={40}
          className="w-10 h-10 rounded-sm object-cover shadow-sm"
        />
      </div>
      {/* Subtle background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10 text-center">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-destructive/10 mb-8">
            <span className="text-4xl">⚠️</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Something went wrong</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            An unexpected error has occurred. Our team has been notified.
          </p>
          {error.digest && (
            <div className="p-3 bg-muted rounded-md text-xs font-mono text-muted-foreground break-all mb-4">
              Error ID: {error.digest}
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => reset()}
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Try again
          </button>
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center h-12 px-6 rounded-lg border border-input bg-background font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Back to Dashboard
          </Link>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            If the problem persists, please <Link href="/support" className="text-foreground font-medium hover:underline underline-offset-4">contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
