"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    img: "gallery-1.webp",
    cat: "Commerce",
    title: "Devanture en centre-ville",
    desc: "Nettoyage complet de la devanture et de l'enseigne lumineuse d'un commerce en centre-ville. Intervention tôt le matin pour ne pas gêner l'ouverture, sans aucune trace sur la vitrine.",
  },
  {
    img: "gallery-2.webp",
    cat: "Bureaux",
    title: "Façade complète d'un immeuble tertiaire",
    desc: "Nettoyage de la façade vitrée complète d'un immeuble de bureaux, réalisé en nacelle. Contrat d'entretien trimestriel mis en place avec le syndic.",
  },
  {
    img: "gallery-3.webp",
    cat: "Bureaux",
    title: "Hall d'entrée et façade vitrée",
    desc: "Remise à neuf du hall d'entrée et de la façade vitrée d'un immeuble tertiaire, pour une première impression irréprochable auprès des visiteurs.",
  },
  {
    img: "gallery-4.webp",
    cat: "Résidentiel",
    title: "Véranda et baies vitrées",
    desc: "Nettoyage complet d'une véranda et de larges baies vitrées, y compris les parties hautes difficiles d'accès, avec des produits sans danger pour les enfants et les animaux.",
  },
  {
    img: "gallery-5.webp",
    cat: "Commerce",
    title: "Intervention en accès sur corde",
    desc: "Façade commerciale sur plusieurs étages nettoyée par des techniciens habilités au travail en hauteur, avec accès sur corde pour les zones inaccessibles autrement.",
  },
  {
    img: "service-commerces.webp",
    cat: "Commerce",
    title: "Vitrine de centre commercial",
    desc: "Entretien régulier de la vitrine d'une enseigne en centre commercial, avec un passage hebdomadaire pour garder une image impeccable toute l'année.",
  },
  {
    img: "service-bureaux.webp",
    cat: "Bureaux",
    title: "Nettoyage de tour de bureaux",
    desc: "Intervention sur une tour de bureaux en hauteur, avec matériel professionnel adapté et respect strict des normes de sécurité.",
  },
  {
    img: "service-particuliers.webp",
    cat: "Résidentiel",
    title: "Maison avec grandes baies vitrées",
    desc: "Nettoyage de grandes baies vitrées d'une maison individuelle, pour laisser entrer un maximum de lumière naturelle sans aucune trace.",
  },
];

export default function RealisationsGallery() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    const lightbox = document.getElementById("lightbox");
    const backdrop = document.getElementById("lightboxBackdrop");
    const media = document.getElementById("lightboxMedia");
    const mediaImg = document.getElementById("lightboxImg");
    const info = document.getElementById("lightboxInfo");
    const tagEl = document.getElementById("lightboxTag");
    const titleEl = document.getElementById("lightboxTitle");
    const descEl = document.getElementById("lightboxDesc");
    const closeBtn = document.getElementById("lightboxClose");

    function openLightbox(index, thumbImg) {
      const p = projects[index];
      const first = thumbImg.getBoundingClientRect();

      mediaImg.src = `/assets/img/${p.img}`;
      mediaImg.alt = p.title;
      tagEl.textContent = p.cat;
      titleEl.textContent = p.title;
      descEl.textContent = p.desc;

      lightbox.hidden = false;
      document.body.style.overflow = "hidden";

      const last = media.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      const sx = first.width / last.width;
      const sy = first.height / last.height;

      media.style.transition = "none";
      media.style.transformOrigin = "top left";
      media.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
      backdrop.style.transition = "none";
      backdrop.style.opacity = "0";
      info.style.transition = "none";
      info.style.opacity = "0";
      info.style.transform = "translateX(24px)";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          media.style.transition = "transform .55s cubic-bezier(.16,.84,.44,1)";
          media.style.transform = "none";
          backdrop.style.transition = "opacity .4s ease";
          backdrop.style.opacity = "1";
          info.style.transition = "opacity .4s ease .18s, transform .4s ease .18s";
          info.style.opacity = "1";
          info.style.transform = "none";
        });
      });
    }

    function closeLightbox() {
      media.style.transition = "transform .35s ease, opacity .35s ease";
      media.style.transform = "scale(.92)";
      media.style.opacity = "0";
      backdrop.style.transition = "opacity .35s ease";
      backdrop.style.opacity = "0";
      info.style.transition = "opacity .25s ease";
      info.style.opacity = "0";
      document.body.style.overflow = "";
      setTimeout(() => {
        lightbox.hidden = true;
        media.style.opacity = "";
      }, 350);
    }

    const onGridClick = (e) => {
      const card = e.target.closest(".realisations-grid-card");
      if (!card || !grid.contains(card)) return;
      const index = Number(card.dataset.index);
      const img = card.querySelector("img");
      openLightbox(index, img);
    };
    grid.addEventListener("click", onGridClick);

    const onClose = () => closeLightbox();
    closeBtn.addEventListener("click", onClose);
    backdrop.addEventListener("click", onClose);

    const onKeydown = (e) => {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    };
    window.addEventListener("keydown", onKeydown);

    return () => {
      grid.removeEventListener("click", onGridClick);
      closeBtn.removeEventListener("click", onClose);
      backdrop.removeEventListener("click", onClose);
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <>
      <div className="realisations-grid" ref={gridRef}>
        {projects.map((p, i) => (
          <figure
            className="realisations-grid-card reveal"
            data-reveal
            data-index={i}
            style={{ "--delay": `${(i % 2) * 0.08}s` }}
            key={i}
          >
            <img src={`/assets/img/${p.img}`} alt={p.title} />
            <div className="realisations-grid-card__overlay"></div>
            <span className="realisations-grid-card__hint">Voir le projet</span>
            <figcaption>
              <span className="pill pill--tag">{p.cat}</span>
              <span className="realisations-grid-card__title">{p.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="lightbox" id="lightbox" hidden>
        <div className="lightbox__backdrop" id="lightboxBackdrop"></div>
        <div className="lightbox__panel">
          <div className="lightbox__media" id="lightboxMedia">
            <img id="lightboxImg" alt="" />
          </div>
          <div className="lightbox__info" id="lightboxInfo">
            <span className="pill pill--tag" id="lightboxTag">Commerce</span>
            <h3 id="lightboxTitle"></h3>
            <p id="lightboxDesc"></p>
            <a href="/#devis" className="link-cta">Demander un devis pour un projet similaire →</a>
          </div>
          <button className="lightbox__close" id="lightboxClose" aria-label="Fermer">✕</button>
        </div>
      </div>
    </>
  );
}
