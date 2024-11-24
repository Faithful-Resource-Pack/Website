const css = document.getElementById("theme");
const btn = document.getElementById("ThemeBtn");

const THEME_VALUES = [
	{
		value: "auto",
		html: '<i style="margin-right: 5px" class="fas"></i> Auto Theme',
	},
	{
		value: "dark",
		html: '<i style="margin-right: 5px" class="fas"></i> Dark Theme',
	},
	{
		value: "light",
		html: '<i style="margin-right: 5px" class="fas"></i> Light Theme',
	},
];

const THEME_DEFAULT_VALUE = THEME_VALUES[0].value;
const THEME_LOCALSTORAGE_KEY = "theme";

globalThis.theme = {
	get currentTheme() {
		return localStorage.getItem(THEME_LOCALSTORAGE_KEY) || THEME_DEFAULT_VALUE;
	},
	set currentTheme(value) {
		localStorage.setItem(THEME_LOCALSTORAGE_KEY, value);
	},

	get currentThemeIndex() {
		return THEME_VALUES.findIndex((el) => el.value === this.currentTheme);
	},
	set currentThemeIndex(_v) {},

	get currentThemeHTML() {
		return THEME_VALUES[this.currentThemeIndex].html;
	},
	set currentThemeHTML(_v) {},

	get nextTheme() {
		return THEME_VALUES[(this.currentThemeIndex + 1) % THEME_VALUES.length].value;
	},
	set nextTheme(_v) {},

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
