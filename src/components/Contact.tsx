"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// Accepts email OR a phone number (7–15 digits, optional leading +/spaces/dashes)
function isValidContact(value: string): boolean {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^\+?[\d\s\-().]{7,20}$/;
  return emailRe.test(value) || phoneRe.test(value);
}

export default function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // Honeypot — must stay empty
  const [honeypot, setHoneypot] = useState("");

  function handleContactBlur() {
    if (contact && !isValidContact(contact)) {
      setContactError("Ingresa un correo o teléfono válido.");
    } else {
      setContactError("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot) return; // silent bot drop

    if (!isValidContact(contact)) {
      setContactError("Ingresa un correo o teléfono válido.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const data: { error?: string } = await res.json().catch(() => ({}));
      setErrorMsg(
        res.status === 429
          ? "Demasiados intentos. Espera unos minutos e intenta de nuevo."
          : (data.error ?? "Algo salió mal. Intenta de nuevo.")
      );
      setStatus("error");
    } catch {
      setErrorMsg("Error de red. Revisa tu conexión e intenta de nuevo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section
        id="contact"
        className="flex items-center justify-center px-4 py-20 lg:py-32"
      >
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-600/15 border border-blue-500/30 mb-6">
            <svg
              aria-hidden="true"
              className="w-7 h-7 text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-slate-100 mb-3">
            ¡Mensaje enviado!
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Gracias por escribirme, {name}. Me pondré en contacto contigo
            pronto.
          </p>
        </div>
      </section>
    );
  }

  const isLoading = status === "loading";

  return (
    <section id="contact" className="px-4 py-20 lg:py-32">
      <div className="mx-auto max-w-xl">
        <h2 className="text-3xl font-medium text-slate-100 mb-2">
          Hablemos
        </h2>
        <p className="text-slate-400 mb-10">
          ¿Tienes un proyecto en mente? Cuéntame.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from humans, traps bots */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            className="sr-only"
          />

          <div className="space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Nombre
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={100}
                disabled={isLoading}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-md bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
              />
            </div>

            <div>
              <label
                htmlFor="contact-contact"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Correo o teléfono
              </label>
              <input
                id="contact-contact"
                type="text"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  if (contactError) setContactError("");
                }}
                onBlur={handleContactBlur}
                required
                maxLength={100}
                disabled={isLoading}
                placeholder="tu@correo.com o +52 55 1234 5678"
                aria-describedby={contactError ? "contact-contact-error" : undefined}
                aria-invalid={!!contactError}
                className={`w-full px-4 py-3 rounded-md bg-slate-800 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition ${
                  contactError ? "border-red-500" : "border-slate-700"
                }`}
              />
              {contactError && (
                <p id="contact-contact-error" role="alert" className="text-xs text-red-400 mt-1">
                  {contactError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Mensaje
              </label>
              <textarea
                id="contact-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={2000}
                rows={5}
                disabled={isLoading}
                placeholder="Cuéntame sobre tu proyecto..."
                className="w-full px-4 py-3 rounded-md bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 resize-none transition"
              />
              <p className="text-xs text-slate-500 mt-1 text-right">
                {message.length}/2000
              </p>
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-red-400">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 min-h-[44px]"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Enviando…
                </>
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
