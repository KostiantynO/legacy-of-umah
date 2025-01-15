// src\app\layout.tsx
import './globals.css';

import { Footer } from '@/components/Footer';

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
      {children}
      <Footer />
    </Body>
  );
};

export default RootLayout;
