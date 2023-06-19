<script lang="ts">
    import { t } from "$lib/translations";
    import I18n from "../../components/common/i18n.svelte";
</script>

<div class="slim-container">
<h1 class="title text-center bold">{$t("license.title")}</h1>
<h3 class="text-center">
    Version 3 - 20th February 2023
    <br><br>
    Copyright © Faithful Resource Pack
    <br><br>
    <a class="btn btn-dark" href="https://database.faithfulpack.net/packs/LICENSE.txt">{$t("license.download")}</a>
    <br><br>
</h3>
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

        <li><I18n path="license.requirements.6" slots={({
            link: '<a href="https://database.faithfulpack.net/packs/LICENSE.txt" target="_blank" rel="noopener noreferrer">$1</a>'
        })}/></li>
    </ol>

    <h2>{$t("license.exceptions.title")}</h2>

    <ol>
        <li>{$t("license.exceptions.1")}</li>

        <li>{$t("license.exceptions.2")}</li>

        <li><I18n path="license.exceptions.3" slots={({
            original: '<a href="https://web.archive.org/web/20150607220656/http://www.minecraftforum.net:80/forums/mapping-and-modding/resource-packs/1223254-faithful-32x32-pack-update-red-cat-clay-1-8" target="_blank" rel="noopener noreferrer">$1</a>'
        })} />
        </li>
    </ol>

    <h2>{$t("license.reserve_right.title")}</h2>

    <ol>
        <li>{$t("license.reserve_right.1")}</li>

        <li>{$t("license.reserve_right.2")}</li>

        <li>{$t("license.reserve_right.3")}</li>
    </ol>

    <br>
    <h2 class="semibold text-center">Only the English version is legally valid. Translations may not be entirely accurate!</h2>
</div>

<style lang="scss">
    .slim-container {
        text-align: left;
    }

    li {
        margin-bottom: 15px;
        line-height: 25px;
    }

    ol {
        margin-left: 20px;
    }

    a {
        word-wrap: break-word;
    }

    .btn {
        width: 75%;
    }
</style>
