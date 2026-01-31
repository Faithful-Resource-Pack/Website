<template>
	<div class="author-heads">
		<img
			v-for="{ id, src, username } in authorInfo"
			:key="id"
			:src
			:alt="`${username}'s Avatar`"
			:title="username"
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
	computed: {
		authorInfo() {
			return this.authors.map((author) => ({
				id: author.id,
				// since the randomness is deterministic it's SSR-safe (wahoo)
				src: `https://vzge.me/face/64/${getVisageSlug(author)}`,
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
