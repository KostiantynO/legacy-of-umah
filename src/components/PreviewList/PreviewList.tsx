// src\components\PreviewList\PreviewList.tsx
import { getPageList } from './lib/getPageList';
import { PreviewItem } from './PreviewItem';

const PreviewFallback = () => <p>No pages posted yet!</p>;

export const PreviewList = async () => {
  const previews = await getPageList();

  const previewList = (
    <ul className="grid grid-cols-1 gap-4">
      {previews.map(page => (
        <PreviewItem key={page.slug} {...page} />
      ))}
    </ul>
  );

  return previews.length ? previewList : <PreviewFallback />;
};
