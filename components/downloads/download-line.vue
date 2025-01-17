<template>
	<tr class="download-item" :class="nested ? 'subitem' : ''" @click="toggleChildren">
		<td class="show-icon-container" v-if="nested || single"></td>
		<td class="show-icon-container" v-else>
			<p class="show-icon clickable">{{ showIcon }}</p>
		</td>
		<td class="download-details">
			<p class="download-badges">
				<span class="download-name">
					<download-badge dot :badge="labelColor" />
					<span class="mx-2 my-1">{{ item.file_type }} {{ item.file_version }}</span>
				</span>
				<download-badge badge="version">
					{{ version }}
				</download-badge>
				<download-badge badge="latest" v-if="version !== 'download' && item.latest">
					Latest
				</download-badge>
			</p>
			<!-- avoid SSR warning with date localization -->
			<p class="mobile-details" v-if="date" data-allow-mismatch="children">{{ mobileDetails }}</p>
		</td>

		<td class="date">
			<p data-allow-mismatch="children">{{ date }}</p>
		</td>
		<td class="size">
			<p>{{ size }}</p>
		</td>

		<td
			v-for="(link, linkType) in item.links"
			:key="`${version}-${link}`"
			class="links"
			:colspan="Object.keys(item.links).length > 1 ? 1 : 2"
		>
			<nuxt-link class="btn btn-dark btn-dl" :to="link">
				<media-icon class="dl-icon" :icon="linkType" fallback="download" />
				<span class="link-text">{{ textFormat[linkType] || linkType }}</span>
			</nuxt-link>
		</td>
	</tr>
</template>

<script>
import MediaIcon from "../lib/media-icon.vue";
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
				Snapshot: "black",
			},
		};
	},
	methods: {
		getLocalizedDate(dateObj) {
			const year = dateObj.getFullYear();
			const month = dateObj.getMonth() + 1; // 0 indexed
			const day = dateObj.getDate();
			// mdy for us (expand array if someone else does too)
			if (navigator && ["en-US"].includes(navigator.language)) return `${month}/${day}/${year}`;
			// dmy for everyone else (and on server since no client is available)
			return `${day}/${month}/${year}`;
		},
		toggleChildren() {
			// handle icon change then pass back to download-table to unhide children
			this.isOpen = !this.isOpen;
			this.$emit("toggle");
		},
	},
	computed: {
		showIcon() {
			return this.isOpen ? "-" : "+";
		},
		labelText() {
			if (!this.item.file_version) return this.item.file_type;
			return this.item.file_type + this.item.file_version;
		},
		labelColor() {
			return this.labelColors[this.item.file_type] || "green";
		},
		date() {
			if (this.item.date) return this.getLocalizedDate(new Date(this.item.date));

			// no other way to get dates
			if (!this.curse || !this.curse.uploaded_at) return "Unknown";
			return this.getLocalizedDate(new Date(this.curse.uploaded_at.split("T")[0]));
		},
		size() {
			// some very old downloads have manual sizes
			if (this.item.size) return this.item.size;
			if (!this.curse || !this.curse.filesize) return "Unknown";
			return `${(this.curse.filesize / 1000000).toFixed(2)} MB`;
		},
		mobileDetails() {
			return `${this.date} • ${this.size}`;
		},
	},
});
</script>
