"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

/** Translation key suffix used to look up each project's tagline copy. */
type TaglineKey = "orbelineTagline" | "zihuaTagline";

interface Project {
  readonly slug: string;
  readonly name: string;
  readonly style: string;
  readonly taglineKey: TaglineKey;
  readonly tags: ReadonlyArray<string>;
  readonly logo: string;
  readonly logoWidth: number;
  readonly logoHeight: number;
  readonly preview: string;
}

const PROJECTS: ReadonlyArray<Project> = [
  {
    slug: "orbeline",
    name: "Orbeline",
    style: "bg-white rounded-md px-2.5 py-1.5",
    taglineKey: "orbelineTagline",
    tags: ["Laravel", "React", "TypeScript", "PostgreSQL"],
    logo: "/orbe_logo.svg",
    logoWidth: 88,
    logoHeight: 17,
    preview: "/orbeline/dashboard.png",
  },
  {
    slug: "zihua-investments",
    name: "Zihua Investments",
    style: "",
    taglineKey: "zihuaTagline",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    logo: "/zihua_logo.png",
    logoWidth: 200,
    logoHeight: 200,
    preview: "/zihuainvestments/Hero.png",
  },
];

/**
 * Portfolio section: renders a grid of project cards with previews,
 * logos, taglines, and tag chips. Each card links to its detail page.
 *
 * @returns The portfolio section element.
 */
export default function Portfolio(): React.ReactElement {
  const t = useTranslations("portfolio");

  return (
    <section id="portfolio" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-8">
          {t("heading")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col rounded-xl bg-slate-800/50 border border-slate-700 hover:border-slate-500 overflow-hidden transition-colors duration-200"
            >
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                <Image
                  src={project.preview}
                  alt={`${project.name} — preview`}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="inline-flex">
                  <div className={project.style}>
                    <Image
                      src={project.logo}
                      alt={`${project.name} logo`}
                      width={project.logoWidth}
                      height={project.logoHeight}
                      className="h-[50px] w-auto"
                    />
                  </div>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed flex-1">
                  {t(project.taglineKey)}
                </p>

                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <span className="text-xs font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-200 mt-1">
                  {t("viewProject")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
