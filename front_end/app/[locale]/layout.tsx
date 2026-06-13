import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import LoadingProvider from "@/app/components/providers/loading-provider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DUKAPOS - Advanced POS & Inventory Management",
  description: "The ultimate solution for your retail business with M-Pesa integration and real-time analytics.",
  verification: {
    google: "your-google-verification-code-here",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  console.log('RootLayout rendering for locale:', locale);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    console.log('Locale not found in routing.locales, calling notFound()');
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  console.log('Fetching messages for locale:', locale);
  const messages = await getMessages();
  console.log('Messages fetched successfully');

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
