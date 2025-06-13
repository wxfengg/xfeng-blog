// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { inBrowser, useRoute, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import busuanzi from "busuanzi.pure.js"
import './style.css'
import VisitorPanel from './components/VisitorPanel.vue'
import BlogHead from './components/BlogHead.vue'
import AppleBackground from './components/AppleBackground.vue'
import AppleNavEnhancement from './components/AppleNavEnhancement.vue'
import AppleCard from './components/AppleCard.vue'
import AppleButton from './components/AppleButton.vue'
import AppleLoadingSpinner from './components/AppleLoadingSpinner.vue'
import AppleTooltip from './components/AppleTooltip.vue'
import AppleTabs from './components/AppleTabs.vue'
import AppleModal from './components/AppleModal.vue'
import AppleProgressBar from './components/AppleProgressBar.vue'
import AppleNotification from './components/AppleNotification.vue'
import AppleSearch from './components/AppleSearch.vue'
import AppleFloatingActionButton from './components/AppleFloatingActionButton.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp(ctx) {
    const { app, router, siteData } = ctx

    app.component("VisitorPanel", VisitorPanel)
    app.component("BlogHead", BlogHead)
    app.component("AppleBackground", AppleBackground)
    app.component("AppleNavEnhancement", AppleNavEnhancement)
    app.component("AppleCard", AppleCard)
    app.component("AppleButton", AppleButton)
    app.component("AppleLoadingSpinner", AppleLoadingSpinner)
    app.component("AppleTooltip", AppleTooltip)
    app.component("AppleTabs", AppleTabs)
    app.component("AppleModal", AppleModal)
    app.component("AppleProgressBar", AppleProgressBar)
    app.component("AppleNotification", AppleNotification)
    app.component("AppleSearch", AppleSearch)
    app.component("AppleFloatingActionButton", AppleFloatingActionButton)
    if (inBrowser) {
      router.onAfterRouteChange = () => {
        busuanzi.fetch()
      }
    }
  },
} satisfies Theme
