<template>
	<div class="user-role-container my-2">
		<v-chip
			v-for="role in sortedRoles"
			:key="role"
			variant="elevated"
			class="accent-textured flex-shrink-0"
			:style="{ color: info[role]?.color }"
		>
			<template #prepend>
				<v-icon
					class="mr-1 ml-n1 card-text"
					:icon="info[role]?.icon || 'mdi-shield-account'"
					:color="info[role]?.color"
				/>
			</template>
			<span>{{ role }}</span>
		</v-chip>
	</div>
</template>

<script>
export default defineNuxtComponent({
	name: "user-roles",
	props: {
		roles: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			info: {
				Administrator: {
					color: "#1abc9c",
					icon: "mdi-shield",
				},
				Moderator: {
					color: "#2ba4e0",
					icon: "mdi-gavel",
				},
				Developer: {
					color: "#9b59b6",
					icon: "mdi-console-line",
				},
				"Art Director Council": {
					color: "#af404f",
					icon: "mdi-eye",
				},
				VIP: {
					color: "#e91e63",
					icon: "mdi-crown",
				},
				Contributor: {
					color: "#f1c40f",
					icon: "mdi-star-four-points",
				},
				"Add-on Maker": {
					color: "#2ecc71",
					icon: "mdi-plus-thick",
				},
				"Mods Contributor": {
					color: "#1f8b4c",
					icon: "mdi-cards-club",
				},
				Translator: {
					color: "#3cda29",
					icon: "mdi-chat",
				},
			},
		};
	},
	computed: {
		sortedRoles() {
			// note: this relies on object key order being reliable (not guaranteed)
			const schema = Object.keys(this.info);
			return Array.from(this.roles).sort((a, b) => schema.indexOf(a) - schema.indexOf(b));
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.user-role-container {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	gap: 0.5rem;
}

@media screen and (max-width: $breakpoint-sm) {
	.user-role-container {
		justify-content: center;
	}
}

@media screen and (max-width: $breakpoint-xs) {
	// single line scrolling container
	.user-role-container {
		justify-content: flex-start;
		margin-top: 1rem !important;
		padding-left: 15px;
		padding-right: 15px;
		flex-flow: row nowrap;
		max-width: 100vw;
		overflow-x: scroll;
	}
}
</style>
