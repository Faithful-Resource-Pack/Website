<template>
	<nuxt-link class="underline-hover" :to="`/user/${author.id}`">
		<profile-card
			:src="`https://vzge.me/face/128/${getVisageSlug(author)}`"
			:alt="`${author.username}'s Avatar`"
		>
			<h5 class="mb-0">{{ author.username }}</h5>
			<nuxt-link
				v-for="{ type, link } in author.media"
				:key="type"
				:to="link"
				class="user-media-icon mr-2"
				target="_blank"
				rel="noopener noreferrer"
			>
				<media-icon size="small" :icon="type" />
			</nuxt-link>
		</profile-card>
	</nuxt-link>
</template>

<script>
import MediaIcon from "~/components/lib/media-icon.vue";
import ProfileCard from "~/components/lib/profile-card.vue";

export default defineNuxtComponent({
	name: "author-widget",
	components: {
		MediaIcon,
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
