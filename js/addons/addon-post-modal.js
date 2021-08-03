/* global Vuetify */

export default {
  name: 'addon-modal',
  template: `
    <v-dialog
      v-model="dialog"
      max-width="1080"
      style="z-index: 99999"

    >
      <img :src="image">
    </v-dialog>
  `,
  props: {
    dialog: {
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
  }
}