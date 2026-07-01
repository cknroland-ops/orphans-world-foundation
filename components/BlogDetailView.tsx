import React, { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";

export const BlogDetailView = ({ blog, goTo }: { blog: any; goTo: (page: string) => void }) => {
  const [fullContent, setFullContent] = useState<string | null>(null);

  useEffect(() => {
    if (!blog) return;
    const fetchContent = async () => {
      try {
        const identifier = blog.slug || blog.id;
        if (!identifier) return;
        const query = blog.slug
          ? supabase.from('articles').select('contenu').eq('slug', blog.slug).single()
          : supabase.from('articles').select('contenu').eq('id', blog.id).single();
        const { data } = await query;
        if (data?.contenu) setFullContent(data.contenu);
      } catch { /* utilise excerpt en fallback */ }
    };
    fetchContent();
  }, [blog]);

  if (!blog) {
    return null;
  }

  const similarBlogs = [
    { cat: "Éducation", title: "Upendo Feast : Distribution de kits scolaires", date: "20 juin 2024", img: "/component_pictures/blog/20_juin_2024.jpeg" },
    { cat: "Organisation", title: "1ère Assemblée Générale : Bâtir l'avenir ensemble", date: "6 juillet 2024", img: "/component_pictures/blog/6_juillet_2024.png" },
  ];

  return (
    <div className="page active">
      <div className="bg-mesh-dark" style={{ paddingTop: "180px", paddingBottom: "100px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div className="container" style={{ maxWidth: 1000, margin: "0 auto", padding: 0 }}>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 84px)", fontWeight: 700, color: "var(--white)", fontFamily: "var(--font-cormorant)", marginBottom: "24px", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            {blog.title}
          </h1>
          <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-dmsans)", fontWeight: 500 }}>
            {blog.date}
          </div>
        </div>
      </div>

      <section className="bg-mesh-light" style={{ padding: "0 0 100px" }}>
        <div className="container" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="reveal" style={{ position: "relative", width: "100%", height: "560px", borderRadius: "24px", overflow: "hidden", marginBottom: "80px", marginTop: "-120px", boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}>
            <Image src={blog.img} alt={blog.title} fill style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
          </div>

          <div className="reveal article-body" style={{ maxWidth: 800, margin: "0 auto", fontFamily: "var(--font-dmsans)", color: "rgba(0,0,0,0.75)", fontSize: "17px", lineHeight: 1.8 }}>
            <style>{`
              .article-body h2{font-size:26px;font-weight:700;color:#0f1824;margin:32px 0 12px;font-family:var(--font-cormorant)}
              .article-body h3{font-size:20px;font-weight:600;color:#0f1824;margin:24px 0 8px}
              .article-body p{margin-bottom:18px}
              .article-body ul,.article-body ol{padding-left:28px;margin-bottom:18px}
              .article-body li{margin-bottom:6px}
              .article-body blockquote{border-left:4px solid #c0392b;padding:12px 0 12px 20px;color:#6b7280;margin:24px 0;font-style:italic;background:#fef9f9;border-radius:0 12px 12px 0}
              .article-body strong{font-weight:700;color:#0f1824}
              .article-body hr{border:none;border-top:2px solid #f3f4f6;margin:28px 0}
            `}</style>
            {/^<[a-z]/i.test(fullContent || blog.contenu || '') ? (
              <div dangerouslySetInnerHTML={{ __html: fullContent || blog.contenu || '' }} />
            ) : (
              <p style={{ whiteSpace: 'pre-wrap' }}>{fullContent || blog.contenu || blog.excerpt}</p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-mesh-light" style={{ padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
            <div>
              <div className="eyebrow eyebrow-crimson"><span className="eyebrow-dot"></span>Blogs similaires</div>
              <h2 className="section-title-light" style={{ marginBottom: 0 }}>Nouvelles, Voix<br />& Impact</h2>
            </div>
            <p style={{ maxWidth: 300, fontSize: "14px", color: "rgba(0,0,0,0.6)", fontFamily: "var(--font-dmsans)" }}>Explorez les mises à jour, les notes de terrain et les histoires qui illustrent notre mission et notre impact.</p>
          </div>

          <div className="blog-grid">
            {similarBlogs.map((b, i) => (
              <article key={i} className={`blog-card reveal reveal-delay-${(i % 4) + 1}`} style={{ cursor: "pointer" }} onClick={() => goTo("blog")}>
                <div className="blog-card-img">
                  <Image src={b.img} alt={b.title} fill style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
                </div>
                <div className="blog-card-body">
                  <span className="blog-card-cat">{b.cat}</span>
                  <div className="blog-card-title">{b.title}</div>
                  <div className="blog-card-date">{b.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
