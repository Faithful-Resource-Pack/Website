/* global location, Vue, axios, getHTML */

let cache = {}
const DownloadTable = () => import('./download-table.js')

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
const v = new Vue({
  el: '#app',
  components: {
    DownloadTable,
  },
  data: {
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
    files: {
      f32: [],
      f64: [],
      f32b: [],
      f64b: [],
      f32d: [],
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
          <download-table
            :edition="edition"
            :pack="pack"
            :downloads="getDownloads(edition, pack)"
            :files="getFiles(edition, pack)"
          />
        </div>
      </template>
      <br><br>
    </template>
  </div>
  `,
  methods: {
    getDownloads(edition, pack) {
      return this.downloads[pack][edition];
    },
    getFiles(edition, pack) {
      switch (edition) {
        case 'Java':
          if (pack == 'Faithful 32x') return this.files.f32
          if (pack == 'Faithful 64x') return this.files.f64
          break
        case 'Bedrock':
          if (pack == 'Faithful 32x') return this.files.f32b
          if (pack == 'Faithful 64x') return this.files.f64b
          break
        case 'Dungeons':
          if (pack == 'Faithful 32x') return this.files.f32d
          break
      }
    },
    fetchDownload(json, pack, edition) {
      fetch(`data/downloads/${json}.json`)
        .then((res) => res.json())
        .then((json) => {
          this.downloads[pack][edition] = json;
        })
        .catch(console.error)
    },
    fetchCurse(curseID, name) {
      fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(`https://api.cfwidget.com/${curseID}`)}`)
        .then((res) => res.json())
        .then((json) => {
          this.files[name] = json.files
        })
        .catch(console.error)
    }
  },
  mounted() {
    // local download jsons
    this.fetchDownload('faithful_java_32x', "Faithful 32x", "Java");
    this.fetchDownload('faithful_java_64x', "Faithful 64x", "Java");
    this.fetchDownload('faithful_bedrock_32x', "Faithful 32x", "Bedrock");
    this.fetchDownload('faithful_bedrock_64x', "Faithful 64x", "Bedrock");
    this.fetchDownload('faithful_dungeons_32x', "Discontinued", "Dungeons");

    // curse jsons
    this.fetchCurse("436482", "f32");
    this.fetchCurse("419139", "f64");
    this.fetchCurse("507188", "f32b");
    this.fetchCurse("694024", "f64b");
    this.fetchCurse("501546", "f32d");
  }
})