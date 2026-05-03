"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

/** Supported locale codes for the portfolio site. */
export type Locale = "en" | "es";

/** Shape of the context exposed by {@link LocaleProvider}. */
interface LocaleContextValue {
  /** The currently active locale. */
  locale: Locale;
  /** Updates the active locale and persists the choice to localStorage. */
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  es: esMessages,
};

const STORAGE_KEY = "locale";
const DEFAULT_LOCALE: Locale = "es";
/** Custom event dispatched whenever the locale changes in this tab. */
const LOCALE_EVENT = "locale-change";

/**
 * Determines whether the given value is a supported {@link Locale}.
 *
 * @param value - Value to test.
 * @returns `true` when the value is "en" or "es".
 */
function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "es";
}

/**
 * Reads the persisted locale from `localStorage`. Falls back to the
 * default locale when nothing is stored or storage is unavailable.
 * Used as the snapshot for {@link useSyncExternalStore} on the client.
 *
 * @returns The current persisted locale.
 */
function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

/**
 * Server-side snapshot. SSR / static export has no `localStorage`, so
 * we always render the default locale on the server and let the client
 * snapshot pick up the stored value during hydration.
 *
 * @returns The default locale.
 */
function readServerLocale(): Locale {
  return DEFAULT_LOCALE;
}

/**
 * Subscribes the React store to locale changes. Listens for both
 * cross-tab `storage` events and the in-tab `locale-change` event we
 * dispatch from {@link LocaleProvider}'s setter.
 *
 * @param onChange - Callback to invoke when the locale changes.
 * @returns Unsubscribe function.
 */
function subscribeToLocale(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(LOCALE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LOCALE_EVENT, onChange);
  };
}

/**
 * Provides locale state and next-intl messages to the component tree.
 * Persists the user's selection in `localStorage` under the key `"locale"`
 * and re-hydrates it on mount. Defaults to Spanish when no preference is
 * stored.
 *
 * Reads from `localStorage` via {@link useSyncExternalStore} to avoid
 * `setState`-in-effect cascading renders (a React 19 anti-pattern).
 *
 * Must be rendered inside a client boundary. Children rendered below
 * this provider gain access to {@link useLocale} and `useTranslations`
 * from `next-intl`.
 *
 * @param props - React children to wrap.
 * @returns The provider tree wrapping `children`.
 */
export function LocaleProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    readStoredLocale,
    readServerLocale
  );

  const setLocale = useCallback((next: Locale): void => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore persistence failures; the dispatch below still updates UI.
    }
    // The native `storage` event only fires across tabs, so dispatch a
    // custom event to notify subscribers in this tab.
    window.dispatchEvent(new Event(LOCALE_EVENT));
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages[locale]}
        timeZone="America/Mexico_City"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}

/**
 * Returns the current locale and a setter for changing it.
 *
 * @returns The locale context value.
 * @throws If invoked outside a {@link LocaleProvider}.
 *
 * @example
 * ```tsx
 * const { locale, setLocale } = useLocale();
 * setLocale("en");
 * ```
 */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
