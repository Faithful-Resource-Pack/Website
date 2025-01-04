<script setup>
// this has to be a route to stop nuxt complaining about the page not existing
definePageMeta({
	middleware: "gallery",
});
</script>
