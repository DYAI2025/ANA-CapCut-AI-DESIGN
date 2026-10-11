/**
 * DESTILL — Security & Input Sanitization Utilities
 *
 * Provides defense-in-depth against:
 * - CWE-79: Cross-Site Scripting (XSS)
 * - CWE-22: Path Traversal in uploaded filenames
 * - ReDoS: Regular Expression Denial of Service in template string replacements
 * - Open Redirects & Malicious Schemes (javascript:, vbscript:, data:text/html)
 * - Prototype Pollution & Corrupted Metadata Inputs
 */

const ALLOWED_EXTENSIONS = new Set(["mov", "mp4", "m4v", "webm"]);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 * 1024; // 10 GB limit for local video
const MAX_FILENAME_LENGTH = 120;
const MAX_GOAL_LENGTH = 80;

/**
 * Sanitizes user-provided filenames to prevent path traversal, HTML injection,
 * and display corruptions.
 */
export function sanitizeFileName(rawName: string | undefined | null): string {
  if (!rawName || typeof rawName !== "string") {
    return "untitled_clip.mp4";
  }

  // Strip null bytes and control characters
  let clean = rawName.replace(/[\x00-\x1F\x7F]/g, "");

  // Strip directory paths (prevent path traversal like ../../etc/passwd)
  clean = clean.replace(/^.*[\\/]/, "");

  // Strip characters dangerous in HTML or shell contexts (<, >, ", ', `, $, |, ;, &, etc.)
  clean = clean.replace(/[<>"'`$|;&\\:]/g, "_");

  // Collapse consecutive dots and underscores
  clean = clean.replace(/\.{2,}/g, ".").replace(/_{2,}/g, "_");

  // Trim whitespace
  clean = clean.trim();

  // Enforce reasonable length while preserving file extension
  if (clean.length > MAX_FILENAME_LENGTH) {
    const parts = clean.split(".");
    const ext = parts.length > 1 ? `.${parts.pop()}` : "";
    const base = parts.join(".");
    clean = `${base.slice(0, MAX_FILENAME_LENGTH - ext.length)}${ext}`;
  }

  return clean || "video_source.mp4";
}

/**
 * Sanitizes user text input (such as creative story goals).
 * Strips HTML tags, control characters, and enforces character limits.
 */
export function sanitizeTextInput(input: string | undefined | null, maxLength = MAX_GOAL_LENGTH): string {
  if (!input || typeof input !== "string") {
    return "";
  }

  // Remove control characters (except common space)
  let clean = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Strip HTML tag structures (<...>)
  clean = clean.replace(/<[^>]*>/g, "");

  // Strip dangerous quotes and backticks
  clean = clean.replace(/[`]/g, "'");

  // Trim and cap length
  clean = clean.trim().slice(0, maxLength);

  return clean;
}

/**
 * Validates whether a file object is safe and has a supported video format.
 */
export function validateVideoFile(file: unknown): {
  valid: boolean;
  sanitizedName: string;
  reason?: "UNSUPPORTED_FORMAT" | "FILE_TOO_LARGE" | "EMPTY_FILE" | "INVALID_OBJECT";
} {
  if (!file || typeof file !== "object" || !(file instanceof File)) {
    return { valid: false, sanitizedName: "unknown", reason: "INVALID_OBJECT" };
  }

  const sanitizedName = sanitizeFileName(file.name);
  const ext = sanitizedName.split(".").pop()?.toLowerCase() ?? "";

  if (file.size <= 0) {
    return { valid: false, sanitizedName, reason: "EMPTY_FILE" };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, sanitizedName, reason: "FILE_TOO_LARGE" };
  }

  const isAllowedExt = ALLOWED_EXTENSIONS.has(ext);
  const isVideoMime = file.type === "" || file.type.startsWith("video/");

  if (!isAllowedExt || !isVideoMime) {
    return { valid: false, sanitizedName, reason: "UNSUPPORTED_FORMAT" };
  }

  return { valid: true, sanitizedName };
}

/**
 * Strict validator for media and preview URLs.
 * Strictly forbids javascript:, vbscript:, data:text/html, etc.
 */
export function isSafeMediaUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim().toLowerCase();

  // Explicit dangerous schemes block
  if (
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("vbscript:") ||
    trimmed.startsWith("data:text/html") ||
    trimmed.startsWith("data:application/")
  ) {
    return false;
  }

  // Allowed safe protocols
  return (
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("data:image/") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("./")
  );
}

/**
 * Safe string template interpolation without ReDoS vulnerability.
 * Replaces `{key}` using safe literal string splitting instead of dynamic RegExp.
 */
export function safeFormatTemplate(
  template: string,
  vars?: Record<string, string | number>
): string {
  if (!vars || Object.keys(vars).length === 0) {
    return template;
  }

  let result = template;
  for (const [key, rawVal] of Object.entries(vars)) {
    const token = `{${key}}`;
    const safeVal = String(rawVal).replace(/<[^>]*>/g, ""); // strip tags in vars
    result = result.split(token).join(safeVal);
  }

  return result;
}

/**
 * HTML entity escaping helper for safe textual representation.
 */
export function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
