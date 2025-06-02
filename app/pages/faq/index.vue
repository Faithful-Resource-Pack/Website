<template>
	<h1 class="title my-5 text-center">Frequently Asked Questions</h1>
	<v-text-field
		v-model="search"
		class="pb-3"
		filled
		clear-icon="mdi-close"
		hide-details
		placeholder="Search FAQs"
		clearable
		@click:clear="search = null"
	/>
	<h2 v-if="error || !allFaqs.length" class="text-center">
		{{ error ? `Error: ${error}` : "No FAQs found" }}
	</h2>
	<template v-else>
		<p class="pa-0">
			<i>{{ faqs.length }} {{ results }} found</i>
		</p>
		<div v-for="{ question, answer } in faqs" :key="question" class="my-6">
			<h2>{{ question }}</h2>
			<!-- eslint-disable-next-line vue/no-v-html -->
			<div class="ml-5" v-html="discordMarkdown(answer)" />
			<hr />
		</div>
	</template>
</template>

<script>
export default defineNuxtComponent({
	data() {
		return {
			search: null,
		};
	},
	// for some reason <script setup> doesn't work with asyncData (???)
	setup() {
		definePageMeta({
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
		// wraps compileMarkdown to handle some discord markdown weirdness
		discordMarkdown(text) {
			const cleanedText = text
				.replace(/in <#[^]+>/, "on our [Discord](https://discord.gg/sN9YRQbBv7)") // removes channel links
				.replace(/<[^]+>/, "") // removes pings
				.replace("()", ""); // removes stray parentheses left by removing pings
			return compileMarkdown(cleanedText);
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
	},
});
</script>
