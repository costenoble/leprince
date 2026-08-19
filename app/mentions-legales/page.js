export const metadata = {
  title: "Mentions légales — Flash Net",
  description: "Mentions légales du site Flash Net, nettoyage de vitres pour professionnels et particuliers en Bretagne.",
};

export default function MentionsLegales() {
  return (
    <main id="top">
      <section className="section legal-page">
        <div className="container legal-page__inner">
          <span className="pill pill--eyebrow reveal" data-reveal>Informations légales</span>
          <h1 className="h2 reveal" data-reveal>Mentions légales</h1>

          <div className="legal-content reveal" data-reveal>
            <h2>Éditeur du site</h2>
            <p>
              Le site Flash Net est édité par Flash Net, entreprise de nettoyage de vitres pour
              professionnels et particuliers, dont le siège est situé en Bretagne.<br />
              SIRET&nbsp;: à compléter — Directeur de la publication&nbsp;: à compléter.<br />
              Contact&nbsp;: <a href="mailto:contact@flashnet.fr">contact@flashnet.fr</a>
            </p>

            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par un prestataire d&apos;hébergement web dont les coordonnées
              complètes seront précisées ici lors de la mise en production du site.
            </p>

            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, mises en page, éléments
              graphiques) est la propriété de Flash Net, sauf mention contraire. Toute reproduction
              ou représentation, totale ou partielle, sans autorisation préalable est interdite.
              Les photographies utilisées sur cette version de démonstration proviennent de
              Wikimedia Commons et seront remplacées par des photos des chantiers réels de
              Flash Net avant mise en ligne définitive.
            </p>

            <h2>Données personnelles</h2>
            <p>
              Le traitement des données transmises via le formulaire de devis est détaillé dans
              notre <a href="/politique-confidentialite">politique de confidentialité</a>.
            </p>

            <h2>Cookies</h2>
            <p>
              Ce site n&apos;utilise que des cookies strictement nécessaires à son fonctionnement.
              Aucun cookie de mesure d&apos;audience ou publicitaire n&apos;est déposé sans consentement.
            </p>

            <p className="legal-content__note">
              Cette page est fournie à titre de démonstration ; les informations marquées
              « à compléter » seront renseignées avec les données réelles de l&apos;entreprise
              avant la mise en ligne du site.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
