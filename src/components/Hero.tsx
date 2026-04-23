import Image from "next/image";
import Link from "next/link";
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

const PROOF_STATS: ReadonlyArray<{ num: string; label: string }> = [
  { num: "8+", label: "años construyendo apps en producción" },
  { num: "20k+", label: "usuarios migrados sin pérdida de datos" },
  { num: "−60%", label: "ciclo de ventas para cliente enterprise" },
];

export default function Hero() {
  return (
    <section id="about" className="flex-1 flex items-center px-4 py-14 lg:py-32">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Left column */}
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400 mb-3">
            Senior Full Stack Developer · Remoto
          </p>

          <h1 className="text-3xl lg:text-5xl font-medium leading-snug text-slate-100 mb-5">
            Convierto problemas complejos en
            <br />
            <em className="not-italic text-blue-500">
              software que escala y vende.
            </em>
          </h1>

          <p className="text-sm lg:text-base leading-relaxed text-slate-400 max-w-xl mb-8">
            Construyo aplicaciones web y móviles con Laravel, React y TypeScript.
            Entrego código limpio, arquitecturas sólidas y resultados medibles —
            sin que tengas que explicar lo mismo dos veces.
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
              Hablemos de tu proyecto ↗
            </Link>
            <Link
              href="#resume"
              className="text-sm font-medium px-6 py-3 rounded-md border border-slate-600 text-slate-100 hover:border-slate-400 transition-colors duration-200 min-h-[44px] flex items-center"
            >
              Ver resume
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
                  {stat.label}
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
