/* global Vue, VueRouter, Vuetify */

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const AddonPage = () => import('./addon-page.js')
const AddonPost = () => import('./addon-post.js')

const routes = [
  { path: '/', component: AddonPage, name: 'addon-page' },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes,
})

const v = new Vue({
  router,
  el: "#app",
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