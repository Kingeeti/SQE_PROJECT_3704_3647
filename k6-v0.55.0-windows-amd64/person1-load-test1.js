// person1-load-test1.js
import http from 'k6/http';

export let options = {
  vus: 10,  // 10 virtual users
  duration: '1m',  // test for 1 minute
};

export default function () {
  http.get('https://jsonplaceholder.typicode.com/posts');  // Authentic app URL
};
