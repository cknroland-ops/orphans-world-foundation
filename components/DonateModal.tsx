import React, { useState } from "react";

export const DonateModal = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) => {
  const [activeTab, setActiveTab] = useState("unique");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if ((e.target as any).classList.contains("modal-overlay")) closeModal(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={closeModal}>✕</button>
        <div className="eyebrow eyebrow-crimson" style={{ marginBottom: 12 }}>
          <span className="eyebrow-dot" style={{ background: "var(--crimson)" }}></span>
          Faire un don
        </div>
        <div className="modal-title-h">Financez un destin</div>
        <div className="modal-sub2">Choisissez votre mode de contribution et aidez-nous à protéger l&apos;avenir des enfants du Sud-Kivu.</div>
        
        <div className="modal-toggle">
          <button className={`modal-tab ${activeTab === 'unique' ? 'active' : ''}`} onClick={() => setActiveTab('unique')}>Don unique</button>
          <button className={`modal-tab ${activeTab === 'mensuel' ? 'active' : ''}`} onClick={() => setActiveTab('mensuel')}>Don mensuel</button>
        </div>

        <div className="modal-tab-content active">
          {activeTab === 'unique' ? (
            <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 16, lineHeight: 1.7 }}>
              Faites un geste ponctuel — chaque don, aussi petit soit-il, offre espoir et dignité à un enfant.
            </p>
          ) : (
            <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 16, lineHeight: 1.7 }}>
              Devenez parrain mensuel et assurez un soutien régulier et durable à un enfant dans le besoin.
            </p>
          )}
        </div>

        <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", letterSpacing: 1, marginBottom: 12 }}>MÉTHODE DE PAIEMENT</div>
        <div className="modal-pay-row" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          <a href="https://selar.com/showlove/orphansworldf" target="_blank" rel="noreferrer" className="modal-pay-btn">
            <span style={{ fontWeight: "bold", fontSize: 18, color: "#E8941A" }}>selar.co</span>
            <span className="modal-pay-sub">Carte · Mobile Money</span>
          </a>
        </div>
        <div className="modal-note2">🔒 Paiement sécurisé · 100% des dons vont aux enfants</div>
      </div>
    </div>
  );
};
