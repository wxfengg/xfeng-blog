<template>
  <div class="apple-loading-spinner" :class="{ 'full-screen': fullScreen }">
    <div class="spinner-container">
      <div class="spinner"></div>
      <div class="spinner-text" v-if="text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fullScreen: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.apple-loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.apple-loading-spinner.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--vp-glass-bg);
  backdrop-filter: var(--vp-glass-backdrop);
  -webkit-backdrop-filter: var(--vp-glass-backdrop);
  z-index: 9999;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-surface-1);
  border-top: 3px solid var(--vp-c-brand-1);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-text {
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Apple-style loading animation */
@keyframes apple-pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.95);
  }
}

.spinner-container {
  animation: apple-pulse 2s ease-in-out infinite;
}
</style>
