/* global Vue */
/* eslint no-multi-str: 0 */

const _TEXT_LOADING = 'Loading...'

Vue.component('modpack-modal', {
  props: ['modpackmodalopened', 'modpack', 'onclose', 'mods'],
  template:
    `<custom-modal v-if="modpack" :modalOpened="modpackmodalopened" :closeOnClick="onclose">
      <h3 class="mt-0">{{ modpack.modpackName }}</h3>
      <p class="advice mb-0">Modpack version: <span>{{ modpack.modpackVersion }}</span></p>
      <p class="advice">Minecraft version: <span>{{ modpack.minecraftVersion }}</span></p>
      <template v-if="modpack.modList && Array.isArray(modpack.modList) && modpack.modList.length">
        <p class="mb-0">Mod list (<span>{{ modpack.modList.length }}</span>): <span>{{ numberOfModsFound }}</span> found, <span>{{ numberOfModsIgnored }}</span> ignored - coverage: <span>{{ coveragePercentage }}</span>%</p>
        <div id="modList" class="mt-2 mx-n3 mb-3">
          <ul class="px-3 py-2">
            <li v-for="(id) in modpack.modList" :key="id" v-html="modsNames[id] + ' - ' + findMod(id)"></li>
          </ul>
        </div>
        <div class="text-right">
          <button class="btn btn-dark mr-2" v-on:click="onclose">Cancel</button>
          <button class="btn btn-dark" v-on:click="download">Download</button>
        </div>
      </template>
    </custom-modal>`,
  data() {
    return {
      modsFound: 0,
      modsIgnored: 0,
      modsNames: {}
    }
  },
  computed: {
    modSelection() {
      const result = []

      // build mod selections following mods found
      this.findMods().forEach(mod => {
        result.push({
          name: mod.resource_pack.git_repository.split('/').pop(),
          displayName: mod.name,
          repositoryURL: mod.resource_pack.git_repository,
          version: this.modpack.minecraftVersion
        })
      })

      return result
    },
    numberOfModsFound() {
      return this.modsFound
    },
    numberOfModsIgnored() {
      return this.modsIgnored
    },
    coveragePercentage() {
      this.findMods()
      return (((this.numberOfModsIgnored + this.numberOfModsFound) * 100) / this.$props.modpack.modList.length).toFixed(2)
    }
  },
  watch: {
    modpackmodalopened(value) {
      if (!value) return

      this.modpack.modList.forEach(id => {
        this.searchModName(id)
      })
    }
  },
  methods: {
    searchModName(id) {
      if (this.modsNames[id] && this.modsNames[id] != _TEXT_LOADING) return

      if (this.mods[id]) {
        this.modsNames[id] = this.mods[id].name
        return
      }

      this.modsNames[id] = _TEXT_LOADING
      this.getName(id).then(() => this.$forceUpdate());
    },
    getName(id) {
      if (this.mods[id]) this.modsNames[id] = this.mods[id].name;
      return axios.get(`${this.$root.apiURL}/v2/mods/${id}/curseforge/name`)
        .then(res => { this.modsNames[id] = res.data })
        .catch(() => { this.modsNames[id] = 'Not Found on CurseForge API: ' + id });
    },

    findMods() {
      const results = []
      this.modsFound = 0
      this.modsIgnored = 0

      this.modpack.modList.forEach(modId => {
        switch (this.findMod(modId)) {
          case '<span class="text-success">Found</span>':
            this.modsFound++
            results.push(this.mods[modId])
            break;

          case `<span class="text-success">No textures</span>`:
          case `<span class="text-success">No textures in ${this.modpack.minecraftVersion}</span>`:
            this.modsIgnored++
            break;

          default: // not found or not available in current version or blacklisted
            break;
        }
      })

      return results
    },
    findMod(id) {
      if (this.mods[id] && this.mods[id].blacklisted)
        return `<span class="text-success">No textures</span>`

      if (this.mods[id] && this.mods[id].resource_pack.blacklist && this.mods[id].resource_pack.blacklist.includes(this.modpack.minecraftVersion))
        return `<span class="text-success">No textures in ${this.modpack.minecraftVersion}</span>`

      if (this.mods[id] && this.mods[id].resource_pack.versions.includes(this.modpack.minecraftVersion))
        return `<span class="text-success">Found</span>`

      if (this.mods[id] && this.mods[id].resource_pack.versions.length !== 0)
        return `<span class="text-warning">Not in ${this.modpack.minecraftVersion}</span>`

      return `<span class="text-danger">Not found</span>`
    },
    download() {
      if (!this.modSelection || !Array.isArray(this.modSelection) || this.modSelection.length === 0) return
      this.$props.onclose()
      this.$root.$refs.localDownload.openConfirmModal(this.modSelection)
    }
  }
})
