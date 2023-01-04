import type { ParamMatcher } from "@sveltejs/kit";
import { supportedLocales } from "$lib/translations";

/**
 * Only accept valid languages as a segment in the URL
 * @param {string} param the segment to match
 * @returns {boolean} true if the segment is a valid language
 */
export const match: ParamMatcher = (param: string): boolean => supportedLocales.includes(param);
