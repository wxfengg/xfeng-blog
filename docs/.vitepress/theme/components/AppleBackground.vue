<template>
  <div class="apple-background">
    <!-- 动画背景粒子 -->
    <!-- <div class="particles">
      <div 
        v-for="n in 50" 
        :key="n" 
        class="particle"
        :style="getParticleStyle(n)"
      ></div>
    </div> -->
    
    <!-- 渐变球体 -->
    <div class="gradient-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
    </div>
    
    <!-- 网格渐变叠加 -->
    <div class="mesh-gradient"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const getParticleStyle = (index) => {
  const size = Math.random() * 4 + 1
  const x = Math.random() * 100
  const y = Math.random() * 100
  const delay = Math.random() * 20
  const duration = Math.random() * 10 + 10
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}%`,
    top: `${y}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped>
.apple-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(0, 122, 255, 0.05) 0%,
    rgba(88, 86, 214, 0.05) 25%,
    rgba(175, 82, 222, 0.05) 50%,
    rgba(255, 45, 146, 0.05) 75%,
    rgba(255, 149, 0, 0.05) 100%);
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: rgba(0, 122, 255, 0.3);
  border-radius: 50%;
  animation: float-particle linear infinite;
  pointer-events: none;
}

@keyframes float-particle {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.gradient-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
  animation: float-orb 20s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #007AFF, #5856D6);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #AF52DE, #FF2D92);
  top: 60%;
  right: 10%;
  animation-delay: 5s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #FF9500, #FF6B00);
  bottom: 20%;
  left: 20%;
  animation-delay: 10s;
}

.orb-4 {
  width: 180px;
  height: 180px;
  background: linear-gradient(135deg, #30D158, #007AFF);
  top: 30%;
  right: 30%;
  animation-delay: 15s;
}

@keyframes float-orb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -30px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  75% {
    transform: translate(30px, 10px) scale(1.05);
  }
}

.mesh-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(0, 122, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(175, 82, 222, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255, 149, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(255, 45, 146, 0.1) 0%, transparent 50%);
  animation: mesh-movement 30s ease-in-out infinite;
}

@keyframes mesh-movement {
  0%, 100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1) rotate(2deg);
  }
}

/* Dark mode adjustments */
.dark .apple-background {
  background: linear-gradient(135deg, 
    rgba(0, 122, 255, 0.02) 0%,
    rgba(88, 86, 214, 0.02) 25%,
    rgba(175, 82, 222, 0.02) 50%,
    rgba(255, 45, 146, 0.02) 75%,
    rgba(255, 149, 0, 0.02) 100%);
}

.dark .particle {
  background: rgba(10, 132, 255, 0.2);
}

.dark .orb {
  opacity: 0.15;
}

.dark .mesh-gradient {
  background: 
    radial-gradient(circle at 20% 50%, rgba(10, 132, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(175, 82, 222, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255, 149, 0, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(255, 45, 146, 0.05) 0%, transparent 50%);
}
</style>
