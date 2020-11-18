/* global Vue */
/* eslint no-multi-str: 0 */

Vue.component('modpack-modal', {
  props: ['modpackmodalopened', 'modpack', 'onclose', 'modcorrespondance'],
  template:
    '<custom-modal v-if="modpack" :modalOpened="modpackmodalopened" :closeOnClick="onclose">\
      <h3 class="mt-0">{{ modpack.modpackName }}</h3>\
      <p class="advice mb-0">Modpack version: <span>{{ modpack.modpackVersion }}</span></p>\
      <p class="advice">Minecraft version: <span>{{ modpack.minecraftVersion }}</span></p>\
      <template v-if="modpack.modList && Array.isArray(modpack.modList) && modpack.modList.length">\
        <p class="mb-0">Mod list (<span>{{ modpack.modList.length }}</span>): <span>{{ numberOfModsFound }}</span> found, <span>{{ numberOfModsBlackListed }}</span> ignored - coverage: <span>{{ coveragePercentage }}</span>%</p>\
        <div id="modList" class="mt-2 mx-n3 mb-3">\
          <ul class="px-3 py-2">\
            <li v-for="(mod, index) in modpack.modList" :key="index">{{ mod }} - <span :class="{ \'text-success\' : modcorrespondance[index], \'text-danger\' : modcorrespondance[index] === undefined, \'text-warning\' : typeof(modcorrespondance[index]) === \'string\' }">{{ typeof(modcorrespondance[index]) === \'object\' ? \'Found\' : (modcorrespondance[index] ? \'No textures\' : \'Not found\') }} </span></li>\
          </ul>\
        </div>\
        <div class="text-right">\
          <button class="btn btn-dark mr-2" v-on:click="onclose">Cancel</button>\
          <button class="btn btn-dark" v-on:click="download">Download</button>\
        </div>\
      </template>\
    </custom-modal>',
  computed: {
    modSelection: function () {
      return this.$props.modcorrespondance.filter(el => el !== undefined && typeof (el) !== 'string').map(mod => this.$root.$refs.localDownload.modToSelection(mod, this.$props.modpack.minecraftVersion))
    },
    numberOfModsFound: function () {
      return this.modSelection.length
    },
    numberOfModsBlackListed: function () {
      var counter = 0

      for (var index in this.$props.modcorrespondance) {
        if (this.$props.modcorrespondance[index] === 'blacklisted') {
          ++counter
        }
      }

      return counter
    },
    coveragePercentage: function () {
      return (((this.numberOfModsBlackListed + this.modSelection.length) * 100 ) / this.$props.modpack.modList.length).toFixed(2)
    }
  },
  methods: {
    download: function () {
      if (!this.modSelection || !Array.isArray(this.modSelection) || this.modSelection.length === 0) return

      this.$props.onclose()

      this.$root.$refs.localDownload.openConfirmModal(this.modSelection)
    }
  }
})
