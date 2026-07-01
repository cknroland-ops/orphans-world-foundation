import React, { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

export const ContactView = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName) {
      setErrorMsg("Veuillez remplir les champs obligatoires (Prénom, Email).");
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg("");
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Une erreur est survenue.");
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setErrorMsg("Impossible de contacter le serveur. Veuillez réessayer.");
      setStatus('error');
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
          <div className="inner-hero-pill" style={{ color: "#f0a020" }}>Contact</div>
          <h1 className="inner-hero-title">Portée Dehors.<br />Nous sommes<br />Tiens Toujours.</h1>
          <p className="inner-hero-sub">Vous avez des questions ou besoin de soutien ? Contactez-nous, nous sommes prêts à écouter.</p>
        </div>
      </div>
      <section style={{ backgroundColor: "#EEEEEE", padding: "100px 0" }}>
        <div className="container">
          <div className="contact-grid">
            <div className="reveal">
              <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "4/3", position: "relative", marginBottom: 24, background: "linear-gradient(135deg,var(--navy-primary),var(--navy-mid))" }}>
                <Image src="/component_pictures/contact/image.png" fill alt="Contact" style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
              </div>
              <div className="ci-card" style={{ backgroundColor: "#ffffff" }}><div className="ci-icon" style={{ backgroundColor: "#f0a020", color: "#fff" }}><Mail size={20} /></div><div><div className="ci-label">NOTRE COURRIER</div><div className="ci-val"><a href="mailto:orphansworld020@gmail.com" style={{ color: "#000000", fontFamily: "Arial" }}>orphansworld020@gmail.com</a></div></div></div>
              <div className="ci-card"><div className="ci-icon" style={{ backgroundColor: "#f0a020", color: "#fff" }}><Phone size={20} /></div><div><div className="ci-label">NOTRE CONTACT</div><div className="ci-val"><a href="https://wa.me/243979067087" target="_blank" rel="noreferrer" style={{ color: "#000000", fontFamily: "Arial" }}>+243 979 067 087</a></div></div></div>
              <div className="ci-card"><div className="ci-icon" style={{ backgroundColor: "#f0a020", color: "#fff" }}><MapPin size={20} /></div><div><div className="ci-label">NOTRE ADRESSE</div><div className="ci-val" style={{ color: "#000000", fontFamily: "Arial" }}>Ave Gouverneur N°54/A, Nyalukemba<br />Bukavu · Sud-Kivu · RDC</div></div></div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="contact-form-card" style={{ width: "100%", boxSizing: "border-box" }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, borderColor: "#0d0404", color: "#f0a020", fontFamily: "Arial" }}>Informations de contact</div>
                <form className="cf-grid" onSubmit={handleSubmit}>
                  <div className="cf-group"><label className="cf-label" style={{ color: "#000000", fontFamily: "Arial" }}>Prénom *</label><input className="cf-input" type="text" placeholder="Jean" name="firstName" value={formData.firstName} onChange={handleInputChange} style={{ backgroundColor: "#eeeeee" }} required /></div>
                  <div className="cf-group"><label className="cf-label" style={{ color: "#000000", fontFamily: "Arial" }}>Nom de famille</label><input className="cf-input" type="text" placeholder="Dupont" name="lastName" value={formData.lastName} onChange={handleInputChange} style={{ backgroundColor: "#eeeeee" }} /></div>
                  <div className="cf-group"><label className="cf-label" style={{ color: "#000000", fontFamily: "Arial" }}>Email *</label><input className="cf-input" type="email" placeholder="jean@exemple.com" name="email" value={formData.email} onChange={handleInputChange} style={{ backgroundColor: "#eeeeee" }} required /></div>
                  <div className="cf-group"><label className="cf-label" style={{ color: "#000000", fontFamily: "Arial" }}>Numéro de contact</label><input className="cf-input" type="tel" placeholder="+243..." name="phone" value={formData.phone} onChange={handleInputChange} style={{ backgroundColor: "#eeeeee" }} /></div>
                  <div className="cf-group cf-full"><label className="cf-label" style={{ color: "#000000", fontFamily: "Arial" }}>Notes</label><textarea className="cf-textarea" placeholder="Travaillons ensemble !" name="notes" value={formData.notes} onChange={handleInputChange} style={{ backgroundColor: "#eeeeee" }}></textarea></div>
                  {status === 'success' && (
                    <div className="cf-group cf-full" style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 10, padding: '12px 16px', color: '#166534', fontWeight: 600 }}>
                      ✓ Votre message a bien été envoyé. Nous vous répondrons rapidement !
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="cf-group cf-full" style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 10, padding: '12px 16px', color: '#991b1b', fontWeight: 600 }}>
                      ✗ {errorMsg}
                    </div>
                  )}
                  <div className="cf-group cf-full">
                    <button type="submit" className="cf-submit" disabled={status === 'loading' || status === 'success'} style={{ backgroundColor: status === 'success' ? '#4ade80' : '#f0a020', transition: 'background-color 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: status === 'loading' ? 0.8 : 1 }}>
                      {status === 'loading' && <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                      {status === 'loading' ? 'Envoi en cours...' : status === 'success' ? 'Message envoyé !' : 'Soumettre'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section style={{ backgroundColor: "#d9dee3", padding: "100px 0" }}>
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <div className="eyebrow eyebrow-crimson"><span className="eyebrow-dot"></span>FAQ</div>
              <h2 className="section-title-light">Ce que vous pensez,<br />nous y avons répondu.</h2>
              <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.7, marginTop: 16 }}>Trouvez des réponses utiles aux questions courantes.</p>
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

