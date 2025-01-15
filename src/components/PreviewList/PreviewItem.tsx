// src\components\PreviewList\PreviewItem.tsx
import Link from 'next/link';

import type { PagePreview } from '@/models/page';

export const PreviewItem = ({ slug, title }: PagePreview) => {
  return (
    <li className="grid grid-flow-col justify-between gap-8">
      <div className="flex gap-2">
        <Link href={`/lore/${slug}`}>
          <h2 className="text-nowrap">{title}</h2>
        </Link>
      </div>
    </li>
  );
};
