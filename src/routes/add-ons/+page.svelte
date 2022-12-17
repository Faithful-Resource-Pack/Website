<script>
    import AddonCategories from "$components/addons/AddonCategories.svelte";
	import AddonResults from "$components/addons/AddonResults.svelte";
	import AddonSearch from "$components/addons/AddonSearch.svelte";

    const text_title =  'Add-ons';
    const text_desc = `Customise your game experience!\nBrought to you by the community.`.replace('\n', '<br>');
    const text_how_to_install = 'How to install add-ons';
</script>

<div id="container">
    <div id="addon_header" class="text-center">
        <h1 class="title">{ text_title }</h1>
        <p>{ @html text_desc }</p>
        <p><i>{ text_how_to_install }</i></p>
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
</div>

<style lang="scss">
    #container {
        background-color: white;
        padding-bottom: 50px;
    }

    #addon_header {
        padding: 1px 50px;
        margin-bottom: 50px;
        background: url(https://static.wixstatic.com/media/89b89d_e287df2f94854c9fb28d4e62254e96c7~mv2.png/v1/fill/w_1920,h_279,al_b,q_90,usm_0.66_1.00_0.01,enc_auto/89b89d_e287df2f94854c9fb28d4e62254e96c7~mv2.png);
        background-position: bottom center;
        background-size: cover;

        p i {
            text-decoration: underline;
        }
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