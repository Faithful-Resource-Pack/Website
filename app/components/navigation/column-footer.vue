<template>
	<footer class="background">
		<div class="container footer-wrapper">
			<div class="footer-column footer-main">
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
			<div class="footer-container">
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
				name: "License",
				to: "/license",
			},
			{
				name: "Privacy Policy",
				to: "/privacy",
			},
			{
				name: "Statistics",
				to: "/stats",
			},
			{
				name: "Translate",
				to: "https://translate.faithfulpack.net",
			},
			{
				name: "Branding",
				to: "https://docs.faithfulpack.net/pages/manuals/branding-guidelines",
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
				name: "MCPEDL",
				to: "https://mcpedl.com/user/faithful-resource-pack",
			},
			{
				name: "GitHub",
				to: "https://github.com/Faithful-Resource-Pack",
			},
		],
	},
	{
		title: "Media",
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
				name: "CF Discord",
				to: "https://discord.gg/KSEhCVtg4J",
			},
		],
	},
	{
		title: "Resources",
		icon: "mdi-shape",
		items: [
			{
				name: "FAQ",
				to: "/faq",
			},
			{
				name: "Docs",
				to: "https://docs.faithfulpack.net",
			},
			{
				name: "Status",
				to: "https://status.faithfulpack.net",
			},
			{
				name: "Gallery",
				to: "/gallery",
			},
			{
				name: "Contributing",
				to: "https://docs.faithfulpack.net/pages/manuals/contributor-handbook",
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
@use "~/assets/css/lib/variables" as *;

footer {
	padding: 1rem;
	text-align: center;
}

// container for left column and the others for better wrapping
.footer-wrapper {
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	gap: 2rem;
	// override container class (we only need the side padding from it)
	padding-bottom: 1rem !important;
	padding-top: 1rem !important;
}

// container for each column of links
.footer-container {
	flex-grow: 1;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: stretch;
	gap: 2rem;
}

.footer-column {
	max-width: 240px;
	display: flex;
	flex-flow: column nowrap;
	flex-grow: 1;
	align-items: flex-start;
	list-style: none;
}

.footer-main {
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
	color: $text-navigation;
	padding: 0.25rem 0;
	margin: 0;
}

.footer-title {
	color: $text-card;
	// fix for icons being too big
	display: flex;
	align-items: center;
}

.footer-title > i {
	// fix padding
	margin-right: 1rem;
	text-align: center;
}

@media screen and (max-width: 576px) {
	// set everything to centered columns on mobile
	.footer-wrapper,
	.footer-container {
		flex-flow: column wrap;
		align-items: center;
	}

	.footer-column {
		align-items: center;
	}
}
</style>
