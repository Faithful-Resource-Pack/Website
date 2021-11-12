/* global Vue, axios */
/* eslint no-multi-str: 0 */

const _MOD_NOT_FOUND_MESSAGE = 'Found no thumbnail for this mod'
const _NO_LINK = null
const _NO_ICON = '/image/icon/compliance_mods.png'
const _NO_ATTACHMENTS = -1

Vue.component('minecraft-mod', {
  props: {
    mod: Object
  },
  template:
    `<li class="mod-bar" :class="{ 'selected-mod': mod.selected }" v-if="!mod.blacklisted && mod.resource_pack.versions.length > 0">
      <label :for="repoURL" class="mod-label">Select this mod</label>
      <div :style="imageStyle" class="mod-img">
        <div class="mod-img-overlay"></div>
      </div>
      <div class="mod-bar-item">
        <input :id="repoURL" type="checkbox" v-model="mod.selected" class="mod-checkbox">
        <div class="mod-title" v-html="title"></div>
        <div :class="{ modNotChosen: !mod.selected }" class="mod-radio-group">
          <template v-for="(version, vindex) in minecraftVersions":key="modIds[vindex]">
            <input :disabled="!mod.selected" type="radio" :id="modIds[vindex]" :name="modIds[vindex]"  v-model="mod.versionSelected" :value="version" class="mod-radio">
            <label :for="modIds[vindex]" class="mod-radio">{{ version }}</label>
          </template>
        </div>
      </div>
    </li>`,
  data() {
    return {
      searchPages: 3,
      imageSource: _NO_ICON,
      link: _NO_LINK
    }
  },
  methods: {
    modId() {
      return this.mod.id
    },
    searchCurseforge(id) {
      if (id === undefined) return Promise.reject(new Error('id is undefined'))

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
    makeSearch: function (id) {
      return new Promise((resolve, reject) => {
        if (isNaN(id)) resolve({})
        else this.searchCurseforge(id)
          .then(results => {
            resolve(results)
          })
          .catch(err => {
            reject(new Error(_MOD_NOT_FOUND_MESSAGE + '\n' + err))
          })
      })
    },
    updateThumbnail() {
      const result = this.$parent.searchCache(this.name)

      if (result) {
        this.imageSource = result.imageSource
        this.link = result.link
        return
      }

      this.makeSearch(this.mod.id).then(result => {
        const attachments = result.attachments

        // set icon with default attachment
        let index = _NO_ATTACHMENTS
        if (attachments && attachments.length > 0) {
          index = Math.max(0, attachments.findIndex(att => att.isDefault)) // isDefault: true -> current project image
          this.imageSource = attachments[index].thumbnailUrl
        }

        // set link
        this.link = result.websiteUrl

        // add image to cache
        this.$parent.thumbnailCache.push({
          modName: this.name,
          imageSource: this.imageSource,
          link: this.link
        })
      }).catch(err => {
        if (err.message !== _MOD_NOT_FOUND_MESSAGE) {
          console.error(err)
          console.error(this.name)
        } else {
          this.$parent.thumbnailCache.push({
            modName: this.dispatch,
            imageSource: this.imageSource,
            link: _NO_LINK
          })
        }
      })
    }
  },
  computed: {
    /** @returns {String} of joined aliases in <span>*/
    aliases() {
      return this.$props.mod.aliases.length > 0 ? '&nbsp;&dash;&nbsp;<h5 class="advice">' + this.$props.mod.aliases.join(', ') + '</h5>' : ''
    },
    /** @returns {String} complete curseforge mod url*/
    curseURL() {
      return this.$props.mod.curseURL || _NO_LINK
    },
    /** @returns {String} info link to curseforge's mod page*/
    info() {
      const link = this.$props.mod.curse_url || _NO_LINK

      if (link === _NO_LINK) return ''
      return '<a href="' + link + '" target="_blank" rel="noopener" title="' + link + '" class="mod-info icon arrow-up-right"></a>'
    },
    /** @returns {String} main mod name s*/
    name() {
      return this.$props.mod.name
    },
    /** @returns {String} background-img OR set opacity to 1*/
    imageStyle() {
      if (this.imageSource !== _NO_ICON) return 'background-image: url(' + this.imageSource + ')'
      return 'opacity: 1'
    },
    /** @returns {Array} of available versions */
    minecraftVersions() {
      return this.$props.mod.resource_pack.versions
    },
    /** @return {String} git repository full url */
    repoURL() {
      return this.$props.mod.resource_pack.git_repository
    },
    modIds() {
      return this.minecraftVersions.map(v => this.modId())
    },
    title() {
      return `<div><h4>${this.name}</h4>${this.aliases}</div>${this.info}`
    }
  },
  watch: {
    mod: function (newValue, oldValue) {
      if (oldValue !== newValue) {
        this.updateThumbnail()
      }
    }
  },
  created() {
    this.updateThumbnail()
  }
})
