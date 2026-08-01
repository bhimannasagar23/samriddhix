import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = ({ onWeatherUpdate }) => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Bengaluru');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/weather/${city}`);
      setWeather(data);
      onWeatherUpdate && onWeatherUpdate(data);
    } catch (e) {
      console.error('Weather error:', e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchWeather(); }, []);

  const getAdvice = (temp, humidity) => {
    if (humidity > 80) return '💧 High humidity — watch for fungal diseases';
    if (temp > 38) return '☀️ Very hot — increase irrigation frequency';
    if (temp < 15) return '❄️ Cold — protect sensitive crops at night';
    return '✅ Good conditions for farming today';
  };

  return (
    <div className="glass-card">
      <div style={{ display:'flex', gap:'8px', marginBottom:'1rem' }}>
        <input value={city} onChange={e => setCity(e.target.value)}
          style={{ flex:1, padding:'8px 12px', borderRadius:'8px',
            border:'1px solid var(--border)', background:'var(--bg-dark)', color:'var(--text-primary)' }}
          placeholder="Enter city..." />
        <button className="btn-glow" style={{ padding:'8px 16px', fontSize:'13px' }}
          onClick={fetchWeather}>Go</button>
      </div>

      {loading && <div style={{ textAlign:'center', color:'var(--accent)' }}>Loading...</div>}

      {weather && (
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'1rem' }}>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather" width="60" />
            <div>
              <div style={{ fontSize:'2.5rem', fontWeight:800 }}>{Math.round(weather.temperature)}°C</div>
              <div style={{ color:'var(--text-secondary)', textTransform:'capitalize' }}>{weather.description}</div>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'1rem' }}>
            {[
              { label:'Humidity', value:`${weather.humidity}%` },
              { label:'Wind', value:`${weather.windSpeed} m/s` },
            ].map((s,i) => (
              <div key={i} style={{ padding:'10px', borderRadius:'10px',
                background:'rgba(255,255,255,0.05)', textAlign:'center' }}>
                <div style={{ color:'var(--text-secondary)', fontSize:'12px' }}>{s.label}</div>
                <div style={{ fontWeight:700, fontSize:'18px', color:'var(--accent)' }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div style={{ padding:'10px 14px', borderRadius:'10px',
            background:'rgba(0,210,106,0.1)', fontSize:'13px' }}>
            {getAdvice(weather.temperature, weather.humidity)}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;