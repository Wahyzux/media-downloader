import React from 'react';
import styles from './ResultCard.module.css';

export default function ResultCard({ result }) {
  if (!result) return null;

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`glass glass-panel ${styles.cardContainer}`}>
      <div className={styles.mediaInfo}>
        <div className={styles.thumbnailContainer}>
          {result.thumbnail ? (
            <img src={result.thumbnail} alt="Thumbnail" className={styles.thumbnail} />
          ) : (
            <div className={styles.thumbnailPlaceholder}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                <line x1="7" y1="2" x2="7" y2="22"></line>
                <line x1="17" y1="2" x2="17" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <line x1="2" y1="7" x2="7" y2="7"></line>
                <line x1="2" y1="17" x2="7" y2="17"></line>
                <line x1="17" y1="7" x2="22" y2="7"></line>
                <line x1="17" y1="17" x2="22" y2="17"></line>
              </svg>
            </div>
          )}
          {result.duration && (
            <span className={styles.duration}>{formatDuration(result.duration)}</span>
          )}
        </div>
        
        <div className={styles.details}>
          <h3 className={styles.title}>{result.title || 'Media File'}</h3>
          <div className={styles.meta}>
            {result.uploader && <span className={styles.uploader}>{result.uploader}</span>}
            <span className={styles.source}>{result.source || 'Unknown'}</span>
          </div>
          
          <div className={styles.actions}>
            {result.url && (
              <a 
                href={`/api/proxy?url=${encodeURIComponent(result.url)}&title=${encodeURIComponent(result.title || 'media')}`} 
                className={`btn btn-primary ${styles.downloadBtn}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '0.5rem'}}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download File
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
