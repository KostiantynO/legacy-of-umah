// src\components\PreviewList\lib\filepath.ts
import { readFile } from 'fs/promises';
import { join } from 'path';

export const loreDir = join(process.cwd(), 'lore');

export const makeFullPath = (slug: string) => join(loreDir, `${slug}.md`);

export const stripExtension = (filename: string) =>
  filename.replace(/\.md$/, '');

export const readFileUTF8 = async (fullPath: string) =>
  await readFile(fullPath, 'utf8');
