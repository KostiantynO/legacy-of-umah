// src\app\lore\[slug]\lib\getPrevAndNextSlug.ts
import { getSlugs } from '@/components/PreviewList/lib/getSlugs';

// export const getPrevSlug = async (slug: string) => {
//   const slugs = await getSlugs();
//   const idx = slugs.indexOf(slug);

//   const prev = idx > 0 ? slugs[idx - 1] : null;

//   return prev;
// };

// export const getNextSlug = async (slug: string) => {
//   const slugs = await getSlugs();
//   const idx = slugs.indexOf(slug);

//   const next = idx < slugs.length - 1 ? slugs[idx + 1] : null;

//   return next;
// };

export const getPrevAndNextSlug = async (slug: string) => {
  const slugs = await getSlugs();
  const idx = slugs.indexOf(slug);

  const prev = idx > 0 ? slugs[idx - 1] : null;
  const next = idx < slugs.length - 1 ? slugs[idx + 1] : null;

  return { prev, next };
};
