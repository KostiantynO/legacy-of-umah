// src\app\layout.tsx
import './globals.css';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import { Body } from './Body';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Legacy of Umah: Potato Chronicles',
  description: 'My adventures with Lumi and Umah in Nosgoth',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Body>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </Body>
  );
};

export default RootLayout;
