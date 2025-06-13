<template>
  <div class="apple-progress-bar">
    <div class="progress-track">
      <div 
        class="progress-fill"
        :style="progressStyle"
      >
        <div class="progress-shine"></div>
      </div>
    </div>
    <div class="progress-info" v-if="showInfo">
      <span class="progress-text">{{ text || `${Math.round(percentage)}%` }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  },
  color: {
    type: String,
    default: 'var(--vp-c-brand-1)'
  },
  showInfo: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: ''
  },
  animated: {
    type: Boolean,
    default: true
  },
  height: {
    type: String,
    default: '8px'
  }
})

const progressStyle = computed(() => ({
  width: `${props.percentage}%`,
  backgroundColor: props.color,
  height: props.height,
  transition: props.animated ? 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
}))
</script>

<style scoped>
.apple-progress-bar {
  width: 100%;
}

.progress-track {
  width: 100%;
  background: var(--vp-c-surface-1);
  border-radius: var(--vp-radius-small);
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 8px;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  border-radius: var(--vp-radius-small);
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 122, 255, 0.3);
}

.progress-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shine 2s ease-in-out infinite;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.progress-text {
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Size variants */
.apple-progress-bar.size-small .progress-fill {
  height: 6px;
}

.apple-progress-bar.size-large .progress-fill {
  height: 12px;
}

/* Color variants */
.apple-progress-bar.variant-success .progress-fill {
  background: linear-gradient(90deg, #34C759, #30D158);
  box-shadow: 0 1px 3px rgba(52, 199, 89, 0.3);
}

.apple-progress-bar.variant-warning .progress-fill {
  background: linear-gradient(90deg, #FF9500, #FFCC02);
  box-shadow: 0 1px 3px rgba(255, 149, 0, 0.3);
}

.apple-progress-bar.variant-error .progress-fill {
  background: linear-gradient(90deg, #FF3B30, #FF6B6B);
  box-shadow: 0 1px 3px rgba(255, 59, 48, 0.3);
}
</style>
