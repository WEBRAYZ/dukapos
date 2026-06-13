'use client';

import React from 'react';
import Image from 'next/image';

/**
 * Utility to merge class names
 */
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

type ClassicProps = Omit<React.ComponentProps<"span">, "children">;

function Classic({ className, ...props }: ClassicProps) {
  return (
    <>
      <style>{`
        @keyframes loading-ui-classic-fade {
          0% {
            opacity: 1;
          }

          100% {
            opacity: 0.15;
          }
        }
      `}</style>
      <span
        role="status"
        className={cn("box-border inline-block size-6 text-blue-600", className)}
        {...props}
      >
        <span
          aria-hidden="true"
          className="relative top-1/2 left-1/2 block size-full"
        >
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className="absolute top-[-3.9%] left-[-10%] block h-[8%] w-[24%] rounded-full bg-current"
              style={{
                transform: `rotate(${index * 30}deg) translate(146%)`,
                animation:
                  "loading-ui-classic-fade 1.2s linear infinite",
                animationDelay: `calc(1.2s / 12 * ${index - 12})`,
              }}
            />
          ))}
        </span>
        <span className="sr-only">Loading...</span>
      </span>
    </>
  );
}

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-50 backdrop-blur-sm">
      <div className="bg-transparent flex flex-col items-center space-y-4">
        <Classic className="size-12" />
        <div className="flex flex-col items-center">
          <Image
            src="/logo.jpeg"
            alt="DUKAPOS Logo"
            width={64}
            height={64}
            className="w-16 h-16 rounded-2xl shadow-xl mb-4"
          />
          <h2 className="text-blue-950 font-bold text-xl">DUKAPOS</h2>
          <p className="text-blue-800 text-sm animate-pulse">Initializing systems...</p>
        </div>
      </div>
    </div>
  );
};

export { Classic, LoadingPage };
export default LoadingPage;
