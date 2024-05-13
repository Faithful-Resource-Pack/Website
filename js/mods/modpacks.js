/* global Vue, axios, MinecraftUtils, location */

const _MODPACK_NOT_FOUND_MESSAGE = 'Found no thumbnail for this modpack'
const _NO_LINK = null
const _NO_ICON = 'https://database.faithfulpack.net/images/branding/logos/transparent/512/mods_logo.png'
const _NO_ATTACHMENTS = -1

document.addEventListener("DOMContentLoaded", () => {
  Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
  const v = new Vue({ // eslint-disable-line no-unused-vars
    el: '#modpacks',
    data() {
      return {
        modpackModalOpened: false,
        currentModpackIndex: -1,
        modpacks: [],
        mods: [],
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
        },
      };
    },
    methods: {
      openModpackModal(index) {
        this.currentModpackIndex = index
        this.modpackModalOpened = true
      },
      downloadModpackFromModList(modpackId, modpackName, modpackVersion, minecraftVersion, modsId = []) {
        this.modpacks.push({
          modpackName: modpackName,
          modpackVersion: modpackVersion,
          minecraftVersion: minecraftVersion,
          coverSource: `${this.apiURL}/v2/mods/${modpackId}/thumbnail`,
          modList: modsId,
        })
      },
      getDataFromDB() {
        fetch(`${this.apiURL}/v2/mods/raw`)
          .then((res) => res.json())
          .then((json) => {
            this.mods = json
            this.loading = false
          })
          .catch(console.error)

        fetch(`${this.apiURL}/v2/modpacks/raw`)
          .then((res) => res.json())
          .then((json) => {
            // sort by modpack name value
            const sortable = []
            for (const mod in json) {
              sortable.push([mod, json[mod]])
            }
            sortable.sort((a, b) => {
              if (a[1].name.toLowerCase() < b[1].name.toLowerCase()) return -1
              if (a[1].name.toLowerCase() > b[1].name.toLowerCase()) return 1
              return 0
            })

            const sorted = []
            sortable.forEach((item) => sorted.push({ ...item[1], id: item[0] }))

            sorted.forEach((modpack) => {
              Object.keys(modpack.versions).forEach((version) => {
                this.downloadModpackFromModList(
                  modpack.id,
                  modpack.name,
                  version,
                  modpack.versions[version].minecraft,
                  modpack.versions[version].mods
                )
              })
            })
          }).catch(console.error)
      }
    },
    computed: {
      apiURL() {
        return window.location.hostname === '127.0.0.1' ?
          'http://localhost:8000' :
          'https://api.faithfulpack.net'
      },
      currentModpack() {
        return this.currentModpackIndex > -1 ? this.modpacks[this.currentModpackIndex] : undefined
      },
      filteredModpacks() {
        if (this.modpacks.length === 0) {
          return []
        }

        if (this.form.search.length >= 1 && !isNaN(parseInt(this.form.search.charAt(0)))) {
          return this.modpacks.filter((mp) => {
            return mp.minecraftVersion.startsWith(this.form.search) || mp.modpackVersion.startsWith(this.form.search)
          })
        }

        if (this.form.search.length >= this.form.minSearchLetters) {
          return this.modpacks.filter((mp) => mp.modpackName.toLowerCase().includes(this.form.search.toLowerCase()))
        }

        return this.modpacks
      },
      searchAdvice() {
        if (this.modpacks.length === 0) { return '' }
        if (
          this.form.search.length >= 1 &&
          !isNaN(parseInt(this.form.search.charAt(0))) &&
          this.filteredModpacks.length === 0
        )
          return this.sentences.typeAnotherVersion + ' ' + this.form.search
        if (this.form.search.length < this.form.minSearchLetters)
          return String((this.form.minSearchLetters - this.form.search.length) + ' ' + this.sentences.lettersLeft)
        return ''
      }
    },
    created() {
      document.addEventListener('DOMContentLoaded', () => {
        retryAxios.attach(axios, {
          retries: 5,
          retryDelay: () => 3000
        })
      })

      this.getDataFromDB()
    }
  })
})
