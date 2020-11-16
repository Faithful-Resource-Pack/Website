/* global Vue, axios */
/* eslint no-multi-str: 0 */

const _MOD_NOT_FOUND_MESSAGE = 'Found no thumbnail for this mod'
const _NO_LINK = undefined
const _NO_ATTACHMENTS = -1

Vue.component('minecraft-mod', {
  props: {
    mod: Object
  },
  template:
    '<li class="mod-bar" :class="[mod.selected ? \'selected-mod\' : null]">\
      <label :for="mod.name[1]" class="mod-label">Select this mod</label>\
      <div :style="link ? { \'background-image\': \'url(\' + imageSource + \')\'} : {opacity: 0.3 }" class="mod-bar-item mod-img">\
        <div class="mod-img-overlay"></div>\
      </div>\
      <div class="mod-bar-item">\
        <input :id="mod.name[1]" type="checkbox" v-model="mod.selected" class="mod-checkbox">\
        <span>{{ mod.name[0] }}</span>\
        <a v-if="!!link" :href="link" target="_blank" rel="noopener" :title="link" class="ml-2 mod-info"><i class="fas fa-info-circle"></i></a>\
        <br>\
        <div :class="{ \'mt-1\': true, modNotChosen: !mod.selected }" class="mod-radio-group">\
          <template v-for="version in mod.versions":key="modId(mod, version)">\
            <input :disabled="!mod.selected" type="radio" :id="modId(mod, version)" :name="modId(mod, version)"  v-model="mod.versionSelected" :value="version" class="mod-radio">\
            <label :for="modId(mod, version)">{{ version }}</label>\
          </template>\
        </div>\
      </div>\
    </li>',
  methods: {
    modId: function (mod, version) {
      return String(mod.name[1] + '-' + version.replace(/\./g, ''))
    },
    search (index, searchFilter, _fullName = false) {
      return new Promise((resolve, reject) => {
        const size = index * 25
        const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://addons-ecs.forgesvc.net/api/v2/addon/search?gameId=432&pageSize=${size}&sectionId=6&searchFilter=${searchFilter}`)}`

        axios(url)
          .then(res => {
            const result = res.data.find(mod => {
              let found = false
              if (this.$props.mod.name[2]) {
                found = mod.websiteUrl.split('/').pop() === this.$props.mod.name[2]
              }

              return found || mod.name.toLowerCase() === this.$props.mod.name[0].toLowerCase()
            })

            if (result) {
              resolve(result)
            } else {
              reject(result)
            }
          })
          .catch(err => {
            reject(new Error(err))
          })
      })
    },
    makeSearch: function (index = 1, fullName = false) {
      return new Promise((resolve, reject) => {
        let searchFilter = fullName ? this.$props.mod.name[0] : this.$props.mod.name[2]
        this.search(index, searchFilter)
          .then(results => {
            resolve(results)
          }).catch(err => {
            if (isNaN(err)) {
              if (index < this.searchPages) {
                this.makeSearch(index + 1, fullName).then(res => {
                  resolve(res)
                }).catch(err => {
                  reject(err)
                })
              } else {
                if (!fullName) {
                  this.makeSearch(1, true).then(res => {
                    resolve(res)
                  }).catch(err => {
                    reject(err)
                  })
                } else {
                  // no mod was found
                  reject(new Error(_MOD_NOT_FOUND_MESSAGE))
                }
              }
            } else {
              // Axios error
              reject(new Error(err))
            }
          })
      })
    }
  },
  data: function () {
    return {
      searchPages: 3,
      imageSource: undefined,
      link: _NO_LINK
    }
  },
  mounted: function () {
    let result = this.$parent.searchCache(this.$props.mod.name[0])

    if (result) {
      this.imageSource = result.imageSource
      this.link = result.link
      return
    }

    this.makeSearch().then(result => {
      const attachments = result.attachments

      // set icon with default attachment
      let index = _NO_ATTACHMENTS
      if (attachments.length > 0) {
        index = Math.max(0, attachments.findIndex(att => att.isDefault))
        this.imageSource = attachments[index].thumbnailUrl
      }

      // set link
      this.link = result.websiteUrl

      // add image to cache
      this.$parent.thumbnailCache.push({
        modName: this.$props.mod.name[0],
        imageSource: this.imageSource,
        link: this.link
      })

    }).catch(err => {
      if (err.message !== _MOD_NOT_FOUND_MESSAGE) {
        console.error(err)
        console.error(this.$props.mod.name[2] || this.$props.mod.name[0])
      } else {
        // set default organization image

        this.imageSource = '/image/icon/compliance_mods.png'
        this.$parent.thumbnailCache.push({
          modName: this.$props.mod.name[0],
          imageSource: this.imageSource,
          link: _NO_LINK
        })
      }
    })
  }
})
