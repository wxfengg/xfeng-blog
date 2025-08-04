# 一些关于JS的手写✏️
<BlogHead />

---
### call函数

~~~js
Function.prototype.mycall = function (thisArg, ...args) {
	// 如果调用对象不是函数 抛出错误
	if (typeof this !== "function") {
    	throw new Error(`${this} is not a function!`)
  	}
  	// 如果没有传入上下文，则默认使用全局对象
  	thisArg = thisArg ?? globalThis
    // 如果传入的上下文不是对象，则将其转换为对象
    thisArg = Object(thisArg)
    // 将函数绑定到上下文对象上并调用函数来隐式绑定this
  	thisArg.fn = this
	const result = thisArg.fn(...args)
    // 删除绑定的函数
    delete thisArg.fn
    
  	return result
}
~~~



### apply函数

~~~js
Function.prototype.myapply = function (thisArg, argsArry) {
	// 如果调用对象不是函数 抛出错误
	if (typeof this !== "function") {
    	throw new Error(`${this} is not a function!`)
  	}
  	// 如果没有传入上下文，则默认使用全局对象
  	thisArg = thisArg ?? globalThis
    // 如果传入的上下文不是对象，则将其转换为对象
    thisArg = Object(thisArg)
    // 将函数绑定到上下文对象上并调用函数来隐式绑定this
  	thisArg.fn = this
	const result = thisArg.fn(...(argsArry || []))
    // 删除绑定的函数
    delete thisArg.fn
    
  	return result
}
~~~



### bind函数

~~~js
Function.prototype.myBind = function(thisArg, ...args) {
    // 如果调用对象不是函数 抛出错误
	if (typeof this !== "function") {
    	throw new Error(`${this} is not a function!`)
  	}
    
    return (...args2) => {
        // 如果没有传入上下文，则默认使用全局对象
  		thisArg = thisArg ?? globalThis
    	// 如果传入的上下文不是对象，则将其转换为对象
    	thisArg = Object(thisArg)
   		 // 将函数绑定到上下文对象上并调用函数来隐式绑定this
  		thisArg.fn = this
        const result = thisArg.fn(...args, ...args2)
        // 删除绑定的函数
        delete thisArg.fn

        return result
    }
}
~~~



### 函数柯里化

函数柯里化是一种将多参数函数转换为一系列单参数函数的技术。柯里化的核心思想是：将一个接收多个参数的函数，转换成一系列使用一个参数的函数。

- 接收一个普通函数，让函数柯里化
- 返回柯里化后的函数

~~~js
function currying(fn) {
    return function curried(...args) {
        // 如果传入的参数个数大于等于要改造函数的参数个数，说明参数接收完成
        if(args.length >= fn.length) {
            return fn.apply(this, args)
        }else {
            // 否则返回一个新的函数，通过递归继续拼接参数，直到参数个数和传入函数的参数个数一致
            return (...args2) => curried.apply(this, [...args, ...args2])
        }
    }
}
~~~

**优点**：

1. **参数复用**：可以固定部分参数，生成更专用的函数
2. **延迟执行**：可以分步传入参数，直到所有参数都传入才执行
3. **函数组合**：便于进行函数组合和管道操作