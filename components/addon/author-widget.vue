<template>
	<div class="profile-card">
		<img
			class="profile-avatar"
			:src="`https://visage.surgeplay.com/face/128/${author.uuid || 'X-Steve'}`"
			:alt="`${author.username}'s Avatar`"
		/>
		<!-- need div to treat as one unit -->
		<div>
			<h5 class="author-username">{{ author.username }}</h5>
			<nuxt-link
				v-for="m in author.media"
				:key="m.type"
				:to="m.link"
				class="author-media"
				target="_blank"
				rel="noreferrer"
			>
				<media-icon size="small" :icon="m.type" />
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
.author-username {
	// reduce spacing between socials and username
	margin-bottom: 0px;
}

.author-media {
	color: white !important;
	opacity: 0.7;
	margin: 0 5px;
	transition: all 0.1s ease-out;
	&:hover {
		opacity: 1;
	}
}
</style>
