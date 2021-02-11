const GalleryPage = () => import('./pages/gallery-page.js')

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const routes = [
  { path: '*', redirect: '/java-32x/blocks' },
  { path: '/:version/:section', component: GalleryPage }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  el: '#app'
})
