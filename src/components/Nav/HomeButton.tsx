// src\components\Nav\HomeButton.tsx
import Link from 'next/link';

export const HomeButton = () => {
  return (
    <Link
      href="/"
      className="flex flex-col items-center gap-1 justify-self-end py-2"
    >
      <img src="/home-glyph.gif" height="98" width="95" alt="" />
      <span className="text-xs text-green-600">Home</span>
    </Link>
  );
};
