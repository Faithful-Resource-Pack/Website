<template>
	<!-- remove padding and re-add it so the highlight has a really nice margin -->
	<nuxt-link class="author-widget underline-hover mx-n2" :to="`/user/${author.id}`">
		<div class="ma-2">
			<profile-card
				:src="`https://vzge.me/face/128/${getVisageSlug(author)}`"
				:alt="`${author.username}'s Avatar`"
			>
				<h5 class="mb-0">{{ author.username }}</h5>
			</profile-card>
		</div>
	</nuxt-link>
</template>

<script>
import ProfileCard from "~/components/lib/profile-card.vue";

export default defineNuxtComponent({
	name: "author-widget",
	components: {
		ProfileCard,
	},
	props: {
		author: {
			type: Object,
			required: true,
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;
.author-widget {
	border-radius: $border-radius;
	transition: $transition-button;
	&:hover {
		text-decoration: underline;
	}
	&:active {
		transform: scale(0.95);
	}
}
</style>
