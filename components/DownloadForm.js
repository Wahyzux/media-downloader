'use client';
import React, { useState } from 'react';
import styles from './DownloadForm.module.css';

export default function DownloadForm({ onResult, onError }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('video'); // video or audio

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    onError(null);
    onResult(null);

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, format }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch media details');
      }

      onResult(data);
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`glass glass-panel ${styles.formContainer}`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste URL here (YouTube, TikTok, Instagram...)"
            className={`input-field ${styles.urlInput}`}
            required
            disabled={loading}
          />
        </div>
        
        <div className={styles.optionsGroup}>
          <label className={styles.radioLabel}>
            <input 
              type="radio" 
              name="format" 
              value="video" 
              checked={format === 'video'} 
              onChange={() => setFormat('video')}
              disabled={loading}
            />
            <span className={styles.radioCustom}></span>
            Video
          </label>
          <label className={styles.radioLabel}>
            <input 
              type="radio" 
              name="format" 
              value="audio" 
              checked={format === 'audio'} 
              onChange={() => setFormat('audio')}
              disabled={loading}
            />
            <span className={styles.radioCustom}></span>
            Audio
          </label>
        </div>

        <button 
          type="submit" 
          className={`btn btn-primary ${styles.submitBtn} ${loading ? 'btn-disabled' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <span className={styles.loadingWrapper}>
              <span className={`animate-spin ${styles.spinner}`}></span>
              Processing...
            </span>
          ) : (
            'Download Now'
          )}
        </button>
      </form>
    </div>
  );
}
