module.exports = {
	options: {
		debug: true,
		func: {
			list: ['i18n.t'],
			extensions: ['.js'],
		},
		trans: false,
		lngs: ['en', 'fr', 'es', 'pt-BR'],
		ns: ['translation'],
		defaultLng: 'pt-BR',
		defaultNs: 'translation',
		defaultValue: (lng, ns, key) => '',
		resource: {
			loadPath: 'src/i18n/locales/{{lng}}.json',
			savePath: 'src/i18n/locales/{{lng}}.json',
			jsonIndent: 4,
		},
		nsSeparator: ':',
		keySeparator: '.',
	},
}
