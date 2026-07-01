import React from "react";
import Image from "next/image";
import { BookOpen, HeartPulse, Megaphone, Users } from "lucide-react";

export const CausesView = ({ openModal }: { openModal: () => void }) => {
  return (
    <div className="page active">
      <div className="inner-hero">
        <div className="inner-hero-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542810634-71277d95dc8c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}></div>
        <div className="inner-hero-geo">
          <span></span><span></span><span></span>
        </div>
        <div className="inner-hero-content">
          <div className="inner-hero-pill">CAUSES</div>
          <h1 className="inner-hero-title">Chaque Enfant<br />Mérite un Avenir</h1>
          <p className="inner-hero-sub">Ensemble, nous pouvons changer des vies. Votre soutien finance des<br />destins — pas seulement des projets.</p>
        </div>
      </div>
      
      <section className="bg-mesh-light" style={{ padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto", fontSize: "28px", fontWeight: 500, lineHeight: 1.5, color: "var(--navy-primary)", fontFamily: "var(--font-sans)" }}>
            Des millions d&apos;enfants se réveillent chaque matin sans<br />personne pour leur dire que <span style={{ color: "var(--crimson)", fontWeight: 700 }}>leur vie a de la valeur</span>. Vous<br />pouvez changer ça.
          </div>
        </div>
      </section>

      <section className="bg-mesh-light" style={{ padding: "100px 0", position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.03, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto", marginBottom: 64 }}>
            <div className="eyebrow eyebrow-crimson" style={{ letterSpacing: "3px", fontSize: "11px", marginBottom: "20px" }}>VISION & MISSION</div>
            <h2 style={{ fontSize: "48px", color: "var(--navy-primary)", fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>Pourquoi nous existons</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            <div style={{ padding: 40, background: "var(--white)", borderRadius: 16, borderTop: "4px solid var(--gold)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: 64, fontWeight: 300, color: "rgba(10,17,40,0.05)", lineHeight: 1, marginBottom: 16, fontFamily: "var(--font-cormorant)" }}>01</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "var(--gold)", textTransform: "uppercase", marginBottom: 16 }}>NOTRE VISION</div>
              <h3 style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, color: "var(--navy-primary)", fontFamily: "var(--font-cormorant)", minHeight: "60px" }}>Évoluer vers un impact mondial</h3>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7 }}>
                Évoluer vers le statut d&apos;ONG afin d&apos;élargir notre impact humanitaire et étendre nos actions au-delà des frontières pour tous les enfants en situation difficile dans le monde.
              </p>
            </div>
            <div style={{ padding: 40, background: "var(--white)", borderRadius: 16, borderTop: "4px solid var(--crimson)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: 64, fontWeight: 300, color: "rgba(10,17,40,0.05)", lineHeight: 1, marginBottom: 16, fontFamily: "var(--font-cormorant)" }}>02</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "var(--crimson)", textTransform: "uppercase", marginBottom: 16 }}>NOTRE MISSION</div>
              <h3 style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, color: "var(--navy-primary)", fontFamily: "var(--font-cormorant)", minHeight: "60px" }}>Protéger et promouvoir les droits</h3>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7 }}>
                Assurer la promotion et la protection des droits des enfants, avec une attention particulière aux enfants en situation difficile partout dans le monde.
              </p>
            </div>
            <div style={{ padding: 40, background: "var(--white)", borderRadius: 16, borderTop: "4px solid var(--navy-primary)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: 64, fontWeight: 300, color: "rgba(10,17,40,0.05)", lineHeight: 1, marginBottom: 16, fontFamily: "var(--font-cormorant)" }}>03</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "var(--navy-primary)", textTransform: "uppercase", marginBottom: 16 }}>NOS VALEURS</div>
              <h3 style={{ fontSize: 24, fontWeight: 500, marginBottom: 16, color: "var(--navy-primary)", fontFamily: "var(--font-cormorant)", minHeight: "60px" }}>Impartialité & Neutralité</h3>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7 }}>
                Impartialité, neutralité, respect des droits de l&apos;enfant et absence totale d&apos;appartenance politique ou religieuse. L&apos;enfant reste au centre de tout.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mesh-dark" style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto", marginBottom: 64 }}>
            <div className="eyebrow" style={{ color: "var(--gold)", marginBottom: 16, letterSpacing: "3px", fontSize: "11px" }}>DOMAINES D&apos;ACTION</div>
            <h2 style={{ fontSize: 48, color: "#fff", marginBottom: 24, fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>Ce que votre don finance</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.6 }}>
              Chaque contribution, quelle que soit sa taille, s&apos;investit directement dans<br />l&apos;une de ces quatre causes vitales.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24, maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ padding: 32, background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--gold)" }}>
                <BookOpen size={24} />
              </div>
              <div>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-cormorant)" }}>Éducation</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>Kits scolaires, bourses d&apos;études, coaching éducatif. Chaque enfant a le droit d&apos;apprendre et de construire son avenir.</p>
              </div>
            </div>
            
            <div style={{ padding: 32, background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--crimson)" }}>
                <HeartPulse size={24} />
              </div>
              <div>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-cormorant)" }}>Santé</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>Kits hygiéniques, parrainage médical, soutien psychologique. La santé est un droit fondamental, pas un privilège.</p>
              </div>
            </div>

            <div style={{ padding: 32, background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--gold)" }}>
                <Megaphone size={24} />
              </div>
              <div>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-cormorant)" }}>Plaidoyer</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>Défense des droits, lutte contre les discriminations. Nous donnons une voix à ceux que la société veut faire taire.</p>
              </div>
            </div>

            <div style={{ padding: 32, background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--crimson)" }}>
                <Users size={24} />
              </div>
              <div>
                <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-cormorant)" }}>Réinsertion sociale</h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.6 }}>Réinsertion communautaire, solidarité, espaces d&apos;écoute. Nous créons des environnements protecteurs pour chaque enfant.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--crimson)", padding: "100px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: 48, color: "#fff", marginBottom: 24, fontFamily: "var(--font-cormorant)", fontWeight: 400, lineHeight: 1.2 }}>
            Si pas vous, alors qui ?<br />
            Si pas maintenant, alors<br />
            quand ?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, marginBottom: 40, maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Chaque jour sans votre aide est un jour de trop pour un enfant qui attend.<br />Rejoignez-nous dès aujourd&apos;hui.
          </p>
          <button onClick={openModal} style={{ background: "#fff", color: "var(--crimson)", padding: "16px 32px", borderRadius: 100, fontSize: 16, fontWeight: 600, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-sans)" }}>
            ♥ Faire un don maintenant
          </button>
        </div>
      </section>
    </div>
  );
};
