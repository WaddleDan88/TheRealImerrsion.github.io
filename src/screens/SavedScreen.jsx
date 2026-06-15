import PostCard from '../components/PostCard'

export default function SavedScreen({ posts, onLike, onSave }) {
  return (
    <div>
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #f0ebe5',
        padding: '16px 16px 14px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1c1917' }}>Saved</h1>
        <p style={{ fontSize: 13, color: '#78716c', marginTop: 3 }}>
          {posts.length} saved post{posts.length !== 1 ? 's' : ''}
        </p>
      </header>

      <div style={{ padding: '14px 14px 8px' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#78716c' }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🔖</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#44403c', marginBottom: 6 }}>Nothing saved yet</p>
            <p style={{ fontSize: 14, lineHeight: 1.5 }}>
              Tap the bookmark icon on any post to save it here for later.
            </p>
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
