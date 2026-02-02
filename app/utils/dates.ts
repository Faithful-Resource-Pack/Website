import { DateTime } from "luxon";

export type DateLike = number | string | Date;

/**
 * Create a short absolute date based on the user's browser language
 * @param dateObj - Date-like object to convert
 * @returns Formatted date string
 */
export function shortDate(dateObj: DateLike) {
	const date = new Date(dateObj);
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // 0 indexed
	const day = date.getDate();
	// mdy for us (expand array if someone else does too)
	if (navigator && ["en-US"].includes(navigator.language)) return `${month}/${day}/${year}`;
	// dmy for everyone else (and on server since no client is available)
	return `${day}/${month}/${year}`;
}

/**
 * Convert a date-like object into a formatted exact date
 * @param dateObj - Date-like object to convert
 * @param style - Luxon formatting style to use
 * @returns Precise date string
 */
export function exactDate(dateObj: DateLike, style = DateTime.DATE_MED) {
	const date = new Date(dateObj);
	return DateTime.fromJSDate(date).toLocaleString(style, {
		locale: "en",
	});
}

/**
 * Convert a date-like object into an English relative date
 * @param dateObj - Date-like object to convert
 * @returns Relative date string
 */
export function relativeDate(dateObj: DateLike) {
	const date = new Date(dateObj);
	return DateTime.fromJSDate(date).toRelative({
		// fixes one half of the sentence being translated
		locale: "en",
	});
}
