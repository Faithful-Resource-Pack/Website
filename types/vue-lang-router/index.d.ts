import type { IntlDateTimeFormats, IntlNumberFormats } from 'vue-i18n';
import type { Router, RouterOptions } from 'vue-router';

declare module 'vue-lang-router' {}

export type Translations = { [lang: string]: { name: string; load() } };
export type LocalizedURLs = { [lang: string]: { [key: string]: string } };

interface LanguageOptions {
  defaultLanguage: string;
  translations: Translations;
  localizedURLs: LocalizedURLs;
  i18nOptions?: {
    dateTimeFormats?: IntlDateTimeFormats;
    numberFormats?: IntlNumberFormats;
  };
}

export { i18n } from 'vue-i18n';
export function createLangRouter(languageOptions: LanguageOptions, routerOptions: RouterOptions): Router;
