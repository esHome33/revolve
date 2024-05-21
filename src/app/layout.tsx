import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Revolve simulator - casse tête en bois",
  metadataBase: new URL("https://revolve2.vercel.app"),
  description: "Revolve - Tour de billes - wooden game simulator - cylinder brain teaser - simulateur de casse tête cylindrique",
  generator: "Next.js",
  keywords: ["nextjs", "puzzle game", "Revolve", "simulator", "casse tête", "simulateur",
    "wooden game", "jeu en bois", "Rubiks cube",
    "Tour de billes", "cylinder brain teaser", "brain teaser"],
  authors: {
    name: "ESHome33",
    url: "https://github.com/esHome33"
  },
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
  openGraph: {
    title: "Revolve simulator - casse tête en bois",
    description: "Revolve : align 5 same color squares or balls in each of the 4 columns ! Rotate the two rings and place the empty space cleverly.",
    url: "https://revolve2.vercel.app",
    images: [
      '/opengraph-image.png',
    ],
    authors: ['ESHome33', 'https://github.com/esHome33'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
