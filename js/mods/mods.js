/* global location, Vue, MinecraftUtils, getJSON */

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => (res[key] = obj[key], res), {});

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
const v = new Vue({ // eslint-disable-line no-unused-vars
  el: '#app',
  data: {
    form: {
      search: '',
      minSearchLetters: 3
    },
    isMounted: false,
    isLoadingDownload: false,
    loading: true,
    loadingVersions: true,
    mods: [],
    sentences: {
      searchAdvice: 'You can search by name or by version',
      lettersLeft: 'letters to start search...',
      loading: '<i class="fas fa-circle-notch fa-spin"></i> Loading mods...',
      failed: 'Failed to load mods. Check console for more informations',
      noresults: 'No results found for your search: ',
      noResultsVersion: 'No results found for version',
      typeAnotherVersion: 'Try to type another version than'
    },
    versions: {},
    breakpointLimits: {
      xs: 575,
      sm: 785,
      md: 1200,
      lg: Infinity
    },
    windowSize: window.innerWidth
  },
  computed: {
    breakpoints: function () {
      const result = {}

      const keys = Object.keys(this.breakpointLimits)

      for (let i = 0; i < keys.length; ++i) {
        result[keys[i]] = this.windowSize <= this.breakpointLimits[keys[i]]
      }

      return result
    },
    canPackMods: function () {
      return this.modPackageVersion !== undefined
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
    /**
     * Filter mods following the research
     * @returns {Object} corresponding mods
     */
    filteredMods: function () {
      if (this.form.search.length >= 1 && !isNaN(parseInt(this.form.search.charAt(0)))) {
        return this.mods.filter(mod => {
          let found = false
          let i = 0
          while (i < mod.resource_pack.versions.length && !found) {
            found = mod.resource_pack.versions[i].startsWith(this.form.search)
            ++i
          }

          return found
        })
      }

      if (this.form.search.length >= this.form.minSearchLetters) { return this.mods.filter(mod => this.modToDisplayName(mod).toLowerCase().includes(this.form.search.toLowerCase())) }
      return this.mods
    },
    exactVersionMode: function () {
      if (this.loadingVersions) { return false }

      return this.modSelection.findIndex(mod => {
        const correspondingNumbers = MinecraftUtils.minecraftVersionsToNumbers([this.versions['1'].min, mod.version])

        return correspondingNumbers[1] < correspondingNumbers[0]
      }) !== -1
    },
    modSelection: function () {
      const selection = this.mods.filter(mod => mod.selected && !!mod.versionSelected)

      return selection.map(mod => {
        return this.modToSelection(mod)
      })
    },
    downloadButtonText: function () {
      return this.isLoadingDownload ? '<i class="fas fa-spinner fa-spin"></i> Sending request...' : 'Download Resource Pack'
    },
    minecraftVersions: function () {
      const mcVersions = []

      for (let i = 0; i < this.mods.length; ++i) {
        for (let a = 0; a < this.mods[i].resource_pack.versions.length; ++a) {
          let index
          if ((index = mcVersions.findIndex(item => item.version === this.mods[i].resource_pack.versions[a])) === -1) {
            mcVersions.push({
              version: this.mods[i].resource_pack.versions[a],
              count: 1
            })
          } else {
            mcVersions[index].count = mcVersions[index].count + 1
          }
        }
      }

      return mcVersions
    },
    modPackageVersion: function () {
      // you can pack mods if they have the same package version number
      // (list of package number must not change)

      // we need mods and versions to be loaded
      if (this.loading || this.loadingVersions || this.modSelection.length === 0) { return undefined }

      let result
      let versionChanged = false
      let minecraftVersion

      let i = 0
      while (i < this.modSelection.length && !versionChanged) {
        if (this.exactVersionMode) {
          const tmp = this.modSelection[i].version

          if (minecraftVersion === undefined) {
            minecraftVersion = tmp
          } else {
            if (minecraftVersion !== tmp) { versionChanged = true }
          }
        } else {
          const tmp = this.packageVersion(this.modSelection[i].version)

          if (result === undefined) {
            result = tmp
          } else {
            if (result !== tmp) { versionChanged = true }
          }
        }

        ++i
      }

      return versionChanged ? undefined : (result || minecraftVersion)
    },
    searchAdvice: function () {
      if (this.loading === true || this.mods.length === 0) { return '' }

      if (this.form.search.length >= 1 && !isNaN(parseInt(this.form.search.charAt(0))) && this.filteredMods.length === 0) { return this.sentences.typeAnotherVersion + ' ' + this.form.search }

      if (this.form.search.length < this.form.minSearchLetters) { return String((this.form.minSearchLetters - this.form.search.length) + ' ' + this.sentences.lettersLeft) }
    }
  },
  methods: {
    modToDisplayName: function (mod) {
      return mod.name
    },
    modToRepoName: function (mod) {
      return mod.resource_pack.git_repository.split('/').pop()
    },
    modToRepoURL: function (mod) {
      return mod.resource_pack.git_repository
    },
    modToSelection: function (mod, version = undefined) {
      return {
        name: this.modToRepoName(mod),
        displayName: this.modToDisplayName(mod),
        repositoryURL: this.modToRepoURL(mod),
        version: mod.versionSelected || version
      }
    },
    packageVersion: function (modVersion) {
      const numbers = MinecraftUtils.minecraftVersionToNumberArray(modVersion)

      const versionKeys = Object.keys(this.versions)

      let i = 0
      let result = -1
      while (i < versionKeys.length && result === -1) {
        const otherNumbersMin = MinecraftUtils.minecraftVersionToNumberArray(this.versions[versionKeys[i]].min)
        const otherNumbersMax = MinecraftUtils.minecraftVersionToNumberArray(this.versions[versionKeys[i]].max)

        // we compute the corresponding numbers
        const correspondingNumbers = MinecraftUtils.minecraftVersionsToNumbers([numbers, otherNumbersMin, otherNumbersMax])

        if (correspondingNumbers[0] >= correspondingNumbers[1] && correspondingNumbers[0] <= correspondingNumbers[2]) {
          result = versionKeys[i]
        }

        ++i
      }

      if (result === -1) {
        throw new Error('No versions file')
      }

      return result
    }
  },
  mounted: function () {
    this.isMounted = true

    // acquire mods json from compliance database
    getJSON('https://database.compliancepack.net/firestorm/files/mods.json', (err, json) => {
      if (err) {
        console.error(err)
        return
      }

      // sort by mod name value
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

      this.mods = sorted
      this.loading = false
    })

    getJSON('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/mods/versions.json', (err, json) => {
      if (err) {
        console.error(err)
        return
      }

      this.loadingVersions = false
      this.versions = json
    })

    // we need this part for breakpoints
    this.windowSize = window.innerWidth
    window.addEventListener('resize', () => { this.windowSize = window.innerWidth })
  }
})
