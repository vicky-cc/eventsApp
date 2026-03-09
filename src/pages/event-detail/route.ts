const EVENT_ID_PATTERN = /^[A-Za-z0-9_.:-]+$/;

function normalizeEventId(rawId: string): string | null {
  let decodedId: string;

  try {
    decodedId = decodeURIComponent(rawId);
  } catch {
    return null;
  }

  if (!EVENT_ID_PATTERN.test(decodedId)) {
    return null;
  }

  return decodedId;
}

export function buildEventDetailUrl(id: string): string {
  return `/pages/event-detail/index?id=${encodeURIComponent(id)}`;
}

export function parseEventIdFromLoadOptions(options: unknown): string | null {
  if (!options || typeof options !== "object") {
    return null;
  }

  const idValue = (options as { id?: unknown }).id;

  if (typeof idValue !== "string") {
    return null;
  }

  return normalizeEventId(idValue);
}
