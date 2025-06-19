# 持续学习...
<BlogHead tags="学习📚"/>
📝记录一些没见过、没用过的知识，万一哪天重新用到了...

---

### **CSS**

#### `color-mix()` 函数

**代码举例：**

~~~css
background: color-mix(in srgb, var(--el-menu-active-color) 10%, transparent)
~~~

**参数说明：**

- `in srgb`: 指定颜色空间为 sRGB（标准红绿蓝色彩空间）
- `var(--el-menu-active-color) 10%`: 使用 CSS 自定义属性（CSS 变量）作为第一个颜色，占混合比例的 10%
- `transparent`: 第二个颜色是透明色，占剩余的 90%

**效果：** 这会创建一个半透明版本的背景颜色，透明度为 90%

**其他用法举例：**

~~~css
// 混合红色和蓝色，各占50%
background: color-mix(in srgb, red, blue);

// 红色占70%，蓝色占30%
background: color-mix(in srgb, red 70%, blue);

// 将主题色与白色混合，创建较浅的版本
background: color-mix(in srgb, var(--primary-color) 20%, white);

// 创建悬停效果
.button {
  background: var(--button-color);
  
  &:hover {
    background: color-mix(in srgb, var(--button-color) 80%, white);
  }
}
~~~

**不同颜色空间**

~~~css
// 使用不同的颜色空间进行混合
color-mix(in hsl, red, blue) // HSL 色彩空间
color-mix(in hwb, red, blue) // HWB 色彩空间  
color-mix(in lab, red, blue) // LAB 色彩空间
~~~

**总结：**

`color-mix`能做到与`rgba`一样的效果，但两者之间有细微区别：`rgba`更加通用简单，但是不适合带有变量的参数，而`color-mix`能做到使用变量来实现透明度。

::: tip
⚠️ `color-mix()` 是相对较新的 CSS 功能，需要检查目标浏览器支持情况
:::

<br />