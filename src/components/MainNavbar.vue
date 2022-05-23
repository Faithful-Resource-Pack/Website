<template>
  <v-app-bar
    dense
    shaped
    v-if="$vuetify.display.mdAndUp"
  >
    <v-row
      no-gutters
      class="justify-center"
    >
      <v-col
        cols="5"
        class="d-flex justify-end"
      >
        <v-btn-localized to="/">{{ $t('navbar.btn_home') }}</v-btn-localized>
        <dropdown-menu :menus="getMenus('downloads')" :name="$t('navbar.btn_downloads')"></dropdown-menu>
        <dropdown-menu :menus="getMenus('addons')" :name="$t('navbar.btn_addons')"></dropdown-menu>
      </v-col>

      <v-col class="d-flex justify-center" style="max-width: 36px;">
        <localized-link to="/" class="d-flex align-center">
          <img aspect-ratio="1" height="32" :src="FAITHFUL_LOGO" alt="" />
        </localized-link>
      </v-col>

      <v-col
        cols="5"
        class="d-flex justify-start"
      >
        <dropdown-menu :menus="getMenus('tweaks')" :name="$t('navbar.btn_tweaks')"></dropdown-menu>
        <dropdown-menu :menus="getMenus('modding')" :name="$t('navbar.btn_modding')"></dropdown-menu>
        <v-btn v-if="!user.isUserLoggedIn()" @click="user.login()">{{ $t('navbar.btn_login') }}</v-btn>
        <v-btn-localized v-else to="/profile">{{ $t('navbar.btn_profile') }}</v-btn-localized>
      </v-col>
    </v-row>
  </v-app-bar>

  <v-app-bar
    v-else
    :height="showNavbarMenu ? 400 : 64"
  >
    <v-col style="padding-right: 0;">
      <v-row style="width: 100%; justify-content: space-between; margin-left: 0;">
        <localized-link to="/" class="d-flex align-center">
          <img :src="FAITHFUL_TEXT" alt="" height="24">
        </localized-link>

        <v-btn icon="mdi-menu" @click="showNavbarMenu = !showNavbarMenu"></v-btn>
      </v-row>
      <v-row v-if="showNavbarMenu" class="mt-5">
        <v-list>
          <v-list-item><v-btn-localized to="/">{{ $t('navbar.btn_home') }}</v-btn-localized></v-list-item>
          <v-list-item><dropdown-menu :menus="getMenus('downloads')" :name="$t('navbar.btn_downloads')"></dropdown-menu></v-list-item>
          <v-list-item><dropdown-menu :menus="getMenus('addons')" :name="$t('navbar.btn_addons')"></dropdown-menu></v-list-item>
          <v-list-item><dropdown-menu :menus="getMenus('tweaks')" :name="$t('navbar.btn_tweaks')"></dropdown-menu></v-list-item>
          <v-list-item><dropdown-menu :menus="getMenus('modding')" :name="$t('navbar.btn_modding')"></dropdown-menu></v-list-item>
          <v-list-item>
            <v-btn v-if="!user.isUserLoggedIn()" @click="user.login()">{{ $t('navbar.btn_login') }}</v-btn>
            <v-btn-localized v-else to="/profile">{{ $t('navbar.btn_profile') }}</v-btn-localized>
          </v-list-item>
        </v-list>
      </v-row>
    </v-col>
  </v-app-bar>

  <!-- fake margin for the fixed navbar -->
  <div style="height: 80px;"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import userStore from '@/stores/user';
import VBtnLocalized from '@/components/VuetifyLocalized/VBtnLocalized.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';

