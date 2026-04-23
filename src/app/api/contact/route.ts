import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// In-memory rate limiter — fixed window per IP.
// For single-instance deployments (portfolio). Resets on server restart.
// Real DDoS protection belongs at the edge (Cloudflare, Vercel firewall, etc.)
// ---------------------------------------------------------------------------
interface RateEntry {
  count: number;
  windowStart: number;
}

const rateStore = new Map<string, RateEntry>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_PER_WINDOW = 5;

function pruneStale() {
  const now = Date.now();
  for (const [ip, entry] of rateStore) {
    if (now - entry.windowStart > WINDOW_MS) rateStore.delete(ip);
  }
}

function isAllowed(ip: string): boolean {
  pruneStale();
  const now = Date.now();
  const entry = rateStore.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateStore.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count++;
  return true;
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// Strip HTML tags and null bytes — inputs go to Google Forms, not a DB,
// but sanitize anyway to prevent stored XSS if ever displayed elsewhere.
function sanitize(value: string): string {
  return value
    .replace(/\0/g, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function isNonEmptyString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

function isValidContact(value: string): boolean {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^\+?[\d\s\-().]{7,20}$/;
  return emailRe.test(value) || phoneRe.test(value);
}

export async function POST(req: NextRequest) {
  // Content-Type guard
  const ct = req.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported Media Type" }, { status: 415 });
  }

  // Rate limit
  const ip = getIp(req);
  if (!isAllowed(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "900" } }
    );
  }

  // Parse
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { name, contact, message } = body as Record<string, unknown>;

  // Validate
  if (!isNonEmptyString(name, 100)) {
    return NextResponse.json(
      { error: "Name must be 1–100 characters" },
      { status: 422 }
    );
  }
  if (!isNonEmptyString(contact, 100) || !isValidContact(contact.trim())) {
    return NextResponse.json(
      { error: "A valid email or phone number is required" },
      { status: 422 }
    );
  }
  if (!isNonEmptyString(message, 2000)) {
    return NextResponse.json(
      { error: "Message must be 1–2000 characters" },
      { status: 422 }
    );
  }

  const cleanName = sanitize(name);
  const cleanContact = sanitize(contact);
  const cleanMessage = sanitize(message);

  // Dev shortcut — skip Web3Forms when env var isn't configured
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error("[contact] Missing WEB3FORMS_ACCESS_KEY");
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  // Forward to Web3Forms
  try {
    const payload = JSON.stringify({
      access_key: accessKey,
      name: cleanName,
      contact: cleanContact,
      message: cleanMessage,
    });

    const w3Res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: payload,
    });

    const w3Data: { success?: boolean } = await w3Res.json().catch(() => ({}));

    if (!w3Res.ok || !w3Data.success) {
      throw new Error(`Web3Forms responded with ${w3Res.status}`);
    }
  } catch (err) {
    console.error("[contact] Web3Forms error:", err);
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
