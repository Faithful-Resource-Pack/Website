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
        <h3>{{ j }}</h3>
        <div class="outline">
          <table>
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
                <tr class="collapsible" v-on:click="toggleContent($event)">
                  <td v-if="item[1]" class="before">➕</td>
                  <td v-else class="before-empty"></td>

                  <td class="large">
                    <p>
                      {{ item[0].file }}
                      <span v-if="keyA != 'github'" class="version">{{ keyA }}</span>
                      <span :class="labelColor(item[0])">{{ labelText(item[0]) }}</span>
                      <span v-if="keyA != 'github'" class="latest">Latest</span>
                    </p>
                  </td>

                  <td>
                    <p>
                      {{ getDate(item[0], key, j) }}
                    </p>
                  </td>

                  <td>
                    <p>
                      {{ getSize(item[0], key, j) }}
                    </p>
                  </td>

                  <td class="small" v-if="item[0].links.github" :colspan="item[0].links.curse ? 1 : 2">
                    <a v-if="item[0].links.github" class="btn btn-dark btn-dl" :href="item[0].links.github">
                      <i style="margin-right: 4px" class="fas fa-download"></i>
                      <template v-if="item[0].file_type != 'GitHub'">
                        {{ getGitHubDownload(item[0], 0, key, j) }}
                      </template>
                      <template v-else>
                        GitHub
                      </template>
                    </a>
                  </td>

                  <td class="small" v-if="item[0].links.curse" :colspan="item[0].links.github ? 1 : 2">
                    <a v-if="item[0].links.curse" class="btn btn-dark btn-dl" :href="item[0].links.curse">
                      <i style="margin-right: 4px" class="fas fa-fire"></i>
                      {{ getCurseDownload() }}
                    </a>
                  </td>

                </tr>

                <tr class="content" v-for="(subItem, keyB) in item" v-if="keyB > 0">
                  <td class="before-empty"></td>

                  <td class="large">
                    <p>
                      {{ subItem.file }}
                      <span v-if="keyB != 'github'" class="version">{{ keyA }}</span>
                      <span :class="labelColor(subItem)">{{ labelText(subItem) }}</span>
                    </p>
                  </td>

                  <td>
                    <p>
                      {{ getDate(subItem, key, j) }}
                    </p>
                  </td>

                  <td>
                    <p>
                      {{ getSize(subItem, key, j) }}
                    </p>
                  </td>

                  <td class="small" v-if="subItem.links.github" :colspan="subItem.links.curse ? 1 : 2">
                    <a v-if="subItem.links.github" class="btn btn-dark btn-dl" :href="subItem.links.github">
                      <i style="margin-right: 4px" class="fas fa-download"></i>
                      {{ getGitHubDownload(subItem, keyB, key, j) }}
                    </a>
                  </td>

                  <td class="small" v-if="subItem.links.curse" :colspan="subItem.links.github ? 1 : 2">
                    <a v-if="subItem.links.curse" class="btn btn-dark btn-dl" :href="subItem.links.curse">
                      <i style="margin-right: 4px" class="fas fa-fire"></i>
                      {{ getCurseDownload() }}
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
      else return "notfound"
    },
    labelText(item) {
      if (item.file_type == "GitHub") return 'GitHub'
      else return item.file_type + item.file_version
    },
    toggleContent(event) {
      const div = event.currentTarget
      div.classList.toggle("active")
      var divContent = div.nextElementSibling

      // detect if the user clicked on a <a></a> with a <i></i> inside (which is the download button)
      if (!event.srcElement.innerHTML.startsWith("<i") && !event.srcElement.innerHTML == "") {
        while (divContent) {
          // break if the while loop goes to the next collapsible el
          if (divContent.classList != 'content') break

          if (divContent.style.maxHeight) {
            divContent.style.maxHeight = "0px"
            divContent.style.display   = null
            divContent.style.maxHeight = null
          }
          else {
            divContent.style.display   = "table-row"
            divContent.style.maxHeight = divContent.scrollHeight + "px"
          }
          divContent = divContent.nextElementSibling
        }
        
        const divPlus = div.firstChild
        if (div.firstChild.innerHTML != "") {
          if (div.classList.contains("active")) divPlus.innerHTML = "➖"
          else divPlus.innerHTML = "➕"
        }
      }
    },
    getDownloads(type, size) {
      if (type == 'Java' && size == '32x') return this.downloads.c32
      else if (type == 'Java' && size == '64x') return this.downloads.c64
      else if (type == 'Bedrock' && size == '32x') return this.downloads.c32b
      else if (type == 'Bedrock' && size == '64x') return this.downloads.c64b
      else if (type == 'Dungeons' && size == '32x') return this.downloads.c32d
    },
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
    getJSON('https://api.github.com/repos/Compliance-Resource-Pack/Compliance-Java-32x/releases', (err, json) => {
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
    getJSON('https://api.github.com/repos/Compliance-Resource-Pack/Compliance-Java-64x/releases', (err, json) => {
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
    getJSON('https://api.github.com/repos/Compliance-Resource-Pack/Compliance-Bedrock-32x/releases', (err, json) => {
      if (err) return console.error(err)
      this.releases.c32b.github = json
    })

    // COMPLIANCE 64x BEDROCK
    getJSON('data/downloads/compliance_64b.json', (err, json) => {
      if (err) return console.error(err)
      this.downloads.c64b = json
    })
    getJSON('https://api.github.com/repos/Compliance-Resource-Pack/Compliance-Bedrock-64x/releases', (err, json) => {
      if (err) return console.error(err)
      this.releases.c64b.github = json
    })

    // COMPLIANCE 32x DUNGEONS
    getJSON('data/downloads/compliance_32d.json', (err, json) => {
      if (err) return console.error(err)
      this.downloads.c32d = json
    })
    getJSON('https://api.github.com/repos/Compliance-Dungeons/Resource-Pack/releases', (err, json) => {
      if (err) return console.error(err)
      this.releases.c32d.github = json
    })

  }
})