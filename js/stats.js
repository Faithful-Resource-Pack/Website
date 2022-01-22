/* global Vue, getJSON, */

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
const v = new Vue({ // eslint-disable-line no-unused-vars
  el: '#stats',
  data: {
    addons: {},
    keys: ['numberOfMinecraftVersions', 'totalNumberOfResourcePacksStored', 'numberOfModsSupported'],
    messages: {
      loading: 'Loading',
      numberOfMinecraftVersions: 'Minecraft Versions Supported',
      numberOfModsSupported: 'Mods Supported',
      totalNumberOfResourcePacksStored: 'Mod Resource Packs Stored'
    },
    loading: true,
    numberOfMinecraftVersions: undefined,
    numberOfModsSupported: undefined,
    totalNumberOfResourcePacksStored: undefined
  },
  methods: {
  },
  computed: {
    loadingMessage: function () {
      return '<i class="fas fa-circle-notch fa-spin"></i> ' + this.messages.loading
    },
    addonsStats: function () {
      // super duper dynamic addons stats
      const result = {}
      const editions = []
      Object.values(this.addons).map(e => e.options.tags).forEach(types => {
        types.filter(e => !isNaN(parseInt(e))).forEach(resolution => {
          if(result[resolution] === undefined) result[resolution] = {}
          types.filter(e => isNaN(parseInt(e))).forEach(edition => {
            if(editions.indexOf(edition) === -1) editions.push(edition)
            if(result[resolution][edition] === undefined) result[resolution][edition] = 0
            result[resolution][edition]++
          })
        })
      })
      Object.keys(result).forEach(res => {
        editions.forEach(e => {
          if(result[res][e] === undefined) result[res][e] = 0
        })
      })

      return result
    }
  },
  mounted: function () {
    getJSON('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/mods/mods.json', (err, json) => {
      if (err) {
        console.error(err)
        return
      }

      const mods = json
      const versions = []
      let resourcePacks = 0

      mods.forEach(mod => {
        mod.versions.forEach(version => {
          // version sum
          if (!versions.includes(version)) versions.push(version)

          // resource pack sum
          ++resourcePacks
        })
      })

      this.numberOfMinecraftVersions = versions.length
      this.numberOfModsSupported = mods.length
      this.totalNumberOfResourcePacksStored = resourcePacks

      this.loading = false
    })

    fetch('https://database.compliancepack.net/firestorm/files/addons.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.addons = data
      })
      .catch(() => {
        this.addons = undefined
      })
  }
})
