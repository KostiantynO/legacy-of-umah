// src\components\PreviewList\lib\getPagePreview.ts
import matter from 'gray-matter';

import { PagePreviewModel } from '@/models/page';

import { makeFullPath, readFileUTF8 } from './filepath';

import type { PagePreview } from '@/models/page';

export const getPagePreview = async (
  slug: string
): Promise<PagePreview | undefined> => {
  try {
    if (!slug || slug.length > 100) return;

    const path = makeFullPath(slug);
    const file = await readFileUTF8(path);
    const { data } = matter(file);

    return await PagePreviewModel.parseAsync({ ...data, slug });
  } catch (error) {
    console.log(error);
    return;
  }
};
