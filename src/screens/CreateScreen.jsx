import { useState } from 'react'
import { TAG_CONFIG, currentUser, USERS } from '../data/mockData'

const TAGS = ['Medical', 'Recreational', 'Science', 'Benefits', 'Pride', 'StrainReview']

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1536819114556-1e10f967fb61?w=600&q=80',
  'https://images.unsplash.com/photo-1603909517613-8d06d3a44a65?w=600&q=80',
  'https://images.unsplash.com/photo-1574539602932-f4ba7a4d009e?w=600&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80',
]

export default function CreateScreen({ onPost }) {
  const [tag, setTag] = useState('')
  const [caption, setCaption] = useState('')
  const [selectedImg, setSelectedImg] = useState(null)
  const [source, setSource] = useState('')
  const [strain, setStrain] = useState({ name: '', type: 'Hybrid', thc: '', cbd: '', effects: '', flavors: '', rating: 4 })
  const [submitted, setSubmitted] = useState(false)

  const canPost = tag && caption.trim() && selectedImg !== null

  function handleSubmit() {
    if (!canPost) return

    const newPost = {
      id: 'p' + Date.now(),
      userId: currentUser.id,
      tag,
      image: PLACEHOLDER_IMAGES[selectedImg],
      caption,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      ...(tag === 'Science' && source ? { source, verified: true } : {}),
      ...(tag === 'StrainReview' ? {
        strainData: {
          name: strain.name || 'Mystery Strain',
          type: strain.type,
          thc: strain.thc || '—',
          cbd: strain.cbd || '—',
          effects: strain.effects.split(',').map(s => s.trim()).filter(Boolean),
          flavors: strain.flavors.split(',').map(s => s.trim()).filter(Boolean),
          rating: Number(strain.rating),
        }
      } : {}),
    }

    onPost(newPost)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 100)
  }

  if (submitted) return null

  return (
    <div>
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #f0ebe5',
        padding: '16px 16px 14px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1c1917' }}>New Post</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={currentUser.avatar} alt="" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#44403c' }}>@{currentUser.username}</span>
        </div>
      </header>

      <div style={{ padding: '16px 16px 100px' }}>

        {/* Tag selector */}
        <Section title="Post Type">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {TAGS.map(t => {
              const cfg = TAG_CONFIG[t]
              const isActive = tag === t
              return (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 999,
                    border: `1.5px solid ${isActive ? cfg.color : '#e8e3de'}`,
                    background: isActive ? cfg.bg : '#fff',
                    color: isActive ? cfg.color : '#44403c',
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    transition: 'all .15s',
                  }}
                >
                  {cfg.emoji} {cfg.label}
                </button>
              )
            })}
          </div>
        </Section>

        {/* Photo picker */}
        <Section title="Photo">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 6,
          }}>
            {PLACEHOLDER_IMAGES.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                style={{
                  aspectRatio: '1',
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: `2.5px solid ${selectedImg === i ? '#2d5a27' : 'transparent'}`,
                  padding: 0,
                  cursor: 'pointer',
                  background: 'none',
                  position: 'relative',
                }}
              >
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {selectedImg === i && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(45,90,39,.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                  }}>✓</div>
                )}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#78716c', marginTop: 8 }}>
            Using sample photos — upload from camera roll coming soon
          </p>
        </Section>

        {/* Caption */}
        <Section title="Caption">
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Share your experience, knowledge, or story…"
            rows={4}
            style={{
              width: '100%',
              border: '1.5px solid #e8e3de',
              borderRadius: 12,
              padding: '12px 14px',
              fontSize: 14,
              color: '#1c1917',
              background: '#fafaf9',
              outline: 'none',
              resize: 'none',
              lineHeight: 1.5,
            }}
          />
          <div style={{ textAlign: 'right', fontSize: 12, color: '#c4b5ab', marginTop: 4 }}>
            {caption.length} chars
          </div>
        </Section>

        {/* Science source */}
        {tag === 'Science' && (
          <Section title="Source / Citation">
            <input
              value={source}
              onChange={e => setSource(e.target.value)}
              placeholder="e.g. New England Journal of Medicine, 2024"
              style={inputStyle}
            />
          </Section>
        )}

        {/* Strain fields */}
        {tag === 'StrainReview' && (
          <Section title="Strain Details">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                value={strain.name}
                onChange={e => setStrain(s => ({ ...s, name: e.target.value }))}
                placeholder="Strain name"
                style={inputStyle}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                {['Indica', 'Sativa', 'Hybrid'].map(t => (
                  <button
                    key={t}
                    onClick={() => setStrain(s => ({ ...s, type: t }))}
                    style={{
                      flex: 1,
                      padding: '9px 0',
                      borderRadius: 10,
                      border: `1.5px solid ${strain.type === t ? '#2d5a27' : '#e8e3de'}`,
                      background: strain.type === t ? '#eef7ec' : '#fafaf9',
                      color: strain.type === t ? '#2d5a27' : '#44403c',
                      fontWeight: strain.type === t ? 700 : 500,
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'all .15s',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input value={strain.thc} onChange={e => setStrain(s => ({ ...s, thc: e.target.value }))}
                  placeholder="THC %" style={{ ...inputStyle, flex: 1 }} />
                <input value={strain.cbd} onChange={e => setStrain(s => ({ ...s, cbd: e.target.value }))}
                  placeholder="CBD %" style={{ ...inputStyle, flex: 1 }} />
              </div>
              <input
                value={strain.effects}
                onChange={e => setStrain(s => ({ ...s, effects: e.target.value }))}
                placeholder="Effects (comma-separated): Relaxed, Creative…"
                style={inputStyle}
              />
              <input
                value={strain.flavors}
                onChange={e => setStrain(s => ({ ...s, flavors: e.target.value }))}
                placeholder="Flavors (comma-separated): Sweet, Earthy…"
                style={inputStyle}
              />
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#44403c', display: 'block', marginBottom: 6 }}>
                  Rating: {strain.rating}/5 {'★'.repeat(Number(strain.rating))}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={strain.rating}
                  onChange={e => setStrain(s => ({ ...s, rating: e.target.value }))}
                  style={{ width: '100%', accentColor: '#b8860b' }}
                />
              </div>
            </div>
          </Section>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canPost}
          style={{
            width: '100%',
            padding: '15px 0',
            borderRadius: 14,
            border: 'none',
            background: canPost
              ? 'linear-gradient(135deg, #2d5a27 0%, #3d7a35 100%)'
              : '#d4edcf',
            color: canPost ? '#fff' : '#6aad60',
            fontSize: 16,
            fontWeight: 700,
            cursor: canPost ? 'pointer' : 'default',
            transition: 'all .2s',
            boxShadow: canPost ? '0 4px 16px rgba(45,90,39,.3)' : 'none',
            marginTop: 8,
          }}
        >
          🌿 Share with Canopy
        </button>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#c4b5ab', marginTop: 10, lineHeight: 1.5 }}>
          Posts are community content and do not constitute medical or legal advice. 21+ / medical patients only.
        </p>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: '#44403c', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {title}
      </p>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%',
  border: '1.5px solid #e8e3de',
  borderRadius: 10,
  padding: '11px 13px',
  fontSize: 14,
  color: '#1c1917',
  background: '#fafaf9',
  outline: 'none',
}
