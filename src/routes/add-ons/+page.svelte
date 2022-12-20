<script>
    import AddonCategories from "$components/addons/AddonCategories.svelte";
	import AddonResults from "$components/addons/AddonResults.svelte";
	import AddonSearch from "$components/addons/AddonSearch.svelte";
	import AddonFavorites from "$components/addons/AddonFavorites.svelte";
	import AddonSubmit from "$components/addons/AddonSubmit.svelte";

    const text_title = 'Add-ons';
    const text_desc = `Customise your game experience!\nBrought to you by the community.`.replace('\n', '<br>');
    const text_how_to_install = 'How to install add-ons';
</script>

<svelte:head>
    <title>Add-ons - Faithful</title>
</svelte:head>

<div id="addon_header" class="text-center">
    <img class="addon_background" src="/images/background/Add-ons.png" alt="Add-ons background">
    <div id="addon_header_text">
        <h1 class="title middle">
            <img class="title-image" src="https://database.faithfulpack.net/images/branding/logos/transparent/128/addons_logo.png" alt="Addons"
            /><span>{ text_title }</span>
        </h1>
        <p>{ @html text_desc }</p>
        <p><i><a href="#howto">{ text_how_to_install }</a></i></p>
    </div>
</div>

<div class="container">
    <div id="addon_favorites">
        <AddonFavorites />
    </div><div id="addon_content">
        <div id="addon_side">
            <AddonCategories />
            <AddonSubmit />
        </div><div id="addon_main">
            <div id="addon_search">
                <AddonSearch />
            </div><div id="addon_results">
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

        #addon_header_text {
            position: relative;
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

    .addon_background {
        height: 100%;
        width: 100%;
        object-fit: cover;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        mask: linear-gradient(0deg, transparent 0%, black 100%);
        filter: saturate(0.7);
    }
    
    #addon_content {

        & > * {
            display: inline-block;
            vertical-align: top;
        }

        #addon_side {
            width: 30%;
            padding-right: $spacing;

            // how to style child component
            & :global( > *) {
                margin-bottom: $spacing;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        #addon_main {
            width: 70%;

            & > * {
                margin-bottom: $spacing;
            }
        }
    }
</style>