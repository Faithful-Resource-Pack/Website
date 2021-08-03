/* global getJSON, Vuetify */

const addonModal = () => import('./addon-post-modal.js')

export default {
  name: 'addon-page',
  components: {
    addonModal
  },
  template: `
    <v-container
      style="max-width: 1140px; padding-top: 100px; padding-bottom: 100px"
    >

      <h2 class="text-center" style="font-size: 4.8rem; font-weight: 300; line-height: 1.2; margin-bottom: 3rem; margin-top: 3rem;">{{ addon.title }}</h2>
      <!-- the if statement is here to hide warning message from vue -->
      <img v-if="addon.images" :src="addon.images.header" class="fancy-card-2x" style="width: 100%; margin-bottom: 17px;">

      <template v-if="addon.images && addon.images.carousel[0]">
        <!-- this cause a warning message from vue, but idk what's happening since this doesn't happens on the webapp, only here :/ -->
        <addon-modal :dialog="modal" :close="closeModal" :image="modalImage"></addon-modal>
        
        <div class="card card-body">
          <h3 class="text-center">Screenshots</h3>
          <div class="res-grid-3">
            <div v-for="(image, index) in addon.images.carousel">
              <div class="card img-card">
                <img :src="image" @click="openModal(image)">
              </div>
            </div>
          </div>
        </div>
        
        <br>
      </template>

      <v-row :style="{
          'display': $vuetify.breakpoint.mdAndUp ? 'flex' : 'block'
        }"
      >
        <v-col class="col-2" :sm="$vuetify.breakpoint.mdAndUp ? 3 : 2" style="max-width: 100%;">

          <!-- Only 1 authors -->
          <template v-if="Object.keys(authors).length == 1">
            <h3 class="text-center">Author</h3>
            <img v-if="authors[Object.keys(authors)[0]].uuid" alt="avatar" style="display: block; margin-left: auto; margin-right: auto; max-height: 250px;" :src="($vuetify.breakpoint.mdAndUp ? 'https://visage.surgeplay.com/full/256/' : 'https://visage.surgeplay.com/head/128/') + authors[Object.keys(authors)[0]].uuid" />
            <img v-else alt="avatar" style="display: block; margin-left: auto; margin-right: auto; max-height: 250px;" src="https://visage.surgeplay.com/head/128/X-Steve" />
            <h4 class="card card-title text-center author-widget">{{ authors[Object.keys(authors)[0]].username }}</h4>
          </template>

          <template v-else>
            <h3 class="text-center">Authors</h3>

            <div :style="{
              'display': $vuetify.breakpoint.mdAndUp ? 'block' : 'flex',
              'align-items': 'baseline'
              }"
            >
              <v-row v-for="(author, index) in authors">
                <v-col style="margin: 0 5px" :key="index">
                  <img v-if="author.uuid" alt="avatar" style="display: block; margin-left: auto; margin-right: auto; max-height: 250px;" :src="'https://visage.surgeplay.com/head/128/' + author.uuid" />
                  <img v-else alt="avatar" style="display: block; margin-left: auto; margin-right: auto; max-height: 250px;" src="https://visage.surgeplay.com/head/128/X-Steve" />
                  <h4 class="card card-title text-center author-widget">{{ author.username }}</h4>
                </v-col>
              </v-row>
            </div>
          </template>
        </v-col>

        <v-col class="col-10" :sm="$vuetify.breakpoint.mdAndUp ? 9 : 10" style="max-width: 100%;">
          <div class="card card-body">
            <p align="justify" v-html="addon.description"></p>
          </div>

          <br>

          <v-row
            :style="{
              'flex-direction': $vuetify.breakpoint.mdAndUp ? 'row' : 'column'
            }"
          >
            <v-col>
              <h3 class="text-center">Downloads</h3>
              <div class="card card-body">
                <template v-for="(downloads, name, index) in addon.downloads">
                  <h4 class="text-center">{{ name }}</h4>
                  <a v-for="(link, subindex) in downloads" :href="link" class="btn btn-dark" style="color: white; margin-bottom: 10px">
                    <template v-if="link.includes('curseforge')"><v-icon color="orange">mdi-fire</v-icon> CurseForge</template>
                    <template v-else-if="link.includes('planetminecraft')"><v-icon color="green">mdi-earth</v-icon> Planet Minecraft</template>
                    <template v-else-if="link.includes('github')"><v-icon color="white">mdi-github-circle</v-icon> GitHub</template>
                    <template v-else><v-icon color="white">mdi-link</v-icon> Download Link</template>
                  </a>
                </template>
              </div>
            </v-col>
            <v-col>
              <h3 class="text-center">Information</h3>
              <template v-if="addon.optifine">
                <div class="card card-body card-widget">
                  <img class="addon-flags-big" :src="optifine" alt="requires optifine" loading="lazy">
                  <p class="addon-flags-big-text">This Add-on require <a href="https://optifine.net/home">optifine</a></p>
                </div>
                <br>
              </template>
              <template v-if="addon.type && addon.type.includes('Java')">
                <div class="card card-body card-widget">
                  <img class="addon-flags-big" :src="java" alt="java support" loading="lazy">
                  <p class="addon-flags-big-text">This Add-on is made for the Java Edition!</p>
                </div>
                <br>
              </template>

              <template v-if="addon.type && addon.type.includes('Bedrock')">
                <div class="card card-body card-widget">
                  <img class="addon-flags-big" :src="bedrock" alt="bedrock support" loading="lazy">
                  <p class="addon-flags-big-text">This Add-on got a Bedrock support!</p>
                </div>
                <br>
              </template>

              <v-row>
                <v-col
                  style="display: flex; align-content: stretch; justify-content: flex-start"
                >
                  <div v-if="addon.type && addon.type.includes('32x')" class="card card-body card-widget-square" style="margin-right: 24px">
                    <img class="addon-flags-big" :src="img32" alt="32x support" loading="lazy">
                  </div>
                  <div v-if="addon.type && addon.type.includes('64x')" class="card card-body card-widget-square">
                    <img class="addon-flags-big" :src="img64" alt="64x support" loading="lazy">
                  </div>
                </v-col>
              </v-row>

            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <template v-if="addon.comments">
        <br>
        <h3 class="text-center card-title">Comments</h3>
        <div id="disqus_thread" class="card card-body"></div>
        <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="noopener">comments powered by Disqus.</a></noscript>
      </template>
    </v-container>`,
  data() {
    return {
      addon: {},
      authors: {},
      optifine: '/image/icon/optifine.png',
      bedrock: '/image/icon/bedrock.png',
      java: '/image/icon/java.png',
      img32: '/image/icon/32.png',
      img64: '/image/icon/64.png',
      modal: false,
      modalImage: ''
    }
  },
  methods: {
    openModal: function (base64) {
      this.modalImage = base64
      this.modal = true
    },
    closeModal: function () {
      this.modalImage = ''
      this.modal = false
    }
  },
  computed: {},
  mounted: function() {

    getJSON(`http://194.163.144.230:8081/firestorm/files/addons.json`, (err, json) => {
      if (err) return console.error(err)
      this.addon = json[this.$route.params.addon]

      getJSON(`http://194.163.144.230:8081/firestorm/files/users.json`, (err, json) => {
        if (err) return console.error(err)
        
        for (const userID in json) {
          if (this.addon.authors.includes(userID)) {
            this.authors[userID] = json[userID]
          }
        }

        this.$forceUpdate()

        if (this.addon.comments) {
          var disqus_config = function () {
            this.page.url = 'https://compliancepack.net/' + this.addon.id; // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = this.addon.id; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
          };

          (function () { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://compliance-2.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
          })();
        }
      })
    })


  }
}