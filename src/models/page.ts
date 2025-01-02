// src\models\page.ts
import { z } from 'zod';

import type { TypeOf } from 'zod';

const date = z.date().min(new Date('2024-12-30')).max(new Date('2100-12-30'));
export const PageModel = z.object({
  slug: z.string().min(2).max(64),
  author: z.string().min(2).max(64),
  title: z.string().min(2).max(64),
  summary: z.string().min(10).max(512),
  createdAt: date,
  updatedAt: date,

  content: z.string().min(10).max(100000),
});

export const PagePreviewModel = PageModel.omit({ content: true });

export interface PageContent extends TypeOf<typeof PageModel> {}
export interface PagePreview extends TypeOf<typeof PagePreviewModel> {}
