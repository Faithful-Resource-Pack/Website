<template>
  <v-app :theme="theme">
    <main-navbar />

    <v-container>
      <router-view />
    </v-container>

    <main-footer />

    <v-snackbar
      v-model="errorHandler.displayed"
      :timeout="errorHandler.timeout"
      :color="errorHandler.color"
      multi-line
      bottom
      right
    >
      {{ errorHandler.message }}
    </v-snackbar>
  </v-app>
</template>

<style lang="scss">
.v-layout {
  background-image: var(--v-foreground-image) !important;
  background-repeat: repeat !important;
}

::-webkit-scrollbar{
  width: 8px;
}
::-webkit-scrollbar-button{
  height: 8px
}
::-webkit-scrollbar{
  background: #0E0E0E;
}
::-webkit-scrollbar-button, ::-webkit-scrollbar-thumb{
  background: #3E3E3E;
  border: 1px solid #0E0E0E;
}
::-webkit-scrollbar-button:hover, ::-webkit-scrollbar-thumb:hover{
  background: #575757
}
::-webkit-scrollbar-button:active, ::-webkit-scrollbar-thumb:active{
  background: #878787
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import errorHandlerStore from '@/stores/errorHandler';
import userStore from '@/stores/user';
import MainNavbar from '@/components/MainNavbar.vue';
import MainFooter from '@/components/MainFooter.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainNavbar,
    MainFooter,
  },
  data() {
    return {
      isDark: false,
      isColorblind: false,
    };
  },
  setup() {
    const theme = ref('light');
    const errorHandler = errorHandlerStore();
    const user = userStore();

    return {
      user,
      theme,
      errorHandler,
      toggleTheme: (str: string) => { theme.value = str; },
    };
  },
  methods: {
    switchTheme() {
      if (this.isDark && this.isColorblind) this.toggleTheme('colorblindDark');
      else if (this.isDark && !this.isColorblind) this.toggleTheme('dark');

      if (!this.isDark && this.isColorblind) this.toggleTheme('colorblindLight');
      else if (!this.isDark && !this.isColorblind) this.toggleTheme('light');
    },
  },
  mounted() {
    this.isDark = localStorage.getItem('isDark') === 'true' ? true : false || false;
    this.isColorblind = localStorage.getItem('isColorblind') === 'true' ? true : false || false;
    this.switchTheme();

    this.user.refresh();

    this.$watch('isDark', (newValue: boolean, oldValue: boolean) => {
      if (newValue === oldValue) return;
      localStorage.setItem('isDark', newValue.toString());
      this.switchTheme();
    });
    this.$watch('isColorblind', (newValue: boolean, oldValue: boolean) => {
      if (newValue === oldValue) return;
      localStorage.setItem('isColorblind', newValue.toString());
      this.switchTheme();
    });

    /**
     * Watch for locale changes and set the document lang and direction.
     * ex: <html lang="en" dir="ltr">
     */
    this.$watch('$i18n.locale', (newValue: string, oldValue: string) => {
      if (newValue === oldValue) return;
      switch (newValue) {
        case 'ar':
          document.dir = 'rtl';
          break;
        default:
          document.dir = 'ltr';
          break;
      }
    }, { immediate: true });
  },
});

</script>
