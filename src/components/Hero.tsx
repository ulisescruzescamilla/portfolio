"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import heroImage from "../../public/hero.png";

const TECH_PILLS = [
  "Laravel",
  "React",
  "TypeScript",
  "React Native",
  "AWS",
  "Docker",
  "PostgreSQL",
  "CI/CD",
] as const;

/** Translation key suffixes for the proof-stat labels. */
const PROOF_STATS: ReadonlyArray<{ num: string; labelKey: "yearsLabel" | "usersLabel" | "salesLabel" }> = [
  { num: "8+", labelKey: "yearsLabel" },
  { num: "20k+", labelKey: "usersLabel" },
  { num: "−60%", labelKey: "salesLabel" },
];

/**
 * Hero section: headline, intro copy, tech pills, primary CTAs, and proof stats.
 * Acts as the landing surface and contains the page's single `<h1>`.
 *
 * @returns The hero section element.
 */
export default function Hero(): React.ReactElement {
  const t = useTranslations("hero");

  return (
    <section id="about" className="flex-1 flex items-center px-4 py-14 lg:py-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Left column */}
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400 mb-3">
            {t("badge")}
          </p>

          <h1 className="text-3xl lg:text-5xl font-medium leading-snug text-slate-100 mb-5">
            {t("headline")}
            <br />
            <em className="not-italic text-blue-500">
              {t("headlineEmphasis")}
            </em>
          </h1>

          <p className="text-sm lg:text-base leading-relaxed text-slate-400 max-w-xl mb-8">
            {t("description")}
          </p>

          <ul className="flex flex-wrap gap-2 mb-8">
            {TECH_PILLS.map((pill) => (
              <li
                key={pill}
                className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400"
              >
                {pill}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="#contact"
              className="text-sm font-medium px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-200 min-h-[44px] flex items-center"
            >
              {t("cta")}
            </Link>
            <Link
              href="#resume"
              className="text-sm font-medium px-6 py-3 rounded-md border border-slate-600 text-slate-100 hover:border-slate-400 transition-colors duration-200 min-h-[44px] flex items-center"
            >
              {t("resume")}
            </Link>
          </div>

          <hr className="border-slate-800 mb-8" />

          <dl className="grid grid-cols-3 gap-2 lg:gap-4">
            {PROOF_STATS.map((stat) => (
              <div key={stat.num}>
                <dd className="text-2xl font-medium text-slate-100">
                  {stat.num}
                </dd>
                <dt className="text-xs text-slate-400 leading-snug mt-0.5">
                  {t(stat.labelKey)}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Right column — after content on mobile, beside it on desktop */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={heroImage}
            alt="Ulises Escamilla, Senior Full Stack Developer"
            sizes="(max-width: 1024px) 70vw, 40vw"
            className="h-auto w-full max-w-[260px] sm:max-w-xs lg:max-w-md"
            placeholder="blur"
            preload
          />
        </div>
      </div>
    </section>
  );
}
