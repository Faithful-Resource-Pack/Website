import { localizedURLs } from '@/lang';
import { Router } from 'vue-router';
import getBrowserLocale from './get-browser-locale';

function translatePath(path: string, langTo: string, langFrom: string, matchedPath: string): string {
  // split the path into chunks
  const pathChunks = path.split('/');

  // if the path is in some language already
  if (langFrom && localizedURLs[langFrom]) {
    // if the path origin & target are the same, do not translate it
    if (langTo === langFrom) return path;

    // create reversed map of localizedURLs in given language
    const map = localizedURLs[langFrom]; // 'fr' urls
    const reversedMap: { [key: string]: string } = {}; // 'en' -> 'fr' urls
    Object.keys(map).forEach((key: string) => {
      reversedMap[map[key]] = key;
    });

    // split the matched path into chunks
    const matchedPathChunks = matchedPath.split('/');

    // translate the path back to original path names
    for (let i = 0; i < pathChunks.length; i += 1) {
      const pathChunk = pathChunks[i];

      // if the original path chunk is a variable, do not translate it
      // if there is an alias, use it, otherwise use the original path
      if (matchedPathChunks[i].charAt(0) !== ':') { pathChunks[i] = reversedMap[pathChunk] || pathChunk; } else pathChunks[i] = `::${pathChunk}`; // avoid translating variables that are also translated in the urls file
    }
  }

  // translate all the non-variable path chunks
  for (let i = 0; i < pathChunks.length; i += 1) {
    const pathChunk = pathChunks[i];

    // if the path chunk is a variable, do not translate it
    // if there is an alias, use it, otherwise use the original path
    if (!pathChunks[i].includes(':')) pathChunks[i] = localizedURLs[langTo][pathChunk] || pathChunk;
  }

  // join chunks into a path
  return pathChunks.join('/').replaceAll('::', ''); // remove indicator of variables that are also translated in the urls file
}

export default function localizePath(fullPath: string, lang: string, routePath: string, router: Router): string {
  // if desired language does not exist OR is not defined, use current one
  // eslint-disable-next-line no-param-reassign
  if (!lang || !localizedURLs[lang]) lang = process.env.VUE_APP_I18N_FALLBACK_LANGUAGE || 'en';

  // split query & base path
  let path = fullPath;
  let query = '';

  if (fullPath.includes('?')) [path, query] = fullPath.split('?');
  else if (fullPath.includes('#')) {
    [path, query] = fullPath.split('#');
    query = `#${query}`;
  }

  // split path into chunks
  const pathChunks = path.split('/');
  const pathLang: string | boolean = localizedURLs[pathChunks[1]] ? pathChunks[1] : false;

  // if the language is default language
  // & current path doesn't contain any language
  // & path to translate doesn't contain a language
  // -> return the same path (no need to translate it)
  const currentPathLang = routePath.split('/')[1];
  if (lang === getBrowserLocale({ countryCodeOnly: true }) && !localizedURLs[currentPathLang] && !pathLang) return fullPath;

  // if the path is in some language already
  let resolvedPath;
  if (pathLang) {
    // get the original path
    const resolvedRoute = router.resolve(path);

    if (resolvedRoute.matched.length !== 0) {
      resolvedPath = resolvedRoute.matched[resolvedRoute.matched.length - 1];
      resolvedPath = (resolvedPath.aliasOf ? resolvedPath.aliasOf.path : resolvedPath.path);
      resolvedPath = (resolvedPath.charAt(0) === '/' ? resolvedPath : `/${resolvedPath}`);
    } else throw new Error('Could not resolve path!');

    // remove the language from path
    pathChunks.splice(1, 1);
    path = pathChunks.join('/');
  }

  // translate path
  const translatedPath: string = translatePath(path, lang, pathLang as string, (resolvedPath || path));

  // add language prefix to the path
  return `/${lang}${translatedPath.charAt(0) !== '/' ? '/' : ''}${translatedPath}${query}`;
}
