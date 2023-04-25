<script lang="ts">
	import { onMount } from "svelte";


	export let main: boolean = false;
    export let text = '';

	if (main) {
        onMount(() => {
            // @ts-ignore
            window.ShowAll = function() {
                var old = document.getElementById("old");
                var btn = document.getElementById("old-btn");
                if( old === null || btn == null ) return;

                if (old.style.display == "none") {
                    old.style.display = "block";
                    btn.innerHTML = "Hide";
                } else {
                    old.style.display = "none";
                    btn.innerHTML = "All";
                }
            }
        })
	}
</script>

{#if text}
    <div id="changelog">
        {@html text}
    </div>
{/if}