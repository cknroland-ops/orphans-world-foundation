"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Components
import {
  HomeView,
  AboutView,
  CausesView,
  ProgrammesView,
  BlogView,
  BlogDetailView,
  ContactView,
  DonateView,
  ProgrammeDetailView,
} from "../components/Views";
import { programmes, Programme } from "../lib/programmes";

import {
  Navbar,
  Footer,
  DonateModal,
  MobileMenu,
} from "../components/Navigation";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentBlog, setCurrentBlog] = useState<any>(null);
  const [currentProgramme, setCurrentProgramme] = useState<Programme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let sid = localStorage.getItem('owf_sid');
    if (!sid) { sid = crypto.randomUUID(); localStorage.setItem('owf_sid', sid); }
    const today = new Date().toISOString().split('T')[0];
    if (localStorage.getItem('owf_last_visit') !== today) {
      localStorage.setItem('owf_last_visit', today);
      fetch('/api/track-visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: sid }) }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Init reveal animations
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal:not(.visible)").forEach((el) => io.observe(el));
    
    // Init counters
    const counterIo = new IntersectionObserver((es) => {
      es.forEach(e => {
        const target = e.target as any;
        if(e.isIntersecting && !target._done) {
          target._done = true;
          const t = parseInt(target.dataset.target);
          const s = target.dataset.suffix||'';
          let cur=0; const step=t/60;
          const iv = setInterval(()=>{
            cur = Math.min(cur+step,t);
            target.textContent = Math.floor(cur).toLocaleString()+s;
            if(cur>=t) clearInterval(iv);
          },16);
        }
      });
    },{threshold:0.5});
    document.querySelectorAll('[data-target]:not([data-done])').forEach(el => counterIo.observe(el));
    
    return () => {
      io.disconnect();
      counterIo.disconnect();
    }
  }, [currentPage]);

  const goTo = (page: string) => {
    if (page.startsWith("programme-")) {
      const slug = page.replace("programme-", "");
      const found = programmes.find((p) => p.slug === slug);
      if (found) {
        setCurrentProgramme(found);
        setCurrentPage("programmeDetail");
        setIsMobileMenuOpen(false);
        return;
      }
    }
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Navbar
        currentPage={currentPage}
        goTo={goTo}
        openModal={() => setIsModalOpen(true)}
        openMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        closeMenu={() => setIsMobileMenuOpen(false)}
        goTo={goTo}
        openModal={() => setIsModalOpen(true)}
      />

      <DonateModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />

      <main>
        {currentPage === "home" && <HomeView goTo={goTo} openModal={() => setIsModalOpen(true)} />}
        {currentPage === "about" && <AboutView openModal={() => setIsModalOpen(true)} />}
        {currentPage === "causes" && <CausesView openModal={() => setIsModalOpen(true)} />}
        {currentPage === "programmes" && <ProgrammesView goTo={goTo} />}
        {currentPage === "programmeDetail" && currentProgramme && <ProgrammeDetailView programme={currentProgramme} goTo={goTo} openModal={() => setIsModalOpen(true)} />}
        {currentPage === "blog" && <BlogView goTo={goTo} setBlog={setCurrentBlog} />}
        {currentPage === "blogDetail" && <BlogDetailView blog={currentBlog} goTo={goTo} />}
        {currentPage === "contact" && <ContactView />}
        {currentPage === "donate" && <DonateView />}
      </main>

      <Footer goTo={goTo} openModal={() => setIsModalOpen(true)} />
    </>
  );
}
