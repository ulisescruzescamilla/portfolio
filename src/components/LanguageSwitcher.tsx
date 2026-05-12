"use client";

import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Toggle control for switching between English and Spanish.
 * Renders as `EN | ES` with the active locale highlighted.
 *
 * Must be rendered inside a `LocaleProvider`.
 *
 * @returns The language switcher element.
 */
export default function LanguageSwitcher(): React.ReactElement {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-1.5 py-0.5 rounded transition-colors duration-200 ${
          locale === "en"
            ? "text-slate-100"
            : "text-slate-500 hover:text-slate-300"
        }`}
        aria-pressed={locale === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span aria-hidden="true" className="text-slate-600">
        |
      </span>
      <button
        type="button"
        onClick={() => setLocale("es")}
        className={`px-1.5 py-0.5 rounded transition-colors duration-200 ${
          locale === "es"
            ? "text-slate-100"
            : "text-slate-500 hover:text-slate-300"
        }`}
        aria-pressed={locale === "es"}
        aria-label="Cambiar a español"
      >
        ES
      </button>
    </div>
  );
}
