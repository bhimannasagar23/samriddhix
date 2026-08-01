import React, { useState, useEffect } from 'react';
import WeatherWidget from './WeatherWidget';
import CropDiseaseDetector from './CropDiseaseDetector';
import GovernmentSchemes from './GovernmentSchemes';
import AnalyticsCharts from './AnalyticsCharts';
import AIVoiceAssistant from './AIVoiceAssistant';
import FarmScene3D from './FarmScene3D';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [weather, setWeather] = useState(null);

  const tabs = [
    { id: 'overview',  label: '🏠 Overview' },
    { id: 'farm3d',    label: '🌿 3D Farm' },
    { id: 'disease',   label: '🔬 Disease AI' },
    { id: 'schemes',   label: '🏛️ Govt Schemes' },
    { id: 'analytics', label: '📊 Analytics' },
    { id: 'voice',     label: '🎤 AI Voice' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-dark)' }}>
      {/* Top nav */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'1rem 1.5rem', background:'var(--bg-card)', borderBottom:'1px solid var(--border)' }}>
        <div style={{ fontWeight:700, fontSize:'20px' }}>🌾 AgroFarm <span style={{color:'var(--accent)'}}>AI</span></div>
        <div style={{ color:'var(--text-secondary)', fontSize:'13px' }}>
          📍 Bengaluru, Karnataka
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'6px', padding:'1rem 1.5rem', overflowX:'auto',
        background:'var(--bg-card)', borderBottom:'1px solid var(--border)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ padding:'8px 16px', borderRadius:'50px', border:'1px solid var(--border)',
              background: activeTab===t.id ? 'var(--accent)' : 'transparent',
              color: activeTab===t.id ? '#000' : 'var(--text-secondary)',
              cursor:'pointer', whiteSpace:'nowrap', fontWeight: activeTab===t.id ? 700 : 400,
              fontSize:'13px', transition:'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding:'1.5rem' }}>
        {activeTab === 'overview'  && <OverviewTab weather={weather} setWeather={setWeather} />}
        {activeTab === 'farm3d'    && <FarmScene3D />}
        {activeTab === 'disease'   && <CropDiseaseDetector />}
        {activeTab === 'schemes'   && <GovernmentSchemes />}
        {activeTab === 'analytics' && <AnalyticsCharts />}
        {activeTab === 'voice'     && <AIVoiceAssistant weather={weather} />}
      </div>
    </div>
  );
};

const OverviewTab = ({ weather, setWeather }) => (
  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.5rem' }}>
    <WeatherWidget onWeatherUpdate={setWeather} />
    <QuickStats />
    <AlertCard />
  </div>
);

const QuickStats = () => (
  <div className="glass-card">
    <h3 style={{ color:'var(--accent)', marginBottom:'1rem' }}>📈 Farm Summary</h3>
    {[
      { label:'Soil Moisture', value:'68%', status:'good' },
      { label:'Crop Health Score', value:'82/100', status:'good' },
      { label:'Irrigation Need', value:'Medium', status:'warn' },
      { label:'Pest Risk', value:'Low', status:'good' },
    ].map((s,i) => (
      <div key={i} style={{ display:'flex', justifyContent:'space-between',
        padding:'10px 0', borderBottom:'1px solid var(--border)' }}>
        <span style={{ color:'var(--text-secondary)' }}>{s.label}</span>
        <span style={{ color: s.status==='good' ? 'var(--accent)' : 'var(--accent-warm)',
          fontWeight:600 }}>{s.value}</span>
      </div>
    ))}
  </div>
);

const AlertCard = () => (
  <div className="glass-card pulse">
    <h3 style={{ color:'var(--accent-warm)', marginBottom:'1rem' }}>⚠️ Smart Alerts</h3>
    {[
      { msg:'Rain expected in 2 days — pause irrigation', type:'info' },
      { msg:'Optimal sowing window: next 3 days', type:'success' },
      { msg:'Subsidy application deadline: June 30', type:'warn' },
    ].map((a,i) => (
      <div key={i} style={{ padding:'10px 14px', marginBottom:'8px', borderRadius:'10px',
        background: a.type==='success' ? 'rgba(0,210,106,0.1)' :
          a.type==='warn' ? 'rgba(245,166,35,0.1)' : 'rgba(0,180,216,0.1)',
        fontSize:'13px', lineHeight:1.5 }}>
        {a.msg}
      </div>
    ))}
  </div>
);

export default Dashboard;