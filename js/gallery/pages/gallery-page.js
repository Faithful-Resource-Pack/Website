export default {
  name: 'gallery-page',
  props: {
    version: String
  },
  data() {
    return {
      dummyArray: ['Title1', 'Title2', 'Title3', 'Title4', 'Title5', 'Title6', 'Title7', 'Title8', 'Title9'],
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
    <div class="res-grid-6">
      <div v-for="item in dummyArray" :key="item" class="gallery-item">
        <img src="https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/master/assets/minecraft/textures/block/barrel_top.png" loading="lazy" :alt="item">
        <i class="fas fa-download"></i>
        <i class="fas fa-expand"></i>
        <div class="info">
          <p>{{ item }}</p>
          <p>Location</p>
        </div>
      </div>
    </div>
  </div>`
}
