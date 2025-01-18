<template>
	<header>
		<nav class="navbar-wrapper">
			<nuxt-link class="nav-mobile-wordmark" to="/" title="Faithful">
				<img
					src="/image/wordmarks/navbar.png"
					style="height: 32px"
					alt="Faithful Wordmark"
					loading="lazy"
				/>
			</nuxt-link>

			<button class="navbar-toggler" type="button" @click="isOpen = !isOpen" aria-label="Menu">
				<v-icon size="large" icon="mdi-menu" />
			</button>

			<div class="navbar-container" :class="{ show: isOpen }">
				<nuxt-link
					v-for="{ name, to, icon } in left"
					:key="name"
					:to
					class="navigation-link navbar-link"
					:target="to.startsWith('http') ? '_blank' : ''"
					:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
				>
					<v-icon size="small" :icon class="mr-2" /> {{ name }}
				</nuxt-link>

				<nuxt-link to="/" title="Faithful">
					<img
						class="navbar-logo-img"
						src="https://database.faithfulpack.net/images/branding/logos/transparent/hd/main_logo.png?w=128"
						alt="Faithful Logo"
						loading="lazy"
					/>
				</nuxt-link>

				<nuxt-link
					v-for="{ name, to, icon } in right"
					:key="name"
					:to
					class="navigation-link navbar-link"
					:target="to.startsWith('http') ? '_blank' : ''"
					:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
				>
					<v-icon size="small" :icon class="mr-2" /> {{ name }}
				</nuxt-link>
			</div>
		</nav>
	</header>
</template>

<script>
export default defineNuxtComponent({
	name: "navbar",
	data() {
		return {
			isOpen: false,
			left: [
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
					icon: "mdi-plus",
				},
			],
			right: [
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
			],
		};
	},
});
</script>

<style scoped lang="scss">
// entire header must be sticky (otherwise the text moves without the background)
header {
	position: sticky;
	top: 0;
	z-index: 999;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 1);
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
	list-style: none;
}
// make sure each item in the bar takes up the same length
.navbar-link {
	width: 125px;
}
.navbar-logo-img {
	width: 48px;
	height: 48px;
	// pixelated looks really bad on smallish screens, I tried it
	image-rendering: crisp-edges;
	transition: all 0.5s;
	&:hover {
		transform: scale(1.1);
	}
}
.navbar-toggler {
	padding: 0.5rem 1rem;
	line-height: 1;
	background-color: transparent;
	border: none;
	color: rgba(255, 255, 255, 0.5);
}
.navbar-toggler-icon {
	vertical-align: middle;
	font-size: 24px;
	// prevents vuetify retheming it randomly (???)
	color: rgba(255, 255, 255, 0.5);
}

// don't display on desktop layout
.nav-mobile-wordmark,
.navbar-toggler {
	display: none;
}

// mobile styles
@media screen and (max-width: 760px) {
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
		// handle toggle class
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
	.nav-mobile-wordmark,
	.navbar-toggler {
		display: block;
	}
}
</style>
