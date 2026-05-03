import type { Metadata } from "next";
import ZihuaContent from "@/components/ZihuaContent";

export const metadata: Metadata = {
  title: "Zihua Investments — Landing de Terrenos | Ulises Escamilla",
  description:
    "Landing page para sitio de terrenos en Zihuatanejo con flujos de selección de terreno para clientes interesados.",
  openGraph: {
    title: "Zihua Investments — Landing de Terrenos | Ulises Escamilla",
    description:
      "Landing page para sitio de terrenos en Zihuatanejo con flujos de selección de terreno para clientes interesados.",
    url: "https://escamilla.dev/projects/zihua-investments",
    siteName: "Ulises Escamilla",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zihua Investments — Landing de Terrenos | Ulises Escamilla",
    description:
      "Landing page para sitio de terrenos en Zihuatanejo con flujos de selección de terreno para clientes interesados.",
  },
};

/**
 * Server-component wrapper for the Zihua Investments project detail page.
 * Owns the route's static `metadata` export so it remains crawlable,
 * and delegates rendering to the localized client component.
 *
 * @returns The Zihua Investments page tree.
 */
export default function ZihuaInvestmentsPage(): React.ReactElement {
  return <ZihuaContent />;
}
