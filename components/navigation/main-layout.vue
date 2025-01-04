<template>
	<div class="background" :class="themeClass" data-allow-mismatch="class">
		<navbar />
		<main class="foreground">
			<slot v-if="noContainer" />
			<div v-else class="container">
				<slot />
			</div>
		</main>
		<column-footer :theme="availableThemes[currentTheme]" @changeTheme="cycleTheme" />
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

export default {
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
			currentTheme: "auto",
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
	beforeCreate() {
		if (import.meta.server) return;
		// set theme before client render
		this.currentTheme = localStorage.getItem(THEME_KEY) || "auto";
	},
	watch: {
		currentTheme(newValue) {
			if (!Object.keys(this.availableThemes).includes(newValue)) return;
			localStorage.setItem(THEME_KEY, newValue);
		},
	},
	computed: {
		themeClass() {
			if (import.meta.server) return "light-theme";
			const isDark =
				this.currentTheme === "dark" ||
				(this.currentTheme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
			return isDark ? "dark-theme" : "light-theme";
		},
	},
};
</script>
