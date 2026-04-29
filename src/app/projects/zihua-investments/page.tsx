import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const TAGS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
] as const;

const SCREENSHOTS: ReadonlyArray<{ src: string; alt: string }> = [
  { src: "/zihuainvestments/Hero.png", alt: "Vista principal de la landing page de Zihua Investments" },
  { src: "/zihuainvestments/Carousel.png", alt: "Carrusel de terrenos disponibles con galería de imágenes" },
  { src: "/zihuainvestments/Metrics.png", alt: "Sección de métricas e indicadores del proyecto" },
  { src: "/zihuainvestments/Video.png", alt: "Sección de video promocional del desarrollo" },
];

/** Project detail page for Zihua Investments. */
export default function ZihuaInvestmentsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <section className="px-4 pt-12 pb-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors duration-200 mb-10"
            >
              ← Proyectos
            </Link>

            <div className="mb-6">
              <div className="inline-flex rounded-lg px-4 py-2.5">
                <Image
                  src="/zihua_logo.png"
                  alt="Zihua Investments"
                  width={120}
                  height={120}
                  className="h-[80px] w-auto"
                  priority
                />
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-medium text-slate-100 mb-4">
              Landing page para venta de terrenos en Zihuatanejo
            </h1>

            <p className="text-slate-400 leading-relaxed max-w-2xl mb-4">
              Zihua Investments es una landing page diseñada para presentar y
              comercializar terrenos en Zihuatanejo, Guerrero. El sitio guía a
              clientes interesados a través de un flujo estructurado de
              selección de terreno, desde la exploración del catálogo hasta el
              contacto directo con el equipo de ventas.
            </p>

            <p className="text-slate-400 leading-relaxed max-w-2xl mb-8">
              Desarrollé el sitio con Next.js y Tailwind CSS, priorizando una
              experiencia visual limpia y carga rápida. El flujo de selección
              de terreno reduce la fricción para el cliente y captura leads
              calificados de forma directa.
            </p>

            <ul className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <li
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-6">
              Decisiones clave
            </h2>

            <ul className="flex flex-col gap-6">
              <li className="flex gap-4">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 translate-y-2" />
                <div>
                  <p className="text-slate-200 font-medium mb-1">Flujo guiado de selección de terreno</p>
                  <p className="text-slate-400 leading-relaxed">
                    En lugar de mostrar un catálogo genérico, el sitio lleva al
                    visitante por un flujo paso a paso que filtra terrenos según
                    sus preferencias —tamaño, ubicación y presupuesto—,
                    reduciendo la incertidumbre y aumentando la tasa de contacto.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 translate-y-2" />
                <div>
                  <p className="text-slate-200 font-medium mb-1">Carrusel visual de alto impacto</p>
                  <p className="text-slate-400 leading-relaxed">
                    Los terrenos se presentan con una galería de imágenes de
                    alta calidad en carrusel interactivo, destacando las vistas
                    y características del entorno natural de Zihuatanejo para
                    conectar emocionalmente con el comprador potencial.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 translate-y-2" />
                <div>
                  <p className="text-slate-200 font-medium mb-1">Métricas del desarrollo como argumento de venta</p>
                  <p className="text-slate-400 leading-relaxed">
                    Una sección de indicadores clave —número de terrenos
                    disponibles, hectáreas, amenidades y plusvalía estimada—
                    convierte datos del proyecto en argumentos concretos para
                    el comprador, generando confianza antes del primer contacto.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 translate-y-2" />
                <div>
                  <p className="text-slate-200 font-medium mb-1">Video promocional integrado</p>
                  <p className="text-slate-400 leading-relaxed">
                    La sección de video ofrece una vista aérea del desarrollo,
                    ambientando al visitante en el entorno costero y reforzando
                    la propuesta de valor sin necesitar texto adicional.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-6">
              Capturas de pantalla
            </h2>

            {/* Hero screenshot */}
            <div
              className="relative w-full rounded-xl overflow-hidden border border-slate-700 mb-4"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={SCREENSHOTS[0].src}
                alt={SCREENSHOTS[0].alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>

            {/* Grid for remaining screenshots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SCREENSHOTS.slice(1).map((shot) => (
                <div
                  key={shot.src}
                  className="relative w-full rounded-xl overflow-hidden border border-slate-700"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 448px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
