// src\app\lore\[slug]\Article.tsx
import { fromNow } from '@/components/PreviewList/lib/fromNow';
import { returnFullPage } from '@/components/PreviewList/lib/returnFullPage';

import { mdToHtml } from './mdToHTML';

export const Article = async ({ slug }: { slug: string }) => {
  const post = await returnFullPage(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const { author, updatedAt, title, summary, content } = post;

  const hasSummary = summary ? <p className="text-xl">{summary}</p> : null;

  const markdown = await mdToHtml(content || '');

  const postTime = `${fromNow(updatedAt)} ago`;

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{title}</h1>

        <div className="flex gap-x-4 gap-y-2">
          {author}
          <time className="flex text-gray-400">{postTime}</time>
        </div>

        {hasSummary}
      </header>

      <div className="prose" dangerouslySetInnerHTML={{ __html: markdown }} />
    </article>
  );
};
