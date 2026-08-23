import { waveLetters } from "../lib/waveLetters";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <h2 className="footer__title">On révèle l&apos;éclat<br />de votre vitrine.</h2>

        <div className="footer__cols footer__cols--3">
          <div className="footer__col">
            <h4>Navigation</h4>
            <a href="/#services" className="footer-nav-link">Services<span className="arrow">→</span></a>
            <a href="/realisations" className="footer-nav-link">Réalisations<span className="arrow">→</span></a>
            <a href="/#faq" className="footer-nav-link">FAQ<span className="arrow">→</span></a>
            <a href="/mentions-legales" className="footer-nav-link">Mentions légales<span className="arrow">→</span></a>
            <a href="/politique-confidentialite" className="footer-nav-link">Politique de confidentialité<span className="arrow">→</span></a>
          </div>

          <div className="footer__col">
            <h4>Zone d&apos;intervention</h4>
            <p className="footer__zone">Bretagne&nbsp;: Rennes, Brest, Quimper, Vannes, Saint-Malo, Lorient, Saint-Brieuc</p>
          </div>

          <div className="footer__col footer__col--contact">
            <h4>On discute de votre projet ?</h4>
            <a href="/#devis" className="btn btn--light">Demander un devis</a>
          </div>
        </div>

        <div className="footer__engagements">
          <span>Produits écologiques</span>
          <span>Assurance décennale</span>
          <span>Satisfait ou repassé</span>
          <span>Devis gratuit</span>
        </div>
      </div>

      <div className="footer__wordmark" data-reveal aria-hidden="true">
        {waveLetters("FLASH NET")}
      </div>

      <div className="container footer__bottom">
        <p>© 2026 Flash Net. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
