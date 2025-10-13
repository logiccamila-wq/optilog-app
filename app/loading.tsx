export default function Loading() {
  return (
    <main className="container" aria-busy="true" aria-live="polite">
      <div style={{ border: '1px solid #3b4252', padding: 16, borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Carregando…</p>
        <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={50} style={{ marginTop: 8, height: 4, background: '#1f2937', borderRadius: 2 }}>
          <div style={{ width: '50%', height: '100%', background: '#0E539A' }} />
        </div>
      </div>
    </main>
  );
}