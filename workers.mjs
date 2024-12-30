import {
  isMainThread,
  parentPort,
  Worker,
  workerData,
} from 'node:worker_threads';

if (isMainThread) {
  const data = 'some data';
  console.log(import.meta);

  const worker = new Worker(import.meta.filename, { workerData: data });

  worker.on('message', console.log);
} else {
  if (typeof workerData === 'string' && parentPort) {
    const source = workerData;
    parentPort.postMessage(source);
  }
}

// run with `node threads.mjs`