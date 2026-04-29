import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const TAGS = [
  "Laravel",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "AWS",
] as const;

const SCREENSHOTS: ReadonlyArray<{ src: string; alt: string }> = [
  { src: "/orbeline/login.png", alt: "Pantalla de inicio de sesión" },
  { src: "/orbeline/dashboard.png", alt: "Dashboard principal con métricas y resumen de operaciones" },
  { src: "/orbeline/invoice-viewer.png", alt: "Visor de facturas con detalle de partidas" },
  { src: "/orbeline/certificate-viewer.png", alt: "Visor de certificados digitales" },
  { src: "/orbeline/payments.png", alt: "Módulo de gestión de pagos" },
  { src: "/orbeline/quotations.png", alt: "Módulo de cotizaciones" },
];

export default function OrbelinePage() {
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
              <div className="bg-white inline-flex rounded-lg px-4 py-2.5">
                <Image
                  src="/orbe_logo.svg"
                  alt="Orbeline"
                  width={140}
                  height={26}
                  className="h-[26px] w-auto"
                  priority
                />
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-medium text-slate-100 mb-4">
              Plataforma ERP para operaciones de seguros
            </h1>

            <p className="text-slate-400 leading-relaxed max-w-2xl mb-4">
              Orbeline centraliza la operación comercial de empresas mexicanas en
              un solo sistema: facturación electrónica, cotizaciones, pagos y
              pólizas digitales. El dashboard unificado da visibilidad
              inmediata sobre el estado financiero del negocio sin saltar entre
              herramientas.
            </p>

            <p className="text-slate-400 leading-relaxed max-w-2xl mb-8">
              Desarrollé el backend con Laravel y la interfaz con React y
              TypeScript, integrando validación de CFDI y generación de PDF en
              tiempo real. El sistema maneja múltiples clientes con roles y
              permisos diferenciados, desplegado en AWS con contenedores Docker.
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
                  <p className="text-slate-200 font-medium mb-1">Métricas de cierre por vendedor</p>
                  <p className="text-slate-400 leading-relaxed">
                    Cada vendedor accede a su propio dashboard con métricas de
                    cierre mensual —primas emitidas, cobradas y pendientes— sin
                    depender de reportes manuales. La visibilidad inmediata sobre
                    su estado financiero les permite tomar decisiones antes de que
                    cierre el mes.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 translate-y-2" />
                <div>
                  <p className="text-slate-200 font-medium mb-1">Visibilidad para administradores y reparto de incentivos</p>
                  <p className="text-slate-400 leading-relaxed">
                    Los administradores pueden comparar el rendimiento de cierre
                    entre vendedores con datos históricos y de tendencia,
                    facilitando la asignación de bonos e incentivos basada en
                    evidencia y no en percepciones.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 translate-y-2" />
                <div>
                  <p className="text-slate-200 font-medium mb-1">Flujo de trabajo end-to-end</p>
                  <p className="text-slate-400 leading-relaxed">
                    La interfaz sigue el orden natural de la operación: cotizar →
                    alta de cliente → emisión de póliza → cobro → facturación
                    electrónica → corte y dispersión de comisiones. Cada paso
                    avanza al siguiente sin saltar de herramienta, reduciendo
                    errores de captura y tiempos muertos.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 translate-y-2" />
                <div>
                  <p className="text-slate-200 font-medium mb-1">Reglas de negocio codificadas para cotización ágil</p>
                  <p className="text-slate-400 leading-relaxed">
                    Las reglas para cotizar —rangos de edad, coberturas
                    disponibles por producto, recargos y descuentos— vivían
                    dispersas en la experiencia de los vendedores más antiguos.
                    Plasmarlas en la plataforma acortó el onboarding de nuevos
                    vendedores, eliminó errores de cálculo y homogeneizó las
                    propuestas comerciales.
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 translate-y-2" />
                <div>
                  <p className="text-slate-200 font-medium mb-1">Pólizas con identidad de marca</p>
                  <p className="text-slate-400 leading-relaxed">
                    Cada póliza se genera en PDF con el logotipo y colores de la
                    aseguradora y el broker, eliminando el trabajo manual de
                    diseño y maquetación. La emisión pasa de minutos a segundos
                    y mantiene consistencia visual en todos los documentos.
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
            <div className="relative w-full rounded-xl overflow-hidden border border-slate-700 mb-4" style={{ aspectRatio: "16/9" }}>
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
