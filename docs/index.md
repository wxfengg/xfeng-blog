---
layout: home

hero:
  name: "XFeng's Blog"
  text: "一名程序员的博客"
  tagline: 记录我的碎碎念~
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: 博客
      link: /blogs/FLIP
    - theme: alt
      text: 去博客
      link: /blogs/FLIP
    # - theme: alt
    #   text: 组件展示
    #   link: /apple-components
    # - theme: alt
    #   text: xfeng-admin
    #   link: https://github.com/wxfengg/xfeng-admin
    # - theme: alt
    #   text: 图片压缩工具
    #   link: https://github.com/wxfengg/ImageCompressionTool
    # - theme: alt
    #   text: 毕设项目-智慧养老
    #   link: https://wuxufeng.top

features:
  - title: XFeng
    icon:
      src: /emoji1.svg
    details: 一名程序员。在职前端工程师，也会点Java，喜欢一切有趣的事情~</br></br>如果你有任何想法可以和我一起交流：wxfengg@gmail.com
  - title: 打游戏
    icon:
      src: /emoji2.svg
    details: 下班回家喜欢躺，平时没事喜欢打打游戏🎮</br></br>CF校长 or 王者农药
  - title: 诗和远方
    icon:
      src: /emoji3.svg
    details: 喜欢旅游、探险 却 心有余而力不足😅</br></br>懒🛏</br></br>永远相信美好的事情即将发生💗
---

<script setup>
import { mdList } from "../docs/setting.ts";
</script>

<div style="margin-top: 40px;">

<!-- ## 🔍 快速搜索

<div style="max-width: 600px; margin: 0 auto 40px;">
  <AppleSearch
    placeholder="搜索博客内容、项目或工具..."
    :results="searchResults"
    @search="handleSearch"
    @select="handleSearchSelect"
  />
</div> -->

<!-- ## 🎉 互动体验

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 32px 0;">
  <AppleButton
    variant="primary"
    text="✅ 成功通知"
    @click="showSuccessNotification"
    style="width: 100%;"
  />
  <AppleButton
    variant="secondary"
    text="ℹ️ 信息通知"
    @click="showInfoNotification"
    style="width: 100%;"
  />
  <AppleButton
    variant="outline"
    text="⚠️ 警告通知"
    @click="showWarningNotification"
    style="width: 100%;"
  />
  <AppleButton
    variant="danger"
    text="❌ 错误通知"
    @click="showErrorNotification"
    style="width: 100%;"
  />
</div>

<script setup>
import { ref } from 'vue'
import { $notify } from './.vitepress/theme/composables/useNotification.js'

// 搜索数据
const searchResults = ref([
  {
    id: 1,
    title: 'XFeng的个人介绍',
    description: '了解更多关于我的背景和技能',
    type: '页面',
    icon: '👤'
  },
  {
    id: 2,
    title: '苹果风格组件库',
    description: '完整的UI组件展示和使用方法',
    type: '组件',
    icon: '🎨'
  },
  {
    id: 3,
    title: 'XFeng Admin 管理系统',
    description: '基于Vue3的现代化管理系统',
    type: '项目',
    icon: '🛠️'
  },
  {
    id: 4,
    title: '图片压缩工具',
    description: '高效的图片压缩解决方案',
    type: '工具',
    icon: '🖼️'
  },
  {
    id: 5,
    title: '学习笔记',
    description: '技术学习和经验总结',
    type: '博客',
    icon: '📚'
  }
])

// 搜索处理
const handleSearch = (query) => {
  console.log('搜索:', query)
  // 这里可以添加实际的搜索逻辑
}

const handleSearchSelect = (result) => {
  console.log('选择结果:', result)
  $notify.success(`你选择了: ${result.title}`, {
    title: '搜索选择'
  })
}

// 通知演示
const showSuccessNotification = () => {
  $notify.success('操作成功完成！', {
    title: '成功',
    duration: 3000
  })
}

const showInfoNotification = () => {
  $notify.info('这是一条信息提示，帮助你了解当前状态。', {
    title: '信息',
    duration: 4000
  })
}

