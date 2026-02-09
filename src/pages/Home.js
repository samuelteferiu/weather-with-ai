import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Match the backend default (server uses port 5001)
  const backendOrigin = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

  const useCurrentPosition = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((p) => {
      setPosition({ lat: p.coords.latitude.toFixed(4), lon: p.coords.longitude.toFixed(4) });
    }, (err) => {
      setError(err.message || 'Unable to get position');
    });
  };

  useEffect(() => {
    const { lat, lon } = position;
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendOrigin}/api/weather?lat=${lat}&lon=${lon}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed ${res.status}`);
        }
        const data = await res.json();

        // Map and store only useful fields for the UI
        const mapped = {
          temp: data.main?.temp,
          feels_like: data.main?.feels_like,
          humidity: data.main?.humidity,
          wind_speed: data.wind?.speed,
          description: data.weather && data.weather[0] ? data.weather[0].description : '',
          icon: data.weather && data.weather[0] ? data.weather[0].icon : null,
          name: data.name,
        };
        setWeather(mapped);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [position, backendOrigin]);

  return (
    <section className="page home-grid">
      <div className="tile tile-tl">
        <h2>Today's Weather</h2>
        {loading ? (
          <div>Loading…</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : weather ? (
          <div className="today-weather">
            <div className="temp">{Math.round(weather.temp)}°C</div>
            <div className="summary">{weather.description} — {weather.name ?? 'Current location'}</div>
            <div className="meta">Feels like {Math.round(weather.feels_like)}°C</div>
          </div>
        ) : (
          <div className="today-weather">
            <div className="temp">—</div>
            <div className="summary">No data</div>
          </div>
        )}

        <div className="four-hour-diff">
          <h4>4-hour change</h4>
          <div>Use the detailed view for history</div>
        </div>
      </div>

      <div className="tile tile-tr">
        <h3>Humidity</h3>
        <div className="stat">{weather?.humidity != null ? `${weather.humidity}%` : '—'}</div>
        <h3>Wind Speed</h3>
        <div className="stat">{weather?.wind_speed != null ? `${weather.wind_speed} m/s` : '—'}</div>
      </div>

      <div className="tile tile-bl">
        <h4>Position</h4>
        <div className="position">Lat: {position.lat ?? '—'} Lon: {position.lon ?? '—'}</div>
        <button className="btn" onClick={useCurrentPosition}>Use current position</button>

        <div className="multi-days">
          <div className="days">
            <h4>3 Days</h4>
            <div>Use detailed forecast page for multi-day data</div>
          </div>
          <div className="days">
            <h4>7 Days</h4>
            <div>Use detailed forecast page for multi-day data</div>
          </div>
        </div>
      </div>

      <div className="tile tile-br">
        <h4>More</h4>
        <div className="links">
          <Link to="/map" className="desc-link">Open Map (other country weather)</Link>
          <Link to="/geo" className="desc-link">Open Geo (details for current)</Link>
        </div>
        <p className="note">Descriptions link to Map or Geo pages for deeper views.</p>
      </div>
    </section>
  );
}
