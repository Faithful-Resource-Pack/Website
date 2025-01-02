<template>
	<header>
		<nav class="navbar-wrapper">
			<a class="nav-mobile-wordmark" href="/" title="Faithful">
				<img
					src="/image/wordmarks/navbar.png"
					style="height: 32px"
					alt="Faithful Wordmark"
					loading="lazy"
				/>
			</a>

			<button class="navbar-toggler" type="button" @click="isOpen = !isOpen" aria-label="Menu">
				<v-icon size="large" icon="mdi-menu" />
			</button>

			<ul class="navbar-container" :class="{ show: isOpen }">
				<li class="nav-item" v-for="item in left" :key="item.name">
					<navbar-link v-bind="item" />
				</li>

				<li>
					<a href="/" title="Faithful">
						<img
							class="navbar-logo-img"
							src="https://database.faithfulpack.net/images/branding/logos/transparent/hd/main_logo.png?w=128"
							alt="Faithful Logo"
							loading="lazy"
						/>
					</a>
				</li>

				<li class="nav-item" v-for="item in right" :key="item.name">
					<navbar-link v-bind="item" />
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
export default {
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
					to: "addons",
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
};
</script>

<style lang="scss">
@use "~/assets/css/components/navbar.scss" as *;
</style>
