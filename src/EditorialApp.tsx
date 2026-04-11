import React, { JSX, useState } from "react";

interface ContentState {
  title: string;
  body: string;
  status: string;
}

export default function EditorialApp(): JSX.Element {
  const [content, setContent] = useState<ContentState>({
    title: "Welcome to the Editorial Dashboard",
    body: "Start crafting your premium content here. This microfrontend is powered by React 17 with TypeScript.",
    status: "Draft"
  });

  return (
    <div className="animate-in">
      <header style={{ marginBottom: '2rem' }}>
        <h2 className="vibrant-text" style={{ fontSize: '2rem' }}>Editorial Editor</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage and publish your CMS content (TSX)</p>
      </header>

      <div className="card" style={{ maxWidth: '800px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Article Title</label>
          <input
            type="text"
            value={content.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent({ ...content, title: e.target.value })}
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
            rows={8}
            value={content.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent({ ...content, body: e.target.value })}
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
    </div>
  );
}
