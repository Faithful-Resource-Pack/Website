export default {
  name: 'gallery-page',
  props: {
    version: String
  },
  data() {
    return {
      versions: ['java-32x', 'java-64x', 'bedrock-32x', 'bedrock-64x', 'dungeons', 'education'],
      sections: ['armor', 'blocks', 'colormaps', 'entities', 'environment', 'font', 'gui', 'items', 'map', 'mob-effects', 'paintings', 'particles', 'others']
    }
  },
  template:
  `<div>
    <div class="mb-4">
      <router-link v-for="item in versions" :key="item" class="btn btn-dark mr-1 mb-2" :to="'/' + item + '/' + $route.params.section">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</router-link>
    </div>
    <div class="mb-4">
      <router-link v-for="item in sections" :key="item" class="btn btn-dark mr-1 mb-2" :to="'/' + $route.params.version + '/' + item">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</router-link>
    </div>
    <h1>{{ $route.params.version }} {{ $route.params.section }}</h1>
  </div>`
}
