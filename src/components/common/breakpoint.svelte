<script lang="ts">
	export let valid: boolean;
	export let breakpoint: "XS" | "S" | "M" | "L";
</script>

{#if valid} <br class={"br " + breakpoint} /> {/if}

<style lang="scss">
	.br {
		// XS
		@media (min-width: $width-XS) {
			&.XS {
				display: none;
			}
		}

		// S
		@media (max-width: $width-XS) {
			&.S {
				display: none;
			}
		}
		@media (min-width: $width-S) {
			&.S {
				display: none;
			}
		}

		// M
		@media (max-width: $width-S) {
			&.M {
				display: none;
			}
		}
		@media (min-width: $width-M) {
			&.M {
				display: none;
			}
		}

		// L
		@media (max-width: $width-M) {
			&.L {
				display: none;
			}
		}
	}
</style>
