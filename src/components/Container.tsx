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
    <div className={cn('mx-auto max-w-screen-md px-4 py-6', className)}>
      {children}
    </div>
  );
};
