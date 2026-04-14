export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-sm">
        <p>
          &copy; {year}{" "}
          <span className="text-slate-400 font-medium">Ulises Escamilla</span>.
          All rights reserved.
        </p>
        <p className="text-slate-600 text-xs">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
