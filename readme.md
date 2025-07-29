# XFeng's Blogs

一名程序员的博客，记录我的碎碎念~

🌍WebSite： http://wuxufeng.top/blogs

## 项目概述

这是一个使用 VitePress 构建的个人博客，具有自定义的苹果风格设计系统和毛玻璃效果。网站包含博客文章、自定义 Vue 组件，以及支持暗色模式的响应式 UI。

## 开发命令

- **开发服务器**: `pnpm dev` - 启动 VitePress 开发服务器并自动打开浏览器
- **构建**: `pnpm build` - 构建生产环境的静态站点
- **预览**: `pnpm preview` - 本地预览生产构建版本
- **包管理器**: 使用 `pnpm` (版本 8.14.0)

## 架构

### 文件结构
- `/docs/` - 主要内容目录 (VitePress 标准)
  - `index.md` - 主页，包含英雄区域和功能卡片
  - `blogs/` - 博客文章 markdown 文件
  - `.vitepress/` - VitePress 配置和主题
    - `config.ts` - VitePress 主配置文件
    - `theme/` - 自定义主题实现
      - `components/` - 自定义苹果风格 Vue 组件
      - `composables/` - Vue 组合式函数 (通知等)
      - `style.css` - 全局样式和 CSS 变量

### 核心技术
- **VitePress**: 支持 Vue 3 的静态站点生成器
- **Vue 3**: 使用组合式 API 的组件框架
- **TypeScript**: 配置和组件类型定义
- **CSS**: 使用 backdrop-filter 的自定义毛玻璃效果
- **Giscus**: 评论系统集成
- **Busuanzi**: 访客统计分析

### 自定义组件系统
网站拥有完整的苹果风格设计系统，位于 `docs/.vitepress/theme/components/`：
- `AppleCard.vue` - 带毛玻璃效果的主要内容卡片
- `AppleButton.vue` - 具有悬停效果的交互按钮
- `AppleNotification.vue` - 弹窗通知系统
- `AppleModal.vue` - 模态对话框
- `AppleSearch.vue` - 搜索界面
- `AppleTabs.vue` - 标签页导航
- `VisitorPanel.vue` - 统计数据显示

### 配置说明
- **基础 URL**: 设置为 `/blogs` 用于 GitHub Pages 部署
- **主题**: 默认启用暗色模式，支持明暗切换
- **国际化**: 中文语言界面 (侧边栏、导航等)
- **图标**: 使用 `/flag.svg` 作为 favicon

### 内容结构
- 博客文章位于 `/docs/blogs/`，使用 `.md` 扩展名
- 图片资源存储在 `/docs/blogs/assets/` 中
- 导航配置在 `.vitepress/config.ts` 的侧边栏部分

## 开发指南

### 添加新博客文章
1. 在 `/docs/blogs/` 中创建新的 `.md` 文件
2. 添加包含标题、日期和描述的 frontmatter
3. 更新 `.vitepress/config.ts` 中的侧边栏导航

### 组件开发
- 遵循 Vue 3 组合式 API 模式
- 使用 TypeScript 进行属性定义
- 保持苹果设计语言的一致性
- 实现适当的无障碍功能

### 样式规范
- 使用 `style.css` 中定义的 CSS 自定义属性
- 遵循毛玻璃设计模式
- 确保所有屏幕尺寸的响应式设计
- 支持明暗两种主题