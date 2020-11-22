/* global Vue */
/* eslint no-multi-str: 0 */

Vue.component('minecraft-mod-list', {
  props: {
    mods: Object
  },
  data: function () {
    return {
      thumbnailCache: []
    }
  },
  methods: {
    searchCache: function (modName) {
      return this.thumbnailCache.filter(mod => modName === mod.modName)[0]
    }
  },
  template:
    '<ul class="mod-ul">\
      <minecraft-mod v-for="mod in mods" :key="mod.name[1]" :mod="mod"></minecraft-mod>\
    </ul>'
})
