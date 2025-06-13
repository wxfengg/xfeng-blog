<template>
  <div 
    class="apple-tooltip" 
    :class="{ 'is-visible': isVisible }"
    :style="tooltipStyle"
  >
    <div class="tooltip-content">
      <slot>{{ content }}</slot>
    </div>
    <div class="tooltip-arrow" :class="`arrow-${placement}`"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  isVisible: {
    type: Boolean,
    default: false
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  }
})

const tooltipStyle = computed(() => {
  return {
    left: `${props.x}px`,
    top: `${props.y}px`
  }
})
</script>

<style scoped>
.apple-tooltip {
  position: fixed;
  z-index: 9999;
  opacity: 0;
  transform: scale(0.8) translateY(4px);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.apple-tooltip.is-visible {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.tooltip-content {
  background: var(--vp-c-surface-3);
  backdrop-filter: var(--vp-glass-backdrop);
  -webkit-backdrop-filter: var(--vp-glass-backdrop);
  border: 1px solid var(--vp-glass-border);
  border-radius: var(--vp-radius-small);
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  box-shadow: var(--vp-shadow-2);
  max-width: 200px;
}

.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--vp-c-surface-3);
  border: 1px solid var(--vp-glass-border);
  transform: rotate(45deg);
}

.arrow-top {
  bottom: -4px;
  left: 50%;
  margin-left: -4px;
  border-bottom: none;
  border-right: none;
}

.arrow-bottom {
  top: -4px;
  left: 50%;
  margin-left: -4px;
  border-top: none;
  border-left: none;
}

.arrow-left {
  right: -4px;
  top: 50%;
  margin-top: -4px;
  border-left: none;
  border-bottom: none;
}

.arrow-right {
  left: -4px;
  top: 50%;
  margin-top: -4px;
  border-right: none;
  border-top: none;
}
</style>
