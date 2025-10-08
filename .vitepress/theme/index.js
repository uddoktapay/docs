import DefaultTheme from 'vitepress/theme'
import SettingsCard from './components/SettingsCard.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('SettingsCard', SettingsCard)
    }
}