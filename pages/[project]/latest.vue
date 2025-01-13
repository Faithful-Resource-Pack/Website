<template>
	<post-layout :post />
</template>

<script>
import PostLayout from "~/components/posts/post-layout.vue";

export default defineNuxtComponent({
	components: {
		PostLayout,
	},
	async asyncData() {
		const { project } = useRoute().params;
		const posts = await $fetch("https://api.faithfulpack.net/v2/posts/approved");
		const candidates = posts.filter(({ permalink }) => permalink.startsWith(`/${project}`));
		return {
			post: candidates.sort((a, b) => new Date(b.date) - new Date(a.date))[0],
		};
	},
});
</script>
