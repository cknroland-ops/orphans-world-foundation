import React from "react";
import Image from "next/image";
import { useLanguage } from "../lib/i18n";
import { programmeTranslations } from "../lib/programmeTranslations";

export const ProgrammesView = ({ goTo }: { goTo: (page: string) => void }) => {
  const { locale, t } = useLanguage();
  const programmes = [
    { tag: "Santé pour tous", color: "crimson", title: "Orphans Health", desc: "Santé et bien-être des enfants accompagnés, prévention des troubles mentaux et accès aux soins essentiels. Parrainage médical et suivi psychologique.", img: "/component_pictures/programmes/sante.jpg", slug: "orphans-health" },
    { tag: "Égalité & Genre", color: "gold", title: "Orphans Gender", desc: "Égalité de genre, protection des droits des filles et garçons, lutte contre les discriminations. Sensibilisation sur l'hygiène menstruelle en milieu rural.", img: "https://i.ibb.co/rBYRY05/Whats-App-Image-2026-07-05-at-00-51-16.jpg", slug: "orphans-gender" },
    { tag: "Communication", color: "crimson", title: "Orphans Magazine", desc: "Communication, sensibilisation et rayonnement de la cause humanitaire à travers les médias. Promotion des activités et de l'image de l'organisation.", img: "https://i.ibb.co/k281gRtC/Whats-App-Image-2026-07-05-at-00-49-21.jpg", slug: "orphans-magazine" },
    { tag: "Droits de l'enfant", color: "gold", title: "Orphans Justice", desc: "Plaidoyer et défense des droits de l'enfant, action juridique et représentation auprès des institutions. Lutte contre les barrières aux droits en RDC.", img: "/component_pictures/programmes/droits.jpg", slug: "orphans-justice" },
    { tag: "Éducation", color: "crimson", title: "Orphans Education", desc: "Soutien scolaire, bourses d'études, coaching éducatif, distribution de kits scolaires. Accompagnement vers un avenir scolaire réussi.", img: "/component_pictures/programmes/edu.jpeg", slug: "orphans-education" },
    { tag: "Agri-Business", color: "gold", title: "Orphans Agri-Business", desc: "Autonomisation, transformation agroalimentaire et santé nutritionnelle. Promotion de l'entrepreneuriat communautaire par la commission agri-business.", img: "/component_pictures/programmes/agri.jpeg", slug: "orphans-agri-business" }
  ];

  const localizedCards = {
    EN: {
      tags: ["HEALTH FOR ALL", "EQUALITY & GENDER", "COMMUNICATION", "CHILDREN'S RIGHTS", "EDUCATION", "AGRI-BUSINESS"],
      descriptions: ["Health and well-being for supported children, mental health prevention and access to essential care.", "Gender equality, protection of girls' and boys' rights, and the fight against discrimination.", "Communication, awareness and visibility for humanitarian work through the media.", "Advocacy and defense of children's rights, legal action and institutional representation.", "Tutoring, scholarships, educational coaching and school kits for a successful future.", "Empowerment, food processing and nutritional health through community entrepreneurship."],
    },
    SW: {
      tags: ["AFYA KWA WOTE", "USAWA NA JINSIA", "MAWASILIANO", "HAKI ZA WATOTO", "ELIMU", "BIASHARA YA KILIMO"],
      descriptions: ["Afya na ustawi wa watoto wanaosaidiwa, kinga ya matatizo ya akili na huduma muhimu.", "Usawa wa kijinsia, ulinzi wa haki za wasichana na wavulana na kupambana na ubaguzi.", "Mawasiliano, uhamasishaji na kuonyesha kazi ya kibinadamu kupitia vyombo vya habari.", "Utetezi na ulinzi wa haki za watoto, hatua za kisheria na uwakilishi wa taasisi.", "Msaada wa shule, ufadhili, ushauri wa kielimu na vifaa vya shule kwa mustakabali bora.", "Uwezeshaji, usindikaji wa chakula na afya ya lishe kupitia ujasiriamali wa jamii."],
    },
  }[locale as "EN" | "SW"];

  return (
    <div className="page active">
      <div className="inner-hero">
        <div className="inner-hero-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542810634-71277d95dc8c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}></div>
        <div className="inner-hero-geo">
          <span></span><span></span><span></span>
        </div>
        <div className="inner-hero-content">
          <div className="inner-hero-pill">{t("Programmes")}</div>
          <h1 className="inner-hero-title uppercase">{locale === "FR" ? <>Programmes Ça<br />Marque Différence</> : locale === "EN" ? <>Programs That<br />Make a Difference</> : <>Programu Zinazobeba<br />Tofauti</>}</h1>
          <p className="inner-hero-sub">{locale === "FR" ? "Des programmes qui élèvent les communautés par l'éducation, la santé et le soutien à la vie." : locale === "EN" ? "Programs that uplift communities through education, health and livelihood support." : "Programu zinazoinua jamii kupitia elimu, afya na msaada wa maisha."}</p>
        </div>
      </div>
      <section className="bg-mesh-light programmes-page-section" style={{ padding: "100px 0" }}>
        <div className="container">
          {programmes.map((p, i) => (
            <div className="prog-card-h reveal" key={i}>
              <div className="prog-card-h-img">
                <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
              </div>
              <div className="prog-card-h-body">
                <span className={`prog-tag-h prog-tag-${p.color}`}>{locale === "FR" ? p.tag : localizedCards?.tags[i]}</span>
                <div className="prog-card-h-title">{locale === "FR" ? p.title : programmeTranslations[p.slug]?.[locale]?.title ?? p.title}</div>
                <div className="prog-card-h-desc">{locale === "FR" ? p.desc : localizedCards?.descriptions[i]}</div>
                <button className="btn-primary rounded-none" style={{ padding: "10px 22px", fontSize: 13, borderRadius: 0 }} onClick={() => goTo(`programme-${p.slug}`)}>{t("En savoir plus →")}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
