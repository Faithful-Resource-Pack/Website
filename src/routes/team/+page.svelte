<script lang="ts">
    import TeamMemberCard from "./TeamMemberCard.svelte";
    import { t } from '$lib/translations';

    // TODO: replace with real API data
    // TODO: make a page in website to add profiles and edit profiles displayed
    const USER_PLACEHOLDER = {
        avatar: "/images/steve-alex-selfie.jpg",
        username: `Alex`,
        discordTag: 1234,
        bio: `Bio with further information if wanted or necessary. Should be optional.`,
        timezone: `MC Standard Time`,
        city: `My World`,
        country: `Minecraft`,
        pronouns: `she/npc`
    };

    const userData = Array(8).fill(USER_PLACEHOLDER);
    const additionalData = Array(1).fill(USER_PLACEHOLDER);
</script>

<div class="container">
    <h1 class="title bold text-center">
        { $t('team.title.our_team') }
    </h1>

    <div class="card-grid">
        {#each userData as user}
            <TeamMemberCard {user} />
        {/each}
    </div>

    <h1 class="title text-center">
        { $t('team.title.additional_developers') }
    </h1>

    <div class="card-grid">
        {#each additionalData as user}
            <TeamMemberCard {user} color="#3498db" />
        {/each}
    </div>
</div>

<style lang="scss">
    $cell-width: 240px;
    $grid-gap: $small-spacing;
    .card-grid {
        width: calc(calc(4 * $cell-width) + calc(3 * $grid-gap));
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: $grid-gap;

        :global( > *) {
            width: $cell-width;
            flex-shrink: 1;
            flex-grow: 0;
        }

        @media (max-width: $width-M) {
            width: 3 * $cell-width + 2 * $grid-gap;
        }

        @media (max-width: $width-S) {
            width: 2 * $cell-width + $grid-gap;
        }

        @media (max-width: 525px) {
            :global( > *) {
                flex-grow: 1;
            }
        }
    }
</style>