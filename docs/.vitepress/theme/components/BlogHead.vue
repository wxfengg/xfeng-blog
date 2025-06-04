<script setup lang="ts">
const props = defineProps({
  author: {
    type: String,
    default: 'XFeng',
  },
  date: {
    type: String,
    default: new Date().toISOString().split('T')[0], // 默认当前日期
  },
  tags: {
    type: String,
    validator: (value: string) => ['文章📜', '碎碎念💬'].includes(value),
    default: '文章📜',
  },
})
</script>

<template>
<div class="blog-head">
  ✏️ {{ props.author }} &nbsp;&nbsp;&nbsp;丨&nbsp;&nbsp;&nbsp; 🕙 {{ props.date }} &nbsp;&nbsp;&nbsp;丨&nbsp;&nbsp;&nbsp; {{ props.tags }}
</div>
</template>

<style scoped>
.blog-head {
  margin-top: 10px;
  color: #999;
  font-size: 14px;
}
</style>
