// src\app\lore\[slug]\Article.tsx
import { returnFullPage } from '@/components/PreviewList/lib/returnFullPage';

import { mdToHtml } from './mdToHTML';

export const Article = async ({ slug }: { slug: string }) => {
  const page = await returnFullPage(slug);

  if (!page) return <div>Page not found</div>;

  const { content } = page;

  const markdown = await mdToHtml(content || '');

  return (
    <article className="flex flex-col gap-10">
      <div className="prose" dangerouslySetInnerHTML={{ __html: markdown }} />
    </article>
  );
};
