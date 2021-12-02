/* global Vue, axios, getJSON, getRequest, MinecraftUtils, location */

const _MODPACK_NOT_FOUND_MESSAGE = 'Found no thumbnail for this modpack'
const _NO_LINK = null
const _NO_ICON = '/image/icon/compliance_mods.png'
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
      loading: '<i class="fas fa-circle-notch fa-spin"></i> Loading mods...',
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
    makeSearch(id) {
      return new Promise((resolve, reject) => {
        if (isNaN(id)) resolve({})
        else this.searchCursforge(id)
          .then(results => {
            resolve(results)
          })
          .catch(err => {
            reject(new Error(_MODPACK_NOT_FOUND_MESSAGE + '\n' + err))
          })
      })
    },
    searchCursforge(id) {
      if (id === undefined) return Promise.reject(new Error('modpack id is undefined'))

      return new Promise((resolve, reject) => {
        const api_url = `https://addons-ecs.forgesvc.net/api/v2/addon/${id}`
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent(api_url)}`
        // get allows us to have better control over the content returned and the status code

        axios(url)
          .then(res => {
            if (res.status !== 200 || res.data.status.http_code !== 200) return reject(new Error(`Could not load url: ${api_url}`))

            // parse content
            const result = JSON.parse(res.data.contents)

            if (result) return resolve(result)
            return reject(result)
          })
          .catch(err => {
            reject(new Error(err))
          })
      })
    },
    downloadModpackFromModlist: function (modpackId, modpackName, modpackVersion, minecraftVersion, modsId = []) {
      // const that = this
      // const relativePath = codeName + '/' + modpackVersion

      this.makeSearch(modpackId)
        .then(result => {
          const attachments = result.attachments
          let imageSource = _NO_ICON

          // set icon with default attachement
          let index = _NO_ATTACHMENTS
          if (attachments && attachments.length > 0) {
            index = Math.max(0, attachments.findIndex(att => att.isDefault)) // isDefault: true -> current project image
            imageSource = attachments[index].thumbnailUrl
          }

          // set link
          this.modpacks.push({
            modpackName: modpackName,
            modpackVersion: modpackVersion,
            minecraftVersion: minecraftVersion,
            coverSource: imageSource,
            modList: modsId
          })
        })
        .catch(err => {
          if (err.message !== _MODPACK_NOT_FOUND_MESSAGE) {
            console.error(err)
            console.error(this.name)
          }
          else {
            this.modpacks.push({
              modpackName: modpackName,
              modpackVersion: modpackVersion,
              minecraftVersion: minecraftVersion,
              coverSource: _NO_LINK,
              modList: modsId
            })
          }
        })
    },
    downloadAllModpacks: function () {
      getJSON('https://database.compliancepack.net/firestorm/files/mods.json', (err, json) => {
        if (err) {
          console.error(err)
          return
        }

        this.mods = json
        this.loading = false
      })

      getJSON('https://database.compliancepack.net/firestorm/files/modpacks.json', (err, json) => {
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
            this.downloadModpackFromModlist(modpack.id, modpack.name, version, modpack.versions[version].minecraft, modpack.versions[version].mods)
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
    getJSON('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/mods/versions.json', (err, json) => {
      if (err) {
        console.error(err)
        return
      }

      this.versions = json
    })

    this.downloadAllModpacks()
  }
})
