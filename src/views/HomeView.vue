<template>
  <main-navbar />
  <div>TEST</div>
  <main-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainNavbar from '@/components/MainNavbar.vue';
import MainFooter from '@/components/MainFooter.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MainNavbar,
    MainFooter,
  },
});
</script>
