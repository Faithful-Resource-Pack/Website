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

			<ul class="navbar-container" :class="{ show: isOpen }">
				<li class="nav-item" v-for="{ name, to, icon } in left" :key="name">
					<nuxt-link
						:to
						class="nav-link"
						:target="to.startsWith('http') ? '_blank' : ''"
						:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
					>
						<v-icon size="small" :icon class="mr-2" /> {{ name }}
					</nuxt-link>
				</li>

				<li>
					<nuxt-link to="/" title="Faithful">
						<img
							class="navbar-logo-img"
							src="https://database.faithfulpack.net/images/branding/logos/transparent/hd/main_logo.png?w=128"
							alt="Faithful Logo"
							loading="lazy"
						/>
					</nuxt-link>
				</li>

				<li class="nav-item" v-for="{ name, to, icon } in right" :key="name">
					<nuxt-link
						:to
						class="nav-link"
						:target="to.startsWith('http') ? '_blank' : ''"
						:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
					>
						<v-icon size="small" :icon class="mr-2" /> {{ name }}
					</nuxt-link>
				</li>
			</ul>
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
@use "~/assets/css/components/navbar.scss" as *;
</style>
