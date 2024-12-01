document.addEventListener("DOMContentLoaded", () => {
	const app = Vue.createApp({
		data() {
			return {
				allFaqs: [],
				faqs: [],
				search: null,
			};
		},
		template: `
			<h1 class="display-3 my-5 text-center">Frequently Asked Questions</h1>
			<v-text-field
				v-model="search"
				filled
				clear-icon="mdi-close"
				hide-details
				placeholder="Search FAQs"
				clearable
				@keyup="startSearch"
				@click:clear="() => { search = null; startSearch(); }"
			/>
			<p class="pt-2 pb-0 px-0">
				<i>{{ faqs.length }} {{ results }} found</i>
			</p>
			<template v-for="(faq, i) in faqs" :key="i">
				<h2 class="faq-question">{{ faq.question }}</h2>
				<p v-html="compiledMarkdown(faq.answer)" class="faq-answer"></p>
			</template>
		`,
		methods: {
			compiledMarkdown(text) {
				const cleanedText = text
					.replace(/in <#[^]+>/, "on our [Discord](https://discord.gg/sN9YRQbBv7)") // removes channel links
					.replace(/<[^]+>/, "") // removes pings
					.replace("()", ""); // removes stray parentheses left by removing pings)
				return DOMPurify.sanitize(marked.parse(cleanedText));
			},
			startSearch() {
				if (!this.search || this.search.length < 3) {
					this.faqs = this.allFaqs;
					return;
				}

				// partial keyword search
				const faqs = this.allFaqs.filter((faq) =>
					faq.keywords.some((keyword) =>
						keyword.toLowerCase().includes(this.search.toLowerCase()),
					),
				);

				if (faqs.length) {
					this.faqs = faqs;
					return;
				}

				// no results with keywords found, search titles instead
				this.faqs = this.allFaqs.filter((faq) =>
					faq.question.toLowerCase().includes(this.search.toLowerCase()),
				);
			},
		},
		computed: {
			results() {
				return this.faqs.length === 1 ? "result" : "results";
			},
		},
		created() {
			fetch(
				"https://raw.githubusercontent.com/Faithful-Resource-Pack/CompliBot/main/json/faq.json",
			)
				.then((res) => res.json())
				.then((res) => {
					this.allFaqs = res.filter((v) => !v.discord);
					this.startSearch();
				});
		},
	});
	app.use(Vuetify.createVuetify());
	app.mount("#app");
});
