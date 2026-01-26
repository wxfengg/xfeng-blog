# FLIP 动画策略的理解

<BlogHead date="2026-1-26" />

---

最近在学习前端动画相关的内容，发现一个叫做**FLIP**的动画策略，感觉挺有意思的，记录一下✏️

### 什么是FLIP？

`FLIP` 是 **First , Last , Invert , Play** 的缩写，是一种用于实现高性能动画的技术。它通过计算元素在动画开始和结束时的位置和大小变化，然后应用相应的转换来实现平滑的动画效果。

在浏览器中，改变 width, height, top, left 等属性会触发 Layout（重排），这非常消耗性能。FLIP 的核心是将这些昂贵的改变，转化为性能极高的 transform 动画。

### FLIP的四个步骤

1. **First-初始状态**：记录元素在动画开始时的位置和大小。
2. **Last-最终状态**：记录元素在动画结束时的位置和大小。
3. **Invert-反转状态**：计算出从 First 到 Last 的变化，并应用相应的反向转换，使元素看起来仍然在原来的位置。
4. **Play-播放动画**：应用转换，并触发浏览器的重绘，开始动画。

### 示例代码

下面是一个简单的 FLIP 动画示例：

```html
<div id="box" style="width:100px; height:100px; background-color:blue; position:absolute;"></div>
<button id="moveBtn">Move Box</button>
```

```javascript
const box = document.getElementById("box")
const moveBtn = document.getElementById("moveBtn")
let toggled = false
moveBtn.addEventListener("click", () => {
  // First
  const firstRect = box.getBoundingClientRect()

  // Toggle position
  toggled = !toggled
  box.style.marginLeft = toggled ? "200px" : "0px"
  box.style.marginTop = toggled ? "200px" : "0px"

  // Last
  const lastRect = box.getBoundingClientRect()

  // Invert
  const deltaX = firstRect.left - lastRect.left
  const deltaY = firstRect.top - lastRect.top

  box.style.transition = "none"
  box.style.transform = `translate(${deltaX}px, ${deltaY}px)`

  // Play
  requestAnimationFrame(() => {
    box.style.transition = "transform 0.5s ease"
    box.style.transform = "translate(0, 0)"
  })
})
```

### 实战-switch按钮

下面代码将使用 FLIP 技术实现了一个切换按钮的动画效果。点击按钮时，按钮会平滑地移动到新的位置，而不是突然跳跃。

为了方便代码书写，我将会使用tailwindcss来进行样式的编写。

```html
<div class="h-screen flex justify-center items-center">
  <div
    id="toggleBtn"
    class="w-38 h-20 rounded-full bg-black p-2 flex items-center justify-start cursor-pointer transition-colors duration-300"
  >
    <div id="indicator" class="bg-white size-16 rounded-full shadow-md"></div>
  </div>
</div>
```

```javascript
const toggleBtn = document.getElementById("toggleBtn")
const indicator = document.getElementById("indicator")

toggleBtn.onclick = () => {
  // First: 记录动画开始前的位置
  const firstRect = indicator.getBoundingClientRect()

  // updateState: 改变布局/状态
  const currentJustify = toggleBtn.style.justifyContent || getComputedStyle(toggleBtn).justifyContent
  const isStart = currentJustify === "flex-start" || currentJustify === "normal"

  toggleBtn.style.justifyContent = isStart ? "flex-end" : "flex-start"

  if (isStart) {
    toggleBtn.classList.remove("bg-black")
    toggleBtn.classList.add("bg-green-500")
  } else {
    toggleBtn.classList.add("bg-black")
    toggleBtn.classList.remove("bg-green-500")
  }

  // Last: 记录布局改变后的新位置
  const lastRect = indicator.getBoundingClientRect()

  // Invert: 计算位置差值 (从哪里来 - 到哪里去)
  const dx = firstRect.left - lastRect.left
  const dy = firstRect.top - lastRect.top

  // Play: 执行动画
  indicator.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }], {
    duration: 300,
    // 使用一个更有弹性的贝塞尔曲线，显得更顺滑
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  })
}
```

### 小拓展-FLIP 动画辅助函数封装

