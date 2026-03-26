import { DateTime } from "luxon";

export type DateLike = number | string | Date;

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
