<script>
	import AddonCategories from "$components/addons/AddonCategories.svelte";
	import AddonResults from "$components/addons/AddonResults.svelte";
	import AddonSearch from "$components/addons/AddonSearch.svelte";
	import AddonFavorites from "$components/addons/AddonFavorites.svelte";
	import AddonSubmit from "$components/addons/AddonSubmit.svelte";
	import AddonAuthors from "$components/addons/AddonAuthors.svelte";
	import AddonSort from "$components/addons/AddonSort.svelte";
	import { t } from "$lib/translations";
</script>

<div id="addon_header" class="text-center">
	<img
		class="background_transition"
		src="/images/background/Add-ons.jpg"
		alt="Add-ons background"
	/>
	<div id="addon_header_text">
		<h1 class="title middle">
			<img
				class="title-image"
				src="https://database.faithfulpack.net/images/branding/logos/transparent/128/addons_logo.png"
				alt="Add-ons"
			/><span class="h1 bold">Add-ons</span>
		</h1>
		<h2>{$t("add-ons.description")}</h2>
		<p><i><a href="/installation">{$t("add-ons.how_to_install")}</a></i></p>
	</div>
</div>

<div class="container">
	<div id="addon_favorites">
		<AddonFavorites />
	</div>
	<div id="addon_content">
		<div id="addon_side">
			<AddonCategories />
			<AddonAuthors />
			<AddonSubmit />
		</div>
		<div id="addon_main">
			<div id="addon_search">
				<AddonSearch />
			</div>
			<div id="addon_results">
				<AddonSort />
				<AddonResults />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	$overflow: 200px;
	$spacing: 12px;

	#addon_header {
		position: relative;
		overflow: hidden;
		padding: 1px 0 $overflow;
		margin-bottom: -$overflow;

		&_text {
			position: relative;

			h1,
			h2,
			p {
				color: #fff;
			}
		}

		p i a {
			color: inherit;
			text-decoration: underline;
		}
	}
	#addon_header + * {
		position: relative;
		min-height: $overflow;
	}

	#addon_content {
		display: flex;
		flex-direction: row;
		gap: $spacing;

		& > * {
			display: inline-block;
			vertical-align: top;
		}

		#addon_side {
			width: 25%;
			padding-right: $spacing;

			// how to style child component
			& :global(> *) {
				margin-bottom: $spacing;

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		#addon_main {
			width: 75%;

			& > * :global(> div) {
				margin-bottom: $spacing;
			}
		}
	}

	@media only screen and (max-width: 992px) {
		#addon_content {
			flex-direction: column;

			#addon_side {
				width: 100%;
				padding-right: 0;
			}

			#addon_main {
				width: 100%;
			}
		}
	}
</style>
