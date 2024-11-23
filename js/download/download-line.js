export default {
  name: "download-line",
  props: {
    nested: {
      type: Boolean,
      required: false,
      default: false,
    },
    single: {
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
    <tr class="download-item" :class="nested ? 'darker' : null" @click="handleOpen">
      <td class="before-empty toggle darker" v-if="nested || single"></td>
      <td class="before-empty toggle darker" v-else>
        <p class="clickable">{{ showIcon }}</p>
      </td>
      <td class="large details">
        <p class="download-badges">
          <span class="force-row">
            <span :class="['dot', labelColor[item.file_type] || 'green']" />
            <span class="name">{{ item.file_type }} {{ item.file_version }}</span>
          </span>
          <span class="version">{{ version }}</span>
          <span class="latest" v-if="version !== 'download' && item.latest">Latest</span>
        </p>
        <p class="mobile" v-show="date">
          {{ date + ' - ' + size }}
        </p>
      </td>

      <td class="date"><p>{{ date }}</p></td>
      <td class="size"><p>{{ size }}</p></td>

      <td
        v-for="(link, linkType) in item.links"
        :key="version + '-' + link"
        :class="['small', 'downloads']"
        :colspan="Object.keys(item.links).length > 1 ? 1 : 2"
      >
        <a class="btn btn-dark btn-dl" :href="link">
          <i :class="buttonData[linkType]?.type || 'fas'">{{ buttonData[linkType]?.icon || "" }}</i>
          <span class="link-text">{{ buttonData[linkType]?.text || linkType }}</span>
        </a>
      </td>
    </tr>
  `,
  data() {
    return {
      showIcon: "+",
      buttonData: {
        download: { icon: "", text: "Download", type: "fas" },
        curse: { icon: "", text: "Curse", type: "fas" },
        github: { icon: "", text: "GitHub", type: "fab" },
        modrinth: { icon: "", text: "Modrinth", type: "fas" },
        mcpedl: { icon: "", text: "MCPEDL", type: "fas" },
      },
      labelColor: {
        GitHub: "github",
        Release: "green",
        "Pre-release": "blue",
        Beta: "yellow",
        Alpha: "red",
        Snapshot: "black",
      }
    }
  },
  methods: {
    getLocalizedDate(dateObj) {
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1; // 0 indexed
      const day = dateObj.getDate();
      // mdy for us (expand array if someone else does too)
      if (["en-US"].includes(navigator.language)) return `${month}/${day}/${year}`;
      // dmy for everyone else
      return `${day}/${month}/${year}`;
    },
    handleOpen() {
      // change icon then pass back to download-table to unhide child
      this.showIcon = this.showIcon === "+" ? "-" : "+"
      this.$emit('toggle')
    },
  },
  computed: {
    labelText() {
      if (!this.item.file_version) return this.item.file_type
      return this.item.file_type + this.item.file_version
    },
    date() {
      if (this.item.date)
        return this.getLocalizedDate(new Date(this.item.date));

      // no other way to get dates
      if (!this.curse || !this.curse.uploaded_at) return "Unknown"
      return this.getLocalizedDate(new Date(this.curse.uploaded_at.split("T")[0]));
    },
    size() {
      // some very old downloads have manual sizes
      if (this.item.size) return this.item.size
      if (!this.curse || !this.curse.filesize) return "Unknown"
      return `${(this.curse.filesize / 1000000).toFixed(2)} MB`
    },
  },
}