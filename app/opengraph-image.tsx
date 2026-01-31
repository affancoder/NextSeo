import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'NextSEO - Next.js Starter';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 160, marginRight: 20 }}>⚡</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 80, fontWeight: 'bold', color: 'black' }}>
              NextSEO
            </span>
            <span style={{ fontSize: 40, color: '#666' }}>
              High-Performance Starter
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
