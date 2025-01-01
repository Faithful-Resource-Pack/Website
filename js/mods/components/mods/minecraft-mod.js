/* global Vue */

const _NO_LINK = null;
const _NO_ICON =
	"https://database.faithfulpack.net/images/branding/logos/transparent/hd/mods_logo.png";

export default {
	name: "minecraft-mod",
	props: {
		mod: {
			type: Object,
		},
	},
	template: `
		<li class="mod-bar" :class="{ 'selected-mod': mod.selected }" v-if="!mod.blacklisted && mod.resource_pack.versions.length > 0">
			<label :for="modId" class="mod-label">Select this mod</label>
			<div :style="imageStyle" class="mod-img">
				<img :src="$root.apiURL + '/v2/mods/' + this.modId + '/thumbnail'" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" :alt="name" :title="name" loading="lazy" />
				<img :src="imageSource" style="display: none; opacity: .3" />
				<div class="mod-img-overlay"></div>
			</div>
			<div class="mod-bar-item">
				<input :id="modId" type="checkbox" v-model="mod.selected" class="mod-checkbox">
				<div class="mod-title" v-html="title"></div>
				<div :class="{ modNotChosen: !mod.selected }" class="mod-radio-group">
					<template v-for="(version, vindex) in minecraftVersions":key="modIds[vindex]">
						<input
							:disabled="!mod.selected"
							type="radio"
							:id="modIds[vindex] + '-' + version"
							:name="modIds[vindex]"
							v-model="mod.versionSelected"
							:value="version"
							class="mod-radio"
						>
							<label :for="modIds[vindex] + '-' + version">{{ version }}</label>
						</template>
				</div>
			</div>
		</li>
	`,
	data() {
		return {
			searchPages: 3,
			imageSource: _NO_ICON,
			link: _NO_LINK,
		};
	},
	computed: {
		/** @returns {string} of joined aliases in <span>*/
		aliases() {
			return this.$props.mod.aliases.length > 0
				? '<span class="dash">&nbsp;&dash;&nbsp;</span><h5 class="advice">' +
						this.$props.mod.aliases.join(", ") +
						"</h5>"
				: "";
		},
		/** @returns {string} complete curseforge mod url*/
		curseURL() {
			return this.$props.mod.curseURL || _NO_LINK;
		},
		/** @returns {string} info link to curseforge's mod page*/
		info() {
			const link = this.$props.mod.curse_url || _NO_LINK;

			if (link === _NO_LINK) return "";
			return `<a href="${link}" target="_blank" rel="noopener" title="${link}" class="mod-info icon arrow-up-right"></a>`;
		},
		/** @returns {string} main mod name s*/
		name() {
			return this.$props.mod.name;
		},
		/** @returns {string} background-img OR set opacity to 1*/
		imageStyle() {
			if (this.imageSource !== _NO_ICON) return "";
			return "opacity: 1";
		},
		/** @returns {Array} of available versions */
		minecraftVersions() {
			return this.$props.mod.resource_pack.versions;
		},
		/** @return {string} git repository full url */
		repoURL() {
			return this.$props.mod.resource_pack.git_repository;
		},
		modId() {
			return this.mod.id;
		},
		modIds() {
			return this.minecraftVersions.map((v) => this.modId);
		},
		title() {
			return `<div><h4>${this.name}</h4>${this.aliases}</div>${this.info}`;
		},
	},
};
