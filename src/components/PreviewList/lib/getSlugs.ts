// src\components\PreviewList\lib\getSlugs.ts
import { readdir } from 'fs/promises';

import { cache } from 'react';

import { loreDir, stripExtension } from './filepath';
import { natural } from './sort';

export const getSlugs = cache(async (): Promise<string[]> => {
  try {
    const files = await readdir(loreDir);
    return files.map(stripExtension).sort(natural);
  } catch (err) {
    console.error('Error reading dir:', err);
    return [];
  }
});
