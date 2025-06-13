<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="modelValue"
        class="apple-modal-overlay"
        @click="handleOverlayClick"
      >
        <div 
          class="apple-modal"
          :class="[`size-${size}`, { 'is-closable': closable }]"
          @click.stop
        >
          <!-- Header -->
          <div class="modal-header" v-if="$slots.header || title">
            <div class="modal-title">
              <slot name="header">
                <h3>{{ title }}</h3>
              </slot>
            </div>
            <button 
              v-if="closable"
              class="modal-close"
              @click="close"
              aria-label="关闭"
            >
              ✕
            </button>
          </div>
          
          <!-- Body -->
          <div class="modal-body">
            <slot></slot>
          </div>
          
          <!-- Footer -->
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'full'].includes(value)
  },
  closable: {
    type: Boolean,
    default: true
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

// 监听模态框状态，处理 body 滚动
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.apple-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.apple-modal {
  background: var(--vp-c-surface-3);
  backdrop-filter: var(--vp-glass-backdrop);
  -webkit-backdrop-filter: var(--vp-glass-backdrop);
  border: 1px solid var(--vp-glass-border);
  border-radius: var(--vp-radius-large);
  box-shadow: var(--vp-shadow-5);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: scale(0.9);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.apple-modal.size-small {
  width: 100%;
  max-width: 400px;
}

.apple-modal.size-medium {
  width: 100%;
  max-width: 600px;
}

.apple-modal.size-large {
  width: 100%;
  max-width: 800px;
}

.apple-modal.size-full {
  width: 95vw;
  height: 95vh;
  max-width: none;
  max-height: none;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0;
  border-bottom: 1px solid var(--vp-glass-border);
  margin-bottom: 24px;
}

.modal-title h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--vp-c-surface-2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--vp-c-text-2);
  font-size: 14px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-close:hover {
  background: var(--vp-c-surface-1);
  color: var(--vp-c-text-1);
  transform: scale(1.05);
}

.modal-body {
  flex: 1;
  padding: 0 24px;
  overflow-y: auto;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid var(--vp-glass-border);
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Transition animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .apple-modal,
.modal-fade-leave-to .apple-modal {
  transform: scale(0.8) translateY(20px);
}

.modal-fade-enter-to .apple-modal,
.modal-fade-leave-from .apple-modal {
  transform: scale(1) translateY(0);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .apple-modal-overlay {
    padding: 10px;
  }
  
  .apple-modal {
    width: 100% !important;
    max-width: none !important;
    border-radius: var(--vp-radius-medium);
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .modal-title h3 {
    font-size: 18px;
  }
}
</style>
