/* global Vue, saveAs, ResourcePackCreator, moment, Worker */
/* eslint no-multi-str: 0 */

export default {
	name: "local-download",
	components: {
		CustomModal: Vue.defineAsyncComponent(() => import("./custom-modal.js")),
	},
	props: ["canpack", "versions"],
	template: `
		<div>
			<custom-modal
				contentId="cacheClear"
				:modalOpened="confirmOpened"
				:closeOnClick="() => { confirmOpened = false }"
			>
				<h3>Do you want to use cached versions?</h3>
				<p class="mb-2">
					Some mod resource packs may already have been downloaded.
					Do you want to use the cached versions?
					Using the cached versions is usually faster but can cause outdated textures.
				</p>
				<div class="text-center auto-flex px-2">
					<button type="button" class="btn btn-dark mx-1 mt-2" @click="downloadLocally(true)">No</button>
					<button type="button" class="btn btn-dark mx-1 mt-2" @click="downloadLocally(false)">Yes</button>
				</div>
			</custom-modal>
			<custom-modal id="downloadModal" contentId="downloadModalContent" :modalOpened="modalOpened" :closeOnClick="closeModal">
				<div id="steps">
					<template v-for="(step, index) in steps" :key="step.name" >
						<div class="text-center">
							<button :disabled="index != currentStep" class="mx-auto px-0 btn btn-dark">{{ index+1 }}</button>
						</div>
						<div v-if="index < steps.length -1" class="line col"></div>
					</template>
				</div>
				<h3 class="mt-3 mb-1">{{ "Step " + (currentStep+1) + ": " + steps[currentStep].name }}</h3>
				<p v-if="currentStep < 2">{{ latestLog }}</p>
				<p v-else>{{ steps[currentStep].content }}<span v-if="isGenerating">{{ timeLeft }}</span></p>
				<div id="zipProgressBar" v-if="isGenerating" class="progress my-3">
					<div
						role="progressbar"
						:class="{
							'progress-bar': true,
							'progress-bar-striped': parseInt(generatedPercent) < 100,
							'progress-bar-animated': parseInt(generatedPercent) < 100
						}"
						:style="{ width: generatedPercent + '%' }"
						:aria-valuenow="generatedPercent"
						aria-valuemin="0"
						aria-valuemax="100"
					>
						{{ generatedPercent + "%" }}
					</div>
				</div>
				<div id="logs" ref="log">
					<div
						v-for="(log, index) in logs"
						:key="index"
						:class="{ log: true, error: log.type === \'error\' }"
						:title="log.value"
					>
						{{ log.value }}
					</div>
				</div>
				<div id="bottomButtons" class="text-right mt-3">
					<button
						:disabled="!finalZip"
						@click="downloadZip"
						class="btn btn-dark mt-2 mr-2"
					>
						Download Zip
					</button>
					<button
						@click="closeModal"
						:title="cancelTitle"
						:disabled="!canCloseModal"
						class="btn btn-dark mt-2"
					>
						Cancel
					</button>
				</div>
			</custom-modal>
		</div>`,
	data() {
		return {
			dbName: "mods",
			dbVersion: 4,
			database: null,
			isDownloading: false,
			stores: [
				{
					name: "files",
					options: { autoIncrement: true },
				},
			],
			steps: [
				{
					name: "Downloading mods",
					content: "Downloading ",
				},
				{
					name: "Unzipping mods",
					content: "Extracting ",
				},
				{
					name: "Creating archive",
					content: "Zipping time left: ",
				},
			],
			currentStep: 0,
			currentMod: "",
			modalOpened: false,
			confirmOpened: false,
			modSelection: undefined,
			logs: [],
			generatedPercent: -1,
			startTime: new moment(), // eslint-disable-line new-cap
			currentTime: new moment(), // eslint-disable-line new-cap
			currentWorker: undefined,
			finalZip: undefined,
		};
	},
	methods: {
		closeModal() {
			this.modalOpened = false;

			if (this.navigatorSupportsWorkers && this.currentWorker !== undefined) {
				this.currentWorker.terminate();
			}
		},
		downloadLocally(forceDownload = false) {
			// hide confirm modal
			this.confirmOpened = false;
			this.logs = [];
			this.generatedPercent = -1;

			this.finalZip = undefined;

			this.isDownloading = true;
			this.modalOpened = true;

			this.currentStep = 0;

			if (this.navigatorSupportsWorkers) {
				this.downloadWithWorker(this.modSelection, forceDownload, this.logHandler);
				return;
			}

			ResourcePackCreator.openDatabase(this.dbName, this.dbVersion, this.stores[0].name);
			ResourcePackCreator.packVersions = this.$root.versions;
			ResourcePackCreator.zipOptions = this.$root.$refs.zipOptions.zipOptions;
			ResourcePackCreator.downloadLocally(
				this.modSelection,
				forceDownload,
				this.logHandler,
			).catch((err) => {
				this.logHandler({
					step: 0,
					message: err,
				});
			});
		},
		downloadWithWorker(modSelection, forceDownload, logListener) {
			// terminate (or re-terminate old worker)
			if (this.currentWorker) this.currentWorker.terminate();

			this.currentWorker = new Worker("/js/mods/worker/downloadWorker.js");

			// listen to logs
			this.currentWorker.onmessage = function (e) {
				if (e.data && e.data.type === "log") logListener(e.data.content);
			};

			// open database
			this.currentWorker.postMessage({
				channel: "openDatabase",
				data: {
					dbName: this.dbName,
					dbVersion: this.dbVersion,
					storeName: this.stores[0].name,
				},
			});

			// set zip options
			this.currentWorker.postMessage({
				channel: "fillZipOptions",
				data: this.$root.$refs.zipOptions.zipOptions,
			});

			// open database
			this.currentWorker.postMessage({
				channel: "fillPackVersions",
				data: this.$root.versions || this.$props.versions,
			});

			// finally create pack
			this.currentWorker.postMessage({
				channel: "createPack",
				data: {
					modSelection: modSelection,
					forceDownload: forceDownload,
				},
			});
		},
		logHandler(log) {
			if (log.step < 3) {
				this.currentStep = log.step;

				if (log.step !== 2) {
					this.addLog(log.message);
				} else {
					if (!isNaN(parseFloat(log.message))) {
						this.generatedPercent = log.message;

						this.currentTime = new moment(); // eslint-disable-line
					} else if (typeof log.message === "string") this.addLog(log.message);
				}
			} else {
				this.finalZip = log.message;

				this.downloadZip();

				this.isDownloading = false;
			}
		},
		addLog(value, isError = false) {
			this.logs.push({
				type: isError ? "error" : "log",
				value: "" + value,
			});
		},
		modToDisplayName(mod) {
			return mod.name.displayName;
		},
		modToRepoName(mod) {
			if (mod.extRepo) return mod.extRepo.split("/").pop();
			else return mod.orgRepo;
		},
		modToRepoURL(mod) {
			if (mod.orgRepo) {
				return "https://github.com/Faithful-Mods/" + this.modToRepoName(mod);
			} else {
				return mod.extRepo;
			}
		},
		modToSelection(mod, version = undefined) {
			return {
				name: this.modToRepoName(mod),
				displayName: this.modToDisplayName(mod),
				repositoryURL: this.modToRepoURL(mod, version),
				version: mod.versionSelected || version,
			};
		},
		openConfirmModal(modSelection = undefined) {
			this.modSelection = !modSelection ? this.$root.modSelection : modSelection;

			this.confirmOpened = true;
		},
		downloadZip() {
			if (this.finalZip !== undefined) {
				const customName = this.$root.$refs.zipOptions.customArchiveName;
				const archiveName = customName || " Resource Pack " + new Date().getTime();
				saveAs(this.finalZip, archiveName + ".zip"); // 2) trigger the download
			}
		},
	},
	watch: {
		logs: {
			currentStep(newValue, oldValue) {
				if (oldValue === 1 && newValue === 2) {
					this.startTime.set(new Date());
				}
			},
			handler() {
				// scroll to bottom
				Vue.nextTick(() => {
					const objDiv = this.$refs.log;
					objDiv.scrollTop = objDiv.scrollHeight + 100;
				});
			},
			deep: true,
		},
	},
	computed: {
		canCloseModal() {
			return this.navigatorSupportsWorkers || (this.modalOpened && !this.isDownloading);
		},
		canDownloadLocally() {
			return !this.$props.canpack;
		},
		isGenerating() {
			return this.generatedPercent > 0;
		},
		latestLog() {
			return this.logs.length > 0 ? this.logs[this.logs.length - 1].value || "" : "";
		},
		navigatorSupportsWorkers() {
			return typeof Worker === "function";
		},
		reasonCantDownload() {
			return "This selection cannot be packed (Pack versions not compatible)";
		},
		timeLeft() {
			// we need to multiply duration by percent

			/*
			 * durationInMs = diff from start to now as ms
			 *
			 * durationInMs | percent
			 * totalDurInMs | 100
			 *
			 * timeLeftInMs = totalDurInMs - durationMs
			 */

			const durationInMs = moment
				.duration(this.currentTime.diff(this.startTime))
				.asMilliseconds();
			const totalDurInMs = (durationInMs * 100) / this.generatedPercent;
			const timeLeftInMs = totalDurInMs - durationInMs;

			const durLeft = moment.duration(timeLeftInMs);

			const h = durLeft.hours();
			const m = durLeft.minutes();
			const s = durLeft.seconds();

			return (h > 0 ? h + "h " : "") + (m > 0 ? m + "min " : "") + s + "s";
		},
		cancelTitle() {
			return this.navigatorSupportsWorkers
				? "Your browser supports Web Workers :). You can cancel this script immediatly."
				: "Your navigator doesn't supports Web Workers :(. You can't cancel this script.";
		},
	},
};
