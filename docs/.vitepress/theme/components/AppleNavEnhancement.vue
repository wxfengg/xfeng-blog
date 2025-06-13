<template>
  <div class="apple-nav-enhancement">
    <!-- Floating dock-style navigation for mobile -->
    <div v-if="isMobile" class="mobile-dock" :class="{ 'visible': showDock }">
      <div class="dock-items">
        <a href="/" class="dock-item" title="首页">
          <div class="dock-icon">🏠</div>
        </a>
        <a href="/blogs/XFeng" class="dock-item" title="博客">
          <div class="dock-icon">📚</div>
        </a>
        <button @click="toggleTheme" class="dock-item" :title="isDark ? '浅色模式' : '深色模式'">
          <div class="dock-icon">{{ isDark ? '☀️' : '🌙' }}</div>
        </button>
        <a href="https://github.com/wxfengg" class="dock-item" title="GitHub" target="_blank">
          <div class="dock-icon">💻</div>
        </a>
      </div>
    </div>
    
    <!-- Scroll progress indicator -->
    <!-- <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()

const scrollProgress = ref(0)
const showDock = ref(true)
const isMobile = ref(false)
const lastScrollY = ref(0)

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const updateScrollProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
  
  // Hide/show dock based on scroll direction
  if (scrollTop > lastScrollY.value && scrollTop > 100) {
    showDock.value = false
  } else {
    showDock.value = true
  }
  lastScrollY.value = scrollTop
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  // window.addEventListener('scroll', updateScrollProgress)
  window.addEventListener('resize', checkMobile)
  checkMobile()
})

onUnmounted(() => {
  // window.removeEventListener('scroll', updateScrollProgress)
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.apple-nav-enhancement {
  position: relative;
  z-index: 1000;
}

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #007AFF, #5856D6, #AF52DE);
  z-index: 1001;
  transition: width 0.1s ease-out;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 10px rgba(0, 122, 255, 0.5);
}

.mobile-dock {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  pointer-events: none;
}

.mobile-dock.visible {
  opacity: 1;
  pointer-events: all;
}

.dock-items {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05);
}

.dark .dock-items {
  background: rgba(44, 44, 46, 0.8);
  border-color: rgba(255, 255, 255, 0.1);
}

.dock-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.dock-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 122, 255, 0.1);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.dock-item:hover::before {
  opacity: 1;
}

.dock-item:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.2);
}

.dock-item:active {
  transform: translateY(0) scale(0.95);
}

.dock-icon {
  font-size: 20px;
  z-index: 1;
  position: relative;
}

/* Custom bounce animation for mobile dock */
@keyframes dockBounce {
  0% {
    transform: translateX(-50%) translateY(100px) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) translateY(-10px) scale(1.05);
  }
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 1;
  }
}

.mobile-dock.visible {
  animation: dockBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Hide dock on desktop */
@media (min-width: 769px) {
  .mobile-dock {
    display: none;
  }
}

/* Pulse animation for scroll progress */
@keyframes progressPulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(0, 122, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 122, 255, 0.6);
  }
}

.scroll-progress {
  animation: progressPulse 2s ease-in-out infinite;
}
</style>
