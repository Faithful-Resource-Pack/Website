<template>
  <v-dialog
    v-model="show"
    max-width="500px"
  >
    <v-card class="px-3 py-3">
      <v-card-title class="justify-center">{{ $t("lang_selector") }}</v-card-title>
      <v-card-text>
        <v-btn
          v-for="link in links"
          :key="link.langIndex"
          :class="link.activeClass ? 'bg-secondary' : '' + ' mb-2 bg-hover-secondary'"
          :href="link.url"
          :disabled="link.activeClass ? true : false"
          flat
          tile
          block
        >
          <img class="d-inline-block mr-2" :src="getURL(link.langIndex)" height="16" alt="" />
          <span class="d-inline-block" >{{ link.langName }}</span>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.active::before {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #000;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { translations } from '@/lang';
import localizePath from '@/utils/i18n/localizePath';

export default defineComponent({
  name: 'language-popup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const DEFAULT_LINKS: { activeClass: string, langIndex: string, langName: string, url: string }[] = [];
    return {
      links: DEFAULT_LINKS,
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value: boolean) {
        this.$emit('input', value);
      },
    },
  },
  mounted() {
    this.generateLinks();

    this.$watch('$router.currentRoute.value.fullPath', () => {
      this.generateLinks();
    }, { immediate: true });
  },
  methods: {
    /**
     * Get the appropriate background image url for the given language.
     * @param {String} lang the given language (2 letters code)
     */
    getURL(lang: string): string {
      switch (lang) {
        case 'en': return 'https://flagcdn.com/gb.svg';
        default: return `https://flagcdn.com/${lang}.svg`;
      }
    },
    generateLinks() {
      this.links = Object.keys(translations).map((lang: string) => ({
        activeClass: lang === this.$i18n.locale ? 'active' : '',
        langIndex: lang,
        langName: translations[lang].name,
        url: localizePath(this.$router.currentRoute.value.fullPath, lang, this.$route.path, this.$router),
      }));
    },
  },
});
</script>
