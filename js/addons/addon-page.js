/* global Vuetify */

export default {
  name: 'addon-page',
  template: `
    <v-container
      style="max-width: 1140px; padding-top: 100px; padding-bottom: 100px"
    >
      <h2 class="text-center" style="font-size: 4.8rem; font-weight: 300; line-height: 1.2; margin-bottom: 3rem; margin-top: 3rem">Add-ons</h2>

      <h3 class="text-center" v-if="Object.keys(fav).length">Favorites</h3>
      <div class="card card-body" v-if="Object.keys(fav).length">
        <div class="res-grid-3">
          <div v-for="(addon, index) in fav" class="hovering-effect" style="margin-bottom: calc(-28px)">
            <router-link class="card img-card" :to="addon.id" v-if="addon.status == 'approved'">
              <img :src="addon.images.header">
              <div class="img-card-shadow"></div>
              <h3>{{ addon.title }}</h3>
              <div class="addon-flags" style="margin-bottom: 5px;">
                <img style="margin-bottom: 5px;" v-if="addon.type.includes('Java')" :src="java" alt="available for Java Edition" loading="lazy">
                <img style="margin-bottom: 5px;" v-if="addon.type.includes('Bedrock')" :src="bedrock" alt="available for Bedrock Edition" loading="lazy">
                <img style="margin-bottom: 5px;" v-if="addon.optifine" :src="optifine" alt="requires optifine" loading="lazy">
              </div>
              <div class="addon-tags">
                <p style="margin-bottom: 5px; margin-right: 5px;" v-if="addon.type.includes('32x')" >32x</p>
                <p style="margin-bottom: 5px;" v-if="addon.type.includes('64x')" >64x</p>
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
        <br>
        <h3 class="text-center">All</h3>
      </template>

      <div class="card card-body">
        <h4 class="text-center">Search</h4>
        <div class="checkbox-container">
          <v-checkbox
            v-for="type in editions"
            v-model="selectedEditions"
            :label="type"
            :value="type"
            color="primary"
            @change="startSearch"
          >
          </v-checkbox>
          <v-checkbox
            v-for="type in res"
            v-model="selectedRes"
            :label="type"
            :value="type"
            color="primary"
            @change="startSearch"
          >
          </v-checkbox>
        </div>
        <v-text-field
          v-model="search"
          :append-outer-icon="search ? 'mdi-send' : undefined"
          filled
          clear-icon="mdi-close"
          clearable
          color="primary"
          placeholder="Search add-on name"
          type="text"
          v-on:keyup.enter="startSearch"
          @click:append-outer="startSearch"
          @click:clear="clearSearch"
        ></v-text-field>
      </div>
      <br>
      <div class="card card-body">
        <div class="res-grid-3" v-if="Object.keys(searchedAddons).length">
          <div v-for="(addon, index) in searchedAddons" class="hovering-effect" style="margin-bottom: calc(-28px)">
            <router-link class="card img-card" :to="addon.id" v-if="addon.status == 'approved'">
              <img :src="addon.images.header">
              <div class="img-card-shadow"></div>
              <h3>{{ addon.title }}</h3>
              <div class="addon-flags" style="margin-bottom: -5px;">
                <img style="margin-bottom: 5px;" v-if="addon.type.includes('Java')" :src="java" alt="available for Java Edition" loading="lazy">
                <img style="margin-bottom: 5px;" v-if="addon.type.includes('Bedrock')" :src="bedrock" alt="available for Bedrock Edition" loading="lazy">
                <img style="margin-bottom: 5px;" v-if="addon.optifine" :src="optifine" alt="requires optifine" loading="lazy">
              </div>
              <div class="addon-tags">
                <p style="margin-bottom: 5px; margin-right: 5px" v-if="addon.type.includes('32x')" >32x</p>
                <p style="margin-bottom: 5px;" v-if="addon.type.includes('64x')" >64x</p>
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
        <div v-else-if="loading">
          <p align="center"><i>Loading Add-ons, please wait...</i></p>
        </div>
        <div v-else>
          <p align="center"><i>No results found {{ search ? 'for ' + search : '' }}</i></p>
        </div>
      </div>
    </v-container>`,
  data() {
    return {
      addons: {},
      searchedAddons: {},
      search: '',
      loading: true,
      optifine: '/image/icon/optifine.png',
      bedrock: '/image/icon/bedrock.png',
      java: '/image/icon/java.png',
      editions: [ 'Java', 'Bedrock' ],
      res: [ '32x', '64x' ],
      selectedEditions: [ 'Java', 'Bedrock' ],
      selectedRes: [ '32x', '64x' ],
      fav: {}
    }
  },
  methods: {
    startSearch: function () {
      if (this.search == '' && this.editions.length + this.res.length == this.selectedEditions.length + this.selectedRes.length) this.searchedAddons = this.addons
      else {
        this.searchedAddons = {}

        for (const addonID in this.addons) {
          if (this.addons[addonID].title.toLowerCase().includes(this.search.toLowerCase()) || this.search == '') {

            let local_res = []
            let local_editions = []

            // split types of an addon (res + edition : res & edition)
            for (let i = 0; this.addons[addonID].type[i]; i++) {
              if (this.editions.includes(this.addons[addonID].type[i]))
                local_editions.push(this.addons[addonID].type[i])
              if (this.res.includes(this.addons[addonID].type[i]))
                local_res.push(this.addons[addonID].type[i])
            }

            // search if edition then check if res
            for (let i = 0; local_editions[i]; i++) {
              if (this.selectedEditions.includes(local_editions[i])) {
                for (let j = 0; local_res[j]; j++) {
                  if (this.selectedRes.includes(local_res[j])) this.searchedAddons[addonID] = this.addons[addonID]
                }
              }
            }

          }
        }
      }

      this.$forceUpdate() // force update (because it can be a bit long to process)
    },
    clearSearch: function () {
      this.search = ''
      this.startSearch()
    },
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
    .then(data => {
      this.addons = data
      this.searchedAddons = data
      this.loading = false
    })

    this.fav = JSON.parse(window.localStorage.getItem("favAddons") || "{}")
  },
}