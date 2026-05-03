"use client";

import { useTranslations } from "next-intl";
import reactIcon from "thesvg/react";
import phpIcon from "thesvg/php";
import pythonIcon from "thesvg/python";
import html5Icon from "thesvg/html5";
import cssIcon from "thesvg/css";
import gitIcon from "thesvg/git";
import linuxIcon from "thesvg/linux";
import dockerIcon from "thesvg/docker";
import githubIcon from "thesvg/github";
import mysqlIcon from "thesvg/mysql";
import ubuntuIcon from "thesvg/ubuntu";
import awsIcon from 'thesvg/aws';
import javascriptIcon from "thesvg/javascript";
import typeScriptIcon from "thesvg/typescript";
import laravelIcon from "thesvg/laravel";
import nextdotjsIcon from "thesvg/nextdotjs";
import claudeIcon from "thesvg/claude";
import tailwindcssIcon from "thesvg/tailwind-css";


const skills = [
  { name: "React", icon: reactIcon.svg },
  { name: "PHP", icon: phpIcon.svg },
  { name: "Python", icon: pythonIcon.svg },
  { name: "JavaScript", icon: javascriptIcon.svg},
  { name: "TypeScript", icon: typeScriptIcon.svg},
  { name: "HTML5", icon: html5Icon.svg },
  { name: "CSS3", icon: cssIcon.svg },
  { name: "Git", icon: gitIcon.svg },
  { name: "Linux", icon: linuxIcon.svg },
  { name: "Docker", icon: dockerIcon.svg },
  { name: "GitHub", icon: githubIcon.svg },
  { name: "MySQL", icon: mysqlIcon.svg },
  { name: "Ubuntu", icon: ubuntuIcon.svg },
  { name: "AWS", icon: awsIcon.svg},
  { name: "Laravel", icon: laravelIcon.svg},
  { name: "Next.js", icon: nextdotjsIcon.svg },
  { name: "React Native", icon: reactIcon.svg },
  { name: "Claude", icon: claudeIcon.svg },
  { name: "Tailwind CSS", icon: tailwindcssIcon.svg },
];

/**
 * Skills section: renders a grid of technologies the author works with.
 * Each entry pairs an inline SVG icon with a visible label so the skill
 * names remain crawlable.
 *
 * @returns The skills section element.
 */
export default function Skills(): React.ReactElement {
  const t = useTranslations("skills");

  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-8">
          {t("heading")}
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-slate-500 transition-colors duration-300">
                <div
                  className="w-10 h-10 [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: skill.icon }}
                />
              </div>
              <span className="text-slate-500 text-xs font-medium group-hover:text-slate-400 transition-colors duration-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
