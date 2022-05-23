<template>
  <div>{{ $t('loading_msg') }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import userStore from '@/stores/user';
import errorHandlerStore from '@/stores/errorHandler';

export default defineComponent({
  name: 'LoginCallbackView',
  setup() {
    const user = userStore();
    const errorHandler = errorHandlerStore();
    return { user, errorHandler };
  },
  mounted() {
    if (this.$router.currentRoute.value.query.code) {
      this.user.auth(this.$router);
    } else {
      this.errorHandler.show('No code given in the query', { color: 'error' });
    }
  },
});

</script>
