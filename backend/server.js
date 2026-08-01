const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// ── Health check
app.get('/api/health', (req, res) => res.json({ status: 'SamriddhiX API running ✅', time: new Date() }));

// ── Govt schemes
app.get('/api/schemes', (req, res) => {
  res.json(require('./data/govt_schemes.json'));
});

// ── Mandi prices (mock real-time)
app.get('/api/mandi', (req, res) => {
  const prices = [
    { crop: 'Wheat', state: 'MP', mandi: 'Indore APMC', price: 2275, change: 45, unit: 'quintal' },
    { crop: 'Maize', state: 'MH', mandi: 'Nagpur Mandi', price: 1890, change: -20, unit: 'quintal' },
    { crop: 'Tomato', state: 'MH', mandi: 'Pune Market', price: 3200, change: 180, unit: 'quintal' },
    { crop: 'Soybean', state: 'MP', mandi: 'Bhopal APMC', price: 4100, change: 60, unit: 'quintal' },
    { crop: 'Cotton', state: 'MH', mandi: 'Akola Mandi', price: 6800, change: 0, unit: 'quintal' },
    { crop: 'Rice', state: 'AP', mandi: 'Guntur APMC', price: 2150, change: 30, unit: 'quintal' },
  ];
  // Simulate slight price variation
  prices.forEach(p => { p.price += Math.floor((Math.random() - 0.5) * 40); });
  res.json(prices);
});

// ── Crop recommendations
app.get('/api/crops/recommend', (req, res) => {
  const { temp = 28, humidity = 65, rainfall = 100, season = 'kharif', soil = 'loamy' } = req.query;
  const crops = [
    { name: 'Wheat', suitable: season === 'rabi', score: 92, expectedYield: '35 qtl/acre' },
    { name: 'Rice', suitable: season === 'kharif' && humidity > 70, score: 88, expectedYield: '28 qtl/acre' },
    { name: 'Tomato', suitable: temp < 35, score: 85, expectedYield: '80 qtl/acre' },
    { name: 'Maize', suitable: season === 'kharif', score: 80, expectedYield: '25 qtl/acre' },
  ].filter(c => c.suitable).slice(0, 3);
  res.json({ crops, season, location: req.query.location || 'India' });
});

// ── Serve frontend for any unknown route (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ SamriddhiX server running at http://localhost:${PORT}`));
