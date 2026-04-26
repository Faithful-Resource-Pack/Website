<script setup>
definePageMeta({
	disableDefaultMeta: true,
});
const { category } = useRoute().params;
useSeoMeta(generateMetaTags({ title: `FAQ: ${toTitleCase(category)}` }));
</script>

<template>
	<h1 class="title text-center my-5">FAQ: {{ toTitleCase(category) }}</h1>
	<v-expansion-panels v-model="search" variant="accordion" :theme>
		<v-expansion-panel v-for="({ question, answer }, i) in faqs" :key="question" :value="question">
			<template #title>
				<h4 :ref="`faq-${i}`" class="my-0">{{ question }}</h4>
			</template>
			<template #text>
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div class="body-text" v-html="discordMarkdown(answer)" />
			</template>
		</v-expansion-panel>
	</v-expansion-panels>
	<hr />
	<nuxt-link class="btn block btn-lg btn-secondary" href="/faq">
		Return to Main FAQ Page
	</nuxt-link>
</template>

<script>
import allFaqs from "../../../public/faq.json";

export default defineNuxtComponent({
	inject: ["theme"],
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
				/in <#\d+>/g,
				"on our [Discord](https://discord.gg/sN9YRQbBv7)",
			);
			return compileMarkdown(cleanedText, { breaks: true });
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
		category() {
			return this.$route.params.category;
		},
		faqs() {
			return allFaqs.filter((faq) => !faq.discord && faq.categories.includes(this.category));
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
