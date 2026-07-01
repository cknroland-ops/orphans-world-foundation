'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { FileText, LogOut, Plus, Trash2, BarChart2, Loader2, Upload, Database, Users, MessageCircle, Mail, Eye, Shield, KeyRound, CheckCircle2, Pencil, X } from 'lucide-react';
import { RichTextEditor } from '../../../components/RichTextEditor';

type Article = {
  id: string;
  titre: string;
  slug: string;
  extrait: string;
  image_url: string;
  categorie: string;
  publie: boolean;
  created_at: string;
};

type Stats = {
  newsletter: number;
  contacts: number;
  visitesToday: number;
  visitesTotal: number;
};

const EMPTY_FORM = { titre: '', slug: '', extrait: '', image_url: '', categorie: 'blog', contenu: '', publie: true };
const STORAGE_BUCKET = 'articles-images';

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<'stats' | 'blog' | 'security'>('stats');
  const [stats, setStats] = useState<Stats>({ newsletter: 0, contacts: 0, visitesToday: 0, visitesTotal: 0 });
  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [seedStatus, setSeedStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [seedMsg, setSeedMsg] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pwdNew, setPwdNew] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [pwdStatus, setPwdStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [pwdError, setPwdError] = useState('');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const today = new Date().toISOString().split('T')[0];

  const loadData = async () => {
    setLoadingData(true);
    const [newsletterRes, contactsRes, articlesRes, visitesTodayRes, visitesTotalRes] = await Promise.all([
      supabase.from('newsletter').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('articles').select('id, titre, slug, extrait, image_url, categorie, publie, created_at').order('created_at', { ascending: false }),
      supabase.from('visites').select('*', { count: 'exact', head: true }).eq('date', today),
      supabase.from('visites').select('*', { count: 'exact', head: true }),
    ]);
    setStats({
      newsletter: newsletterRes.count ?? 0,
      contacts: contactsRes.count ?? 0,
      visitesToday: visitesTodayRes.count ?? 0,
      visitesTotal: visitesTotalRes.count ?? 0,
    });
    setArticles(articlesRes.data ?? []);
    setLoadingData(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const generateSlug = (titre: string) =>
    titre.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitreChange = (val: string) => {
    setForm(f => ({ ...f, titre: val, slug: generateSlug(val) }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadProgress('idle');
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploadProgress('uploading');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload-image', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setUploadProgress('error');
        return null;
      }
      setUploadProgress('done');
      return data.url;
    } catch {
      setUploadProgress('error');
      return null;
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError('');
    if (pwdNew.length < 8) {
      setPwdError('Le mot de passe doit contenir au moins 8 caractères.');
      setPwdStatus('error');
      return;
    }
    if (pwdNew !== pwdConfirm) {
      setPwdError('Les mots de passe ne correspondent pas.');
      setPwdStatus('error');
      return;
    }
    setPwdStatus('loading');
    const { error } = await supabase.auth.updateUser({ password: pwdNew });
    if (error) {
      setPwdError(error.message);
      setPwdStatus('error');
    } else {
      setPwdStatus('success');
      setPwdNew('');
      setPwdConfirm('');
      setTimeout(() => setPwdStatus('idle'), 5000);
    }
  };

  const handleEdit = (a: Article) => {
    setEditingId(a.id);
    setForm({
      titre: a.titre,
      slug: a.slug,
      extrait: a.extrait,
      image_url: a.image_url ?? '',
      categorie: a.categorie,
      contenu: '',
      publie: a.publie,
    });
    setImageFile(null);
    setImagePreview(a.image_url ?? '');
    setUploadProgress('idle');
    setFormStatus('idle');
    setFormError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImagePreview('');
    setUploadProgress('idle');
    setFormStatus('idle');
    setFormError('');
  };

  const handleSeed = async () => {
    setSeedStatus('loading');
    setSeedMsg('');
    try {
      const res = await fetch('/api/seed-articles', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) { setSeedStatus('error'); setSeedMsg(data.error); }
      else { setSeedStatus('done'); setSeedMsg(data.message); await loadData(); }
    } catch { setSeedStatus('error'); setSeedMsg('Erreur serveur.'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titre || !form.extrait) {
      setFormError('Titre et extrait sont obligatoires.');
      setFormStatus('error');
      return;
    }
    setFormStatus('loading');
    setFormError('');

    let finalImageUrl = form.image_url || null;
    if (imageFile) {
      const uploaded = await uploadImage(imageFile);
      if (!uploaded) {
        setFormError("Échec du téléversement de l'image. Vérifiez que le bucket '" + STORAGE_BUCKET + "' existe dans Supabase Storage.");
        setFormStatus('error');
        return;
      }
      finalImageUrl = uploaded;
    }

    const payload: Record<string, any> = {
      titre: form.titre,
      slug: form.slug || generateSlug(form.titre),
      extrait: form.extrait,
      categorie: form.categorie,
      publie: form.publie,
      image_url: finalImageUrl,
    };
    if (form.contenu) payload.contenu = form.contenu;

    const { error } = editingId
      ? await supabase.from('articles').update(payload).eq('id', editingId)
      : await supabase.from('articles').insert(payload);

    if (error) {
      setFormError(error.message);
      setFormStatus('error');
    } else {
      setFormStatus('success');
      setEditingId(null);
      setForm(EMPTY_FORM);
      setImageFile(null);
      setImagePreview('');
      setUploadProgress('idle');
      await loadData();
      await fetch('/api/revalidate-blog', { method: 'POST' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article définitivement ?')) return;
    setDeleting(id);
    await supabase.from('articles').delete().eq('id', id);
    await loadData();
    await fetch('/api/revalidate-blog', { method: 'POST' });
    setDeleting(null);
  };

  const sidebarItems = [
    { id: 'stats', label: 'Statistiques', icon: <BarChart2 size={18} /> },
    { id: 'blog', label: 'Gestion Blog', icon: <FileText size={18} /> },
    { id: 'security', label: 'Sécurité / Profil', icon: <Shield size={18} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', background: '#0f1824', color: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '32px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>ADMIN</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>OWF Dashboard</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id as any)}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 24px', background: tab === item.id ? 'rgba(192,57,43,0.25)' : 'transparent', color: tab === item.id ? '#f87171' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: tab === item.id ? 600 : 400, borderLeft: tab === item.id ? '3px solid #c0392b' : '3px solid transparent', transition: 'all 0.2s' }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '16px' }}>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}
          >
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {loadingData && tab === 'stats' ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#6b7280' }}><Loader2 size={20} /> Chargement...</div>
        ) : (
          <>
            {/* STATS TAB */}
            {tab === 'stats' && (
              <div>
                <div style={{ marginBottom: 40 }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: '#c0392b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>VUE D&apos;ENSEMBLE</div>
                  <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f1824', margin: 0 }}>Tableau de bord</h1>
                  <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 6 }}>
                    {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 40 }}>
                  {[
                    {
                      label: "Visiteurs aujourd'hui",
                      value: stats.visitesToday,
                      sub: `${stats.visitesTotal.toLocaleString('fr-FR')} visites au total`,
                      icon: <Eye size={20} />,
                      gradient: 'linear-gradient(135deg,#1e3a8a,#3b82f6)',
                      glow: 'rgba(59,130,246,0.12)',
                    },
                    {
                      label: 'Messages reçus',
                      value: stats.contacts,
                      sub: 'Via le formulaire de contact',
                      icon: <MessageCircle size={20} />,
                      gradient: 'linear-gradient(135deg,#92400e,#f59e0b)',
                      glow: 'rgba(245,158,11,0.12)',
                    },
                    {
                      label: 'Inscrits Newsletter',
                      value: stats.newsletter,
                      sub: 'Abonnés actifs',
                      icon: <Mail size={20} />,
                      gradient: 'linear-gradient(135deg,#065f46,#10b981)',
                      glow: 'rgba(16,185,129,0.12)',
                    },
                    {
                      label: 'Articles publiés',
                      value: articles.filter(a => a.publie).length,
                      sub: `${articles.length} articles au total`,
                      icon: <FileText size={20} />,
                      gradient: 'linear-gradient(135deg,#4c1d95,#8b5cf6)',
                      glow: 'rgba(139,92,246,0.12)',
                    },
                  ].map((card, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: `0 4px 24px ${card.glow}`, border: '1px solid rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: card.gradient }} />
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: 18 }}>
                        {card.icon}
                      </div>
                      <div style={{ fontSize: 42, fontWeight: 800, color: '#0f1824', lineHeight: 1, marginBottom: 6, letterSpacing: '-2px' }}>
                        {loadingData ? <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} /> : card.value.toLocaleString('fr-FR')}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 4 }}>{card.label}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{card.sub}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#fff', borderRadius: 20, padding: '28px 32px', boxShadow: '0 1px 6px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}><Users size={16} color="#c0392b" /> À propos du suivi</div>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>
                    Les visiteurs sont comptabilisés de façon anonyme, une fois par jour par appareil. Aucune donnée personnelle n&apos;est collectée. Le compteur se remet à zéro chaque jour à minuit UTC.
                  </p>
                </div>
              </div>
            )}

            {/* BLOG TAB */}
            {tab === 'blog' && (
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0f1824', marginBottom: '32px' }}>Gestion du Blog</h1>

                {/* Seed banner */}
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '16px', padding: '20px 28px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}><Database size={16} /> Importer les anciens articles</div>
                    <div style={{ fontSize: '13px', color: '#b45309' }}>Insère les 7 articles historiques du site dans la base de données (ignorés s'ils existent déjà).</div>
                    {seedMsg && <div style={{ fontSize: '13px', marginTop: 6, color: seedStatus === 'done' ? '#166534' : '#991b1b', fontWeight: 600 }}>{seedStatus === 'done' ? '✓ ' : '✗ '}{seedMsg}</div>}
                  </div>
                  <button onClick={handleSeed} disabled={seedStatus === 'loading' || seedStatus === 'done'} style={{ background: seedStatus === 'done' ? '#d1fae5' : '#f0a020', color: seedStatus === 'done' ? '#065f46' : '#fff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '14px', fontWeight: 700, cursor: seedStatus === 'loading' || seedStatus === 'done' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    {seedStatus === 'loading' ? <><Loader2 size={14} /> Import...</> : seedStatus === 'done' ? '✓ Importé' : <><Database size={14} /> Importer maintenant</>}
                  </button>
                </div>

                {/* Form */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f1824', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                      {editingId ? <><Pencil size={20} color="#c0392b" /> Modifier l&apos;article</> : <><Plus size={20} color="#c0392b" /> Nouvel article</>}
                    </h2>
                    {editingId && (
                      <button onClick={handleCancelEdit} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: '#6b7280', fontWeight: 600 }}>
                        <X size={14} /> Annuler la modification
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Titre *</label>
                      <input value={form.titre} onChange={e => handleTitreChange(e.target.value)} placeholder="Titre de l'article" style={inputStyle} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Slug (auto-généré)</label>
                      <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="slug-article" style={{ ...inputStyle, color: '#6b7280' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Catégorie</label>
                      <input value={form.categorie} onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))} placeholder="blog, santé, éducation..." style={inputStyle} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Image de l'article</label>
                      <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, border: '2px dashed #e5e7eb', borderRadius: 10, padding: '16px', cursor: 'pointer', background: imagePreview ? '#f9fafb' : '#fff', transition: 'border-color 0.2s', minHeight: 80 }}
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f && f.type.startsWith('image/')) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); } }}
                      >
                        {imagePreview ? (
                          <img src={imagePreview} alt="preview" style={{ maxHeight: 120, maxWidth: '100%', borderRadius: 8, objectFit: 'cover' }} />
                        ) : (
                          <><Upload size={24} color="#9ca3af" /><span style={{ fontSize: 13, color: '#9ca3af' }}>Cliquer ou glisser-déposer une image</span></>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                      </label>
                      {uploadProgress === 'uploading' && <span style={{ fontSize: 12, color: '#f0a020' }}>⏳ Téléversement en cours...</span>}
                      {uploadProgress === 'done' && <span style={{ fontSize: 12, color: '#166534' }}>✓ Image téléversée</span>}
                      {uploadProgress === 'error' && <span style={{ fontSize: 12, color: '#991b1b' }}>✗ Échec du téléversement</span>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Extrait *</label>
                      <textarea value={form.extrait} onChange={e => setForm(f => ({ ...f, extrait: e.target.value }))} placeholder="Résumé court de l'article..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: '1 / -1' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Contenu complet</label>
                      <RichTextEditor
                        value={form.contenu}
                        onChange={html => setForm(f => ({ ...f, contenu: html === '<p></p>' ? '' : html }))}
                        placeholder="Rédigez votre article ici — titres, listes, citations..."
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input type="checkbox" id="publie" checked={form.publie} onChange={e => setForm(f => ({ ...f, publie: e.target.checked }))} style={{ width: 18, height: 18, cursor: 'pointer' }} />
                      <label htmlFor="publie" style={{ fontSize: '14px', color: '#374151', cursor: 'pointer' }}>Publier immédiatement</label>
                    </div>
                    <div />

                    {formStatus === 'success' && (
                      <div style={{ gridColumn: '1 / -1', background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10, padding: '12px 16px', color: '#166534', fontWeight: 600 }}>
                        ✓ {editingId ? 'Article modifié avec succès !' : 'Article publié avec succès !'}
                      </div>
                    )}
                    {formStatus === 'error' && (
                      <div style={{ gridColumn: '1 / -1', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10, padding: '12px 16px', color: '#991b1b', fontWeight: 600 }}>
                        ✗ {formError}
                      </div>
                    )}
                    <div style={{ gridColumn: '1 / -1' }}>
                      <button type="submit" disabled={formStatus === 'loading'} style={{ background: editingId ? 'linear-gradient(135deg,#1e3a8a,#3b82f6)' : '#c0392b', color: '#fff', border: 'none', borderRadius: '12px', padding: '12px 32px', fontSize: '15px', fontWeight: 700, cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: formStatus === 'loading' ? 0.7 : 1 }}>
                        {formStatus === 'loading'
                          ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> {editingId ? 'Sauvegarde...' : 'Publication...'}</>
                          : editingId
                          ? <><Pencil size={16} /> Sauvegarder les modifications</>
                          : <><Plus size={16} /> Publier l&apos;article</>}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Articles list */}
                <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f1824', marginBottom: '24px' }}>Articles existants ({articles.length})</h2>
                  {articles.length === 0 ? (
                    <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>Aucun article pour l'instant.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {articles.map(a => (
                        <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid #f3f4f6', borderRadius: '12px', background: '#fafafa' }}>
                          {a.image_url && <img src={a.image_url} alt={a.titre} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, color: '#0f1824', fontSize: '15px', marginBottom: '4px' }}>{a.titre}</div>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>{a.categorie} · {new Date(a.created_at).toLocaleDateString('fr-FR')}</div>
                          </div>
                          <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: 20, background: a.publie ? '#dcfce7' : '#f3f4f6', color: a.publie ? '#166534' : '#6b7280', fontWeight: 600, flexShrink: 0 }}>
                            {a.publie ? 'Publié' : 'Brouillon'}
                          </span>
                          <button
                            onClick={() => handleEdit(a)}
                            disabled={editingId === a.id}
                            style={{ background: editingId === a.id ? '#eff6ff' : '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '8px 12px', cursor: editingId === a.id ? 'default' : 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', fontWeight: 600, opacity: editingId === a.id ? 0.5 : 1 }}
                          >
                            <Pencil size={14} /> {editingId === a.id ? 'En cours...' : 'Modifier'}
                          </button>
                          <button
                            onClick={() => handleDelete(a.id)}
                            disabled={deleting === a.id || editingId === a.id}
                            style={{ background: '#fee2e2', color: '#c0392b', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, fontSize: '13px', fontWeight: 600 }}
                          >
                            {deleting === a.id ? <Loader2 size={14} /> : <Trash2 size={14} />} Supprimer
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {tab === 'security' && (
              <div style={{ maxWidth: 560 }}>
                <div style={{ marginBottom: 40 }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, color: '#c0392b', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>ADMINISTRATION</div>
                  <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f1824', margin: 0 }}>Sécurité & Profil</h1>
                  <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 6 }}>Gérez les informations d&apos;accès de votre compte administrateur.</p>
                </div>

                {/* Change password card */}
                <div style={{ background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(135deg,#7f1d1d,#c0392b)' }} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#7f1d1d,#c0392b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      <KeyRound size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#0f1824' }}>Changer le mot de passe</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>Minimum 8 caractères</div>
                    </div>
                  </div>

                  <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Nouveau mot de passe</label>
                      <input
                        type="password"
                        value={pwdNew}
                        onChange={e => setPwdNew(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        style={pwdInputStyle}
                        onFocus={e => (e.target.style.borderColor = '#c0392b')}
                        onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Confirmer le mot de passe</label>
                      <input
                        type="password"
                        value={pwdConfirm}
                        onChange={e => setPwdConfirm(e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        style={{
                          ...pwdInputStyle,
                          borderColor: pwdConfirm && pwdNew !== pwdConfirm ? '#fca5a5' : '#e5e7eb',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#c0392b')}
                        onBlur={e => (e.target.style.borderColor = pwdConfirm && pwdNew !== pwdConfirm ? '#fca5a5' : '#e5e7eb')}
                      />
                      {pwdConfirm && pwdNew !== pwdConfirm && (
                        <span style={{ fontSize: 12, color: '#c0392b' }}>Les mots de passe ne correspondent pas.</span>
                      )}
                    </div>

                    {pwdStatus === 'success' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10, padding: '12px 16px', color: '#166534', fontWeight: 600 }}>
                        <CheckCircle2 size={18} /> Mot de passe mis à jour avec succès !
                      </div>
                    )}
                    {pwdStatus === 'error' && (
                      <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10, padding: '12px 16px', color: '#991b1b', fontWeight: 600, fontSize: 14 }}>
                        ✗ {pwdError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={pwdStatus === 'loading' || pwdStatus === 'success'}
                      style={{ background: pwdStatus === 'success' ? '#d1fae5' : 'linear-gradient(135deg,#7f1d1d,#c0392b)', color: pwdStatus === 'success' ? '#065f46' : '#fff', border: 'none', borderRadius: 12, padding: '13px 28px', fontSize: 15, fontWeight: 700, cursor: pwdStatus === 'loading' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s', opacity: pwdStatus === 'loading' ? 0.7 : 1, alignSelf: 'flex-start' }}
                    >
                      {pwdStatus === 'loading'
                        ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Mise à jour...</>
                        : pwdStatus === 'success'
                        ? <><CheckCircle2 size={16} /> Mis à jour !</>
                        : <><KeyRound size={16} /> Mettre à jour le mot de passe</>}
                    </button>
                  </form>
                </div>

                {/* Info card */}
                <div style={{ background: '#f8fafc', borderRadius: 16, padding: '20px 24px', marginTop: 24, border: '1px solid #e2e8f0', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <Shield size={18} color="#64748b" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7 }}>
                    La modification du mot de passe est immédiatement effective. Toutes les autres sessions actives seront automatiquement déconnectées par Supabase Auth.
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '10px 14px',
  border: '1.5px solid #e5e7eb',
  borderRadius: '10px',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const pwdInputStyle: React.CSSProperties = {
  padding: '12px 16px',
  border: '1.5px solid #e5e7eb',
  borderRadius: '10px',
  fontSize: '15px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
  letterSpacing: '0.1em',
};
