/* global Vue, axios */
/* eslint no-multi-str: 0 */

const _MOD_NOT_FOUND_MESSAGE = 'Found no thumbnail for this mod'
const _NO_LINK = null
const _NO_ICON = 'https://database.faithfulpack.net/images/branding/logos/transparent/512/mods_logo.png'
const _NO_ATTACHMENTS = -1

Vue.component('minecraft-mod', {
  props: {
    mod: Object
  },
  template:
    `<li class="mod-bar" :class="{ 'selected-mod': mod.selected }" v-if="!mod.blacklisted && mod.resource_pack.versions.length > 0">
      <label :for="repoURL" class="mod-label">Select this mod</label>
      <div :style="imageStyle" class="mod-img">
        <img :src="$root.apiURL + '/v2/mods/' + this.modId() + '/thumbnail'" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" :alt="name" :title="name" loading="lazy" />
        <img :src="imageSource" style="display: none; opacity: .3" />
        <div class="mod-img-overlay"></div>
      </div>
      <div class="mod-bar-item">
        <input :id="repoURL" type="checkbox" v-model="mod.selected" class="mod-checkbox">
        <div class="mod-title" v-html="title"></div>
        <div :class="{ modNotChosen: !mod.selected }" class="mod-radio-group"
          ><template v-for="(version, vindex) in minecraftVersions":key="modIds[vindex]"
            ><input
              :disabled="!mod.selected"
              type="radio"
              :id="modIds[vindex] + '-' + version"
              :name="modIds[vindex]"
              v-model="mod.versionSelected"
              :value="version"
              class="mod-radio"
            ><label :for="modIds[vindex] + '-' + version">{{ version }}</label
            ></template>
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
  },
  computed: {
    /** @returns {String} of joined aliases in <span>*/
    aliases() {
      return this.$props.mod.aliases.length > 0 ? '<span class="dash">&nbsp;&dash;&nbsp;</span><h5 class="advice">' + this.$props.mod.aliases.join(', ') + '</h5>' : ''
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
      if (this.imageSource !== _NO_ICON) return ''
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
})
