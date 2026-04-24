import { marked } from "marked";
import { sanitize } from "isomorphic-dompurify";
import removeMd from "remove-markdown";

/**
 * Compiles (or removes) and sanitizes markdown text.
 * @param rawText - Unsanitized markdown text
 * @param options - Markdown options
 * @returns Sanitized and compiled HTML
 */
export default function compileMarkdown(rawText: string, { strip = false, breaks = false } = {}) {
	if (!rawText) return "";
	const parsed = strip ? removeMd(rawText) : marked(rawText, { async: false, breaks });
	return sanitize(parsed);
}
