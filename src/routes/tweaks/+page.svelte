<script lang="ts">
import type { ActionData, PageData } from ".svelte-kit/types/src/routes/tweaks/$types";

export let data: PageData;
export let form: ActionData;
</script>

<svelte:head>
    <title>Tweaks - Faithful</title>
</svelte:head>

<h1 class="title text-center">Faithful Tweaks</h1>

<form method="POST">
<label>
    Format
    <input name="format" type="text" value="1.16.2">
</label><br />
<label>
    modules
    <fieldset>    
        <input type="checkbox" name="modules" value="SlicedSwords">SlicedSwords<br />
        <input type="checkbox" name="modules" value="ReducedPumpkinBlur">ReducedPumpkinBlur<br />
        <input type="checkbox" name="modules" value="ColoredBows">ColoredBows<br />
        <input type="checkbox" name="modules" value="OreBorders">OreBorders<br />
        <input type="checkbox" name="modules" value="StickyPistonSides">StickyPistonSides<br />
    </fieldset>
</label><br />
<label>
    icon modules
    <fieldset>
        <input type="checkbox" name="iconModules" value="MelonHunger">MelonHunger<br />
        <input type="checkbox" name="iconModules" value="ColoredPing">ColoredPing<br />
        <input type="checkbox" name="iconModules" value="BlueWitherHearts">BlueWitherHearts<br />
        <input type="checkbox" name="iconModules" value="RainbowXP">RainbowXP<br />
    </fieldset>
</label><br />
<label>
    options background
    <input name="optionsBackground" type="text" value="AcaciaPlanksBG">
</label><br />
<label>
    panorama background
    <input name="panoOption" type="text" value="ClassicPano">
</label><br />
<button>Send</button>
</form>

{#if form?.success}
<!-- this message is ephemeral; it exists because the page was rendered in
    response to a form submission. it will vanish if the user reloads -->
<p>Form successfully received {form?.file}</p>
{/if}