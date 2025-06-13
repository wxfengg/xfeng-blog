# 苹果风格组件展示

这个页面展示了我们创建的苹果风格组件集合。

## AppleLoadingSpinner 加载组件

### 基础加载器

<div style="padding: 40px; background: var(--vp-c-surface-1); border-radius: var(--vp-radius-medium); margin: 20px 0;">
  <AppleLoadingSpinner text="加载中..." />
</div>

### 全屏加载器

<AppleButton @click="showFullScreenLoader = true" text="显示全屏加载" />

## AppleProgressBar 进度条组件

### 基础进度条

<div style="margin: 20px 0;">
  <AppleProgressBar :percentage="75" />
</div>

### 不同颜色的进度条

<div style="display: flex; flex-direction: column; gap: 16px; margin: 20px 0;">
  <AppleProgressBar :percentage="60" text="主要进度" />
  <AppleProgressBar :percentage="85" color="#34C759" text="成功状态" />
  <AppleProgressBar :percentage="45" color="#FF9500" text="警告状态" />
  <AppleProgressBar :percentage="25" color="#FF3B30" text="错误状态" />
</div>

## AppleTabs 标签页组件

<AppleTabs 
  :tabs="[
    { key: 'overview', label: '概览', icon: '📊' },
    { key: 'settings', label: '设置', icon: '⚙️' },
    { key: 'profile', label: '个人资料', icon: '👤' }
  ]"
  v-model="activeTab"
>
  <div v-if="activeTab === 'overview'">
    <AppleCard title="数据概览" icon="📈">
      这里是概览页面的内容。显示网站的访问统计、用户活跃度等关键指标。
    </AppleCard>
  </div>
  
  <div v-if="activeTab === 'settings'">
    <AppleCard title="系统设置" icon="🔧">
      在这里你可以配置网站的各种设置，包括主题、语言、通知等选项。
    </AppleCard>
  </div>
  
  <div v-if="activeTab === 'profile'">
    <AppleCard title="个人资料" icon="📝">
      管理你的个人信息，包括头像、昵称、联系方式等。
    </AppleCard>
  </div>
</AppleTabs>

## AppleModal 模态框组件

<div style="display: flex; gap: 12px; margin: 20px 0;">
  <AppleButton @click="showSmallModal = true" text="小型模态框" />
  <AppleButton @click="showMediumModal = true" text="中型模态框" />
  <AppleButton @click="showLargeModal = true" text="大型模态框" />
</div>

<!-- 模态框实例 -->
<AppleModal v-model="showSmallModal" title="小型模态框" size="small">
  <p>这是一个小型的苹果风格模态框，适合显示简单的信息或确认对话。</p>
  <template #footer>
    <AppleButton variant="secondary" text="取消" @click="showSmallModal = false" />
    <AppleButton variant="primary" text="确认" @click="showSmallModal = false" />
  </template>
</AppleModal>

<AppleModal v-model="showMediumModal" title="中型模态框" size="medium">
  <div>
    <p>这是一个中型的苹果风格模态框，可以显示更多内容和复杂的交互。</p>
    <AppleProgressBar :percentage="progressValue" text="处理进度" />
    <div style="margin: 20px 0;">
      <AppleButton @click="updateProgress" text="更新进度" size="small" />
    </div>
  </div>
  <template #footer>
    <AppleButton variant="outline" text="重置" @click="resetProgress" />
    <AppleButton variant="primary" text="完成" @click="showMediumModal = false" />
  </template>
</AppleModal>

