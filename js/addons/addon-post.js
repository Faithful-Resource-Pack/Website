/* global fetch, marked */

const addonModal = () => import('./addon-post-modal.js')

export default {
  name: 'addon-page',
  components: {
    addonModal
  },
  template: `
    <v-container
      v-if="loading"
      style="max-width: 1140px"
    >
      <div class="card card-body">
        <p align="center">The add-on is loading, please wait...</p>
      </div>
    </v-container>
    <v-container
      style="max-width: 1140px"
      v-else-if="addon.approval.status == 'approved'"
    >
      <h2 class="text-center" style="font-size: 4.8rem; font-weight: 300; line-height: 1.2; margin-bottom: 3rem; margin-top: 3rem">{{ addon.name }}</h2>
      <img :src="header" class="fancy-card-2x" style="width: 100%; margin-bottom: 17px">

      <template>
        <addon-modal v-model="modal" :close="closeModal" :image="modalImage" />
        <div class="card card-body" v-if="carousel.length">
          <h3 class="text-center">Screenshots</h3>
          <div class="res-grid-3">
            <div v-if="files.length" v-for="(image, index) in carousel">
              <div class="card img-card">
                <img :src="image" @click="openModal(image)">
              </div>
            </div>
          </div>
        </div>

        <br>
      </template>

      <v-row :style="{
          'display': $vuetify.breakpoint.mdAndUp ? 'flex' : 'block'
        }"
      >
        <v-col class="col-2" :sm="$vuetify.breakpoint.mdAndUp ? 3 : 2" style="max-width: 100%">

          <!-- Only 1 authors -->
          <template v-if="Object.keys(authors).length == 1">
            <h3 class="text-center">Author</h3>
            <img v-if="authors[Object.keys(authors)[0]].uuid" alt="avatar" style="display: block; margin-left: auto; margin-right: auto; max-height: 250px" :src="($vuetify.breakpoint.mdAndUp ? 'https://visage.surgeplay.com/full/256/' : 'https://visage.surgeplay.com/head/128/') + authors[Object.keys(authors)[0]].uuid" />
            <img v-else alt="avatar" style="display: block; margin-left: auto; margin-right: auto; max-height: 250px" src="https://visage.surgeplay.com/head/128/X-Steve" />
            <div class="card card-title text-center author-widget">
              <h4>{{ authors[Object.keys(authors)[0]].username }}</h4>
              <div class="author-socials">
                <a v-for="m in authors[Object.keys(authors)[0]].media" :key="m.type + '-' + m.link" :href="formatUrl(m.link)" target="_blank" rel="noreferrer" >
                  <img v-if="MEDIAS_TO_ICONS[m.type].src" width="24" height="24" :src="MEDIAS_TO_ICONS[m.type].src" :alt="m.type" />
                  <i v-else-if="MEDIAS_TO_ICONS[m.type].fas" class="fas">{{ MEDIAS_TO_ICONS[m.type].fas }}</i>
                  <i v-else-if="MEDIAS_TO_ICONS[m.type].fab" class="fab">{{ MEDIAS_TO_ICONS[m.type].fab }}</i>
                  <i v-else class="fab">{{ MEDIAS_TO_ICONS["Other"].fab }}</i>
                </a>
              </div>
            </div>
          </template>

          <template v-else>
            <h3 class="text-center">Authors</h3>

            <div :style="{
              'display': $vuetify.breakpoint.mdAndUp ? 'block' : 'flex',
              'align-items': 'baseline'
              }"
            >
              <v-row v-for="(author, index) in authors">
                <v-col style="margin: 0 5px" :key="index">
                  <img v-if="author.uuid" alt="avatar" style="display: block; margin-left: auto; margin-right: auto; max-height: 250px" :src="'https://visage.surgeplay.com/head/128/' + author.uuid" />
                  <img v-else alt="avatar" style="display: block; margin-left: auto; margin-right: auto; max-height: 250px" src="https://visage.surgeplay.com/head/128/X-Steve" />
                  <div class="card card-title text-center author-widget">
                    <h4>{{ author.username }}</h4>
                    <div class="author-socials">
                      <a v-for="m in author.media" :key="m.type + '-' + m.link" :href="formatUrl(m.link)" target="_blank" rel="noreferrer" >
                        <img v-if="MEDIAS_TO_ICONS[m.type].src" width="24" height="24" :src="MEDIAS_TO_ICONS[m.type].src" :alt="m.type" />
                        <i v-else-if="MEDIAS_TO_ICONS[m.type].fas" class="fas">{{ MEDIAS_TO_ICONS[m.type].fas }}</i>
                        <i v-else-if="MEDIAS_TO_ICONS[m.type].fab" class="fab">{{ MEDIAS_TO_ICONS[m.type].fab }}</i>
                        <i v-else class="fab">{{ MEDIAS_TO_ICONS["Other"].fab }}</i>
                      </a>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </template>
        </v-col>

        <v-col class="col-10" :sm="$vuetify.breakpoint.mdAndUp ? 9 : 10" style="max-width: 100%">
          <div class="card card-body">
            <p v-html="compiledMarkdown(addon.description)"></p>
          </div>

          <br>

          <v-row
            :style="{
              'flex-direction': $vuetify.breakpoint.mdAndUp ? 'row' : 'column'
            }"
          >
            <v-col>
              <h3 class="text-center">Downloads</h3>
              <div class="card card-body">
                <template v-for="file in downloads">
                  <a :href="file.source" class="btn btn-dark" style="color: white; width: 100%; margin: 5px 0">{{ file.name }}</a>
                </template>
              </div>
            </v-col>
            <v-col>
              <h3 class="text-center">Information</h3>
              <template v-if="addon.options.optifine">
                <div class="card card-body card-widget">
                  <img class="addon-flags-big" :src="optifine" alt="requires optifine" loading="lazy">
                  <p class="addon-flags-big-text">
                    Requires <a href="https://optifine.net/downloads">OptiFine</a> or an <a href="https://optifine.alternatives.lambdaurora.dev/">equivalent mod</a>
                  </p>
                </div>
                <br>
              </template>
              <template v-if="addon.options.tags && addon.options.tags.includes('Java')">
                <div class="card card-body card-widget">
                  <img class="addon-flags-big" :src="java" alt="java support" loading="lazy">
                  <p class="addon-flags-big-text">Supports Java Edition</p>
                </div>
                <br>
              </template>

              <template v-if="addon.options.tags && addon.options.tags.includes('Bedrock')">
                <div class="card card-body card-widget">
                  <img class="addon-flags-big" :src="bedrock" alt="bedrock support" loading="lazy">
                  <p class="addon-flags-big-text">Supports Bedrock Edition</p>
                </div>
                <br>
              </template>

              <v-row>
                <v-col
                  style="display: flex; align-content: stretch; justify-content: flex-start"
                >
                  <div v-if="addon.options.tags && addon.options.tags.includes('32x')" class="card card-body card-widget-square" style="margin-right: 24px">
                    <img class="addon-flags-big" :src="img32" alt="32x support" loading="lazy">
                  </div>
                  <div v-if="addon.options.tags && addon.options.tags.includes('64x')" class="card card-body card-widget-square">
                    <img class="addon-flags-big" :src="img64" alt="64x support" loading="lazy">
                  </div>
                </v-col>
              </v-row>

            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <br><br>

    <a href="https://discord.gg/sN9YRQbBv7">
      <p class="blurple banner">
        Start a discussion in our Discord!
      </p>
    </a>

    `,
  data() {
    return {
      addon: {},
      files: [],
      authors: [],
      optifine: '/image/icon/optifine.png',
      bedrock: '/image/icon/bedrock.png',
      java: '/image/icon/java.png',
      img32: '/image/icon/32.png',
      img64: '/image/icon/64.png',
      modal: false,
      modalImage: '',
      loading: true,
      MEDIAS_TO_ICONS: {
        "CurseForge":  { src: '/image/addons/curseforge.svg' },
        "GitHub": { fab: '' },
        "Modrinth": { fas: '' },
        "Patreon": { fab: '' },
        "Paypal": { fab: '' },
        "Planet Minecraft": { fas: '' },
        "PSN": { fab: '' },
        "Reddit": { fab: '' },
        "Steam": { fab: '' },
        "Twitter": { fab: '' },
        "Website": { fas: '' },
        "Xbox": { fab: '' },
        "YouTube": { fab: '' },
        "Other": { fas: '' }
      }
    }
  },
  methods: {
    openModal(base64) {
      this.modalImage = base64
      this.modal = true
    },
    closeModal() {
      this.modalImage = ''
      this.modal = false
    },
    compiledMarkdown(markdown) {
      return marked(markdown, { sanitize: true })
    },
    formatUrl(url) {
      return !/^https?:\/\//i.test(url) ? `http://${url}` : url
    },
    searchAuthors() {
      this.addon.authors.forEach((authorID) => {
        fetch(`https://api.faithfulpack.net/v2/users/${authorID}`)
          .then((response) => response.json())
          .then((author) => {
            this.authors.push(author)
          })
      })
    }
  },
  computed: {
    header() {
      return this.files.find((el) => el.use === 'header').source
    },
    carousel() {
      return this.files.filter((el) => el.use === 'carousel' || el.use === 'screenshot').map((el) => el.source)
    },
    downloads() {
      return this.files.filter((el) => el.use === 'download')
    }
  },
  beforeMount() {
    if (!window.slug && this.$route) {
      fetch(`https://api.faithfulpack.net/v2/addons/${window.slug}`)
      .then((response) => response.json())
      .then((data) => this.addon = data[0])
      .then(() => {
        this.searchAuthors()
      })
      .then(() => {
        fetch(`https://api.faithfulpack.net/v2/addons/${this.addon.id}`)
          .then((response) => response.json())
          .then((data) => this.files = data)
      })
      .finally(() => {
        this.loading = false
        window.scrollTo(0, 0)
      })
      .catch((err) => {
        console.error(err)
        this.addon = {}
        this.loading = false
        window.scrollTo(0, 0)
      })
    } else {
      this.addon = window.addon
      this.searchAuthors()
      this.files = window.files

      this.loading = false
      window.scrollTo(0, 0)
    }
  }
}
