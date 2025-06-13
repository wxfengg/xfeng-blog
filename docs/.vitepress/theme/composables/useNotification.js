import { createApp, ref } from 'vue'
import AppleNotification from '../components/AppleNotification.vue'

// 通知管理器
class NotificationManager {
  constructor() {
    this.notifications = ref([])
    this.container = null
    this.initContainer()
  }

  initContainer() {
    if (typeof window === 'undefined') return
    
    this.container = document.createElement('div')
    this.container.id = 'apple-notification-container'
    document.body.appendChild(this.container)
  }

  show(options) {
    if (typeof window === 'undefined') return

    const {
      type = 'info',
      title = '',
      message = '',
      duration = 4000,
      closable = true,
      showIcon = true,
      position = 'top-right'
    } = options

    const id = Date.now() + Math.random()
    
    // 创建通知实例
    const notificationDiv = document.createElement('div')
    const app = createApp(AppleNotification, {
      type,
      title,
      message,
      duration,
      closable,
      showIcon,
      position,
      onClose: () => {
        app.unmount()
        notificationDiv.remove()
      }
    })

    app.mount(notificationDiv)
    document.body.appendChild(notificationDiv)

    return id
  }

  success(message, options = {}) {
    return this.show({
      type: 'success',
      message,
      ...options
    })
  }

  info(message, options = {}) {
    return this.show({
      type: 'info',
      message,
      ...options
    })
  }

  warning(message, options = {}) {
    return this.show({
      type: 'warning',
      message,
      ...options
    })
  }

  error(message, options = {}) {
    return this.show({
      type: 'error',
      message,
      duration: 6000, // 错误通知显示更久
      ...options
    })
  }
}

// 创建全局实例
const notificationManager = new NotificationManager()

// 导出便捷方法
export const $notify = {
  show: (options) => notificationManager.show(options),
  success: (message, options) => notificationManager.success(message, options),
  info: (message, options) => notificationManager.info(message, options),
  warning: (message, options) => notificationManager.warning(message, options),
  error: (message, options) => notificationManager.error(message, options)
}

export default notificationManager
