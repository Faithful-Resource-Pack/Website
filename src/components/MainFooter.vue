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
        <v-btn-localized color="#fff" variant="text" to="/about">{{ $t('footer.btn_about') }}</v-btn-localized>
        <v-btn-localized color="#fff" variant="text" to="/license">{{ $t('footer.btn_license') }}</v-btn-localized>
        <v-btn-localized color="#fff" variant="text" to="/comments-policy">{{ $t('footer.btn_comments_policy') }}</v-btn-localized>
        <v-btn color="#fff" variant="text" href="https://docs.faithfulpack.net/">{{ $t('footer.btn_docs') }}</v-btn>
        <v-btn-localized color="#fff" variant="text" to="/statistics">{{ $t('footer.btn_stats') }}</v-btn-localized>
      </v-col>
      <v-col
        class="text-center mb-5"
        cols="12"
      >
        <v-btn color="#fff" variant="text" density="comfortable" small class="mr-2" @click="showThemePopup = true" icon="mdi-theme-light-dark"></v-btn>
        <v-btn color="#fff" variant="text" density="comfortable" small class="mr-2" @click="showLanguagePopup = true" icon="mdi-translate"></v-btn>
      </v-col>
      <v-col
        class="text-center mb-5"
        cols="12"
      >
        <strong><a href="mailto:contact@faithfulpack.net">contact@faithfulpack.net</a></strong><br><br>
        <strong style="color: #fff;">&copy;&nbsp;{{ new Date().getFullYear() }}&nbsp;-&nbsp;Faithful Resource Pack</strong><br>
        <i style="color: #fff;">"Minecraft" is a trademark of Microsoft Corporation and not affiliated with this site. Visit the <a href="https://www.minecraft.net/">official site</a> to get the game!</i>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style lang="scss">
.v-footer {
  background-image: var(--v-background-image) !important;
  background-repeat: repeat !important;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import LanguagePopup from '@/components/popups/LanguagePopup.vue';
import ThemePopup from '@/components/popups/ThemePopup.vue';
import VBtnLocalized from './VuetifyLocalized/VBtnLocalized.vue';

export default defineComponent({
  name: 'main-footer',
  components: {
    ThemePopup,
    LanguagePopup,
    VBtnLocalized,
  },
  data() {
    return {
      showThemePopup: false,
      showLanguagePopup: false,
    };
  },
});
</script>
