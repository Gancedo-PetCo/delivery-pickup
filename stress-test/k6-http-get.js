import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

var errorCounter = new Counter('error_count');

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '10m', target: 100 },
    { duration: '5m', target: 0 }
    // { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],

};

export default function () {

  const url = ['GET', 'http://localhost:3006/app/99', null, { tags: { name: 'wat' } }];
  let batchCalls = Array(10).fill(url);
  let batch = http.batch(batchCalls);

  batch.forEach((res) => {
    check(res, {
      'is status 200': (r) => r.status === 200,
    }) || errorCounter.add(1);
  });
  sleep(1);
}