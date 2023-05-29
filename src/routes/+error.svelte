<script lang="ts">
	import { page } from "$app/stores";
	import { derived, writable } from "svelte/store";

	const notFound = derived(page, (p) => p.status === 404);
	const title = derived(notFound, (n) => (n ? "Are you lost in The End?" : $page.status));
	const message = derived(notFound, (n) =>
		n
			? `Unfortunately, the page you requested doesn't exist!<br>Try checking your spelling or going to the main page to find what you were looking for.`
			: $page.error?.message
	);

	$: explosions = [...Array(16).keys()].map((key) => `/images/404/explosion_${key}.png`);

	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	let tnt = writable({
		exploding: false,
		exploded: false,
		tnt_side: "/images/404/tnt_side.png",
		tntShow: true,
		explosionShow: false,
		explosionStep: "/images/404/explosion_0.png",
		diamondShow: false
	});

	let tnt_handler = derived(tnt, ($tnt) => {
		if (!$tnt) return null;

		const FRAME_TIME = 12;
		return {
			reset: function () {
				tnt.update((t) => {
					t.exploded = false;
					t.tntShow = true;
					t.diamondShow = false;
					return t;
				});
			},
			boom: async function () {
				if ($tnt.exploding || $tnt.exploded) return;
				tnt.update((t) => {
					t.exploding = true;
					return t;
				});

				for (var i = 0; i < 8; i++) {
					if (i % 2 === 0)
						tnt.update((t) => {
							t.tnt_side = "/images/404/tnt_side_on.png";
							return t;
						});
					else
						tnt.update((t) => {
							t.tnt_side = "/images/404/tnt_side.png";
							return t;
						});
					await sleep(FRAME_TIME * 25);
				}
				tnt.update((t) => {
					t.tntShow = false;
					return t;
				});

				tnt.update((t) => {
					t.explosionShow = true;
					return t;
				});
				for (var i = 0; i <= 15; i++) {
					tnt.update((t) => {
						t.explosionStep = "/images/404/explosion_" + i + ".png";
						return t;
					});
					await sleep(FRAME_TIME * 1.3);
				}
				tnt.update((t) => {
					t.explosionShow = false;
					t.diamondShow = true;
					t.exploded = true;
					t.exploding = false;
					return t;
				});
			}
		};
	});
	
	const err = derived(page, $p => $p !== null);
</script>

<svelte:head>
	<title>{$page.status} - Faithful</title>
	{#each explosions as image}
      <link rel="preload" as="image" href={image} />
    {/each}
	<link rel="preload" as="image" href="/images/404/tnt_side_on.png" />
</svelte:head>

<div>
	<div class="text-center">
		<h1>{$title}</h1>
		<p>{@html $message}</p>
	</div>
</div>

{#if $tnt_handler != null}
	<div id="animation_container">
		<img
			id="tnt"
			class:hidden={!$tnt.tntShow}
			src={$tnt.tnt_side}
			alt="Boom"
			on:click={$tnt_handler.boom}
			on:keydown={() => {}}
		/>
		<img
			id="diamond"
			class:hidden={!$tnt.diamondShow}
			src="/images/404/diamond.png"
			alt="Diamond"
			on:mouseover={$tnt_handler.reset}
			on:focus={() => {}}
		/>
		<img id="explosion" class:hidden={!$tnt.explosionShow} src={$tnt.explosionStep} alt="Boom" />
	</div>
{/if}

<!-- Only way to import scss for specific page on +error.svelte page -->
{#if err}
<style lang="scss">
	@import "../css/error.scss";
</style>
{/if}