import { useState } from 'react'
import PostCard from '../components/PostCard'
import { TAGS, TAG_CONFIG } from '../data/mockData'

export default function ExploreScreen({ posts, onLike, onSave }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = posts.filter(p => {
    const matchTag = !selected || p.tag === selected
    const matchQuery = !query || p.caption?.toLowerCase().includes(query.toLowerCase()) ||
      p.strainData?.name.toLowerCase().includes(query.toLowerCase()) ||
      p.user?.username?.toLowerCase().includes(query.toLowerCase())
    return matchTag && matchQuery
  })

  return (
    <div>
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #f0ebe5',
        padding: '16px 16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1c1917', marginBottom: 12 }}>Explore</h1>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#f5f0eb',
          borderRadius: 12,
          padding: '10px 14px',
          marginBottom: 14,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#78716c" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts, strains, users…"
            style={{
              flex: 1,
              border: 'none',
              background: 'none',
              fontSize: 14,
              color: '#1c1917',
              outline: 'none',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: '#78716c', fontSize: 16 }}>✕</button>
          )}
        </div>

        {/* Category grid */}
        <div style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 12,
          scrollbarWidth: 'none',
        }}>
          {TAGS.filter(t => t !== 'All').map(tag => {
            const cfg = TAG_CONFIG[tag]
            const isActive = selected === tag
            return (
              <button
                key={tag}
                onClick={() => setSelected(isActive ? null : tag)}
                style={{
                  flexShrink: 0,
                  padding: '7px 14px',
                  borderRadius: 999,
                  border: `1.5px solid ${isActive ? cfg.color : '#e8e3de'}`,
                  background: isActive ? cfg.bg : '#fff',
                  color: isActive ? cfg.color : '#44403c',
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  transition: 'all .15s',
                }}
              >
                {cfg.emoji} {cfg.label}
              </button>
            )
          })}
        </div>
      </header>

      <div style={{ padding: '14px 14px 8px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#78716c' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#44403c', marginBottom: 6 }}>No results</p>
            <p style={{ fontSize: 14 }}>Try a different search or category</p>
          </div>
        ) : (
          filtered.map(post => (
            <PostCard key={post.id} post={post} onLike={onLike} onSave={onSave} />
          ))
        )}
      </div>
    </div>
  )
}
