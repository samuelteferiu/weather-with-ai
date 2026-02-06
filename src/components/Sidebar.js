import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function IconHome() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 10.5L12 4L21 10.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M20.5 3l-5 2-6-2-6 2v15l6-2 6 2 5-2V3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconGeo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const root = document.querySelector('.app-root');
    if (open) {
      root?.classList.add('sidebar-open');
    } else {
      root?.classList.remove('sidebar-open');
    }
    return () => root?.classList.remove('sidebar-open');
  }, [open]);
  return (
    <>
      <button
        className={`sidebar-toggle ${open ? 'open' : 'closed'}`}
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close sidebar' : 'Open sidebar'}
        title={open ? 'Close' : 'Open'}
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
      </button>

      <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end className={({isActive})=> isActive? 'active': ''} title="Home" aria-label="Home">
                <div className="nav-item">
                  <IconHome />
                  <span className="nav-label">Home</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/map" className={({isActive})=> isActive? 'active': ''} title="Map Weather" aria-label="Map Weather">
                <div className="nav-item">
                  <IconMap />
                  <span className="nav-label">Map Weather</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/geo" className={({isActive})=> isActive? 'active': ''} title="Weather" aria-label="Weather">
                <div className="nav-item">
                  <IconGeo />
                  <span className="nav-label">Weather</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
