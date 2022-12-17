<script>
    import AddonCategories from "$components/addons/AddonCategories.svelte";
	import AddonResults from "$components/addons/AddonResults.svelte";
	import AddonSearch from "$components/addons/AddonSearch.svelte";

    const text_title = 'Add-ons';
    const text_desc = `Customise your game experience!\nBrought to you by the community.`.replace('\n', '<br>');
    const text_how_to_install = 'How to install add-ons';
</script>

<img class="addon_background" src="/images/background/Add-ons.png" alt="Add-ons background">
<div id="addon_header" class="text-center">
    <h1 class="title">{ text_title }</h1>
    <p>{ @html text_desc }</p>
    <p><i>{ text_how_to_install }</i></p>
    <h3>placeholder text because the background would go over the footer lol</h3>
    <h3>placeholder text because the background would go over the footer lol</h3>
</div>
    
<div id="addon_container" class="container">
    <AddonCategories />
    <div id="addon_main">
        <div class="addon_search">
            <AddonSearch />
        </div><div class="addon_main">
            <AddonResults class="addon_main" />
        </div>
    </div>
</div>

<style lang="scss">
    #addon_header {
        position: relative;

        p i {
            text-decoration: underline;
        }
    }

    .addon_background {
        width: 100%;
        position: absolute;
        mask: linear-gradient(180deg, #000, transparent);
        filter: saturate(0.7);
    }
    
    #addon_container > *{
        display: inline-block;
    }
    .addon_search {
        width: 30%;
        padding-right: 20px;
    }
    .addon_main {
        width: 70%;
    }
</style>