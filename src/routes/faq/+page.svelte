<script lang="ts">
    export let data: App.FaqObject;
    import { parseMd } from "$lib/shortMd";
    import DOMPurify from 'isomorphic-dompurify';
    function cleanDiscordFormatting(text: string) {
        return parseMd ( // parseMd already runs DOMPurify so we're good on that end I think
            text
                .replace(/in <#[^]+>/, "on our [Discord](https://discord.gg/sN9YRQbBv7)") // removes channel links
                .replace(/<[^]+>/, "") // removes pings
                .replace("()", "") // removes stray parentheses left by removing pings
        );
    }
</script>

<h1 class="title text-center bold">Frequently Asked Questions</h1>
<div class="slim-container">
    {#each data.faqArray as faq}
        <h2>{DOMPurify.sanitize(faq.question)}</h2>
        <p class="answer">{@html cleanDiscordFormatting(faq.answer)}</p>
    {/each}
</div>

<style lang="scss">
    h2 {
        padding-top: 50px;
    }
    .answer {
        padding-left: 20px;
        line-height: 25px;
    }
</style>
