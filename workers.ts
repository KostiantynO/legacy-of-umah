// workers.ts
import { readdir, readFile } from 'node:fs/promises';
import { cpus } from 'node:os';
import { join } from 'node:path';
import {
  isMainThread,
  parentPort,
  Worker,
  workerData,
} from 'node:worker_threads';

const cpuCount = cpus().length;
const loreDir = join(import.meta.dirname, 'lore');

const tokenize = (str: string): (string | number | undefined)[] =>
  str
    .match(/\D+|\d+/g)
    ?.map(token => (isNaN(Number(token)) ? token : Number(token))) ?? [];

const md = /\.md$/;

const natSort = (a: string, b: string): number => {
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

type PathContent = [path: string, content: string];

interface WorkerResponse extends Array<PathContent> {}

const mapLogFilter = (
  settled: PromiseSettledResult<PathContent>[]
): WorkerResponse =>
  settled
    .map(promise =>
      promise.status === 'rejected'
        ? (console.error(promise.reason), false)
        : promise.value
    )
    .filter(string => string !== false);

if (isMainThread) {
  const mainThread = async () => {
    try {
      const dir = await readdir(loreDir, 'utf8');
      const totalFiles = dir.length;
      const filesPerWorker = Math.max(5, Math.ceil(totalFiles / cpuCount));

      const numberOfWorkers = Math.ceil(totalFiles / filesPerWorker);

      const chunks = Array(numberOfWorkers)
        .fill(null)
        .map((_, cpuId) => {
          const start = filesPerWorker * cpuId;
          const end = Math.min(start + filesPerWorker, totalFiles);

          return dir.slice(start, end);
        });

      const manager = async (chunksArr: string[][]): Promise<PathContent[]> =>
        new Promise((res, rej) => {
          const result: WorkerResponse[] = [];

          const workerCount = chunksArr.length;
          let completed = 0;

          const onMessage = (cpuId: number, message: WorkerResponse) => {
            if (completed < workerCount) {
              result[cpuId] = message;
              completed += 1;
              if (completed === workerCount) {
                const arrayOfArraysWithPathAndContent = result
                  .flat()
                  .sort((a, b) => natSort(a[0], b[0]));
                res(arrayOfArraysWithPathAndContent);
                return;
              }
              return;
            }
          };

          const workers: (Worker | undefined)[] = Array(workerCount)
            .fill(null)
            .map((_, cpuId) => {
              const worker = new Worker(import.meta.filename, {
                workerData: chunksArr[cpuId],
              });

              worker.on('message', (message: WorkerResponse) => {
                onMessage(cpuId, message);
                worker.terminate().catch(console.error);
                workers[cpuId] = undefined;
              });

              worker.on('error', error => {
                console.error('error in worker', error);

                worker.terminate().catch(console.error);
                workers[cpuId] = undefined;
              });

              worker.on('exit', code => {
                worker.terminate().catch(console.error);
                workers[cpuId] = undefined;

                if (code !== 0) {
                  rej(
                    new Error(`Worker exited with code ${code.toString(10)}`)
                  );
                }
              });

              return worker;
            });
        });

      try {
        const res = await manager(chunks);
        console.log(res.map(([path]) => path));
      } catch (error) {
        console.error('Error in manager:', error);
      }
    } catch (error) {
      console.error('error in main thread:', error);
    }
  };

  mainThread().catch(console.error);
} else {
  const lorePage = (path: string) => join(loreDir, path);

  const source: unknown = workerData;

  const isStringArray = (arg: unknown): arg is string[] =>
    arg &&
    typeof arg === 'object' &&
    Array.isArray(arg) &&
    arg.length &&
    typeof arg[0] === 'string'
      ? true
      : false;

  if (isStringArray(source)) {
    const workerThread = async () => {
      const promises: Promise<[path: string, content: string]>[] = source.map(
        async path =>
          [path, await readFile(lorePage(path), 'utf8')] satisfies [
            string,
            string,
          ]
      );

      try {
        const settled = await Promise.allSettled(promises);
        const content: WorkerResponse = mapLogFilter(settled);
        parentPort?.postMessage(content);
      } catch (error) {
        console.error('Worker thread error:', error);
        throw error;
      }
    };

    workerThread().catch(console.error);
  }
}
