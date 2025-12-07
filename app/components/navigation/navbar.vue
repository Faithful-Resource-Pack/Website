<template>
	<header class="accent-textured">
		<nav class="navbar-container">
			<div class="navbar-mobile-container">
				<nuxt-link class="navbar-mobile-wordmark" to="/" title="Faithful">
					<img src="/image/wordmarks/navbar.png" height="32" alt="Faithful Wordmark" />
				</nuxt-link>

				<button
					class="navbar-toggler"
					type="button"
					:title="isOpen ? 'Close Menu' : 'Open Menu'"
					@click="toggleNavbar"
				>
					<v-icon size="large" icon="mdi-menu" />
				</button>
			</div>

			<!-- use .hide class instead of v-show to override on desktop more easily -->
			<div class="navbar-item-container" :class="{ 'navbar-hidden': !isOpen }">
				<nuxt-link
					v-for="{ name, to, icon } in left"
					:key="name"
					:to
					class="navigation-link navbar-link"
					:target="to.startsWith('http') ? '_blank' : ''"
					:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
					@click="hideNavbar"
				>
					<v-icon size="small" :icon class="mr-2" /> {{ name }}
				</nuxt-link>

				<nuxt-link to="/" title="Faithful">
					<img
						class="navbar-desktop-logo zoom-hitbox zoom-affected"
						src="https://database.faithfulpack.net/images/branding/logos/transparent/hd/main_logo.png?w=128"
						alt="Faithful Logo"
					/>
				</nuxt-link>

				<nuxt-link
					v-for="{ name, to, icon } in right"
					:key="name"
					:to
					class="navigation-link navbar-link"
					:target="to.startsWith('http') ? '_blank' : ''"
					:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
					@click="hideNavbar"
				>
					<v-icon size="small" :icon class="mr-2" /> {{ name }}
				</nuxt-link>
			</div>
		</nav>
	</header>
</template>

<script>
// automatically gets split into two sides
const NAVBAR_ITEMS = [
	{
		name: "Home",
		to: "/",
		icon: "mdi-home",
	},
	{
		name: "Downloads",
		to: "/downloads",
		icon: "mdi-download",
	},
	{
		name: "Add-ons",
		to: "/addons",
		icon: "mdi-plus-thick",
	},
	{
		name: "News",
		to: "/news",
		icon: "mdi-newspaper-variant",
	},
	{
		name: "Web App",
		to: "https://webapp.faithfulpack.net",
		icon: "mdi-account",
	},
	{
		name: "About",
		to: "/about",
		icon: "mdi-help-circle",
	},
];

export default defineNuxtComponent({
	name: "navbar",
	data() {
		// split down middle
		const sideLength = Math.round(NAVBAR_ITEMS.length / 2);
		return {
			isOpen: false,
			left: NAVBAR_ITEMS.slice(0, sideLength),
			right: NAVBAR_ITEMS.slice(sideLength),
		};
	},
	methods: {
		toggleNavbar() {
			this.isOpen = !this.isOpen;
		},
		hideNavbar() {
			this.isOpen = false;
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

// entire header must be sticky (otherwise the text moves without the background)
header {
	position: sticky;
	top: 0;
	z-index: 999;
	box-shadow: $shadow-sheet;
}
// wraps both the items and the mobile navbar if present
.navbar-container {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	padding: 0.5rem 1rem;
}
// wraps the actual item content (becomes columns on mobile)
.navbar-item-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	flex-basis: 100%;
	padding-left: 0;
	margin-bottom: 0;
}
// wraps just the wordmark and toggler
.navbar-mobile-container {
	display: none;
}
// make sure each item in the bar takes up the same length
.navbar-link {
	width: 125px;
}
// they're both the same size (helpful reference)
.navbar-desktop-logo,
.navbar-toggler {
	width: 48px;
	height: 48px;
}

.navbar-toggler {
	line-height: 1;
	background: transparent;
	border: none;
	color: $text-navigation;
}

// mobile styles
@media screen and (max-width: $breakpoint-sm) {
	// set items container to left-aligned columns
	.navbar-item-container {
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 0.5rem;
	}
	// only toggle the display on mobile, on desktop the navbar is always visible
	.navbar-hidden {
		display: none;
	}
	// show wordmark/toggler button on each side
	.navbar-mobile-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.navbar-link {
		justify-content: start;
		width: 100%;
	}
	.navbar-desktop-logo {
		display: none;
	}
}
</style>
