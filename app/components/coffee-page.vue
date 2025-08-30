<template>
	<!-- needs to be a component since both /coffee and /teapot show the same content -->
	<div id="stats" class="text-center">
		<h1 class="title my-5">I'm a teapot</h1>
		<div id="teacup">
			<div id="handle"><div></div></div>
			<img id="bucket" data-allow-mismatch="attribute" :src="bucketImg" alt="teacup" />
		</div>
	</div>
</template>

<script>
export default defineNuxtComponent({
	name: "coffee-page",
	// technically not async but this hook is guaranteed to only run once
	asyncData() {
		const buckets = [
			{ id: 1743, low: 0, high: 0.49 }, // water (higher weighting than rest)
			{ id: 1579, low: 0.5, high: 0.59 }, // lava
			{ id: 1621, low: 0.6, high: 0.69 }, // milk
			{ id: 1674, low: 0.7, high: 0.79 }, // powder snow
			{ id: 1308, low: 0.8, high: 0.89 }, // axolotl
			{ id: 4982, low: 0.9, high: 0.99 }, // tadpole
		];

		const rand = Math.random();
		const { id } = buckets.find(({ low, high }) => low < rand && rand < high) || buckets[0];
		return {
			bucketImg: `https://api.faithfulpack.net/v2/textures/${id}/url/faithful_64x/latest`,
		};
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *; // TODO

#teacup {
	display: flex;
	align-items: center;
	justify-content: center;
}

#bucket {
	height: 128px;
	width: 128px;
	image-rendering: pixelated;
	position: relative;
	z-index: 3;
}

#handle,
#handle div::after {
	border-radius: 50% 0 0 50%;
	border: 2px solid $bg-coffee;
}

#handle {
	width: 50px;
	height: 50px;
	margin-right: -42px;
}

#handle > div,
#handle div::after {
	width: 100%;
	height: 100%;
}

#handle div::after {
	content: "";
	display: block;
}

#handle > div {
	border-radius: 50%;
	border: 10px solid $fg-coffee;
}
</style>
