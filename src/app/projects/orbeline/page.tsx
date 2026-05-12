import type { Metadata } from "next";
import OrbelineContent from "@/components/OrbelineContent";

export const metadata: Metadata = {
  title: "Orbeline — Plataforma ERP | Ulises Escamilla",
  description:
    "Orbeline es una plataforma ERP que centraliza la gestión de facturas, cotizaciones, pagos y certificados digitales para empresas en México.",
  openGraph: {
    title: "Orbeline — Plataforma ERP | Ulises Escamilla",
    description:
      "Plataforma ERP que centraliza la gestión de facturas, cotizaciones, pagos y certificados digitales para empresas en México.",
    url: "https://escamilla.dev/projects/orbeline",
    siteName: "Ulises Escamilla",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbeline — Plataforma ERP | Ulises Escamilla",
    description:
      "Plataforma ERP que centraliza la gestión de facturas, cotizaciones, pagos y certificados digitales para empresas en México.",
  },
};

/**
 * Server-component wrapper for the Orbeline project detail page.
 * Owns the route's static `metadata` export so it remains crawlable,
 * and delegates rendering to the localized client component.
 *
 * @returns The Orbeline page tree.
 */
export default function OrbelinePage(): React.ReactElement {
  return <OrbelineContent />;
}
