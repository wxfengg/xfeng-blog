import { defineConfig } from "vitepress";
import { mdList } from "../setting";

export default defineConfig({
  title: "XFeng's Blog",
  titleTemplate: "博客~",
  description: "A VitePress Site",
  ignoreDeadLinks: true,
  // header标签里面插入的内容
  head: [["link", { rel: "icon", href: "/xfeng-blog/flag.svg" }]],
  //启用深色模式
  appearance: "dark",
  themeConfig: {
    // 网站的logo
    logo: "/avatar_ac.png",
    // 文章右侧大纲目录
    outline: {
      level: [2, 6],
      label: "目录",
    },
    //自定义上下页名
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    // 主题切换文字
    darkModeSwitchTitle: "切换到深色模式",
    lightModeSwitchTitle: "切换到浅色模式",
    // 返回顶部label文字
    returnToTopLabel: "返回顶部",
    // 搜索
    // search: {
    //   provider: "local",
    // },
    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © BY XFeng | wxfengg@gmail.com",
    },
    // 文档的最后更新时间
    lastUpdatedText: "最后更新于",
    // 文档的更新时间
    lastUpdated: {
      text: "时间",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "medium",
      },
    },
    // 导航栏按钮
    nav: [
      { text: "首页", link: "/" },
      { text: "博客", link: mdList[0].link },
      { text: "组件展示", link: "/apple-components" },
    ],
    // 侧边栏
    sidebar: [
      {
        text: "博客",
        items: mdList,
      },
    ],
    // 社交链接
    socialLinks: [{ icon: "github", link: "https://github.com/wxfengg" }],
    // 404找不到页面
    notFound: {
      title: "抱歉，您访问的资源不存在",
      quote:
        "您好，您访问的资源不存在或已被删除。如果您有什么需求或建议， 请联系我。 邮箱：wxfengg@gmail.com",
      linkText: "返回首页",
    },
  },
  // 部署的时候需要注意该参数避免样式丢失
  base: "/xfeng-blog/",
});
