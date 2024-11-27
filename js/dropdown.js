const DROPDOWN_SHOW_CLASS = "show";

/**
 * Toggle my item and untoggle all others
 * @param {HTMLElement} item
 */
function toggleDropdown(item) {
	const itemExpanded = item.parentNode.classList.contains(DROPDOWN_SHOW_CLASS);
	if (!itemExpanded) {
		// if not expanded, go untoggle all other siblings
		Array.from(item.parentNode.children)
			.filter((el) => el !== item && el.classList.contains(DROPDOWN_SHOW_CLASS))
			.forEach((otherParent) => otherParent.classList.remove(DROPDOWN_SHOW_CLASS));
	}

	// then toggle me
	item.parentNode.classList.toggle(DROPDOWN_SHOW_CLASS);
}

document.addEventListener("DOMContentLoaded", () => {
	document
		.querySelectorAll('[data-toggle="dropdown"]')
		.forEach((/** @type {HTMLElement} */ item) => {
			// add click listener to toggle dropdowns
			item.addEventListener("click", () => void toggleDropdown(item));
		});
});
