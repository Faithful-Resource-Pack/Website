<template>
	<v-dialog v-model="modalOpened" attach=".site-container" max-width="600">
		<div class="card card-body my-10">
			<v-text-field
				ref="search"
				v-model="search"
				variant="solo"
				density="comfortable"
				clearable
				autofocus
				hide-details
				prepend-inner-icon="mdi-magnify"
				clear-icon="mdi-close"
				placeholder="Start search"
				@click:clear="clearSearch"
				@keyup.enter="onSelect(results[0])"
			/>
			<p v-if="results.length" class="mt-3 mb-0">{{ results.length }} results found</p>
			<p v-else-if="!isSearchable" class="my-3">
				{{ MIN_SEARCH_LENGTH - search.length }} more
				{{ MIN_SEARCH_LENGTH - search.length === 1 ? "character" : "characters" }} to start
			</p>
			<search-list
				v-if="results.length"
				:results
				:class="results.length && 'my-3'"
				@select="onSelect()"
			/>
			<div v-else-if="isSearchable" class="d-flex flex-column align-center justify-center my-5">
				<v-icon size="64" icon="mdi-alert-circle-outline" />
				<p class="h4 my-1">No results found</p>
			</div>
			<div
				v-else-if="recentSearchResults.length"
				:class="$vuetify.display.mdAndUp ? 'mb-3' : 'mb-n2'"
			>
				<div class="d-flex align-center justify-space-between">
					<h4 class="mb-0">Recently searched</h4>
					<v-btn icon variant="text" size="small" @click="clearRecentSearches">
						<v-icon icon="mdi-playlist-remove" title="Clear Search History" />
					</v-btn>
				</div>
				<search-list :results="recentSearchResults" @select="onSelectPreviousSearch" />
			</div>
			<!-- bit pointless to show on mobile where there are no keys to navigate with lol -->
			<template v-if="$vuetify.display.mdAndUp">
				<v-divider class="mt-0" />
				<div class="d-flex flex-column flex-sm-row align-center my-n2 ga-2">
					<p class="mb-0"><kbd>TAB</kbd> to navigate</p>
					<v-spacer v-if="$vuetify.display.mdAndUp" />
					<p class="mb-0"><kbd>ENTER</kbd> to select &nbsp; <kbd>ESC</kbd> to dismiss</p>
				</div>
			</template>
		</div>
	</v-dialog>
</template>

<script>
import SearchList from "~/components/search/search-list.vue";

import footerItems from "../../../public/footer.json";

const START_CONTEXT = 10;
const END_CONTEXT = 50;
const MIN_SEARCH_LENGTH = 3;

const RECENT_SEARCH_KEY = "recentlySearched";

