require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Read API key from environment for security and flexibility
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

if (!OPENWEATHER_API_KEY) {
  // eslint-disable-next-line no-console
  console.warn('OPENWEATHER_API_KEY is not set. Requests to /api/weather will return an error until it is configured.');
}

app.use(cors());

app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'lat and lon required' });

  try {
    if (!OPENWEATHER_API_KEY) {
      return res.status(500).json({ error: 'OpenWeather API key not configured on the server. Set OPENWEATHER_API_KEY environment variable.' });
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const resp = await fetch(url);
    const text = await resp.text();

    // forward status and body
    res.status(resp.status).set('content-type', resp.headers.get('content-type') || 'application/json').send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Weather proxy server listening on port ${PORT}`);
});
