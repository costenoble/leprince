"use client";

import { useEffect } from "react";
import { waveLetters } from "../lib/waveLetters";

export default function Header() {
  useEffect(() => {
    const loader = document.getElementById("loader");
    const loaderWord = document.getElementById("loaderWord");
    const navEl = document.querySelector(".nav");
    const navWrap = document.querySelector(".nav-wrap");
    const burger = document.getElementById("burger");
    const navMobile = document.getElementById("navMobile");
    const body = document.body;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const navEntries = performance.getEntriesByType("navigation");
    const isReload = navEntries.length ? navEntries[0].type === "reload" : false;
    const targetHash = window.location.hash;

    if (isReload && targetHash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
    body.style.overflow = "hidden";

    const applyScrollDecision = () => {
      if (!isReload && targetHash) {
        const target = document.querySelector(targetHash);
        if (target) {
          target.scrollIntoView({ block: "start" });
          // Jumping straight to a section shouldn't leave its content waiting
          // on the scroll-triggered fade-in; reveal it immediately.
          if (target.matches("[data-reveal]")) target.classList.add("is-visible");
          target.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
          return;
        }
      }
      window.scrollTo(0, 0);
    };

    const isFirstVisit = !sessionStorage.getItem("fn_visited");
    sessionStorage.setItem("fn_visited", "1");
    if (!isFirstVisit) {
      loader.classList.add("is-fast");
      navEl.classList.add("is-fast");
    }

    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loaderWord.classList.add("is-visible");
      });
    });

    const revealDelay = isFirstVisit ? 2400 : 700;
    const curtainBuffer = isFirstVisit ? 950 : 450;
    const hideTimer = setTimeout(() => {
      loader.classList.add("is-hidden");
      navEl.classList.add("is-loaded");
      body.style.overflow = "";
      applyScrollDecision();
      window.dispatchEvent(new CustomEvent("fn:curtain-lifted"));
    }, revealDelay);

    // Late-loading images can shift layout after the initial scroll; re-apply
    // the same decision once everything has finished loading.
    const onLoad = () => applyScrollDecision();
    window.addEventListener("load", onLoad);

    const removeTimer = setTimeout(() => {
      loader.style.display = "none";
    }, revealDelay + curtainBuffer);

    /* ---------- navbar scroll state + mobile menu ---------- */
    const onScroll = () => {
      navWrap.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onBurgerClick = () => {
      const isOpen = navMobile.classList.toggle("is-open");
      burger.classList.toggle("is-active", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
    };
    burger.addEventListener("click", onBurgerClick);

    const mobileLinkHandlers = [];
    navMobile.querySelectorAll("a").forEach((a) => {
      const handler = () => {
        navMobile.classList.remove("is-open");
        burger.classList.remove("is-active");
        burger.setAttribute("aria-expanded", "false");
      };
      a.addEventListener("click", handler);
      mobileLinkHandlers.push([a, handler]);
    });

    /* ---------- reveal on scroll (site-wide) ---------- */
    const revealEls = document.querySelectorAll("[data-reveal]");
    let revealIo;
    if ("IntersectionObserver" in window) {
      revealIo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
      revealEls.forEach((el) => revealIo.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
      body.style.overflow = "";
      window.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", onScroll);
      burger.removeEventListener("click", onBurgerClick);
      mobileLinkHandlers.forEach(([a, handler]) => a.removeEventListener("click", handler));
      if (revealIo) revealIo.disconnect();
    };
  }, []);

  return (
    <>
      <div className="loader" id="loader">
        <div className="loader__word" id="loaderWord">
          {waveLetters("FLASH NET")}
        </div>
      </div>

      <header className="nav-wrap">
        <nav className="nav" id="nav">
          <a href="/" className="nav__brand">
            <span className="nav__mark">FN</span>
            <span className="nav__word">Flash Net</span>
          </a>
          <ul className="nav__links">
            <li><a href="/#services">Services</a></li>
            <li><a href="/realisations">Réalisations</a></li>
            <li><a href="/#avis">Avis</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
          <a href="/#devis" className="btn btn--cta nav__cta">Demander un devis</a>
          <button className="nav__burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </nav>
        <div className="nav__mobile" id="navMobile">
          <a href="/#services">Services</a>
          <a href="/realisations">Réalisations</a>
          <a href="/#avis">Avis</a>
          <a href="/#faq">FAQ</a>
          <a href="/#devis" className="btn btn--cta">Demander un devis</a>
        </div>
      </header>
    </>
  );
}
