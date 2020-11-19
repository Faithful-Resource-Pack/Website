const currentTheme = localStorage.getItem('theme');
const css = document.getElementById('darkcss')
const btn = document.getElementById('DarkMode')

if (currentTheme) {
	if (currentTheme == 'dark') { btn.innerHTML = 'Dark Mode (ON)' }
	if (currentTheme == 'dark-auto') { btn.innerHTML = 'Dark Mode (Auto)' }
	if (currentTheme == 'light') { btn.innerHTML = 'Dark Mode (OFF)' }
}

changeMod()

function changeMod(change) {

	if (change) {
		if (btn.innerHTML == 'Dark Mode (Auto)') {
			btn.innerHTML = 'Dark Mode (ON)';
			localStorage.setItem('theme', 'dark');

		} else if (btn.innerHTML == 'Dark Mode (ON)') {
			btn.innerHTML = 'Dark Mode (OFF)';
			localStorage.setItem('theme', 'light');

		} else if (btn.innerHTML == 'Dark Mode (OFF)') {
			btn.innerHTML = 'Dark Mode (Auto)';
			localStorage.setItem('theme', 'dark-auto');

		}
	}

	var theme = localStorage.getItem('theme')

	if ( theme == 'dark' || (theme == 'dark-auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		css.href = "./css/dark.css"
	} else { 
		css.href = ""
	}
}

/*
function switchTheme(e) {
	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
	}
	else {        
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light');
	}
}

*/