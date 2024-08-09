<template>
  <button
    :to="props.link"
    class="flex items-center p-2 rounded-lg w-full h-10 hover:bg-gray-400"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  link: string;
}>();
</script>
