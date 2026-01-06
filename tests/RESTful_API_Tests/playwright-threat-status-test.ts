// playwright-threat-status-test.ts
// This is a Playwright test I wrote to validate a RESTful API endpoint
// It sends a GET request to check threat/detection status and verifies the response
// Super useful for isolated backend testing without going through the full UI
// Jaan John

import { test, expect } from '@playwright/test';

// Clear test name so it's easy to spot in reports
test('Validate threat detection status via GET request', async ({ request }) => {

  // Send a GET request
  // Adding a query param to specify which system we're querying
  // Headers are there for auth and to make sure we get JSON back

  const response = await request.get('/api/threat/status', {
    params: { vesselId: 'ACTUV-001' },  // In real projects this could be any device ID
    headers: { 
      'Authorization': 'Bearer mock-token',  // Mocking a real auth token
      'Accept': 'application/json'           // Tell server we want JSON
    }
  });

  // Quick sanity checks – did we actually get a good response?
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  // Pull out the JSON payload
  const data = await response.json();

  // Make sure the structure is what we expect
  expect(data).toHaveProperty('threats');
  expect(data.threats).toBeInstanceOf(Array);
  
  // Only dig deeper if there are actual threats
  if (data.threats.length > 0) {
    expect(data.threats[0]).toHaveProperty('location');
    expect(data.threats[0]).toHaveProperty('confidence');

    // Confidence should be high
    expect(data.threats[0].confidence).toBeGreaterThan(0.5);
  }

  // Logging the data to help debug flaky stuff
  console.log('Threat Data:', data);
});