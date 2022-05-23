<template>
  <v-menu transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn v-if="name" v-bind="props" color="#eee">{{ name }}</v-btn>
      <v-btn v-if="icon" v-bind="props" color="#eee" variant="text" density="comfortable" small class="mr-2" :icon="icon"></v-btn>
    </template>
    <v-list>
      <v-list-item-localized
        v-for="(link, i) in menus"
        :to="link.path"
        :key="i"
      >
        <v-icon v-if="link.icon" :icon="link.icon" class="mr-2"></v-icon>
        <img v-if="link.img && link.icon === undefined" :src="link.img" alt="" height="24" class="mr-2" />
        <v-list-item-title :to="link.path">{{ link.name }}</v-list-item-title>
      </v-list-item-localized>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VListItemLocalized from '@/components/VuetifyLocalized/VListItemLocalized.vue';

export default defineComponent({
  name: 'dropdown-menu',
  components: {
    VListItemLocalized,
  },
  props: {
    menus: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
  },
});

</script>
