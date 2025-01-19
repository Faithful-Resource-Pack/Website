<!-- don't use this as an actual layout, it's a base for the real ones -->
<template>
	<div class="background" :class="themeClass" data-allow-mismatch="class">
		<navbar />
		<main class="foreground">
			<slot v-if="noContainer" />
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
	},
	props: {
		noContainer: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			// must be null at first to force rerender when loaded
			currentTheme: null,
			themeClass: null,
			availableThemes: THEMES,
		};
	},
	methods: {
		cycleTheme() {
			const keys = Object.keys(this.availableThemes);
			const currentIndex = keys.indexOf(this.currentTheme);
			const nextIndex = (currentIndex + 1) % keys.length;
			this.currentTheme = keys[nextIndex];
		},
	},
	beforeMount() {
		// set theme before client render (can't set on server because localStorage doesn't yet exist)
		this.currentTheme = localStorage.getItem(THEME_KEY) || "auto";
	},
	watch: {
		currentTheme: {
			handler(newValue) {
				if (!Object.keys(this.availableThemes).includes(newValue)) return;
				localStorage.setItem(THEME_KEY, newValue);
				const isDark =
					this.currentTheme === "dark" ||
					(this.currentTheme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);

				// must be here otherwise it doesn't update before mount (I hate this too)
				this.themeClass = isDark ? "dark-theme" : "light-theme";
			},
			immediate: true,
		},
	},
});
</script>
