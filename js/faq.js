document.addEventListener("DOMContentLoaded", () => {
  const v = new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data() {
      return {
        allFaqs: [],
        faqs: [],
        search: null,
      };
    },
    template: `
      <div>
        <h1 class="display-3 my-5 text-center">Frequently Asked Questions</h1>
        <v-text-field
          v-model="search"
          filled
          clear-icon="mdi-close"
          hide-details
          :dark="isDarkMode"
          :light="!isDarkMode"
          placeholder="Search FAQs"
          clearable
          @keyup="startSearch"
          @click:clear="() => { search=null }"
        />
        <template v-if="faqs.length">
          <template v-for="(faq, i) in filteredFaqs" :key="i">
            <h2 class="faq-question" v-text="faq.question"></h2>
            <p v-html="parseMd(faq.answer)" class="faq-answer"></p>
          </template>
        </template>
        <i v-else class="faq-answer py-5">No results found</i>
      </div>
    `,
    methods: {
      parseMd(text) {
        return marked.parse(
          text
            .replace(/in <#[^]+>/, "on our [Discord](https://discord.gg/sN9YRQbBv7)") // removes channel links
            .replace(/<[^]+>/, "") // removes pings
            .replace("()", ""), // removes stray parentheses left by removing pings)
        );
      },
      startSearch() {
        if (!this.search || this.search.length < 3) {
          this.faqs = this.allFaqs;
          return;
        }
        // partial searches count
        this.faqs = this.allFaqs.filter((faq) =>
          faq.question.toLowerCase().includes(this.search.toLowerCase()),
        );
      },
    },
    computed: {
      filteredFaqs() {
        return this.faqs.filter((v) => !v.discord);
      },
      isDarkMode() {
        return (
          theme.currentTheme === "dark" ||
          (theme.currentTheme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches)
        );
      },
    },
    created() {
      axios
        .get(
          "https://raw.githubusercontent.com/Faithful-Resource-Pack/CompliBot/main/json/faq.json",
        )
        .then((res) => {
          this.allFaqs = res.data;
          this.startSearch();
        });
    },
  });
});
