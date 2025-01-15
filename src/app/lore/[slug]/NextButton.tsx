// src\app\lore\[slug]\NextButton.tsx
import Link from 'next/link';

export const NextButton = ({ next }: { next: string }) => {
  return (
    <Link
      className="flex flex-col items-center gap-1 rounded px-4 py-2 text-green-600"
      href={`/lore/${next}`}
    >
      <img
        src="/door.webp"
        height="150"
        width="159"
        className="mx-auto"
        alt=""
      />
      <span className="italic">Continue...</span>
    </Link>
  );
};
