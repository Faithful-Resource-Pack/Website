<script lang="ts">
	import "../css/app.scss";
	import "../css/light.scss";
	
	import { themeValueWatch } from "$stores/ThemeStore";
	import { onMount } from "svelte";

	onMount(() => {
		themeValueWatch((isDark) => {
			document.body.parentElement?.classList[(isDark) ? 'remove' : 'add']('light');
		})
	})
</script>

<slot />