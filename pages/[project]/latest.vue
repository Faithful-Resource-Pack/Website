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
		const { apiURL } = useRuntimeConfig().public;
		try {
			const posts = await $fetch(`${apiURL}/posts/approved`);
			const candidates = posts.filter(({ permalink }) => permalink.startsWith(`/${project}`));

			const post = candidates.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
			if (!post) throw "No posts were found.";

			const { title, description, header_img } = post;
			const image =
				header_img || "https://database.faithfulpack.net/images/website/posts/placeholder.jpg";

			useSeoMeta(generateMetaTags({ title, description, image }));
			return {
				post,
			};
		} catch (err) {
			throw createError({ statusCode: 404, statusMessage: String(err), fatal: true });
		}
	},
});
</script>
