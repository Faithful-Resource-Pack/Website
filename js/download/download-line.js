export default {
  name: "download-line",
  props: {
    nested: {
      type: Boolean,
      required: false,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    },
    curse: {
      type: Object,
      required: false,
    },
    version: {
      type: String,
      required: true,
    },
  },
  template: `
    <tr class="content" @click="handleOpen">
      <td class="before-empty toggle" v-if="nested"></td>
      <td class="before-empty toggle" v-else>{{ showIcon }}</td>
      <td class="large details">
        <p>
          <span class="name">{{ item.file }}</span>
          <span class="version">{{ version === "github" ? "Repository" : version }}</span>
          <span :class="labelColor">{{ labelText }}</span>
          <span class="latest" v-if="version != 'download' && item.latest">Latest</span>
        </p>
        <p class="mobile" v-show="date">
          {{ date + ' - ' + size }}
        </p>
      </td>

      <td class="date"><p>{{ date }}</p></td>
      <td class="size"><p>{{ size }}</p></td>

      <td
        v-for="(origin, originKey, originIndex) in item.links"
        :key="version + '-' + origin"
        :class="['small', 'downloads', { 'desktop': originIndex > 0 }]"
        :colspan="Object.keys(item.links).length > 1 ? 1 : 2"
      >
        <template v-if="originIndex == 0">
          <a
            v-for="(originMobile, originMobileKey, originMobileIndex) in item.links"
            :key="'mobile-' + version + '-' + origin"
            :class="['btn', 'btn-dark', 'btn-dl', { 'mobile': originMobileIndex > 0 }]"
            :href="origin"
          >
            <template v-if="originMobileKey === 'curse'">
              <i class="fas"></i><span class="link-text">Curse</span>
            </template>
            <template v-if="originMobileKey === 'download'">
              <i class="fas"></i><span class="link-text">Download</span>
            </template>
            <template v-if="originKey === 'github'">
              <i class="fab"></i><span class="link-text">GitHub</span>
            </template>
          </a>
        </template>
        <a v-else class="btn btn-dark btn-dl" :href="origin">
          <template v-if="originKey === 'curse'">
            <i class="fas"></i><span class="link-text">Curse</span>
          </template>
          <template v-if="originKey === 'download'">
            <i class="fas"></i><span class="link-text">Download</span>
          </template>
          <template v-if="originKey === 'github'">
            <i class="fab"></i><span class="link-text">GitHub</span>
          </template>
        </a>
      </td>
    </tr>
  `,
  data() {
    return {
      showIcon: "➕",
      isMounted: false,
    }
  },
  methods: {
    toMdyDate(dmyDate) {
      const [day, month, year] = dmyDate.split("/");
      return [month, day, year].join("/");
    },
    handleOpen() {
      this.showIcon = this.showIcon === "➕" ? "➖" : "➕";
      this.$emit('click');
    }
  },
  computed: {
    labelColor() {
      switch (this.item.file_type) {
        case "Download": return "github"
        case "R": return "green"
        case "B": return "blue"
        case "A": return "yellow"
        case "Snapshot": return "black"
        default: return "green"
      }
    },
    labelText() {
      if (this.item.file_type == "Download") return 'Download'
      if (!this.item.file_version) return this.item.file_type
      return this.item.file_type + this.item.file_version
    },
    date() {
      if (!this.isMounted || this.item.file_type === "GitHub") return
      if (this.item.date) {
        if (navigator.language === "en-US") return this.toMdyDate(this.item.date)
        return this.item.date
      }

      // no other way to get dates
      if (!this.curse) return "Unknown";
      const [year, month, day] = this.curse.uploaded_at.split("T")[0].split('-')
      const date = `${day}/${month}/${year}`
      if (navigator.language === "en-US") return this.toMdyDate(date)
      return date
    },
    size() {
      if (!this.isMounted || this.item.file_type === "GitHub") return
      // some very old downloads have manual sizes
      if (this.item.size) return this.item.size
      if (!this.curse || !this.curse.filesize) return "Unknown"
      return `${(this.curse.filesize / 1000000).toFixed(2)} MB`
    },
  },
  mounted() {
    this.isMounted = true;
  }
}