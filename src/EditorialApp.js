import React, { useState } from "react";

export default function EditorialApp() {
  const [content, setContent] = useState({
    title: "Welcome to the Editorial Dashboard",
    body: "Start crafting your premium content here. This microfrontend is powered by React 17.",
    status: "Draft"
  });

  return (
    <div className="animate-in">
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="vibrant-text" style={{ fontSize: '2rem' }}>Editorial Editor</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage and publish your CMS content</p>
      </header>

      <div className="card" style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Article Title</label>
          <input 
            type="text" 
            value={content.title}
            onChange={(e) => setContent({...content, title: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--text-main)',
              fontSize: '1.1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Content Body</label>
          <textarea 
            rows="8"
            value={content.body}
            onChange={(e) => setContent({...content, body: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '0.5rem',
              color: 'var(--text-main)',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ 
              padding: '0.25rem 0.75rem', 
              borderRadius: '1rem', 
              background: 'var(--primary)', 
              fontSize: '0.75rem',
              fontWeight: 600
            }}>
              {content.status}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Last saved: Just now</span>
          </div>
          <button className="glass-btn active" style={{ padding: '0.75rem 2rem' }}>
            Publish Now
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {['Article Analytics', 'SEO Status', 'Preview'].map((box) => (
          <div key={box} className="card" style={{ padding: '1rem', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>{box}</h4>
            <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: 'var(--accent)' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
