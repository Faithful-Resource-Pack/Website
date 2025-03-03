<template>
	<v-select v-model="pack" variant="solo-filled" :items="formattedPacks">
		<template #selection="{ item }">
			<div class="ma-n3">
				<img :src="packs[item.value].logo" class="thumbnail mx-2" />
				{{ item.title }}
			</div>
		</template>
	</v-select>
</template>

<script>
export default defineNuxtComponent({
	name: "pack-selection",
	props: {
		modelValue: {
			type: String,
			required: true,
		},
		packs: {
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			pack: "default",
		}
	},
	computed: {
		formattedPacks() {
			return Object.values(this.packs).map((p) => ({ title: p.name, value: p.id }));
		}
	},
	watch: {
		modelValue: {
			handler(n) {
				this.pack = n;
			},
			immediate: true,
		},
		pack(n) {
			this.$emit("update:modelValue", n);
		}
	}
});
</script>

<style scoped lang="scss">
.thumbnail {
	height: 3rem;
}
</style>