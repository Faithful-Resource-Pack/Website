<template>
	<h1 class="title my-5 text-center">Download Faithful</h1>
	<div class="card d-flex flex-row">
		<div class="card-body card-text">
			<h2>Choose Pack</h2>
			<div class="download-selector my-5">
				<template v-for="{ id, label, description, to } in packs" :key="id">
					<div
						class="download-choice d-flex align-center justify-space-between ga-2 cursor-pointer"
						:class="id === selectedPack && 'selected-choice'"
						@mouseover="hover(id)"
						@mouseleave="resetHover"
						@click="select(id)"
					>
						<div class="d-flex align-center ga-3">
							<v-icon
								class="download-radio-icon"
								:icon="id === selectedPack ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank'"
							/>
							<div class="d-flex flex-column align-start">
								<span class="pack-name">{{ label }}</span>
								<span>{{ description }}</span>
							</div>
						</div>

						<!-- use opacity so enough space is reserved-->
						<a
							:href="id === hoverPack && to"
							target="_blank"
							rel="noopener noreferrer"
							class="btn btn-secondary btn-link"
							:style="{ opacity: id === hoverPack ? '1' : '0' }"
						>
							<v-icon icon="mdi-information-outline" />
						</a>
					</div>
				</template>
			</div>
			<h2 class="my-5">Choose Edition</h2>
			<v-row>
				<v-col v-for="[edition, href] in downloads">
					<a class="btn btn-primary block btn-lg mb-0" :href>
						<v-icon size="small" icon="mdi-download" />
						<span class="ml-2">{{ edition }}</span>
					</a>
				</v-col>
			</v-row>
		</div>
		<div v-if="$vuetify.display.mdAndUp" class="download-preview-container">
			<img
				v-for="{ id } in packs"
				class="download-preview"
				:class="id === hoverPack && 'show'"
				:src="`/image/banners/${id}.jpg`"
			/>

			<img
				v-for="{ id } in packs"
				class="download-preview download-logo"
				:class="id === hoverPack && 'show'"
				:src="`https://database.faithfulpack.net/images/branding/logos/transparent/hd/${id}_logo.png`"
			/>
		</div>
	</div>

	<div class="text-center mt-10">
		<p class="h5">
			Looking for a specific release or discontinued project?
			<nuxt-link to="/archive">Search the Faithful archive</nuxt-link>
		</p>
	</div>
</template>

<script>
const DOWNLOAD_DATA = [
	{
		id: "f32",
		json: "faithful_32x_java",
		edition: "Java",
	},
	{
		id: "f32",
		json: "faithful_32x_bedrock",
		edition: "Bedrock",
	},
	{
		id: "f64",
		json: "faithful_64x_java",
		edition: "Java",
	},
	{
		id: "f64",
		json: "faithful_64x_bedrock",
		edition: "Bedrock",
	},
	/* {
		id: "cf32",
		json: "classic_faithful_32x_java",
		edition: "Java",
	},
	{
		id: "cf32",
		json: "classic_faithful_32x_bedrock",
		edition: "Bedrock",
	},
	{
		id: "cf64",
		json: "classic_faithful_64x_java",
		edition: "Java",
	},
	{
		id: "cf64",
		json: "classic_faithful_64x_bedrock",
		edition: "Bedrock",
	}, */
];

