/* global Vue, getJSON */

const regex = /\s\(by\s.*\)/

const v = new Vue({ // eslint-disable-line no-unused-vars
  el: '#modpacks',
  data: {
    modpackModalOpened: false,
    currentModpackIndex: -1,
    modpacks: [
      {
        modpackName: 'Ragnamod V',
        modpackVersion: '5.8.0',
        minecraftVersion: '1.12.2',
        coverSource: '/image/modpack/ragnamodv.png',
        modList: []
      },
      {
        modpackName: 'Enigmatica 2',
        modpackVersion: '1.77',
        minecraftVersion: '1.12.2',
        coverSource: '/image/modpack/enigmatica2.png',
        modList: []
      },
      {
        modpackName: 'Dungeons, Dragons and Space Shuttles',
        modpackVersion: '7.4a',
        minecraftVersion: '1.12.2',
        coverSource: 'image/modpack/dungeons,dragonsandspacesshuttles.png',
        modList: []
      }
    ],
    mods: [],
    versions: []
  },
  methods: {
    openModpackModal: function (index) {
      this.currentModpackIndex = index
      this.modpackModalOpened = true
    },
    downloadModpackFromModlist: function (relativePath, displayName, modpackVersion, minecraftVersion) {
      const that = this
      getRequest('/data/modpack/' + relativePath + '/modlist.html', {}, function(html, err) {
        if (err) {
          console.error(err)
          return
        }

        // filling list with html content
        const modNamesList = document.createElement( 'ul' )
        modNamesList.innerHTML = html

        // extracting mod names from list
        const modNamesElements = [ ...modNamesList.getElementsByTagName('li')]

        const modNames = modNamesElements.map(mod => mod.textContent.replace(regex, '')).sort()

        console.log(modNames)

        // pushing mods
        that.modpacks.push({
          modpackName: displayName,
          modpackVersion: modpackVersion,
          minecraftVersion: minecraftVersion,
          coverSource: 'data/modpack/' + relativePath + '/../pack.png',
          modList: modNames
        })
      })
    },
    downloadAllModpacks: function() {
      const that = this
      getJSON('/data/modpack/modpackList.json', function(err, list) {
        if (err) {
          console.error(error)
          return
        }

        list.forEach(modpack => {
          Object.keys(modpack.versions).forEach(minecraftVersion => {
            modpack.versions[minecraftVersion].forEach(modpackVersion => {
              that.downloadModpackFromModlist(modpack.codeName + '/' + modpackVersion, modpack.displayName, modpackVersion, minecraftVersion)
            })
          })
        })
      })
    },
    downloadModpackList: function (src, modpackIndex = undefined) {
      const that = this
      getJSON(src, function (err, json) {
        if (err) {
          console.error(err)
          return
        }

        let tmp = Array.isArray(json) && json.length > 0 ? json[0] : json

        that.modpacks[modpackIndex].modpackName = tmp.name
        that.modpacks[modpackIndex].minecraftVersion = tmp.version
        that.modpacks[modpackIndex].modpackVersion = tmp['modpack-version']
        that.modpacks[modpackIndex].modList = (tmp.mods.sort())
      })

      getJSON('data/mods.json', (err, json) => {
        if (err) {
          console.error(err)
          return
        }
        that.mods = json
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
          result.push(undefined)

          // optimize search
          if (supportedModIndex < this.mods.length) {
            startIndex = supportedModIndex
          }
        }
      })

      return result
    }
  },
  mounted: function () {
    this.downloadModpackList('/data/modpack/ragnamodv.json', 0)

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
