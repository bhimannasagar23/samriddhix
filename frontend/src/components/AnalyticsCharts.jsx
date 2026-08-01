import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const AnalyticsCharts = () => {
  const soilData = [
    {month:'Jan',moisture:55,temp:18,yield:2.1},
    {month:'Feb',moisture:48,temp:22,yield:2.4},
    {month:'Mar',moisture:60,temp:27,yield:2.8},
    {month:'Apr',moisture:72,temp:31,yield:2.2},
    {month:'May',moisture:68,temp:34,yield:1.9},
    {month:'Jun',moisture:85,temp:29,yield:3.1},
  ];

  const cropData = [
    {crop:'Wheat',area:12,income:48000},
    {crop:'Rice',area:8,income:32000},
    {crop:'Cotton',area:5,income:65000},
    {crop:'Tomato',area:3,income:28000},
  ];

  const pieData = [
    {name:'Fertilizer',value:30,color:'#00D26A'},
    {name:'Seeds',value:20,color:'#F5A623'},
    {name:'Labour',value:35,color:'#00B4D8'},
    {name:'Other',value:15,color:'#9B59B6'},
  ];

  const chartStyle = { color:'#8FBC9E' };
  const gridStyle = { stroke:'rgba(0,210,106,0.1)' };

  return (
    <div style={{ display:'grid', gap:'1.5rem' }}>
      {/* Line Chart */}
      <div className="glass-card">
        <h3 style={{ color:'var(--accent)', marginBottom:'1.5rem' }}>📈 Soil Moisture & Temperature Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={soilData}>
            <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
            <XAxis dataKey="month" tick={chartStyle} />
            <YAxis tick={chartStyle} />
            <Tooltip contentStyle={{ background:'#161B22', border:'1px solid var(--border)' }} />
            <Legend />
            <Line type="monotone" dataKey="moisture" stroke="#00D26A" strokeWidth={2} dot={{ fill:'#00D26A' }} />
            <Line type="monotone" dataKey="temp" stroke="#F5A623" strokeWidth={2} dot={{ fill:'#F5A623' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
        {/* Bar Chart */}
        <div className="glass-card">
          <h3 style={{ color:'var(--accent)', marginBottom:'1.5rem' }}>💰 Income by Crop (₹)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cropData}>
              <CartesianGrid strokeDasharray="3 3" {...gridStyle} />
              <XAxis dataKey="crop" tick={chartStyle} />
              <YAxis tick={chartStyle} />
              <Tooltip contentStyle={{ background:'#161B22', border:'1px solid var(--border)' }} />
              <Bar dataKey="income" fill="#00D26A" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="glass-card">
          <h3 style={{ color:'var(--accent)', marginBottom:'1.5rem' }}>🥧 Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" label={({name,value})=>`${name}: ${value}%`}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background:'#161B22', border:'1px solid var(--border)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;