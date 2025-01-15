// src\components\Nav\BackButton.tsx
import Link from 'next/link';

export const BackButton = ({ prev }: { prev: string }) => {
  return (
    <Link
      href={`/lore/${prev}`}
      className="flex shrink grow-0 flex-col items-center gap-1 py-2"
    >
      <img src="/arrow-left.webp" height="41" width="83" alt="" />
      <span className="text-xs text-green-600">Back</span>
    </Link>
  );
};
