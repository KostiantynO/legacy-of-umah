// src\app\lore\[slug]\mdToHTML.ts
import { remark } from 'remark';
import html from 'remark-html';

import type { VFileCompatible } from 'vfile';

const HTMLProcessor = remark().use(html);

export const mdToHtml = async (markdown: VFileCompatible) =>
  (await HTMLProcessor.process(markdown)).toString();
