<script lang="ts">
	import NewsGrid from "$components/news/newsGrid.svelte";
	import { t } from "$lib/translations";
</script>

<h1 class="title text-center bold">{$t("footer.resources.news")}</h1>

<NewsGrid />
