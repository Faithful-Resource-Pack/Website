/**
 * Convert a string to title case
 * @param str - The string to convert
 * @returns Title cased string
 */
export default function toTitleCase(str: unknown): string {
	if (typeof str !== "string" || !str) return "";
	return str
		.split(/-|_| /g)
		.map((word) => {
			if (!word.length) return word;
			return word[0].toUpperCase() + word.slice(1);
		})
		.join(" ");
}
