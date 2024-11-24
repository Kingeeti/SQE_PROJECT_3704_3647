// person1-load-test2.js
import http from 'k6/http';

export let options = {
  scenarios: {
    ramp_up: {
      executor: 'ramping-vus',
      stages: [
        { duration: '30s', target: 10 },  // Ramp up to 10 users
        { duration: '30s', target: 30 },  // Ramp up to 30 users
        { duration: '30s', target: 0 },   // Ramp down to 0 users
      ],
    },
  },
};

export default function () {
  http.get('https://jsonplaceholder.typicode.com/posts');  // Authentic app URL
};
