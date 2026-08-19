import RealisationsGallery from "./RealisationsGallery";

export const metadata = {
  title: "Nos réalisations — Flash Net",
  description: "Un aperçu de nos chantiers de nettoyage de vitres : commerces, bureaux et particuliers en Bretagne.",
};

export default function Realisations() {
  return (
    <main id="top">
      <section className="section realisations-page-intro">
        <div className="container">
          <span className="pill pill--eyebrow reveal" data-reveal>Nos réalisations</span>
          <h1 className="h2 reveal" data-reveal>Chaque chantier, une vitrine impeccable.</h1>
          <p className="lede reveal" data-reveal>
            Commerces, bureaux, résidences&nbsp;: un aperçu de nos interventions récentes partout en Bretagne.
          </p>
        </div>

        <div className="container">
          <RealisationsGallery />
        </div>
      </section>

      <section className="section realisations-cta">
        <div className="container realisations-cta__inner reveal" data-reveal>
          <h2 className="h2">Un projet similaire en tête ?</h2>
          <p className="lede">Parlez-nous de votre commerce, vos bureaux ou votre maison, on vous propose une estimation sous 24h.</p>
          <a href="/#devis" className="btn btn--cta btn--lg">Demander un devis gratuit</a>
        </div>
      </section>
    </main>
  );
}