export default defineComponent({
  name: 'main-navbar',
  components: {
    DropdownMenu,
    VBtnLocalized,
  },
  data() {
    return {
      showNavbarMenu: false,
      FAITHFUL_TEXT: 'https://database.faithfulpack.net/images/branding/wordmarks/default/flat/faithful_flat.png',
      FAITHFUL_LOGO: 'https://database.faithfulpack.net/images/branding/logos/transparent/512/plain_logo.png',
      FAITHFUL_32X_LOGO: 'https://database.faithfulpack.net/images/branding/logos/transparent/512/f32_logo.png',
      FAITHFUL_64X_LOGO: 'https://database.faithfulpack.net/images/branding/logos/transparent/512/f64_logo.png',
      FAITHFUL_TWEAKS_LOGO: 'https://database.faithfulpack.net/images/branding/logos/transparent/512/tweaks_logo.png',
      FAITHFUL_ADDONS_LOGO: 'https://database.faithfulpack.net/images/branding/logos/transparent/512/addons_logo.png',
      FAITHFUL_MODS_LOGO: 'https://database.faithfulpack.net/images/branding/logos/transparent/512/mods_logo.png',
    };
  },
  setup() {
    const user = userStore();
    return { user };
  },
  methods: {
    getMenus(type: string) {
      const output = [];

      switch (type) {
        case 'downloads':
          output.push(
            {
              name: 'Faithful x32',
              path: '/downloads/faithful-x32',
              img: this.FAITHFUL_32X_LOGO,
            },
            {
              name: 'Faithful x64',
              path: '/downloads/faithful-x64',
              img: this.FAITHFUL_64X_LOGO,
            },
            {
              name: 'Classic Faithful x32',
              path: '/downloads/classic-faithful-x32',
            },
            {
              name: 'Classic Faithful x64',
              path: '/downloads/classic-faithful-x64',
            },
          );
          break;
        case 'addons':
          output.push(
            {
              name: 'Faithful Addons',
              path: '/addons/faithful',
              img: this.FAITHFUL_ADDONS_LOGO,
            },
            {
              name: 'Classic Faithful Addons',
              path: '/addons/classic-faithful',
            },
          );

          if (this.user.isUserLoggedIn()) {
            output.push(
              {
                name: this.$t('navbar.addons.submit'),
                path: '/addons/new',
                icon: 'mdi-plus',
              },
              {
                name: this.$t('navbar.addons.review'),
                path: '/review/addons',
                icon: 'mdi-gavel',
              },
            );
          }

          break;
        case 'tweaks':
          output.push(
            {
              name: 'Faithful Tweaks',
              path: '/tweaks/faithful',
              img: this.FAITHFUL_TWEAKS_LOGO,
            },
            {
              name: 'Classic Faithful Tweaks',
              path: '/tweaks/classic-faithful',
            },
          );

          if (this.user.isUserLoggedIn()) {
            output.push(
              {
                name: this.$t('navbar.tweaks.submit'),
                path: '/tweaks/new',
                icon: 'mdi-plus',
              },
              {
                name: this.$t('navbar.tweaks.review'),
                path: '/review/tweaks',
                icon: 'mdi-gavel',
              },
            );
          }

          break;
        case 'modding':
          output.push(
            {
              name: 'Faithful Mods',
              path: '/mods/faithful',
              img: this.FAITHFUL_MODS_LOGO,
            },
            {
              name: 'Classic Faithful Mods',
              path: '/mods/classic-faithful',
            },
            {
              name: 'Faithful Modpacks',
              path: '/modpacks/faithful',
            },
            {
              name: 'Classic Faithful Modpacks',
              path: '/modpacks/classic-faithful',
            },
          );

          if (this.user.isUserLoggedIn()) {
            output.push(
              {
                name: this.$t('navbar.modding.submit_mod'),
                path: '/mods/new',
                icon: 'mdi-plus',
              },
              {
                name: this.$t('navbar.modding.submit_modpack'),
                path: '/modpacks/new',
                icon: 'mdi-plus',
              },
              {
                name: this.$t('navbar.modding.review'),
                path: '/review/modding',
                icon: 'mdi-gavel',
              },
            );
          }

          break;
        default:
          break;
      }
      return output;
    },
  },
});
</script>

<style lang="scss">
.v-toolbar__content {
  justify-content: center;
}
</style>
