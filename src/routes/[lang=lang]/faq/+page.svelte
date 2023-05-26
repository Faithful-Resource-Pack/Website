<script lang="ts">
	import parseMd from "$lib/shortMd";
    import DOMPurify from 'isomorphic-dompurify';
	import strings from "./strings.json";
	const faqArray: App.FaqArray[] = strings.en_US.faq;

    function cleanDiscordFormatting(text: string) {
        return parseMd (
            text
                .replace(/in <#[^]+>/, "on our [Discord](https://discord.gg/sN9YRQbBv7)")
                .replace(/<[^]+>/, "")
                .replace("()", "")
        )
    }
</script>

<h1 class="title text-center bold">Frequently Asked Questions</h1>
<div class="slim-container">
	{#each faqArray as faq}
		<h2>{faq.question}</h2>
		<div class="answer">{@html DOMPurify.sanitize(cleanDiscordFormatting(faq.answer))}</div>
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