<AppleModal v-model="showLargeModal" title="大型模态框" size="large">
  <div>
    <h4>功能展示</h4>
    <p>这个大型模态框展示了多个组件的组合使用：</p>
    
    <AppleTabs 
      :tabs="[
        { key: 'info', label: '信息', icon: 'ℹ️' },
        { key: 'settings', label: '设置', icon: '⚙️' }
      ]"
      v-model="modalTab"
    >
      <div v-if="modalTab === 'info'">
        <AppleCard title="信息卡片" subtitle="在模态框中使用卡片">
          这演示了如何在模态框中嵌套其他组件，创造丰富的用户界面。
        </AppleCard>
      </div>
      
      <div v-if="modalTab === 'settings'">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <AppleProgressBar :percentage="80" text="存储使用率" />
          <AppleProgressBar :percentage="45" color="#34C759" text="内存使用率" />
          <AppleProgressBar :percentage="30" color="#FF9500" text="CPU使用率" />
        </div>
      </div>
    </AppleTabs>
  </div>
  <template #footer>
    <AppleButton variant="danger" text="删除" />
    <AppleButton variant="secondary" text="取消" @click="showLargeModal = false" />
    <AppleButton variant="primary" text="保存" @click="showLargeModal = false" />
  </template>
</AppleModal>

<script setup>
import { ref } from 'vue'
import { $notify } from './.vitepress/theme/composables/useNotification.js'

// Tab state
const activeTab = ref('overview')
const modalTab = ref('info')

// Modal states
const showSmallModal = ref(false)
const showMediumModal = ref(false)
const showLargeModal = ref(false)
const showFullScreenLoader = ref(false)

// Progress state
const progressValue = ref(45)

// Search demo data
const searchDemoResults = ref([
  {
    id: 1,
    title: '苹果风格设计系统',
    description: '完整的UI组件库和设计规范',
    type: '设计',
    icon: '🎨'
  },
  {
    id: 2,
    title: 'VitePress博客搭建',
    description: '从零开始搭建现代化博客',
    type: '教程',
    icon: '📖'
  },
  {
    id: 3,
    title: 'Vue 3组件开发',
    description: '响应式组件设计最佳实践',
    type: '技术',
    icon: '⚡'
  },
  {
    id: 4,
    title: 'CSS动画技巧',
    description: '创造流畅的用户体验',
    type: '前端',
    icon: '✨'
  }
])

// Demo handlers
const updateProgress = () => {
  progressValue.value = Math.min(progressValue.value + 20, 100)
}

const resetProgress = () => {
  progressValue.value = 0
}

const handleDemoSearch = (query) => {
  console.log('搜索查询:', query)
}

const handleDemoSelect = (result) => {
  $notify.success(`选择了: ${result.title}`, {
    title: '搜索选择',
    duration: 3000
  })
}

// Notification demos
const showDemoSuccess = () => {
  $notify.success('操作成功完成！这是一个成功通知的示例。', {
    title: '成功',
    duration: 3000
  })
}

const showDemoInfo = () => {
  $notify.info('这是一条信息通知，用于传达一般性信息给用户。', {
    title: '信息提示',
    duration: 4000
  })
}

const showDemoWarning = () => {
  $notify.warning('请注意，这个操作可能需要谨慎处理。', {
    title: '警告',
    duration: 5000
  })
}

const showDemoError = () => {
  $notify.error('抱歉，发生了一个错误，请检查后重试。', {
    title: '错误',
    duration: 6000
  })
}
</script>

## AppleCard 组件

### 基础卡片

<AppleCard 
  title="基础卡片" 
  subtitle="这是一个基础的苹果风格卡片"
  icon="🎨"
>
  这是卡片的内容区域。卡片具有毛玻璃效果、圆角和柔和的阴影，完美体现了苹果的设计语言。
</AppleCard>

### 不同变体的卡片

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">

<AppleCard 
  variant="elevated"
  title="升级版卡片" 
  subtitle="更强的阴影效果"
  icon="⬆️"
>
  这个卡片有更强的阴影效果，给人悬浮的感觉。
</AppleCard>

<AppleCard 
  variant="outlined"
  title="边框卡片" 
  subtitle="带有彩色边框"
  icon="🔲"
>
  这个卡片有明显的边框，突出显示重要内容。
</AppleCard>

<AppleCard 
  variant="filled"
  title="填充卡片" 
  subtitle="品牌色背景"
  icon="🎯"
>
  这个卡片使用品牌色作为背景，适合重要的行动呼吁。
</AppleCard>

</div>

## AppleButton 组件

### 不同样式的按钮

<div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0;">

