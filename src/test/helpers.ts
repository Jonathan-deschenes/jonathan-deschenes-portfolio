export function jsonRequest(
  url: string,
  body: unknown,
  headers: Record<string, string> = {}
) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

export function rawRequest(
  url: string,
  rawBody: string,
  headers: Record<string, string> = {}
) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: rawBody,
  });
}

export function ipHeader(ip: string): Record<string, string> {
  return { "x-forwarded-for": ip };
}
