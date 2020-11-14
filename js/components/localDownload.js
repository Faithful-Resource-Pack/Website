/* global Vue, saveAs, ResourcePackCreator, moment */
/* eslint no-multi-str: 0 */

try {
  let NAME;
} catch(_e) {}
NAME = 'Compliance Mods';

Vue.component('local-download', {
  props: ['canpack', 'versions'],
  template:
    '<div>\
      <custom-modal contentId="cacheClear" :modalOpened="confirmOpened" :closeOnClick="function() { confirmOpened = false }"> \
        <h3>Do you want to use cached versions?</h3>\
        <p class="mb-2">Some mod resource packs may already have been downloaded. Do you want to use the cached versions? Using the cached versions is usually faster but can cause outdated textures.</p>\
        <div class="text-center row px-2">\
          <button type="button" class="btn btn-custom mx-1 mt-2 col-sm" v-on:click="downloadLocally(true)">No</button>\
          <button type="button" class="btn btn-custom mx-1 mt-2 col-sm" v-on:click="downloadLocally(false)">Yes</button>\
        </div>\
      </custom-modal>\
      \
      <custom-modal id="downloadModal" contentId="downloadModalContent" :modalOpened="modalOpened" :closeIconEnabled="canCloseModal" :closeOnClick="closeModal" :closeIconTitle="cancelTitle">\
        <div id="steps" class="row pr-4">\
          <template v-for="(step, index) in steps" :key="step.name" >\
            <div class="col-auto text-center">\
              <button :disabled="index != currentStep" class="mx-auto px-0 btn btn-custom">{{ index+1 }}</button>\
            </div>\
            <div v-if="index < steps.length -1" class="line col"></div>\
          </template>\
        </div>\
        <h3 class="mt-3 mb-1">{{ "Step " + (currentStep+1) + ": " + steps[currentStep].name }}</h3>\
        <p v-if="currentStep < 2">{{ latestLog }}</p>\
        <p v-else>{{ steps[currentStep].content }}<span v-if="isGenerating">{{ timeLeft }}</span></p>\
        <div id="zipProgressBar" v-if="isGenerating" class="progress my-3">\
          <div :class="{ \'progress-bar\': true, \'progress-bar-striped\': parseInt(generatedPercent) < 100, \'progress-bar-animated\': parseInt(generatedPercent) < 100 }" role="progressbar" :style="{ width: generatedPercent + \'%\' }" :aria-valuenow="generatedPercent" aria-valuemin="0" aria-valuemax="100">{{ generatedPercent + "%" }}</div>\
        </div>\
        <div id="logs" ref="log">\
          <div v-for="(log, index) in logs" :key="index" :class="{ log: true, error: log.type === \'error\' }" :title="log.value">{{ log.value }}</div>\
        </div>\
        <div id="bottomButtons" class="text-right mt-3">\
        <button :disabled="!finalZip" v-on:click="downloadZip" class="btn btn-custom mr-2">Download Zip</button><button v-on:click="closeModal" :title="cancelTitle" :disabled="!canCloseModal" class="btn btn-custom">Cancel</button>\
        </div>\
      </custom-modal>\
    </div>',
  data () {
    return {
      dbName: 'mods',
      dbVersion: 4,
      database: null,
      isDownloading: false,
      stores: [
        {
          name: 'files',
          options: { autoIncrement: true }
        }
      ],
      steps: [
        {
          name: 'Downloading mods',
          content: 'Downloading '
        },
        {
          name: 'Unzipping mods',
          content: 'Extracting '
        },
        {
          name: 'Creating archive',
          content: 'Zipping time left: '
        }
      ],
      currentStep: 0,
      currentMod: '',
      modalOpened: false,
      confirmOpened: false,
      modSelection: undefined,
      logs: [],
      generatedPercent: -1,
      startTime: new moment(), // eslint-disable-line new-cap
      currentTime: new moment(), // eslint-disable-line new-cap
      currentWorker: undefined,
      finalZip: undefined
    }
  },
  methods: {
    closeModal: function () {
      this.modalOpened = false

      if (this.navigatorSupportsWorkers && this.currentWorker !== undefined) {
        this.currentWorker.terminate()
      }
    },
    downloadLocally: function (forceDownload = false) {
      // hide confirm modal
      this.confirmOpened = false
      this.logs = []
      this.generatedPercent = -1

      this.finalZip = undefined

      this.isDownloading = true
      this.modalOpened = true

      this.currentStep = 0

      if (this.navigatorSupportsWorkers) {
        this.downloadWithWorker(this.modSelection, forceDownload, this.logHandler)

        return
      }

      ResourcePackCreator.openDatabase(this.dbName, this.dbVersion, this.stores[0].name)
      ResourcePackCreator.packVersions = this.$root.versions
      ResourcePackCreator.zipOptions = this.$root.$refs.zipOptions.zipOptions
      ResourcePackCreator.downloadLocally(this.modSelection, forceDownload, this.logHandler)
    },
    downloadWithWorker: function (modSelection, forceDownload, logListener) {
      // terminate (or re-terminate old worker)
      if (this.currentWorker) this.currentWorker.terminate()

      this.currentWorker = new Worker('/js/worker/downloadWorker.js') // eslint-disable-line no-undef

      // listen to logs
      this.currentWorker.onmessage = function (e) {
        if (e.data && e.data.type === 'log') logListener(e.data.content)
      }

      // open database
      this.currentWorker.postMessage({
        channel: 'openDatabase',
        data: {
          dbName: this.dbName,
          dbVersion: this.dbVersion,
          storeName: this.stores[0].name
        }
      })

      // set zip options
      this.currentWorker.postMessage({
        channel: 'fillZipOptions',
        data: this.$root.$refs.zipOptions.zipOptions
      })

      // open database
      this.currentWorker.postMessage({
        channel: 'fillPackVersions',
        data: this.$root.versions || this.$props.versions
      })

      // finally create pack
      this.currentWorker.postMessage({
        channel: 'createPack',
        data: {
          modSelection: modSelection,
          forceDownload: forceDownload
        }
      })
    },
    logHandler: function (log) {
      if (log.step < 3) {
        this.currentStep = log.step

        if (log.step !== 2) {
          this.addLog(log.message)
        } else {
          if (!isNaN(parseFloat(log.message))) {
            this.generatedPercent = log.message

            this.currentTime = new moment() // eslint-disable-line
          } else if (typeof log.message === 'string') this.addLog(log.message)
        }
      } else {
        this.finalZip = log.message

        this.downloadZip()

        this.isDownloading = false
      }
    },
    addLog: function (value, isError = false) {
      this.logs.push({
        type: isError ? 'error' : 'log',
        value: '' + value
      })
    },
    modToSelection: function (mod, version = undefined) {
      return {
        name: mod.name[1],
        displayName: mod.name[0],
        repository: mod.repository,
        version: mod.versionSelected || version
      }
    },
    openConfirmModal: function (modSelection = undefined) {
      this.modSelection = (!modSelection) ? this.$root.modSelection : modSelection

      this.confirmOpened = true
    },
    downloadZip: function () {
      if (this.finalZip !== undefined) {
        const customName = this.$root.$refs.zipOptions.customArchiveName
        const archiveName = customName || NAME + ' Resource Pack ' + ((new Date()).getTime())
        saveAs(this.finalZip, archiveName + '.zip') // 2) trigger the download
      }
    }
  },
  watch: {
    logs: {
      currentStep: function (newValue, oldValue) {
        if (oldValue === 1 && newValue === 2) {
          this.startTime.set(new Date())
        }
      },
      handler: function () {
        Vue.nextTick(() => {
          let objDiv = this.$refs.log
          objDiv.scrollTop = objDiv.scrollHeight + 100
        })
      },
      deep: true
    }
  },
  computed: {
    canCloseModal: function () {
      return this.navigatorSupportsWorkers || (this.modalOpened && !this.isDownloading)
    },
    canDownloadLocally: function () {
      return !this.$props.canpack
    },
    isGenerating: function () {
      return this.generatedPercent > 0
    },
    latestLog: function () {
      return (this.logs.length > 0) ? this.logs[this.logs.length - 1].value || '' : ''
    },
    navigatorSupportsWorkers: function () {
      return typeof (Worker) === 'function'
    },
    reasonCantDownload: function () {
      return 'This selection cannot be packed (Pack versions not compatible)'
    },
    timeLeft: function () {
      // we need to multiply duration by percent

      /*
      *  durationInMs = diff from start to now as ms
      *
      *  durationInMs | percent
      *  totalDurInMs | 100
      *
      *  timeLeftInMs = totalDurInMs - durationMs
      */

      const durationInMs = moment.duration(this.currentTime.diff(this.startTime)).asMilliseconds()
      const totalDurInMs = durationInMs * 100 / this.generatedPercent
      const timeLeftInMs = totalDurInMs - durationInMs

      const durLeft = moment.duration(timeLeftInMs)

      const h = durLeft.hours()
      const m = durLeft.minutes()
      const s = durLeft.seconds()

      return (h > 0 ? h + 'h ' : '') + (m > 0 ? m + 'min ' : '') + s + 's'
    },
    cancelTitle: function () {
      return this.navigatorSupportsWorkers
        ? 'Your browser supports Web Workers :). You can cancel this script immediatly.'
        : "Your navigator doesn't supports Web Workers :(. You can't cancel this script."
    }
  }
})
