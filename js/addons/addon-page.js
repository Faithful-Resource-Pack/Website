/* global Vuetify */

export default {
  name: 'addon-page',
  template: `
    <v-container
      style="max-width: 1140px; padding-top: 100px; padding-bottom: 100px"
    >
      <h2 class="text-center" style="font-size: 4.8rem; font-weight: 300; line-height: 1.2; margin-bottom: 3rem; margin-top: 3rem">Compliance Add-Ons</h2>

      <h3 class="text-center" v-if="Object.keys(fav).length">Favorites</h3>
      <div class="card card-body" v-if="Object.keys(fav).length">
        <div class="res-grid-3">
          <div v-for="(addon, index) in fav" class="hovering-effect" style="margin-bottom: calc(-28px)">
            <router-link class="card img-card" :to="addon.id" v-if="addon.status == 'approved'">
              <img :src="addon.images.header">
              <div class="img-card-shadow"></div>
              <h3>{{ addon.title }}</h3>
              <div class="addon-flags" :style="{'margin-bottom': '-5px' }">
                <img :style="{'margin-bottom': '5px' }" v-if="addon.type.includes('Java')" :src="java" alt="available for Java Edition" loading="lazy">
                <img :style="{'margin-bottom': '5px' }" v-if="addon.type.includes('Bedrock')" :src="bedrock" alt="available for Bedrock Edition" loading="lazy">
                <img :style="{'margin-bottom': '5px' }" v-if="addon.optifine" :src="optifine" alt="requires optifine" loading="lazy">
              </div>
              <div class="addon-tags">
                <p :style="{'margin-bottom': '5px' }" v-if="addon.type.includes('32x')" >32x</p>
                <p :style="{'margin-bottom': '5px' }" v-if="addon.type.includes('64x')" >64x</p>
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
        <div class="res-grid-3">
          <div v-for="(addon, index) in addons" class="hovering-effect" style="margin-bottom: calc(-28px)">
            <router-link class="card img-card" :to="addon.id" v-if="addon.status == 'approved'">
              <img :src="addon.images.header">
              <div class="img-card-shadow"></div>
              <h3>{{ addon.title }}</h3>
              <div class="addon-flags" :style="{'margin-bottom': '-5px' }">
                <img :style="{'margin-bottom': '5px' }" v-if="addon.type.includes('Java')" :src="java" alt="available for Java Edition" loading="lazy">
                <img :style="{'margin-bottom': '5px' }" v-if="addon.type.includes('Bedrock')" :src="bedrock" alt="available for Bedrock Edition" loading="lazy">
                <img :style="{'margin-bottom': '5px' }" v-if="addon.optifine" :src="optifine" alt="requires optifine" loading="lazy">
              </div>
              <div class="addon-tags">
                <p :style="{'margin-bottom': '5px' }" v-if="addon.type.includes('32x')" >32x</p>
                <p :style="{'margin-bottom': '5px' }" v-if="addon.type.includes('64x')" >64x</p>
              </div>
            </router-link>
            <v-btn
              @click="checkFav(addon)"
              small
              :color="fav[addon.id] ? '#FFC83D' : 'rgba(0, 0, 0, 0.5)' "
              icon

              style="relative; top: calc(-100% + 2px + 28px); left: 2px;"
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
      java: '/image/icon/java.png',
      img32: '/image/icon/32_transparent.png',
      img64: '/image/icon/64_transparent.png',
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
    fetch('https://database.compliancepack.net/firestorm/files/addons.json')
    .then(response => {
      return response.json()
    })
    .then(data => this.addons = data)

    this.fav = JSON.parse(window.localStorage.getItem("favAddons") || "{}")
  },
}