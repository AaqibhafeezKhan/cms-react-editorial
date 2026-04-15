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

export default function EditorialApp(): React.ReactElement {
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
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Editorial</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Content orchestration and publishing</p>
        </div>
        <button onClick={() => openEditor()} className="glass-btn active" style={{ background: 'var(--primary-accent)', color: 'white', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius)', cursor: 'pointer', fontWeight: 600 }}>
          + New Entry
        </button>
      </header>

      {view === 'list' ? (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {articles.map(article => (
            <div key={article.id} className="module-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>{article.title}</h3>
                  <span className="module-tag">{article.status}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{article.excerpt.substring(0, 100)}...</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openEditor(article)} className="nav-item">Edit</button>
                <button onClick={() => deleteArticle(article.id)} className="nav-item" style={{ color: '#ef4444' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="module-card" style={{ maxWidth: '800px', background: '#f8fafc' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input 
              type="text" 
              placeholder="Article Title" 
              value={editorContent.title}
              onChange={e => setEditorContent({...editorContent, title: e.target.value})}
              style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '1.25rem', fontWeight: 700, outline: 'none' }}
            />
            <textarea 
              placeholder="Write your content..." 
              value={editorContent.body}
              onChange={e => setEditorContent({...editorContent, body: e.target.value})}
              style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', minHeight: '300px', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <select 
                value={editorContent.status}
                onChange={e => setEditorContent({...editorContent, status: e.target.value as any})}
                style={{ padding: '0.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
              >
                <option value="Draft">Draft</option>
                <option value="Review">Review</option>
                <option value="Published">Published</option>
              </select>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setView('list')} className="nav-item">Cancel</button>
                <button onClick={handleSave} className="glass-btn active" style={{ background: 'var(--primary-accent)', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 'var(--radius)', cursor: 'pointer', fontWeight: 600 }}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
