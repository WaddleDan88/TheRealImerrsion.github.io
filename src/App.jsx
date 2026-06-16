import { useState } from 'react'
import BottomNav from './components/BottomNav'
import FeedScreen from './screens/FeedScreen'
import ExploreScreen from './screens/ExploreScreen'
import CreateScreen from './screens/CreateScreen'
import SavedScreen from './screens/SavedScreen'
import ProfileScreen from './screens/ProfileScreen'
import { POSTS, USERS } from './data/mockData'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [posts, setPosts] = useState(POSTS)
  const [savedIds, setSavedIds] = useState(new Set())
  const [likedIds, setLikedIds] = useState(new Set())

  function toggleLike(postId) {
    setLikedIds(prev => {
      const next = new Set(prev)
      next.has(postId) ? next.delete(postId) : next.add(postId)
      return next
    })
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, likes: likedIds.has(postId) ? p.likes - 1 : p.likes + 1 }
        : p
    ))
  }

  function toggleSave(postId) {
    setSavedIds(prev => {
      const next = new Set(prev)
      next.has(postId) ? next.delete(postId) : next.add(postId)
      return next
    })
  }

  function addPost(newPost) {
    setPosts(prev => [newPost, ...prev])
    setActiveTab('home')
  }

  const enriched = posts.map(p => ({
    ...p,
    liked: likedIds.has(p.id),
    saved: savedIds.has(p.id),
    user: USERS.find(u => u.id === p.userId),
  }))

  const savedPosts = enriched.filter(p => savedIds.has(p.id))

  const screens = {
    home: <FeedScreen posts={enriched} onLike={toggleLike} onSave={toggleSave} />,
    explore: <ExploreScreen posts={enriched} onLike={toggleLike} onSave={toggleSave} />,
    create: <CreateScreen onPost={addPost} />,
    saved: <SavedScreen posts={savedPosts} onLike={toggleLike} onSave={toggleSave} />,
    profile: <ProfileScreen posts={enriched.filter(p => p.userId === 'u1')} onLike={toggleLike} onSave={toggleSave} />,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'calc(68px + env(safe-area-inset-bottom, 0px))' }}>
        {screens[activeTab]}
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
