/* global Vue */
/* eslint no-multi-str: 0 */

Vue.component('custom-modal', {
  props: {
    modalOpened: {
      type: Boolean,
      required: true
    },
    contentId: {
      type: String,
      default: undefined
    },
    closeOnClick: {
      type: Function,
      required: true
    }
  },
  template: '<div id="cacheClear" class="customModal" v-show="modalOpened">\
    <div class="customModalBackground" v-on:click="closeOnClick"></div>\
    <div :id="contentId" class="customModalContent p-3">\
      <slot></slot>\
    </div><span class="taille">\
  </div>'
})
