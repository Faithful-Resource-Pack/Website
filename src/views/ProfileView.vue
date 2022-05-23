<template>
  <main-navbar></main-navbar>
  <v-btn color="danger" @click="user.logout($router)">{{ $t("profile.btn_logout") }}</v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNavbar from '@/components/MainNavbar.vue';
import userStore from '@/stores/user';
import errorHandlerStore from '@/stores/errorHandler';

export default defineComponent({
  name: 'ProfileView',
  components: {
    MainNavbar,
  },
  setup() {
    const user = userStore();
    const errorHandler = errorHandlerStore();
    return { user, errorHandler };
  },
  mounted() {
    if (!this.user.isUserLoggedIn()) {
      this.$router.push('/');
      this.errorHandler.show('You are not logged in', { color: 'error' });
    }
  },
});
</script>
