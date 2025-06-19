# 笔记

<BlogHead tags="笔记📒"/>
✍️好记性不如烂笔头

---

### **Vue相关**

#### 文件流转图片显示

> 适用场景：后端返回图片流，前端直接显示（可以用img标签）。适用于二维码显示、预览图片显示等

~~~js
const captchaImage = ref("")
const getImage = async () => {
	// 请求接口获取图片流
	const res = await getCodeImageApi()
	// 获取图片
	const blob = new Blob([res.data], { type: "image/jpeg" })
  	captchaImage.value = URL.createObjectURL(blob)
} 
~~~



#### 下载图片，触发浏览器保存

> 适用场景：后端返回文件地址，想实现点击下载，触发浏览器保存

方法一（代码简单，但如果服务器设置图片不能下载，则无法触发浏览器保存）：

~~~js
const downloadFile = (url: string) => {
  const link = document.createElement("a")
  link.href = url
  link.download = "文件名"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
~~~



方法二（比较万能，但是会有跨域问题，原理是使用canvas）：

~~~js
const downloadFile = (url: string, name: string) => {
  let image = new Image()
  image.setAttribute("crossOrigin", "anonymous")
  image.src = url
  image.onload = () => {
    let canvas = document.createElement("canvas")
    canvas.width = image.width
    canvas.height = image.height
    let ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.drawImage(image, 0, 0, image.width, image.height)
      canvas.toBlob((blob) => {
        if (blob) {
          let url = URL.createObjectURL(blob)
          let eleLink = document.createElement("a")
  		  eleLink.download = name
          eleLink.href = href
          eleLink.click()
          eleLink.remove()
          // 用完释放URL对象
          URL.revokeObjectURL(url)
        }
      })
    }
  }
}
~~~



#### 下载文件，触发浏览器保存（终极方案）

> 适用场景：后端返回文件地址，想实现点击下载，触发浏览器保存。无论是图片、文件都可以，可以接受流也可以接受文件URL

~~~js
/**
 * 通用文件下载方法，支持图片、Excel、PDF等文件类型
 * @param {string|Blob} source - 文件URL或Blob对象
 * @param {string} filename - 下载的文件名（带扩展名）
 */
export const downloadFile = async (source: string | Blob, filename: string) => {
  if (!source) return

  try {
    // 处理Blob对象
    if (source instanceof Blob) {
      const url = URL.createObjectURL(source)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()

      // 清理资源
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100)
      return
    }

    // 处理URL
    // 对于跨域文件，使用 fetch 获取文件内容
    const response = await fetch(source)
    const blob = await response.blob()

    // 创建临时 URL
    const blobUrl = window.URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = blobUrl
    link.download = filename // 添加扩展名
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 清理临时 URL
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    // 如果 fetch 失败，回退到直接打开
    window.open(source as string)
  }
}
~~~



<br />

### **Git**

#### 配置

1.生成ssh key（用于 GitHub、GitLab 等代码托管平台的认证，后续无需输入密码）

~~~bash
#方法一（推荐）：使用更安全的 Ed25519 算法
ssh-keygen -t ed25519 -C "your_email@example.com"

#方法二：使用 RSA 算法（兼容旧系统）
ssh-keygen -t rsa -C "your_email@example.com"
~~~

> tips: `-C` 是注释，一般填你的邮箱，方便识别，其实随便填也可以



2.查看生成的 SSH Key

~~~bash
#ed25519
cat ~/.ssh/id_ed25519.pub

#rsa
cat ~/.ssh/id_rsa.pub
~~~



3.测试ssh链接，如果看到 **You've successfully authenticated...**，说明配置成功！

~~~bash
# 测试 GitHub
ssh -T git@github.com

# 测试 GitLab
ssh -T git@gitlab.com
~~~



#### 基础

首次使用 git 时，设置提交代码时的信息：

```bash
# 配置用户名(这里相当于提交人，设置了啥提交人就显示啥)
git config --global user.name "yourname"

# 配置用户邮箱(随意，只是用于显示，没啥鸟用)
git config --global user.email "youremail@xxx.com"

# 查看当前的配置信息
git config --global --list
```

第一次上传代码到远程仓库：

~~~bash
# 初始化
git init

# 提交文件到缓存区
git add .

# 提交到本地仓库
git commit -m "提交信息"

# 重命名分支(main是分支名，可以自由填写)
git branch -M main

# 关联远程仓库
git remote add origin 仓库地址

# 推送代码到远程仓库
git push -u origin main
~~~

#### 其他
场景：本地提交了代码想取消本次体检让代码退回或者重新修改代码

```bash
# 这个命令会撤销最近一次的本地提交，但保留你的代码更改在暂存区（staged），你可以重新提交或修改后再提交
git reset --soft HEAD~1
```

场景：删除了本地的提交想要恢复

~~~bash
# 查看日志获取提交hash
git reflog

# 根据提交hash恢复提交
git reset --hard {commit_hash}
~~~

场景：更改提交信息不改动代码

~~~bash
# 输入命令进入修改
git commit --amend
~~~



<br />

更加详细用法参考文章：[Git 指令看这一篇就够 —— 各种工作场景的 git 指令大全](https://www.cnblogs.com/jamiechoo/articles/18408791)

