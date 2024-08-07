<template>
  <button
    type="button"
    class="w-8 text-gray-400 h-8 transition hover:text-white p-2 outline-none"
  >
    <div v-html="props.svg"></div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  svg: string;
}>();
</script>
