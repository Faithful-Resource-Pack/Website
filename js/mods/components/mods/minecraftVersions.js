/* global Vue, MinecraftUtils */
/* eslint no-multi-str: 0 */

Vue.component('minecraft-versions', {
  props: {
    versions: Array,
    breakpoints: Object
  },
  template:
    '<div id="minecraftVersions">\
      <div>\
        <div v-for="(line, index) in versionsOrganized" :key="index" class="auto-flex mt-0 mx-0 btn-group-custom">\
          <download-minecraft-version v-for="version in line" :key="version.version" :value="version" :block="breakpoints.lg && !breakpoints.md" />\
        </div>\
      </div>\
    </div>',

  data () {
    return {}
  },
  computed: {
    orderedVersions: function () {
      return this.$props.versions.sort(function (a, b) {
        const numbers = MinecraftUtils.minecraftVersionsToNumbers([a.version, b.version])

        return (numbers[0] > numbers[1] ? -1 : 1)
      })
    },
    elementsPerLine: function () {
      if (!!this.$props.breakpoints.lg && !this.$props.breakpoints.md) return this.$props.versions.length
      if (!!this.$props.breakpoints.md && !this.$props.breakpoints.sm) return 6
      if (!!this.$props.breakpoints.sm && !this.$props.breakpoints.xs) return 3

      return 1
    },
    versionsOrganized: function () {
      const result = []

      for (let i = 0; i < this.orderedVersions.length; ++i) {
        if (i % this.elementsPerLine === 0) {
          result.push([])
        }

        result[result.length - 1].push(this.orderedVersions[i])
      }

      return result
    }
  },
  methods: {
    downloadVersion: function (version) {
      if (this.$root.handleDownload) {
        this.$root.handleDownload('version', {
          version: version
        })
      }
    }
  }
})
