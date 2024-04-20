/* global location, Vue, axios, getHTML */

let cache = {}


Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
const v = new Vue({
  el: '#app',
  data: {
    isMounted: false,
    downloads: {
      "Faithful 32x": {
        Java: [],
        Bedrock: [],
      },
      "Faithful 64x": {
        Java: [],
        Bedrock: [],
      },
      "Discontinued": {
        Dungeons: [],
      }
    },
    releases: {
      f32: {
        github: [],
        curse: []
      },
      f64: {
        github: [],
        curse: []
      },
      f32b: {
        github: []
      },
      f64b: {
        github: []
      },
      f32d: {
        github: []
      }
    }
  },
  template: `
  <div>
    <h1 class="display-3 my-5 text-center">Downloads</h1>
    <template v-for="pack in Object.keys(downloads)" :key="pack">
      <h2 class="text-center display-4 mb-0">{{ pack }}</h2>
      <template v-for="edition in Object.keys(downloads[pack])" :key="edition">
        <h2 class="text-center my-3" v-if="edition !== 'Dungeons'">{{ edition }} Edition</h2>
        <div v-else>
          <h2 class="text-center">Faithful 32x for Minecraft Dungeons</h2>
          <h2 class="red banner">This project has been discontinued.</h2>
        </div>
        <div class="outline">
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
              <template v-for="(item, keyA) in getDownloads(edition, pack)">
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
                    <p class="mobile" v-show="getDate(item[0], pack, edition)">{{ getDate(item[0], pack, edition) + ' - ' + getSize(item[0], pack, edition) }}</p>
                  </td>

                  <td class="date">
                    <p>
                      {{ getDate(item[0], pack, edition) }}
                    </p>
                  </td>

                  <td class="size">
                    <p>
                      {{ getSize(item[0], pack, edition) }}
                    </p>
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
                      {{ getDate(item[0], edition, pack) + ' - ' + getSize(item[0], edition, pack) }}
                    </p>
                  </td>

                  <td class="date">
                    <p>
                      {{ getDate(subItem, edition, pack) }}
                    </p>
                  </td>

                  <td class="size">
                    <p>
                      {{ getSize(subItem, edition, pack) }}
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
        </div>
      </template>
      <br><br>
    </template>
  </div>
  `,
  computed: {},
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

      const suffix = pack + '-' + edition + '-' + version

      // change plus to minus
      const toggleElement = this.$refs['toggle-' + suffix][0]
      toggleElement.innerText = toggleElement.innerText === '➕' ? '➖' : '➕'

      // deploy content
      this.$refs['content-' + suffix].forEach(content => {
        content.classList.toggle("active")
      })
    },
    getDownloads(edition, pack) {
      return this.downloads[pack][edition];
    },
    /* unused
    getGitHubDownload(item, release, type, size) {
      if (!this.isMounted) return
      let data  = this.getRelease(type, size)
      var count = 0

      // if github there is not an github release for each file, use this:
      if (item.github_version) {
        release = data.github.length - item.github_version
      }

      if (!data.github[release]) return 'Download'

      // get download from all assets, (in case a file has been reuploaded under the same github tag)
      data.github[release]["assets"].forEach(asset => {
        count += asset["download_count"]
      })
      return count
    },
    getCurseDownload() {
      return 'Curse'
    },
    */
    getRelease(edition, pack) {
      switch (edition) {
        case 'Java':
          if (pack == 'Faithful 32x') return this.releases.f32
          if (pack == 'Faithful 64x') return this.releases.f64
          break
        case 'Bedrock':
          if (pack == 'Faithful 32x') return this.releases.f32b
          if (pack == 'Faithful 64x') return this.releases.f64b
          break
        case 'Dungeons':
          if (pack == 'Faithful 32x') return this.releases.f32d
          break
      }
    },
    toMdyDate(dmyDate) {
      const [day, month, year] = dmyDate.split("/");
      return [month, day, year].join("/");
    },
    getDate(item, edition, pack) {
      if (!this.isMounted) return

      let id = this.getId(item)
      let data = this.getRelease(edition, pack)
      if (id == 0 && item.date) {
        if (navigator.language === "en-US") return this.toMdyDate(item.date)
        return item.date
      }

      if (id != 0) {
        let date = ""
        let dateF = ""
        let dateA = []

        const files = data?.curse?.files || []
        files.forEach(el => {
          if (el.id == id) {
            dateF = el.uploaded_at
            dateA = dateF.split('-')
            date = `${dateA[2].split("T")[0]}/${dateA[1]}/${dateA[0]}`
            if (navigator.language === "en-US") date = this.toMdyDate(date)
          }
        })
        return date
      }
    },
    getSize(item, edition, pack) {
      if (!this.isMounted) return

      let id = this.getId(item)
      let data = this.getRelease(edition, pack)

      if (id == 0 && item.size) return item.size

      if (id != 0) {
        let size = 0
        const files = data && data.curse && data.curse.files ? data.curse.files : []
        files.forEach(el => {
          if (el.id == id) size = el.filesize
        })
        return `${(size/1000000).toFixed(2)} MB`
      }
    },
    getId(item) {
      if (item.links.curse) return parseInt(item.links.curse.substring(item.links.curse.lastIndexOf('/') + 1))
      else return 0
    }
  },
  mounted() {
    this.isMounted = true

    // Faithful 32x
    fetch('data/downloads/faithful_java_32x.json')
      .then((res) => res.json())
      .then((json) => {
        this.downloads["Faithful 32x"].Java = json
      })
      .catch(console.error)

    fetch('https://api.github.com/repos/Faithful-Resource-Pack/Faithful-Java-32x/releases')
      .then((res) => res.json())
      .then((json) => {
        this.releases.f32.github = json
      })
      .catch(console.error)

    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.cfwidget.com/436482`)}`)
      .then((res) => res.json())
      .then((json) => {
        this.releases.f32.curse = json
      })
      .catch(console.error)

    // Faithful 64x
    fetch('data/downloads/faithful_java_64x.json')
      .then((res) => res.json())
      .then((json) => {
        this.downloads["Faithful 64x"].Java = json
      })
      .catch(console.error)

    fetch('https://api.github.com/repos/Faithful-Resource-Pack/Faithful-Java-64x/releases')
      .then((res) => res.json())
      .then((json) => {
        this.releases.f64.github = json
      })
      .catch(console.error)

    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.cfwidget.com/419139`)}`)
      .then((res) => res.json())
      .then((json) => {
        this.releases.f64.curse = json
      })
      .catch(console.error)

    // Faithful 32x BEDROCK
    fetch('data/downloads/faithful_bedrock_32x.json')
      .then((res) => res.json())
      .then((json) => {
        this.downloads["Faithful 32x"].Bedrock = json
      })
      .catch(console.error)

    fetch('https://api.github.com/repos/Faithful-Resource-Pack/Faithful-Bedrock-32x/releases')
      .then((res) => res.json())
      .then((json) => {
        this.releases.f32b.github = json
      })
      .catch(console.error)

    // Faithful 64x BEDROCK
    fetch('data/downloads/faithful_bedrock_64x.json')
      .then((res) => res.json())
      .then((json) => {
        this.downloads["Faithful 64x"].Bedrock = json
      })
      .catch(console.error)

    fetch('https://api.github.com/repos/Faithful-Resource-Pack/Faithful-Bedrock-64x/releases')
      .then((res) => res.json())
      .then((json) => {
        this.releases.f64b.github = json
      })
      .catch(console.error)

    // Faithful 32x DUNGEONS
    fetch('data/downloads/faithful_dungeons_32x.json')
      .then((res) => res.json())
      .then((json) => {
        this.downloads["Discontinued"].Dungeons = json
      })
      .catch(console.error)

    fetch('https://api.github.com/repos/Faithful-Dungeons/Resource-Pack/releases')
      .then((res) => res.json())
      .then((json) => {
        this.releases.f32d.github = json
      })
      .catch(console.error)
  }
})