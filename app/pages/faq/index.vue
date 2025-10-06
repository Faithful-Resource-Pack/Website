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
					clearable
					hide-details
					placeholder="Search FAQs"
					@update:menu="goToFaq"
				/>
				<br />
			</div>
		</template>
	</hero-section>
	<div class="container">
		<div class="card-row" style="padding-bottom: 50px">
			<nuxt-link
				v-for="{ icon, title, to, color } in categories"
				:key="title"
				class="card card-body faq-card zoom-hitbox zoom-affected"
				:class="`${color}-background`"
				:to
			>
				<v-icon :icon class="faq-card-text faq-icon colored-title" />
				<h2 class="text-center faq-card-text colored-title">
					<chevron-link>{{ title }}</chevron-link>
				</h2>
			</nuxt-link>
		</div>
		<discord-button>Still have questions? Ask us on our Discord!</discord-button>
	</div>
</template>

<script>
import DiscordButton from "~/components/lib/discord-button.vue";
import ChevronLink from "~/components/lib/chevron-link.vue";
import HeroSection from "~/components/lib/hero-section.vue";

export default defineNuxtComponent({
	components: {
		HeroSection,
		DiscordButton,
		ChevronLink,
	},
	data() {
		return {
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
	// for some reason <script setup> doesn't work with asyncData (???)
	setup() {
		definePageMeta({
			layout: "no-container",
			name: "FAQ",
		});
	},
	async asyncData() {
		try {
			const allFaqs = await $fetch(
				"https://raw.githubusercontent.com/Faithful-Resource-Pack/CompliBot/main/json/faq.json",
			);
			return {
				allFaqs: JSON.parse(allFaqs).filter((faq) => !faq.discord),
				error: null,
			};
		} catch (error) {
			return {
				allFaqs: [],
				error,
			};
		}
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
@use "~/assets/css/lib/variables" as *;

.card-row {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 3rem;
}

.faq-card {
	min-width: 250px;
	min-height: 350px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-grow: 0;
	gap: 1rem;
}

.faq-card-text {
	opacity: 1;
	color: white;
	text-shadow: $shadow-sheet;
}

.faq-card:hover {
	filter: drop-shadow($shadow-sheet);
}

.faq-icon {
	font-size: 10rem;
	* {
		opacity: 1 !important;
		color: white !important;
	}
}
</style>
