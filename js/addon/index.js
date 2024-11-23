/* global Vue, Vuetify */

document.addEventListener("DOMContentLoaded", () => {
  const app = Vue.createApp({
    components: {
      AddonPost: Vue.defineAsyncComponent(() => import('./addon-post.js'))
    },
  })
  app.use(Vuetify.createVuetify())
  app.mount("#app")
})
