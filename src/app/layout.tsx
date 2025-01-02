// src\app\layout.tsx
import './globals.css';

import { Geist, Geist_Mono as Mono } from 'next/font/google';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const sans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const mono = Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Legacy of Umah: Potato Chronicles',
  description: 'My adventures with Lumi and Umah in Nosgoth',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`h-full bg-gray-900 text-gray-100 antialiased ${sans.variable} ${mono.variable} bg-[url('/bg.jpg')]`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
