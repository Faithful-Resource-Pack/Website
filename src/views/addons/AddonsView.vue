<template>
  <v-container style="max-width: 1140px; padding: 44px 0 80px;">
    <h2 class="text-center" style="font-size: 4.8rem; font-weight: 300; line-height: 1.2; margin: 2rem 0">Faithful Add-ons</h2>
    <template v-if="Object.keys(fav).length">
      <h3 class="text-center">Favorites</h3>
      <addons-grid :key="Object.keys(fav).length" :addons="fav" :action="checkFav" icon="mdi-close" iconColor="#ff3333"
        :addonsFav="fav">
      </addons-grid>
      <br>
      <h3 class="text-center">All</h3>
    </template>

    <v-card class="search-card">
      <h4 class="text-center">Search</h4>
      <v-row no-gutters>
        <v-col cols="6" md="3" v-for="editionType in editions" :key="editionType">
          <v-checkbox
            v-model="selectedEditions"
            :label="editionType"
            :disabled="selectedEditions.length === 1 && selectedEditions[0] === editionType"
            :value="editionType"
            color="white"
            class="checkbox"
            dark
            hide-details
            @change="startSearch"
          />
        </v-col>
        <v-col cols="6" md="3" v-for="resType in res" :key="resType">
          <v-checkbox
            v-model="selectedRes"
            :label="resType"
            :disabled="selectedRes.length === 1 && selectedRes[0] === resType"
            :value="resType"
            color="white"
            class="checkbox"
            dark
            hide-details
            @change="startSearch"
          />
        </v-col>
      </v-row>
      <v-text-field
        v-model="search"
        :append-icon="search ? 'mdi-send' : undefined"
        filled clear-icon="mdi-close"
        clearable
        dark
        hide-details
        placeholder="Search add-on name"
        type="text"
        v-on:keyup.enter="startSearch"
        @click:append="startSearch"
        @click:clear="clearSearch"/>
    </v-card>
    <br>
    <addons-grid :key="Object.keys(fav).length" :addons="searchedAddons" :action="checkFav" icon="mdi-star"
      iconColor="#ffc83d" :addonsFav="fav">
    </addons-grid>
  </v-container>
</template>

<style lang="scss" scoped>
.search-card {
  padding: 1rem;
  border-radius: 12px;
  background-image: var(--v-background-image);
  background-repeat: repeat;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 50%);
}

</style>

<style>
.checkbox > .v-input__control {
  justify-content: center;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import AddonsGrid from './AddonsGrid.vue';

type Editions = 'java' | 'bedrock';
type Resolutions = '32x' | '64x';

type Addon = {
  id: string;
  name: string;
  description: string;
  options: {
    tags: Array<Editions | Resolutions>;
  };
}

export default defineComponent({
  name: 'addons-view',
  components: {
    AddonsGrid,
  },
  setup() {
    const route = useRoute();
    const { pack } = route.params;

    return { pack };
  },
  data() {
    const data: {
      addons: { [key: string]: Addon };
      searchedAddons: { [key: string]: Addon };
      search: string;
      fav: { [key: string]: Addon };
      loading: boolean;
      editions: Editions[];
      selectedEditions: Editions[];
      res: Resolutions[];
      selectedRes: Resolutions[];

    } = {
      addons: {},
      searchedAddons: {},
      search: '',
      fav: {},
      loading: true,
      editions: ['java', 'bedrock'],
      res: ['32x', '64x'],
      selectedEditions: ['java', 'bedrock'],
      selectedRes: ['32x', '64x'],
    };

    return data;
  },
  methods: {
    startSearch() {
      if (this.search === '' && this.editions.length + this.res.length === this.selectedEditions.length + this.selectedRes.length) this.searchedAddons = this.addons;
      else {
        this.searchedAddons = {};

        Object.keys(this.addons).forEach((addonID) => {
          if (this.addons[addonID].name.toLowerCase().includes(this.search.toLowerCase()) || this.search === '') {
            const localRes = [];
            const localEditions = [];

            // split types of an addon (res + edition : res & edition)
            const { tags } = this.addons[addonID].options;
            for (let tagIndex = 0; tagIndex < tags.length; tagIndex += 1) {
              if (this.editions.includes(tags[tagIndex] as Editions)) localEditions.push(tags[tagIndex]);
              if (this.res.includes(tags[tagIndex] as Resolutions)) localRes.push(tags[tagIndex]);
            }

            // search if edition then check if res
            for (let i = 0; localEditions[i]; i += 1) {
              if (this.selectedEditions.includes(localEditions[i] as Editions)) {
                for (let j = 0; localRes[j]; j += 1) {
                  if (this.selectedRes.includes(localRes[j] as Resolutions)) this.searchedAddons[addonID] = this.addons[addonID];
                }
              }
            }
          }
        });
      }

      this.$forceUpdate(); // force update (because it can be a bit long to process)
    },
    clearSearch() {
      this.search = '';
      this.startSearch();
    },
    checkFav(addon: Addon) {
      if (!this.fav[addon.id]) {
        this.fav[addon.id] = addon;
        window.localStorage.setItem('favAddons', JSON.stringify(this.fav));
      } else {
        delete this.fav[addon.id];
        window.localStorage.setItem('favAddons', JSON.stringify(this.fav));
      }

      this.$forceUpdate();
    },
  },
  mounted() {
    fetch('https://api.faithfulpack.net/v2/addons/approved')
      .then((res) => res.json())
      .then((data) => {
        this.addons = data;
        this.loading = false;

        Object.keys(this.addons)
          .forEach((id) => {
            this.addons[id].id = id; // fix missing ID (property value)
          });

        this.searchedAddons = this.addons;
      });

    this.fav = JSON.parse(window.localStorage.getItem('favAddons') || '{}');
  },
});
</script>
