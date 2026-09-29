import React from 'react';
import styles from './SupportedPlatforms.module.css';

const platforms = [
  { name: 'YouTube', color: '#FF0000', icon: '▶' },
  { name: 'TikTok', color: '#00f2ea', icon: '♪' },
  { name: 'Instagram', color: '#E4405F', icon: '📷' },
  { name: 'Facebook', color: '#1877F2', icon: 'f' },
  { name: 'Twitter/X', color: '#ffffff', icon: '𝕏' },
  { name: 'Reddit', color: '#FF4500', icon: '⬡' },
  { name: 'Vimeo', color: '#1AB7EA', icon: '▷' },
  { name: 'SoundCloud', color: '#FF5500', icon: '☁' },
];

export default function SupportedPlatforms() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Supported Platforms</h2>
      <p className={styles.subtitle}>Download from 1000+ websites powered by yt-dlp</p>
      <div className={styles.grid}>
        {platforms.map((platform) => (
          <div key={platform.name} className={`glass ${styles.platformCard}`}>
            <span className={styles.icon} style={{ color: platform.color }}>
              {platform.icon}
            </span>
            <span className={styles.name}>{platform.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
