export default function Eyebrow({ children, color = 'var(--kore-orange-text)' }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <span style={{ fontSize: '13px', letterSpacing: '0.16em', color }}>{children}</span>
    </div>
  );
}
