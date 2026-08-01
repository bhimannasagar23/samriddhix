import React, { useState, useRef } from 'react';
import axios from 'axios';

const AIVoiceAssistant = ({ weather }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [cropType, setCropType] = useState('wheat');
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('Voice not supported. Use Chrome.'); return; }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'hi-IN'; // Hindi
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setTranscript(text);
      getAIAdvice(text);
    };

    recognitionRef.current.start();
    setListening(true);
    recognitionRef.current.onend = () => setListening(false);
  };

  const getAIAdvice = async (message) => {
    setLoading(true);
    try {
      const { data } = await axios.post('https://samriddhix-backend.onrender.com/api/ai/advice', {
        message, cropType, weather, language: 'Hindi/English'
      });
      setResponse(data.reply);
      // Speak the response
      const utterance = new SpeechSynthesisUtterance(data.reply);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setResponse('Sorry, AI service unavailable. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="glass-card" style={{ maxWidth:'700px', margin:'0 auto' }}>
      <h2 style={{ color:'var(--accent)', marginBottom:'1.5rem', textAlign:'center' }}>
        🎤 AI Voice Advisor
      </h2>
      <p style={{ color:'var(--text-secondary)', textAlign:'center', marginBottom:'2rem' }}>
        अपनी फसल के बारे में पूछें — Ask about your crop in Hindi or English
      </p>

      {/* Crop selector */}
      <div style={{ display:'flex', gap:'8px', marginBottom:'1.5rem', flexWrap:'wrap', justifyContent:'center' }}>
        {['wheat', 'rice', 'cotton', 'tomato', 'sugarcane'].map(crop => (
          <button key={crop} onClick={() => setCropType(crop)}
            style={{ padding:'6px 16px', borderRadius:'50px', fontSize:'13px', cursor:'pointer',
              border:'1px solid var(--border)', fontWeight: cropType===crop ? 700 : 400,
              background: cropType===crop ? 'var(--accent)' : 'transparent',
              color: cropType===crop ? '#000' : 'var(--text-secondary)' }}>
            {crop}
          </button>
        ))}
      </div>

      {/* Voice button */}
      <div style={{ textAlign:'center', marginBottom:'2rem' }}>
        <button onClick={startListening} disabled={listening || loading}
          style={{ width:'100px', height:'100px', borderRadius:'50%',
            background: listening ? 'rgba(255,50,50,0.3)' : 'rgba(0,210,106,0.2)',
            border:`3px solid ${listening ? '#ff3232' : 'var(--accent)'}`,
            fontSize:'2.5rem', cursor:'pointer',
            animation: listening ? 'pulse-green 1s infinite' : 'none',
            transition:'all 0.3s' }}>
          {listening ? '🔴' : '🎤'}
        </button>
        <div style={{ marginTop:'10px', color:'var(--text-secondary)', fontSize:'13px' }}>
          {listening ? 'Listening... बोलिए' : 'Tap to speak / बोलने के लिए दबाएं'}
        </div>
      </div>

      {/* Or type */}
      <div style={{ display:'flex', gap:'8px', marginBottom:'1.5rem' }}>
        <input value={transcript} onChange={e => setTranscript(e.target.value)}
          placeholder="Or type your question here..."
          style={{ flex:1, padding:'10px 14px', borderRadius:'10px',
            border:'1px solid var(--border)', background:'var(--bg-dark)', color:'var(--text-primary)' }} />
        <button className="btn-glow" onClick={() => getAIAdvice(transcript)}
          style={{ padding:'10px 20px' }}>Ask</button>
      </div>

      {/* Response */}
      {loading && <div style={{ textAlign:'center', color:'var(--accent)' }}>🤖 AI is thinking...</div>}
      {response && (
        <div style={{ padding:'1.5rem', borderRadius:'12px',
          background:'rgba(0,210,106,0.08)', border:'1px solid rgba(0,210,106,0.2)' }}>
          <div style={{ color:'var(--accent)', fontWeight:700, marginBottom:'8px' }}>🤖 AI Advisor says:</div>
          <p style={{ lineHeight:1.8, color:'var(--text-primary)' }}>{response}</p>
          <button onClick={() => {
            const u = new SpeechSynthesisUtterance(response);
            u.lang='hi-IN'; window.speechSynthesis.speak(u);
          }} style={{ marginTop:'12px', padding:'6px 16px', borderRadius:'20px',
            background:'transparent', border:'1px solid var(--accent)',
            color:'var(--accent)', cursor:'pointer', fontSize:'13px' }}>
            🔊 Replay Audio
          </button>
        </div>
      )}
    </div>
  );
};

export default AIVoiceAssistant;