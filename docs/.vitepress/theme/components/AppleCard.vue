<template>
  <div class="apple-card" :class="[variant, { 'hoverable': hoverable }]">
    <div class="card-background"></div>
    <div class="card-content">
      <div v-if="icon || $slots.icon" class="card-icon">
        <slot name="icon">
          <span class="icon-emoji">{{ icon }}</span>
        </slot>
      </div>
      
      <div class="card-header" v-if="title || $slots.header">
        <slot name="header">
          <h3 class="card-title">{{ title }}</h3>
          <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
        </slot>
      </div>
      
      <div class="card-body">
        <slot></slot>
      </div>
      
      <div v-if="$slots.footer" class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
    
    <!-- Interactive ripple effect -->
    <div class="ripple-effect" ref="rippleContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: String,
  subtitle: String,
  icon: String,
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'outlined', 'filled'].includes(value)
  },
  hoverable: {
    type: Boolean,
    default: true
  }
})

const rippleContainer = ref(null)

const createRipple = (event) => {
  if (!props.hoverable) return
  
  const container = rippleContainer.value
  if (!container) return
  
  const rect = container.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  const ripple = document.createElement('div')
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(0, 122, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  `
  
  container.appendChild(ripple)
  
  setTimeout(() => {
    if (container.contains(ripple)) {
      container.removeChild(ripple)
    }
  }, 600)
}

onMounted(() => {
  if (rippleContainer.value) {
    rippleContainer.value.addEventListener('click', createRipple)
  }
})
</script>

<style scoped>
.apple-card {
  position: relative;
  border-radius: var(--vp-radius-large);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--vp-glass-border);
  background: transparent;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--vp-glass-bg);
  backdrop-filter: var(--vp-glass-backdrop);
  -webkit-backdrop-filter: var(--vp-glass-backdrop);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-content {
  position: relative;
  z-index: 2;
  padding: 24px;
}

.ripple-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
  border-radius: inherit;
}

/* Card Variants */
.apple-card.default {
  box-shadow: var(--vp-shadow-1);
}

.apple-card.elevated {
  box-shadow: var(--vp-shadow-3);
}

.apple-card.elevated .card-background {
  background: var(--vp-c-surface-3);
}

.apple-card.outlined {
  border: 2px solid var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-1);
}

.apple-card.filled {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
}

.apple-card.filled .card-background {
  background: transparent;
}

/* Hover Effects */
.apple-card.hoverable:hover {
  transform: translateY(-4px);
  box-shadow: var(--vp-shadow-4);
}

.apple-card.hoverable:hover .card-background {
  background: var(--vp-c-surface-2);
}

.apple-card.elevated.hoverable:hover {
  transform: translateY(-6px);
  box-shadow: var(--vp-shadow-5);
}

.apple-card.filled.hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 122, 255, 0.3);
}

/* Card Icon */
.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: var(--vp-radius-medium);
  background: var(--vp-c-surface-1);
  margin-bottom: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-emoji {
  font-size: 28px;
  line-height: 1;
}

.apple-card:hover .card-icon {
  transform: scale(1.1);
  background: var(--vp-c-brand-1);
  color: white;
}

/* Card Header */
.card-header {
  margin-bottom: 16px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 8px 0;
  letter-spacing: -0.025em;
}

.card-subtitle {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
  opacity: 0.8;
}

/* Card Body */
.card-body {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-weight: 500;
}

/* Card Footer */
.card-footer {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-glass-border);
}

/* Dark Mode */
.dark .card-icon {
  background: var(--vp-c-surface-2);
}

.dark .apple-card:hover .card-icon {
  background: var(--vp-c-brand-1);
}

/* Ripple Animation */
@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-content {
    padding: 20px;
  }
  
  .card-icon {
    width: 50px;
    height: 50px;
  }
  
  .icon-emoji {
    font-size: 24px;
  }
  
  .card-title {
    font-size: 18px;
  }
}
</style>