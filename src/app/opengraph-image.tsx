import { ImageResponse } from 'next/og';
export const alt = 'Cryol Technologies — Build. Grow. Secure.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{ background: '#0b1930', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '65px 80px', color: '#f1f6ff', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 25 }}><span>cryol technologies</span><span style={{ color: '#076cd7', fontSize: 18 }}>YOUR COMPLETE IT PARTNER</span></div><div style={{ display: 'flex', flexDirection: 'column', fontSize: 76, letterSpacing: -3, lineHeight: 1.1 }}><span>Big ideas.</span><span>Better technology.</span><span style={{ color: '#076cd7' }}>Real possibilities.</span></div><div style={{ display: 'flex', justifyContent: 'space-between', color: '#afc2db', fontSize: 20 }}><span>Development / Marketing / Cloud / Security</span><span>cryol.in</span></div></div>, size);
}
