import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

var errorCounter = new Counter("error_count");
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


  let batchCalls = Array(10).fill(0).map(() => {
    let id = Math.floor(Math.random() * 1000000 + 9000000);
    return ['GET', `${url}/availableAt/${id}`, null, { tags: { name: 'wat' } }];
  });
  let batch = http.batch(batchCalls);

  batch.forEach((res) => {
    check(res, {
      'is status 200': (r) => r.status === 200,
    }) || errorCounter.add(1);
  });
  sleep(1);
}