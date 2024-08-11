<template>
  <button
    class="h-14 bg-green-500 hover:bg-green-400 w-full rounded-md shadow-sm hover:shadow-lg transition"
    @click="emit('clicked')"
  >
    <span class="font-semibold text-md">Bet</span>
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits(["clicked"]);
</script>
