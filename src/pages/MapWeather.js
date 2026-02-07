import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OWM_API_KEY } from '../config';

const COUNTRIES = [
  { code: 'FR', name: 'France', capital: 'Paris', lat: 48.8566, lon: 2.3522 },
  { code: 'ES', name: 'Spain', capital: 'Madrid', lat: 40.4168, lon: -3.7038 },
  { code: 'US', name: 'United States', capital: 'Washington', lat: 38.9072, lon: -77.0369 },
  { code: 'JP', name: 'Japan', capital: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { code: 'AU', name: 'Australia', capital: 'Canberra', lat: -35.2809, lon: 149.1300 },
];

export default function MapWeather() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCapitalWeather(country) {
    setError(null);
    setLoading(true);
    setSelected(null);

    try {
      if (!OWM_API_KEY || OWM_API_KEY === '<YOUR_API_KEY>') {
        // Provide mock data when API key is not configured
        const mock = {
          country: country.name,
          capital: country.capital,
          temp: '21°C',
          description: 'Partly cloudy',
          humidity: '58%',
          wind: '10 km/h',
          lat: country.lat,
          lon: country.lon,
        };
        setSelected(mock);
        setLoading(false);
        return;
      }

      const q = encodeURIComponent(country.capital + ',' + country.code);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${OWM_API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
      const d = await res.json();
      const data = {
        country: country.name,
        capital: country.capital,
        temp: `${Math.round(d.main.temp)}°C`,
        description: d.weather && d.weather[0] ? d.weather[0].description : '',
        humidity: `${d.main.humidity}%`,
        wind: `${d.wind.speed} m/s`,
        lat: d.coord.lat,
        lon: d.coord.lon,
      };
      setSelected(data);
    } catch (e) {
      setError('Could not load weather.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page map-page">
      <h1>Map Weather</h1>
      <div className="map-grid">
        <div className="globe" role="img" aria-label="globe placeholder">
          {/* Simple globe placeholder. Replace with interactive globe library if desired. */}
          <svg viewBox="0 0 200 200" className="globe-svg">
            <circle cx="100" cy="100" r="90" fill="url(#g)" stroke="#143" strokeWidth="2" />
            <defs>
              <radialGradient id="g">
                <stop offset="0%" stopColor="#154" />
                <stop offset="100%" stopColor="#062" />
              </radialGradient>
            </defs>
            <text x="50%" y="50%" textAnchor="middle" fill="#9fb4d6" fontSize="10">Interactive Globe</text>
          </svg>
        </div>

        <div className="country-list">
          <h3>Tap a country</h3>
          <ul>
            {COUNTRIES.map((c) => (
              <li key={c.code}>
                <button className="country-btn" onClick={() => fetchCapitalWeather(c)}>{c.name}</button>
              </li>
            ))}
          </ul>

          {loading && <div className="loader">Loading…</div>}
          {error && <div className="error">{error}</div>}

          {selected && (
            <div className="selected-card">
              <h4>{selected.capital}, {selected.country}</h4>
              <div className="meta">{selected.temp} — {selected.description}</div>
              <div className="meta">Humidity: {selected.humidity} — Wind: {selected.wind}</div>
              <div className="actions">
                <Link to="/geo" state={{ fromMap: true, data: selected }} className="btn-link">Open Geo details</Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="hint">Tip: Replace the globe placeholder with a real interactive globe library (e.g., three-globe).</p>
    </section>
  );
}
