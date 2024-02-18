<script lang="ts">
	import { t } from "$lib/translations";

	export let text: "contribute" | "discussion";

	let title = $t("common.discord_banner." + text);
</script>

<p class="banner purple">
	<a href="https://discord.gg/sN9YRQbBv7">{title}</a>
</p>

<style lang="scss">
	.banner.purple {
		margin-left: auto;
		margin-right: auto;
		max-width: 100%;
		font-size: 1.2rem;
		font-weight: 600;
		@media only screen and (max-width: 992px) {
			width: 100%;
		}
		a {
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}
	}
</style>
