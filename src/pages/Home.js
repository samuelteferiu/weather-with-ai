import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [position, setPosition] = useState({ lat: null, lon: null });

  const useCurrentPosition = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((p) => {
      setPosition({ lat: p.coords.latitude.toFixed(4), lon: p.coords.longitude.toFixed(4) });
    });
  };

  return (
    <section className="page home-grid">
      <div className="tile tile-tl">
        <h2>Today's Weather</h2>
        <div className="today-weather">
          <div className="temp">22°C</div>
          <div className="summary">Partly Cloudy</div>
        </div>
        <div className="four-hour-diff">
          <h4>4-hour change</h4>
          <div>-1°C (since 4 hours ago)</div>
        </div>
      </div>

      <div className="tile tile-tr">
        <h3>Humidity</h3>
        <div className="stat">56%</div>
        <h3>Wind Speed</h3>
        <div className="stat">12 km/h</div>
      </div>

      <div className="tile tile-bl">
        <h4>Position</h4>
        <div className="position">Lat: {position.lat ?? '—'} Lon: {position.lon ?? '—'}</div>
        <button className="btn" onClick={useCurrentPosition}>Use current position</button>

        <div className="multi-days">
          <div className="days">
            <h4>3 Days</h4>
            <div>Mostly sunny → 21/17/19°C</div>
          </div>
          <div className="days">
            <h4>7 Days</h4>
            <div>Mix of sun and showers</div>
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
