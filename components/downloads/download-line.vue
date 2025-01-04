<template>
	<tr class="download-item" :class="nested ? 'subitem' : ''" @click="toggleChildren">
		<td class="show-icon-container" v-if="nested || single"></td>
		<td class="show-icon-container" v-else>
			<p class="show-icon clickable">{{ showIcon }}</p>
		</td>
		<td class="download-details">
			<p class="download-badges">
				<span class="download-name">
					<span :class="['download-type', labelColor]" />
					<span class="download-badge">{{ item.file_type }} {{ item.file_version }}</span>
				</span>
				<span class="download-badge version">{{ version }}</span>
				<span class="download-badge latest" v-if="version !== 'download' && item.latest"
					>Latest</span
				>
			</p>
			<p class="mobile-details" v-if="date">{{ mobileDetails }}</p>
		</td>

		<td class="date">
			<p>{{ date }}</p>
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
			<a class="btn btn-dark btn-dl" :href="link">
				<media-icon class="dl-icon" :icon="linkType" fallback="download" />
				<span class="link-text">{{ textFormat[linkType] || linkType }}</span>
			</a>
		</td>
	</tr>
</template>

<script>
import MediaIcon from '../lib/media-icon.vue';

export default {
	name: "download-line",
	components: {
		MediaIcon,
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
			if (["en-US"].includes(navigator.language)) return `${month}/${day}/${year}`;
			// dmy for everyone else
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
};
</script>
