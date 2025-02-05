import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import removeMd from "remove-markdown";

export default function compileMarkdown(rawText: string, removeMarkdown = false) {
	if (!rawText) return "";
	const parsed = removeMarkdown ? removeMd(rawText) : marked(rawText, { async: false });
	return DOMPurify.sanitize(parsed);
}
