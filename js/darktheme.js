const css = document.getElementById('darkcss')
const btn = document.getElementById('DarkMode')

Object.defineProperty(window, 'currentTheme', {
  get() {
    return localStorage.getItem('theme')
  },
  set(value) {
    localStorage.setItem('theme', value)
  }
})

const text_light_mode  = '<i style="margin-right: 5px" class="fas fa-sun"></i> Light Theme'
const text_auto_mode = '<i style="margin-right: 5px" class="fas fa-adjust"></i> Auto Theme'
const text_dark_mode   = '<i style="margin-right: 5px" class="fas fa-moon"></i> Dark Theme'

// update btn
if (currentTheme == 'dark') btn.innerHTML = text_dark_mode
else if (currentTheme == 'auto') btn.innerHTML = text_auto_mode
else if (currentTheme == 'light') btn.innerHTML = text_light_mode
else currentTheme = 'auto' // if the user comes for the first time

changeMod(false)

function changeMod(change) {

	// true if the btn calls the method, false otherwise
	if (change) {
		if (currentTheme == 'auto') {
			btn.innerHTML = text_dark_mode;
			currentTheme = 'dark'

		} else if (currentTheme == 'dark') {
			btn.innerHTML = text_light_mode
			currentTheme = 'light'

		} else if (currentTheme == 'light') {
			btn.innerHTML = text_auto_mode
			currentTheme = 'auto'
		}
	}

	// update theme
	if ( currentTheme == 'dark' || (currentTheme == 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		css.href = "/css/dark.css"
	} else {
		css.href = ""
	}
}
