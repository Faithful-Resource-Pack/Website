<script lang="ts">
    import { t } from "$lib/translations";

    const text_question = $t("add-ons.submit.title");
    const text_button = $t("add-ons.submit.button");
</script>
<div class="card card-body card-body-thin text-center">
    <div>{text_question}</div>
    <div class="button"><a href="https://webapp.faithfulpack.net/#/addons/new" target="_blank" rel="noreferrer">
        {text_button}
    </a></div>
</div>

<style lang="scss">
    .card {
        background: #D9AF00;
        color: white;
    }
    .button {
        margin-top: 0.8rem;
        background: white;
        color: #D9AF00;
        font-size: 1.1rem;
        font-weight: 600;

        a {
            padding: 0.8rem;
            color: inherit;
            display: block;
        }
    }
</style>