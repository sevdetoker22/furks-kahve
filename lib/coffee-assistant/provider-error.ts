const knownCodes = ["customer_verification_required", "insufficient_funds", "quota_for_entity_exceeded", "authentication_error", "model_not_found", "forbidden"] as const;

// Never log raw provider errors: they can include the entire request. Retain
// only an allowlisted operational category from the response/cause chain.
export function providerErrorCode(error: unknown): string {
  let current = error;
  for (let depth = 0; depth < 4; depth++) {
    if (typeof current !== "object" || current === null) break;
    if ("message" in current && typeof current.message === "string") {
      const message = current.message;
      const code = knownCodes.find((candidate) => message.includes(candidate));
      if (code) return code;
    }
    if ("responseBody" in current && typeof current.responseBody === "string") {
      try {
        const parsed = JSON.parse(current.responseBody);
        const code = knownCodes.find((candidate) => candidate === parsed?.error?.code || candidate === parsed?.error?.type);
        if (code) return code;
      } catch { /* A provider can return a non-JSON error page. */ }
    }
    current = "cause" in current ? current.cause : undefined;
  }
  return "provider_error";
}
