import { NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execFileAsync = promisify(execFile);

export async function POST(request) {
  try {
    const { url, format } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
    }

    // Path to yt-dlp binary
    const ytdlpBin = path.join(process.cwd(), 'node_modules', 'youtube-dl-exec', 'bin', 'yt-dlp.exe');

    const args = [
      '--dump-single-json',
      '--no-check-certificates',
      '--no-warnings',
      '--prefer-free-formats',
      url,
    ];

    let result;
    try {
      result = await execFileAsync(ytdlpBin, args, {
        maxBuffer: 1024 * 1024 * 50,
        timeout: 60000,
      });
    } catch (execError) {
      console.error('yt-dlp stderr:', execError.stderr);
      console.error('yt-dlp error:', execError.message);
      
      const errMsg = (execError.stderr || execError.message || '').toLowerCase();
      if (errMsg.includes('unsupported url') || errMsg.includes('is not a valid url')) {
        return NextResponse.json({ error: 'This URL is not supported. Try YouTube, TikTok, Instagram, Twitter, or Facebook.' }, { status: 400 });
      }
      if (errMsg.includes('private video') || errMsg.includes('sign in') || errMsg.includes('login')) {
        return NextResponse.json({ error: 'This content is private or requires authentication.' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Failed to process the URL: ' + (execError.stderr || execError.message).substring(0, 200) }, { status: 500 });
    }

    // Clean and parse the JSON output (remove BOM and trim whitespace)
    const rawOutput = result.stdout.replace(/^\uFEFF/, '').trim();
    const info = JSON.parse(rawOutput);

    // Extract info
    let downloadUrl = '';
    const title = info.title || 'Media File';
    const thumbnail = info.thumbnail || '';
    let source = '';

    try {
      source = new URL(url).hostname.replace('www.', '');
    } catch {
      source = 'Unknown';
    }

    if (format === 'audio') {
      const audioFormats = (info.formats || [])
        .filter(f => f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none'))
        .sort((a, b) => (b.abr || 0) - (a.abr || 0));

      if (audioFormats.length > 0) {
        downloadUrl = audioFormats[0].url;
      } else if (info.url) {
        downloadUrl = info.url;
      } else if (info.formats && info.formats.length > 0) {
        downloadUrl = info.formats[info.formats.length - 1].url;
      }
    } else {
      const combinedFormats = (info.formats || [])
        .filter(f => f.vcodec && f.vcodec !== 'none' && f.acodec && f.acodec !== 'none')
        .sort((a, b) => (b.height || 0) - (a.height || 0));

      if (combinedFormats.length > 0) {
        downloadUrl = combinedFormats[0].url;
      } else if (info.url) {
        downloadUrl = info.url;
      } else if (info.formats && info.formats.length > 0) {
        downloadUrl = info.formats[info.formats.length - 1].url;
      }
    }

    if (!downloadUrl) {
      return NextResponse.json({ error: 'Could not find a downloadable format for this URL' }, { status: 400 });
    }

    return NextResponse.json({
      url: downloadUrl,
      title,
      thumbnail,
      source,
      duration: info.duration || null,
      uploader: info.uploader || info.channel || '',
    });

  } catch (error) {
    console.error('Download API Error:', error);
    return NextResponse.json({ error: 'Internal server error: ' + (error.message || '').substring(0, 200) }, { status: 500 });
  }
}
