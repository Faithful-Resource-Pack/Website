# Faithful Website - Changelog

> This is a very work in progress project, to reports any bugs , submit an issue

## v2.0.0 TBA

- Vue 3 is now used as a base for the whole website  
- Translations are now global:
  - All base strings can be found in `src/lang/en/*.json`
  - All translated strings should be stored in `src/lang/<LOCALE>/*.json`
  - Any new `.json` file should be added in the modules array in the `src/lang/index.ts`
- Themes, there is now 4 theme: normal & colorblind (with dark & light variant)
- URLs: URLs are translated to the matching locales, to translated a part of an URL, make a `urls.json` file inside the `src/lang/<CORRESPONDING_LOCALE>/` folder and respect the following format:

  ```jsonc
  {
    "about": "a-propos",
    // ex: /en/about -> /fr/a-propos
    "home": "accueil",
    // ex: /en/home -> /fr/accueil
    "profile": "profil",
    // ex: /en/profile/:id/about -> fr/profil/:id/a-propos 
    // -> each word need to be translated only 1 time :)
    // -> query parameters (:id) aren't translated
  }
  ```
