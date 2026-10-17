import { content } from "./content";
import { fieldsPayload, MAX_BODY_BYTES, validateSubmission, type SubmissionKind, type SubmissionResponse } from "./validation";

function response(body: SubmissionResponse, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

class BodyError extends Error {
  constructor(readonly statusCode: number, readonly publicMessage: string) { super("Invalid submission body"); }
}

function hasMatchingOrigin(request: Request): boolean {
  const value = request.headers.get("origin");
  if (value === null) return true;
  try {
    const origin = new URL(value);
    if (!["http:", "https:"].includes(origin.protocol) || origin.username || origin.password
      || origin.pathname !== "/" || origin.search || origin.hash || value !== origin.origin) return false;

    const requestUrl = new URL(request.url);
    // Host is the browser-visible authority. Next's local Request.url can instead
    // use localhost when the browser connected to 127.0.0.1. Never use a forwarded host.
    const authority = request.headers.get("host") ?? requestUrl.host;
    if (!authority || /[\s/\\@?#,]/.test(authority)) return false;
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.toLowerCase();
    const protocol = forwardedProtocol === "http" || forwardedProtocol === "https"
      ? `${forwardedProtocol}:` : requestUrl.protocol;
    if (!["http:", "https:"].includes(protocol)) return false;
    return origin.origin === new URL(`${protocol}//${authority}`).origin;
  } catch { return false; }
}

async function readBody(request: Request): Promise<unknown> {
  const messages = content.ui.forms;
  const declaredLength = Number(request.headers.get("content-length"));
  if (declaredLength > MAX_BODY_BYTES) throw new BodyError(413, messages.validation.tooLarge);
  const reader = request.body?.getReader();
  if (!reader) throw new BodyError(400, messages.status.invalidJson);
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new BodyError(413, messages.validation.tooLarge);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const payload = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) { payload.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(payload)); }
  catch { throw new BodyError(400, messages.status.invalidJson); }
}

/** Validation-only by default. No personal data is logged or stored by this handler. */
export async function handleSubmission(request: Request, kind: SubmissionKind): Promise<Response> {
  const messages = content.ui.forms;
  if (!hasMatchingOrigin(request)) {
    return response({ ok: false, status: "error", message: messages.status.invalidOrigin }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return response({ ok: false, status: "error", message: messages.status.invalidContentType }, 415);
  }

  try {
    const payload = await readBody(request);
    const result = validateSubmission(payload, kind);
    if (!result.valid) {
      return response({ ok: false, status: "invalid", message: result.payloadValid ? messages.status.invalid : messages.validation.invalidPayload, errors: result.errors }, 422);
    }
    const webhook = kind === "contact" ? process.env.ADUCREST_CONTACT_WEBHOOK_URL : process.env.ADUCREST_ADMISSION_WEBHOOK_URL;
    if (!webhook) {
      return response({ ok: true, status: "validated", message: kind === "contact" ? messages.status.contactValidated : messages.status.applicationValidated }, 200);
    }
    let endpoint: URL;
    try { endpoint = new URL(webhook); }
    catch { return response({ ok: false, status: "error", message: messages.status.unavailable }, 503); }
    if (endpoint.protocol !== "https:" || endpoint.username || endpoint.password || endpoint.hash) {
      return response({ ok: false, status: "error", message: messages.status.unavailable }, 503);
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);
    try {
      const token = kind === "contact" ? process.env.ADUCREST_CONTACT_WEBHOOK_TOKEN : process.env.ADUCREST_ADMISSION_WEBHOOK_TOKEN;
      const delivered = await fetch(endpoint, {
        method: "POST", redirect: "error", cache: "no-store", signal: controller.signal,
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ type: kind, submittedAt: new Date().toISOString(), fields: fieldsPayload(result.values, kind) }),
      });
      await delivered.body?.cancel();
      if (!delivered.ok) return response({ ok: false, status: "error", message: messages.status.deliveryFailed }, 502);
      return response({ ok: true, status: "delivered", message: kind === "contact" ? messages.status.contactDelivered : messages.status.applicationDelivered }, 200);
    } catch { return response({ ok: false, status: "error", message: messages.status.deliveryFailed }, 502); }
    finally { clearTimeout(timeout); }
  } catch (error) {
    if (error instanceof BodyError) return response({ ok: false, status: "error", message: error.publicMessage }, error.statusCode);
    return response({ ok: false, status: "error", message: messages.status.error }, 500);
  }
}
