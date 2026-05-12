import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ulises Escamilla — Desarrollador Full Stack en México | Laravel & React",
  description:
    "Desarrollador Full Stack senior en México. Construyo aplicaciones web y móviles con Laravel, React y TypeScript. Entrego código limpio, arquitecturas sólidas y resultados medibles para empresas en México y LATAM.",
  keywords: [
    "desarrollador web freelance México",
    "desarrollo web profesional México",
    "programador Laravel React México",
    "desarrollo aplicaciones web CDMX",
    "full stack developer México",
    "desarrollador TypeScript México",
    "desarrollo software empresas México",
    "React Native México",
  ],
  authors: [{ name: "Ulises Escamilla" }],
  creator: "Ulises Escamilla",
  metadataBase: new URL("https://escamilla.dev"),
  alternates: {
    canonical: "/",
    languages: {
      "es-MX": "/",
    },
  },
  openGraph: {
    title: "Ulises Escamilla — Desarrollador Full Stack en México",
    description:
      "Construyo aplicaciones web y móviles con Laravel, React y TypeScript. Arquitecturas sólidas, resultados medibles para empresas en México y LATAM.",
    url: "https://escamilla.dev",
    siteName: "Ulises Escamilla",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ulises Escamilla — Desarrollador Full Stack en México",
    description:
      "Construyo aplicaciones web y móviles con Laravel, React y TypeScript. Resultados medibles para empresas en México y LATAM.",
    creator: "@ulisesescamilla",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ulises Escamilla",
  jobTitle: "Senior Full Stack Developer",
  url: "https://escamilla.dev",
  email: "ulisescruzescamilla@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MX",
  },
  knowsAbout: [
    "Laravel",
    "React",
    "TypeScript",
    "React Native",
    "AWS",
    "Docker",
    "PostgreSQL",
    "CI/CD",
  ],
  sameAs: [
    "https://github.com/ulisescruzescamilla",
    "https://www.linkedin.com/in/ulises-escamilla/",
  ],
};

/**
 * Root layout for the portfolio site.
 * Wraps the entire application in {@link LocaleProvider} so that any
 * descendant client component can access translations via `useTranslations`
 * from `next-intl`. The `<html lang>` attribute stays static (`es-MX`)
 * because we use `output: 'export'` and locale switching happens client-side.
 *
 * @param props - The layout props.
 * @param props.children - Page content to render.
 * @returns The root HTML document.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
