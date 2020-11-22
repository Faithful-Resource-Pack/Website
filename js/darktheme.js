const currentTheme = localStorage.getItem('theme');
const css = document.getElementById('darkcss')
const btn = document.getElementById('DarkMode')

const text_light_mode  = '<i style="margin-right: 5px" class="fas fa-sun"></i> Light Theme'
const text_auto_mode = '<i style="margin-right: 5px" class="fas fa-adjust"></i> Auto Theme'
const text_dark_mode   = '<i style="margin-right: 5px" class="fas fa-moon"></i> Dark Theme'

// update btn
if (currentTheme) {
	if (currentTheme == 'dark') { btn.innerHTML = text_dark_mode }
	if (currentTheme == 'auto') { btn.innerHTML = text_auto_mode }
	if (currentTheme == 'light') { btn.innerHTML = text_light_mode }
} else {
	localStorage.setItem('theme', 'auto'); // if the user comes for the first time
}

changeMod(false)

function changeMod(change) {

	// true if the btn calls the method, false otherwise
	if (change) {
		if (btn.innerHTML == text_auto_mode) {
			btn.innerHTML = text_dark_mode;
			localStorage.setItem('theme', 'dark');

		} else if (btn.innerHTML == text_dark_mode) {
			btn.innerHTML = text_light_mode;
			localStorage.setItem('theme', 'light');

		} else if (btn.innerHTML == text_light_mode) {
			btn.innerHTML = text_auto_mode;
			localStorage.setItem('theme', 'auto');

		}
	}

	// update theme
	var theme = localStorage.getItem('theme')
	if ( theme == 'dark' || (theme == 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		css.href = "/css/dark.css"
	} else {
		css.href = ""
	}
}
