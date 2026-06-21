<!-- don't use this as an actual layout, it's a base for the real ones -->
<template>
	<div class="site-container" :class="themeClass" data-allow-mismatch="class">
		<navbar @search="toggleSearchModal" />
		<!-- grow the content to fill remaining space (footer and navbar always stay the same size) -->
		<main class="textured flex-grow-1">
			<search-modal v-if="$vuetify.display.mdAndUp" v-model="searchModalOpen" />
			<mobile-search v-else v-model="searchModalOpen" />
			<!-- technically we could declare a container inside every component but that sucks -->
			<slot v-if="layout === 'no-container'" />
			<div v-else-if="layout === 'text-container'" class="container text-container">
				<slot />
			</div>
			<div v-else class="container">
				<slot />
			</div>
		</main>
		<column-footer :theme="availableThemes[currentTheme || 'auto']" @changeTheme="cycleTheme" />
	</div>
</template>

<script>
import Navbar from "~/components/navigation/navbar.vue";
import ColumnFooter from "~/components/navigation/column-footer.vue";
import SearchModal from "~/components/search/search-modal.vue";
import MobileSearch from "~/components/search/mobile-search.vue";

const THEME_KEY = "theme";
const THEMES = {
	auto: {
		icon: "mdi-theme-light-dark",
		name: "Auto Theme",
	},
	dark: {
		icon: "mdi-weather-night",
		name: "Dark Theme",
	},
	light: {
		icon: "mdi-white-balance-sunny",
		name: "Light Theme",
	},
};

export default defineNuxtComponent({
	name: "main-layout",
	components: {
		Navbar,
		ColumnFooter,
		SearchModal,
		MobileSearch,
	},
	props: {
		layout: {
			type: String,
			required: false,
			default: "default",
		},
		overrideTheme: {
			type: String,
			required: false,
			default: undefined,
		},
	},
	provide() {
		return {
			theme: computed(() => this.themeClass?.replace("-theme", "")),
			isDark: computed(() => this.isDark),
		};
	},
	data() {
		return {
			searchModalOpen: false,
			searchListener: () => {},
			// must be null at first to force rerender when loaded
			currentTheme: null,
			isDark: null,
			availableThemes: THEMES,
		};
	},
	methods: {
		toggleSearchModal() {
			this.searchModalOpen = !this.searchModalOpen;
		},
		cycleTheme() {
			const keys = Object.keys(this.availableThemes);
			const currentIndex = keys.indexOf(this.currentTheme);
			const nextIndex = (currentIndex + 1) % keys.length;
			this.currentTheme = keys[nextIndex];
		},
	},
	computed: {
		themeClass() {
			if (this.overrideTheme) return `${this.overrideTheme}-theme`;
			// null falls back to light theme which is more "neutral"
			return this.isDark ? "dark-theme" : "light-theme";
		},
	},
	beforeMount() {
		// set theme before client render (can't set on server because localStorage doesn't yet exist)
		this.currentTheme = localStorage.getItem(THEME_KEY) || "auto";

		this.searchListener = (event) => {
			if (event.key !== "k") return;
			// mac uses cmd+option+arrow
			const isModified = navigator.platform.toLowerCase().includes("mac")
				? event.metaKey
				: event.ctrlKey;

			if (!isModified) return;
			event.preventDefault();

			this.toggleSearchModal();
		};

		window.addEventListener("keydown", this.searchListener);
	},
	unmounted() {
		window.removeEventListener("keydown", this.searchListener);
	},
	watch: {
		currentTheme: {
			handler(newValue) {
				if (!Object.keys(this.availableThemes).includes(newValue)) return;
				if (!this.overrideTheme) localStorage.setItem(THEME_KEY, newValue);
				this.isDark =
					this.currentTheme === "dark" ||
					(this.currentTheme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
			},
			immediate: true,
		},
	},
});
</script>

<style scoped lang="scss">
// hack to force the site to take up the entire screen
.site-container {
	display: flex;
	min-height: 100vh;
	flex-flow: column nowrap;
	justify-content: space-between;
}
</style>
