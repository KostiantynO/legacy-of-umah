// src\app\lore\[slug]\layout.tsx
import { Header } from '@/components/Header';
import { getSlugs } from '@/components/PreviewList/lib/getSlugs';

import { getPrevAndNextSlug } from './lib/getPrevAndNextSlug';
import { NextButton } from './NextButton';

import type { ReactNode } from 'react';

export const generateStaticParams = async () =>
  (await getSlugs()).map(slug => ({ slug }));

const LoreLayout = async ({
  params,
  children,
}: {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}) => {
  const { slug } = await params;
  const { prev, next } = await getPrevAndNextSlug(slug);

  return (
    <main className="flex-grow">
      <Header prev={prev} />
      {children}
      {next && <NextButton next={next} />}
    </main>
  );
};

export default LoreLayout;
