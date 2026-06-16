import { useState } from 'react'
import TagChip from './TagChip'

export default function PostCard({ post, onLike, onSave }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const { user } = post

  function renderStars(rating) {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < full) stars.push('★')
      else if (i === full && half) stars.push('½')
      else stars.push('☆')
    }
    return stars.join('')
  }

  return (
    <article style={{
      background: '#fff',
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,.07)',
      marginBottom: 16,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', gap: 10 }}>
        <img
          src={user?.avatar}
          alt={user?.displayName}
          style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1c1917' }}>{user?.displayName}</span>
            {user?.verified && (
              <span style={{ color: '#2d5a27', fontSize: 13 }} title="Verified">✓</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <span style={{ fontSize: 12, color: '#78716c' }}>@{user?.username}</span>
            <span style={{ fontSize: 11, color: '#c4b5ab' }}>·</span>
            <span style={{ fontSize: 11, color: '#c4b5ab' }}>{post.timestamp}</span>
          </div>
        </div>
        <TagChip tag={post.tag} small />
      </div>

      {/* Image */}
      {post.image && (
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <img
            src={post.image}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
          {post.verified && (
            <div style={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: 'rgba(26,58,21,.85)',
              color: '#f0c842',
              borderRadius: 999,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              backdropFilter: 'blur(4px)',
            }}>
              🔬 Verified Info
            </div>
          )}
          {post.tag === 'Pride' && (
            <div style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: 'linear-gradient(135deg, #b8860b, #d4a017)',
              color: '#fff',
              borderRadius: 999,
              padding: '4px 10px',
              fontSize: 11,
              fontWeight: 700,
            }}>
              ✊ Community Pride
            </div>
          )}
        </div>
      )}

      {/* Strain card */}
      {post.strainData && (
        <div style={{
          margin: '0 14px',
          marginTop: 12,
          background: 'linear-gradient(135deg, #eef7ec 0%, #fdf3d0 100%)',
          borderRadius: 12,
          padding: '12px 14px',
          border: '1px solid #d4edcf',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#1a3a15' }}>{post.strainData.name}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                <span style={{
                  background: post.strainData.type === 'Indica' ? '#e3eff5' : post.strainData.type === 'Sativa' ? '#eef7ec' : '#fdf3d0',
                  color: post.strainData.type === 'Indica' ? '#1a4a6b' : post.strainData.type === 'Sativa' ? '#2d5a27' : '#8b5e3c',
                  borderRadius: 999,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontWeight: 600,
                }}>
                  {post.strainData.type}
                </span>
                <span style={{ fontSize: 11, color: '#78716c', padding: '2px 0' }}>
                  THC {post.strainData.thc} · CBD {post.strainData.cbd}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, color: '#b8860b', letterSpacing: -1 }}>
                {renderStars(post.strainData.rating)}
              </div>
              <div style={{ fontSize: 12, color: '#78716c', marginTop: 2 }}>
                {post.strainData.rating}/5
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: '#44403c', fontWeight: 600 }}>Effects: </span>
            {post.strainData.effects.map(e => (
              <span key={e} style={{
                background: '#fff',
                border: '1px solid #d4edcf',
                borderRadius: 999,
                padding: '2px 7px',
                fontSize: 11,
                color: '#2d5a27',
                fontWeight: 500,
              }}>{e}</span>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <span style={{ fontSize: 11, color: '#44403c', fontWeight: 600 }}>Flavor: </span>
            {post.strainData.flavors.map(f => (
              <span key={f} style={{
                background: '#fff',
                border: '1px solid #f0d8a0',
                borderRadius: 999,
                padding: '2px 7px',
                fontSize: 11,
                color: '#8b5e3c',
                fontWeight: 500,
              }}>{f}</span>
            ))}
          </div>
        </div>
      )}

      {/* Caption */}
      <div style={{ padding: '10px 14px' }}>
        <p style={{ fontSize: 14, lineHeight: 1.55, color: '#1c1917' }}>{post.caption}</p>
        {post.source && (
          <p style={{ fontSize: 12, color: '#78716c', marginTop: 6, fontStyle: 'italic' }}>
            📄 Source: {post.source}
          </p>
        )}
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 10px 12px',
        gap: 2,
      }}>
        <ActionBtn
          onClick={() => onLike(post.id)}
          active={post.liked}
          activeColor="#e63946"
          label={`${post.likes} likes`}
        >
          <HeartIcon filled={post.liked} />
          <span>{formatCount(post.liked ? post.likes : post.likes)}</span>
        </ActionBtn>

        <ActionBtn onClick={() => setShowComments(s => !s)} label="Comments">
          <CommentIcon active={showComments} />
          <span>{post.comments?.length || 0}</span>
        </ActionBtn>

        <ActionBtn label="Share">
          <ShareIcon />
        </ActionBtn>

        <div style={{ flex: 1 }} />

        <ActionBtn
          onClick={() => onSave(post.id)}
          active={post.saved}
          activeColor="#2d5a27"
          label={post.saved ? 'Saved' : 'Save'}
        >
          <BookmarkIcon filled={post.saved} />
        </ActionBtn>
      </div>

      {/* Comments section */}
      {showComments && (
        <div style={{
          borderTop: '1px solid #f5f0eb',
          padding: '10px 14px 14px',
        }}>
          {post.comments?.map(c => {
            const cu = { username: 'user', displayName: 'User' }
            return (
              <div key={c.id} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#d4edcf',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  flexShrink: 0,
                  color: '#2d5a27',
                  fontWeight: 700,
                }}>
                  {c.userId?.slice(1).toUpperCase()}
                </div>
                <div style={{
                  background: '#f5f0eb',
                  borderRadius: 10,
                  padding: '7px 10px',
                  flex: 1,
                }}>
                  <p style={{ fontSize: 13, color: '#1c1917', lineHeight: 1.4 }}>{c.text}</p>
                </div>
              </div>
            )
          })}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <input
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Add a comment…"
              style={{
                flex: 1,
                border: '1.5px solid #d4edcf',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 13,
                background: '#f5f0eb',
                outline: 'none',
                color: '#1c1917',
              }}
            />
            <button
              disabled={!newComment.trim()}
              style={{
                background: newComment.trim() ? '#2d5a27' : '#d4edcf',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: newComment.trim() ? 'pointer' : 'default',
                transition: 'background .15s',
              }}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </article>
  )
}

function ActionBtn({ children, onClick, active, activeColor, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '6px 8px',
        borderRadius: 999,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 500,
        color: active ? (activeColor || '#2d5a27') : '#78716c',
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  )
}

function HeartIcon({ filled }) {
  return filled
    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#e63946"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
}

function CommentIcon({ active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

function BookmarkIcon({ filled }) {
  return filled
    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#2d5a27"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
}

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k'
  return n
}
