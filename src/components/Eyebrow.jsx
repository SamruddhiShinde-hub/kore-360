export default function Eyebrow({ children, color = 'var(--kore-orange-text)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <span style={{ width: '28px', height: '3px', borderRadius: '2px', background: color, display: 'inline-block', flex: 'none' }} />
      <span style={{ fontSize: '13px', letterSpacing: '0.16em', color }}>{children}</span>
    </div>
  );
}
