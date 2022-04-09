/* global location, Vue, getJSON, axios, getHTML */

let cache = {}


Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
const v = new Vue({
  el: '#app',
  data: {
    isMounted: false,
    packType: {
      "Java": [ '32x', '64x' ],
      "Bedrock": [ '32x', '64x' ],
      "Dungeons": [ '32x' ]
    },
    downloads: {
      c32: [], c64: [],
      c32b: [], c64b: [],
      c32d: []
    },
    releases: {
      c32: {
        github: [],
        curse: []
      },
      c64: {
        github: [],
        curse: []
      },
      c32b: {
        github: []
      },
      c64b: {
        github: []
      },
      c32d: {
        github: []
      }
    }
  },
  template: `
  <div>
    <h1 class="display-3 my-5 text-center">Downloads</h1>
    <template v-for="(i, key) in packType">
      <h2>Compliance for {{ key }}:</h2>
      <template v-for="j in packType[key]">
        <h2>{{ j }}</h2>
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
            
              <template v-for="(item, keyA) in getDownloads(key, j)">
                <tr class="collapsible" v-on:click="toggleContent($event, keyA, j, key)">
                  <td v-if="item[1]" class="toggle before" :ref="'toggle-' + key + '-' + j + '-' + keyA">➕</td>
                  <td v-else class="toggle before-empty"></td>

                  <td class="large details">
                    <p>
                      <span class="name">{{ item[0].file }}</span>
                      <span class="version" v-text="keyA != 'github' ? keyA : 'Repository'" ></span>
                      <span :class="labelColor(item[0])">{{ labelText(item[0]) }}</span>
                      <span v-if="keyA != 'github' && item[0].latest" class="latest">Latest</span>
                    </p>
                    <p class="mobile" v-show="getDate(item[0], key, j)">{{ getDate(item[0], key, j) + ' - ' + getSize(item[0], key, j) }}</p>
                  </td>

                  <td class="date">
                    <p>
                      {{ getDate(item[0], key, j) }}
                    </p>
                  </td>

                  <td class="size">
                    <p>
                      {{ getSize(item[0], key, j) }}
                    </p>
                  </td>

                  <td
                    v-for="(origin, originKey, originIndex) in item[0].links"
                    :key="key + '-' + j + '-' + keyA + '-' + origin"
                    :class="['small', 'downloads', { 'desktop': originIndex > 0 }]"
                    :colspan="Object.keys(item[0].links).length > 1 ? 1 : 2"
                  >
                    <template v-if="originIndex == 0">
                      <a
                        v-for="(originMobile, originMobileKey, originMobileIndex) in item[0].links"
                        :key="'mobile-' + key + '-' + j + '-' + keyA + '-' + origin"
                        :class="['btn', 'btn-dark', 'btn-dl', { 'mobile': originMobileIndex > 0 }]"
                        target="_blank"
                        :href="origin"
                      >
                        <template v-if="originMobileKey === 'curse'">
                          <i class="fas"></i><span class="link-text">Curse</span>
                        </template>
                        <template v-if="originMobileKey === 'github'">
                          <i class="fab"></i><span class="link-text">GitHub</span>
                        </template>
                      </a>
                    </template>
                    <a v-else target="_blank" class="btn btn-dark btn-dl" :href="origin">
                      <template v-if="originKey === 'curse'">
                        <i class="fas"></i><span class="link-text">Curse</span>
                      </template>
                      <template v-if="originKey === 'github'">
                        <i class="fab"></i><span class="link-text">GitHub</span>
                      </template>
                    </a>
                  </td>
                </tr>

                <tr :ref="'content-' + key + '-' + j + '-' + keyA" class="content" v-for="(subItem, keyB) in item" v-if="keyB > 0">
                  <td class="before-empty toggle"></td>

                  <td class="large details">
                    <p>
                      <span class="name">{{ subItem.file }}</span>
                      <span v-if="keyB != 'github'" class="version">{{ keyA }}</span>
                      <span :class="labelColor(subItem)">{{ labelText(subItem) }}</span>
                    </p>
                    <p class="mobile" v-show="getDate(item[0], key, j)">{{ getDate(item[0], key, j) + ' - ' + getSize(item[0], key, j) }}</p>
                  </td>

                  <td class="date">
                    <p>
                      {{ getDate(subItem, key, j) }}
                    </p>
                  </td>

                  <td class="size">
                    <p>
                      {{ getSize(subItem, key, j) }}
                    </p>
                  </td>

                  <td
                    v-for="(origin, originKey, originIndex) in subItem.links"
                    :key="key + '-' + j + '-' + keyA + '-' + origin"
                    :class="['small', 'downloads', { 'desktop': originIndex > 0 }]"
                    :colspan="Object.keys(subItem.links).length > 1 ? 1 : 2"
                  >
                    <template v-if="originIndex == 0">
                      <a
                        v-for="(originMobile, originMobileKey, originMobileIndex) in subItem.links"
                        :key="'mobile-' + key + '-' + j + '-' + keyA + '-' + origin"
                        :class="['btn', 'btn-dark', 'btn-dl', { 'mobile': originMobileIndex > 0 }]"
                        target="_blank"
                        :href="origin"
                      >
                        <template v-if="originMobileKey === 'curse'">
                          <i class="fas"></i><span class="link-text">Curse</span>
                        </template>
                        <template v-if="originMobileKey === 'github'">
                          <i class="fab"></i><span class="link-text">GitHub</span>
                        </template>
                      </a>
                    </template>
                    <a v-else target="_blank" class="btn btn-dark btn-dl" :href="origin">
                      <template v-if="originKey === 'curse'">
                        <i class="fas"></i><span class="link-text">Curse</span>
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
      if (item.file_type == "GitHub") return "github"
      if (item.file_type == "R") return "green"
      if (item.file_type == "B") return "blue"
      if (item.file_type == "A") return "yellow"
      else return "green"
    },
    labelText(item) {
      if (item.file_type == "GitHub") return 'GitHub'
      else return item.file_type + item.file_version
    },
    /**
     * Collapse group deploy code
     * @param {Event} event click event
     * @param {String} version 
     */
    toggleContent(event, version, res, edition) {
      // if parent src element is a link <a>
      if(event.target.parentElement.tagName === "A") return

      const suffix = edition + '-' + res + '-' + version

      // change plus to minus
      const toggleElement = this.$refs['toggle-' + suffix][0]
      toggleElement.innerText = toggleElement.innerText === '➕' ? '➖' : '➕'

      // deploy content
      this.$refs['content-' + suffix].forEach(content => {
        content.classList.toggle("active")
      })
    },
    getDownloads(type, size) {
      if (type == 'Java' && size == '32x') return this.downloads.c32
      else if (type == 'Java' && size == '64x') return this.downloads.c64
      else if (type == 'Bedrock' && size == '32x') return this.downloads.c32b
      else if (type == 'Bedrock' && size == '64x') return this.downloads.c64b
      else if (type == 'Dungeons' && size == '32x') return this.downloads.c32d
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

      if (!data.github[release]) return 'GitHub'

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
    getRelease(type, size) {
      if (type == 'Java' && size == '32x') return this.releases.c32
      else if (type == 'Java' && size == '64x') return this.releases.c64
      else if (type == 'Bedrock' && size == '32x') return this.releases.c32b
      else if (type == 'Bedrock' && size == '64x') return this.releases.c64b
      else if (type == 'Dungeons' && size == '32x') return this.releases.c32d
      else return undefined
    },
    getDate(item, type, size) {
      if (!this.isMounted) return

      let id   = this.getId(item)
      let data = this.getRelease(type, size)
      if (id == 0 && item.date) return item.date

      if (id != 0) {
        let date = ""
        let dateF = ""
        let dateA = []

        const files = data && data.curse && data.curse.files ? data.curse.files : []
        files.forEach(el => {
          if (el.id == id) {
            dateF = el.uploaded_at
            dateA = dateF.split('-')
            date = `${dateA[2].split("T")[0]}/${dateA[1]}/${dateA[0]}`
          }
        })
        return date
      }
    },
    getSize(item, type, size) {
      if (!this.isMounted) return

      let id   = this.getId(item)
      let data = this.getRelease(type, size)

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
  mounted: function () {
    this.isMounted = true

    // COMPLIANCE 32x
    getJSON('data/downloads/compliance_32.json', (err, json) => {
      if (err) return console.error(err)
      this.downloads.c32 = json
    })
    getJSON('https://api.github.com/repos/Compliance-Resource-Pack/Faithful-Java-32x/releases', (err, json) => {
      if (err) return console.error(err)
      this.releases.c32.github = json
    })
    getJSON(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.cfwidget.com/436482`)}`, (err, json) => {
      if (err) return console.error(err)
      this.releases.c32.curse = json
    })

    // COMPLIANCE 64x
    getJSON('data/downloads/compliance_64.json', (err, json) => {
      if (err) return console.error(err)
      this.downloads.c64 = json
    })
    getJSON('https://api.github.com/repos/Compliance-Resource-Pack/Faithful-Java-64x/releases', (err, json) => {
      if (err) return console.error(err)
      this.releases.c64.github = json
    })
    getJSON(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.cfwidget.com/419139`)}`, (err, json) => {
      if (err) return console.error(err)
      this.releases.c64.curse = json
    })

    // COMPLIANCE 32x BEDROCK
    getJSON('data/downloads/compliance_32b.json', (err, json) => {
      if (err) return console.error(err)
      this.downloads.c32b = json
    })
    getJSON('https://api.github.com/repos/Compliance-Resource-Pack/Faithful-Bedrock-32x/releases', (err, json) => {
      if (err) return console.error(err)
      this.releases.c32b.github = json
    })

    // COMPLIANCE 64x BEDROCK
    getJSON('data/downloads/compliance_64b.json', (err, json) => {
      if (err) return console.error(err)
      this.downloads.c64b = json
    })
    getJSON('https://api.github.com/repos/Compliance-Resource-Pack/Faithful-Bedrock-64x/releases', (err, json) => {
      if (err) return console.error(err)
      this.releases.c64b.github = json
    })

    // COMPLIANCE 32x DUNGEONS
    getJSON('data/downloads/compliance_32d.json', (err, json) => {
      if (err) return console.error(err)
      this.downloads.c32d = json
    })
    getJSON('https://api.github.com/repos/Faithful-Dungeons/Resource-Pack/releases', (err, json) => {
      if (err) return console.error(err)
      this.releases.c32d.github = json
    })

  }
})