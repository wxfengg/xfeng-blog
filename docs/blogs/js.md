# JS的内功修练

<BlogHead date="2025-7-29"/>

---

### JS的内存管理

- 基本数据类型：直接在栈空间进行内存分配
- 应用数据类型：在堆内存中开辟一块空间，并且将该空间的指针地址返回作为变量的引用

### JS的垃圾回收（GC）

#### GC常见算法

**1.引用计数法**

- 如果有其他地方引用了对象，该对象的引用计数器会+1；如果不引用了则-1；但计数器为0的时候，说明对象不被引用了，就会自动销毁
- 弊端：循环引用。简单来说就是相互引用，会造成内存泄漏

**2.标记清除**（js引擎目前用得比较广泛，但并不完全一致）

- 这个算法是设置一个根对象（rootobject），垃圾回收器会定期从这个根开始，找所有从根开始有引l用到的对象，对于哪些没有引用到的对象，就认为是不可用的对象
- 可以很好解决循环引用问题

### 闭包

#### 定义

一个函数和它所调用的自由变量构成的组合就叫闭包。

#### 闭包的内存泄露

### this

this的内容跟定义的位置无关，只跟它的被调用位置相关。

```js
function fn() {
  console.log(this)
}
fn() // ==> Window

const obj = {
  name: "xfeng",
  fn: fn
}
obj.fn() // ==> obj

function fn2() {
  return function fn3() {
    console.log(this)
  }
}
const res = fn2()
res() // ==> Window

const obj2 = {
  name: "feng",
  fn: fn2
}
const res2 = obj2.fn
res2() // ==> Window
```

#### call()和apply()

`call()` 和 `apply()` 都可以指定this的绑定

区别是两种函数的参数方式不一样

- `call()` 使用逗号方式 => call(this, arg1, arg2, ...)
- `apply()` 使用数组的方式 => apply(this, [arg1, arg2, ...])

#### 绑定优先级

new绑定 > 显示绑定(apply/call/bind) > 隐式绑定(obj.fn()) > 默认绑定(独立函数调用)
