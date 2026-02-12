<template>
	<h1 class="title my-5 text-center">Downloads</h1>
	<div class="res-grid-4 mb-5">
		<download-card
			v-for="(editions, pack) in downloads"
			:key="pack"
			:name="pack"
			:background="backgrounds[pack]"
			:logo="logos[pack]"
			:data="editions"
		/>
	</div>

	<div class="text-center">
		<p>
			Looking for a specific release or discontinued project?
			<nuxt-link to="/archive">Search the Faithful archive</nuxt-link>
		</p>
	</div>
</template>

<script>
// expand this with new packs as necessary
const DOWNLOAD_DATA = [
	{
		// json filename
		json: "faithful_32x_java",
		// display name
		name: "Faithful 32x",
		// display edition
		edition: "Java",
	},
	{
		json: "faithful_32x_bedrock",
		name: "Faithful 32x",
		edition: "Bedrock",
	},
	{
		json: "faithful_64x_java",
		name: "Faithful 64x",
		edition: "Java",
	},
	{
		json: "faithful_64x_bedrock",
		name: "Faithful 64x",
		edition: "Bedrock",
	},
];
export default defineNuxtComponent({
	async asyncData() {
		// set object order by which ones come first
		const downloadData = DOWNLOAD_DATA.reduce((acc, cur) => {
			acc[cur.name] ||= {};
			acc[cur.name][cur.edition] = {};
			return acc;
		}, {});

		await Promise.all(
			DOWNLOAD_DATA.map(async ({ name, edition, json }) => {
				const downloads = await import(`../../public/downloads/${json}.json`)
					.then((res) => res.default)
					.catch((err) => {
						console.error(err);
						return {};
					});
				// nested fields already set up
				downloadData[name][edition] = downloads;
			}),
		);

		// after the promise.all everything has finished fetching into downloadData
		return { downloads: downloadData };
	},
	data() {
		return {
			backgrounds: {
				"Faithful 32x": "/image/posters/f32.jpg",
				"Faithful 64x": "/image/posters/f64.jpg",
			},
			logos: {
				"Faithful 32x":
					"https://database.faithfulpack.net/images/branding/logos/transparent/hd/f32_logo.png",
				"Faithful 64x":
					"https://database.faithfulpack.net/images/branding/logos/transparent/hd/f64_logo.png",
			},
		};
	},
});
</script>
