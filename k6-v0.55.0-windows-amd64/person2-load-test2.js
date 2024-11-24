// person2-load-test2.js
import http from 'k6/http';

export let options = {
  scenarios: {
    burst_load: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 50 },  // Ramp up to 50 users
        { duration: '10s', target: 100 }, // Ramp up to 100 users
        { duration: '10s', target: 0 },   // Ramp down to 0 users
      ],
    },
  },
};

export default function () {
  http.get('https://jsonplaceholder.typicode.com/posts');  // Authentic app URL
};
