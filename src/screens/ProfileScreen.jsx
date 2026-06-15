import { useState } from 'react'
import PostCard from '../components/PostCard'
import { currentUser } from '../data/mockData'

export default function ProfileScreen({ posts, onLike, onSave }) {
  const [tab, setTab] = useState('posts')
  const user = currentUser

  function formatNum(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k'
    return n
  }

  return (
    <div>
      {/* Profile Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1a3a15 0%, #2d5a27 80%, #3d7a35 100%)',
        padding: '20px 20px 0',
      }}>
        {/* Avatar + stats */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 14 }}>
          <div style={{ position: 'relative' }}>
            <img
              src={user.avatar}
              alt={user.displayName}
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(255,255,255,.3)',
              }}
            />
            {user.verified && (
              <span style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 20,
                height: 20,
                background: '#f0c842',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 900,
                color: '#1a3a15',
                border: '2px solid #2d5a27',
              }}>✓</span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 800, marginBottom: 2 }}>{user.displayName}</h2>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 13, marginBottom: 10 }}>@{user.username}</p>
            <div style={{ display: 'flex', gap: 16 }}>
              {[
                { label: 'Posts', value: user.posts },
                { label: 'Followers', value: formatNum(user.followers) },
                { label: 'Following', value: formatNum(user.following) },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{value}</div>
                  <div style={{ color: 'rgba(255,255,255,.55)', fontSize: 11 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p style={{
          color: 'rgba(255,255,255,.8)',
          fontSize: 13,
          lineHeight: 1.55,
          marginBottom: 14,
        }}>{user.bio}</p>

        {/* Edit + Share */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button style={{
            flex: 1,
            padding: '9px 0',
            borderRadius: 10,
            border: '1.5px solid rgba(255,255,255,.3)',
            background: 'rgba(255,255,255,.1)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Edit Profile
          </button>
          <button style={{
            flex: 1,
            padding: '9px 0',
            borderRadius: 10,
            border: '1.5px solid rgba(255,255,255,.3)',
            background: 'rgba(255,255,255,.1)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Share Profile
          </button>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderTop: '1px solid rgba(255,255,255,.1)' }}>
          {[
            { id: 'posts', label: '⊞ Posts' },
            { id: 'tagged', label: '🏷 Tagged' },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                flex: 1,
                padding: '12px 0',
                background: 'none',
                border: 'none',
                color: tab === id ? '#f0c842' : 'rgba(255,255,255,.5)',
                fontSize: 13,
                fontWeight: tab === id ? 700 : 500,
                cursor: 'pointer',
                borderBottom: tab === id ? '2px solid #f0c842' : '2px solid transparent',
                transition: 'all .15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid / list */}
      <div style={{ padding: '14px 14px 8px' }}>
        {tab === 'tagged' ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#78716c' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏷</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#44403c', marginBottom: 6 }}>No tagged posts</p>
            <p style={{ fontSize: 14 }}>Posts you're tagged in will appear here</p>
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#78716c' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#44403c', marginBottom: 6 }}>No posts yet</p>
            <p style={{ fontSize: 14 }}>Share your first post with the community!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} onLike={onLike} onSave={onSave} />
          ))
        )}
      </div>
    </div>
  )
}
