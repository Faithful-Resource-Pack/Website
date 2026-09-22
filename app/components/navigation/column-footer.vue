<template>
	<footer class="accent-textured dark-theme">
		<div class="container text-container footer-container">
			<div class="footer-column footer-information">
				<nuxt-link to="/">
					<img
						class="footer-wordmark zoom-hitbox zoom-affected"
						src="/image/wordmarks/faithful.png"
						loading="lazy"
						alt="Faithful Wordmark"
						width="240"
					/>
				</nuxt-link>
				<span class="theme-btn navigation-link" @click="$emit('changeTheme')">
					<!-- prevents hydration mismatch (themes are loaded before mount but after ssr) -->
					<client-only>
						<template #fallback>Loading Themes...</template>
						<v-icon :icon="theme.icon" />
						{{ theme.name }}
					</client-only>
				</span>
				<v-spacer v-if="$vuetify.display.mdAndUp" />
				<nuxt-link to="mailto:contact@faithfulpack.net">contact@faithfulpack.net</nuxt-link>
				<p class="footer-info-text">&copy; {{ new Date().getFullYear() }} Faithful Resource Pack</p>
			</div>
			<div class="footer-item-container">
				<div v-for="{ title, items } in categories" :key="title" class="footer-column">
					<h3 class="footer-title mb-1 mr-2">
						{{ title }}
					</h3>
					<nuxt-link
						v-for="{ name, to } in items"
						:key="name"
						class="navigation-link"
						:to
						:target="to.startsWith('http') ? '_blank' : ''"
						:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
					>
						{{ name }}
					</nuxt-link>
				</div>
			</div>
		</div>
		<small class="footer-info-text">
			NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
		</small>
	</footer>
</template>

<script>
import categories from "../../../public/data/footer.json";

export default defineNuxtComponent({
	// can't be called footer since that's already an element
	name: "column-footer",
	props: {
		theme: {
			type: Object,
			required: true,
		},
	},
	emits: ["changeTheme"],
	data() {
		return { categories };
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

footer {
	padding: $padding-container;
	text-align: center;
}

// container for left column as well as the others for better wrapping
.footer-container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	gap: 4rem;
	// override container class (we only need the side padding from it)
	padding-bottom: 1rem !important;
	padding-top: 1rem !important;
}

// container for just the link columns
.footer-item-container {
	flex-grow: 1;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: stretch;
	gap: 2rem;
}

.footer-column {
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-start;
	gap: 0.25rem;
}

.footer-information {
	justify-content: space-between;
}

.theme-btn {
	margin-top: 1rem;

	// useful for wrapping later (spacer below)
	margin-bottom: 0.5rem;
	font-size: 1.5rem;
	// align-self: center;
}

.footer-info-text {
	margin: 0;
}

.footer-title {
	display: flex;
	align-items: center;
}

.footer-title > i {
	// fix padding
	margin-right: 0.75rem;
	text-align: center;
}

@media screen and (max-width: $breakpoint-md) {
	// drop link columns below information
	.footer-container {
		align-items: start;
		gap: 3rem;
	}
	// two columns of footer information
	.footer-item-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
}

@media screen and (max-width: $breakpoint-xs) {
	.footer-container {
		flex-flow: column nowrap;
		align-items: center;
		gap: 2rem;
	}
	.footer-information {
		align-items: center;
	}
}
</style>
