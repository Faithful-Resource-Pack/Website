import { join } from "node:path";

export const BASE_JEKYLL_PATH = join(process.cwd(), "_site");
export const NOT_FOUND_PAGE = join(BASE_JEKYLL_PATH, "404.html");
export const replaceTemplateToken = (token) => `%${token}%`;
