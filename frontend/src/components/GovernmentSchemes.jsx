import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/api/schemes')
      .then(r => setSchemes(r.data))
      .catch(() => setSchemes([]));
  }, []);

  return (
    <div>
      <h2 style={{ color:'var(--accent)', marginBottom:'0.5rem' }}>🏛️ Government Schemes for Farmers</h2>
      <p style={{ color:'var(--text-secondary)', marginBottom:'1.5rem' }}>
        सरकारी योजनाएं — Click any scheme to apply online
      </p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.5rem' }}>
        {schemes.map((scheme) => (
          <div key={scheme.id} className="glass-card" style={{ borderLeft:`4px solid ${scheme.color}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'1rem' }}>
              <span style={{ fontSize:'2.5rem' }}>{scheme.icon}</span>
              <div>
                <h3 style={{ color:scheme.color, fontSize:'16px' }}>{scheme.name}</h3>
                <div style={{ color:'var(--text-secondary)', fontSize:'13px' }}>{scheme.nameHindi}</div>
              </div>
            </div>

            <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:'10px',
              padding:'12px', marginBottom:'12px', textAlign:'center' }}>
              <div style={{ fontSize:'1.5rem', fontWeight:800, color:scheme.color }}>{scheme.amount}</div>
              <div style={{ fontSize:'12px', color:'var(--text-secondary)' }}>{scheme.installments}</div>
            </div>

            <p style={{ color:'var(--text-secondary)', fontSize:'13px',
              lineHeight:1.6, marginBottom:'12px' }}>{scheme.description}</p>

            <div style={{ fontSize:'12px', color:'var(--text-secondary)',
              marginBottom:'12px', padding:'8px', borderRadius:'8px', background:'rgba(255,255,255,0.03)' }}>
              ✅ Eligibility: {scheme.eligibility}
            </div>

            <a href={scheme.link} target="_blank" rel="noreferrer"
              style={{ display:'block', textAlign:'center', padding:'10px', borderRadius:'10px',
                background:`${scheme.color}22`, color:scheme.color, textDecoration:'none',
                fontWeight:600, fontSize:'14px', border:`1px solid ${scheme.color}44`,
                transition:'all 0.3s' }}>
              🔗 Apply Now / आवेदन करें
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentSchemes;