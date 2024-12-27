// threads.mjs
import {
  Worker,
  isMainThread,
  workerData,
  parentPort,
} from 'node:worker_threads';

if (isMainThread) {
  const data = 'some data';
  console.log(import.meta);

  const worker = new Worker(import.meta.filename, { workerData: data });
  worker.on('message', msg => console.log(msg));
} else {
  const source = workerData;
  parentPort.postMessage(source);
}

// run with `node threads.mjs`
