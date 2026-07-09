import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HeroParticles } from "./HeroParticles";
import { blogs } from "../lib/blogs";
import { supabase } from "../lib/supabase";

type Temoignage = {
  nom: string;
  role: string;
  contenu: string;
  photo_url: string;
};

const TEMOIGNAGE_DEFAULT: Temoignage = {
  nom: 'Mugoli Musese Caroline',
  role: 'Présidente commission santé',
  contenu: 'L\'engagement de la fondation envers les jeunes vulnérables est tout simplement incroyable. Nous avons vu des enfants retrouver le sourire et des familles se reconstruire avec dignité.',
  photo_url: '/component_pictures/a_propos/membres_de_l_organisation/caroline.jpeg',

};

export const HomeView = ({ goTo, openModal }: { goTo: (p: string) => void; openModal: () => void }) => {
  const [scrollY, setScrollY] = useState(0);
  const [temoignage, setTemoignage] = useState<Temoignage>(TEMOIGNAGE_DEFAULT);

  useEffect(() => {
    const fetchTemoignage = async () => {
      try {
        const { data } = await supabase
          .from('temoignages')
          .select('nom, role, contenu, photo_url')
          .eq('publie', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        if (data) setTemoignage(data as Temoignage);
      } catch {
        // Fallback : on garde TEMOIGNAGE_DEFAULT déjà en place
      }
    };
    fetchTemoignage();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    const item = target.parentElement;
    if (item) {
      if (item.classList.contains("open")) {
        item.classList.remove("open");
      } else {
        const others = item.parentElement?.querySelectorAll(".faq-item.open");
        others?.forEach((i) => i.classList.remove("open"));
        item.classList.add("open");
      }
    }
  };

  return (
    <div className="page active" id="page-home">
      <section className="hero">
        <div
          className="hero-bg"
          style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.05)` }}
        >
          <Image src="/component_pictures/page_d_acceuil/herosection.png" alt="Enfants souriants soutenus par Orphans World Foundation" fill priority style={{ objectFit: 'cover', objectPosition: 'center' }} />
        </div>
        <HeroParticles />
        <div className="hero-inner" style={{ gridTemplateColumns: '1fr' }}>
          <div className="hero-text">
            <div className="hero-badge2">
              <span className="hero-badge2-dot"></span>
              Organisation Humanitaire · Sud-Kivu, RDC · 2023
            </div>
            <h1 className="hero-headline hero-headline-fadein" style={{ color: '#CDD5DB', maxWidth: '520px' }}>
              Le monde voit<br />leur <span className="word-orphelins">vulnérabilité</span>.<br />
              Nous voyons<br />leur <span className="word-avenir">potentiel</span>.
            </h1>
            <div className="hero-btns" style={{ justifyContent: "flex-start" }}>
              <button className="btn-primary" onClick={openModal}>❤ Faire un don</button>
              <button className="btn-outline" onClick={() => goTo("about")}>Découvrez-nous →</button>
            </div>
          </div>
        </div>
        <div className="hero-scroll" style={{ opacity: scrollY > 80 ? 0 : 1 }}>
          <div className="hero-scroll-line"></div>
          <span>Défiler</span>
        </div>
      </section>

      <section className="bg-mesh-light section-pad" style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56, flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow eyebrow-crimson reveal"><span className="eyebrow-dot"></span>Notre impact</div>
              <h2 className="section-title-light reveal">Ensemble pour le changement</h2>
            </div>
            <p className="reveal" style={{ maxWidth: 400, color: "var(--text-muted)", fontSize: 15, margin: 0 }}>Nourrir les familles, éduquer les enfants et reconstruire des vies, ce que notre impact montre.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="impact-card reveal" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px', color: '#fff' }}>
              <img src="https://i.ibb.co/n86NHm3t/Tracing-Turkey-s-development-aid-in-Namibia.jpg" alt="Enfants orphelins accompagnés par Orphans World Foundation au Sud-Kivu" style={{ objectFit: 'cover', zIndex: 0, position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div data-target="200" data-suffix="+" style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>0</div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Enfants accompagnés</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Soutien scolaire, nutritionnel et psychosocial.</div>
              </div>
            </div>
            <div className="impact-card reveal reveal-delay-1" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px', color: '#fff' }}>
              <img src="https://i.ibb.co/Zp5X6MPD/Say-cheese.jpg" alt="Parrainage d'enfants vulnérables par les donateurs d'Orphans World Foundation" style={{ objectFit: 'cover', zIndex: 0, position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div data-target="200" data-suffix="+" style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>0</div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Parrainages réalisés</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Les familles restaurent la sécurité et l&apos;espoir.</div>
              </div>
            </div>
            <div className="impact-card reveal reveal-delay-2" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px', color: '#fff' }}>
              <img src="https://i.ibb.co/p68tjBkB/t-l-charger.jpg" alt="Commissions actives d'Orphans World Foundation en RDC" style={{ objectFit: 'cover', zIndex: 0, position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', zIndex: 1 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}><span data-target="6">0</span> & <span data-target="3">0</span></div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Commissions & Années</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>6 commissions actives pendant 3 années d&apos;impact.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 0", borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div className="eyebrow eyebrow-gold reveal" style={{ justifyContent: 'center', marginBottom: 32 }}><span className="eyebrow-dot"></span>Nos soutiens de confiance</div>
          <div style={{ overflow: 'hidden', position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', width: 'max-content', animation: 'scroll-horizontal 20s linear infinite', gap: '48px', alignItems: 'center' }}>
              {[
                { name: "Zed's Académie", img: "/component_pictures/partenaires/zeds.jpeg" },
                { name: "MD Foundation", img: "/component_pictures/partenaires/mdf.jpeg" },
                { name: "JENGA TUMAINI ASBL", img: "/component_pictures/partenaires/jenga.jpeg" },
                { name: "Zed's Académie", img: "/component_pictures/partenaires/zeds.jpeg" },
                { name: "MD Foundation", img: "/component_pictures/partenaires/mdf.jpeg" },
                { name: "JENGA TUMAINI ASBL", img: "/component_pictures/partenaires/jenga.jpeg" },
              ].map((p, i) => (
                <div key={i} style={{ flex: '0 0 auto', transition: 'all 0.3s ease' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '90px', height: '90px', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                      <Image src={p.img} fill alt={p.name} style={{ objectFit: 'contain', padding: '6px' }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: '#444', textAlign: 'center', maxWidth: '100px', lineHeight: 1.3 }}>{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <style>{`
              @keyframes scroll-horizontal {
                0% { transform: translateX(0); }
                100% { transform: translateX(calc(-50% - 24px)); }
              }
              .impact-card:hover { transform: translateY(-5px); transition: all 0.3s ease; }
            `}</style>
          </div>
        </div>
      </section>

      <section className="bg-mesh-dark section-pad" style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="about-3col" style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', position: 'relative', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', flexShrink: 0 }}>
                <Image src="/component_pictures/page_d_acceuil/logo.jpeg" fill alt="Logo d'Orphans World Foundation – Organisation humanitaire pour les enfants orphelins" style={{ objectFit: 'cover' }} />
              </div>
            </div>
            <div className="about-text about-text-dark">
              <div className="eyebrow eyebrow-gold reveal">Qui sommes-nous ?</div>
              <h2 className="section-title-light reveal reveal-delay-1">Une initiative née<br />de l&apos;Est de la RDC</h2>
              <div className="divider reveal reveal-delay-2"></div>
              <div className="reveal reveal-delay-2">
                <p>Fondée le <strong>15 décembre 2023</strong> à Bukavu par <strong>BYAMUNGU Cinyunyi David</strong>, Orphans World Foundation est une organisation apolitique et non confessionnelle pour la défense des droits de l&apos;enfant.</p>
                <p>Animée par une vision d&apos;impact durable, Aujourd&apos;hui Orphans World Foundation réunit une équipe multidisciplinaire de professionnels engagés à protéger les droits des enfants, à restaurer leur dignité et à créer les conditions d&apos;un avenir où chaque enfant peut pleinement réaliser son potentiel.</p>
              </div>
              <div className="values-row reveal reveal-delay-3">
                <span className="value-tag">Impartialité</span><span className="value-tag">Neutralité</span>
                <span className="value-tag">Droits de l&apos;enfant</span><span className="value-tag">Non confessionnel</span>
              </div>
              <div style={{ marginTop: 28, display: "flex", gap: "16px", flexWrap: "wrap" }} className="reveal reveal-delay-3">
                <button className="btn-outline" style={{ color: '#000', background: 'rgba(255,255,255,0.92)', borderColor: 'rgba(0,0,0,0.15)' }} onClick={() => goTo("about")}>En savoir plus →</button>
                <button className="btn-primary" onClick={() => { goTo("about"); setTimeout(() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Voir les membres de l&apos;équipe</button>
              </div>
            </div>
            <div className="about-visual reveal">
              <div style={{ position: 'relative', width: '100%', minHeight: '450px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <Image src="/component_pictures/a_propos/membres_de_l_organisation/david.jpeg" fill alt="BYAMUNGU Cinyunyi David" style={{ objectFit: 'cover', objectPosition: 'top' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(255,255,255,0.95)', padding: '12px 24px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
                  <strong style={{ display: 'block', color: 'var(--navy-primary)' }}>BYAMUNGU Cinyunyi David</strong>
                  <div style={{ fontSize: 14, color: 'var(--crimson)', fontWeight: '600' }}>Fondateur</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mesh-light" style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56 }}>
            <div>
              <div className="eyebrow eyebrow-crimson reveal"><span className="eyebrow-dot"></span>Causes</div>
              <h2 className="section-title-light reveal">Causes qui inspirent</h2>
            </div>
            <button className="btn-outline reveal" onClick={() => goTo("causes")} style={{ flexShrink: 0, color: "var(--navy-primary)", borderColor: "rgba(15,24,36,0.2)" }}>Voir toutes →</button>
          </div>
          <div className="causes-grid">
            {[
              { t: "Notre Vision", p: "Construire un monde où chaque enfant et chaque personne vulnérable vivent dans la dignité, jouissent pleinement de leurs droits et contribuent au développement durable de leur communauté.", img: "/component_pictures/a_propos/image3.png" },
              { t: "Notre Mission", p: "Assurer la promotion et la protection des droits des enfants, avec une attention particulière aux enfants en situation difficile partout dans le monde.", img: "/component_pictures/a_propos/image2.png" },
              { t: "Nos Valeurs", p: "Impartialité, neutralité, respect des droits de l'enfant et absence d'appartenance politique ou religieuse.", img: "https://i.ibb.co/fYHvFv9N/Whats-App-Image-2026-06-25-at-1-59-28-PM.jpg" }
             ].map((c,i) => (
              <div className="cause-card reveal" key={i}>
                <div className="cause-img" style={{ position: 'relative', overflow: 'hidden' }}>
                  {c.img.startsWith('/') ? (
                    <Image src={c.img} alt={c.t} fill style={{objectFit: 'cover'}} referrerPolicy="no-referrer" />
                  ) : (
                    <img src={c.img} alt={c.t} style={{ objectFit: 'cover', position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                  )}
                </div>
                <div className="cause-body">
                  <div className="cause-title">{c.t}</div>
                  <div className="cause-text">{c.p}</div>
                  <a className="cause-link" onClick={() => goTo("causes")}>En savoir plus</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mesh-light" style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56 }}>
            <div>
              <div className="eyebrow eyebrow-gold reveal"><span className="eyebrow-dot"></span>Programmes</div>
              <h2 className="section-title-light reveal">Déclenchez un<br />changement positif</h2>
            </div>
            <button className="btn-outline reveal" onClick={() => goTo("programmes")} style={{ flexShrink: 0, color: "var(--navy-primary)", borderColor: "rgba(15,24,36,0.2)" }}>Voir tous →</button>
          </div>
          {[
            { tag: "Santé pour tous", color: "crimson", title: "Orphans Health", desc: "Santé et bien-être des enfants accompagnés, prévention des troubles mentaux et accès aux soins essentiels.", img: "/component_pictures/programmes/sante.jpg", slug: "orphans-health" },
            { tag: "Égalité & Genre", color: "gold", title: "Orphans Gender", desc: "Égalité de genre, protection des droits des filles et garçons, lutte contre les discriminations.", img: "/component_pictures/programmes/egalite.jpeg", slug: "orphans-gender" },
            { tag: "Communication", color: "crimson", title: "Orphans Magazine", desc: "Communication, sensibilisation et rayonnement de la cause humanitaire à travers les médias.", img: "/component_pictures/programmes/comm.jpeg", slug: "orphans-magazine" }
          ].map((p, i) => (
            <div className="prog-card-h reveal" key={i}>
              <div className="prog-card-h-img">
                <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
              </div>
              <div className="prog-card-h-body">
                <span className={`prog-tag-h prog-tag-${p.color}`}>{p.tag}</span>
                <div className="prog-card-h-title">{p.title}</div>
                <div className="prog-card-h-desc">{p.desc}</div>
                <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13, borderRadius: 100 }} onClick={() => goTo(`programme-${p.slug}`)}>En savoir plus →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mesh-dark" style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56, flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow eyebrow-crimson reveal"><span className="eyebrow-dot"></span>Comment aider</div>
              <h2 className="section-title-dark reveal">Unis, Nous Transformons</h2>
            </div>
            <p className="reveal" style={{ maxWidth: 400, color: "var(--text-muted)", fontSize: 15, margin: 0 }}>Devenez un acteur du changement en soutenant nos initiatives de terrain.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { title: "Faire un don", desc: "Vos dons financiers permettent de propulser nos programmes.", img: "https://i.ibb.co/78V9Qh2/t-l-charger-1.jpg" },
              { title: "Partager des ressources", desc: "Des soutiens en nature accélèrent notre logistique.", img: "https://i.ibb.co/ymYSt0TK/Chat-GPT-Image-30-juin-2026-14-27-28.png" },
              { title: "Agir dans l'urgence", desc: "Rejoignez-nous lors de crises pour des aides rapides.", img: "https://i.ibb.co/xS978RVy/Why-Today-Was-Spectacular-in-an-Ordinary-Way-Nesting-Place.jpg" },
              { title: "Parrainer un enfant", desc: "Un soutien mensuel pour changer une vie entière.", img: "https://i.ibb.co/D6gFLFc/t-l-charger-2.jpg" }
            ].map((help, i) => (
              <div className="reveal" key={i} style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', minHeight: '350px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
                <img src={help.img} alt={help.title} style={{ objectFit: 'cover', zIndex: 0, position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)', zIndex: 1 }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{help.title}</h3>
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>{help.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="reveal" style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '40px' }}>
            <button className="btn-outline" onClick={() => goTo('causes')} style={{ border: 'none', fontWeight: 600 }}>Rejoignez nos missions ↗</button>
          </div>
        </div>
      </section>

      <section className="bg-mesh-light" style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 56, flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow eyebrow-gold reveal"><span className="eyebrow-dot"></span>Blog</div>
              <h2 className="section-title-light reveal">Nos Dernières Histoires</h2>
            </div>
            <button className="btn-outline reveal" onClick={() => goTo("blog")} style={{ flexShrink: 0, color: '#000' }}>Lire tout le blog →</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[...blogs].reverse().slice(0, 3).map((blog, i) => (
              <div className="reveal" key={i} style={{ borderRadius: '20px', overflow: 'hidden', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                <div style={{ position: 'relative', height: '220px' }}>
                  <Image src={blog.img} fill alt={blog.title} style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '13px', color: 'var(--gold)', fontWeight: 600, marginBottom: '8px' }}>{blog.date}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 16px 0', color: 'var(--navy-primary)' }}>{blog.title}</h3>
                  <a onClick={() => goTo("blog")} style={{ color: 'var(--crimson)', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>Lire l&apos;article →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mesh-dark" style={{ padding: "100px 0" }}>
        <div className="container">
           <div className="eyebrow eyebrow-crimson reveal"><span className="eyebrow-dot"></span>Témoignages</div>
           <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginTop: '32px' }}>
              <div className="reveal">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0, border: '3px solid rgba(255,255,255,0.3)' }}>
                    <Image src={temoignage.photo_url} fill alt={temoignage.nom} style={{ objectFit: 'cover', objectPosition: 'top' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#fff' }}>{temoignage.nom}</div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{temoignage.role}</div>
                  </div>
                </div>
                <h2 className="section-title-dark" style={{ marginBottom: '24px', color: '#fff' }}>Des histoires qui redonnent espoir</h2>
                <p style={{ fontSize: '20px', fontStyle: 'italic', lineHeight: 1.6, color: '#fff', marginBottom: '0' }}>
                  &quot;{temoignage.contenu}&quot;
                </p>
              </div>
              <div className="reveal testi-img" style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '400px' }}>
                <img src="https://i.ibb.co/dCKkRRJ/Whats-App-Image-2026-06-25-at-1-59-27-PM.jpg" alt="Enfants soutenus par Orphans World Foundation lors d'une activité humanitaire sur le terrain" style={{ objectFit: 'cover', position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              </div>
           </div>
        </div>
      </section>

      <section style={{ background: "var(--navy-deep)", padding: "100px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 640 }}>
          <div className="reveal">
            <div className="eyebrow eyebrow-gold" style={{ justifyContent: "center", marginBottom: 20 }}><span className="eyebrow-dot"></span>Être la raison</div>
            <h2 className="section-title-dark" style={{ marginBottom: 20 }}>Être la raison pour laquelle<br />quelqu&apos;un <span style={{ color: "var(--gold)" }}>sourit</span>.</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>Rejoignez-nous dans ce parcours pour autonomiser les communautés et changer des vies une à la fois.</p>
            <button className="btn-primary" onClick={openModal} style={{ fontSize: 15, padding: "16px 36px" }}>Faites un don maintenant →</button>
          </div>
        </div>
      </section>

      <section className="bg-mesh-light" style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow-crimson"><span className="eyebrow-dot"></span>FAQ</div>
              <h2 className="section-title-light">Ce que vous pensez,<br />nous y avons répondu.</h2>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, marginTop: 16 }}>Trouvez des réponses utiles aux questions courantes sur le don, le bénévolat et la collecte de fonds.</p>
            </div>
            <div className="faq-list">
              {[
                { q: "Quelle est la mission de votre ONG ?", a: "Orphans World Foundation assure la promotion et la protection des droits des enfants en situation difficile en RDC et dans le monde." },
                { q: "Comment les dons sont-ils utilisés ?", a: "100% de vos dons sont investis directement dans nos programmes : kits scolaires, kits hygiéniques, séances d'écoute, coaching éducatif et accès aux soins de santé." },
                { q: "Puis-je faire du bénévolat ?", a: "Absolument ! Contactez-nous par email ou WhatsApp (+243 979 067 087) pour rejoindre notre équipe de bénévoles engagés." },
                { q: "À part faire un don, comment puis-je aider ?", a: "Vous pouvez devenir partenaire, organiser des collectes ou simplement partager notre mission sur les réseaux sociaux." },
                { q: "Puis-je parrainer un enfant ou une famille ?", a: "Oui, notre programme de parrainage est conçu pour accompagner spécifiquement des enfants sur le long terme. Contactez-nous pour en savoir plus." }
              ].map((f, i) => (
                <div className="faq-item" key={i}>
                  <button className="faq-q" onClick={toggleFaq}>{f.q} <span className="faq-icon">+</span></button>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="reveal faq-images-desktop" style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ borderRadius: '24px', overflow: 'hidden', height: '250px', position: 'relative' }}>
               <img src="https://i.ibb.co/ZRJvymHq/Whats-App-Image-2026-06-25-at-1-59-29-PM.jpg" alt="Action de terrain d'Orphans World Foundation auprès des enfants orphelins" style={{ objectFit: 'cover', position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            </div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', height: '250px', position: 'relative' }}>
               <img src="https://i.ibb.co/d4jTmjCT/Whats-App-Image-2026-06-25-at-1-59-29-PM-2.jpg" alt="Bénévoles et membres d'Orphans World Foundation en mission humanitaire" style={{ objectFit: 'cover', position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            </div>
            <div style={{ borderRadius: '24px', overflow: 'hidden', height: '250px', position: 'relative' }}>
               <img src="https://i.ibb.co/0jqjwzvh/Whats-App-Image-2026-06-25-at-1-59-29-PM-3.jpg" alt="Enfants soutenus par Orphans World Foundation lors d'une activité éducative" style={{ objectFit: 'cover', position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
