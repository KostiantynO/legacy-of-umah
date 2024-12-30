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
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
