import React from "react";
import Image from "next/image";
import { Programme, programmes } from "../lib/programmes";

export const ProgrammeDetailView = ({
  programme,
  goTo,
  openModal,
}: {
  programme: Programme;
  goTo: (page: string) => void;
  openModal: () => void;
}) => {
  if (!programme) return null;

  const others = programmes.filter((p) => p.slug !== programme.slug).slice(0, 3);

  return (
    <div className="page active">
      {/* Hero banner */}
      <div className="bg-mesh-dark" style={{ paddingTop: "180px", paddingBottom: "100px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div className="container" style={{ maxWidth: 1000, margin: "0 auto", padding: 0 }}>
          <div style={{ marginBottom: "24px" }}>
            <span
              className={`prog-tag-h prog-tag-${programme.badgeColor}`}
              style={{ fontSize: "11px", letterSpacing: "2px" }}
            >
              {programme.badge}
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 76px)",
              fontWeight: 700,
              color: "var(--white)",
              fontFamily: "var(--font-cormorant)",
              marginBottom: "32px",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            {programme.title}
          </h1>
          <button
            onClick={() => goTo("programmes")}
            className="btn-outline"
            style={{ fontSize: "13px", padding: "10px 24px" }}
          >
            ← Retour aux programmes
          </button>
        </div>
      </div>

      {/* Hero image + body text */}
      <section className="bg-mesh-light" style={{ padding: "0 0 100px" }}>
        <div className="container" style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Full-width hero image */}
          <div
            className="reveal"
            style={{
              position: "relative",
              width: "100%",
              height: "520px",
              borderRadius: "24px",
              overflow: "hidden",
              marginBottom: "80px",
              marginTop: "-80px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            <Image
              src={programme.img}
              alt={programme.title}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>

          {/* Article body */}
          <div
            className="reveal"
            style={{
              maxWidth: 800,
              margin: "0 auto",
              fontFamily: "var(--font-dmsans)",
              color: "rgba(0,0,0,0.75)",
              fontSize: "17px",
              lineHeight: 1.85,
            }}
          >
            {programme.paragraphs.map((para, i) => (
              <p key={i} style={{ marginBottom: "28px" }}>
                {para}
              </p>
            ))}

            {/* CTA block */}
            <div
              className="reveal"
              style={{
                marginTop: "56px",
                padding: "40px 48px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, var(--navy-deep), var(--navy-primary))",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "var(--font-cormorant)",
                }}
              >
                &ldquo;{programme.cta}&rdquo;
              </p>
              <button
                className="btn-primary"
                onClick={openModal}
                style={{ fontSize: "15px", padding: "16px 36px" }}
              >
                ❤ Faire un don maintenant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Other programmes */}
      <section className="bg-mesh-light" style={{ padding: "100px 0" }}>
        <div className="container" style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div
            className="reveal"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "48px",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <div className="eyebrow eyebrow-gold">
                <span className="eyebrow-dot"></span>Autres programmes
              </div>
              <h2 className="section-title-light" style={{ marginBottom: 0 }}>
                Découvrez nos autres<br />initiatives
              </h2>
            </div>
            <button
              className="btn-outline"
              onClick={() => goTo("programmes")}
              style={{ flexShrink: 0, color: "var(--navy-primary)", borderColor: "rgba(15,24,36,0.2)" }}
            >
              Voir tous les programmes →
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {others.map((p, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onClick={() => goTo(`programme-${p.slug}`)}
              >
                <div style={{ position: "relative", height: "200px" }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "24px" }}>
                  <span
                    className={`prog-tag-h prog-tag-${p.badgeColor}`}
                    style={{ fontSize: "10px", marginBottom: "12px", display: "inline-block" }}
                  >
                    {p.badge}
                  </span>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "var(--navy-primary)",
                      fontFamily: "var(--font-cormorant)",
                      lineHeight: 1.3,
                      marginBottom: "12px",
                    }}
                  >
                    {p.title.split(" — ")[0]}
                  </div>
                  <span style={{ color: "var(--crimson)", fontWeight: 600, fontSize: "14px" }}>
                    En savoir plus →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
