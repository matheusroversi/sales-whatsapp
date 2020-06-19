import i18next from 'i18next'
import { en, fr, es, ptBr } from './locales'
import LngDetector from 'i18next-browser-languagedetector'

const i18n = i18next.createInstance()

i18n.use(LngDetector).init({
	debug: true,
	// lng: 'pt-BR',   a lib  LngDetector sobrescreve isso, então nao precisamos inicializar, e para nao gerar ambiguidade de config, optamos por remover.
	fallbackLng: 'pt-BR',
	defaultNs: 'translation',
})

i18n.addResourceBundle('pt-BR', 'translation', ptBr)
i18n.addResourceBundle('en', 'translation', en)
i18n.addResourceBundle('fr', 'translation', fr)
i18n.addResourceBundle('es', 'translation', es)

export default i18n
