import type { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="container m-auto max-w-2xl px-4">{children}</div>
);
