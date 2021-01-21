/* global Vue */
/* eslint no-multi-str: 0 */

Vue.component('download-minecraft-version', {
  props: {
    value: {
      version: String,
      count: Number
    },
    block: Boolean
  },
  template:
  '<button type="button" class="btn btn-dark minecraftVersion mb-1 mr-1" :value="value.version" @click="dv">\
    <span :style="{display: block ? \'block\' : \'initial\' }">{{ value.version }}</span> <span class="badge badge-light" style="color: black;">{{ value.count }}</span></div>\
  </button>',
  data () {
    return {}
  },
  methods: {
    dv: function () {
      if (this.$root.$refs.localDownload && !!this.$root.$refs.localDownload.openConfirmModal) {
        this.$root.$refs.localDownload.openConfirmModal(this.$root.mods.filter(mod => mod.versions.includes(this.$props.value.version)).map(mod => {
          return this.$root.modToSelection(mod, this.$props.value.version)
        }))
      }
    }
  }
})
