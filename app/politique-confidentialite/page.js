export const metadata = {
  title: "Politique de confidentialité — Flash Net",
  description: "Comment Flash Net collecte, utilise et protège vos données personnelles.",
};

export default function PolitiqueConfidentialite() {
  return (
    <main id="top">
      <section className="section legal-page">
        <div className="container legal-page__inner">
          <a href="/" className="legal-page__back reveal" data-reveal>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l6-6M5 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Retour à l&apos;accueil
          </a>
          <span className="pill pill--eyebrow reveal" data-reveal>Vos données</span>
          <h1 className="h2 reveal" data-reveal>Politique de confidentialité</h1>

          <div className="legal-content reveal" data-reveal>
            <h2>Responsable du traitement</h2>
            <p>
              Flash Net est responsable du traitement des données personnelles collectées sur
              ce site. Pour toute question relative à vos données, vous pouvez nous contacter à
              l&apos;adresse <a href="mailto:contact@flashnet.fr">contact@flashnet.fr</a>.
            </p>

            <h2>Données collectées</h2>
            <p>
              Lorsque vous remplissez notre formulaire de devis, nous collectons&nbsp;: votre nom,
              votre numéro de téléphone, votre adresse email, votre ville, la nature de votre besoin,
              ainsi que, le cas échéant, une photo et des précisions sur votre demande.
            </p>

            <h2>Finalité du traitement</h2>
            <p>
              Ces informations sont utilisées exclusivement pour traiter votre demande de devis,
              vous recontacter et, si vous devenez client, assurer le suivi de votre prestation.
              Elles ne sont jamais revendues ni transmises à des tiers à des fins commerciales.
            </p>

            <h2>Base légale et durée de conservation</h2>
            <p>
              Le traitement repose sur votre consentement, exprimé lors de l&apos;envoi du
              formulaire, et sur l&apos;intérêt légitime de Flash Net à répondre à votre demande.
              Les données sont conservées pendant 3 ans à compter de notre dernier contact, sauf
              obligation légale de conservation plus longue (facturation, comptabilité).
            </p>

            <h2>Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous
              disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et
              d&apos;opposition sur vos données personnelles. Vous pouvez exercer ces droits à
              tout moment en nous écrivant à <a href="mailto:contact@flashnet.fr">contact@flashnet.fr</a>.
              Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL.
            </p>

            <h2>Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies techniques nécessaires à son bon
              fonctionnement (par exemple pour mémoriser votre première visite et adapter
              l&apos;animation d&apos;accueil). Aucune donnée de navigation n&apos;est partagée
              avec des tiers.
            </p>

            <p className="legal-content__note">
              Cette page est fournie à titre de démonstration ; elle sera revue avec un
              professionnel du droit avant la mise en ligne définitive du site.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
