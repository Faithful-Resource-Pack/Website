const VERSION_JAVA = '1.17'
const BRANCH_JAVA = 'Jappa-1.17'
const BRANCH_BEDROCK = 'Jappa-1.16.200'
const ERROR_IMG = './image/gallery/not-found.png'

const TYPE_JAVA = 'java'
const TYPE_BEDROCK = 'bedrock'
const TYPE_DUNGEONS = 'dungeons'
const TYPE_EDUACTION = 'education'

const ARTIST_UNKNOWN = 'Unknown'

window.data = {
  versions: ['java-32x', 'java-64x', 'bedrock-32x', 'bedrock-64x', 'dungeons', 'education'],
  javaSections: ['block', 'effect', 'entity', 'environment', 'font', 'gui', 'item', 'map', 'misc', 'mob_effect', 'models', 'painting', 'particle'],
  bedrockSections: ['blocks', 'effect', 'entity', 'environment', 'gui', 'items', 'map', 'misc', 'models', 'painting', 'particle', 'ui'],
  dungeonsSections: ['blocks', 'components', 'decor', 'effects', 'entity', 'equipment', 'items', 'materials', 'others', 'ui'],
  educationSections: []
}

window.cache = {}

window.capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

window.imageError = e => {
  e.src = ERROR_IMG
}

window.getJson = async url => {
  if (window.cache.hasOwnProperty(url)) {
    console.log('cached: ' + url)
    return window.cache[url]
  } else {
    console.log('new: ' + url)
    let data = await fetch(url).then(response => response.json())
    window.cache[url] = data
    return data
  }
}

export default {
  name: 'gallery-page',
  data() {
    return {
      currentSections: [],
      imageArray: [],
      currentType: '',
      currentTypeObject: '',
      currentRepository: '',
      currentBranch: '',
      searchString: ''
    }
  },
  watch:{
    $route(to) {
      if(!to.path.includes('search')) this.update()
    }
  },
  template:
  `<div>
    <div ref="modal" class="modal" v-on:click="closeModal()">
      <span class="close">×</span>
      <div class="modal-content">
        <img ref="modal_img" class="mb-2" onerror="window.imageError(this)">
        <h1 ref="modal_h1"></h1>
        <p ref="modal_p"></p>
      </div>
    </div>
    <div class="mb-4">
      <router-link v-for="item in window.data.versions" :key="item" class="btn btn-dark mr-1 mb-2" :to="'/' + item + '/' + $route.params.section">{{ window.capitalize(item) }}</router-link>
    </div>
    <input id="SearchBar" type="text" placeholder="Search for a texture name or path..." title="Type something" class="fancy-card-1x mb-4" v-model="searchString" v-on:keyup.enter="showResults()">
    <div class="mb-4">
      <router-link v-for="item in currentSections" :key="item" class="btn btn-dark mr-1 mb-2" :to="'/' + $route.params.version + '/' + item">{{ window.capitalize(item) }}</router-link>
    </div>
    <div class="res-grid-6">
      <div v-for="item in imageArray" :key="item.path" class="gallery-item">
        <img :src="item.path" loading="lazy" :alt="item.title" onerror="window.imageError(this)">
        <a :href="item.path" download class="fas fa-download"></a>
        <i class="fas fa-expand" v-on:click="fullscreen(item)"></i>
        <div class="info">
          <p>{{ item.title }}</p>
          <p class="secondary">{{ item.artist }}</p>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    loadType() {
      let tempVersion = this.$route.params.version.toLowerCase()
      if (tempVersion.includes(TYPE_JAVA)) {
        this.currentType = TYPE_JAVA
        this.currentSections = window.data.javaSections
        if (tempVersion.includes('64')) {
          this.currentTypeObject = 'c64'
          this.currentRepository = 'Resource-Pack-64x'
        }
        else {
          this.currentTypeObject = 'c32'
          this.currentRepository = 'Resource-Pack-32x'
        }
        this.currentBranch = BRANCH_JAVA
      } else if (tempVersion.includes(TYPE_BEDROCK)) {
        this.currentType = TYPE_BEDROCK
        this.currentSections = window.data.bedrockSections
        if (tempVersion.includes('64')) {
          this.currentTypeObject = 'c64'
          this.currentRepository = 'Compliance-Bedrock-64x'
        }
        else {
          this.currentTypeObject = 'c32'
          this.currentRepository = 'Compliance-Bedrock-32x'
        }
        this.currentBranch = BRANCH_BEDROCK
      } else if (tempVersion.includes(TYPE_DUNGEONS)) {
        this.currentType = TYPE_DUNGEONS
        this.currentSections = window.data.dungeonsSections
        this.currentRepository = null
        this.currentBranch = null
      } else if (tempVersion.includes(TYPE_EDUACTION)) {
        this.currentType = TYPE_EDUACTION
        this.currentSections = window.data.educationSections
        this.currentRepository = 'Education-Edition'
        this.currentBranch = null
      }
    },
    async getArtists(object) {
      let readableArtists = []
      if (object[this.currentTypeObject].hasOwnProperty('author')) {
        let profiles = await window.getJson('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/profiles.json')
        object[this.currentTypeObject].author.forEach(item => {
          for (const profile of profiles) {
            if (item === profile.id) {
              if (profile.username !== null) readableArtists.push(profile.username)
              break
            }
          }
        })
      }
      return readableArtists.length < 1 ? ARTIST_UNKNOWN : readableArtists.join(', ')
    },
    async search(string) {
      let textures = await window.getJson('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/contributors/' + this.currentType + '.json')
      let tempArray = []
      let currentItem = null
      for (const item of textures) {
        if (this.currentType == TYPE_JAVA) currentItem = '/assets/' + item.version[VERSION_JAVA]
        else if (this.currentType == TYPE_BEDROCK) currentItem = '/' + item.path
        let artists = await this.getArtists(item)
        if (currentItem.toLowerCase().includes(string.toLowerCase()) || artists.toLowerCase().includes(string.toLowerCase())) {
          tempArray.push({
            title: currentItem.substring(currentItem.lastIndexOf('/') + 1, currentItem.lastIndexOf('.')).replace(/(.{3})/g,"$1\xAD"),
            path: 'https://raw.githubusercontent.com/Compliance-Resource-Pack/' + this.currentRepository + '/' + this.currentBranch + currentItem,
            artist: artists
          })
        }
      }
      return tempArray
    },
    async update() {
      this.loadType()

      if (this.currentType == TYPE_DUNGEONS || this.currentType == TYPE_EDUACTION) {
        this.imageArray = [{
          title: 'Missing Config File!',
          path: window.ERROR_IMG,
          artist: 'Please contact us!'
        }]
      }

      this.imageArray = await this.search('/' + this.$route.params.section + '/')
    },
    async showResults() {
      this.$router.push('/' + this.$route.params.version + '/search')
      this.imageArray = await this.search(this.searchString)
      this.searchString = ''
    },
    fullscreen(item) {
      this.$refs.modal_img.src = item.path
      this.$refs.modal_h1.innerHTML = item.title
      this.$refs.modal_p.innerHTML = item.artist
      this.$refs.modal.style.display = 'block'
    },
    closeModal() {
      this.$refs.modal.style.display = 'none'
    }
  },
  mounted() {
    this.update()
  }
}
