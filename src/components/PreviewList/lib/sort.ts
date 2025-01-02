// src\components\PreviewList\lib\sort.ts
import type { PageContent } from '@/models/page';

export const byDate = <T extends { updatedAt: PageContent['updatedAt'] }>(
  a: T,
  b: T
): number => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();

const tokenize = (str: string): (string | number | undefined)[] =>
  str
    .match(/\D+|\d+/g)
    ?.map(token => (isNaN(Number(token)) ? token : Number(token))) ?? [];

const md = /\.md$/;

export const natural = (a: string, b: string): number => {
  const tokensA = tokenize(a.replace(md, ''));
  const tokensB = tokenize(b.replace(md, ''));

  const lengthA = tokensA.length;
  const lengthB = tokensB.length;

  for (let i = 0; i < Math.max(lengthA, lengthB); i++) {
    const charA = tokensA[i];
    const charB = tokensB[i];

    if (typeof charA === 'undefined' && typeof charB !== 'undefined') {
      return -1;
    }

    if (typeof charA !== 'undefined' && typeof charB === 'undefined') {
      return 1;
    }

    if (typeof charA === 'number' && typeof charB === 'number') {
      if (charA !== charB) {
        return charA - charB;
      }
    }

    if (typeof charA === 'string' && typeof charB === 'string') {
      if (charA !== charB) {
        return charA.localeCompare(charB);
      }
    }
  }

  return 0;
};
