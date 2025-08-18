<template>
	<div class="author-heads">
		<img
			v-for="{ id, src, username } in authorInfo"
			:key="id"
			:src
			:alt="`${username}'s Avatar`"
			loading="lazy"
		/>
		<p v-if="firstUsername" class="mb-0 ml-2">By {{ firstUsername }}</p>
	</div>
</template>

<script>
export default {
	name: "author-heads",
	props: {
		authors: {
			type: Array,
			required: true,
		},
	},
	methods: {
		randomHead(seed) {
			// ten options for ten digits
			const options = [
				"X-Alex",
				"X-Ari",
				"X-Efe",
				"X-Kai",
				"X-Makena",
				"X-Noor",
				"X-Steve",
				"X-Steve",
				"X-Sunny",
				"X-Zuri",
			];

			// guaranteed to have the same head for the same user always (last digit is most random)
			return options[seed.toString().at(-1)];
		},
	},
	computed: {
		authorInfo() {
			return this.authors.map((author) => ({
				id: author.id,
				// since the randomness is deterministic it's SSR-safe (wahoo)
				src: `https://vzge.me/face/64/${author?.uuid || this.randomHead(author.id)}`,
				username: author?.username || "Anonymous author",
			}));
		},
		firstUsername() {
			const filtered = this.authors.filter((a) => typeof a?.username === "string");
			// only return if one possible choice (avoid favoritism)
			if (filtered.length === 1) return filtered[0].username;
			return "";
		},
	},
};
</script>

<style scoped lang="scss">
.author-heads {
	flex-grow: 1;
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	gap: 6px;
	img {
		height: 32px;
		image-rendering: pixelated;
	}
}
</style>
