export default function AgeGate({ onConfirm }) {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(160deg, #1a3a15 0%, #2d5a27 50%, #8b5e3c 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🌿</div>
      <h1 style={{
        fontSize: 36,
        fontWeight: 800,
        color: '#fff',
        letterSpacing: '-1px',
        marginBottom: 8,
      }}>Canopy</h1>
      <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 16, marginBottom: 40 }}>
        Cannabis Community &amp; Education
      </p>

      <div style={{
        background: 'rgba(255,255,255,.1)',
        backdropFilter: 'blur(12px)',
        borderRadius: 20,
        padding: '28px 24px',
        maxWidth: 320,
        width: '100%',
        border: '1px solid rgba(255,255,255,.15)',
      }}>
        <p style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
          Are you 21+ or a medical patient?
        </p>
        <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>
          Canopy is a community for adults and medical patients only. This app contains cannabis content.
        </p>

        <button
          onClick={onConfirm}
          style={{
            width: '100%',
            background: '#f0c842',
            color: '#1a3a15',
            border: 'none',
            borderRadius: 12,
            padding: '14px 0',
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 10,
            cursor: 'pointer',
          }}
        >
          Yes, I'm 21+ / Medical Patient
        </button>
        <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 12, lineHeight: 1.6 }}>
          By entering you confirm you are of legal age in your jurisdiction. This platform contains no sales, transactions, or advice. Education and community only.
        </p>
      </div>
    </div>
  )
}
