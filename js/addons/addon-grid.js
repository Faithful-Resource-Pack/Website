export default {
	name: "addon-grid",
	components: {
		AddonCard: Vue.defineAsyncComponent(() => import("./addon-card.js")),
	},
	template: `
		<div class="card card-body addon-grid">
			<div class="res-grid-3">
				<div
					v-for="addon in sortedAddons"
					:key="addon.id"
					style="margin-bottom: -50px"
				>
					<addon-card
						v-if="addon.approval.status === 'approved'"
						:addon
						full
					/>
					<v-btn
						:icon="icon"
						:color="btnColor(addon)"
						variant="plain"
						style="position: relative; top: calc(-100% + 40px); left: -7px"
						class="pa-0"
						@click="$emit('clickFav', addon)"
					/>
				</div>
			</div>
		</div>
	`,
	props: {
		addons: {
			type: Object,
			required: true,
		},
		addonsFav: {
			type: Object,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
		iconColor: {
			type: String,
			required: true,
		},
		sort: {
			type: String,
			required: false,
			default: "none",
		},
	},
	methods: {
		btnColor(addon) {
			if (Object.keys(this.addons) === Object.keys(this.addonsFav)) return this.iconColor;
			if (this.addonsFav[addon.id]) return this.iconColor;
			return "rgba(0, 0, 0, .5)";
		},
	},
	computed: {
		sortedAddons() {
			const sorted = Object.values(this.addons).sort((a, b) => {
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
			return sorted;
		},
	},
};
