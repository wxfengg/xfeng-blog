// https://vitepress.dev/guide/custom-theme
import { h } from "vue"
import { inBrowser, type Theme } from "vitepress"
import DefaultTheme from "vitepress/theme"
import Layout from "./Layout.vue"
import busuanzi from "busuanzi.pure.js"
import "./style.css"

// 自动导入 components 目录下所有 .vue 组件
const modules = import.meta.glob("./components/*.vue", { eager: true }) as Record<string, { default: any }>

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router }) {
    // 自动注册所有组件（文件名即组件名）
    for (const path in modules) {
      const componentName = path.match(/\/([^/]+)\.vue$/)?.[1]
      if (componentName) {
        app.component(componentName, modules[path].default)
      }
    }

    if (inBrowser) {
      router.onAfterRouteChange = () => {
        busuanzi.fetch()
      }
    }
  },
} satisfies Theme
