// src\components\PreviewList\lib\returnFullPage.ts
import matter from 'gray-matter';

import { PageModel } from '@/models/page';

import { makeFullPath, readFileUTF8 } from './filepath';

import type { PageContent } from '@/models/page';

export const returnFullPage = async (
  slug: string
): Promise<PageContent | undefined> => {
  try {
    const path = makeFullPath(slug);
    const file = await readFileUTF8(path);
    const { content, data } = matter(file);

    const fullPage = await PageModel.parseAsync({ ...data, slug, content });
    return fullPage;
  } catch (error) {
    console.log(error);
    return;
  }
};
