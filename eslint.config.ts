import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
	{
		rules: {
			"vue/html-self-closing": "off",
			// site uses kebab-case for everything
			"vue/component-definition-name-casing": "off",
			"vue/order-in-components": "off",
			// no longer an issue since vue 3
			"vue/no-multiple-template-root": "off",
			"vue/v-on-event-hyphenation": "off",
		},
	},
	{
		// only disable import checking for vue files
		// (messes with options api)
		files: ["**/*.vue"],
		rules: {
			"import/first": "off",
		},
	},
);
