<template>
	<div class="user-header">
		<img
			class="user-header-image"
			:src="`https://vzge.me/face/128/${getVisageSlug(user)}`"
			:title="user.uuid"
		/>
		<div class="flex-grow-1">
			<div class="user-header-top">
				<h1 class="user-header-username mb-0 subtitle cursor-pointer" @click="copyURL">
					{{ displayedUsername }}
				</h1>
				<user-media :id="user.id" :media="user.media" :is-reserved-account />
			</div>
			<user-roles :roles="user.roles" />
		</div>
	</div>
	<hr />
	<template v-if="isReservedAccount">
		<div class="warning banner">
			<h1>This user account is special!</h1>
			<p class="text-left mb-0" style="opacity: 0.8">
				This user account does not correspond to a real Discord account. Possible reasons include
				placeholder accounts for old contributions or organization accounts.
			</p>
		</div>
		<hr />
	</template>
	<!-- eslint-disable vue/no-v-html -->
	<div v-if="user.bio" class="card card-body card-text" v-html="compileMarkdown(user.bio)" />
	<!-- eslint-enable vue/no-v-html -->

	<template v-if="addons.length">
		<div class="d-flex flex-row align-center justify-center ga-5 my-5">
			<h2 class="subtitle mb-0">Add-ons</h2>
			<v-chip color="#343A40" variant="flat" size="large">
				<span class="h3">{{ addons.length }}</span>
			</v-chip>
		</div>
		<div class="res-grid-3">
			<addon-card v-for="addon in addons" :key="addon.id" :addon minimal />
		</div>
	</template>
</template>

<script>
import AddonCard from "~/components/addons/addon-card.vue";
import UserRoles from "~/components/user/user-roles.vue";

export default defineNuxtComponent({
	components: {
		AddonCard,
		UserRoles,
	},
	setup() {
		definePageMeta({
			validate: (route) =>
				typeof route.params.id === "string" &&
				(/^\d+$/.test(route.params.id) || route.params.id.startsWith("@")),
			disableDefaultMeta: true,
		});
	},
	async asyncData() {
		const { id } = useRoute().params;
		const customSlug = id.startsWith("@");

		const { apiURL } = useRuntimeConfig().public;

		try {
			let user;
			let addons;
			if (customSlug) {
				// need to check if user slug exists before getting addons
				user = await $fetch(`${apiURL}/users/${id.slice(1)}`);
				if (Array.isArray(user)) user = user[0];
				addons = await $fetch(`${apiURL}/users/${user.id}/addons/approved`);
			} else {
				// you can get both at the same time since it's an id
				[user, addons] = await Promise.all([
					$fetch(`${apiURL}/users/${id}`),
					$fetch(`${apiURL}/users/${id}/addons/approved`),
				]);
			}
			if (user.anonymous) throw new Error("User is anonymous");
			useSeoMeta(
				generateMetaTags({
					title: `User: ${user.username || user.id}`,
					description: `${user.bio}`,
				}),
			);

			return {
				user,
				addons: addons.sort((a, b) => (b.last_updated || 0) - (a.last_updated || 0)),
			};
		} catch (err) {
			throw createError({ statusCode: 404, statusMessage: String(err) });
		}
	},
	methods: {
		copyURL() {
			navigator.clipboard.writeText(`${location.origin}/user/${this.user.id}`);
			alert("Copied URL to clipboard!");
		},
	},
	computed: {
		displayedUsername() {
			return this.user.username || `Anonymous (${this.user.id})`;
		},
		isReservedAccount() {
			return this.user.id < 1000;
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.user-header {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	gap: 1rem;
}

.user-header-top {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: space-between;
}

.user-header-image {
	filter: drop-shadow($shadow-sheet);
}

.user-header-username:hover {
	text-decoration: underline;
}

@media screen and (max-width: $breakpoint-sm) {
	.user-header {
		flex-flow: column nowrap;
	}
	.user-header-top {
		flex-flow: column nowrap;
		justify-content: center;
	}
	.user-header-username {
		// mobile title size (looks nicer)
		font-size: 2.75rem;
		text-align: center;
	}
}
</style>
