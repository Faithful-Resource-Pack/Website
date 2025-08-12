import { DateTime } from "luxon";

/**
 * Create a short absolute date based on the user's browser language
 * @param dateObj - Date-like object to convert
 * @returns Formatted date string
 */
export function shortDate(dateObj: number | string | Date) {
	const date = new Date(dateObj);
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // 0 indexed
	const day = date.getDate();
	// mdy for us (expand array if someone else does too)
	if (navigator && ["en-US"].includes(navigator.language)) return `${month}/${day}/${year}`;
	// dmy for everyone else (and on server since no client is available)
	return `${day}/${month}/${year}`;
}

export function preciseDate(dateObj: number | string | Date, style = DateTime.DATE_MED) {
	const date = new Date(dateObj);
	return DateTime.fromJSDate(date).toLocaleString(style, {
		locale: "en",
	});
}

export function relativeDate(dateObj: number | string | Date) {
	const date = new Date(dateObj);
	return DateTime.fromJSDate(date).toRelative({
		// fixes one half of the sentence being translated
		locale: "en",
	});
}
