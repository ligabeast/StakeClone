<template>
  <div class="w-full flex flex-col space-y-1 px-4 py-2">
    <span class="text-gray-200 font-medium text-xs">{{ props.title }}</span>
    <div class="flex ring-2 ring-gray-400 h-8 bg-gray-700 rounded-sm"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
