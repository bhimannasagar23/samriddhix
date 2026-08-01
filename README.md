# 🌾 SamriddhiX — Intelligent Farm Decision Support System
### *Har Kisan ka Digital Saathi | समृद्धि — Prosperity Through AI*

> Hackathon project: Intelligent system for smart agriculture, resource optimization & environmental sustainability

---

## 🚀 Run in 3 Commands (Zero Config Needed)

```bash
# Step 1: Clone / open in VS Code
cd samriddhix

# Step 2: Install backend dependencies
cd backend && npm install

# Step 3: Start the server (serves EVERYTHING)
node server.js
```

Then open: **http://localhost:5000**

> ✅ Weather works without any API key (uses Open-Meteo — free, no signup)
> ✅ AI chat works if you add Gemini key (falls back to local AI if not set)

---

## 📁 Project Structure

```
samriddhix/
├── frontend/
│   └── public/
│       ├── index.html          ← 3D Landing page (SamriddhiX entry)
│       └── dashboard.html      ← Full dashboard (all features)
├── backend/
│   ├── server.js               ← Express server (serves frontend + API)
│   ├── data/
│   │   └── govt_schemes.json   ← All 5 government schemes data
│   ├── package.json
│   └── .env.example            ← Copy to .env and add keys
└── README.md
```

---

## ✨ Features

| Feature | Status | Description |
|---------|--------|-------------|
| 🎬 3D Landing Page | ✅ | Animated wireframe sphere + particles. Click SamriddhiX to login |
| 🌍 Multi-language Login | ✅ | Hindi, English, Kannada, Telugu, Tamil, Marathi, Punjabi |
| 🌤️ Real-time Weather | ✅ | Open-Meteo API (no key needed). 7-day forecast + farm alerts |
| 🤖 AI Chat Assistant | ✅ | Detects language. Gemini API + local fallback. Voice input |
| 🎤 Voice Input | ✅ | Web Speech API — speak in Hindi/English/regional languages |
| 🌾 Crop Planner | ✅ | Season-wise crops + pesticide doses with exact quantities |
| 💧 Smart Irrigation | ✅ | Zone-wise moisture monitoring + AI water advice |
| 💰 Mandi Prices | ✅ | Live-simulated market prices, best time to sell |
| 📋 Debt Tracker | ✅ | Voice-based debt entry, repayment advice |
| 🏛️ Govt Schemes | ✅ | PM-KISAN, Fasal Bima, KCC, Soil Health, PMKSY |
| 📊 Analytics | ✅ | 8+ charts: Climate change, rainfall, yield, income, seasonal |
| 🌿 3D Farm | ✅ | Three.js interactive 3D farm — drag, zoom, wind sway |
| 📱 Hover Zoom Tiles | ✅ | Dashboard tiles zoom on hover (scale 1.04) |
| 🔔 Smart Alerts | ✅ | Rain/heat alerts with farm-specific action advice |

---

## 🎯 Hackathon Demo Flow (6 min pitch)

1. **Landing** → Show 3D sphere + glowing SamriddhiX. Click → Login modal
2. **Login** → Select Hindi. Enter phone + village. Enter dashboard
3. **Dashboard** → Show 6 hovering tiles, weather alert strip
4. **AI Chat** → Opens auto. Say: "मेरी फसल में कीड़े लग गए" (voice)
5. **Weather** → 7-day forecast cards + climate change chart
6. **Crop Planner** → Show pesticide guide with exact doses
7. **Smart Irrigation** → Toggle zones, moisture bars
8. **Sell Crop** → Mandi price table + AI advice
9. **Govt Schemes** → PM-KISAN, Fasal Bima cards
10. **3D Farm** → Drag around the animated farm

---

## 🔑 Optional API Keys (App works without them)

| API | Purpose | Get Free Key |
|-----|---------|-------------|
| Gemini AI | Better AI chat responses | [aistudio.google.com](https://aistudio.google.com) |
| Open-Meteo | Weather (already works!) | No key needed ✅ |

### Add Gemini key:
```bash
cp backend/.env.example backend/.env
# Edit backend/.env → paste GEMINI_API_KEY=your_key
```

---

## 🌐 Deploy to Internet (optional, 10 min)

### Vercel (frontend only)
```bash
npx vercel --prod frontend/public
```

### Railway (full app)
1. Push to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set: `Start command: cd backend && node server.js`
4. Add env variables from `.env`
5. Done! Get your URL.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Pure HTML5 + CSS3 + Vanilla JS |
| 3D Graphics | Three.js (wireframe sphere + farm) |
| Charts | Chart.js 4.x (8 chart types) |
| AI Chat | Anthropic Claude API + local fallback |
| Voice | Web Speech API (browser native) |
| Weather | Open-Meteo API (free, no key) |
| Backend | Node.js + Express |
| Fonts | Cinzel (headings) + Rajdhani (body) |
| Animation | CSS keyframes + Three.js |

---

## 🎨 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Forest Night | `#0A3D2E` | Primary dark bg |
| Samriddhi Green | `#00D26A` | Accent, CTAs, borders |
| Harvest Gold | `#F5A623` | Warnings, highlights |
| Deep Space | `#1A1A2E` | Card backgrounds |
| Dew White | `#E6FFF2` | Primary text |

---

## 👥 Problem Statement
*"Create an intelligent decision-support system using AI and real-time data for smart agriculture, resource optimization, or environmental sustainability applications"*

**SamriddhiX addresses:**
- ✅ AI decision support (crop planning, disease detection, market timing)
- ✅ Real-time data (live weather, live mandi prices)
- ✅ Smart agriculture (irrigation automation, crop recommendations)
- ✅ Resource optimization (water management, pesticide dosing)
- ✅ Environmental sustainability (climate change analytics, water conservation)
- ✅ Social impact (language inclusion, government scheme access, debt management)

---

*Built with ❤️ for India's 140 million farmers*
