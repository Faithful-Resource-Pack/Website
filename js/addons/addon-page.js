/* global fetch */

const AddonGrid = () => import('./addon-grid.js')

function sortObj(obj) {
  return Object.keys(obj).sort().reduce((res, key) => {
    res[key] = obj[key]
    return res
  }, {});
}

export default {
  name: 'addon-page',
  components: {
    AddonGrid
  },
  template: `
  <v-container
    style="max-width: 1140px; padding-top: 100px; padding-bottom: 100px"
  >
    <h2 class="text-center" style="font-size: 4.8rem; font-weight: 300; line-height: 1.2; margin-bottom: 3rem; margin-top: 3rem">Add-ons</h2>

    <template v-if="Object.keys(fav).length">
      <h3 class="text-center">Favorites</h3>
      <addon-grid
        :key="Object.keys(fav).length"
        :addons="fav"
        :action="checkFav"
        icon="mdi-close"
        iconColor="#ff3333"
        :addonsFav="fav"
      >
      </addon-grid>
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
          :disabled="selectedEditions.length === 1 && selectedEditions[0] === type"
          :value="type"
          color="primary"
          @change="startSearch"
        >
        </v-checkbox>
        <v-checkbox
          v-for="type in res"
          v-model="selectedRes"
          :label="type"
          :disabled="selectedRes.length === 1 && selectedRes[0] === type"
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
        dark
        placeholder="Search add-on name"
        type="text"
        v-on:keyup.enter="startSearch"
        @click:append-outer="startSearch"
        @click:clear="clearSearch"
      ></v-text-field>
    </div>
    <br>

    <addon-grid
      :key="Object.keys(fav).length"
      :addons="searchedAddons"
      :action="checkFav"
      icon="mdi-star"
      iconColor="#ffc83d"
      :addonsFav="fav"
    >
    </addon-grid>

  </v-container>
  `,
  data() {
    return {
      addons: {},
      searchedAddons: {},
      search: '',
      loading: true,
      optifine: '/image/icon/optifine.png',
      bedrock: '/image/icon/bedrock.png',
      java: '/image/icon/java.png',
      editions: ['Java', 'Bedrock'],
      res: ['32x', '64x'],
      selectedEditions: ['Java', 'Bedrock'],
      selectedRes: ['32x', '64x'],
      fav: {}
    }
  },
  methods: {
    startSearch: function () {
      if (this.search === '' && this.editions.length + this.res.length === this.selectedEditions.length + this.selectedRes.length) this.searchedAddons = this.addons
      else {
        this.searchedAddons = {}

        for (const addonID in this.addons) {
          if (this.addons[addonID].name.toLowerCase().includes(this.search.toLowerCase()) || this.search === '') {
            const localRes = []
            const localEditions = []

            // split types of an addon (res + edition : res & edition)
            const tags = this.addons[addonID].options.tags
            for (let tagIndex = 0; tagIndex < tags.length; tagIndex++) {
              if (this.editions.includes(tags[tagIndex])) localEditions.push(tags[tagIndex])
              if (this.res.includes(tags[tagIndex])) localRes.push(tags[tagIndex])
            }

            // search if edition then check if res
            for (let i = 0; localEditions[i]; i++) {
              if (this.selectedEditions.includes(localEditions[i])) {
                for (let j = 0; localRes[j]; j++) {
                  if (this.selectedRes.includes(localRes[j])) this.searchedAddons[addonID] = this.addons[addonID]
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
        window.localStorage.setItem('favAddons', JSON.stringify(this.fav))
      } else {
        delete this.fav[addon.id]
        window.localStorage.setItem('favAddons', JSON.stringify(this.fav))
      }

      this.$forceUpdate()
    }
  },
  mounted: function () {
    fetch('https://database.compliancepack.net/firestorm/files/addons.json')
      .then(res => res.json())
      .then(data => {
        this.addons = sortObj(data)
        this.loading = false

        for (const addonID in this.addons) this.addons[addonID].id = addonID // fix missing ID (property value)

        this.searchedAddons = this.addons
      })

    this.fav = JSON.parse(window.localStorage.getItem('favAddons') || '{}')
  }
}
