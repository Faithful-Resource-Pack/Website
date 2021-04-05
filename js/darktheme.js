/* global localStorage */

const css = document.getElementById('darkcss')
const btn = document.getElementById('DarkMode')

const THEME_VALUES = [
  {
    value: 'auto',
    html: '<i style="margin-right: 5px" class="fas fa-adjust"></i> Auto Theme'
  },
  {
    value: 'dark',
    html: '<i style="margin-right: 5px" class="fas fa-moon"></i> Dark Theme'
  },
  {
    value: 'light',
    html: '<i style="margin-right: 5px" class="fas fa-sun"></i> Light Theme'
  }
]

const THEME_DEFAULT_VALUE = THEME_VALUES[0].value
const THEME_LOCALSTORAGE_KEY = 'theme'

window.theme = {
  get currentTheme() {
    return localStorage.getItem(THEME_LOCALSTORAGE_KEY) || THEME_DEFAULT_VALUE
  },
  set currentTheme(value) {
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, value)
  },

  get currentThemeIndex() {
    return THEME_VALUES.findIndex(el => el.value === this.currentTheme)
  },
  set currentThemeIndex(_v) {},

  get currentThemeHTML() {
    return THEME_VALUES[this.currentThemeIndex].html
  },
  set currentThemeHTML(_v) {},

  get nextTheme() {
    return THEME_VALUES[(this.currentThemeIndex + 1) % THEME_VALUES.length].value
  },
  set nextTheme(_v) {}
}

// update btn
btn.innerHTML = theme.currentThemeHTML

window.changeMod = change => {
  // true if the btn calls the method, false otherwise
  if (change) {
    window.theme.currentTheme = theme.nextTheme
    btn.innerHTML = theme.currentThemeHTML
  }

  // update theme
  if (theme.currentTheme === 'dark' || (theme.currentTheme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches)) {
    css.href = '/css/dark.css'
  } else {
    css.href = ''
  }
}

changeMod(false)
