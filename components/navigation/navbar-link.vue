<template>
	<nuxt-link
		:to
		class="nav-link"
		:target="to.startsWith('http') ? '_blank' : ''"
		:rel="to.startsWith('http') ? 'noopener noreferrer' : ''"
	>
		<v-icon size="small" :icon class="mr-2" /> {{ name }}
	</nuxt-link>
</template>

<script>
export default {
	props: {
		to: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
	},
};
</script>
