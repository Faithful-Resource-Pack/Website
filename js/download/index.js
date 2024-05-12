/* global location, Vue, axios, getHTML */

let cache = {};
const DownloadTable = () => import("./download-table.js");

document.addEventListener("DOMContentLoaded", () => {
  Vue.config.devtools = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const v = new Vue({
    el: "#app",
    components: {
      DownloadTable,
    },
    data() {
      return {
        alive: {
          "Faithful 32x": {
            Java: {
              downloads: [],
              files: [],
            },
            Bedrock: {
              downloads: [],
              files: [],
            },
          },
          "Faithful 64x": {
            Java: {
              downloads: [],
              files: [],
            },
            Bedrock: {
              downloads: [],
              files: [],
            },
          },
        },
        discontinued: {
          "Faithful 32x for Minecraft Dungeons": {
            downloads: [],
            files: [],
          },
        },
      };
    },
    template: `
      <div>
        <h1 class="display-3 my-5 text-center">Downloads</h1>
        <template v-for="(editions, pack) in alive" :key="pack">
          <h2 class="text-center display-4 mb-0">{{ pack }}</h2>
          <template v-for="(data, edition) in editions" :key="edition">
            <h2 class="text-center my-3">{{ edition }} Edition</h2>
            <download-table
              :downloads="data.downloads"
              :files="data.files"
            />
          </template>
          <br><br>
        </template>
        <h2 class="text-center display-4 mb-0">Discontinued</h2>
        <template v-for="(data, name) in discontinued" :key="name">
          <h2 class="text-center">{{ name }}</h2>
          <download-table
            :downloads="data.downloads"
            :files="data.files"
          />
        </template>
      </div>
    `,
    methods: {
      fetchData({ json, curse, name, edition, discontinued }) {
        fetch(`data/downloads/${json}.json`)
          .then((res) => res.json())
          .then((downloads) => {
            if (discontinued) this.discontinued[name].downloads = downloads;
            else this.alive[name][edition].downloads = downloads;
          })
          .catch(console.error);
        fetch(`https://api.cfwidget.com/${curse}`)
          .then((res) => res.json())
          .then(({ files }) => {
            if (discontinued) this.discontinued[name].files = files;
            else this.alive[name][edition].files = files;
          })
          .catch(console.error);
      },
    },
    created() {
      Promise.all([
        this.fetchData({
          json: "faithful_java_32x",
          curse: "436482",
          name: "Faithful 32x",
          edition: "Java",
        }),
        this.fetchData({
          json: "faithful_java_64x",
          curse: "419139",
          name: "Faithful 64x",
          edition: "Java",
        }),
        this.fetchData({
          json: "faithful_bedrock_32x",
          curse: "507188",
          name: "Faithful 32x",
          edition: "Bedrock",
        }),
        this.fetchData({
          json: "faithful_bedrock_64x",
          curse: "694024",
          name: "Faithful 64x",
          edition: "Bedrock",
        }),
        this.fetchData({
          json: "faithful_dungeons_32x",
          curse: "501546",
          name: "Faithful 32x for Minecraft Dungeons",
          discontinued: true,
        }),
      ]);
    },
  });
});
