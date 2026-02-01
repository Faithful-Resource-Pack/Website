<template>
	<div class="user-media-container">
		<v-btn
			v-for="{ type, link } in media"
			:key="link"
			class="accent-textured"
			icon
			:href="link"
			target="_blank"
			rel="noopener noreferrer"
		>
			<media-icon :icon="type" class="user-media-icon" />
		</v-btn>
		<v-btn
			v-if="!isReservedAccount"
			class="accent-textured"
			icon
			:href="discordURL"
			target="_blank"
			rel="noopener noreferrer"
		>
			<media-icon icon="mdi-discord" class="user-media-icon" />
		</v-btn>
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
.user-media-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	gap: 0.5rem;
}
</style>
