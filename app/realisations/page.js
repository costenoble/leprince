export const metadata = {
  title: "Nos réalisations — Flash Net",
  description: "Un aperçu de nos chantiers de nettoyage de vitres : commerces, bureaux et particuliers en Bretagne.",
};

const projects = [
  { img: "gallery-1.webp", cat: "Commerce", title: "Devanture en centre-ville" },
  { img: "gallery-2.webp", cat: "Bureaux", title: "Façade complète d'un immeuble tertiaire" },
  { img: "gallery-3.webp", cat: "Bureaux", title: "Hall d'entrée et façade vitrée" },
  { img: "gallery-4.webp", cat: "Résidentiel", title: "Véranda et baies vitrées" },
  { img: "gallery-5.webp", cat: "Commerce", title: "Intervention en accès sur corde" },
  { img: "service-commerces.webp", cat: "Commerce", title: "Vitrine de centre commercial" },
  { img: "service-bureaux.webp", cat: "Bureaux", title: "Nettoyage de tour de bureaux" },
  { img: "service-particuliers.webp", cat: "Résidentiel", title: "Maison avec grandes baies vitrées" },
];

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
          <div className="realisations-grid">
            {projects.map((p, i) => (
              <figure className="realisations-grid-card reveal" data-reveal style={{ "--delay": `${(i % 3) * 0.08}s` }} key={i}>
                <img src={`/assets/img/${p.img}`} alt={p.title} />
                <div className="realisations-grid-card__overlay"></div>
                <figcaption>
                  <span className="pill pill--tag">{p.cat}</span>
                  <span className="realisations-grid-card__title">{p.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
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
