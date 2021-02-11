const GalleryPage = () => import('./pages/gallery-page.js')

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const routes = [
  { path: '*', redirect: '/java-32x' },
  { path: '/java-32x', component: GalleryPage, props: { version: 'java-32x' } },
  { path: '/java-64x', component: GalleryPage, props: { version: 'java-64x' } },
  { path: '/bedrock-32x', component: GalleryPage, props: { version: 'bedrock-32x' } },
  { path: '/bedrock-64x', component: GalleryPage, props: { version: 'bedrock-64x' } },
  { path: '/dungeons', component: GalleryPage, props: { version: 'dungeons' } },
  { path: '/education', component: GalleryPage, props: { version: 'education' } }
]

const router = new VueRouter({ routes })

new Vue({
  router,
  el: '#app'
})
