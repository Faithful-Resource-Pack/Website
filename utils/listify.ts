/**
 * Convert an array into a formatted string list
 * @param arr - Array to convert
 * @returns Formatted string list
 */
export default function listify(arr: string[]) {
	if (!arr.length) return "";
	// [a] -> a
	if (arr.length === 1) return arr[0];
	// [a, b] -> a and b
	if (arr.length === 2) return `${arr[0]} and ${arr[1]}`;
	// [a, b, ..., y, z] -> a, b, ..., y, and z
	return `${arr.slice(0, -1).join(", ")}, and ${arr[arr.length - 1]}`;
}
