/* global Vue, getJSON, */

const v = new Vue({ // eslint-disable-line no-unused-vars
  el: '#stats',
  data: {

    keys: ['numberOfMinecraftVersions', 'totalNumberOfResourcePacksStored', 'numberOfModsSupported'],
    messages: {
      loading: 'Loading',
      numberOfMinecraftVersions: 'Number of minecraft versions supported',
      numberOfModsSupported: 'Number of mods supported',
      totalNumberOfResourcePacksStored: 'Total number of resource packs stored'
    },
    loading: true,
    numberOfMinecraftVersions: undefined,
    numberOfModsSupported: undefined,
    totalNumberOfResourcePacksStored: undefined
  },
  computed: {
    loadingMessage: function () {
      return this.loading ? '<i class="fas fa-circle-notch fa-spin"></i> ' + this.messages.loading : ''
    }
  },
  mounted: function () {
    getJSON('data/mods.json', (err, json) => {
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
  }
})
