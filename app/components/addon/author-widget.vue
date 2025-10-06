<template>
	<div class="profile-card">
		<img
			class="profile-avatar"
			:src="`https://vzge.me/face/128/${author.uuid || 'X-Steve'}`"
			:alt="`${author.username}'s Avatar`"
		/>
		<!-- need div to treat as one unit -->
		<div>
			<h5 class="mb-0">{{ author.username }}</h5>
			<nuxt-link
				v-for="{ type, link } in author.media"
				:key="type"
				:to="link"
				class="author-media"
				target="_blank"
				rel="noreferrer"
			>
				<media-icon size="small" :icon="type" />
			</nuxt-link>
		</div>
	</div>
</template>

<script>
import MediaIcon from "~/components/lib/media-icon.vue";

export default defineNuxtComponent({
	name: "author-widget",
	components: {
		MediaIcon,
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
@use "~/assets/css/lib/variables" as *;

.author-media {
	color: white !important;
	opacity: 0.7;
	margin-right: 0.5rem;
	// technically counts as navigation if you think about it
	transition: $transition-navigation;
	&:hover {
		opacity: 1;
	}
}
</style>
