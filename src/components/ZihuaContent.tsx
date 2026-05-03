"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TAGS = ["Next.js", "React", "TypeScript", "Tailwind CSS"] as const;

/** Translation key suffixes for each Zihua screenshot's alt text. */
type ZihuaAltKey = "altHero" | "altCarousel" | "altMetrics" | "altVideo";

interface Screenshot {
  readonly src: string;
  readonly altKey: ZihuaAltKey;
}

const SCREENSHOTS: ReadonlyArray<Screenshot> = [
  { src: "/zihuainvestments/Hero.png", altKey: "altHero" },
  { src: "/zihuainvestments/Carousel.png", altKey: "altCarousel" },
  { src: "/zihuainvestments/Metrics.png", altKey: "altMetrics" },
  { src: "/zihuainvestments/Video.png", altKey: "altVideo" },
];

/** Translation key suffixes for the four "key decisions" entries. */
type DecisionKey =
  | { title: "d1Title"; body: "d1Body" }
  | { title: "d2Title"; body: "d2Body" }
  | { title: "d3Title"; body: "d3Body" }
  | { title: "d4Title"; body: "d4Body" };

const DECISIONS: ReadonlyArray<DecisionKey> = [
  { title: "d1Title", body: "d1Body" },
  { title: "d2Title", body: "d2Body" },
  { title: "d3Title", body: "d3Body" },
  { title: "d4Title", body: "d4Body" },
];

/**
 * Client-side content for the Zihua Investments project detail page.
 * Renders the back link, header, summary copy, key-decision list, and
 * screenshot grid. All copy is translated via the `zihua` namespace.
 *
 * @returns The Zihua project page body.
 */
export default function ZihuaContent(): React.ReactElement {
  const t = useTranslations("zihua");

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
              {t("back")}
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
              {t("pageTitle")}
            </h1>

            <p className="text-slate-400 leading-relaxed max-w-2xl mb-4">
              {t("desc1")}
            </p>

            <p className="text-slate-400 leading-relaxed max-w-2xl mb-8">
              {t("desc2")}
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
              {t("keyDecisions")}
            </h2>

            <ul className="flex flex-col gap-6">
              {DECISIONS.map((decision) => (
                <li key={decision.title} className="flex gap-4">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-slate-500 translate-y-2" />
                  <div>
                    <p className="text-slate-200 font-medium mb-1">
                      {t(decision.title)}
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                      {t(decision.body)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-6">
              {t("screenshots")}
            </h2>

            {/* Hero screenshot */}
            <div
              className="relative w-full rounded-xl overflow-hidden border border-slate-700 mb-4"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={SCREENSHOTS[0].src}
                alt={t(SCREENSHOTS[0].altKey)}
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
                    alt={t(shot.altKey)}
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
