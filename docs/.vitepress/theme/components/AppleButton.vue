<template>
  <component 
    :is="tag"
    class="apple-button"
    :class="[
      `size-${size}`,
      `variant-${variant}`,
      { 
        'loading': loading,
        'disabled': disabled,
        'full-width': fullWidth,
        'icon-only': iconOnly
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
    v-bind="linkProps"
  >
    <div class="button-background"></div>
    <div class="button-content">
      <!-- Loading spinner -->
      <div v-if="loading" class="loading-spinner">
        <div class="spinner"></div>
      </div>
      
      <!-- Left icon -->
      <div v-if="leftIcon && !loading" class="button-icon left">
        <slot name="leftIcon">{{ leftIcon }}</slot>
      </div>
      
      <!-- Button text -->
      <span v-if="!iconOnly" class="button-text">
        <slot>{{ text }}</slot>
      </span>
      
      <!-- Right icon -->
      <div v-if="rightIcon && !loading" class="button-icon right">
        <slot name="rightIcon">{{ rightIcon }}</slot>
      </div>
      
      <!-- Icon only -->
      <div v-if="iconOnly && !loading" class="button-icon only">
        <slot name="icon">{{ icon }}</slot>
      </div>
    </div>
    
    <!-- Ripple effect container -->
    <div class="ripple-container" ref="rippleContainer"></div>
  </component>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  text: String,
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  fullWidth: {
    type: Boolean,
    default: false
  },
  leftIcon: String,
  rightIcon: String,
  icon: String,
  iconOnly: {
    type: Boolean,
    default: false
  },
  href: String,
  to: String,
  target: String,
  tag: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const rippleContainer = ref(null)

const linkProps = computed(() => {
  if (props.href) {
    return {
      href: props.href,
      target: props.target || '_blank',
      rel: 'noopener noreferrer'
    }
  }
  return {}
})

const handleClick = (event) => {
  if (props.loading || props.disabled) return
  
  createRipple(event)
  emit('click', event)
}

const createRipple = (event) => {
  const container = rippleContainer.value
  if (!container) return
  
  const rect = container.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  const ripple = document.createElement('div')
  ripple.className = 'ripple'
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-effect 0.6s linear;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.4);
  `
  
  container.appendChild(ripple)
  
  setTimeout(() => {
    if (container.contains(ripple)) {
      container.removeChild(ripple)
    }
  }, 600)
}
</script>

<style scoped>
.apple-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--vp-radius-medium);
  font-family: inherit;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  user-select: none;
  outline: none;
  box-sizing: border-box;
}

.button-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: inherit;
}

.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.ripple-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
  border-radius: inherit;
}

/* Button Sizes */
.size-small {
  height: 32px;
  padding: 0 16px;
  font-size: 14px;
  min-width: 64px;
}

.size-medium {
  height: 40px;
  padding: 0 20px;
  font-size: 16px;
  min-width: 80px;
}

.size-large {
  height: 48px;
  padding: 0 24px;
  font-size: 18px;
  min-width: 96px;
}

/* Button Variants */
.variant-primary {
  color: white;
}

.variant-primary .button-background {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  box-shadow: var(--vp-shadow-2);
}

.variant-primary:hover:not(.disabled):not(.loading) {
  transform: translateY(-2px);
}

.variant-primary:hover:not(.disabled):not(.loading) .button-background {
  background: linear-gradient(135deg, var(--vp-c-brand-2), var(--vp-c-brand-3));
  box-shadow: var(--vp-shadow-3);
}

.variant-secondary {
  color: var(--vp-c-text-1);
}

.variant-secondary .button-background {
  background: var(--vp-glass-bg);
  backdrop-filter: var(--vp-glass-backdrop);
  -webkit-backdrop-filter: var(--vp-glass-backdrop);
  border: 1px solid var(--vp-glass-border);
  box-shadow: var(--vp-shadow-1);
}

.variant-secondary:hover:not(.disabled):not(.loading) {
  transform: translateY(-2px);
}

.variant-secondary:hover:not(.disabled):not(.loading) .button-background {
  background: var(--vp-c-surface-2);
  box-shadow: var(--vp-shadow-2);
}

/* States */
.loading {
  cursor: wait;
  pointer-events: none;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.full-width {
  width: 100%;
}

/* Loading Spinner */
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: currentColor;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Ripple Effect */
@keyframes ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Active State */
.apple-button:active:not(.disabled):not(.loading) {
  transform: scale(0.98);
}
</style>