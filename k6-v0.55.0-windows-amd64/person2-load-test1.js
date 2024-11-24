// person2-load-test1.js
import http from 'k6/http';

export let options = {
  vus: 20,  // 20 virtual users
  duration: '2m',  // test for 2 minutes
};

export default function () {
  http.get('https://jsonplaceholder.typicode.com/posts');  // Authentic app URL
};
