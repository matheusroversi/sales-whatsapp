const STORAGE_KEY_THEME = 'color-scheme'

const storage = {
	getTheme: defaultTheme =>
		localStorage.getItem(STORAGE_KEY_THEME) || defaultTheme,

	setTheme: theme => localStorage.setItem(STORAGE_KEY_THEME, theme),
}

export default storage