为了更方便地使用 FLIP 动画，我们可以将其封装成一个通用的函数：

```javascript
/**
 * FLIP 动画辅助函数
 * @param {Element} dom - 需要执行动画的 DOM 元素
 * @param {() => void} updateState - 更新 DOM 状态的回调函数（修改样式、DOM结构等）
 * @param {number | KeyframeAnimationOptions} [options] - 动画配置，支持传入数字(duration)或对象
 * @returns {Animation} - 返回 Animation 对象，方便外部控制（如 .finished.then()）
 */
export default function flipAnimate(dom, updateState, options = {}) {
  // 参数归一化：设置默认参数和处理 options 可能是数字的情况
  const defaultOptions = {
    duration: 300,
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    fill: "both", // 防止动画结束闪烁，默认保持结束状态
  }

  let finalOptions = { ...defaultOptions }

  if (typeof options === "number") {
    finalOptions.duration = options
  } else if (typeof options === "object") {
    finalOptions = { ...defaultOptions, ...options }
  }

  // 1. First: 记录初始状态
  const firstRect = dom.getBoundingClientRect()

  // State: 执行状态更新
  updateState()

  // 2. Last: 记录最终状态
  const lastRect = dom.getBoundingClientRect()

  // 3. Invert: 计算变换差值
  const dx = firstRect.left - lastRect.left
  const dy = firstRect.top - lastRect.top

  // 如果位置没有变化，直接返回（性能优化，避免不必要的图层提升）
  if (dx === 0 && dy === 0) return

  // 4. Play: 执行动画
  const player = dom.animate(
    [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
    finalOptions,
  )

  return player
}
```

上面的实战案例使用这个函数，我们可以更简洁地实现 FLIP 动画：

```javascript
const toggleBtn = document.getElementById("toggleBtn")
const indicator = document.getElementById("indicator")

toggleBtn.onclick = () => {
  // 回调函数只关心状态更新，不关心动画细节
  // 动画细节完全由 flipAnimate 函数内部处理
  flipAnimate(btn, () => {
    // updateState: 改变布局/状态
    const currentJustify = toggleBtn.style.justifyContent || getComputedStyle(toggleBtn).justifyContent
    const isStart = currentJustify === "flex-start" || currentJustify === "normal"

    toggleBtn.style.justifyContent = isStart ? "flex-end" : "flex-start"

    if (isStart) {
      toggleBtn.classList.remove("bg-black")
      toggleBtn.classList.add("bg-green-500")
    } else {
      toggleBtn.classList.add("bg-black")
      toggleBtn.classList.remove("bg-green-500")
    }
  })
}
```

