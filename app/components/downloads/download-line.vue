<template>
	<tr class="download-item" :class="nested ? 'subitem' : ''" @click="toggleChildren">
		<td class="show-icon-container">
			<!-- empty slot rendered if there's only a single download -->
			<v-icon
				v-if="!nested && !single"
				:icon="showIcon"
				size="x-small"
				opacity="0.5"
				class="cursor-pointer"
			/>
		</td>
		<td class="download-details">
			<span class="download-name">
				<download-badge dot :badge="labelColor" />
				<span class="mx-1 my-1">{{ labelText }}</span>
			</span>
			<download-badge badge="version">{{ version }}</download-badge>
			<download-badge v-if="item.latest" badge="latest">Latest</download-badge>
			<!-- avoid SSR warning with date localization -->
			<span v-if="date" class="mobile-details" data-allow-mismatch="children">
				{{ date }}
			</span>
		</td>

		<td class="date" data-allow-mismatch="children">{{ date }}</td>

		<td
			v-for="(link, linkType) in item.links"
			:key="link"
			class="links"
			:colspan="Object.keys(item.links).length > 1 ? 1 : 2"
		>
			<!-- icon buttons aren't accessible on mobile -->
			<nuxt-link
				class="btn btn-dark btn-dl"
				:to="link"
				:aria-label="`${textFormat[linkType]} download for ${labelText} (${version})`"
			>
				<media-icon class="dl-icon" :icon="linkType" fallback="download" />
				<span class="link-text ml-2">{{ textFormat[linkType] || linkType }}</span>
			</nuxt-link>
		</td>
	</tr>
</template>

<script>
import MediaIcon from "~/components/lib/media-icon.vue";
import DownloadBadge from "./download-badge.vue";

export default defineNuxtComponent({
	name: "download-line",
	components: {
		MediaIcon,
		DownloadBadge,
	},
	props: {
		nested: {
			type: Boolean,
			required: false,
			default: false,
		},
		single: {
			type: Boolean,
			required: false,
			default: false,
		},
		item: {
			type: Object,
			required: true,
		},
		curse: {
			type: Object,
			required: false,
			default: null,
		},
		version: {
			type: String,
			required: true,
		},
	},
	emits: ["toggle"],
	data() {
		return {
			isOpen: false,
			textFormat: {
				download: "Download",
				curse: "Curse",
				github: "GitHub",
				modrinth: "Modrinth",
				mcpedl: "MCPEDL",
			},
			labelColors: {
				GitHub: "github",
				Release: "green",
				"Pre-release": "blue",
				Beta: "yellow",
				Alpha: "red",
				Snapshot: "gray",
			},
		};
	},
	methods: {
		toggleChildren() {
			// handle icon change then pass back to download-version to unhide children
			this.isOpen = !this.isOpen;
			this.$emit("toggle");
		},
	},
	computed: {
		showIcon() {
			return this.isOpen ? "mdi-minus" : "mdi-plus";
		},
		labelText() {
			// display names override any autogenerated names
			if (this.item.file_name) return this.item.file_name;

			if (!this.item.file_version) return this.item.file_type;
			return `${this.item.file_type} ${this.item.file_version}`;
		},
		labelColor() {
			return this.labelColors[this.item.file_type] || "green";
		},
		date() {
			if (this.item.date === "rolling") return localDate(Date.now());

			if (this.item.date) return localDate(this.item.date);

			if (this.curse && this.curse.uploaded_at)
				return localDate(this.curse.uploaded_at.split("T")[0]);

			// no other way to get dates
			return "Unknown";
		},
	},
});
</script>

<style scoped lang="scss">
@use "~/assets/css/lib/variables" as *;

td {
	text-align: center;
	vertical-align: middle;
	width: calc(50% / 3);
}

// all text except for links use this
td,
td * {
	color: #ccc;
	margin-bottom: 0;
}

// for some reason you can't pad <tr> tags directly, so we style the children instead
.download-item > * {
	padding: 0.2rem 0px;
}

.download-item:hover {
	background-color: rgba(255, 255, 255, 0.05);
}

.download-name {
	display: inline-flex;
	padding-top: 0px !important;
	padding-bottom: 0px !important;
	padding-left: 0.5rem;
	margin: 0px;
	// fix for dots not respecting aspect ratio
	align-items: center;
}

.subitem {
	// kinda lazy way of showing old downloads as less significant
	opacity: 75%;
}

.download-details {
	text-align: left;
	width: 45%;
	* {
		margin-right: 0.3rem;
	}
}

.links {
	width: calc(50% / 6);
}

.mobile-details {
	display: none;
}

.show-icon-container {
	user-select: none;
	width: 5%;
}

.btn-dl {
	padding: 0.1rem 0.2rem;
	margin: 0.1rem 0.1rem;
	width: 115px;
	* {
		color: #fff;
	}
}

i.dl-icon {
	font-size: 20px;
}

@media (max-width: 760px) {
	.download-name {
		padding-left: 0px !important;
		// remove inline so it wraps the badges underneath
		display: flex;
	}

	// hide desktop details and show mobile details
	.size,
	.date {
		display: none;
	}
	.mobile-details {
		display: block;
	}

	.download-item {
		display: flex;
		align-items: stretch;
		// padding works on tr since it's now flex
		padding: 0.25rem 0.5rem;

		// remove hover effect (looks bad on mobile)
		&:hover {
			background-color: transparent;
		}
	}

	// fix margins
	.show-icon-container {
		flex: 0 0 24px;
		padding: 0.2rem 0;
	}

	.download-details {
		flex: 1 1 auto;
		padding: 0.2rem 0.4rem;
	}

	.links {
		flex: 0 0 30px;
		width: auto;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	// square buttons with centered icon and remove text
	.btn-dl {
		width: 2rem;
		height: 2rem;
		line-height: 30px;
		text-align: center;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.link-text {
		display: none;
	}
}
</style>
