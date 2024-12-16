export default {
	name: "addon-grid",
	components: {
		AddonCard: Vue.defineAsyncComponent(() => import("./addon-card.js")),
	},
	props: {
		addons: {
			type: Array,
			required: true,
		},
		// only used for the main grid
		addonsFav: {
			type: Object,
			required: false,
		},
		favorites: {
			type: Boolean,
			required: false,
			default: false,
		},
		sort: {
			type: String,
			required: false,
			default: "none",
		},
	},
	emits: ["clickFav"],
	template: `
		<div class="card card-body addon-grid">
			<div class="res-grid-3">
				<div
					v-for="addon in sortedAddons"
					:key="addon.id"
					style="margin-bottom: -50px"
				>
					<template v-if="addon.approval.status === 'approved'">
						<addon-card :addon />
						<v-btn
							class="fav-button pa-0"
							:icon="icon(addon.id)"
							:color="color(addon.id)"
							variant="plain"
							@click="$emit('clickFav', addon)"
						/>
					</template>
				</div>
			</div>
		</div>
	`,
	methods: {
		color(id) {
			if (this.favorites) return "#ff3333";
			if (this.addonsFav[id]) return "#faa619";
			return "#ffffffaa";
		},
		icon(id) {
			if (this.favorites) return "mdi-close";
			if (this.addonsFav[id]) return "mdi-star";
			return "mdi-star-outline";
		},
	},
	computed: {
		sortedAddons() {
			return this.addons.sort((a, b) => {
				const an = a.name.trim().toLowerCase();
				const bn = b.name.trim().toLowerCase();
				const ad = a.last_updated || 0;
				const bd = b.last_updated || 0;
				switch (this.sort) {
					case "na":
						return an === bn ? 0 : an > bn ? 1 : -1;
					case "nd":
						return an === bn ? 0 : an > bn ? -1 : 1;
					case "da":
						return ad === bd ? 0 : ad > bd ? 1 : -1;
					case "dd":
					default:
						return ad === bd ? 0 : ad < bd ? 1 : -1;
				}
			});
		},
	},
};
