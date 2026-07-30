import { DateTime, SystemZone } from "luxon";

/**
 * Convert a date-like object into a Luxon DateTime object with decent timezone handling
 * @param date - ISO Date string or Unix timestamp
 * @returns Luxon DateTime object
 */
function makeLuxonDate(date: string | number): DateTime {
	return typeof date === "string" && Number.isNaN(Number(date))
		? DateTime.fromISO(date, { zone: new SystemZone() })
		: DateTime.fromMillis(Number(date));
}

/**
 * Convert a date-like object into a formatted exact date
 * @param date - Date string or Unix timestamp
 * @param style - Luxon formatting style to use
 * @returns Precise date string
 */
export function exactDate(date: string | number, style = DateTime.DATE_MED): string {
	// fixes one half of the sentence being translated
	return makeLuxonDate(date).toLocaleString(style, { locale: "en" });
}

/**
 * Convert a date-like object into an English relative date
 * @param dateObj - Date string or Unix timestamp
 * @returns Relative date string
 */
export function relativeDate(date: string | number) {
	return makeLuxonDate(date).toRelative({ locale: "en" });
}
