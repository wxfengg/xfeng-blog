<template>
  <Transition name="fab-fade">
    <button
      v-if="isVisible"
      class="apple-fab"
      @click="scrollToTop"
      aria-label="返回顶部"
      title="返回顶部"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path 
          d="M12 19V5M5 12L12 5L19 12" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.apple-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  background: var(--vp-c-brand-1);
  border: none;
  border-radius: 50%;
  box-shadow: var(--vp-shadow-3);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.apple-fab:hover {
  transform: scale(1.1);
  box-shadow: var(--vp-shadow-4);
  background: var(--vp-c-brand-2);
}

.apple-fab:active {
  transform: scale(0.95);
}

.apple-fab svg {
  transition: transform 0.2s;
}

.apple-fab:hover svg {
  transform: translateY(-1px);
}

.fab-fade-enter-active,
.fab-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fab-fade-enter-from,
.fab-fade-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(20px);
}

@media (max-width: 768px) {
  .apple-fab {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
  }
}
</style>
