const THEME_VALUES = [
	{
		id: "auto",
		icon: "",
		name: "Auto Theme",
	},
	{
		id: "dark",
		icon: "",
		name: "Dark Theme",
	},
	{
		id: "light",
		icon: "",
		name: "Light Theme",
	},
];

const THEME_DEFAULT_VALUE = THEME_VALUES[0].id;
const THEME_LOCALSTORAGE_KEY = "theme";

globalThis.theme = {
	// get theme id
	get currentTheme() {
		return localStorage.getItem(THEME_LOCALSTORAGE_KEY) || THEME_DEFAULT_VALUE;
	},
	set currentTheme(id) {
		localStorage.setItem(THEME_LOCALSTORAGE_KEY, id);
	},
	get currentThemeIndex() {
		return THEME_VALUES.findIndex((el) => el.id === this.currentTheme);
	},
	get currentThemeHTML() {
		const { icon, name } = THEME_VALUES[this.currentThemeIndex];
		return `<i class="fas">${icon}</i> ${name}`;
	},
	get nextTheme() {
		return THEME_VALUES[(this.currentThemeIndex + 1) % THEME_VALUES.length].id;
	},
	get isDark() {
		return (
			theme.currentTheme === "dark" ||
			(theme.currentTheme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches)
		);
	},
	get isLight() {
		return !this.isDark;
	},
};

const css = document.getElementById("theme");
const btn = document.getElementById("theme-btn");

// update btn
btn.innerHTML = theme.currentThemeHTML;

globalThis.cycleTheme = () => {
	theme.currentTheme = theme.nextTheme;
	btn.innerHTML = theme.currentThemeHTML;
	updateTheme();
};

globalThis.updateTheme = () => {
	css.href = theme.isDark ? "/css/dark.css" : "/css/light.css";
};

updateTheme();
