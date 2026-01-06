// express-threat-api-server.js
// Quick Node.js/Express server to mock the backend API
// I spin this up locally when I want to test against a real-ish endpoint
// In production the data would come from actual hardware/sensors
// Jaan John

const express = require('express');
const app = express();
const port = 3000;  // Easy local port

// Fake data store – normally this would hit a DB or embedded system
let threatData = {
  threats: [
    {
      location: 'lat:40.7128, lon:-74.0060',  // Just some sample coords
      confidence: 0.95,
      type: 'potential_anomaly',
      timestamp: new Date().toISOString()
    }
  ]
};

// GET endpoint that the Playwright test hits
app.get('/api/threat/status', (req, res) => {
  const vesselId = req.query.vesselId;  // Grab the query param
  
  // Validation check
  if (!vesselId) {
    return res.status(400).json({ error: 'vesselId required' });
  }

  // Send back the mock data
  res.status(200).json(threatData);
});

// Boot it up
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});