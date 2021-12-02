/* global Vue, getJSON, VueRouter, Vuetify */

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const AddonPage = () => import('./addon-page.js')
const AddonPost = () => import('./addon-post.js')

const routes = [
  { path: '/', component: AddonPage, name: 'addon-page' }
]

const router = new VueRouter({
  routes
})

let v = new Vue({
  router, 
  el: "#app",
  vuetify: new Vuetify()
})