'use client';
import React, { useState } from 'react';
import Hero from '../components/Hero';
import DownloadForm from '../components/DownloadForm';
import ResultCard from '../components/ResultCard';
import SupportedPlatforms from '../components/SupportedPlatforms';

export default function Home() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  return (
    <main className="container min-h-screen">
      <header style={{ padding: '2rem 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>⚡</span>
          Anti<span className="gradient-text">Grab</span>
        </div>
      </header>
      
      <Hero />
      
      <div style={{ padding: '0 1rem' }}>
        <DownloadForm 
          onResult={(data) => {
            setResult(data);
            setError(null);
          }} 
          onError={(msg) => {
            setError(msg);
            setResult(null);
          }} 
        />
        
        {error && (
          <div style={{ 
            maxWidth: '700px', 
            margin: '0 auto 2rem', 
            padding: '1rem 1.25rem', 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '0.95rem',
            animation: 'slideUp 0.3s ease-out',
          }}>
            ⚠️ {error}
          </div>
        )}

        <ResultCard result={result} />
        
        <SupportedPlatforms />
      </div>
      
      <footer style={{ 
        marginTop: '2rem', 
        padding: '2rem 0', 
        textAlign: 'center', 
        color: '#475569', 
        fontSize: '0.8rem',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <p>Powered by yt-dlp · For personal use only</p>
      </footer>
    </main>
  );
}
