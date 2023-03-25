<script lang="ts">
    import { t } from "$lib/translations";
</script>

<svelte:head>
    <title>License - Faithful</title>
</svelte:head>

<div class="container">
    <h1>{$t("license.title")}</h1>

    <p>
        Version 3 - 20th February 2023
        <br><br>
        Copyright © Faithful Resource Pack
    </p>

    <h2>{$t("license.usage.title")}</h2>

    <ol>
        <li>{$t("license.usage.1")}</li>

        <li>{$t("license.usage.2")}</li>

        <li>{$t("license.usage.3")}</li>

        <li>{$t("license.usage.4")}</li>

        <li>{$t("license.usage.5")}</li>
    </ol>

    <h2>{$t("license.requirements.title")}</h2>

    <ol>
        <li>{$t("license.requirements.1")}</li>

        <li>{$t("license.requirements.2")}
            <a href="https://faithfulpack.net/">https://faithfulpack.net</a>
        </li>

        <li>{$t("license.requirements.3")}</li>

        <li>{$t("license.requirements.4")}</li>

        <li>{$t("license.requirements.5")}</li>

        <li>{$t("license.requirements.6")}</li>

        <a class="btn btn-dark" href="https://database.faithfulpack.net/packs/LICENSE.txt">{$t("license.download")}</a>
    </ol>

    <h2>{$t("license.exceptions.title")}</h2>

    <ol>
        <li>{$t("license.exceptions.1")}</li>

        <li>{$t("license.exceptions.2")}</li>

        <li>{$t("license.exceptions.3")}
            <a href="https://web.archive.org/web/20150607220656/http://www.minecraftforum.net:80/forums/mapping-and-modding/resource-packs/1223254-faithful-32x32-pack-update-red-cat-clay-1-8">https://web.archive.org/web/20150607220656/http://www.minecraftforum.net:80/forums/mapping-and-modding/resource-packs/1223254-faithful-32x32-pack-update-red-cat-clay-1-8</a>
        </li>
    </ol>

    <h2>{$t("license.reserve_right.title")}</h2>

    <ol>
        <li>{$t("license.reserve_right.1")}</li>

        <li>{$t("license.reserve_right.2")}</li>

        <li>{$t("license.reserve_right.3")}</li>
    </ol>

    <br>
    <h3 class="text-center">Translations may be inaccurate, only the English version is valid.</h3>
</div>

<style lang="scss">
    div {
        text-align: left;
    }
    li {
        margin-top: 10px;
    }
    a {
        word-wrap: break-word;
    }
</style>
