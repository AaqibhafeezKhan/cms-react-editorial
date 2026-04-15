import * as React from 'react';
import { useState } from 'react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  status: 'Published' | 'Draft' | 'Review';
  author: string;
  date: string;
  readTime: string;
}

const SAMPLE_ARTICLES: Article[] = [
  { id: 1, title: 'Getting Started with Microfrontends', excerpt: 'A deep dive into the single-spa architecture and how it enables independent deployments.', status: 'Published', author: 'Aaqib', date: 'Apr 14, 2026', readTime: '6 min read' },
  { id: 2, title: 'Angular Auth Module Integration', excerpt: 'How the auth microfrontend handles role-based access control across the platform.', status: 'Review', author: 'Sarah', date: 'Apr 15, 2026', readTime: '4 min read' },
  { id: 3, title: 'Vue Media Library Deep Dive', excerpt: 'Managing media assets at scale with Vue 2 and a SystemJS module approach.', status: 'Draft', author: 'Mike', date: 'Apr 15, 2026', readTime: '8 min read' },
];

const STATUS_COLORS: Record<string, string> = {
  Published: '#10b981',
  Review: '#f59e0b',
  Draft: '#6366f1',
};

export default function EditorialApp(): JSX.Element {
  const [articles] = useState<Article[]>(SAMPLE_ARTICLES);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [editorContent, setEditorContent] = useState({ title: '', body: '', status: 'Draft' as Article['status'] });
  const [view, setView] = useState<'list' | 'editor'>('list');

  function openEditor(article?: Article) {
    if (article) {
      setEditorContent({ title: article.title, body: article.excerpt, status: article.status });
      setActiveArticle(article);
    } else {
      setEditorContent({ title: '', body: '', status: 'Draft' });
      setActiveArticle(null);
    }
    setView('editor');
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.5rem',
    color: '#f8fafc',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
  };

  return (
    <div className="animate-in">
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="vibrant-text" style={{ fontSize: '2rem' }}>Editorial Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Craft, manage and publish content · React 17 + TypeScript</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className={`glass-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>📋 Articles</button>
          <button className={`glass-btn ${view === 'editor' ? 'active' : ''}`} onClick={() => openEditor()}>✏️ New Article</button>
        </div>
      </header>

      {view === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            {[
              { label: 'Total Articles', value: articles.length, icon: '📝' },
              { label: 'Published', value: articles.filter(a => a.status === 'Published').length, icon: '✅' },
              { label: 'Drafts', value: articles.filter(a => a.status === 'Draft').length, icon: '📄' },
            ].map(stat => (
              <div key={stat.label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {articles.map(article => (
            <div key={article.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer' }} onClick={() => openEditor(article)}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{article.title}</h3>
                  <span style={{ padding: '0.15rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700, background: STATUS_COLORS[article.status] + '22', color: STATUS_COLORS[article.status], border: `1px solid ${STATUS_COLORS[article.status]}55` }}>
                    {article.status}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{article.excerpt}</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>👤 {article.author}</span>
                  <span>📅 {article.date}</span>
                  <span>⏱ {article.readTime}</span>
                </div>
              </div>
              <button className="glass-btn" style={{ flexShrink: 0 }}>Edit →</button>
            </div>
          ))}
        </div>
      )}

      {view === 'editor' && (
        <div className="card" style={{ maxWidth: '800px' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{activeArticle ? 'Edit Article' : 'New Article'}</h3>
            <button className="glass-btn" onClick={() => setView('list')}>← Back</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Article Title</label>
              <input type="text" value={editorContent.title} onChange={e => setEditorContent({ ...editorContent, title: e.target.value })} placeholder="Enter a compelling title..." style={{ ...inputStyle, fontSize: '1.1rem' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Content Body</label>
              <textarea rows={10} value={editorContent.body} onChange={e => setEditorContent({ ...editorContent, body: e.target.value })} placeholder="Start writing your article..." style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <select value={editorContent.status} onChange={e => setEditorContent({ ...editorContent, status: e.target.value as Article['status'] })} style={{ ...inputStyle, width: 'auto' }}>
                <option value="Draft">Draft</option>
                <option value="Review">Send for Review</option>
                <option value="Published">Publish</option>
              </select>
              <button className="glass-btn active" style={{ marginLeft: 'auto', padding: '0.75rem 2rem' }}>
                {editorContent.status === 'Published' ? '🚀 Publish Now' : '💾 Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
