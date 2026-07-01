import React, { useState } from "react";

export const Footer = ({ goTo, openModal }: { goTo: (p: string) => void; openModal: () => void }) => {
  const [email, setEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');
  const [nlMsg, setNlMsg] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setNlMsg("Veuillez entrer votre adresse email.");
      setNlStatus('error');
      return;
    }
    setNlStatus('loading');
    setNlMsg("");
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setNlStatus('duplicate');
        setNlMsg("Cet email est déjà inscrit.");
      } else if (!res.ok) {
        setNlStatus('error');
        setNlMsg(data.error || "Une erreur est survenue.");
      } else {
        setNlStatus('success');
        setEmail("");
        setNlMsg("Inscrit avec succès !");
        setTimeout(() => setNlStatus('idle'), 5000);
      }
    } catch {
      setNlStatus('error');
      setNlMsg("Impossible de contacter le serveur.");
    }
  };

  return (
    <footer>
      <div className="footer-v2" style={{ backgroundImage: `url('/component_pictures/footer-bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(5, 12, 22, 0.92)' }}></div>
        <div className="footer-v2-grid" style={{ position: 'relative', zIndex: 1 }}>
          <div>
            <div className="footer-brand-name">Orphans World Foundation</div>
            <div className="footer-brand-desc">Soyez le premier à entendre à quel point vous faites une différence.</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8, letterSpacing: 1 }}>
              BULLETIN D&apos;INFORMATION
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginBottom: 14, lineHeight: 1.6 }}>
              Inscrivez-vous à la newsletter et ne manquez jamais la mise à jour.
            </div>
            <div className="newsletter-row">
              <input 
                className="newsletter-inp" 
                type="email" 
                id="nl-email" 
                placeholder="name@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="newsletter-send"
                onClick={handleSubscribe}
                disabled={nlStatus === 'loading' || nlStatus === 'success'}
                style={{ backgroundColor: nlStatus === 'success' ? "#4ade80" : "var(--gold)", color: nlStatus === 'success' ? "#fff" : "var(--navy-primary)", opacity: nlStatus === 'loading' ? 0.7 : 1 }}
              >
                {nlStatus === 'loading' ? '...' : nlStatus === 'success' ? '✓' : '→'}
              </button>
            </div>
            {nlMsg && (
              <div style={{ fontSize: 12, marginTop: 8, color: nlStatus === 'success' ? '#4ade80' : nlStatus === 'duplicate' ? '#fbbf24' : '#f87171' }}>
                {nlMsg}
              </div>
            )}
          </div>
          <div>
            <div className="footer-col-head">Navigation</div>
            <a className="fnl" onClick={() => goTo("home")}>Accueil</a>
            <a className="fnl" onClick={() => goTo("about")}>À propos</a>
            <a className="fnl" onClick={() => goTo("causes")}>Causes</a>
            <a className="fnl" onClick={openModal}>Faire un don</a>
          </div>
          <div>
            <div className="footer-col-head">Autres liens</div>
            <a className="fnl" onClick={() => goTo("programmes")}>Programmes</a>
            <a className="fnl" onClick={() => goTo("blog")}>Blogs</a>
            <a className="fnl">Politique de confidentialité</a>
            <a className="fnl">Conditions Générales</a>
          </div>
          <div>
            <div className="footer-col-head">Connexion sociale</div>
            <a className="fnl" href="https://www.linkedin.com/in/orphans-foundation-a722093ab" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="fnl" href="https://www.instagram.com/orphans_fondation" target="_blank" rel="noreferrer">Instagram</a>
            <a className="fnl" href="https://x.com/orphansfound" target="_blank" rel="noreferrer">X/twitter</a>
            <a className="fnl" href="https://www.facebook.com/profile.php?id=100071088683251" target="_blank" rel="noreferrer">Facebook</a>
          </div>
          <div>
            <div className="footer-col-head">Contactez-nous</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 2.1 }}>
              <a href="https://wa.me/243979067087" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.4)" }}>+243 979 067 087</a><br />
              <a href="mailto:orphansworld020@gmail.com" style={{ color: "rgba(255,255,255,0.4)" }}>orphansworld020@gmail.com</a><br />
              Ave Gouverneur N°54/A<br />Nyalukemba, Bukavu<br />Sud-Kivu, RDC
            </div>
            <div className="fsoc">
              <a className="fsb" href="https://www.facebook.com/profile.php?id=100071088683251" target="_blank" rel="noreferrer" title="Facebook" style={{ background: '#1877F2', color: '#fff' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
              <a className="fsb" href="https://www.instagram.com/orphans_fondation" target="_blank" rel="noreferrer" title="Instagram" style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color: '#fff' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
              <a className="fsb" href="https://x.com/orphansfound" target="_blank" rel="noreferrer" title="X" style={{ background: '#000', color: '#fff' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a className="fsb" href="https://www.linkedin.com/in/orphans-foundation-a722093ab" target="_blank" rel="noreferrer" title="LinkedIn" style={{ background: '#0A66C2', color: '#fff' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a className="fsb" href="https://whatsapp.com/channel/0029VbBIk0p3LdQPzrYGri0b" target="_blank" rel="noreferrer" title="WhatsApp" style={{ background: '#25D366', color: '#fff' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.01-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
              <a className="fsb" href="http://t.me/IAORF" target="_blank" rel="noreferrer" title="Telegram" style={{ background: '#0088CC', color: '#fff' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
              <a className="fsb" href="https://www.tiktok.com/@orphans.foundatio?_r=1&_t=ZS-94hAzgfpyLK" target="_blank" rel="noreferrer" title="TikTok" style={{ background: '#010101', color: '#fff' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.52.27-5.26 1.83-7.23 1.05-1.32 2.53-2.27 4.17-2.67v4.11c-.55.19-1.07.49-1.51.87-.69.64-1.14 1.51-1.25 2.45-.16 1.34.42 2.71 1.49 3.51.98.71 2.3.93 3.44.62.91-.25 1.68-.84 2.15-1.64.44-.72.64-1.57.62-2.42V.02h-2.1z"/></svg></a>
            </div>
          </div>
        </div>
        <div className="footer-v2-bottom" style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="footer-v2-copy">Tous les droits d&apos;auteur sont réservés © Orphans World Foundation 2023–2026</div>
          <div className="footer-v2-copy">Bukavu · Sud-Kivu · République Démocratique du Congo</div>
        </div>
      </div>
      <div className="ticker-bar">
        <div className="ticker-track">
          {[...Array(18)].map((_, i) => (
            <span key={i} className="ticker-item">
              {["Espoir", "Unité", "Soins", "Impact", "Croissance", "Confiance", "Ensemble", "Enfants", "Avenir"][i % 9]}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};
