// src\components\Container.tsx
import { cn } from '@/styles/cn';

import type { ReactNode } from 'react';

export const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('container mx-auto max-w-2xl px-4 py-6', className)}>
      {children}
    </div>
  );
};
