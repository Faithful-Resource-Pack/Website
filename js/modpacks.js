/* global Vue, getJSON, getRequest */

const regex = /\s\(by\s.*\)/

const v = new Vue({ // eslint-disable-line no-unused-vars
  el: '#modpacks',
  data: {
    modpackModalOpened: false,
    currentModpackIndex: -1,
    modpacks: [],
    mods: [],
    versions: []
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

      getJSON('/data/modpack/modpackList.json', function(err, list) {
        if (err) {
          console.error(err)
          return
        }

        list.forEach(modpack => {
          Object.keys(modpack.versions).forEach(minecraftVersion => {
            modpack.versions[minecraftVersion].forEach(modpackVersion => {
              that.downloadModpackFromModlist(modpack.codeName, modpack.displayName, modpackVersion, minecraftVersion, [...modpack.blackList.default, ... modpack.blackList[minecraftVersion]])
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
          if (this.mods[supportedModIndex].name[0] === mod && this.mods[supportedModIndex].versions.includes(this.currentModpack.minecraftVersion)) {
            result.push(this.mods[supportedModIndex])
            notfound = false
            startIndex = supportedModIndex
          }

          ++supportedModIndex
        }

        if (notfound) {
          if (this.currentModpack.blackList.includes(this.mods[supportedModIndex - 1].name[0])) {
            result.push('blacklisted')
          } else {
            result.push(undefined)
          }

          // optimize search
          if (supportedModIndex < this.mods.length) {
            startIndex = supportedModIndex
          }
        }
      })

      return result
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
