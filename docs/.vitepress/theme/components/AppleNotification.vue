<template>
  <Teleport to="body">
    <Transition name="notification-slide">
      <div 
        v-if="visible"
        class="apple-notification"
        :class="[`type-${type}`, `position-${position}`]"
      >
        <div class="notification-icon" v-if="showIcon">
          <span>{{ iconMap[type] }}</span>
        </div>
        
        <div class="notification-content">
          <div class="notification-title" v-if="title">{{ title }}</div>
          <div class="notification-message">{{ message }}</div>
        </div>
        
        <button 
          v-if="closable"
          class="notification-close"
          @click="close"
          aria-label="关闭通知"
        >
          ✕
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'info', 'warning', 'error'].includes(value)
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 4000
  },
  closable: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  position: {
    type: String,
    default: 'top-right',
    validator: (value) => ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center'].includes(value)
  }
})

const emit = defineEmits(['close'])

const visible = ref(false)
let timer = null

const iconMap = {
  success: '✅',
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌'
}

const close = () => {
  visible.value = false
  emit('close')
  if (timer) {
    clearTimeout(timer)
  }
}

onMounted(() => {
  visible.value = true
  
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
})
</script>

<style scoped>
.apple-notification {
  position: fixed;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 320px;
  max-width: 400px;
  padding: 16px 20px;
  background: var(--vp-c-surface-3);
  backdrop-filter: var(--vp-glass-backdrop);
  -webkit-backdrop-filter: var(--vp-glass-backdrop);
  border: 1px solid var(--vp-glass-border);
  border-radius: var(--vp-radius-medium);
  box-shadow: var(--vp-shadow-3);
  z-index: 9999;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.apple-notification:hover {
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-4);
}

.apple-notification.position-top-right {
  top: 20px;
  right: 20px;
}

.apple-notification.position-top-left {
  top: 20px;
  left: 20px;
}

.apple-notification.position-bottom-right {
  bottom: 20px;
  right: 20px;
}

.apple-notification.position-bottom-left {
  bottom: 20px;
  left: 20px;
}

.apple-notification.position-top-center {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.apple-notification.type-success {
  border-left: 4px solid #34C759;
}

.apple-notification.type-info {
  border-left: 4px solid var(--vp-c-brand-1);
}

.apple-notification.type-warning {
  border-left: 4px solid #FF9500;
}

.apple-notification.type-error {
  border-left: 4px solid #FF3B30;
}

.notification-icon {
  flex-shrink: 0;
  font-size: 18px;
  margin-top: 2px;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
  line-height: 1.4;
}

.notification-message {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  word-wrap: break-word;
}

.notification-close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-3);
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 2px;
}

.notification-close:hover {
  background: var(--vp-c-surface-2);
  color: var(--vp-c-text-1);
}

.notification-slide-enter-active,
.notification-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.apple-notification.position-top-left.notification-slide-enter-from,
.apple-notification.position-bottom-left.notification-slide-enter-from {
  transform: translateX(-100%) scale(0.8);
}

.apple-notification.position-top-left.notification-slide-leave-to,
.apple-notification.position-bottom-left.notification-slide-leave-to {
  transform: translateX(-100%) scale(0.8);
}

.apple-notification.position-top-center.notification-slide-enter-from,
.apple-notification.position-top-center.notification-slide-leave-to {
  transform: translateX(-50%) translateY(-100%) scale(0.8);
}

@media (max-width: 768px) {
  .apple-notification {
    left: 10px !important;
    right: 10px !important;
    max-width: none;
    min-width: auto;
    transform: none !important;
  }
  
  .apple-notification.position-top-center {
    transform: none !important;
  }
  
  .notification-slide-enter-from,
  .notification-slide-leave-to {
    transform: translateY(-100%) scale(0.8) !important;
  }
}
</style>
