<template>
  <v-app-bar
    dense
    shaped
  >
    <v-row
      no-gutters
      class="justify-center"
    >
      <v-btn-localized to="/">{{ $t('navbar.btn_home') }}</v-btn-localized>
      <dropdown-menu :menus="getMenus('downloads')" :name="$t('navbar.btn_downloads')"></dropdown-menu>
      <dropdown-menu :menus="getMenus('addons')" :name="$t('navbar.btn_addons')"></dropdown-menu>

      <img class="mx-2" aspect-ratio="1" height="32" :src="FAITHFUL_LOGO" alt="" />

      <dropdown-menu :menus="getMenus('tweaks')" :name="$t('navbar.btn_tweaks')"></dropdown-menu>
      <dropdown-menu :menus="getMenus('modding')" :name="$t('navbar.btn_modding')"></dropdown-menu>
      <v-btn v-if="!user.isUserLoggedIn()" @click="user.login()">{{ $t('navbar.btn_login') }}</v-btn>
      <v-btn-localized v-else to="/profile">{{ $t('navbar.btn_profile') }}</v-btn-localized>
    </v-row>
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
