"use client";

import { useEffect } from "react";
import { waveLetters } from "./lib/waveLetters";

function scrollRevealWords(segments) {
  let i = -1;
  return segments.flatMap((seg, si) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((w, wi) => {
        i += 1;
        return (
          <span className={"word" + (seg.accent ? " word--accent" : "")} key={`${si}-${wi}`}>
            {w}{" "}
          </span>
        );
      })
  );
}

export default function Home() {
  useEffect(() => {
    const cleanups = [];
    const on = (target, type, handler, opts) => {
      target.addEventListener(type, handler, opts);
      cleanups.push(() => target.removeEventListener(type, handler, opts));
    };

    /* ---------- hero wordmark wave, synced to the curtain lift ---------- */
    const heroWordmark = document.querySelector(".hero__wordmark");
    if (heroWordmark) {
      const onCurtainLifted = () => heroWordmark.classList.add("is-visible");
      on(window, "fn:curtain-lifted", onCurtainLifted);
    }

    /* ---------- before / after slider ---------- */
    const baSlider = document.getElementById("baSlider");
    const baBefore = document.getElementById("baBefore");
    const baHandle = document.getElementById("baHandle");

    function setBaPosition(percent) {
      const clamped = Math.min(98, Math.max(2, percent));
      baBefore.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
      baHandle.style.left = `${clamped}%`;
    }
    function positionFromEvent(clientX) {
      const rect = baSlider.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    let dragging = false;
    const startDrag = () => { dragging = true; };
    const stopDrag = () => { dragging = false; };
    const moveDrag = (clientX) => {
      if (!dragging) return;
      setBaPosition(positionFromEvent(clientX));
    };

    if (baSlider) {
      setBaPosition(50);

      on(baSlider, "mousedown", (e) => { e.preventDefault(); startDrag(); moveDrag(e.clientX); });
      on(window, "mousemove", (e) => moveDrag(e.clientX));
      on(window, "mouseup", stopDrag);

      on(baSlider, "touchstart", (e) => { startDrag(); moveDrag(e.touches[0].clientX); }, { passive: true });
      on(window, "touchmove", (e) => { if (dragging) moveDrag(e.touches[0].clientX); }, { passive: true });
      on(window, "touchend", stopDrag);

      on(baSlider, "click", (e) => setBaPosition(positionFromEvent(e.clientX)));
    }

    /* ---------- scroll-reveal words (prestations intro) ---------- */
    const prestationsIntro = document.getElementById("prestationsIntro");
    const prestationsWords = prestationsIntro ? prestationsIntro.querySelectorAll(".word") : [];
    let prestationsTicking = false;

    function updatePrestationsProgress() {
      const rect = prestationsIntro.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const litCount = Math.round(progress * prestationsWords.length);
      prestationsWords.forEach((w, i) => w.classList.toggle("is-lit", i < litCount));
    }

    if (prestationsIntro && prestationsWords.length) {
      const onPrestationsScroll = () => {
        if (prestationsTicking) return;
        prestationsTicking = true;
        requestAnimationFrame(() => {
          updatePrestationsProgress();
          prestationsTicking = false;
        });
      };
      on(window, "scroll", onPrestationsScroll, { passive: true });
      updatePrestationsProgress();
    }

    /* ---------- services visual sync (sticky image follows active card) ---------- */
    const servicesVisual = document.getElementById("servicesVisual");
    const serviceCards = document.querySelectorAll(".service-card[data-service-index]");
    const serviceNames = ["Commerces & devantures", "Bureaux & tertiaire", "Particuliers & résidentiel"];

    if (servicesVisual && serviceCards.length) {
      const visualImgs = servicesVisual.querySelectorAll(".services-visual__img");
      const visualName = document.getElementById("servicesVisualName");
      const visualIndex = document.getElementById("servicesVisualStep");

      const setActiveService = (index) => {
        visualImgs.forEach((img) => img.classList.toggle("is-active", Number(img.dataset.index) === index));
        if (visualName) visualName.textContent = serviceNames[index];
        if (visualIndex) {
          visualIndex.textContent = `0${index + 1}`;
          visualIndex.classList.remove("is-pop");
          void visualIndex.offsetWidth;
          visualIndex.classList.add("is-pop");
        }
      };

      const servicesIo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveService(Number(entry.target.dataset.serviceIndex));
          }
        });
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

      serviceCards.forEach((card) => servicesIo.observe(card));
      cleanups.push(() => servicesIo.disconnect());
    }

    /* ---------- realisations : drag-to-scroll (desktop mouse only, touch/trackpad already scroll natively) ---------- */
    const realisationsTrack = document.getElementById("realisationsTrack");
    if (realisationsTrack) {
      let isDragging = false;
      let hasMoved = false;
      let startX = 0;
      let startScrollLeft = 0;

      const onPointerDown = (e) => {
        if (e.pointerType !== "mouse") return;
        isDragging = true;
        hasMoved = false;
        startX = e.clientX;
        startScrollLeft = realisationsTrack.scrollLeft;
        realisationsTrack.classList.add("is-dragging");
      };
      const onPointerMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) hasMoved = true;
        realisationsTrack.scrollLeft = startScrollLeft - dx;
      };
      const endDrag = () => {
        isDragging = false;
        realisationsTrack.classList.remove("is-dragging");
      };
      const onClickCapture = (e) => {
        if (hasMoved) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      on(realisationsTrack, "pointerdown", onPointerDown);
      on(window, "pointermove", onPointerMove);
      on(window, "pointerup", endDrag);
      on(realisationsTrack, "click", onClickCapture, true);
    }

    /* ---------- animated stat counters ---------- */
    const statNums = document.querySelectorAll(".stat-tile__num");
    let statIo;
    if (statNums.length && "IntersectionObserver" in window) {
      statIo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.dataset.count);
          const decimals = parseInt(el.dataset.decimal || "0", 10);
          const suffix = el.dataset.suffix || "";
          const duration = 1400;
          const start = performance.now();
          function tick(now) {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;
            el.textContent = value.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          statIo.unobserve(el);
        });
      }, { threshold: 0.5 });
      statNums.forEach((el) => statIo.observe(el));
      cleanups.push(() => statIo.disconnect());
    }

    /* ---------- accordion ---------- */
    document.querySelectorAll(".accordion-item").forEach((item) => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");
      on(trigger, "click", () => {
        const isOpen = item.classList.contains("is-open");
        item.parentElement.querySelectorAll(".accordion-item").forEach((other) => {
          other.classList.remove("is-open");
          other.querySelector(".accordion-panel").style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("is-open");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });

    /* ---------- devis form (demo — no backend) ---------- */
    const devisForm = document.getElementById("devisForm");
    const devisFields = document.getElementById("devisFields");
    const devisSuccess = document.getElementById("devisSuccess");

    if (devisForm) {
      on(devisForm, "submit", (e) => {
        e.preventDefault();
        devisFields.hidden = true;
        devisSuccess.hidden = false;
        devisSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <main id="top">
        <section className="hero">
          <div className="hero__stage">
            <div className="hero__bg">
              <img src="/assets/img/hero.webp" alt="Technicien nettoyant une façade vitrée en nacelle" />
              <div className="hero__overlay"></div>
            </div>

            <div className="hero__inner container">
              <div className="hero__badges">
                <span className="pill pill--light rotate-l reveal" data-reveal>Nettoyage de vitres &middot; Pros &amp; Particuliers</span>
              </div>

              <h1 className="hero__wordmark">{waveLetters("FLASH NET")}</h1>

              <div className="hero__bottom">
                <h2 className="hero__tagline reveal" data-reveal>Des vitres impeccables pour une image irréprochable.</h2>
                <div className="hero__actions reveal" data-reveal>
                  <a href="#devis" className="btn btn--cta btn--lg">Demander un devis gratuit</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="prestations-intro" id="prestationsIntro">
            <div className="prestations-intro__sticky">
              <span className="pill pill--eyebrow">Nos prestations</span>
              <p className="prestations-intro__text">
                {scrollRevealWords([
                  { text: "Des prestations pensées pour chaque vitrage, et pour" },
                  { text: "sublimer votre image.", accent: true },
                  { text: "Commerçant, entreprise ou particulier, on adapte la fréquence, les produits et le matériel à votre vitrage et à votre budget." },
                ])}
              </p>
              <ul className="badge-row badge-row--intro">
                <li>Devis gratuit sous 24h</li>
                <li>Contrats ponctuels ou récurrents</li>
                <li>Matériel pro &amp; produits éco</li>
              </ul>
            </div>
          </div>

          <div className="triptych container">
            <div className="triptych__pin">
              <div className="triptych__pin-inner reveal" data-reveal>
                <div className="services-visual" id="servicesVisual">
                  <img className="services-visual__img is-active" data-index="0" src="/assets/img/service-commerces.webp" alt="Commerces & devantures" />
                  <img className="services-visual__img" data-index="1" src="/assets/img/service-bureaux.webp" alt="Bureaux & tertiaire" />
                  <img className="services-visual__img" data-index="2" src="/assets/img/service-particuliers.webp" alt="Particuliers & résidentiel" />
                  <div className="services-visual__overlay"></div>
                  <div className="services-visual__index">
                    <span className="services-visual__index-num" id="servicesVisualStep">01</span>
                    <span className="services-visual__index-total">/ 03</span>
                  </div>
                  <div className="services-visual__caption">
                    <span className="services-visual__caption-bar"></span>
                    <span className="services-visual__name" id="servicesVisualName">Commerces &amp; devantures</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="triptych__cards">
              <article className="service-card reveal" data-reveal data-service-index="0">
                <span className="pill pill--tag">Devantures &amp; Commerces</span>
                <div className="service-card__mobile-img">
                  <img src="/assets/img/service-commerces.webp" alt="Commerces & devantures" />
                </div>
                <h3>Commerces &amp; devantures</h3>
                <p>Vitrines, devantures, enseignes lumineuses&nbsp;: la première image de votre commerce mérite d&apos;être irréprochable. Passage tôt le matin, sans gêner votre activité.</p>
                <a href="#devis" className="link-cta">Découvrir l&apos;offre commerces →</a>
              </article>

              <article className="service-card reveal" data-reveal data-service-index="1">
                <span className="pill pill--tag">Bureaux &amp; Tertiaire</span>
                <div className="service-card__mobile-img">
                  <img src="/assets/img/service-bureaux.webp" alt="Bureaux & tertiaire" />
                </div>
                <h3>Bureaux &amp; tertiaire</h3>
                <p>Halls d&apos;entrée, open spaces, façades vitrées&nbsp;: un cadre de travail impeccable qui valorise votre entreprise auprès de vos clients. Contrats mensuels ou trimestriels.</p>
                <a href="#devis" className="link-cta">Découvrir l&apos;offre bureaux →</a>
              </article>

              <article className="service-card reveal" data-reveal data-service-index="2">
                <span className="pill pill--tag">Particuliers &amp; Résidentiel</span>
                <div className="service-card__mobile-img">
                  <img src="/assets/img/service-particuliers.webp" alt="Particuliers & résidentiel" />
                </div>
                <h3>Particuliers &amp; résidentiel</h3>
                <p>Baies vitrées, vérandas, fenêtres en hauteur ou difficiles d&apos;accès&nbsp;: on s&apos;occupe de tout, avec du matériel adapté et sans traces.</p>
                <a href="#devis" className="link-cta">Découvrir l&apos;offre particuliers →</a>
              </article>
            </div>
          </div>
        </section>

        <section className="section feature">
          <div className="container feature__grid">
            <div className="feature__media reveal" data-reveal>
              <span className="pill pill--tag feature__tag">Méthode &amp; matériel</span>
              <img src="/assets/img/gallery-3.webp" alt="Technicien nettoyant une façade vitrée en hauteur" />
            </div>
            <div className="feature__text reveal" data-reveal style={{ "--delay": ".1s" }}>
              <h2 className="h2">La méthode fait la différence.<br />Le résultat vous engage.</h2>
              <p>Eau osmosée, raclettes professionnelles, perches télescopiques jusqu&apos;à 20&nbsp;m et accès sur corde pour les
                façades les plus hautes&nbsp;: on choisit la méthode adaptée à chaque vitrage pour un <strong>rendu sans traces,
                qui dure</strong>.</p>
              <a href="#devis" className="btn btn--cta">Demander mon devis</a>
            </div>
          </div>
        </section>

        <section className="section feature feature--reverse">
          <div className="container feature__grid">
            <div className="feature__text reveal" data-reveal>
              <span className="pill pill--eco">Engagement écologique</span>
              <h2 className="h2">Des produits sains, pour vos vitres comme pour la planète.</h2>
              <p>Nos produits sont <strong>biodégradables</strong> et sans danger pour vos enfants, vos animaux ou vos
                plantes. Une vitrine impeccable ne doit pas se faire au détriment de l&apos;environnement.</p>
              <ul className="badge-row">
                <li>Sans danger</li>
                <li>100% biodégradable</li>
                <li>Eau filtrée</li>
              </ul>
              <a href="#devis" className="btn btn--cta">Demander mon devis</a>
            </div>
            <div className="feature__media reveal" data-reveal style={{ "--delay": ".1s" }}>
              <span className="pill pill--tag feature__tag">Particuliers</span>
              <img src="/assets/img/service-particuliers.webp" alt="Maison avec baies vitrées au crépuscule" />
            </div>
          </div>
        </section>

        <section className="section" id="avant-apres">
          <div className="container">
            <span className="pill pill--eyebrow reveal" data-reveal>Voyez la différence</span>
            <h2 className="h2 reveal" data-reveal>Un glissement, et tout change.</h2>
            <p className="lede reveal" data-reveal>Faites glisser le curseur pour comparer l&apos;avant et l&apos;après.</p>
          </div>

          <div className="container">
            <div className="ba-slider reveal" data-reveal id="baSlider">
              <div className="ba-slider__after">
                <img src="/assets/img/before-after.webp" alt="Vitrage propre après intervention" draggable="false" />
              </div>
              <div className="ba-slider__before" id="baBefore">
                <img src="/assets/img/before-after.webp" alt="Vitrage sale avant intervention" draggable="false" />
              </div>
              <div className="ba-slider__handle" id="baHandle">
                <span className="ba-slider__grip">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 5l-6 7 6 7M16 5l6 7-6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
              <span className="ba-slider__label ba-slider__label--before">AVANT</span>
              <span className="ba-slider__label ba-slider__label--after">APRÈS</span>
            </div>
          </div>
        </section>

        <section className="section" id="realisations">
          <div className="container">
            <span className="pill pill--eyebrow reveal" data-reveal>Nos réalisations</span>
            <h2 className="h2 reveal" data-reveal>Un travail dont on est fiers</h2>
            <p className="lede reveal" data-reveal>Faites glisser pour parcourir nos chantiers récents.</p>
          </div>

          <div className="realisations-scroller" id="realisationsScroller">
            <div className="realisations-scroller__track" id="realisationsTrack">
              <figure className="realisations-card">
                <img src="/assets/img/gallery-1.webp" alt="Nettoyage en hauteur d'une devanture" draggable="false" />
                <div className="realisations-card__overlay"></div>
                <figcaption>
                  <span className="pill pill--tag">Commerce</span>
                  <span className="realisations-card__title">Devanture — accès difficile</span>
                </figcaption>
              </figure>
              <figure className="realisations-card">
                <img src="/assets/img/gallery-2.webp" alt="Nacelle sur façade de bureaux" draggable="false" />
                <div className="realisations-card__overlay"></div>
                <figcaption>
                  <span className="pill pill--tag">Bureaux</span>
                  <span className="realisations-card__title">Bureaux — façade complète</span>
                </figcaption>
              </figure>
              <figure className="realisations-card">
                <img src="/assets/img/gallery-3.webp" alt="Immeuble de bureaux vitré" draggable="false" />
                <div className="realisations-card__overlay"></div>
                <figcaption>
                  <span className="pill pill--tag">Bureaux</span>
                  <span className="realisations-card__title">Tertiaire — hall &amp; façade</span>
                </figcaption>
              </figure>
              <figure className="realisations-card">
                <img src="/assets/img/gallery-4.webp" alt="Maison avec baies vitrées" draggable="false" />
                <div className="realisations-card__overlay"></div>
                <figcaption>
                  <span className="pill pill--tag">Résidentiel</span>
                  <span className="realisations-card__title">Résidentiel — véranda</span>
                </figcaption>
              </figure>
              <figure className="realisations-card">
                <img src="/assets/img/gallery-5.webp" alt="Technicien sur corde nettoyant une façade" draggable="false" />
                <div className="realisations-card__overlay"></div>
                <figcaption>
                  <span className="pill pill--tag">Commerce</span>
                  <span className="realisations-card__title">Commerce — accès sur corde</span>
                </figcaption>
              </figure>
              <div className="realisations-card realisations-card--cta">
                <p>Envie de voir<br />d&apos;autres chantiers&nbsp;?</p>
                <a href="/realisations" className="btn btn--light btn--lg">Voir toutes nos réalisations →</a>
              </div>
            </div>
          </div>

          <div className="container feature__grid feature__grid--identity">
            <div className="feature__text reveal" data-reveal>
              <span className="pill pill--eyebrow">Qui sommes-nous</span>
              <h2 className="h2">Une affaire de famille, ancrée en Bretagne.</h2>
              <p>Flash Net est une entreprise familiale bretonne, sans franchise ni investisseurs&nbsp;: juste une équipe qui soigne chaque chantier depuis 2011, de Saint-Malo à Quimper.</p>
            </div>
            <div className="feature__media reveal" data-reveal style={{ "--delay": ".1s" }}>
              <img src="/assets/img/saint-malo.webp" alt="Bord de mer et façades bretonnes à Saint-Malo" />
            </div>
          </div>

          <div className="stats container">
            <div className="stats__title">
              <h2 className="h2 reveal" data-reveal>Les chiffres qui <span className="text-accent">parlent pour nous</span></h2>
            </div>
            <div className="stats__grid">
              <div className="stat-tile reveal" data-reveal>
                <span className="stat-tile__num" data-count="500" data-suffix="+">0</span>
                <span className="stat-tile__label">Vitrines nettoyées / an</span>
              </div>
              <div className="stat-tile reveal" data-reveal style={{ "--delay": ".08s" }}>
                <span className="stat-tile__num" data-count="15" data-suffix=" ans">0</span>
                <span className="stat-tile__label">D&apos;expérience</span>
              </div>
              <div className="stat-tile reveal" data-reveal style={{ "--delay": ".16s" }}>
                <span className="stat-tile__num" data-count="24" data-suffix="h">0</span>
                <span className="stat-tile__label">Délai moyen de devis</span>
              </div>
              <div className="stat-tile reveal" data-reveal style={{ "--delay": ".24s" }}>
                <span className="stat-tile__num" data-count="100" data-suffix="%">0</span>
                <span className="stat-tile__label">Produits écologiques</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--devis" id="devis">
          <div className="container devis__grid">
            <div className="devis__intro reveal" data-reveal>
              <span className="pill pill--eyebrow">Devis gratuit</span>
              <h2 className="h2">Votre devis gratuit<br />en 2 minutes.</h2>
              <p>Remplissez ce formulaire, on vous recontacte sous 24h avec une estimation. Une photo nous aide à estimer
                plus précisément la surface à traiter.</p>
              <ul className="check-list">
                <li>Réponse sous 24h</li>
                <li>Aucun engagement</li>
                <li>Estimation adaptée à votre besoin</li>
              </ul>
            </div>

            <form className="devis-form reveal" data-reveal style={{ "--delay": ".1s" }} id="devisForm">
              <div className="devis-form__success" id="devisSuccess" hidden>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <h3>Demande envoyée !</h3>
                <p>Merci, on revient vers vous sous 24h ouvrées avec votre estimation.</p>
              </div>

              <div className="devis-form__fields" id="devisFields">
                <fieldset className="field-group">
                  <legend>Vous êtes</legend>
                  <div className="radio-row">
                    <label className="radio-pill"><input type="radio" name="profil" value="pro" defaultChecked /><span>Professionnel</span></label>
                    <label className="radio-pill"><input type="radio" name="profil" value="particulier" /><span>Particulier</span></label>
                  </div>
                </fieldset>

                <fieldset className="field-group">
                  <legend>Type de besoin</legend>
                  <div className="check-row">
                    <label className="check-pill"><input type="checkbox" name="besoin" value="devanture" /><span>Devanture / vitrine</span></label>
                    <label className="check-pill"><input type="checkbox" name="besoin" value="bureaux" /><span>Bureaux</span></label>
                    <label className="check-pill"><input type="checkbox" name="besoin" value="baies" /><span>Baies vitrées</span></label>
                    <label className="check-pill"><input type="checkbox" name="besoin" value="veranda" /><span>Véranda</span></label>
                    <label className="check-pill"><input type="checkbox" name="besoin" value="autre" /><span>Autre</span></label>
                  </div>
                </fieldset>

                <fieldset className="field-group">
                  <legend>Fréquence souhaitée</legend>
                  <div className="radio-row">
                    <label className="radio-pill"><input type="radio" name="frequence" value="ponctuel" defaultChecked /><span>Ponctuel</span></label>
                    <label className="radio-pill"><input type="radio" name="frequence" value="regulier" /><span>Régulier (contrat)</span></label>
                  </div>
                </fieldset>

                <div className="field-pair">
                  <label className="field">
                    <span>Nom</span>
                    <input type="text" name="nom" placeholder="Votre nom" required />
                  </label>
                  <label className="field">
                    <span>Téléphone</span>
                    <input type="tel" name="telephone" placeholder="06 00 00 00 00" required />
                  </label>
                </div>
                <div className="field-pair">
                  <label className="field">
                    <span>Email</span>
                    <input type="email" name="email" placeholder="vous@email.com" required />
                  </label>
                  <label className="field">
                    <span>Ville</span>
                    <input type="text" name="ville" placeholder="Votre ville" />
                  </label>
                </div>

                <label className="field">
                  <span>Précisions (optionnel)</span>
                  <textarea name="message" rows={3} placeholder="Surface approximative, accès, étage..."></textarea>
                </label>

                <label className="field field--file">
                  <span>Ajouter une photo (optionnel)</span>
                  <input type="file" name="photo" accept="image/*" />
                </label>

                <button type="submit" className="btn btn--cta btn--lg btn--block">Envoyer ma demande</button>
              </div>
            </form>
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container faq__grid">
            <div className="faq__intro reveal" data-reveal>
              <span className="pill pill--eyebrow">Foire aux questions</span>
              <h2 className="h2">Tout ce qu&apos;il faut savoir avant de commencer</h2>
            </div>
            <div className="accordion reveal" data-reveal style={{ "--delay": ".1s" }}>
              <div className="accordion-item">
                <button className="accordion-trigger">
                  <span>Quelle est la fréquence recommandée pour un commerce ?</span>
                  <span className="accordion-icon"></span>
                </button>
                <div className="accordion-panel">
                  <p>Pour une devanture en centre-ville, on recommande un passage toutes les 1 à 2 semaines. Pour des
                    bureaux ou un commerce moins exposé, un passage mensuel suffit généralement.</p>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-trigger">
                  <span>Utilisez-vous des produits respectueux de l&apos;environnement ?</span>
                  <span className="accordion-icon"></span>
                </button>
                <div className="accordion-panel">
                  <p>Oui, systématiquement. Nos produits sont biodégradables et notre eau est filtrée (osmose inverse), ce
                    qui évite les traces de calcaire sans utiliser de produits chimiques agressifs.</p>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-trigger">
                  <span>Faut-il être présent pendant l&apos;intervention ?</span>
                  <span className="accordion-icon"></span>
                </button>
                <div className="accordion-panel">
                  <p>Non, ce n&apos;est pas obligatoire. Pour les commerces et bureaux, on s&apos;organise pour intervenir tôt le
                    matin ou en dehors de vos horaires d&apos;ouverture si besoin.</p>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-trigger">
                  <span>Intervenez-vous en hauteur ou sur des façades difficiles d&apos;accès ?</span>
                  <span className="accordion-icon"></span>
                </button>
                <div className="accordion-panel">
                  <p>Oui. Selon la configuration, on utilise des perches télescopiques jusqu&apos;à 20&nbsp;m ou un accès sur
                    corde par des techniciens habilités travail en hauteur.</p>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-trigger">
                  <span>Comment obtenir un devis, et est-il vraiment gratuit ?</span>
                  <span className="accordion-icon"></span>
                </button>
                <div className="accordion-panel">
                  <p>Oui, le devis est gratuit et sans engagement. Remplissez le formulaire plus haut ou appelez-nous
                    directement&nbsp;: on revient vers vous sous 24h avec une estimation.</p>
                </div>
              </div>
              <div className="accordion-item">
                <button className="accordion-trigger">
                  <span>Quelles sont vos zones d&apos;intervention ?</span>
                  <span className="accordion-icon"></span>
                </button>
                <div className="accordion-panel">
                  <p>On intervient dans toute la Bretagne&nbsp;: Rennes, Brest, Quimper, Vannes, Saint-Malo, Lorient,
                    Saint-Brieuc et leurs environs. Contactez-nous pour vérifier votre secteur.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
