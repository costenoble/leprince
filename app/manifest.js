export default function manifest() {
  return {
    name: "Flash Net — Nettoyage de vitres",
    short_name: "Flash Net",
    description: "Nettoyage de vitres pour professionnels et particuliers en Bretagne.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2efe4",
    theme_color: "#0e7d72",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
