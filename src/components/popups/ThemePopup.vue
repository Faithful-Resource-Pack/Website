<template>
  <v-dialog
    v-model="show"
    max-width="500px"
  >
    <v-card class="px-3 py-3">
      <v-card-title class="justify-center">{{ $t("theme_selector") }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-switch
              v-model="$root.isColorblind"
              :label="$t('theme_colorblind')"
              hide-details
            ></v-switch>
            <v-switch
              v-model="$root.isDark"
              :label="$t('theme_dark')"
              hide-details
            ></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'theme-popup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
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
});
</script>
