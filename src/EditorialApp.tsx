import * as React from 'react';
import { useState, useEffect } from 'react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  status: 'Published' | 'Draft' | 'Review';
  author: string;
  date: string;
  readTime: string;
}

const STORAGE_KEY = 'cms_articles';

export function EditorialApp(): React.ReactElement {
  const [articles, setArticles] = useState<Article[]>([]);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [editorContent, setEditorContent] = useState({ title: '', body: '', status: 'Draft' as Article['status'] });
  const [view, setView] = useState<'list' | 'editor'>('list');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      const initial: Article[] = [
        { id: 1, title: 'Building Scalable Microfrontends', excerpt: 'Architectural patterns for modern web apps.', status: 'Published', author: 'Admin', date: '2026-04-10', readTime: '5m' },
      ];
      setArticles(initial);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    }
  }, []);

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newArticles));
  };

  const handleSave = () => {
    if (!editorContent.title) return;

    if (activeArticle) {
      const updated = articles.map(a => a.id === activeArticle.id ? { ...a, title: editorContent.title, excerpt: editorContent.body, status: editorContent.status } : a);
      saveArticles(updated);
    } else {
      const newArt: Article = {
        id: Date.now(),
        title: editorContent.title,
        excerpt: editorContent.body,
        status: editorContent.status,
        author: 'Current User',
        date: new Date().toISOString().split('T')[0],
        readTime: '1m'
      };
      saveArticles([newArt, ...articles]);
    }
    setView('list');
  };

  const deleteArticle = (id: number) => {
    saveArticles(articles.filter(a => a.id !== id));
  };

  const openEditor = (article?: Article) => {
    if (article) {
      setEditorContent({ title: article.title, body: article.excerpt, status: article.status });
      setActiveArticle(article);
    } else {
      setEditorContent({ title: '', body: '', status: 'Draft' });
      setActiveArticle(null);
    }
    setView('editor');
  };

  return (
    <div className="animate-in">
      <header className="editorial-header" style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.04em', marginBottom: '0.5rem' }}>Editorial Suite</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>Content orchestration and publishing lifecycle</p>
        </div>
        <button onClick={() => openEditor()} style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none', padding: '0.85rem 2rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(79, 70, 229, 0.3)'; }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.2)'; }}>
          + Create Article
        </button>
      </header>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .editorial-header { flex-direction: column; align-items: flex-start !important; gap: 1.5rem; }
          .editorial-header h2 { font-size: 1.75rem !important; }
          .editorial-header p { font-size: 0.95rem !important; }
          .article-card { flex-direction: column; align-items: flex-start !important; gap: 1rem; }
          .article-card > div:last-child { width: 100%; display: flex; gap: 0.5rem; }
          .article-card button { flex: 1; }
          .editor-container { padding: 1.5rem !important; }
          .editor-container h1, .editor-container input { font-size: 1.25rem !important; }
        }
      `}} />

      {view === 'list' ? (
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {articles.map(article => (
            <div key={article.id} className="module-card article-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.75rem 2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--primary)' }}>{article.title}</h3>
                  <span className="module-tag" style={{ background: article.status === 'Published' ? '#ecfdf5' : article.status === 'Draft' ? '#f1f5f9' : '#fff7ed', color: article.status === 'Published' ? '#059669' : article.status === 'Draft' ? '#475569' : '#d97706', border: 'none' }}>{article.status}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{article.excerpt.substring(0, 120)}...</p>
                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  By {article.author} · {article.date} · {article.readTime} read
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => openEditor(article)} style={{ background: '#f8fafc', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>Edit</button>
                <button onClick={() => deleteArticle(article.id)} style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#e11d48' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="module-card editor-container" style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '3rem', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Article Title</label>
              <input 
                type="text" 
                placeholder="Enter a compelling title..." 
                value={editorContent.title}
                onChange={e => setEditorContent({...editorContent, title: e.target.value})}
                style={{ width: '100%', padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '1.5rem', fontWeight: 800, outline: 'none', background: '#fbfbfe', color: 'var(--primary)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Content</label>
              <textarea 
                placeholder="Start writing your story..." 
                value={editorContent.body}
                onChange={e => setEditorContent({...editorContent, body: e.target.value})}
                style={{ width: '100%', padding: '1.25rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', minHeight: '350px', fontSize: '1.05rem', outline: 'none', resize: 'vertical', lineHeight: 1.7, background: '#fbfbfe', color: 'var(--text-main)' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status:</label>
                <select 
                  value={editorContent.status}
                  onChange={e => setEditorContent({...editorContent, status: e.target.value as any})}
                  style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'white', fontWeight: 600, fontSize: '0.9rem' }}
                >
                  <option value="Draft">Draft Mode</option>
                  <option value="Review">In Review</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem' }}>Discard</button>
                <button onClick={handleSave} style={{ background: 'var(--primary-gradient)', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: 'var(--radius)', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)' }}>
                  Save & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
