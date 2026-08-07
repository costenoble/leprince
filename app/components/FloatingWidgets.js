"use client";

import { useEffect } from "react";

export default function FloatingWidgets() {
  useEffect(() => {
    const rdvWidget = document.getElementById("rdvWidget");
    const rdvToggle = document.getElementById("rdvToggle");
    const rdvPanel = document.getElementById("rdvPanel");
    const rdvClose = document.getElementById("rdvClose");
    const rdvDevisLink = document.getElementById("rdvDevisLink");

    function openRdv() {
      rdvPanel.hidden = false;
      rdvWidget.classList.add("is-open");
    }
    function closeRdv() {
      rdvPanel.hidden = true;
      rdvWidget.classList.remove("is-open");
    }
    const onToggle = () => (rdvPanel.hidden ? openRdv() : closeRdv());

    rdvToggle.addEventListener("click", onToggle);
    rdvClose.addEventListener("click", closeRdv);
    rdvDevisLink.addEventListener("click", closeRdv);

    return () => {
      rdvToggle.removeEventListener("click", onToggle);
      rdvClose.removeEventListener("click", closeRdv);
      rdvDevisLink.removeEventListener("click", closeRdv);
    };
  }, []);

  return (
    <>
      <a href="tel:+33600000000" className="call-fab" aria-label="Appeler">
        <span className="call-fab__pulse"></span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .7-.2 1l-2.3 2.2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
      </a>

      <div className="rdv-widget" id="rdvWidget">
        <button className="rdv-widget__toggle" id="rdvToggle">
          <span>Besoin d&apos;un devis rapide ?</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="rdv-widget__panel" id="rdvPanel" hidden>
          <div className="rdv-widget__head">
            <div className="rdv-widget__avatar">FN</div>
            <div>
              <strong>Flash Net</strong>
              <span>Répond généralement en 1h</span>
            </div>
            <button className="rdv-widget__close" id="rdvClose" aria-label="Fermer">✕</button>
          </div>
          <p>Un besoin urgent ou une question rapide&nbsp;? Appelez-nous ou passez directement au formulaire de devis.</p>
          <a href="tel:+33600000000" className="btn btn--light btn--block">📞 06 00 00 00 00</a>
          <a href="/#devis" className="btn btn--cta btn--block" id="rdvDevisLink">Aller au formulaire de devis</a>
        </div>
      </div>
    </>
  );
}
