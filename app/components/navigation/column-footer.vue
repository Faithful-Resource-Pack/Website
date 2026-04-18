<template>
	<footer class="accent-textured">
		<div class="container footer-container">
			<div class="footer-column footer-information">
				<nuxt-link to="/">
					<img
						class="footer-wordmark zoom-hitbox zoom-affected"
						src="/image/wordmarks/faithful.png"
						loading="lazy"
						alt="Faithful Wordmark"
					/>
				</nuxt-link>
				<span class="theme-btn navigation-link" @click="$emit('changeTheme')">
					<!-- prevents hydration mismatch (themes are loaded before mount but after ssr) -->
					<client-only>
						<template #fallback>Loading Themes...</template>
						<v-icon :icon="theme.icon" />
						{{ theme.name }}
					</client-only>
				</span>
				<nuxt-link to="mailto:contact@faithfulpack.net">contact@faithfulpack.net</nuxt-link>
				<p class="footer-info-text">&copy; {{ new Date().getFullYear() }} Faithful Resource Pack</p>
			</div>
			<div class="footer-item-container">
				<div v-for="{ title, icon, items } in categories" :key="title" class="footer-column">
					<h3 class="footer-title">
						<v-icon size="x-small" :icon />
						{{ title }}
					</h3>
					<nuxt-link
						v-for="{ name, to } in items"
						:key="name"
						class="navigation-link"
						:to
						:target="to.startsWith('http') ? '_blank' : ''"
						:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
					>
						{{ name }}
					</nuxt-link>
				</div>
			</div>
		</div>
		<small class="footer-info-text">
			NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
		</small>
	</footer>
</template>

<script>
// change this as necessary
const FOOTER_CATEGORIES = [
	{
		title: "Info",
		icon: "mdi-information",
		items: [
			{
				name: "FAQ",
				to: "/faq",
			},
			{
				name: "License",
				to: "/license",
			},
			{
				name: "Privacy Policy",
				to: "/privacy",
			},
			{
				name: "Brand",
				to: "https://docs.faithfulpack.net/pages/manuals/branding-guidelines",
			},
			{
				name: "Status",
				to: "https://status.faithfulpack.net",
			},
		],
	},
	{
		title: "Listings",
		icon: "mdi-post",
		items: [
			{
				name: "CurseForge",
				to: "https://www.curseforge.com/members/faithful_resource_pack/projects",
			},
			{
				name: "Modrinth",
				to: "https://modrinth.com/organization/Faithful-Resource-Pack",
			},
			{
				name: "Planet Minecraft",
				to: "https://www.planetminecraft.com/member/faithful_resource_pack",
			},
			{
				name: "GitHub",
				to: "https://github.com/Faithful-Resource-Pack",
			},
			{
				name: "Classic GitHub",
				to: "https://github.com/ClassicFaithful",
			},
		],
	},
	{
		title: "Community",
		icon: "mdi-chat",
		items: [
			{
				name: "Twitter",
				to: "https://twitter.com/faithfulpack",
			},
			{
				name: "Bluesky",
				to: "https://bsky.app/profile/faithfulpack.net",
			},
			{
				name: "Reddit",
				to: "https://www.reddit.com/r/faithfulpack",
			},
			{
				name: "Discord",
				to: "https://discord.gg/sN9YRQbBv7",
			},
			{
				name: "Classic Discord",
				to: "https://discord.gg/KSEhCVtg4J",
			},
		],
	},
	{
		title: "Resources",
		icon: "mdi-shape",
		items: [
			{
				name: "Texture Gallery",
				to: "https://webapp.faithfulpack.net/gallery",
			},
			{
				name: "Contributing",
				to: "https://docs.faithfulpack.net/pages/manuals/contributor-handbook",
			},
			{
				name: "Translations",
				to: "https://translate.faithfulpack.net",
			},
			{
				name: "Faithful Docs",
				to: "https://docs.faithfulpack.net",
			},
			{
				name: "API Reference",
				to: "https://api.faithfulpack.net/docs",
			},
		],
	},
];

export default defineNuxtComponent({
	// can't be called footer since that's already an element
	name: "column-footer",
	props: {
		theme: {
			type: Object,
			required: true,
		},
	},
	emits: ["changeTheme"],
	data() {
		return {
			categories: FOOTER_CATEGORIES,
		};
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

footer {
	padding: 1rem;
	text-align: center;
}

// container for left column as well as the others for better wrapping
.footer-container {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	gap: 2rem;
	// override container class (we only need the side padding from it)
	padding-bottom: 1rem !important;
	padding-top: 1rem !important;
}

// container for just the link columns
.footer-item-container {
	flex-grow: 1;
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: stretch;
	gap: 2rem;
}

.footer-column {
	max-width: 240px;
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-start;
	flex-grow: 1;
}

.footer-information {
	justify-content: space-between;
}

.theme-btn {
	padding: 1.5rem 0px;
	font-size: 1.5rem;
	// align-self: center;
}

.footer-wordmark {
	padding: 5px;
}

.footer-info-text {
	padding: 0.25rem 0;
	margin: 0;
}

.footer-title {
	// fix for icons being too big
	display: flex;
	align-items: center;
}

.footer-title > i {
	// fix padding
	margin-right: 1rem;
	text-align: center;
}

@media screen and (max-width: $breakpoint-md) {
	// drop link columns below information
	.footer-container {
		flex-flow: column wrap;
		align-items: center;
	}
	// center align text for just the information on the top
	.footer-information {
		align-items: center;
	}
}

@media screen and (max-width: $breakpoint-sm) {
	// two columns of footer information
	.footer-item-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
}

@media screen and (max-width: $breakpoint-xs) {
	// back to flex but now as columns
	.footer-item-container {
		display: flex;
		flex-flow: column wrap;
	}
	// center align text for all columns, not just info
	.footer-column {
		align-items: center;
	}
}
</style>
