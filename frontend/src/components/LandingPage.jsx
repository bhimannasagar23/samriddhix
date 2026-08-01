import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const LandingPage = () => {
  const navigate = useNavigate();
  const titleRef = useRef(null);

  useEffect(() => {
    // Entrance animation
    gsap.from(titleRef.current, {
      y: 60, opacity: 0, duration: 1.2, ease: 'power3.out'
    });
    gsap.from('.hero-stat', {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, delay: 0.5
    });
    gsap.from('.feature-card', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.1, delay: 0.8
    });
  }, []);

  const features = [
    { icon: '🤖', title: 'AI Voice Assistant', desc: 'Talk to AI in Hindi/English', color: '#00D26A' },
    { icon: '🔬', title: 'Disease Detection', desc: 'Photo your crop, get diagnosis', color: '#F5A623' },
    { icon: '🌤️', title: 'Weather Intelligence', desc: 'Real-time farming alerts', color: '#00B4D8' },
    { icon: '🏛️', title: 'Government Schemes', desc: 'PM-KISAN, Fasal Bima & more', color: '#9B59B6' },
    { icon: '📊', title: 'Analytics Dashboard', desc: 'Track your farm performance', color: '#E74C3C' },
    { icon: '🌿', title: '3D Farm View', desc: 'Interactive farm simulation', color: '#27AE60' },
  ];

  return (
    <div className="hero-bg" style={{ minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'1rem 2rem', borderBottom:'1px solid var(--border)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'22px', fontWeight:700 }}>
          <span>🌾</span> <span style={{ color:'var(--accent)' }}>AgroFarm</span> AI
        </div>
        <button className="btn-glow" onClick={() => navigate('/dashboard')}>
          Launch Dashboard →
        </button>
      </nav>

      {/* Hero */}
      <div style={{ textAlign:'center', padding:'5rem 2rem 3rem' }}>
        <div ref={titleRef}>
          <div style={{ fontSize:'14px', letterSpacing:'3px', color:'var(--accent)',
            textTransform:'uppercase', marginBottom:'1rem' }}>
            Intelligent Decision-Support System
          </div>
          <h1 style={{ fontSize:'clamp(2.5rem,6vw,4.5rem)', fontWeight:800, lineHeight:1.1,
            background:'linear-gradient(135deg, #E6FFF2, #00D26A)', WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent', marginBottom:'1.5rem' }}>
            Smart Agriculture<br/>Powered by AI
          </h1>
          <p style={{ fontSize:'1.2rem', color:'var(--text-secondary)', maxWidth:'600px',
            margin:'0 auto 2.5rem' }}>
            Real-time crop intelligence, government schemes, weather alerts and AI voice
            support — built for every Indian farmer
          </p>
          <button className="btn-glow floating" style={{ fontSize:'18px', padding:'16px 40px' }}
            onClick={() => navigate('/dashboard')}>
            🚀 Start Farming Smart
          </button>
        </div>

        {/* Stats */}
        <div style={{ display:'flex', justifyContent:'center', gap:'3rem',
          margin:'4rem 0', flexWrap:'wrap' }}>
          {[
            { val:'50+', label:'Crop Varieties' },
            { val:'5', label:'Govt Schemes' },
            { val:'Real-time', label:'Weather Data' },
            { val:'AI', label:'Voice Support' }
          ].map((s, i) => (
            <div key={i} className="hero-stat" style={{ textAlign:'center' }}>
              <div style={{ fontSize:'2.5rem', fontWeight:800, color:'var(--accent)' }}>{s.val}</div>
              <div style={{ color:'var(--text-secondary)', fontSize:'14px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',
        gap:'1.5rem', padding:'0 2rem 4rem', maxWidth:'1200px', margin:'0 auto' }}>
        {features.map((f, i) => (
          <div key={i} className="feature-card glass-card" style={{ cursor:'pointer' }}
            onClick={() => navigate('/dashboard')}>
            <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>{f.icon}</div>
            <h3 style={{ fontSize:'1.2rem', fontWeight:700, color:f.color, marginBottom:'0.5rem' }}>
              {f.title}
            </h3>
            <p style={{ color:'var(--text-secondary)', fontSize:'14px', lineHeight:1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;