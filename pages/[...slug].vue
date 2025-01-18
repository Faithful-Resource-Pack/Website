<template>
	<!-- shared by /:project/latest as well -->
	<post-layout :post />
</template>

<script>
import PostLayout from "~/components/posts/post-layout.vue";

export default defineNuxtComponent({
	components: {
		PostLayout,
	},
	async asyncData() {
		const route = useRoute();
		// need to double encode (the tsoa experience)
		try {
			const post = await $fetch(
				`https://api.faithfulpack.net/v2/posts/${encodeURIComponent(encodeURIComponent(route.path))}`,
			);
			return { post };
		} catch (err) {
			throw createError({ statusCode: 404, statusMessage: "Post not found", fatal: true });
		}
	},
});
</script>
