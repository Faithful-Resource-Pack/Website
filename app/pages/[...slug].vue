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
	setup() {
		definePageMeta({
			disableDefaultMeta: true,
		});
	},
	async asyncData() {
		const route = useRoute();
		const { apiURL } = useRuntimeConfig().public;
		const availablePosts = await $fetch(`${apiURL}/posts/available`);
		if (!new Set(availablePosts).has(route.path))
			throw createError({ statusCode: 404, statusMessage: "Post not found!" });

		// need to double encode (the tsoa experience)
		const post = await $fetch(
			`${apiURL}/posts/${encodeURIComponent(encodeURIComponent(route.path))}`,
		);

		const { title, description, header_img } = post;
		const image =
			header_img || "https://database.faithfulpack.net/images/website/posts/placeholder.jpg";

		useSeoMeta(generateMetaTags({ title, description, image }));

		return { post };
	},
});
</script>
