// src\app\lore\[slug]\Article.tsx
import { returnFullPage } from '@/components/PreviewList/lib/returnFullPage';

import { mdToHtml } from './mdToHTML';

export const Article = async ({ slug }: { slug: string }) => {
  const page = await returnFullPage(slug);

  if (!page) return <div>Page not found</div>;

  const { content } = page;

  const markdown = await mdToHtml(content || '');

  return (
    <article
      className="prose dark:prose-invert lg:prose-xl prose-h1:text-xl lg:prose-h1:text-2xl prose-h1:text-center prose-h1:text-green-600 prose-h1:mb-0 prose-img:my-6 prose-img:mx-auto prose-p:my-2 flex flex-col"
      dangerouslySetInnerHTML={{ __html: markdown }}
    />
  );
};
