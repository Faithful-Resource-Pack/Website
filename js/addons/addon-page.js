/* global Vuetify */

export default {
  name: 'addon-page',
  template: `
    <v-container
      style="max-width: 1140px; padding-top: 100px"
    >
      <h2 class="text-center" style="font-size: 4.8rem; font-weight: 300; line-height: 1.2; margin-bottom: 3rem; margin-top: 3rem">Compliance Add-Ons</h2>

      <h3 class="text-center" v-if="Object.keys(fav).length">Favorites</h3>
      <div class="card card-body" v-if="Object.keys(fav).length">
        <div class="res-grid-3" style="grid-gap: 0 1.5rem !important">
          <div v-for="(addon, index) in fav">
            <router-link class="card img-card" :to="'/addons/' + addon.id" v-if="addon.status == 'approved'">
              <img :src="addon.images.header">
              <h3>{{ addon.title }}</h3>
              <div class="addon-flags">
                <img :style="{'margin-bottom': addon.optifine ? '5px' : 'auto'}" v-if="addon.type.includes('Bedrock')" :src="bedrock" alt="available for Bedrock Edition" loading="lazy">
                <img v-if="addon.optifine" :src="optifine" alt="requires optifine" loading="lazy">
              </div>
            </router-link>
            <v-btn
              @click="checkFav(addon)"
              small
              color="#ff3333"
              icon

              style="position: relative; top: calc(-100% + 2px + 28px); left: 2px;"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <template v-if="Object.keys(fav).length">
        <hr>
        <br>
        <h3 class="text-center" >All</h3>
      </template>

      <div class="card card-body">
        <div class="res-grid-3" style="grid-gap: 0 1.5rem !important">
          <div v-for="(addon, index) in addons">
            <router-link class="card img-card" :to="'/addons/' + addon.id" v-if="addon.status == 'approved'">
              <img :src="addon.images.header">
              <h3>{{ addon.title }}</h3>
              <div class="addon-flags">
                <img :style="{'margin-bottom': addon.optifine ? '5px' : 'auto'}" v-if="addon.type.includes('Bedrock')" :src="bedrock" alt="available for Bedrock Edition" loading="lazy">
                <img v-if="addon.optifine" :src="optifine" alt="requires optifine" loading="lazy">
              </div>
            </router-link>
            <v-btn
              @click="checkFav(addon)"
              small
              :color="fav[addon.id] ? '#FFC83D' : 'rgba(0, 0, 0, 0.5)' "
              icon

              style="position: relative; top: calc(-100% + 2px + 28px); left: 2px;"
            >
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>`,
  data() {
    return {
      addons: {},
      optifine: '/image/icon/optifine.png',
      bedrock: '/image/icon/bedrock.png',
      fav: {}
    }
  },
  methods: {
    checkFav: function (addon) {
      if (!this.fav[addon.id]) {
        this.fav[addon.id] = addon
        window.localStorage.setItem("favAddons", JSON.stringify(this.fav))
      }

      else {
        delete this.fav[addon.id]
        window.localStorage.setItem("favAddons", JSON.stringify(this.fav))
      }

      this.$forceUpdate()
    }
  },
  mounted: function() {
    fetch('https://compliancepack.net:8081/firestorm/files/addons.json')
    .then(response => {
      return response.json()
    })
    .then(data => this.addons = data)

    this.fav = JSON.parse(window.localStorage.getItem("favAddons") || "{}")
  },
}