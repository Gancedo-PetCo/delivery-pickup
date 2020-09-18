import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '3m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '3m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    // { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],

}

export default function () {
  http.get('http://localhost:3000/app');
  sleep(1);
}