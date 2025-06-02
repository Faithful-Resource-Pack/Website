// redirect everything after the slash (so ?show urls still work)
export default defineNuxtRouteMiddleware((to) =>
	navigateTo(`https://webapp.faithfulpack.net${to.fullPath}`, { external: true }),
);
