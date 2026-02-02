<template>
	<h1 class="title text-center my-5">FAQ: {{ toTitleCase(category) }}</h1>
	<h2 v-if="error || !faqs.length" class="text-center">
		{{ error ? `Error: ${error}` : "No FAQs found" }}
	</h2>
	<template v-else>
		<v-expansion-panels v-model="search" variant="accordion">
			<v-expansion-panel
				v-for="({ question, answer }, i) in faqs"
				:key="question"
				:value="question"
			>
				<template #title>
					<h5 :ref="`faq-${i}`" class="my-0">{{ question }}</h5>
				</template>
				<template #text>
					<!-- eslint-disable-next-line vue/no-v-html -->
					<div class="faq-answer" v-html="discordMarkdown(answer)" />
				</template>
			</v-expansion-panel>
		</v-expansion-panels>
	</template>
	<hr />
	<nuxt-link class="btn block btn-lg btn-secondary" href="/faq">
		Return to Main FAQ Page
	</nuxt-link>
</template>

<script>
export default defineNuxtComponent({
	setup() {
		definePageMeta({
			disableDefaultMeta: true,
		});
	},
	async asyncData() {
		const { category } = useRoute().params;
		useSeoMeta(generateMetaTags({ title: `FAQ: ${toTitleCase(category)}` }));

		try {
			const allFaqs = await $fetch(
				"https://raw.githubusercontent.com/Faithful-Resource-Pack/CompliBot/main/json/faq.json",
			);

			return {
				faqs: JSON.parse(allFaqs).filter(
					(faq) => !faq.discord && faq.categories.includes(category),
				),
				category,
				error: null,
			};
		} catch (error) {
			return {
				faqs: [],
				category,
				error,
			};
		}
	},
	data() {
		return {
			search: "",
		};
	},
	methods: {
		// wraps compileMarkdown to handle some discord markdown weirdness
		discordMarkdown(text) {
			// removes channel links
			const cleanedText = text.replace(
				/in <#\d+>/,
				"on our [Discord](https://discord.gg/sN9YRQbBv7)",
			);
			return compileMarkdown(cleanedText);
		},
		scrollToFaq(faq) {
			const index = this.faqs.findIndex((f) => f.question === faq);
			if (index !== -1) {
				this.$refs[`faq-${index}`][0].scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		},
	},
	computed: {
		hashedSearch() {
			return this.search ? `#${this.search}` : undefined;
		},
		unhashedUrl() {
			const { hash } = this.$route;
			return hash ? hash.slice(1) : undefined;
		},
	},
	watch: {
		search: {
			handler(value) {
				// use replace so the back button works properly
				if (this.unhashedUrl !== value) this.$router.replace({ hash: this.hashedSearch });
			},
		},
	},
	mounted() {
		if (this.$route.hash) this.search = this.unhashedUrl;

		// for some reason adding a delay fixes everything
		setTimeout(() => this.scrollToFaq(this.search), 10);
	},
});
</script>

<style scoped lang="scss">
.faq-answer {
	opacity: 0.75;
}
</style>
