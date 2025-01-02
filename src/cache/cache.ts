// src\cache\cache.ts
import { readFileUTF8 } from '@/components/PreviewList/lib/filepath';

const cache = new Map<string, string>();

export const readCache = async (path: string): Promise<string> => {
  if (cache.has(path)) return cache.get(path) ?? '';

  const file = await readFileUTF8(path);

  cache.set(path, file);
  return file;
};

const mapLogFilter = <T>(settled: PromiseSettledResult<T>[]): T[] =>
  settled
    .map(promise =>
      promise.status === 'rejected'
        ? (console.error(promise.reason), false)
        : promise.value
    )
    .filter((item): item is T => item !== false);

export const batchCacheRead = async (
  paths: string[]
): Promise<Record<string, string>> => {
  const promises = paths.map(
    async path => [path, await readCache(path)] satisfies [string, string]
  );

  const settled = await Promise.allSettled(promises);

  const stringTupleArr = mapLogFilter(settled);

  return Object.fromEntries(stringTupleArr);
};
