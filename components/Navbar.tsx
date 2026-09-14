import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Globe2 } from "lucide-react";
import { useLanguage } from "../lib/i18n";

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
  const { locale, setLocale, t } = useLanguage();

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
            { id: "about", label: t("À propos") },
            { id: "causes", label: t("Causes") },
            { id: "programmes", label: t("Programmes") },
            { id: "blog", label: t("Blog") },
            { id: "contact", label: t("Contact") }
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
        <div className="language-selector rounded-none" aria-label="Choisir la langue">
          <Globe2 size={15} aria-hidden="true" />
          <select value={locale} onChange={(event) => setLocale(event.target.value as "FR" | "EN" | "SW")} aria-label={t("Langue")}>
            <option value="FR">FR</option>
            <option value="EN">EN</option>
            <option value="SW">SW</option>
          </select>
        </div>
        <button className="nav-cta-pill rounded-none" onClick={openModal}>
          Faire un don
        </button>
        <button className="nav-mob" onClick={openMobileMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};
