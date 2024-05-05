document.addEventListener("DOMContentLoaded", () => {
  const v = new Vue({
    el: "#app",
    data() {
      return {
        faqs: [],
      }
    },
    template: `
      <div>
        <h1 class="display-3 my-5 text-center">Frequently Asked Questions</h1>
        <template v-for="(faq, i) in faqs" :key="i">
          <template v-if="!faq.discord">
            <h2 class="faq-question">{{ faq.question }}</h2>
            <p v-html="parseMd(faq.answer)" class="faq-answer"></p>
          </template>
        </template>
      </div>
    `,
    methods: {
      parseMd(text) {
        return marked.parse(
          text
            .replace(/in <#[^]+>/, "on our [Discord](https://discord.gg/sN9YRQbBv7)") // removes channel links
            .replace(/<[^]+>/, "") // removes pings
            .replace("()", ""), // removes stray parentheses left by removing pings)
        )
      },
    },
    created() {
      axios
        .get(
          "https://raw.githubusercontent.com/Faithful-Resource-Pack/CompliBot/main/json/faq.json",
        )
        .then((res) => {
          this.faqs = res.data
        })
    },
  })
})
