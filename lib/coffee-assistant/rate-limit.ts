// Best-effort burst protection per running server instance. A shared Gateway
// project budget / platform rate limit is needed for a global spending cap.
export function createBurstLimiter() {
  const visits = new Map<string, { count: number; expires: number }>();
  return (key: string, now = Date.now()): number => {
    for (const [id, visit] of visits) if (visit.expires <= now) visits.delete(id);
    const previous = visits.get(key);
    if (previous && previous.count >= 6) return Math.ceil((previous.expires - now) / 1_000);
    if (!previous && visits.size >= 1_000) return 60;
    visits.set(key, { count: (previous?.count ?? 0) + 1, expires: previous?.expires ?? now + 60_000 });
    return 0;
  };
}
