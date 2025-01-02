// src\components\PreviewList\lib\getSlugs.ts
import { readdir } from 'fs/promises';
import { join } from 'path';

import { stripExtension } from './filepath';

export const loreDir = join(process.cwd(), 'src', 'lore');

export const getSlugs = async (): Promise<string[]> => {
  try {
    const files = await readdir(loreDir);
    return files.map(stripExtension);
  } catch (err) {
    console.error('Error reading dir:', err);
    return [];
  }
};
