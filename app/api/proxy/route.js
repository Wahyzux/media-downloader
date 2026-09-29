import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  let title = searchParams.get('title') || 'media';
  
  // Clean up title for filename
  title = title.replace(/[^\w\s-]/gi, '').trim().replace(/\s+/g, '_');

  if (!url) {
    return new NextResponse('URL is required', { status: 400 });
  }

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const headers = new Headers(res.headers);
    
    // Force download by setting Content-Disposition
    // Determine extension based on content-type if possible, default to mp4
    const contentType = headers.get('content-type') || '';
    let ext = 'mp4';
    if (contentType.includes('audio')) ext = 'mp3';
    else if (contentType.includes('webm')) ext = 'webm';

    headers.set('Content-Disposition', `attachment; filename="${title}.${ext}"`);
    
    // Remove headers that might cause issues
    headers.delete('content-encoding');
    headers.delete('transfer-encoding');

    return new NextResponse(res.body, {
      status: res.status,
      headers,
    });
  } catch (error) {
    console.error('Proxy Error:', error);
    return new NextResponse('Error fetching media', { status: 500 });
  }
}
