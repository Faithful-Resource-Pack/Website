export default {
	name: "post-downloads",
	props: {
		downloads: {
			type: Object,
			required: true,
		},
	},
	template: `
		<h2 class="subtitle my-5 text-center">Downloads</h2>
		<template v-for="[category, items] in Object.entries(downloads)">
			<a
				v-if="isSingleDownload(items)"
				:href="items"
				class="btn block btn-lg btn-primary my-3"
			>
				<i style="margin-right: 10px" :class="getIcon(items).cls">
					{{ getIcon(items).icon }}
				</i>{{ category }}
			</a>
			<template v-else>
				<h1 class="my-3 text-center">{{ category }}</h1>
				<p v-for="[name, link] in Object.entries(items)" class="text-center">
					<a :href="link" class="btn block btn-lg btn-primary">
						<i style="margin-right: 10px" :class="getIcon(name).cls">
							{{ getIcon(name).icon }}
						</i>{{ name }}
					</a>
				</p>
				<br />
			</template>
		</template>
	`,
	methods: {
		isSingleDownload(item) {
			return typeof item === "string";
		},
		getIcon(item) {
			const name = item.toLowerCase().trim();
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
