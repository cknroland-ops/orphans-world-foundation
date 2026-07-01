import React, { useEffect, useState } from "react";
import Image from "next/image";

export const Navbar = ({
  currentPage,
  goTo,
  openModal,
  openMobileMenu,
}: {
  currentPage: string;
  goTo: (p: string) => void;
  openModal: () => void;
  openMobileMenu: () => void;
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <div className="navbar-inner">
        <div className="nav-brand" onClick={() => goTo("home")}>
          <Image src="/component_pictures/page_d_acceuil/logo.jpeg" width={34} height={34} alt="OWF" referrerPolicy="no-referrer" style={{ borderRadius: '50%' }} />
          <span className="brand-desktop">ORPHANS WORLD FOUNDATION</span>
          <span className="brand-mobile">OWF</span>
        </div>
        <div className="nav-links">
          {[
            { id: "about", label: "À propos" },
            { id: "causes", label: "Causes" },
            { id: "programmes", label: "Programmes" },
            { id: "blog", label: "Blog" },
            { id: "contact", label: "Contact" }
          ].map((page) => (
            <div
              key={page.id}
              className={currentPage === page.id ? "active" : ""}
              onClick={() => goTo(page.id)}
            >
              {page.label}
            </div>
          ))}
        </div>
        <button className="nav-cta-pill" onClick={openModal}>
          ❤ Faire un don
        </button>
        <button className="nav-mob" onClick={openMobileMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};
