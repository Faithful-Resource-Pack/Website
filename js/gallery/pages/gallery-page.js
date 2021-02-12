const VERSION_JAVA = '1.17'
const BRANCH_JAVA = 'Jappa-1.17'
const BRANCH_BEDROCK = 'Jappa-1.16.200'
window.ERROR_IMG = './image/gallery/not-found.png'

const TYPE_JAVA = 'java'
const TYPE_BEDROCK = 'bedrock'
const TYPE_DUNGEONS = 'dungeons'
const TYPE_EDUACTION = 'education'

const ARTIST_UNKNOWN = 'Unknown'

window.profileCache = null

window.capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  name: 'gallery-page',
  props: {
    version: String
  },
  data() {
    return {
      imageArray: [],
      versions: [
        'java-32x',
        'java-64x',
        'bedrock-32x',
        'bedrock-64x',
        'dungeons',
        'education'
      ],
      javaSections: ['block', 'colormap', 'effect', 'entity', 'environment', 'font', 'gui', 'item', 'map', 'misc', 'mob_effect', 'models', 'painting', 'particle'],
      bedrockSections: ['blocks', 'colormap', 'effect', 'entity', 'environment', 'gui', 'items', 'map', 'misc', 'models', 'painting', 'particle', 'ui'],
      dungeonsSections: ['blocks', 'components', 'decor', 'effects', 'entity', 'equipment', 'items', 'materials', 'others', 'ui'],
      educationSections: [],

      currentType: '',
      currentTypeObject: '',
      currentSections: [],
      currentRepository: '',
      currentBranch: ''
    }
  },
  watch:{
    $route() {
      this.update()
    }
  },
  template:
  `<div>
    <div ref="modal" class="modal">
      <span class="close" v-on:click="closeModal()">×</span>
      <img ref="modal_img" class="modal-content">
    </div>
    <div class="mb-4">
      <router-link v-for="item in versions" :key="item" class="btn btn-dark mr-1 mb-2" :to="'/' + item + '/' + $route.params.section">{{ window.capitalize(item) }}</router-link>
    </div>
    <div class="mb-4">
      <router-link v-for="item in currentSections" :key="item" class="btn btn-dark mr-1 mb-2" :to="'/' + $route.params.version + '/' + item">{{ window.capitalize(item) }}</router-link>
    </div>
    <div class="res-grid-6">
      <div v-for="item in imageArray" :key="item.path" class="gallery-item">
        <img :src="item.path" loading="lazy" :alt="item.title" onerror="this.src = window.ERROR_IMG">
        <a :href="item.path" download class="fas fa-download"></a>
        <i class="fas fa-expand" v-on:click="fullscreen(item.path)"></i>
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
        this.currentSections = this.javaSections
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
        this.currentSections = this.bedrockSections
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
        this.currentSections = this.dungeonsSections
        this.currentRepository = null
        this.currentBranch = null
      } else if (tempVersion.includes(TYPE_EDUACTION)) {
        this.currentType = TYPE_EDUACTION
        this.currentSections = this.educationSections
        this.currentRepository = 'Education-Edition'
        this.currentBranch = null
      }
    },
    async getArtists(object) {
      let readableArtists = []
      let artists = []
      if (object[this.currentTypeObject].hasOwnProperty('author')) {
        artists = object[this.currentTypeObject].author
        let profiles = null
        if (window.profileCache == null) {
          profiles = await fetch('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/profiles.json')
          .then(response => response.json())
          window.profileCache = profiles
        } else {
          profiles = window.profileCache
        }
        artists.forEach(item => {
          profiles.forEach(profile => {
            if (item === profile.id && profile.username !== null) readableArtists.push(profile.username)
          })
        })
      }
      return readableArtists.length < 1 ? ARTIST_UNKNOWN : readableArtists.join(', ')
    },
    getNameById(id) {
      return id
    },
    async update() {
      this.loadType()

      if (this.currentType == TYPE_DUNGEONS || this.currentType == TYPE_EDUACTION) {
        this.imageArray = [
          {
            title: 'Missing Config File!',
            path: window.ERROR_IMG,
            artist: 'Please contact us!'
          }
        ]
      }

      let contributors = await fetch('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/contributors/' + this.currentType + '.json')
      .then(response => response.json())
      let tempArray = []
      let currentItem = null
      for (const item of contributors) {
        if (this.currentType == TYPE_JAVA) currentItem = '/assets/' + item.version[VERSION_JAVA]
        else if (this.currentType == TYPE_BEDROCK) currentItem = '/' + item.path
        if (currentItem.includes(this.$route.params.section + '/')) {
          let builtUrl = 'https://raw.githubusercontent.com/Compliance-Resource-Pack/' + this.currentRepository + '/' + this.currentBranch + currentItem
          tempArray.push({
            title: currentItem.substring(currentItem.lastIndexOf('/') + 1, currentItem.lastIndexOf('.')).replace(/(.{3})/g,"$1\xAD"),
            path: builtUrl,
            artist: await this.getArtists(item)
          })
        }
      }
      this.imageArray = tempArray
    },
    fullscreen(path) {
      this.$refs.modal_img.src = path
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
