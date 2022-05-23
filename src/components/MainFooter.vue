<template>
  <language-popup v-model="showLanguagePopup" />
  <theme-popup v-model="showThemePopup" />

  <v-footer
    variant="fixed"
    class="pt-10"
  >
    <v-row
      no-gutters
      class="justify-center"
    >
      <v-col
        class="text-center mb-5"
        cols="12"
      >
        <v-btn-localized prepend-icon="mdi-information" color="#eee" variant="text" to="/about">{{ $t('footer.btn_about') }}</v-btn-localized>
        <v-btn-localized prepend-icon="mdi-license" color="#eee" variant="text" to="/license">{{ $t('footer.btn_license') }}</v-btn-localized>
        <v-btn-localized prepend-icon="mdi-comment-bookmark"  color="#eee" variant="text" to="/comments-policy">{{ $t('footer.btn_comments_policy') }}</v-btn-localized>
        <v-btn prepend-icon="mdi-file-document" color="#eee" variant="text" href="https://docs.faithfulpack.net/">{{ $t('footer.btn_docs') }}</v-btn>
        <v-btn-localized prepend-icon="mdi-chart-line-variant" color="#eee" variant="text" to="/statistics">{{ $t('footer.btn_stats') }}</v-btn-localized>
      </v-col>
      <v-col
        class="text-center mb-5"
        cols="12"
      >
        <v-btn color="#eee" variant="text" density="comfortable" small class="mr-2" @click="showThemePopup = true" icon="mdi-theme-light-dark"></v-btn>
        <v-btn color="#eee" variant="text" density="comfortable" small class="mr-2" @click="showLanguagePopup = true" icon="mdi-translate"></v-btn>
        <dropdown-menu :icon="'mdi-discord'" :menus="getMenus('discords')"></dropdown-menu>
        <dropdown-menu :icon="'mdi-github'" :menus="getMenus('github')"></dropdown-menu>
      </v-col>
      <v-col
        class="text-center mb-5"
        cols="12"
      >
        <a href="mailto:contact@faithfulpack.net" class="link">contact@faithfulpack.net</a><br><br>
        <strong style="color: #eee;">&copy;&nbsp;{{ new Date().getFullYear() }}&nbsp;-&nbsp;Faithful Resource Pack</strong><br>
        <i style="color: #eee;">"Minecraft" is a trademark of Microsoft Corporation and not affiliated with this site. Visit the <a class="link" href="https://www.minecraft.net/">official site</a> to get the game!</i>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style lang="scss">
.v-footer {
  background-image: var(--v-background-image) !important;
  background-repeat: repeat !important;
}
.link {
  color: #eee;
  &:visited {
    color: #eee;
  }
  &:hover {
    color: orange;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import LanguagePopup from '@/components/popups/LanguagePopup.vue';
import ThemePopup from '@/components/popups/ThemePopup.vue';
import VBtnLocalized from './VuetifyLocalized/VBtnLocalized.vue';
import DropdownMenu from './DropdownMenu.vue';

export default defineComponent({
  name: 'main-footer',
  components: {
    ThemePopup,
    LanguagePopup,
    VBtnLocalized,
    DropdownMenu,
  },
  data() {
    return {
      showThemePopup: false,
      showLanguagePopup: false,
    };
  },
  methods: {
    getMenus(type: string) {
      switch (type) {
        case 'github':
          return [
            {
              name: 'Faithful',
              path: 'https://github.com/Faithful-Resource-Pack',
            },
            {
              name: 'Faithful Addons',
              path: 'https://github.com/Faithful-Addons',
            },
            {
              name: 'Faithful Mods',
              path: 'https://github.com/Faithful-Mods',
            },
            {
              name: 'Faithful Tweaks',
              path: 'https://github.com/Faithful-Tweaks',
            },
            {
              name: 'Classic Faithful',
              path: 'https://github.com/Faithful-Resource-Pack',
            },
          ];

        case 'discords':
          return [
            {
              name: 'Faithful',
              path: 'https://discord.com/invite/sN9YRQbBv7',
            },
            {
              name: 'Faithful Extras',
              path: 'https://discord.com/invite/KSEhCVtg4J',
            },
            {
              name: 'Classic Faithful',
              path: 'https://discord.com/invite/qVeDfZw',
            },
          ];

        default:
          return [];
      }
    },
  },
});
</script>
