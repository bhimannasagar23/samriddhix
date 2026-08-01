import React, { useState } from 'react';
import axios from 'axios';

const CropDiseaseDetector = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const detectDisease = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);
    try {
      const { data } = await axios.post('http://localhost:8000/detect-disease', formData);
      setResult(data);
    } catch (e) {
      setResult({ success:false, error:'Detection failed. Check Python server.' });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth:'700px', margin:'0 auto' }}>
      <div className="glass-card">
        <h2 style={{ color:'var(--accent)', marginBottom:'0.5rem' }}>🔬 Crop Disease Detector</h2>
        <p style={{ color:'var(--text-secondary)', marginBottom:'1.5rem', fontSize:'14px' }}>
          फसल की फोटो लें और AI से जांच करवाएं — Upload crop photo for AI disease analysis
        </p>

        <label style={{ display:'block', border:'2px dashed rgba(0,210,106,0.4)',
          borderRadius:'16px', padding:'2rem', textAlign:'center', cursor:'pointer',
          background:'rgba(0,210,106,0.05)', transition:'all 0.3s' }}>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ display:'none' }} />
          {preview
            ? <img src={preview} alt="crop" style={{ maxWidth:'100%', maxHeight:'300px', borderRadius:'12px' }} />
            : <div>
                <div style={{ fontSize:'3rem', marginBottom:'0.5rem' }}>📷</div>
                <div style={{ color:'var(--text-secondary)' }}>Click to upload crop photo</div>
                <div style={{ color:'var(--text-secondary)', fontSize:'12px', marginTop:'4px' }}>
                  Supports JPG, PNG
                </div>
              </div>
          }
        </label>

        {image && (
          <button className="btn-glow" onClick={detectDisease} disabled={loading}
            style={{ width:'100%', marginTop:'1rem', fontSize:'16px', padding:'14px' }}>
            {loading ? '🔍 Analyzing...' : '🔬 Detect Disease'}
          </button>
        )}

        {result && result.success && (
          <div style={{ marginTop:'1.5rem', padding:'1.5rem', borderRadius:'12px',
            background:'rgba(0,210,106,0.06)', border:'1px solid rgba(0,210,106,0.2)' }}>
            <h3 style={{ color:'var(--accent)', marginBottom:'1rem' }}>Analysis Result:</h3>
            <pre style={{ whiteSpace:'pre-wrap', color:'var(--text-primary)',
              fontSize:'14px', lineHeight:1.8 }}>{result.analysis}</pre>
          </div>
        )}

        {result && !result.success && (
          <div style={{ marginTop:'1rem', padding:'1rem', borderRadius:'10px',
            background:'rgba(255,50,50,0.1)', color:'#ff6b6b' }}>
            ❌ {result.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDiseaseDetector;