// src\app\Body.tsx
import type { ReactNode } from 'react';

export const Body = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en" className="dark h-full !overflow-visible">
      <body className="flex h-full min-h-screen flex-col justify-between !overflow-visible bg-background bg-gray-900 bg-[url('/bg.jpg')] font-serif text-foreground text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
};
