const TABS = [
  { id: 'home',    icon: HomeIcon,    label: 'Home' },
  { id: 'explore', icon: ExploreIcon, label: 'Explore' },
  { id: 'create',  icon: CreateIcon,  label: 'Post' },
  { id: 'saved',   icon: SavedIcon,   label: 'Saved' },
  { id: 'profile', icon: ProfileIcon, label: 'Profile' },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      height: 'calc(68px + env(safe-area-inset-bottom, 0px))',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      background: '#fff',
      borderTop: '1px solid #e8e3de',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 8,
      zIndex: 100,
      boxShadow: '0 -2px 12px rgba(0,0,0,.06)',
    }}>
      {TABS.map(({ id, icon: Icon, label }) => {
        const isActive = active === id
        const isCreate = id === 'create'
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '0 4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label={label}
          >
            {isCreate ? (
              <span style={{
                width: 44,
                height: 44,
                background: 'linear-gradient(135deg, #2d5a27 0%, #3d7a35 100%)',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(45,90,39,.35)',
                marginTop: -4,
              }}>
                <Icon color="#fff" size={22} />
              </span>
            ) : (
              <Icon color={isActive ? '#2d5a27' : '#78716c'} size={24} />
            )}
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 600 : 400,
              color: isCreate ? '#2d5a27' : isActive ? '#2d5a27' : '#78716c',
              letterSpacing: 0.2,
            }}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

function HomeIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12L12 3L21 12V20C21 20.55 20.55 21 20 21H15V16H9V21H4C3.45 21 3 20.55 3 20V12Z"
        fill={color} />
    </svg>
  )
}

function ExploreIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
      <path d="M21 21L16.65 16.65" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CreateIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function SavedIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19 21L12 16L5 21V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V21Z"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProfileIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
      <path d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
