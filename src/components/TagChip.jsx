import { TAG_CONFIG } from '../data/mockData'

export default function TagChip({ tag, small }) {
  const cfg = TAG_CONFIG[tag] || { color: '#78716c', bg: '#f5f0eb', emoji: '🌿', label: tag }
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: cfg.bg,
      color: cfg.color,
      borderRadius: 999,
      padding: small ? '3px 8px' : '4px 10px',
      fontSize: small ? 11 : 12,
      fontWeight: 600,
      letterSpacing: 0.2,
    }}>
      <span>{cfg.emoji}</span>
      {cfg.label}
    </span>
  )
}
