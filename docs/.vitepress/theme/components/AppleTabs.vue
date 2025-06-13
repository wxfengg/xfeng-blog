<template>
  <div class="apple-tabs">
    <div class="tab-nav">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.key"
        class="tab-button"
        :class="{ 'is-active': activeTab === tab.key }"
        @click="setActiveTab(tab.key)"
      >
        <span v-if="tab.icon" class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
      <div 
        class="tab-indicator" 
        :style="indicatorStyle"
      ></div>
    </div>
    
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'tab-change'])

const activeTab = ref(props.modelValue || props.tabs[0]?.key)
const tabButtonRefs = ref([])
const indicatorStyle = ref({})

const setActiveTab = (tabKey) => {
  activeTab.value = tabKey
  emit('update:modelValue', tabKey)
  emit('tab-change', tabKey)
  updateIndicator()
}

const updateIndicator = async () => {
  await nextTick()
  const activeButton = document.querySelector('.tab-button.is-active')
  if (activeButton) {
    const rect = activeButton.getBoundingClientRect()
    const navRect = activeButton.parentElement.getBoundingClientRect()
    
    indicatorStyle.value = {
      left: `${activeButton.offsetLeft}px`,
      width: `${activeButton.offsetWidth}px`
    }
  }
}

onMounted(() => {
  updateIndicator()
})
</script>

<style scoped>
.apple-tabs {
  width: 100%;
}

.tab-nav {
  position: relative;
  display: flex;
  background: var(--vp-c-surface-1);
  backdrop-filter: var(--vp-glass-backdrop);
  -webkit-backdrop-filter: var(--vp-glass-backdrop);
  border-radius: var(--vp-radius-medium);
  padding: 4px;
  box-shadow: var(--vp-shadow-1);
  border: 1px solid var(--vp-glass-border);
  overflow: hidden;
}

.tab-button {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-radius: var(--vp-radius-small);
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
}

.tab-button:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-surface-2);
}

.tab-button.is-active {
  color: var(--vp-c-brand-1);
}

.tab-icon {
  font-size: 16px;
}

.tab-label {
  white-space: nowrap;
}

.tab-indicator {
  position: absolute;
  top: 4px;
  bottom: 4px;
  background: var(--vp-c-bg);
  border-radius: var(--vp-radius-small);
  box-shadow: var(--vp-shadow-1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  border: 1px solid var(--vp-glass-border);
}

.tab-content {
  margin-top: 24px;
}

/* Responsive design */
@media (max-width: 768px) {
  .tab-button {
    padding: 10px 12px;
    font-size: 13px;
  }
  
  .tab-icon {
    font-size: 14px;
  }
}
</style>
