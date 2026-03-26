import { marked } from "marked";
import { sanitize } from "isomorphic-dompurify";
import removeMd from "remove-markdown";

/**
 * Compiles (or removes) and sanitizes markdown text.
 * @param rawText - Unsanitized markdown text
 * @param removeMarkdown - Whether to remove md formatting or compile it
 * @returns Sanitized and compiled HTML
 */
export default function compileMarkdown(rawText: string, removeMarkdown = false) {
	if (!rawText) return "";
	const parsed = removeMarkdown ? removeMd(rawText) : marked(rawText, { async: false });
	return sanitize(parsed);
}
