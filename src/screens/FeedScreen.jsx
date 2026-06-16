import { useState } from 'react'
import PostCard from '../components/PostCard'
import { TAGS } from '../data/mockData'

export default function FeedScreen({ posts, onLike, onSave }) {
  const [activeTag, setActiveTag] = useState('All')
  const [refreshing, setRefreshing] = useState(false)

  const filtered = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag)

  function handleRefresh() {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <div>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1a3a15 0%, #2d5a27 100%)',
        padding: '16px 16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🌿</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>Canopy</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleRefresh}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background: 'rgba(255,255,255,.12)',
                color: '#fff',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Refresh"
            >
              {refreshing ? '⟳' : '↻'}
            </button>
          </div>
        </div>

        {/* Tag filter strip */}
        <div style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 12,
          scrollbarWidth: 'none',
        }}>
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                flexShrink: 0,
                padding: '6px 14px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: activeTag === tag ? 700 : 500,
                background: activeTag === tag ? '#f0c842' : 'rgba(255,255,255,.15)',
                color: activeTag === tag ? '#1a3a15' : 'rgba(255,255,255,.85)',
                transition: 'all .15s',
              }}
            >
              {tag === 'StrainReview' ? '⭐ Strains' : tag}
            </button>
          ))}
        </div>
      </header>

      {/* Feed */}
      <div style={{ padding: '14px 14px 8px' }}>
        {filtered.length === 0 ? (
          <EmptyState tag={activeTag} />
        ) : (
          filtered.map(post => (
            <PostCard key={post.id} post={post} onLike={onLike} onSave={onSave} />
          ))
        )}
      </div>

      <div style={{ paddingBottom: 8 }} />
    </div>
  )
}

function EmptyState({ tag }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      color: '#78716c',
    }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
      <p style={{ fontSize: 16, fontWeight: 600, color: '#44403c', marginBottom: 6 }}>
        No {tag} posts yet
      </p>
      <p style={{ fontSize: 14 }}>Be the first to share something!</p>
    </div>
  )
}
