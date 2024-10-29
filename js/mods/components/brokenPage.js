/* global Vue, saveAs, ResourcePackCreator, moment, Worker, NAME */
/* eslint no-multi-str: 0 */

export default {
  name: "broken-page",
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  template: `
    <div v-if="!disabled" class="broken-page">
      <h1>This page is currently broken!</h1>
      <div class="card card-body">
        <p class="h4 m-0">
          A newer system is planned to completely replace this one, but for the time being you can download the ongoing mod work from our <a href="https://github.com/faithful-resource-pack/faithful-32x-mods">GitHub repository</a>. Most legacy mods and modpacks can be found at the <a href="https://github.com/f32organization">F32 Organization GitHub</a>, but as the project is largely abandoned, there's no guarantee of it working.
          <br>
          You can also still try to download mod or modpack support from this page, but remember that the site may not work, and we probably cannot and will not help you in troubleshooting.
        </p>
      </div>
      <img id="gone-fishin" src="/image/icon/gone-fishin.png">
    </div>
  `,
};
