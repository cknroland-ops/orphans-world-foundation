import React from "react";
import Image from "next/image";

export const AboutView = ({ openModal }: { openModal: () => void }) => {
  return (
    <div className="page active">
      <div className="inner-hero">
        <div className="inner-hero-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542810634-71277d95dc8c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}></div>
        <div className="inner-hero-geo">
          <span></span><span></span><span></span>
        </div>
        <div className="inner-hero-content">
          <div className="inner-hero-pill">À propos de nous</div>
          <h1 className="inner-hero-title">Conduite Par<br />Objectif Et Impact</h1>
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
          <div className="reveal" style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "21/8", background: "linear-gradient(135deg,var(--navy-primary),var(--navy-mid))", position: "relative" }}>
            <Image src="/component_pictures/a_propos/image1.png" fill alt="Terrain" style={{ objectFit: "cover" }} referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      <section className="bg-mesh-light" style={{ padding: "100px 0", position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.03, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="about-grid reveal">
            <div className="about-text">
              <div className="eyebrow eyebrow-crimson">Notre mission</div>
              <h2 className="section-title-light">Ensemble pour<br />l&apos;espoir durable<br />et l&apos;humanité</h2>
              <div className="divider"></div>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8, marginBottom: 16 }}>Nous nous engageons à provoquer des changements à long terme dans les communautés vulnérables, en plaçant toujours l&apos;enfant au cœur de nos priorités.</p>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8 }}>Fondée le <strong style={{ color: "var(--navy-primary)" }}>15 décembre 2023</strong> à Bukavu, Sud-Kivu, par <strong style={{ color: "var(--navy-primary)" }}>BYAMUNGU Cinyunyi David</strong>, OWF est apolitique et non confessionnelle.</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", width: "100%", position: "relative", background: "linear-gradient(135deg,var(--navy-primary),var(--navy-mid))" }}>
                 <Image src="/component_pictures/a_propos/image2.png" fill alt="Mission" style={{ objectFit: "cover" }} referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
          <div className="about-grid reveal" style={{ marginTop: 80 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", width: "100%", position: "relative", background: "linear-gradient(135deg,var(--navy-mid),var(--navy-primary))" }}>
               <Image src="/component_pictures/a_propos/image3.png" fill alt="Vision" style={{ objectFit: "cover" }} referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="eyebrow eyebrow-gold">Notre vision</div>
              <h2 className="section-title-light">Opportunités et Égalité pour Tous</h2>
              <div className="divider"></div>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.8 }}>Un monde où chaque enfant a la possibilité de vivre un avenir meilleur. Notre vision est d&apos;évoluer vers le statut d&apos;ONG pour élargir notre impact au-delà des frontières de la RDC.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="team-section" className="bg-mesh-light" style={{ padding: "100px 0", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, background: "var(--crimson)", opacity: 0.05, filter: "blur(100px)", borderRadius: "50%", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 600, height: 600, background: "var(--navy-primary)", opacity: 0.04, filter: "blur(120px)", borderRadius: "50%", pointerEvents: "none" }}></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 56 }} className="reveal">
            <div>
              <div className="eyebrow eyebrow-crimson"><span className="eyebrow-dot"></span>Notre équipe</div>
              <h2 className="section-title-light">Notre héritage<br />en mouvement</h2>
            </div>
            <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 300 }}>Un impact croissant guidé par la compassion et l&apos;engagement.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '64px' }}>
            {[
              { n: "BYAMUNGU Cinyunyi David", r: "Fondateur & Président du CA", init: "BCD", f: true, bio: "Juriste et lauréat d'une bourse en 'Humanitarian Community Service' en Australie, il voue sa carrière à la défense inébranlable des droits humains et à la protection de l'enfance.", img: "david.jpeg" },
              { n: "Georges Cinyunyi", r: "Co-fondateur", init: "GC", bio: "Acteur humanitaire d'expérience avec plus de 20 ans passés au sein de la FAO (Nations Unies). Il transforme aujourd'hui ce riche parcours en un héritage puissant pour la fondation.", img: "georges.jpeg" }
            ].map((m, i) => (
              <div className="team-card-v2 team-card-founder reveal" key={i} style={{ width: '100%', margin: '0' }}>
                <div className="team-avatar" style={{ background: "linear-gradient(135deg, var(--navy-deep), var(--navy-mid))", color: "#fff", position: "relative" }}>
                  <Image src={`/component_pictures/a_propos/membres_de_l_organisation/${m.img}`} fill alt={m.n} style={{ objectFit: 'cover' }} />
                </div>
                <div className="team-info">
                  <div className="team-name" style={{ color: "#000", fontWeight: 700, fontSize: 18, fontFamily: "var(--font-cormorant)" }}>{m.n}</div>
                  <div className="team-role" style={{ color: "var(--gold)", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 4 }}>{m.r}</div>
                  <p className="team-bio" style={{ fontSize: 14 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="team-marquee-wrapper" style={{ marginTop: 20 }}>
          <div className="team-marquee">
            {[
              { n: "Evelyne Kitumaini", r: "Défenseure des Droits Humains", init: "EK", bio: "Forte d'une expérience au sein de Family First en Ouganda, elle place l'épanouissement de l'enfant au cœur de toutes les initiatives de développement.", img: "evelyne.jpeg" },
              { n: "Nelly Walubambo", r: "Coordinatrice Régionale & Genre", init: "NW", bio: "Juriste et activiste engagée, elle préside la commission du genre et milite ardemment pour l'égalité et la stricte application des droits de l'enfant.", img: "nelly.jpeg" },
              { n: "Mugoli Musese Caroline", r: "Présidente Commission Santé", init: "MC", bio: "Détentrice d'une licence en santé publique (UOB), elle déploie avec compassion son expertise pour garantir le bien-être sanitaire des enfants vulnérables.", img: "caroline.jpeg" },
              { n: "Salama Bagalwa Mireille", r: "Présidente Agri-business", init: "SM", bio: "Licenciée en agro-industrie (UEA), elle allie transformation agro-alimentaire et sécurité nutritionnelle pour soutenir la santé infantile.", img: "mireille.jpeg" },
              { n: "Josué Ntaboba Cubaka", r: "Administration", init: "JN", bio: "Titulaire d'un Master en Droit de l'UOB, il agit avec détermination pour doter l'organisation d'un cadre administratif rigoureux au service de l'action humanitaire.", img: "josue.jpeg" },
              { n: "Murhula Maroy Pontien", r: "Activiste Humanitaire", init: "MP", bio: "Détenteur d'un Master en Droit (UOB), il participe activement et avec abnégation aux initiatives visant à secourir et protéger les plus vulnérables.", img: "pontien.jpeg" },
              { n: "Daniella Marhegane", r: "Membre du Conseil d'Administration", init: "DM", bio: "Originaire de Bukavu, elle se distingue par sa capacité d'écoute et son efficacité redoutable dans le déploiement opérationnel des activités de terrain.", img: "daniella.jpeg" },
              { n: "Adolphe Bahige", r: "Expert IT & Humanitaire", init: "AB", bio: "Licencié en informatique de l'Université Espoir d'Afrique. Il met la puissance du numérique au profit de l'encadrement stratégique de nos actions.", img: "adolphe.jpeg" },
              { n: "Kangewenye Nzigire Byeby", r: "Administration", init: "KN", bio: "Passionnée et organisée, elle s'investit avec humanisme et rigueur dans la gestion quotidienne de nos missions.", img: "byeby.jpeg" },
              { n: "Evelyne Kitumaini", r: "Défenseure des Droits Humains", init: "EK", bio: "Forte d'une expérience au sein de Family First en Ouganda, elle place l'épanouissement de l'enfant au cœur de toutes les initiatives de développement.", img: "evelyne.jpeg" },
              { n: "Nelly Walubambo", r: "Coordinatrice Régionale & Genre", init: "NW", bio: "Juriste et activiste engagée, elle préside la commission du genre et milite ardemment pour l'égalité et la stricte application des droits de l'enfant.", img: "nelly.jpeg" },
              { n: "Mugoli Musese Caroline", r: "Présidente Commission Santé", init: "MC", bio: "Détentrice d'une licence en santé publique (UOB), elle déploie avec compassion son expertise pour garantir le bien-être sanitaire des enfants vulnérables.", img: "caroline.jpeg" },
              { n: "Salama Bagalwa Mireille", r: "Présidente Agri-business", init: "SM", bio: "Licenciée en agro-industrie (UEA), elle allie transformation agro-alimentaire et sécurité nutritionnelle pour soutenir la santé infantile.", img: "mireille.jpeg" },
              { n: "Josué Ntaboba Cubaka", r: "Administration", init: "JN", bio: "Titulaire d'un Master en Droit de l'UOB, il agit avec détermination pour doter l'organisation d'un cadre administratif rigoureux au service de l'action humanitaire.", img: "josue.jpeg" },
              { n: "Murhula Maroy Pontien", r: "Activiste Humanitaire", init: "MP", bio: "Détenteur d'un Master en Droit (UOB), il participe activement et avec abnégation aux initiatives visant à secourir et protéger les plus vulnérables.", img: "pontien.jpeg" },
              { n: "Daniella Marhegane", r: "Membre du Conseil d'Administration", init: "DM", bio: "Originaire de Bukavu, elle se distingue par sa capacité d'écoute et son efficacité redoutable dans le déploiement opérationnel des activités de terrain.", img: "daniella.jpeg" },
              { n: "Adolphe Bahige", r: "Expert IT & Humanitaire", init: "AB", bio: "Licencié en informatique de l'Université Espoir d'Afrique. Il met la puissance du numérique au profit de l'encadrement stratégique de nos actions.", img: "adolphe.jpeg" },
              { n: "Kangewenye Nzigire Byeby", r: "Administration", init: "KN", bio: "Passionnée et organisée, elle s'investit avec humanisme et rigueur dans la gestion quotidienne de nos missions.", img: "byeby.jpeg" }
            ].map((m, i) => (
              <div className="team-card-v2" key={i}>
                <div className="team-avatar" style={{ background: "var(--navy-primary)", color: "rgba(255,255,255,0.8)", position: "relative" }}>
                  <Image src={`/component_pictures/a_propos/membres_de_l_organisation/${m.img}`} fill alt={m.n} style={{ objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div className="team-info">
                  <div className="team-name" style={{ color: "#000", fontWeight: 700, fontSize: 16, fontFamily: "var(--font-cormorant)" }}>{m.n}</div>
                  <div className="team-role" style={{ color: "var(--crimson)", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 4 }}>{m.r}</div>
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
            <h2 className="section-title-dark" style={{ marginBottom: 20 }}>Rejoignez-nous dans ce parcours pour autonomiser les communautés.</h2>
            <button className="btn-primary" onClick={openModal} style={{ fontSize: 15, padding: "16px 36px" }}>Faites un don maintenant →</button>
          </div>
        </div>
      </section>
    </div>
  );
};
