<template>
  <v-btn :to="localizeTo()" v-bind="$attrs">
    <slot />
  </v-btn>
</template>

<script lang="ts">
import localizePath from '@/utils/i18n/localizePath';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'btn-localized',
  props: {
    to: {
      type: String,
      required: false,
    },
  },
  methods: {
    localizeTo() {
      if (!this.to) return undefined;

      return localizePath(this.to, this.$i18n.locale, this.$route.path, this.$router);
    },
  },
});
</script>
