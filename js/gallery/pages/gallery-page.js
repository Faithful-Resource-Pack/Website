export default {
  name: 'gallery-page',
  props: {
    version: String
  },
  template:
  `<div>
    <h1>{{ $route.params.version }} {{ $route.params.section }}</h1>
  </div>`
}
