/* global Vue, Vuetify */

document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		components: {
			AddonPage: Vue.defineAsyncComponent(() => import("./addon-page.js")),
		},
	});
	app.use(Vuetify.createVuetify());
	app.mount("#app");
});