export default defineNuxtComponent({
	name: "search-modal",
	components: {
		SearchList,
	},
	props: {
		modelValue: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:modelValue"],
	data() {
		return {
			modalOpened: false,
			search: "",
			recentSearches: [],
			// search => { priority: number, type: string, link: string, label: string, icon: string, date: Date }
			filters: [],
			MIN_SEARCH_LENGTH,
		};
	},
	methods: {
		startSearch(search) {
			const entries = this.filters
				.flatMap((filter) => filter(search))
				.filter((f) => f.priority >= 0);
			return entries.sort((a, b) => {
				const delta = a.priority - b.priority;
				if (delta !== 0) return delta;
				return b.date?.getTime() - a.date?.getTime();
			});
		},
		clearSearch() {
			this.search = "";
		},
		clearRecentSearches() {
			this.recentSearches = [];
		},
		onSelect(result) {
			// if autoselecting without the link
			if (result?.path) this.$router.push({ path: result.path });
			// if rerunning past search push it to the top and remove old entry, otherwise same as push
			this.recentSearches = [...this.recentSearches.filter((s) => s !== this.search), this.search];
			this.closeModal();
		},
		onSelectPreviousSearch(result) {
			this.search = result.label;
		},
		closeModal() {
			this.modalOpened = false;
		},
		createTextContext(text, search) {
			const baseIndex = text.toLowerCase().indexOf(search.toLowerCase());
			const start = Math.max(0, baseIndex - START_CONTEXT);
			const end = Math.min(text.length, baseIndex + END_CONTEXT);
			let context = text.slice(start, end);
			if (start !== 0) context = `…${context}`;
			if (end !== text.length) context += "…";

			// remove markdown since it causes a lot of issues
			context = compileMarkdown(context.replace(/\\/g, ""), { strip: true }).replace(
				/(\n|\t)/g,
				" ",
			);
			return this.highlightSearch(context, search);
		},
		highlightSearch(text, search) {
			// there has Got to be a better way to do this lol
			return text.replace(
				new RegExp(search, "ig"),
				(found) => `<span class="text-highlight">${found}</span>`,
			);
		},
	},
	computed: {
		results() {
			if (!this.isSearchable) return [];
			return this.startSearch(this.search);
		},
		recentSearchResults() {
			// show newest on top
			return Array.from(this.recentSearches)
				.reverse()
				.slice(0, 10)
				.map((search) => ({
					type: "Search",
					link: null,
					label: search,
					icon: "mdi-magnify",
					date: new Date(),
				}));
		},
		isSearchable() {
			return this.search.length >= MIN_SEARCH_LENGTH;
		},
	},
	watch: {
		modelValue(n) {
			this.modalOpened = n;
			this.search = "";
		},
		modalOpened(n) {
			this.$emit("update:modelValue", n);
		},
		recentSearches: {
			handler(n) {
				localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(n));
			},
			deep: true,
		},
	},
	mounted() {
		this.recentSearches = JSON.parse(localStorage.getItem(RECENT_SEARCH_KEY) || "[]");

		// todo: maybe generate this somewhere else
		const { apiURL } = useRuntimeConfig().public;
		$fetch(`${apiURL}/addons/approved`).then((addons) => {
			this.filters.push((search) =>
				addons.map((addon) => {
					const entry = {
						type: "Add-on",
						link: `/addons/${addon.slug}`,
						label: addon.name,
						icon: "mdi-plus-thick",
						date: new Date(addon.last_updated || 0),
					};
					if (addon.name.toLowerCase() === search.toLowerCase()) return { priority: 0, ...entry };
					if (addon.name.toLowerCase().startsWith(search.toLowerCase()))
						return { priority: 1, ...entry };
					if (addon.name.toLowerCase().includes(search.toLowerCase()))
						return { priority: 2, ...entry };
					if (addon.description.toLowerCase().includes(search.toLowerCase())) {
						return {
							priority: 3,
							context: this.createTextContext(addon.description, search),
							...entry,
						};
					}
					return { priority: -1, ...entry };
				}),
			);
		});
		$fetch(`${apiURL}/posts/approved`).then((posts) => {
			this.filters.push((search) =>
				posts.map((post) => {
					const entry = {
						type: "News article",
						link: post.permalink,
						label: post.title,
						icon: "mdi-newspaper-variant",
						date: new Date(post.date),
					};
					if (post.title.toLowerCase() === search.toLowerCase()) return { priority: 0, ...entry };
					if (post.title.toLowerCase().startsWith(search.toLowerCase()))
						return { priority: 1, ...entry };
					if (post.title.toLowerCase().includes(search.toLowerCase()))
						return { priority: 2, ...entry };
					if (post.description.toLowerCase().includes(search.toLowerCase())) {
						return {
							priority: 3,
							context: this.createTextContext(post.description, search),
							...entry,
						};
					}
					return { priority: -1, ...entry };
				}),
			);
		});

		const metaItems = footerItems.flatMap((category) =>
			category.items.map((item) => ({
				type: category.title,
				link: item.to,
				label: item.name,
				icon: category.icon,
				date: new Date(),
			})),
		);

		this.filters.push((search) =>
			metaItems.map((item) => {
				if (item.label.toLowerCase() === search.toLowerCase()) return { priority: 0, ...item };
				if (item.label.toLowerCase().startsWith(search.toLowerCase()))
					return { priority: 1, ...item };
				if (item.label.toLowerCase().includes(search.toLowerCase()))
					return { priority: 2, ...item };
				return { priority: -1, ...item };
			}),
		);
	},
});
</script>
