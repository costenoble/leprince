import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingWidgets from "./components/FloatingWidgets";
import PwaRegister from "./components/PwaRegister";

export const metadata = {
  title: "Flash Net — Nettoyage de vitres pour professionnels & particuliers",
  description:
    "Nettoyage de vitres, devantures, bureaux et particuliers. Devis gratuit sous 24h, produits écologiques, intervention rapide.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Flash Net",
  },
};

export const viewport = {
  themeColor: "#0e7d72",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingWidgets />
        <PwaRegister />
      </body>
    </html>
  );
}
