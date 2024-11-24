/* global Element, Event */

function siblingElements(element) {
  if (element.parentNode === null) return []
  return Array.from(element.parentNode.children).filter((el) => el !== element)
}

const DROPDOWN_SHOW_CLASS = 'show'

// at initialization
document.querySelectorAll('[data-toggle="dropdown"]').forEach((item) => {
  // add click listener to toggle dropdowns
  item.addEventListener('click', () => toggleDropdown(item))
})

// toggle my item and untoggle all others
function toggleDropdown(item) {
  const itemExpanded = item.parentNode.classList.contains(DROPDOWN_SHOW_CLASS)

  if (!itemExpanded) { // if not expanded, go untoggle all other siblings
    siblingElements(item.parentNode)
      .filter((el) => el.classList.contains(DROPDOWN_SHOW_CLASS))
      .forEach((otherParent) => otherParent.classList.remove(DROPDOWN_SHOW_CLASS))
  }

  // then toggle me
  item.parentNode.classList.toggle(DROPDOWN_SHOW_CLASS)
}

document.querySelectorAll('[data-toggle="collapse"]').forEach((item) => {
  item.dataset.expanded = false
  item.addEventListener('click', () => toggleMenu(item))
})

function toggleMenu(item) {
  let expandNow = true
  if (item.dataset.expanded === 'true') expandNow = false

  item.classList.toggle('collapsed', expandNow)
  getNextElement(item, item.dataset.target).classList.toggle('show', expandNow)
  item.dataset.expanded = expandNow
}

function getNextElement(element, selector) {
  let next = element.nextElementSibling
  while (next) {
    if (next.matches(selector)) return next
    next = next.nextElementSibling
  }
}

// fix non centered icons
document.addEventListener('DOMContentLoaded', () => {
  window.dispatchEvent(new Event('resize'))

  // set sticky menu
  const topNavbar = document.getElementById('topNavbar')
  const topNavbarParent = topNavbar.parentElement

  function changeTopNavbar() {
    const topNavbarHeight = topNavbar.offsetHeight
    const isScrolling = window.scrollY > (topNavbar.offsetTop + topNavbarHeight)
    topNavbar.classList.toggle('fixed', isScrolling)

    topNavbarParent.style.paddingTop = isScrolling ? topNavbarHeight + 'px' : '0px'
  }

  changeTopNavbar() // Fix when reloading page already scrolled down, for example home page

  window.addEventListener('scroll', changeTopNavbar, true)
})

// load snow script only in december
if (new Date().getMonth() === 11 && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = '/js/snow.js';
  document.head.appendChild(script);
}