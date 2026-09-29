import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.badge}>
        <span className={styles.pulse}></span>
        Free & Unlimited Downloader
      </div>
      <h1 className={styles.title}>
        Download Any Media <br />
        <span className="gradient-text">In Seconds.</span>
      </h1>
      <p className={styles.description}>
        Easily save videos, audio, and photos from YouTube, TikTok, Instagram, Twitter, and more. High quality, no watermarks, completely free.
      </p>
    </section>
  );
}
