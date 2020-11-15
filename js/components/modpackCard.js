/* global Vue */
/* eslint no-multi-str: 0 */

Vue.component('modpack-card', {
  props: ['modpack', 'cantDownload', 'onbuttonclick'],
  template:
    '<div class="card">\
      <div class="card-image embed-responsive embed-responsive-1by1" :style="{\'background-image\': \'url(\' + modpack.coverSource + \')\' }">\
      </div>\
      <div class="card-body">\
        <h4 class="card-title">{{ modpack.modpackName }}</h4>\
        <div class="card-text">\
          <div class="row">\
            <div class="col-8">\
              <small>\
                <p class="ma-0 text-left">Modpack version:</p>\
                <p class="text-left">Minecraft version:</p>\
              </small>\
            </div>\
            <div class="col">\
              <small>\
                <p class="ma-0 text-right">{{ modpack.modpackVersion }}</p>\
                <p align="right">{{ modpack.minecraftVersion }}</p>\
              </small>\
            </div>\
          </div>\
        </div>\
        <button v-on:click="onbuttonclick" :title="cantDownload" :disabled="cantDownload || !modpack.modList || modpack.modList.length == 0" class="btn btn-block btn-dark">Download</button>\
      </div>\
    </div>'
})
