import "./globals.css";

export const metadata = {
  title: "AntiGrab - Media Downloader",
  description: "Download videos, audio, and photos from YouTube, TikTok, Instagram, Twitter, Facebook, and 1000+ other sites. Free, fast, and high quality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
