import React from 'react';
import { useLocation } from 'react-router-dom';

export default function GeoWeather() {
  const loc = useLocation();
  const state = loc.state?.data;

  return (
    <section className="page geo-page">
      <h1>Geo Weather Details</h1>
      {!state && (
        <div>
          <p>No detailed data provided. You can open this page from the Map to view capital details.</p>
        </div>
      )}

      {state && (
        <div className="geo-card">
          <h2>{state.capital}, {state.country}</h2>
          <div className="temp-large">{state.temp}</div>
          <div className="desc">{state.description}</div>
          <ul className="details">
            <li><strong>Humidity:</strong> {state.humidity}</li>
            <li><strong>Wind:</strong> {state.wind}</li>
            <li><strong>Coordinates:</strong> {state.lat}, {state.lon}</li>
          </ul>
        </div>
      )}
    </section>
  );
}
