import { join } from "node:path";

export const BASE_JEKYLL_PATH = join(process.cwd(), "_site");
export const NOT_FOUND_PAGE = join(BASE_JEKYLL_PATH, "404.html");
export const replaceTemplateToken = (token) => `%${token}%`;
export const embedDescription = (description) =>
	description.replaceAll("<br>", "\n").replaceAll('"', "&quot;");

/**
 * Convert an array into a formatted string list
 * @param {any[]} arr - Array to convert
 * @returns {string}
 */
export function listify(arr) {
	if (!arr.length) return "";
	// [a] -> a
	if (arr.length === 1) return arr[0];
	// [a, b] -> a and b
	if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
	// [a, b, ..., y, z] -> a, b, ..., y, and z
	return `${ arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}