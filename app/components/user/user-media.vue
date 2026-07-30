<template>
	<div class="user-media-container">
		<a
			v-for="{ type, link } in media"
			:key="link"
			class="btn btn-secondary btn-icon"
			target="_blank"
			rel="noopener noreferrer"
			:href="link"
			:title="type"
		>
			<media-icon :icon="type" />
		</a>
		<a
			v-if="!isReservedAccount"
			class="btn btn-secondary btn-icon"
			:href="discordURL"
			target="_blank"
			rel="noopener noreferrer"
			title="Discord"
		>
			<media-icon icon="discord" />
		</a>
	</div>
</template>

<script>
import MediaIcon from "~/components/lib/media-icon.vue";

export default defineNuxtComponent({
	name: "user-media",
	components: {
		MediaIcon,
	},
	props: {
		media: {
			type: Object,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
		isReservedAccount: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	computed: {
		discordURL() {
			return `https://discord.com/users/${this.id}`;
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.user-media-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	gap: 0.5rem;
}
</style>
