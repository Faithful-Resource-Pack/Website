export default {
	name: "download-table",
  props: {
    edition: {
      type: String,
      required: true,
    },
    pack: {
      type: String,
      required: true,
    },
    downloads: {
      type: Object,
      required: true,
    },
    files: {
      type: Object,
      required: true,
    }
  },
	template: `
    <table class="download-table">
      <thead>
        <tr>
          <th colspan="2" class="large"><p>File</p></th>
          <th><p>Date</p></th>
          <th><p>Size</p></th>
          <th colspan="2"><p>Downloads</p></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, keyA) in downloads">
          <tr class="collapsible" @click="toggleContent($event, keyA, pack, edition)">
            <td v-if="item[1]" class="toggle before" :ref="'toggle-' + pack + '-' + edition + '-' + keyA">➕</td>
            <td v-else class="toggle before-empty"></td>

            <td class="large details">
              <p>
                <span class="name">{{ item[0].file }}</span>
                <span class="version" v-text="keyA != 'github' ? keyA : 'Repository'" ></span>
                <span :class="labelColor(item[0])">{{ labelText(item[0]) }}</span>
                <span v-if="keyA != 'download' && item[0].latest" class="latest">Latest</span>
              </p>
              <p class="mobile" v-show="getDate(item[0])">{{ getDate(item[0]) + ' - ' + getSize(item[0]) }}</p>
            </td>

            <td class="date">
              <p>{{ getDate(item[0]) }}</p>
            </td>

            <td class="size">
              <p>{{ getSize(item[0]) }}</p>
            </td>

            <td
              v-for="(origin, originKey, originIndex) in item[0].links"
              :key="pack + '-' + edition + '-' + keyA + '-' + origin"
              :class="['small', 'downloads', { 'desktop': originIndex > 0 }]"
              :colspan="Object.keys(item[0].links).length > 1 ? 1 : 2"
            >
              <template v-if="originIndex == 0">
                <a
                  v-for="(originMobile, originMobileKey, originMobileIndex) in item[0].links"
                  :key="'mobile-' + pack + '-' + edition + '-' + keyA + '-' + origin"
                  :class="['btn', 'btn-dark', 'btn-dl', { 'mobile': originMobileIndex > 0 }]"
                  :href="origin"
                >
                  <template v-if="originMobileKey === 'curse'">
                    <i class="fas"></i>
                    <span class="link-text">Curse</span>
                  </template>
                  <template v-if="originMobileKey === 'download'">
                    <i class="fas"></i>
                    <span class="link-text">Download</span>
                  </template>
                  <template v-if="originMobileKey === 'github'">
                    <i class="fab"></i>
                    <span class="link-text">GitHub</span>
                  </template>
                </a>
              </template>
              <a v-else class="btn btn-dark btn-dl" :href="origin">
                <template v-if="originKey === 'curse'">
                  <i class="fas"></i>
                  <span class="link-text">Curse</span>
                </template>
                <template v-if="originKey === 'download'">
                  <i class="fas"></i>
                  <span class="link-text">Download</span>
                </template>
                <template v-if="originKey === 'github'">
                  <i class="fab"></i>
                  <span class="link-text">GitHub</span>
                </template>
              </a>
            </td>
          </tr>

          <tr
            :ref="'content-' + pack + '-' + edition + '-' + keyA"
            class="content"
            v-for="(subItem, keyB) in item"
            v-if="keyB > 0"
          >
            <td class="before-empty toggle"></td>

            <td class="large details">
              <p>
                <span class="name">{{ subItem.file }}</span>
                <span v-if="keyB != 'download'" class="version">{{ keyA }}</span>
                <span :class="labelColor(subItem)">{{ labelText(subItem) }}</span>
              </p>
              <p class="mobile" v-show="getDate(item[0], pack, edition)">
                {{ getDate(item[0]) + ' - ' + getSize(item[0]) }}
              </p>
            </td>

            <td class="date">
              <p>
                {{ getDate(subItem) }}
              </p>
            </td>

            <td class="size">
              <p>
                {{ getSize(subItem) }}
              </p>
            </td>

            <td
              v-for="(origin, originKey, originIndex) in subItem.links"
              :key="pack + '-' + edition + '-' + keyA + '-' + origin"
              :class="['small', 'downloads', { 'desktop': originIndex > 0 }]"
              :colspan="Object.keys(subItem.links).length > 1 ? 1 : 2"
            >
              <template v-if="originIndex == 0">
                <a
                  v-for="(originMobile, originMobileKey, originMobileIndex) in subItem.links"
                  :key="'mobile-' + pack + '-' + edition + '-' + keyA + '-' + origin"
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
        </template>
      </tbody>
    </table>
  `,
  data() {
    return {
      isMounted: false,
    }
  },
  methods: {
    labelColor(item) {
      switch (item.file_type) {
        case "Download": return "github"
        case "R": return "green"
        case "B": return "blue"
        case "A": return "yellow"
        case "Snapshot": return "black"
        default: return "green"
      }
    },
    labelText(item) {
      if (item.file_type == "Download") return 'Download'
      if (!item.file_version) return item.file_type
      return item.file_type + item.file_version
    },
    /**
     * Collapse group deploy code
     * @param {Event} event click event
     * @param {String} version
     */
    toggleContent(event, version, pack, edition) {
      // if parent src element is a link <a>
      if (event.target.parentElement.tagName === "A") return

      const suffix = `${pack}-${edition}-${version}`

      // change plus to minus
      const toggleElement = this.$refs[`toggle-${suffix}`][0]
      toggleElement.innerText = toggleElement.innerText === '➕' ? '➖' : '➕'

      // deploy content
      this.$refs[`content-${suffix}`].forEach((content) =>
        content.classList.toggle("active")
      )
    },
    toMdyDate(dmyDate) {
      const [day, month, year] = dmyDate.split("/");
      return [month, day, year].join("/");
    },
    getDate(item) {
      if (!this.isMounted || item.file_type === "GitHub") return
      if (item.date) {
        if (navigator.language === "en-US") return this.toMdyDate(item.date)
        return item.date
      }

      const curse = this.getCurseFile(item);
      // we tried, no way to get date
      if (!curse) return "Unknown";
      const [year, month, day] = curse.uploaded_at.split("T")[0].split('-')
      const date = `${day}/${month}/${year}`
      if (navigator.language === "en-US") return this.toMdyDate(date)
      return date
    },
    getSize(item) {
      if (!this.isMounted || item.file_type === "GitHub") return

      const curse = this.getCurseFile(item);
      // no other way to get size
      if (!curse || !curse.filesize) return "Unknown"
      return `${(curse.filesize / 1000000).toFixed(2)} MB`
    },
    getCurseFile(item) {
      if (item.links.curse) {
        const id = parseInt(item.links.curse.split('/').pop())
        return this.files.find((el) => el.id === id);
      }
    },
  },
  mounted() {
    this.isMounted = true;
  }
};
