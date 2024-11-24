import http from 'k6/http';
import { check, sleep } from 'k6';

// Define options for the test
export const options = {
  scenarios: {
    // Scenario 1: Simulate a moderate load
    moderate_traffic: {
      executor: 'constant-vus',
      vus: 10, // 10 virtual users
      duration: '45s', // Run for 45 seconds
    },
    // Scenario 2: Simulate a large number of users in a burst
    burst_traffic: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 20 },  // Ramp up to 20 users
        { duration: '15s', target: 80 },  // Spike to 80 users
        { duration: '10s', target: 20 },  // Ramp down to 20 users
      ],
    },
  },
};

// Test logic for both scenarios
export default function () {
  const url = 'https://test.k6.io'; // Replace with your application URL
  const response = http.get(url);

  // Validate response
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 400ms': (r) => r.timings.duration < 400,
  });

  sleep(1); // Simulate user think time
}