const showWarningNotification = () => {
  $notify.warning('请注意，这个操作可能会有一些风险。', {
    title: '警告',
    duration: 5000
  })
}

const showErrorNotification = () => {
  $notify.error('抱歉，操作失败了，请稍后再试。', {
    title: '错误',
    duration: 6000
  })
}
</script> -->

<!-- ## 快速开始

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin: 32px 0;">

<AppleCard
  title="探索博客"
  subtitle="阅读我的技术分享和生活感悟"
  icon="📖"
>
  在这里，你可以找到我的技术文章、学习笔记以及一些生活感悟。每一篇文章都是我真实的思考和经验分享。

  <template #footer>
    <div style="display: flex; gap: 8px;">
      <AppleButton size="small" variant="primary" text="开始阅读" href="/blogs/XFeng" />
      <AppleButton size="small" variant="secondary" text="最新文章" href="/blogs/learning" />
    </div>
  </template>
</AppleCard>

<AppleCard
  title="设计系统"
  subtitle="查看苹果风格的UI组件"
  icon="🎨"
>
  我为这个博客创建了一套完整的苹果风格设计系统，包含卡片、按钮等多种组件，具有毛玻璃效果和流畅动画。

  <template #footer>
    <div style="display: flex; gap: 8px;">
      <AppleButton size="small" variant="secondary" text="组件展示" href="/apple-components" />
      <AppleButton size="small" variant="secondary" text="设计理念" href="/apple-components#设计特色" />
    </div>
  </template>
</AppleCard>

<AppleCard
  title="开源项目"
  subtitle="我的GitHub开源贡献"
  icon="💻"
>
  我热衷于开源，在GitHub上维护着多个项目，包括管理系统、工具类应用等，欢迎star和贡献代码。

  <template #footer>
    <div style="display: flex; gap: 8px;">
      <AppleButton size="small" variant="secondary" text="访问GitHub" href="https://github.com/wxfengg" />
      <AppleButton size="small" variant="secondary" text="项目列表" href="https://github.com/wxfengg?tab=repositories" />
    </div>
  </template>
</AppleCard>

</div> -->

<!-- ## 技术栈

<div style="margin: 32px 0;">

  这个博客使用了现代化的技术栈，结合苹果设计语言，打造出优雅的用户体验：

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 24px;">
    <AppleCard variant="outlined" icon="⚡">
      <strong>VitePress</strong><br>
      静态站点生成器，快速且现代化
    </AppleCard>
    <AppleCard variant="outlined" icon="🎭">
      <strong>Vue 3</strong><br>
      组合式API，响应式设计
    </AppleCard>
    <AppleCard variant="outlined" icon="🎨">
      <strong>CSS 毛玻璃</strong><br>
      backdrop-filter 实现现代感效果
    </AppleCard>
    <AppleCard variant="outlined" icon="📱">
      <strong>响应式设计</strong><br>
      适配所有设备尺寸
    </AppleCard>
    <AppleCard variant="outlined" icon="🌙">
      <strong>深色模式</strong><br>
      自动适应系统主题
    </AppleCard>
    <AppleCard variant="outlined" icon="♿">
      <strong>无障碍设计</strong><br>
      支持键盘导航和屏幕阅读器
    </AppleCard>
  </div>
</div> -->

<!-- ## 联系我

<div style="margin: 32px 0;">
  <AppleCard  icon="📬" style="text-align: center;">
    <div>
      <h3 style="margin: 0 0 12px 0;">保持联系</h3>
      <p style="margin: 0 0 20px 0; opacity: 0.9;">如果你有任何问题、建议或者想要交流技术，欢迎通过以下方式联系我：</p>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <AppleButton variant="secondary" leftIcon="📧" text="邮箱" href="mailto:wxfengg@gmail.com" />
        <AppleButton variant="secondary" leftIcon="💻" text="GitHub" href="https://github.com/wxfengg" />
        <AppleButton variant="secondary" leftIcon="🌐" text="个人网站" href="https://wuxufeng.top" />
      </div>
    </div>
  </AppleCard>
</div> -->

</div>

<AppleCard>
  <VisitorPanel />
</AppleCard>
