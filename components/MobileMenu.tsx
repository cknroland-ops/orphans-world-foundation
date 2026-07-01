import React from "react";

export const MobileMenu = ({ isOpen, closeMenu, goTo, openModal }: { isOpen: boolean; closeMenu: () => void; goTo: (p: string) => void; openModal: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="mob-menu-overlay open">
      <button className="mob-close" onClick={closeMenu}>✕</button>
      <a className="mob-link" onClick={() => goTo("home")}>Accueil</a>
      <a className="mob-link" onClick={() => goTo("about")}>À propos</a>
      <a className="mob-link" onClick={() => goTo("causes")}>Causes</a>
      <a className="mob-link" onClick={() => goTo("programmes")}>Programmes</a>
      <a className="mob-link" onClick={() => goTo("blog")}>Blog</a>
      <a className="mob-link" onClick={() => goTo("contact")}>Contact</a>
      <button className="nav-cta-pill" style={{ marginTop: 28, fontSize: 16 }} onClick={openModal}>
        ❤ Faire un don
      </button>
    </div>
  );
};
