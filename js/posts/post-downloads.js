export default {
	name: "post-downloads",
	template: `
		<div>
			<h2 class="display-4 my-5 text-center">Downloads</h2>
			<template v-for="[category, items] in Object.entries(downloads)">
				<a
					v-if="isLegacy(items)"
					:href="handleLegacyItem(items)"
					class="btn block btn-lg btn-primary fancy-card-2x my-3"
				>
					<i style="margin-right: 10px" :class="getIcon(items).cls">
						{{ getIcon(items).icon }}
					</i>{{ category }}
				</a>
				<template v-else>
					<h1 class="my-3" align="center">{{ category }}</h1>
					<p v-for="[name, link] in Object.entries(items)" align="center">
						<a :href="link" class="btn block btn-lg btn-primary">
							<i style="margin-right: 10px" :class="getIcon(name).cls">
								{{ getIcon(name).icon }}
							</i>{{ name }}
						</a>
					</p>
					<br />
				</template>
			</template>
		</div>
	`,
	props: {
		downloads: {
			type: [Object, Array],
			required: true,
		},
	},
	methods: {
		isLegacy(items) {
			return typeof items === "string" || (Array.isArray(items) && items.length === 1);
		},
		handleLegacyItem(item) {
			if (Array.isArray(item) && item.length === 1) return item[0];
			return item;
		},
		getIcon(item) {
			const name = this.handleLegacyItem(item).toLowerCase().trim();
			if (name.includes("github")) return { cls: "fab", icon: "" };
			if (name.includes("curseforge")) return { cls: "fas", icon: "" };
			if (
				["planetminecraft", "pmc", "planet minecraft"].some((search) =>
					name.includes(search),
				)
			)
				return { cls: "fas", icon: "" };
			if (name.includes("mcpedl")) return { cls: "fas", icon: "" };
			if (name.includes("modrinth")) return { cls: "fas", icon: "" };
			// default download icon
			return { cls: "fas", icon: "" };
		},
	},
};
