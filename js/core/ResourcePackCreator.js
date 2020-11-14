/* eslint new-cap: 0 */
/* global MinecraftUtils, axios, idb, JSZip */

const ResourcePackCreator = { // eslint-disable-line no-unused-vars
  packVersions: Array[String],
  database: undefined,
  databasePromise: undefined,
  storeName: undefined,
  zipOptions: undefined,

  modPackageVersion: function (modSelection) {
    // you can pack mods if they have the same package version number
    // (list of package number must not change)

    // we need mods and versions to be loaded
    if (modSelection.length === 0) { return undefined }

    let currentPackageVersion
    let versionChanged = false

    let i = 0
    while (i < modSelection.length && !versionChanged) {
      let tmpPackageVersion = this.packageVersion(modSelection[i].version)

      if (currentPackageVersion === undefined) {
        currentPackageVersion = tmpPackageVersion
      } else {
        if (currentPackageVersion !== tmpPackageVersion) { versionChanged = true }
      }

      ++i
    }

    return versionChanged ? undefined : currentPackageVersion
  },

  packageVersion: function (modVersion) {
    const numbers = MinecraftUtils.minecraftVersionToNumberArray(modVersion) // eslint-disable-line no-undef

    const packageVersionKeys = Object.keys(this.packVersions)

    let i = 0
    let result = -1
    while (i < packageVersionKeys.length && result === -1) {
      const otherNumbersMin = MinecraftUtils.minecraftVersionToNumberArray(this.packVersions[packageVersionKeys[i]].min)
      const otherNumbersMax = MinecraftUtils.minecraftVersionToNumberArray(this.packVersions[packageVersionKeys[i]].max)

      // we compute the corresponding numbers
      let correspondingNumbers = MinecraftUtils.minecraftVersionsToNumbers([numbers, otherNumbersMin, otherNumbersMax])

      if (correspondingNumbers[0] >= correspondingNumbers[1] && correspondingNumbers[0] <= correspondingNumbers[2]) {
        result = packageVersionKeys[i]
      }

      ++i
    }

    if (result === -1) {
      throw new Error('No package versions file')
    }

    return result
  },

  modToSelection: function (mod, version = undefined) {
    return {
      name: mod.name[1],
      displayName: mod.name[0],
      repository: mod.repository,
      version: mod.versionSelected || version
    }
  },

  canPackMods: function (modSelection, modPackageVersion = undefined) {
    if (modSelection) {
      return this.modPackageVersion(modSelection) !== undefined
    }

    return modPackageVersion !== undefined
  },

  requestDownloadMod: function (mod) {
    return new Promise((resolve, reject) => {
      axios({
        url:
          'https://api.allorigins.win/raw?url=https://github.com/' + mod.repository + '/' + mod.name + '/archive/' + mod.version + '.zip',
        method: 'GET',
        responseType: 'blob' // important
      })
        .then(res => {
          const fileKey = this.fileKey(mod)

          this.database.delete(this.storeName, fileKey).then(() => {
            this.database.put(this.storeName, res.data, fileKey)
          })

          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  fileKey: function (mod) {
    return mod.name + '-' + mod.version
  },

  getMod: function (mod, forceDownlaod = false, logListener = function () {}) {
    if (forceDownlaod) { return this.requestDownloadMod(mod) }

    if (typeof this.database === 'object' && 'get' in this.database) {
      return new Promise((resolve, reject) => {
        const fileKey = this.fileKey(mod)

        this.database.get(this.storeName, fileKey).then(res => {
          logListener({
            step: 2,
            message: 'Already downloaded ' + mod.displayName + ' v' + mod.version + ' in cache'
          })
          if (!res) { this.requestDownloadMod(mod).then(resolve).catch(reject) } else { resolve({ data: res }) }
        }).catch(() => {
          this.requestDownloadMod(mod).then(resolve).catch(reject)
        })
      })
    } else {
      return this.requestDownloadMod(mod)
    }
  },

  downloadLocally: function (modSelection, forceDownload = false, logListener = function () {}) {
    if (!this.database) {
      this.databasePromise.then(() => {
        this.downloadLocally(modSelection, forceDownload, logListener)
      })

      return
    }

    if (!this.storeName || !this.zipOptions || modSelection.length === 0) return

    // create final zip
    const finalZip = new JSZip()

    const promises = []

    modSelection.forEach(mod => {
      logListener({
        step: 0,
        message: 'Downloading ' + mod.displayName + ' v' + mod.version + '...'
      })

      promises.push(this.getMod(mod, forceDownload, logListener))
    })

    let success = 0
    Promise.all(promises).then((values) => {
      this.currentStep = 1
      values.forEach((res, index) => {
        logListener({
          step: 1,
          message: 'Extracting ' + modSelection[index].displayName + ' into final zip'
        })
        if (res.data.type === 'text/xml') {
          console.warn(modSelection[index])
        }

        const fileKey = this.fileKey(modSelection[index])

        // load this pack
        let zip = new JSZip()

        zip.loadAsync(res.data)
          .then((zip) => {
            const keys = Object.keys(zip.files)

            let newName
            for (let i = 0; i < keys.length; ++i) {
              newName = keys[i].replace(fileKey + '/', '')

              if (newName.trim() !== '') {
                finalZip.files[newName] = zip.files[keys[i]]
                finalZip.files[newName].name = newName
              }
            }

            ++success
            // if all archives have been successfully added
            if (success === modSelection.length) {
              logListener({
                step: 2,
                message: 'Zipping...'
              })

              finalZip.generateAsync(this.zipOptions, metadata => {
                logListener({
                  step: 2,
                  message: metadata.percent.toFixed(2)
                })
              }).then(blob => {
                logListener({
                  step: 3,
                  message: blob
                })
              }, err => {
                console.error(err)
              })
            }
          }).catch(err => {
            console.error('request', err)
          })
      })
    }).catch(reason => {
      console.error(reason)
    })
  },

  openDatabase: function (dataBaseName, databaseVersion, storeName) {
    this.storeName = storeName

    this.databasePromise = new Promise((resolve, reject) => {
      idb.openDB(dataBaseName, databaseVersion, {
        upgrade (db, _oldVersion, _newVersion, _transaction) {
          db.createObjectStore(storeName)
        }
      })
        .then(db => {
          this.database = db

          resolve()
        })
        .catch(err => {
          this.database = 1

          console.error(err)

          reject(new Error(err))
        })
    })
  }
}
