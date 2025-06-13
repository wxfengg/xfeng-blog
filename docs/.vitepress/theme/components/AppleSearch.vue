<template>
  <div 
    class="apple-search" 
    :class="{ 'is-focused': isFocused, 'is-expanded': isExpanded }"
  >
    <div class="search-input-wrapper">
      <div class="search-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path 
            d="M21 21L16 16M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        </svg>
      </div>
      
      <input
        ref="searchInput"
        v-model="searchQuery"
        class="search-input"
        :placeholder="placeholder"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown="handleKeydown"
      />
      
      <button 
        v-if="searchQuery && showClear"
        class="search-clear"
        @click="clearSearch"
        aria-label="清除搜索"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path 
            d="M18 6L6 18M6 6L18 18" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    
    <Transition name="dropdown-fade">
      <div 
        v-if="showResults && (filteredResults.length > 0 || isLoading)"
        class="search-results"
      >
        <div v-if="isLoading" class="search-loading">
          <AppleLoadingSpinner />
          <span>搜索中...</span>
        </div>
        
        <div v-else>
          <div
            v-for="(result, index) in filteredResults"
            :key="result.id || index"
            class="search-result-item"
            :class="{ 'is-highlighted': highlightedIndex === index }"
            @click="selectResult(result)"
            @mouseenter="highlightedIndex = index"
          >
            <div class="result-icon" v-if="result.icon">{{ result.icon }}</div>
            <div class="result-content">
              <div class="result-title" v-html="highlightText(result.title)"></div>
              <div class="result-description" v-if="result.description">
                {{ result.description }}
              </div>
            </div>
            <div class="result-meta" v-if="result.type">
              <span class="result-type">{{ result.type }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="!isLoading && filteredResults.length === 0" class="search-no-results">
          <div class="no-results-icon">🔍</div>
          <div class="no-results-text">未找到相关结果</div>
          <div class="no-results-suggestion">尝试使用不同的关键词</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import AppleLoadingSpinner from './AppleLoadingSpinner.vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索...'
  },
  results: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  showClear: {
    type: Boolean,
    default: true
  },
  expandOnFocus: {
    type: Boolean,
    default: true
  },
  debounceDelay: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['search', 'select', 'clear', 'focus', 'blur'])

const searchInput = ref(null)
const searchQuery = ref('')
const isFocused = ref(false)
const isExpanded = ref(false)
const showResults = ref(false)
const highlightedIndex = ref(-1)
const isLoading = ref(false)

let debounceTimer = null

const filteredResults = computed(() => {
  if (!searchQuery.value || isLoading.value) return props.results
  
  const query = searchQuery.value.toLowerCase()
  return props.results.filter(result => 
    result.title.toLowerCase().includes(query) ||
    (result.description && result.description.toLowerCase().includes(query))
  )
})

const handleFocus = () => {
  isFocused.value = true
  if (props.expandOnFocus) {
    isExpanded.value = true
  }
  showResults.value = true
  emit('focus')
}

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false
    isExpanded.value = false
    showResults.value = false
    highlightedIndex.value = -1
  }, 200)
  emit('blur')
}

const handleInput = () => {
  highlightedIndex.value = -1
  
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  
  debounceTimer = setTimeout(() => {
    if (searchQuery.value.trim()) {
      isLoading.value = true
      emit('search', searchQuery.value)
      
      setTimeout(() => {
        isLoading.value = false
      }, 500)
    }
  }, props.debounceDelay)
}

const handleKeydown = (event) => {
  if (!showResults.value || filteredResults.value.length === 0) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = Math.min(
        highlightedIndex.value + 1, 
        filteredResults.value.length - 1
      )
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1)
      break
    case 'Enter':
      event.preventDefault()
      if (highlightedIndex.value >= 0) {
        selectResult(filteredResults.value[highlightedIndex.value])
      }
      break
    case 'Escape':
      searchInput.value?.blur()
      break
  }
}

const selectResult = (result) => {
  emit('select', result)
  showResults.value = false
  searchInput.value?.blur()
}

const clearSearch = () => {
  searchQuery.value = ''
  highlightedIndex.value = -1
  emit('clear')
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const highlightText = (text) => {
  if (!searchQuery.value) return text
  
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

watch(() => props.loading, (newVal) => {
  isLoading.value = newVal
})
</script>

<style scoped>
.apple-search {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--vp-c-surface-2);
  backdrop-filter: var(--vp-glass-backdrop);
  -webkit-backdrop-filter: var(--vp-glass-backdrop);
  border: 1px solid var(--vp-glass-border);
  border-radius: var(--vp-radius-medium);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.apple-search.is-focused .search-input-wrapper {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  background: var(--vp-c-bg);
}

.apple-search.is-expanded .search-input-wrapper {
  border-radius: var(--vp-radius-medium) var(--vp-radius-medium) 0 0;
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--vp-c-text-3);
  transition: color 0.2s;
}

.apple-search.is-focused .search-icon {
  color: var(--vp-c-brand-1);
}

.search-input {
  flex: 1;
  height: 40px;
  padding: 0 12px 0 0;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin: 0 8px;
  border: none;
  background: var(--vp-c-surface-1);
  border-radius: 50%;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-clear:hover {
  background: var(--vp-c-surface-2);
  color: var(--vp-c-text-1);
  transform: scale(1.05);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--vp-c-bg);
  backdrop-filter: var(--vp-glass-backdrop);
  -webkit-backdrop-filter: var(--vp-glass-backdrop);
  border: 1px solid var(--vp-glass-border);
  border-top: none;
  border-radius: 0 0 var(--vp-radius-medium) var(--vp-radius-medium);
  box-shadow: var(--vp-shadow-3);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.search-loading {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid var(--vp-glass-border);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover,
.search-result-item.is-highlighted {
  background: var(--vp-c-surface-1);
}

.result-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.result-content {
  flex: 1;
  min-width: 0;
}

.result-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 2px;
}

.result-title :deep(mark) {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 1px 3px;
  border-radius: 3px;
  font-weight: 600;
}

.result-description {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.result-meta {
  flex-shrink: 0;
}

.result-type {
  font-size: 11px;
  background: var(--vp-c-surface-2);
  color: var(--vp-c-text-3);
  padding: 2px 6px;
  border-radius: var(--vp-radius-small);
  text-transform: uppercase;
  font-weight: 500;
}

.search-no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 16px;
  text-align: center;
}

.no-results-icon {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.no-results-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.no-results-suggestion {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .apple-search {
    max-width: none;
  }
  
  .search-results {
    max-height: 250px;
  }
  
  .search-result-item {
    padding: 10px 12px;
  }
}
</style>