<AppleButton variant="primary" text="主要按钮" />
<AppleButton variant="secondary" text="次要按钮" />
<AppleButton variant="outline" text="边框按钮" />
<AppleButton variant="ghost" text="幽灵按钮" />
<AppleButton variant="danger" text="危险按钮" />

</div>

### 不同尺寸的按钮

<div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin: 20px 0;">

<AppleButton size="small" text="小按钮" />
<AppleButton size="medium" text="中等按钮" />
<AppleButton size="large" text="大按钮" />

</div>

### 带图标的按钮

<div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0;">

<AppleButton leftIcon="📚" text="博客" />
<AppleButton rightIcon="🔗" text="链接" />
<AppleButton iconOnly icon="💻" />

</div>

### 加载状态

<div style="display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0;">

<AppleButton loading text="加载中..." />
<AppleButton disabled text="禁用状态" />

</div>

## 组合示例

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; margin: 40px 0;">

<AppleCard 
  title="博客文章管理" 
  subtitle="创建和管理你的博客内容"
  icon="📝"
>
  轻松创建、编辑和发布你的博客文章。支持 Markdown 语法，让写作变得更加便捷。

  <template #footer>
    <div style="display: flex; gap: 8px;">
      <AppleButton size="small" variant="primary" text="新建文章" />
      <AppleButton size="small" variant="secondary" text="查看全部" />
    </div>
  </template>
</AppleCard>

<AppleCard 
  title="数据统计" 
  subtitle="查看网站访问数据"
  icon="📊"
>
  实时监控网站的访问情况，了解用户行为和内容表现。

  <template #footer>
    <div style="display: flex; gap: 8px;">
      <AppleButton size="small" variant="outline" text="查看报告" />
      <AppleButton size="small" variant="ghost" text="导出数据" />
    </div>
  </template>
</AppleCard>

<AppleCard 
  title="个人设置" 
  subtitle="自定义你的个人资料"
  icon="⚙️"
>
  管理你的个人信息、偏好设置和账户安全。

  <template #footer>
    <div style="display: flex; gap: 8px;">
      <AppleButton size="small" variant="secondary" text="编辑资料" />
      <AppleButton size="small" variant="danger" text="删除账户" />
    </div>
  </template>
</AppleCard>

</div>

## AppleSearch 搜索组件

### 基础搜索

<div style="margin: 20px 0;">
  <AppleSearch
    placeholder="搜索博客、项目或工具..."
    :results="searchDemoResults"
    @search="handleDemoSearch"
    @select="handleDemoSelect"
  />
</div>

### 搜索功能特点

- **实时搜索**: 支持输入时实时搜索
- **智能高亮**: 搜索关键词高亮显示
- **键盘导航**: 支持方向键选择结果
- **类型分类**: 不同类型的搜索结果标识
- **无结果状态**: 友好的无搜索结果提示

## AppleNotification 通知组件

### 通知演示

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 20px 0;">
  <AppleButton variant="primary" text="成功通知" @click="showDemoSuccess" />
  <AppleButton variant="secondary" text="信息通知" @click="showDemoInfo" />
  <AppleButton variant="outline" text="警告通知" @click="showDemoWarning" />
  <AppleButton variant="danger" text="错误通知" @click="showDemoError" />
</div>

### 通知特性

- **多种类型**: 支持成功、信息、警告、错误四种类型
- **自定义位置**: 支持多个位置显示（右上、左上、右下等）
- **自动关闭**: 可设置自动关闭时间
- **手动关闭**: 支持点击关闭按钮
- **美观动画**: 流畅的进入和退出动画



## 设计特色

我们的苹果风格组件具有以下特色：

- **毛玻璃效果**：使用 `backdrop-filter` 创建现代感的透明效果
- **圆角设计**：统一的圆角半径，符合苹果的设计语言
- **柔和阴影**：多层次的阴影系统，创造深度感
- **流畅动画**：使用 cubic-bezier 缓动函数的平滑过渡
- **交互反馈**：悬浮、点击时的视觉反馈
- **响应式设计**：适配不同屏幕尺寸
- **深色模式支持**：自动适应明暗主题

这些组件完美体现了苹果的设计哲学：简约、优雅、功能性。