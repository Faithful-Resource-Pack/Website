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
        <p class="mb-0">Mod list (<span>{{ modpack.modList.length }}</span>): <span>{{ numberOfModsFound }}</span> found</p>\
        <div id="modList" class="mt-2 mx-n3 mb-3">\
          <ul class="px-3 py-2">\
            <li v-for="(mod, index) in modpack.modList" :key="index">{{ mod }} - <span :class="{ \'text-success\' : modcorrespondance[index], \'text-danger\' : !modcorrespondance[index] }">{{ modcorrespondance[index] ? \'Found\' : \'Not found\' }} </span></li>\
          </ul>\
        </div>\
        <div class="text-right">\
          <button class="btn btn-custom-grey" v-on:click="onclose">Cancel</button>\
          <button class="btn btn-custom" v-on:click="download">Download</button>\
        </div>\
      </template>\
    </custom-modal>',
  computed: {
    modSelection: function () {
      return this.$props.modcorrespondance.filter(el => el !== undefined).map(mod => this.$root.$refs.localDownload.modToSelection(mod, this.$props.modpack.minecraftVersion))
    },
    numberOfModsFound: function () {
      return this.modSelection.length
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
