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
    noCloseIcon: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    closeIconEnabled: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    closeIconTitle: {
      type: String,
      default: () => { return 'Close' }
    },
    closeOnClick: {
      type: Function,
      required: true
    }
  },
  template: '<div id="cacheClear" class="customModal" v-show="modalOpened">\
    <div :id="contentId" class="customModalContent p-3">\
      <button v-if="!noCloseIcon" type="button" :disabled="!closeIconEnabled" :title="closeIconTitle" v-on:click="closeOnClick" class="close" aria-label="Close">\
        <span aria-hidden="true">&times;</span>\
      </button>\
      <slot></slot>\
    </div><span class="taille">\
  </div>'
})
