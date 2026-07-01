import React from "react";

export const DonateView = () => {

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
    <div className="page active">
      <div className="inner-hero">
        <div className="inner-hero-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542810634-71277d95dc8c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}></div>
        <div className="inner-hero-geo">
          <span></span><span></span><span></span>
        </div>
        <div className="inner-hero-content">
          <div className="inner-hero-pill">Faire un don</div>
          <h1 className="inner-hero-title">Donnez. Impact.<br />Transformer<br />Des Vies.</h1>
          <p className="inner-hero-sub">Votre don soutient l&apos;éducation, la santé et l&apos;aide aux situations de crise qui transforment des vies.</p>
        </div>
      </div>

      <section style={{ background: "var(--off-white)", padding: "100px 0" }}>
        <div className="container">
          <div className="about-grid" style={{ alignItems: "start" }}>
            <div className="reveal">
              <h2 className="section-title-light" style={{ marginBottom: 36 }}>Faites un don en<br />4 étapes simples</h2>
              <div>
                <div className="step-item"><div className="step-icon">👤</div><div><div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Entrer les détails</div><div style={{ fontSize: 14, color: "#6B7280" }}>Veuillez remplir vos informations essentielles de base.</div></div><div className="step-n">1</div></div>
                <div className="step-item"><div className="step-icon">🎯</div><div><div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Sélectionnez la cause</div><div style={{ fontSize: 14, color: "#6B7280" }}>Choisissez la cause ou le programme à soutenir.</div></div><div className="step-n">2</div></div>
                <div className="step-item"><div className="step-icon">💳</div><div><div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Saisissez le montant</div><div style={{ fontSize: 14, color: "#6B7280" }}>Choisissez combien vous souhaitez contribuer.</div></div><div className="step-n">3</div></div>
                <div className="step-item"><div className="step-icon">✅</div><div><div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Recevoir confirmation</div><div style={{ fontSize: 14, color: "#6B7280" }}>Recevez des reçus instantanés et des mises à jour.</div></div><div className="step-n">4</div></div>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="contact-form-card">
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}>Informations sur les dons</div>
                <div className="cf-grid">
                  <div className="cf-group"><label className="cf-label">Prénom*</label><input className="cf-input" type="text" placeholder="Jean" /></div>
                  <div className="cf-group"><label className="cf-label">Email*</label><input className="cf-input" type="email" placeholder="jean@exemple.com" /></div>
                  <div className="cf-group"><label className="cf-label">Téléphone</label><input className="cf-input" type="tel" placeholder="+243..." /></div>
                  <div className="cf-group"><label className="cf-label">Montant ($)*</label><input className="cf-input" type="number" placeholder="Votre montant" /></div>
                  <div className="cf-group cf-full"><label className="cf-label">Sélectionnez une cause*</label>
                    <select className="cf-select" defaultValue="">
                      <option value="" disabled>-- Choisir --</option>
                      <option>Éducation — Upendo Feast</option>
                      <option>Santé — Orphans Health</option>
                      <option>Orphans Justice</option>
                      <option>Orphans Gender</option>
                      <option>Agri-Business</option>
                      <option>Générale</option>
                    </select>
                  </div>
                  <div className="cf-group cf-full"><label className="cf-label">Votre message</label><textarea className="cf-textarea" placeholder="Message..." style={{ minHeight: 80 }}></textarea></div>
                </div>
                <button className="cf-submit" onClick={(e) => { e.preventDefault(); alert("Cette fonctionnalité n'est pas encore connectée à la base de données. Veuillez utiliser le bouton 'Faire un don' dans la barre de navigation."); }}>Soumettre &amp; Choisir le paiement</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--white)", padding: "100px 0" }}>
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow-crimson"><span className="eyebrow-dot"></span>FAQ</div>
              <h2 className="section-title-light">Ce que vous pensez,<br />nous y avons répondu.</h2>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, marginTop: 16 }}>Questions fréquentes sur les dons et le bénévolat.</p>
            </div>
            <div className="faq-list">
              {[
                { q: "Quelle est la mission de votre ONG ?", a: "Orphans World Foundation assure la promotion et la protection des droits des enfants en situation difficile en RDC et dans le monde, à travers l'éducation, la santé, le plaidoyer et l'action sociale." },
                { q: "Comment les dons sont-ils utilisés ?", a: "100% de vos dons sont investis directement dans nos programmes : kits scolaires, kits hygiéniques, séances d'écoute, coaching éducatif et accès aux soins de santé." },
                { q: "Puis-je faire du bénévolat ?", a: "Absolument ! Contactez-nous par email ou WhatsApp (+243 979 067 087) pour rejoindre notre équipe de bénévoles engagés." },
                { q: "À part le don, comment puis-je aider ?", a: "Vous pouvez parrainer un enfant, partager nos actions sur les réseaux, rejoindre une commission ou devenir partenaire institutionnel." },
                { q: "Puis-je parrainer un enfant ?", a: "Oui, nous offrons des programmes de parrainage. Contactez-nous pour connaître les modalités et choisir le programme adapté à votre engagement." }
              ].map((f, i) => (
                <div className="faq-item" key={i}>
                  <button className="faq-q" onClick={toggleFaq}>{f.q} <span className="faq-icon">+</span></button>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
