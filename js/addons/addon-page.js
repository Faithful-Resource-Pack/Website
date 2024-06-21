/* global fetch */

const AddonGrid = () => import('./addon-grid.js')

export default {
  name: 'addon-page',
  components: {
    AddonGrid
  },
  template: `
    <v-container style="max-width: 1140px; padding: 44px 0 80px;">
      <h2 class="text-center" style="font-size: 4.8rem; font-weight: 300; line-height: 1.2; margin: 2rem 0">Add-ons</h2>

      <template v-if="Object.keys(fav).length">
        <h3 class="text-center">Favorites</h3>
        <addon-grid
          :key="Object.keys(fav).length"
          :addons="fav"
          :action="checkFav"
          icon="mdi-close"
          iconColor="#ff3333"
          :addonsFav="fav"
        />
        <br>
        <h3 class="text-center">All</h3>
      </template>

      <div class="card card-body">
        <h4 class="text-center">Search</h4>
        <div class="checkbox-container">
          <v-row no-gutters>
            <v-col
              cols="6"
              md="3"
              v-for="type in editions"
              :key="type"
            >
              <v-checkbox
                v-model="selectedEditions"
                :label="type"
                :disabled="selectedEditions.length === 1 && selectedEditions[0] === type"
                :value="type"
                color="primary"
                dark
                hide-details
                @change="startSearch"
              />
            </v-col>
            <v-col
              cols="6"
              md="3"
              v-for="type in res"
              :key="type"
            >
              <v-checkbox
                v-model="selectedRes"
                :label="type"
                :disabled="selectedRes.length === 1 && selectedRes[0] === type"
                :value="type"
                color="primary"
                dark
                hide-details
                @change="startSearch"
              />
            </v-col>
          </v-row>
        </div>
        <v-text-field
          v-model="search"
          :append-icon="search ? 'mdi-send' : undefined"
          filled
          clear-icon="mdi-close"
          clearable
          dark
          hide-details
          placeholder="Search add-on name"
          type="text"
          @keyup.enter="startSearch"
          @click:append="startSearch"
          @click:clear="clearSearch"
        />
        <br>
        <div class="addon-info-subtitle">
          <p>{{ resultCount }} {{ results }} found</p>
          <br>
          <v-select
            base-color="primary"
            dark
            hide-details
            dense
            v-model="currentSort"
            :items="sortMethods"
            item-text="label"
            item-value="value"
          />
        </div>
      </div>
      <br>
      <addon-grid
        :key="Object.keys(fav).length"
        :addons="searchedAddons"
        :action="checkFav"
        :sort="currentSort"
        icon="mdi-star"
        iconColor="#ffc83d"
        :addonsFav="fav"
      />
    </v-container>
  `,
  data() {
    const sortMethods = [
      { label: "Date (Newest to Oldest)", value: "dd" },
      { label: "Date (Oldest to Newest)", value: "da" },
      { label: "Name (A-Z)", value: "na" },
      { label: "Name (Z-A)", value: "nd" }
    ];
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
      fav: {},
      resultCount: 0,
      sortMethods,
      currentSort: sortMethods[0].value,
    }
  },
  methods: {
    startSearch() {
      if (
        this.search === '' &&
        this.editions.length + this.res.length === this.selectedEditions.length + this.selectedRes.length
      )
        this.searchedAddons = this.addons
      else {
        this.searchedAddons = this.addons
          .filter((addon) => {
            if (
              !addon.name.toLowerCase().includes(this.search.toLowerCase()) &&
              this.search !== ''
            )
              return false

            // split types of an addon (res + edition : res & edition)
            const { localRes, localEditions } = addon.options.tags.reduce(
              (acc, tag) => {
                if (this.res.includes(tag)) acc.localRes.push(tag)
                if (this.editions.includes(tag)) acc.localEditions.push(tag)
                return acc;
              },
              { localRes: [], localEditions: [] }
            )

            // search if edition then check if res
            if (!localEditions.some((edition) => this.selectedEditions.includes(edition))) return false
            if (!localRes.some((res) => this.selectedRes.includes(res))) return false
            return true
          })
          .reduce((acc, cur) => {
            acc[cur.id] = cur
            return acc
          }, {})
      }

      this.resultCount = Object.keys(this.searchedAddons).length;
      this.$forceUpdate() // force update (because it can be a bit long to process)
    },
    clearSearch() {
      this.search = ''
      this.startSearch()
    },
    checkFav(addon) {
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
  computed: {
    results() {
      return this.resultCount === 1 ? "result" : "results";
    }
  },
  created() {
    fetch('https://api.faithfulpack.net/v2/addons/approved')
      .then((res) => res.json())
      .then((data) => {
        this.addons = data
        this.loading = false
        this.resultCount = data.length;

        for (const addonID of Object.keys(this.addons))
          this.addons[addonID].id = addonID // fix missing ID (property value)

        this.searchedAddons = this.addons
      })

    this.fav = JSON.parse(window.localStorage.getItem('favAddons') || '{}')
  }
}
