/* global Vue, getJSON, VueRouter, Vuetify */

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const AddonPage = () => import('./addon-page.js')
const AddonPost = () => import('./addon-post.js')

const routes = [
  { path: '/addons/:addon', component: AddonPost, name: 'addon-post' },
  { path: '/addons', component: AddonPage, name: 'addon-page' }
]

const router = new VueRouter({
  mode: 'history', //
  hash: false,     // -> remove the # in the url
  routes: routes
})

let v = new Vue({
  router, 
  el: "#app",
  vuetify: new Vuetify()
})