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
				<v-spacer />
				<button class="theme-btn navigation-link" @click="$emit('changeTheme')">
					<!-- prevents hydration mismatch (themes are loaded before mount but after ssr) -->
					<client-only>
						<template #fallback>Loading Themes...</template>
						<v-icon :icon="theme.icon" />
						{{ theme.name }}
					</client-only>
				</button>
				<v-spacer />
				<nuxt-link to="mailto:contact@faithfulpack.net">contact@faithfulpack.net</nuxt-link>
				<p class="footer-info-text">&copy; {{ new Date().getFullYear() }} Faithful Resource Pack</p>
			</div>
			<div class="footer-item-container">
				<div v-for="{ title, items } in categories" :key="title" class="footer-column">
					<h3 class="mb-1 mr-2">
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
	// stretch info row to fit size of others
	align-items: stretch;
	justify-content: space-between;
	gap: 4rem;
	// override container class (we only need the side padding from it)
	padding-bottom: 1rem !important;
	padding-top: 1rem !important;
	text-align: left;
}

// container for just the link columns
.footer-item-container {
	flex-grow: 1;
	display: flex;
	flex-flow: row nowrap;
	align-items: start;
	justify-content: space-between;
	gap: 2rem;
}

.footer-column {
	display: flex;
	flex-flow: column nowrap;
	align-items: start;
	justify-content: start;
	gap: 0.25rem;
}

.footer-information {
	justify-content: space-between;
}

.theme-btn {
	// need some margin for when spacers get removed on mobile
	margin-top: 1rem;
	margin-bottom: 0.5rem;
	font-size: 1.5rem;
}

.footer-info-text {
	margin: 0;
}

@media screen and (max-width: $breakpoint-md) {
	.footer-container {
		// remove stretch from info columns
		align-items: start;
		gap: 3rem;
	}
	// two footer columns on side
	.footer-item-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}
}

@media screen and (max-width: $breakpoint-xs) {
	// center info/link areas as rows, keep two columns for links
	.footer-container {
		flex-flow: column nowrap;
		align-items: center;
		gap: 2rem;
	}
	// since info is now on a line of its own center align looks better
	.footer-information {
		align-items: center;
	}
}
</style>
