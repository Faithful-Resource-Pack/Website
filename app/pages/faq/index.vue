<script setup>
definePageMeta({
	layout: "no-container",
	name: "FAQ",
});
</script>

<template>
	<hero-section background="/image/banners/faq.jpg" upspace="100px">
		<template #title>Frequently Asked Questions</template>
		<template #actions>
			<div style="height: 100px" />
			<div class="container py-0">
				<v-autocomplete
					v-model="search"
					:items="faqs.map((faq) => faq.question)"
					variant="solo"
					clear-icon="mdi-close"
					:autofocus="!$vuetify.display.mobile"
					clearable
					hide-details
					prepend-inner-icon="mdi-magnify"
					placeholder="Search FAQs"
					@update:menu="goToFaq"
				/>
				<br />
			</div>
		</template>
	</hero-section>
	<div class="container">
		<div class="card-row">
			<nuxt-link
				v-for="{ icon, title, to, color } in categories"
				:key="title"
				class="card card-body faq-card zoom-hitbox zoom-affected"
				:class="`${color}-background`"
				:to
			>
				<v-icon :icon size="160px" class="colored-title mb-2" />
				<h2 class="colored-title">
					{{ title }}
				</h2>
			</nuxt-link>
		</div>
		<br />
		<discord-button>Still have questions? Ask us on our Discord!</discord-button>
	</div>
</template>

<script>
import HeroSection from "~/components/lib/hero-section.vue";
import DiscordButton from "~/components/lib/discord-button.vue";

import allFaqs from "../../../public/faq.json";

export default defineNuxtComponent({
	components: {
		HeroSection,
		DiscordButton,
	},
	data() {
		return {
			allFaqs: allFaqs.filter((faq) => !faq.discord),
			search: null,
			icons: {
				history: "mdi-book-open-blank-variant",
				installation: "mdi-download",
				packs: "mdi-package-variant-closed",
				issues: "mdi-alert-circle-outline",
				creating: "mdi-palette-outline",
			},
			colors: {
				history: "pink",
				installation: "blue",
				packs: "green",
				issues: "orange",
				creating: "yellow",
			},
		};
	},
	methods: {
		goToFaq() {
			const item = this.faqs.find((faq) => faq.question === this.search);
			if (item) {
				this.$router.push({
					path: `/faq/${item.categories[0]}`,
					hash: `#${item.question}`,
				});
			}
		},
	},
	computed: {
		results() {
			return this.faqs.length === 1 ? "result" : "results";
		},
		faqs() {
			if (!this.search || this.search.length < 3) return this.allFaqs;

			// partial keyword search
			const foundFaqs = this.allFaqs.filter((faq) =>
				faq.keywords.some((keyword) => keyword.toLowerCase().includes(this.search.toLowerCase())),
			);

			if (foundFaqs.length) return foundFaqs;

			// no results with keywords found, search titles instead
			return this.allFaqs.filter((faq) =>
				faq.question.toLowerCase().includes(this.search.toLowerCase()),
			);
		},
		categories() {
			return Array.from(new Set(this.allFaqs.flatMap((f) => f.categories))).map((category) => ({
				title: toTitleCase(category),
				icon: this.icons[category] || "mdi-help-circle-outline",
				color: this.colors[category] || "green",
				to: `/faq/${category}`,
			}));
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/variables" as *;

.faq-icon {
	font-size: 10rem;
}

.card-row {
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;
	gap: 1.5rem;
}

.faq-card {
	height: 300px;
	justify-content: center;
	align-items: center;
}

// really stupid hack to make sure there's never just one wrapped to the bottom
@media screen and (max-width: $breakpoint-lg) {
	.faq-card {
		min-width: 250px;
	}
}
@media screen and (max-width: $breakpoint-md) {
	.faq-card {
		min-width: auto;
	}
}
</style>
