/* global Vue, axios, getJSON, getRequest, MinecraftUtils, location */

const _MODPACK_NOT_FOUND_MESSAGE = 'Found no thumbnail for this modpack'
const _NO_LINK = null
const _NO_ICON = 'https://database.faithfulpack.net/images/branding/logos/transparent/512/mods_logo.png'
const _NO_ATTACHMENTS = -1

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
const v = new Vue({ // eslint-disable-line no-unused-vars
  el: '#modpacks',
  data: {
    modpackModalOpened: false,
    currentModpackIndex: -1,
    modpacks: [],
    mods: [],
    versions: [],
    globalBlackList: [],
    loading: true,
    form: {
      search: '',
      minSearchLetters: 3
    },
    sentences: {
      searchAdvice: 'You can search by name or by version',
      lettersLeft: 'letters to start search...',
      loading: '<i class="fas spin"></i> Loading mods...',
      failed: 'Failed to load mods. Check console for more informations',
      noresults: 'No results found for your search: ',
      noResultsVersion: 'No results found for version',
      typeAnotherVersion: 'Try to type another version than'
    }
  },
  methods: {
    openModpackModal: function (index) {
      this.currentModpackIndex = index
      this.modpackModalOpened = true
    },
    emptyTable: function () {
      if (this.loading === true) return this.sentences.loading

      if (this.mods.length === 0) return this.sentences.failed

      if (this.form.search.length >= 1 && !isNaN(parseInt(this.form.search.charAt(0))) && this.filteredMods.length === 0) {
        return this.sentences.noResultsVersion + ' ' + this.form.search
      }

      if (this.filteredMods.length === 0) return this.sentences.noresults + this.form.search

      return ''
    },
    downloadModpackFromModList: function (modpackId, modpackName, modpackVersion, minecraftVersion, modsId = []) {
      this.modpacks.push({
        modpackName: modpackName,
        modpackVersion: modpackVersion,
        minecraftVersion: minecraftVersion,
        coverSource: `https://api.faithfulpack.net/v2/mods/${modpackId}/thumbnail`,
        modList: modsId,
      })
    },
    getDataFromDB: function () {
      getJSON('https://api.faithfulpack.net/v2/mods/raw', (err, json) => {
        if (err) {
          console.error(err)
          return
        }

        this.mods = json
        this.loading = false
      })

      getJSON('https://api.faithfulpack.net/v2/modpacks/raw', (err, json) => {
        if (err) {
          console.error(err)
          return
        }

        // sort by modpack name value
        let sortable = []
        for (const mod in json) {
          sortable.push([mod, json[mod]])
        }
        sortable.sort((a, b) => {
          if (a[1].name.toLowerCase() < b[1].name.toLowerCase()) return -1
          if (a[1].name.toLowerCase() > b[1].name.toLowerCase()) return 1
          return 0
        })

        let sorted = []
        sortable.forEach(item => sorted.push({ ...item[1], id: item[0] }))

        sorted.forEach(modpack => {
          Object.keys(modpack.versions).forEach(version => {
            this.downloadModpackFromModList(modpack.id, modpack.name, version, modpack.versions[version].minecraft, modpack.versions[version].mods)
          })
        })

      })
    }
  },
  computed: {
    currentModpack: function () {
      return this.currentModpackIndex > -1 ? this.modpacks[this.currentModpackIndex] : undefined
    },
    filteredModpacks: function () {
      if (this.modpacks.length === 0) {
        return []
      }

      if (this.form.search.length >= 1 && !isNaN(parseInt(this.form.search.charAt(0)))) {
        return this.modpacks.filter(mp => {
          return mp.minecraftVersion.startsWith(this.form.search) || mp.modpackVersion.startsWith(this.form.search)
        })
      }

      if (this.form.search.length >= this.form.minSearchLetters) {
        return this.modpacks.filter(mp => mp.modpackName.toLowerCase().includes(this.form.search.toLowerCase()))
      }

      return this.modpacks
    },
    searchAdvice: function () {
      if (this.modpacks.length === 0) { return '' }
      if (this.form.search.length >= 1 && !isNaN(parseInt(this.form.search.charAt(0))) && this.filteredModpacks.length === 0) { return this.sentences.typeAnotherVersion + ' ' + this.form.search }
      if (this.form.search.length < this.form.minSearchLetters) { return String((this.form.minSearchLetters - this.form.search.length) + ' ' + this.sentences.lettersLeft) }

      return ''
    }
  },
  created: function () {
    getJSON('https://api.faithfulpack.net/v2/mods/pack_versions', (err, json) => {
      if (err) {
        console.error(err)
        return
      }

      this.versions = json
    })

    this.getDataFromDB()
  }
})
