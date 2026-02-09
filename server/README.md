Usage
-----

Set your OpenWeather API key via environment variable or a `.env` file.

- Quick (PowerShell):

```powershell
$env:OPENWEATHER_API_KEY="YOUR_KEY"
npm start
```

- Or create a `.env` file in this `server/` folder (based on `.env.example`):

```
OPENWEATHER_API_KEY=YOUR_KEY
```

Then run:

```bash
npm install
npm start
```

The server listens on port 5000 by default and exposes:

`GET /api/weather?lat={lat}&lon={lon}`

It proxies requests to OpenWeather and returns JSON.
