/* global Vue, Vuetify */

document.addEventListener("DOMContentLoaded", () => {
  Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

  const AddonPage = () => import('./addon-page.js')

  const v = new Vue({
    el: "#app",
    components: {
      AddonPage,
    },
    vuetify: new Vuetify({
      theme: {
        themes: {
          light: {
            primary: '#FFFFFF',
          },
          dark: {
            primary: '#FFFFFF',
          }
        }
      }
    })
  })
})