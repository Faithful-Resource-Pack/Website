/* global Vue, getJSON, getRequest, MinecraftUtils, location */

const regex = /\s\(by\s.*\)/

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
    form: {
      search: '',
      minSearchLetters: 3
    },
    sentences: {
      searchAdvice: 'You can search by name or by version',
      lettersLeft: 'letters to start search...',
      loading: 'Loading mods...',
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
    downloadModpackFromModlist: function (codeName, displayName, modpackVersion, minecraftVersion, blackList = []) {
      const that = this
      const relativePath = codeName + '/' + modpackVersion

      getRequest('/data/modpack/' + relativePath + '/modlist.html', {}, function (html, err) {
        if (err) {
          console.error(relativePath, err)
          return
        }

        // filling list with html content
        const modNamesList = document.createElement('ul')
        modNamesList.innerHTML = html

        // extracting mod names from list
        const modNamesElements = [...modNamesList.getElementsByTagName('li')]

        const modNames = modNamesElements.map(mod => mod.textContent.replace(regex, '')).sort()

        // pushing mods
        that.modpacks.push({
          modpackName: displayName,
          modpackVersion: modpackVersion,
          minecraftVersion: minecraftVersion,
          blackList: blackList,
          coverSource: 'data/modpack/' + relativePath + '/../pack.png',
          modList: modNames
        })
      })
    },
    downloadAllModpacks: function () {
      const that = this

      getJSON('data/mods.json', (err, json) => {
        if (err) {
          console.error(err)
          return
        }
        that.mods = json
      })

      getJSON('/data/modpack/modpackList.json', function (err, json) {
        if (err) {
          console.error(err)
          return
        }

        that.globalBlackList = json.globalBlackList

        json.modpacks.forEach(modpack => {
          Object.keys(modpack.versions).forEach(minecraftVersion => {
            modpack.versions[minecraftVersion].forEach(modpackVersion => {
              that.downloadModpackFromModlist(modpack.codeName, modpack.displayName, modpackVersion, minecraftVersion, [...that.globalBlackList.default, ...that.globalBlackList[minecraftVersion], ...modpack.blackList.default, ...modpack.blackList[minecraftVersion]])
            })
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
    filteredSortedModpacks: function () {
      return this.filteredModpacks.sort((a, b) => {
        let result = 0

        if (a.modpackName === b.modpackName) {
          if (a.modpackVersion === b.modpackVersion) {
            const numbers = MinecraftUtils.minecraftVersionsToNumbers(a.minecraftVersion, b.minecraftVersion)
            result = numbers[0] > numbers[1] ? 1 : -1
          } else {
            if (parseFloat(a.modpackVersion) === parseFloat(b.modpackVersion)) {
              result = a.modpackVersion > b.modpackVersion ? 1 : -1
            } else {
              result = parseFloat(a.modpackVersion) > parseFloat(b.modpackVersion) ? 1 : -1
            }
          }
        } else {
          result = a.modpackName > b.modpackName ? 1 : -1
        }

        return result
      })
    },
    modListCorrespondance: function () {
      if (!this.currentModpack) return undefined

      const result = []

      console.log(this.currentModpack.blackList)

      let notfound
      let supportedModIndex
      let startIndex = 0
      this.currentModpack.modList.forEach(mod => {
        notfound = true
        supportedModIndex = startIndex

        // optimized search :
        // this.mods[supportedModIndex].name[0] <= mod, we stop looking if name is greater
        // <= VERY important so that if result is equal it doesn't exit
        while (supportedModIndex < this.mods.length && this.mods[supportedModIndex].name[0] <= mod && notfound) {
          // console.log(mod + ' / ' + this.mods[supportedModIndex].name[0])

          if (this.mods[supportedModIndex].name[0] === mod && this.mods[supportedModIndex].versions.includes(this.currentModpack.minecraftVersion)) {
            // console.log('found')
            result.push(this.mods[supportedModIndex])
            notfound = false
            startIndex = supportedModIndex
          }

          if (this.currentModpack.blackList.includes(mod)) {
            // console.log('blacklisted:' + mod)
            result.push('blacklisted')
            notfound = false
            startIndex = supportedModIndex
          }

          ++supportedModIndex
        }

        // optimized search
        if (notfound) {
          result.push(undefined)
          if (supportedModIndex < this.mods.length) {
            startIndex = supportedModIndex
          }
        }
      })

      // console.log(result)

      return result
    },
    emptyTable: function () {
      if (this.modpacks.length === 0) return this.sentences.failed

      if (this.form.search.length >= 1 && !isNaN(parseInt(this.form.search.charAt(0))) && this.filteredModpacks.length === 0) {
        return this.sentences.noResultsVersion + ' ' + this.form.search
      }

      if (this.filteredModpacks.length === 0) return this.sentences.noresults + this.form.search

      return ''
    },
    searchAdvice: function () {
      if (this.modpacks.length === 0) { return '' }

      if (this.form.search.length >= 1 && !isNaN(parseInt(this.form.search.charAt(0))) && this.filteredModpacks.length === 0) { return this.sentences.typeAnotherVersion + ' ' + this.form.search }

      if (this.form.search.length < this.form.minSearchLetters) { return String((this.form.minSearchLetters - this.form.search.length) + ' ' + this.sentences.lettersLeft) }

      return ''
    }
  },
  created: function () {
    getJSON('data/versions.json', (err, json) => {
      if (err) {
        console.error(err)
        return
      }

      this.versions = json
    })

    this.downloadAllModpacks()
  }
})
