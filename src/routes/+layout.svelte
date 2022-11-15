<script>
	import { onMount } from "svelte";
	import Header from "../components/header.svelte";
	import "../css/app.scss";
	import "../css/light.scss";

	onMount(() => {
		Element.prototype.siblingElements = function () {
			if (this.parentNode === null) return [];

			return [...this.parentNode.children].filter((el) => el !== this);
		};

		const DROPDOWN_SHOW_CLASS = "show";

		document.querySelectorAll('[data-toggle="dropdown"]').forEach((item) => {
			// add click listener to toggle dropdowns
			item.addEventListener("click", () => {
				toggleDropdown(item);
			});
		});

		// function made to toggle my item and untoggle all others
		function toggleDropdown(item) {
			const itemExpanded = item.parentNode.classList.contains(DROPDOWN_SHOW_CLASS);

			if (!itemExpanded) {
				// if I am not expanded, go untoggle all other siblings
				item.parentNode
					.siblingElements()
					.filter((el) => el.classList.contains(DROPDOWN_SHOW_CLASS))
					.forEach((otherParent) => {
						otherParent.classList.remove(DROPDOWN_SHOW_CLASS);
					});
			}

			// then toggle me
			item.parentNode.classList.toggle(DROPDOWN_SHOW_CLASS);
		}
	});
</script>

<Header />

<slot />
