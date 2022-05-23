import type { Translations, LocalizedURLs } from 'vue-lang-router';

const langs = process.env.VUE_APP_I18N_SUPPORTED_LOCALE?.split(',') || ['en'];
const localizedURLs: LocalizedURLs = {};
const translations: Translations = {};

interface Locales {
  [key: string]: string | Locales;
}

/**
 * Load the given json lang file
 * @param {String} path the path to the json file
 * @returns {Object|{}} Empty object if the file does not exist
 */
async function loadJSON(path: string): Promise<{ default: object }> {
  try {
    await import(`@/lang/${path}`);
  } catch {
    return { default: {} };
  }

  return import(`@/lang/${path}`);
}

async function loadLocales(lang: string) {
  const modules = ['index', 'navbar', 'footer']; // all "modules" in @/lang/<lang>/<module>.json
  const res: Locales = {};

  for (let i = 0; i < modules.length; i += 1) {
    const module = modules[i];

    const { default: moduleDataFallback } = await loadJSON(`en/${module}.json`);
    const { default: moduleData } = await loadJSON(`${lang}/${module}.json`);

    if (module === 'index') Object.assign(res, moduleDataFallback, moduleData); // index module is made as root
    else res[module] = { ...moduleDataFallback, ...moduleData }; // other modules are made as children (access locales via module name)
  }

  return res;
}

for (let i = 0; i < langs.length; i += 1) {
  const lang = langs[i];

  // urls (router)
  if (lang !== 'en') localizedURLs[lang] = (await import(`./${lang}/urls.json`)).default;

  // translations (page content)
  translations[lang] = {
    name: (await import(`./${lang}/index.json`)).default.lang_name,
    load: () => loadLocales(lang),
  };
}

export { localizedURLs, translations };
