// src\components\PreviewList\lib\getPageList.ts
import { getPagePreview } from './getPagePreview';
import { getSlugs } from './getSlugs';
import { natural } from './sort';

import type { PagePreview } from '@/models/page';

export const getPageList = async (): Promise<PagePreview[]> => {
  try {
    const slugs = await getSlugs();
    const maybePreviews = await Promise.all(slugs.map(getPagePreview));

    const previews = maybePreviews.filter((page): page is PagePreview =>
      Boolean(page)
    );

    return previews.sort((a, b) => natural(a.slug, b.slug));
  } catch (error) {
    console.log(error);
    return [];
  }
};
