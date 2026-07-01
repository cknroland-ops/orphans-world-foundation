import React, { useState, useEffect } from "react";
import Image from "next/image";
import { blogs as staticBlogs } from "../lib/blogs";

type BlogArticle = {
  id?: string;
  slug?: string;
  cat?: string;
  categorie?: string;
  title?: string;
  titre?: string;
  excerpt?: string;
  extrait?: string;
  date?: string;
  created_at?: string;
  img?: string;
  image_url?: string;
  contenu?: string;
};

const normalise = (a: any): BlogArticle => ({
  ...a,
  cat: a.cat ?? a.categorie ?? '',
  title: a.title ?? a.titre ?? '',
  excerpt: a.excerpt ?? a.extrait ?? '',
  date: a.date ?? (a.created_at ? new Date(a.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''),
  img: a.img ?? a.image_url ?? 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
});

export const BlogView = ({ goTo, setBlog }: { goTo?: (page: string) => void, setBlog?: (blog: any) => void }) => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => {
        const list = Array.isArray(data) ? data : [];
        setArticles(list.length > 0 ? list.map(normalise) : staticBlogs.map(normalise));
      })
      .catch(() => {
        setArticles(staticBlogs.map(normalise));
      })
      .finally(() => setLoaded(true));
  }, []);

  return (
    <div className="page active">
      <div className="inner-hero">
        <div className="inner-hero-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542810634-71277d95dc8c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}></div>
        <div className="inner-hero-geo">
          <span></span><span></span><span></span>
        </div>
        <div className="inner-hero-content">
          <div className="inner-hero-pill">Blog</div>
          <h1 className="inner-hero-title">Dernières nouvelles<br />Histoires Ça<br />Inspire Espoir</h1>
          <p className="inner-hero-sub">Découvrez des mises à jour pertinentes, des moments forts de la communauté et des histoires réelles sur le terrain.</p>
        </div>
      </div>
      <section style={{ background: "var(--off-white)", padding: "100px 0", position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.03, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {!loaded ? (
            <div className="blog-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="blog-card" style={{ opacity: 0.4, pointerEvents: 'none' }}>
                  <div className="blog-card-img" style={{ background: '#e5e7eb' }} />
                  <div className="blog-card-body">
                    <div style={{ height: 14, width: '40%', background: '#e5e7eb', borderRadius: 6, marginBottom: 10 }} />
                    <div style={{ height: 20, width: '90%', background: '#e5e7eb', borderRadius: 6, marginBottom: 8 }} />
                    <div style={{ height: 14, width: '70%', background: '#e5e7eb', borderRadius: 6 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="blog-grid">
              {articles.map((b, i) => (
                <article className={`blog-card reveal reveal-delay-${(i % 4) + 1}`} key={b.id ?? i} style={{ cursor: "pointer", opacity: 1, transform: "none", visibility: "visible" }} onClick={() => { if (setBlog) setBlog(b); if (goTo) goTo("blogDetail"); }}>
                  <div className="blog-card-img">
                    <Image src={b.img!} alt={b.title ?? ''} fill style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-card-cat">{b.cat}</span>
                    <div className="blog-card-title">{b.title}</div>
                    <div className="blog-card-excerpt">{b.excerpt}</div>
                    <div className="blog-card-date">{b.date}</div>
                    <a className="blog-card-link">Lire l&apos;article</a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
