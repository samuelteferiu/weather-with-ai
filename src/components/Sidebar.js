import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">WeatherApp</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end className={({isActive})=> isActive? 'active': ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/map" className={({isActive})=> isActive? 'active': ''}>
              Map Weather
            </NavLink>
          </li>
          <li>
            <NavLink to="/geo" className={({isActive})=> isActive? 'active': ''}>
              Geo Weather
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
