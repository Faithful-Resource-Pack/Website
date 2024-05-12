/* global Vue, VueRouter, Vuetify */

Vue.config.devtools = location.hostname === "localhost" || location.hostname === "127.0.0.1";

const AddonPost = () => import("./addon-post.js");

document.addEventListener("DOMContentLoaded", () => {
  const v = new Vue({
    components: {
      AddonPost,
    },
    el: "#app",
    vuetify: new Vuetify(),
  });
});
