<template>
	<header class="accent-textured">
		<nav class="navbar-wrapper">
			<nuxt-link class="navbar-mobile-wordmark" to="/" title="Faithful">
				<img src="/image/wordmarks/navbar.png" height="32" alt="Faithful Wordmark" />
			</nuxt-link>

			<button
				class="navbar-toggler"
				type="button"
				:title="isOpen ? 'Close Menu' : 'Open Menu'"
				@click="isOpen = !isOpen"
			>
				<v-icon size="large" icon="mdi-menu" />
			</button>

			<!-- use a css class so that we can ignore it on desktop (always visible) -->
			<div class="navbar-container" :class="{ show: isOpen }">
				<nuxt-link
					v-for="{ name, to, icon } in left"
					:key="name"
					:to
					class="navigation-link navbar-link"
					:target="to.startsWith('http') ? '_blank' : ''"
					:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
					@click="isOpen = false"
				>
					<v-icon size="small" :icon class="mr-2" /> {{ name }}
				</nuxt-link>

				<nuxt-link to="/" title="Faithful">
					<img
						class="navbar-logo-img zoom-hitbox zoom-affected"
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
					@click="isOpen = false"
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
// wraps both the mobile dropdown bar and the regular navbar
.navbar-wrapper {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
}
// just the items bit
.navbar-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	flex-basis: 100%;
	padding-left: 0;
	margin-bottom: 0;
}
// make sure each item in the bar takes up the same length
.navbar-link {
	width: 125px;
}
.navbar-logo-img {
	width: 48px;
	height: 48px;
}
.navbar-toggler {
	padding: 0.5rem 1rem;
	line-height: 1;
	background: transparent;
	border: none;
	color: $text-navigation;
}
.navbar-toggler-icon {
	vertical-align: middle;
	font-size: 24px;
	// prevents vuetify retheming it randomly (???)
	color: $text-navigation;
}

// don't display on desktop layout
.navbar-mobile-wordmark,
.navbar-toggler {
	display: none;
}

// mobile styles
@media screen and (max-width: $breakpoint-sm) {
	// set wrapper to show wordmark/toggler button on each side
	.navbar-wrapper {
		padding: 0.5rem 1rem;
		justify-content: space-between;
	}
	// set items container to left-aligned columns
	.navbar-container {
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 0.5rem;
		// only toggle the display on mobile, on desktop the navbar is always visible
		&:not(.show) {
			display: none;
		}
	}
	.navbar-link {
		justify-content: start;
		width: 100%;
	}
	.navbar-logo-img {
		display: none;
	}
	// show toggler and wordmark
	.navbar-mobile-wordmark,
	.navbar-toggler {
		display: block;
	}
}
</style>
