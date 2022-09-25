<template>
  <div class="grid">
    <template
      v-for = "(addon, index) in addons"
      :key="index"
    >
      <v-card
        :href="`/addons/${addon.slug}`"
        class="addon-card"
      >
        <v-img :src="`https://database.faithfulpack.net/images/addons/${addon.slug}/header`" aspect-ratio="16/9" cover/>

        <div class="addon-card-shadow" ></div>

        <h3 class="addon-title">{{ addon.name }}</h3>
        <div class="addon-icons">
          <v-img class="addon-icon" v-if="addon.options.tags.includes('Java')" :src="require('@/assets/icons/java.png')" alt="" loading="lazy" />
          <v-img class="addon-icon" v-if="addon.options.tags.includes('Bedrock')" :src="require('@/assets/icons/bedrock.png')" alt="" loading="lazy" />
          <v-img class="addon-icon" v-if="addon.options.optifine" :src="require('@/assets/icons/optifine.png')" alt="" loading="lazy" />
        </div>
        <div class="addon-tags">
          <p v-for="tag in resolutions(addon)" :key="tag">{{ tag }}</p>
        </div>
      <v-btn
        class="addon-fav"
        flat
        icon
        small
        @click.prevent="action(addon)"
        color="transparent"
      >
        <v-icon
          :color="Object.keys(addons) === Object.keys(addonsFav) ? iconColor : (addonsFav[addon.id] ? iconColor : 'rgba(0, 0, 0, .5)')"
        >{{ icon }}</v-icon>
      </v-btn>
      </v-card>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-image: var(--v-background-image);
  background-repeat: repeat;
  gap: 1.5rem;

  padding: 1.5rem;
}

.addon-card {
  position: relative;
  max-width: 345px;
  width: 100%;

  &-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    box-shadow: inset 5px 5px 50px 25px rgb(0 0 0 / 50%);

    &:hover {
      box-shadow: inset 5px 5px 50px 25px rgb(0 0 0 / 40%)
    }
  }
}

.addon-title {
  color: white;
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.addon-icons {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  width: 42px;
}

.addon-icon {
  border-radius: 12px;
  width: 42px;
  height: 42px;
}

.addon-tags {
  color: white;
  position: absolute;
  left: 1rem;
  top: calc(1rem + 25px);
  display: flex;
  gap: 10px;
}

.addon-fav {
  z-index: 1000;
  position: absolute;
  top: .125rem;
  right: .125rem;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'addon-grid',
  props: {
    addons: {
      type: Object,
      required: true,
    },
    addonsFav: {
      type: Object,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconColor: {
      type: String,
      required: true,
    },
  },
  computed: {
    addons_sorted() {
      const sorted = Object.values(this.addons);
      sorted.sort((a, b) => {
        const an = a.name.trim().toLowerCase();
        const bn = b.name.trim().toLowerCase();

        // eslint-disable-next-line no-nested-ternary
        return an === bn ? 0 : (an > bn ? 1 : -1);
      });

      return sorted;
    },
  },
  methods: {
    resolutions(addon: { options: { tags: string[] } }) {
      const resolutions = [];
      if (addon.options.tags.includes('32x')) resolutions.push('32x');
      if (addon.options.tags.includes('64x')) resolutions.push('64x');

      return resolutions;
    },
  },
});
</script>
