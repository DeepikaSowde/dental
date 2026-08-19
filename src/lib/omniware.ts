import crypto from "crypto";

// ── Omniware hash (Payment Gateway API v2, Appendix 2) ────────────────────────
// Algorithm: start hash_data with the SALT, then append every posted field's
// value — fields sorted by key, empty/blank values skipped, pipe-delimited and
// trimmed — then SHA-512 and upper-case. The `hash` field itself is never part
// of the calculation. The SALT is secret and must stay server-side only.
export function omniwareHash(
  params: Record<string, string | number | null | undefined>,
  salt: string,
): string {
  const keys = Object.keys(params)
    .filter((k) => k !== "hash")
    .sort();

  let hashData = salt;
  for (const key of keys) {
    const value = params[key];
    if (value !== undefined && value !== null && String(value).trim().length > 0) {
      hashData += "|" + String(value).trim();
    }
  }

  return crypto.createHash("sha512").update(hashData).digest("hex").toUpperCase();
}

// Verifies a response coming back from Omniware. Per the spec, if the response
// carries no hash there is nothing to check (returns true); otherwise we
// recompute the hash over every returned field except `hash` and compare.
// ALWAYS call this before trusting a "success" — a browser-tampered failure can
// otherwise be flipped to success.
export function verifyOmniwareResponseHash(
  response: Record<string, string>,
  salt: string,
): boolean {
  const received = response.hash;
  if (!received) return true;
  const calculated = omniwareHash(response, salt);
  // constant-time compare on equal-length hex strings
  if (received.length !== calculated.length) return false;
  return crypto.timingSafeEqual(
    Buffer.from(received.toUpperCase()),
    Buffer.from(calculated),
  );
}
