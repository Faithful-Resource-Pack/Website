export interface GetBrowserLocaleOptions {
  countryCodeOnly?: boolean; // would returns "en" instead of "en-US"
}

/**
 * Return the browser locale.
 * @param {GetBrowserLocaleOptions} options
 * @returns {String} the browser locale.
 */
const getBrowserLocale = (options?: GetBrowserLocaleOptions): string => {
  const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language;

  if (!navigatorLocale) return process.env.VUE_APP_DEFAULT_LANGUAGE || 'en';

  return options && options.countryCodeOnly
    ? navigatorLocale.trim().split(/-|_/)[0]
    : navigatorLocale.trim();
};

// TODO: write tests:
/**
 * getBrowserLocale()                          // => "fr-FR"
 * getBrowserLocale({ countryCodeOnly: true }) // => "fr
 */

export default getBrowserLocale;
