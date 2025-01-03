// src\components\PreviewList\PreviewList.tsx
import { getPageList } from './lib/getPageList';
import { PreviewItem } from './PreviewItem';

const PreviewFallback = () => <p>No pages posted yet!</p>;

export const PreviewList = async () => {
  const previews = await getPageList();

  const firstFourPages = previews.slice(0, 4);

  const previewList = (
    <ul className="grid grid-cols-1 justify-items-center gap-4">
      {firstFourPages.map(page => (
        <PreviewItem key={page.slug} {...page} />
      ))}
    </ul>
  );

  return previews.length ? previewList : <PreviewFallback />;
};
