<script lang="ts">
	import TeamMemberCard from "./TeamMemberCard.svelte";
	import { t } from "$lib/translations";
	// TODO: replace with real API data
	// TODO: make a page in website to add profiles and edit profiles displayed (similar to github)
	import data from "./userData.json";
</script>

<div class="container">
	<h1 class="title text-center bold">
		{$t("team.title.our_team")}
	</h1>

	<h2 class="subtitle text-center semibold">
		{$t("team.title.managers")}
	</h2>

	<div class="card-grid">
		{#each data.managers as user}
			<TeamMemberCard {user} />
		{/each}
	</div>

	<h2 class="subtitle text-center semibold">
		{$t("team.title.additional_developers")}
	</h2>

	<div class="card-grid">
		{#each data.developers as user}
			<TeamMemberCard {user} />
		{/each}
	</div>
</div>

<style lang="scss">
	$cell-width: 240px;
	$grid-gap: 30px;

	h2 {
		margin: $grid-gap;
	}

	.card-grid {
		width: calc(calc(4 * $cell-width) + calc(3 * $grid-gap));
		max-width: 100%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: $grid-gap;

		:global(> *) {
			width: $cell-width;
			flex-shrink: 1;
			flex-grow: 0;
		}

		@media (max-width: $width-M) {
			width: 3 * $cell-width + 2 * $grid-gap;
		}

		@media (max-width: $width-S) {
			width: 2 * $cell-width + $grid-gap;
		}

		@media (max-width: 525px) {
			:global(> *) {
				flex-grow: 1;
			}
		}
	}
</style>
