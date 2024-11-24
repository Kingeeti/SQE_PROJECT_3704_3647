import http from 'k6/http';
import { check, sleep } from 'k6';

// Define options for the test
export const options = {
  scenarios: {
    // Scenario 1: Simulate a low traffic load
    low_traffic: {
      executor: 'constant-vus',
      vus: 5, // 5 virtual users
      duration: '30s', // Run for 30 seconds
    },
    // Scenario 2: Simulate a spike in traffic
    spike_traffic: {
      executor: 'ramping-vus',
      stages: [
        { duration: '10s', target: 10 }, // Ramp up to 10 users
        { duration: '20s', target: 50 }, // Spike to 50 users
        { duration: '10s', target: 0 },  // Ramp down to 0 users
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
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1); // Simulate user think time
}
