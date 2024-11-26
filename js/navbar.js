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

/**
 * @param {HTMLElement} element
 * @param {string} selector
 */
function getNextElement(element, selector) {
	let next = element.nextElementSibling;
	while (next) {
		if (next.matches(selector)) return next;
		next = next.nextElementSibling;
	}
}

/**
 * @param {HTMLElement} item
 */
function toggleMenu(item) {
	const expandNow = item.dataset.expanded !== "true";
	item.classList.toggle("collapsed", expandNow);
	getNextElement(item, item.dataset.target).classList.toggle("show", expandNow);
	item.dataset.expanded = expandNow;
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll('[data-toggle="dropdown"]').forEach((item) => {
		// add click listener to toggle dropdowns
		item.addEventListener("click", () => toggleDropdown(item));
	});

	document.querySelectorAll('[data-toggle="collapse"]').forEach((item) => {
		item.dataset.expanded = false;
		item.addEventListener("click", () => toggleMenu(item));
	});

	// fix non centered icons
	window.dispatchEvent(new Event("resize"));
});