export default defineNuxtComponent({
	async asyncData() {
		// set object order by which ones come first
		const downloadData = DOWNLOAD_DATA.reduce((acc, cur) => {
			acc[cur.id] ||= {};
			acc[cur.id][cur.edition] = "";
			return acc;
		}, {});

		await Promise.all(
			DOWNLOAD_DATA.map(async ({ id, json, edition }) => {
				// vite limitation, can't do regular $fetch here
				const downloads = await import(`../../public/downloads/${json}.json`)
					.then((res) => res.default)
					.catch((err) => {
						console.error(err);
						return {};
					});

				downloadData[id][edition] = downloads;
			}),
		);

		// after the promise.all everything has finished fetching into downloadData
		return { downloadData };
	},
	data() {
		return {
			packs: [
				{
					id: "f32",
					label: "Faithful 32x",
					hash: "#Faithful-32x",
					description: "Tried and true for over a decade.",
					to: "/faithful32x",
				},
				{
					id: "f64",
					label: "Faithful 64x",
					hash: "#Faithful-64x",
					description: "For when just 32x isn't enough.",
					to: "/faithful64x",
				},
				{
					id: "cf32",
					label: "Classic Faithful 32x",
					hash: "#Classic-Faithful-32x",
					description: "Return to 2015 Minecraft in style.",
					to: "/classic32x",
				},
				{
					id: "cf64",
					label: "Classic Faithful 64x",
					hash: "#Classic-Faithful-64x",
					description: "Nostalgia and ultra-detailed graphics, all in one.",
					to: "/classic64x-jappa",
				},
			],
			selectedPack: "f32",
			hoverPack: "f32",
			hoverTimeout: undefined,
		};
	},
	methods: {
		select(pack) {
			this.selectedPack = pack;
		},
		hover(pack) {
			// user is hovering over multiple at once, clear the reset
			if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
			this.hoverPack = pack;
		},
		resetHover() {
			// it looks weird to preview a pack that isn't selected
			this.hoverTimeout = setTimeout(() => {
				this.hoverPack = this.selectedPack;
			}, 500);
		},
	},
	computed: {
		downloads() {
			const downloads = this.downloadData[this.selectedPack];
			return Object.entries(downloads).map(([edition, versions]) => {
				const [versionName, latestVersion] = Object.entries(versions)[0];
				const firstVersion = latestVersion[0];
				const firstDownload = Object.values(firstVersion.links)[0];
				return [`${edition} (${versionName})`, firstDownload];
			});
		},
	},
	watch: {
		selectedPack: {
			handler(newValue) {
				const pack = this.packs.find((p) => p.id === newValue);
				if (!pack || pack.hash === this.$route.hash) return;
				this.$router.replace({ hash: pack.hash });
			},
		},
	},
	mounted() {
		if (this.$route.hash) {
			const result = this.packs.find((p) => p.hash === this.$route.hash);
			if (result && result.id) this.selectedPack = result.id;
			this.hoverPack = this.selectedPack;
		}
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables.scss" as *;

$border-thickness: 2px;

.download-selector {
	display: flex;
	flex-flow: column nowrap;
	align-items: stretch;
	gap: 8px;
}

.download-choice {
	border: $border-thickness solid rgba(white, 0.2);
	.download-info-icon {
		color: rgba(white, 0.2);
	}
	padding: $padding-card;
	border-radius: $border-radius;

	transition: $transition-button;
}

.download-choice:not(.selected-choice):hover {
	// half white half green, should unhardcode at some point
	border: $border-thickness solid rgba(#bae3a1, 0.5);
	.download-radio-icon {
		color: rgba(#bae3a1, 0.9);
	}
}

.pack-name {
	color: $text-card-title;
	font-size: 1.35rem;
}

.selected-choice {
	border: $border-thickness solid $text-green;
	background: rgba($text-green, 0.15);
	.download-radio-icon {
		color: $text-green;
	}
}

.btn-link {
	width: 2.5rem;
	height: 2.5rem;
}

// use absolute to stack the images on top of each other
.download-preview-container {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	width: 50%;
}

.download-preview {
	opacity: 0;
	position: absolute;
	left: 0;
	right: 0;
	height: 100%;
	transition: $transition-zoom;
	filter: brightness(0.6) saturate(1.1);
}

.download-preview.show {
	opacity: 1;
}

.download-logo {
	height: 75%;
	margin: auto;
	filter: drop-shadow($shadow-image);
	transition: $transition-button;
}
</style>
