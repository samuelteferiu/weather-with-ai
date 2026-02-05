import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import MapWeather from './pages/MapWeather';
import GeoWeather from './pages/GeoWeather';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapWeather />} />
            <Route path="/geo" element={<GeoWeather />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