> ⚠️tips: [`element.getBoundingClientRect()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect) 会触发 Layout (重排)

### 🤔思考：为什么要这么麻烦？

如果你直接给一个元素设置 height: 200px 变到 height: 400px 的动画：

- 浏览器压力大： 每一帧都要重新计算布局，容易掉帧。

- 影响周围： 该元素变大，会挤开周围的元素，导致全页重排。

FLIP 的优势：

- 所有的位移和缩放都由 GPU 处理（transform 不触发重排）。

- 浏览器只需要在动画开始前计算两次布局（F 和 L），动画过程中完全是合成器层面的位移。

### 额外拓展

#### element.animate()

[`element.animate()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/animate) 是原生 **JavaScript Web Animations API (WAAPI)** 的核心方法。它允许你在 JS 中以高性能的方式创建动画，这比使用 CSS 类名切换动画更灵活，又比使用 [`requestAnimationFrame`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 手写每一帧更简单。

**基本语法**

```javascript
element.animate(keyframes, options)
```

- keyframes (关键帧数组): 定义动画的步骤，类似于 CSS 的 @keyframes。
- options (配置对象): 定义动画的时间、速度、重复次数等

**常用的 Options 属性**

- duration: 动画持续时间（毫秒）
- easing: 动画的缓动函数（如 "ease", "linear", "cubic-bezier(0.34, 1.56, 0.64, 1)"）
- fill: 定义动画结束后的状态（如 "forwards", "backwards", "both", "none"）
- iterations: 动画重复的次数（可以是数字或 Infinity）
- delay: 动画开始前的延迟时间（毫秒）
- direction: 动画的播放方向（如 "normal", "reverse", "alternate", "alternate-reverse"）
- playbackRate: 动画的播放速度（默认值为 1）
- ...

#### 图层提升

“图层提升”（Layer Promotion），或者叫“复合层提升”（Composite Layer Promotion），是浏览器渲染原理中的一个核心概念，直接关系到网页动画的性能（FPS）。

简单来说，就是浏览器为了让某个元素动得更流畅，把它单独拎出来放到一个新的“显卡图层”上进行绘制，避免干扰到其他元素。

在使用 FLIP 动画时，浏览器往往会把动画元素提升到一个独立的复合图层（composite layer）。这样 GPU 可以更专注地处理动画合成，而主线程则尽量避免被布局计算和重绘拖慢——这也是 FLIP 通常比直接做布局动画更流畅的原因。

下面将按照我的理解，分几点来解释图层提升的原理：

---

**1）通俗比喻：透明幻灯片**

想象你在画一幅画（渲染网页）：

- **普通渲染（无图层提升）**：相当于在一张白纸上画画。你想移动画里的“小人”，就得擦掉重画，或者把旧位置涂白再画到新位置——慢，容易卡。
- **图层提升**：相当于把背景画在白纸上，把“小人”画在一张**透明的幻灯片（图层）**上，再叠在白纸上。
- 当你要移动“小人”时，只需要移动这张“幻灯片”，不需要重画背景；这件事交给 GPU 做会快很多。

**2）浏览器渲染流水线：为什么 transform 更快？**

标准的渲染流程大致是：

- **Layout（重排/回流）**：计算元素的位置和大小
- **Paint（重绘）**：把像素画出来（颜色、文字、阴影等）
- **Composite（合成）**：把各个图层叠在一起显示到屏幕上

两种常见情况对比：

- **没有独立图层（普通文档流）**：
  - 改 `left` / `top` 往往会触发 **Layout + Paint**
  - CPU 需要重新计算并绘制受影响的区域，像“在纸上擦了重画”
- **被提升为独立图层**：
  - 改 `transform` / `opacity` 通常可以跳过 **Layout + Paint**，直接走 **Composite**
  - 浏览器告诉 GPU：“把这张纹理往右移 100px”，GPU 处理很快，CPU 压力更小

**3）如何触发图层提升？（按需使用）**

并不是所有元素都会自动变成独立图层（图层会占显存/内存，太多会炸）。常见触发方式：

- 使用 3D/透视相关的 transform（最常用）

```css
transform: translate3d(0, 0, 0);
transform: translateZ(0);
```

- `will-change`（明确告诉浏览器“我准备动了”）

```css
will-change: transform;
```

- 正在进行 `opacity` / `transform` 动画
  - 当你的 `dom.animate(...)` 开始运行时，浏览器检测到你在动 `transform`，通常会出于性能考虑自动提升该元素
- 其他情况：`<video>`、`<canvas>`、WebGL（3D 上下文）等

**4）为什么要避免“不必要的提升”？**

回到上述封装的 flipAnimate 函数：如果位置没变，你却依然执行了 `dom.animate(...)`（即使从 `(0,0)` 动到 `(0,0)`）：

- 浏览器可能仍然认为你要做动画
- 于是给元素分配显存、创建新图层
- 把元素内容从主文档“抠”出来绘制到新图层（这可能引发一次重绘）
- 动画结束后再把图层合并回去

对肉眼完全看不出变化的动作来说，这一套就是纯浪费。因此 `dx === 0 && dy === 0 return` 的意义是：“没事，不用动，别折腾内存与合成树。”

**5）举个例子：hover 光晕动画**

- **反面教材（滥用提升）**：给页面上 1000 个列表项都加 `will-change: transform`
  - 后果：Chrome 可能开出大量显存图层，内存飙升、手机发烫，甚至崩溃
- **优雅做法（按需提升）**：只在真正需要动画的时机（hover 到某个 item / 触发 FLIP 位移）再提升

**总结**

图层提升是一种用内存（显存）换时间（CPU 计算）的策略；因此要“按需使用”，避免无意义的提升造成额外开销。
