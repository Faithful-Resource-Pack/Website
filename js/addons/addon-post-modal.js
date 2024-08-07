/* global Vuetify */

export default {
  name: 'addon-modal',
  template: `
    <v-dialog
      v-model="modalOpened"
      max-width="1080"
      style="z-index: 99999"
    >
      <img :src="image">
    </v-dialog>
  `,
  props: {
    value: {
      type: Boolean,
      required: true
    },
    close: {
      type: Function,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      modalOpened: false,
    }
  },
  watch: {
    value(n) {
      this.modalOpened = n;
    },
    modalOpened(n) {
      this.$emit("input", n);
    }
  }
}