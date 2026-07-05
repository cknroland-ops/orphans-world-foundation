import React from "react";
import Image from "next/image";

export const ProgrammesView = ({ goTo }: { goTo: (page: string) => void }) => {
  const programmes = [
    { tag: "Santé pour tous", color: "crimson", title: "Orphans Health", desc: "Santé et bien-être des enfants accompagnés, prévention des troubles mentaux et accès aux soins essentiels. Parrainage médical et suivi psychologique.", img: "/component_pictures/programmes/sante.jpg", slug: "orphans-health" },
    { tag: "Égalité & Genre", color: "gold", title: "Orphans Gender", desc: "Égalité de genre, protection des droits des filles et garçons, lutte contre les discriminations. Sensibilisation sur l'hygiène menstruelle en milieu rural.", img: "https://i.ibb.co/rBYRY05/Whats-App-Image-2026-07-05-at-00-51-16.jpg", slug: "orphans-gender" },
    { tag: "Communication", color: "crimson", title: "Orphans Magazine", desc: "Communication, sensibilisation et rayonnement de la cause humanitaire à travers les médias. Promotion des activités et de l'image de l'organisation.", img: "https://i.ibb.co/k281gRtC/Whats-App-Image-2026-07-05-at-00-49-21.jpg", slug: "orphans-magazine" },
    { tag: "Droits de l'enfant", color: "gold", title: "Orphans Justice", desc: "Plaidoyer et défense des droits de l'enfant, action juridique et représentation auprès des institutions. Lutte contre les barrières aux droits en RDC.", img: "/component_pictures/programmes/droits.jpg", slug: "orphans-justice" },
    { tag: "Éducation", color: "crimson", title: "Orphans Education", desc: "Soutien scolaire, bourses d'études, coaching éducatif, distribution de kits scolaires. Accompagnement vers un avenir scolaire réussi.", img: "/component_pictures/programmes/edu.jpeg", slug: "orphans-education" },
    { tag: "Agri-Business", color: "gold", title: "Orphans Agri-Business", desc: "Autonomisation, transformation agroalimentaire et santé nutritionnelle. Promotion de l'entrepreneuriat communautaire par la commission agri-business.", img: "/component_pictures/programmes/agri.jpeg", slug: "orphans-agri-business" }
  ];

  return (
    <div className="page active">
      <div className="inner-hero">
        <div className="inner-hero-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542810634-71277d95dc8c?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}></div>
        <div className="inner-hero-geo">
          <span></span><span></span><span></span>
        </div>
        <div className="inner-hero-content">
          <div className="inner-hero-pill">Programmes</div>
          <h1 className="inner-hero-title">Programmes Ça<br />Marque Différence</h1>
          <p className="inner-hero-sub">Des programmes qui élèvent les communautés par l&apos;éducation, la santé et le soutien à la vie.</p>
        </div>
      </div>
      <section className="bg-mesh-light" style={{ padding: "100px 0" }}>
        <div className="container">
          {programmes.map((p, i) => (
            <div className="prog-card-h reveal" key={i}>
              <div className="prog-card-h-img">
                <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} referrerPolicy="no-referrer" />
              </div>
              <div className="prog-card-h-body">
                <span className={`prog-tag-h prog-tag-${p.color}`}>{p.tag}</span>
                <div className="prog-card-h-title">{p.title}</div>
                <div className="prog-card-h-desc">{p.desc}</div>
                <button className="btn-primary" style={{ padding: "10px 22px", fontSize: 13, borderRadius: 100 }} onClick={() => goTo(`programme-${p.slug}`)}>En savoir plus →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
