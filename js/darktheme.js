const currentTheme = localStorage.getItem('theme');
const css = document.getElementById('darkcss')
const btn = document.getElementById('DarkMode')

const text_off  = '<i style="margin-right: 5px" class="fas fa-sun"></i> Dark Mode'
const text_auto = '<i style="margin-right: 5px" class="fas fa-adjust"></i> Dark Mode'
const text_on   = '<i style="margin-right: 5px" class="fas fa-moon"></i> Dark Mode'

// update btn
if (currentTheme) {
	if (currentTheme == 'dark') { btn.innerHTML = text_on }
	if (currentTheme == 'dark-auto') { btn.innerHTML = text_auto }
	if (currentTheme == 'light') { btn.innerHTML = text_off }
} else {
	localStorage.setItem('theme', 'dark-auto'); // if the user come for the first time
}

changeMod(false)

function changeMod(change) {

	// true if the btn is it, false otherwise
	if (change) {
		if (btn.innerHTML == text_auto) {
			btn.innerHTML = text_on;
			localStorage.setItem('theme', 'dark');

		} else if (btn.innerHTML == text_on) {
			btn.innerHTML = text_off;
			localStorage.setItem('theme', 'light');

		} else if (btn.innerHTML == text_off) {
			btn.innerHTML = text_auto;
			localStorage.setItem('theme', 'dark-auto');

		}
	}

	// update theme
	var theme = localStorage.getItem('theme')
	if ( theme == 'dark' || (theme == 'dark-auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		css.href = "/css/dark.css"
	} else { 
		css.href = ""
	}
}