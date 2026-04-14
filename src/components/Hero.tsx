import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex-1 flex items-center justify-center px-4 py-20 lg:py-32"
    >
      <div className="max-w-3xl w-full">
        {/* Greeting */}
        <p className="text-slate-400 text-lg mb-3 font-light tracking-wide">
          Hi, I&apos;m Ulises 👋
        </p>

        {/* Headline */}
        <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
          <span className="text-slate-100">Full-Stack</span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
            Developer
          </span>
          <br />
          <span className="text-slate-100">&amp; Backend Developer</span>
        </h1>

        {/* Bio */}
        <p className="text-slate-400 text-lg lg:text-xl leading-relaxed max-w-xl mb-10 font-light">
          I build modern, performant web applications with clean code and
          thoughtful design. Passionate about Linux, web developer experience.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-700 text-white font-semibold text-sm hover:from-blue-500 hover:to-violet-600 transition-all duration-300 shadow-lg shadow-blue-900/30"
          >
            Get in touch
          </Link>
          <Link
            href="#resume"
            className="px-6 py-3 rounded-lg border border-slate-600 text-slate-300 font-semibold text-sm hover:border-slate-400 hover:text-slate-100 transition-all duration-300"
          >
            View resume
          </Link>
        </div>
      </div>
    </section>
  );
}
