import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

var errorCounter = new Counter('error_count');
// const url = 'http://52.9.1.123:3006';
const url = 'http://localhost:3006';

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '10m', target: 100 },
    { duration: '5m', target: 0 }
    // { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],

};

export default function () {

  const urlParam = ['GET', `${url}/app/99`, null, { tags: { name: 'wat' } }];
  let batchCalls = Array(10).fill(urlParam);
  let batch = http.batch(batchCalls);

  batch.forEach((res) => {
    check(res, {
      'is status 200': (r) => r.status === 200,
    }) || errorCounter.add(1);
  });
  sleep(1);
}