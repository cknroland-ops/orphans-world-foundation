import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createBrowserClient } from '@supabase/ssr';
import { DEFAULT_TEAM_MEMBERS, TeamMember } from '../lib/team';

export const AboutView = ({ openModal }: { openModal: () => void }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);

  useEffect(() => {
    const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    supabase.from('membres_equipe').select('*').eq('actif', true).order('ordre', { ascending: true }).order('created_at', { ascending: true })
      .then(({ data }) => { if (data?.length) setTeamMembers(data as TeamMember[]); });
  }, []);

  const founder = teamMembers[0] ?? DEFAULT_TEAM_MEMBERS[0];
  return (
    <div className="page active">
      <div className="inner-hero">
        <div className="inner-hero-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542810634-71277d95dc8c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}></div>
        <div className="inner-hero-geo">
          <span></span><span></span><span></span>
        </div>
        <div className="inner-hero-content">
          <div className="inner-hero-pill">À propos de nous</div>
          <h1 className="inner-hero-title uppercase">Conduite Par<br />Objectif Et Impact</h1>
          <p className="inner-hero-sub">Votre soutien alimente nos missions, des communautés et de l&apos;espoir qui change la vie.</p>
        </div>
      </div>

      <section className="bg-mesh-light" style={{ padding: "100px 0", position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.03, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ maxWidth: 760, marginBottom: 56 }}>
            <p style={{ fontSize: 20, fontWeight: 500, lineHeight: 1.7 }}>
              Une organisation à but non lucratif œuvrant pour créer <span style={{ color: "var(--crimson)", fontWeight: 700 }}>un changement durable dans les communautés</span> du Sud-Kivu et au-delà.
            </p>
          </div>
          <div className="about-stats-grid">
            <div className="reveal"><div className="stat-num" data-target="200" data-suffix="+" style={{ color: "var(--navy-primary)", fontSize: "clamp(36px, 5vw, 52px)", marginBottom: 8 }}>0</div><div style={{ fontSize: 13, color: "#6B7280" }}>Impact humain ce mois-ci</div></div>
            <div className="reveal reveal-delay-1"><div className="stat-num" data-target="240" data-suffix="+" style={{ color: "var(--navy-primary)", fontSize: "clamp(36px, 5vw, 52px)", marginBottom: 8 }}>0</div><div style={{ fontSize: 13, color: "#6B7280" }}>Vies sauvées avec succès</div></div>
            <div className="reveal reveal-delay-2"><div className="stat-num" data-target="1200" data-suffix="+" style={{ color: "var(--navy-primary)", fontSize: "clamp(36px, 5vw, 52px)", marginBottom: 8 }}>0</div><div style={{ fontSize: 13, color: "#6B7280" }}>Enfants reçoivent éducation</div></div>
            <div className="reveal reveal-delay-3"><div className="stat-num" data-target="62" data-suffix="+" style={{ color: "var(--navy-primary)", fontSize: "clamp(36px, 5vw, 52px)", marginBottom: 8 }}>0</div><div style={{ fontSize: 13, color: "#6B7280" }}>Vies sauvées ce mois-là</div></div>
          </div>
          <div className="reveal" style={{ borderRadius: 0, overflow: "hidden", aspectRatio: "21/8", background: "linear-gradient(135deg,var(--navy-primary),var(--navy-mid))", position: "relative" }}>
            <Image src="/component_pictures/a_propos/image1.jpeg" fill alt="Terrain" style={{ objectFit: "cover" }} referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      <section className="bg-mesh-light" style={{ padding: "100px 0", position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.03, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="about-grid reveal">
            <div className="about-text">
              <div className="eyebrow eyebrow-crimson">Notre mission</div>
              <h2 className="section-title-light uppercase">Ensemble pour<br />l&apos;espoir durable<br />et l&apos;humanité</h2>
              <div className="divider"></div>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8, marginBottom: 16 }}>Nous nous engageons à provoquer des changements à long terme dans les communautés vulnérables, en plaçant toujours l&apos;enfant au cœur de nos priorités.</p>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8 }}>Fondée le <strong style={{ color: "var(--navy-primary)" }}>15 décembre 2023</strong> à Bukavu, Sud-Kivu, par <strong style={{ color: "var(--navy-primary)" }}>BYAMUNGU Cinyunyi David</strong>, OWF est apolitique et non confessionnelle.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ borderRadius: 0, overflow: "hidden", aspectRatio: "4/3", width: "100%", position: "relative", background: "linear-gradient(135deg,var(--navy-primary),var(--navy-mid))" }}>
                 <Image src="/component_pictures/a_propos/image2.png" fill alt="Mission" style={{ objectFit: "cover" }} referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
          <div className="about-grid reveal" style={{ marginTop: 80 }}>
            <div style={{ borderRadius: 0, overflow: "hidden", aspectRatio: "4/3", width: "100%", position: "relative", background: "linear-gradient(135deg,var(--navy-mid),var(--navy-primary))" }}>
               <Image src="/component_pictures/a_propos/image3.png" fill alt="Vision" style={{ objectFit: "cover" }} referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="eyebrow eyebrow-gold">Notre vision</div>
              <h2 className="section-title-light uppercase">Opportunités et Égalité pour Tous</h2>
              <div className="divider"></div>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8 }}>Construire un monde où chaque enfant et chaque personne vulnérable vivent dans la dignité, jouissent pleinement de leurs droits et contribuent au développement durable de leur communauté.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team-section" className="bg-mesh-light" style={{ padding: "100px 0", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, background: "var(--crimson)", opacity: 0.05, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 600, height: 600, background: "var(--navy-primary)", opacity: 0.04, filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none" }}></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 56 }} className="reveal team-header-row">
            <div>
              <div className="eyebrow eyebrow-crimson"><span className="eyebrow-dot"></span>Notre équipe</div>
              <h2 className="section-title-light uppercase">Notre héritage<br />en mouvement</h2>
            </div>
            <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 300 }}>Un impact croissant guidé par la compassion et l&apos;engagement.</p>
          </div>

          {/* Intro : Fondateur uniquement */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
            <div className="team-card-v2 team-card-founder reveal" style={{ maxWidth: 420, width: '100%', margin: '0' }}>
              <div className="team-avatar" style={{ background: "linear-gradient(135deg, var(--navy-deep), var(--navy-mid))", color: "#fff", position: "relative" }}>
                <Image src={founder.photo_url} fill alt={founder.nom} style={{ objectFit: 'cover' }} />
              </div>
              <div className="team-info">
                <div className="team-name" style={{ color: "#000", fontWeight: 700, fontSize: 18, fontFamily: "var(--font-cormorant)" }}>{founder.nom}</div>
                <div className="team-role" style={{ color: "var(--gold)", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 4 }}>{founder.poste}</div>
                <p className="team-bio" style={{ fontSize: 14 }}>{founder.bio}</p>
              </div>
            </div>
          </div>

          {/* Grille fixe : 4/ligne PC, 1/ligne mobile */}
          <div className="team-grid-fixed reveal">
            {teamMembers.map((m, i) => ({ n: m.nom, r: m.poste, bio: m.bio, img: m.photo_url, gold: i === 0 })).map((m, i) => (
              <div className={`team-card-v2${i === 0 ? ' team-grid-founder-item' : ''}`} key={i}>
                <div className="team-avatar" style={{ background: "var(--navy-primary)", color: "rgba(255,255,255,0.8)", position: "relative" }}>
                  <Image src={m.img} fill alt={m.n} style={{ objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div className="team-info">
                  <div className="team-name" style={{ color: "#000", fontWeight: 700, fontSize: 16, fontFamily: "var(--font-cormorant)" }}>{m.n}</div>
                  <div className="team-role" style={{ color: m.gold ? "var(--gold)" : "var(--crimson)", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 4 }}>{m.r}</div>
                  <p className="team-bio">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--navy-deep)", padding: "100px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="reveal">
            <div className="eyebrow eyebrow-gold" style={{ justifyContent: "center", marginBottom: 20 }}><span className="eyebrow-dot"></span>Rejoignez-nous</div>
            <h2 className="section-title-dark uppercase" style={{ marginBottom: 20 }}>Rejoignez-nous dans ce parcours pour autonomiser les communautés.</h2>
            <button className="btn-primary" onClick={openModal} style={{ fontSize: 15, padding: "16px 36px" }}>Faites un don maintenant →</button>
          </div>
        </div>
      </section>
    </div>
  );
};
