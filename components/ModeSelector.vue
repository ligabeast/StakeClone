<template>
  <div
    class="bg-gray-700 rounded-full h-12 w-fit flex items-center px-1 space-x-1"
  >
    <button
      class="rounded-full px-4 py-2 hover:bg-gray-400"
      :class="{ 'bg-gray-400': props.mode === 'manu' }"
      @click="emit('modechange', 'manu')"
    >
      <span class="text-white text-xs font-medium px-2">Manual</span>
    </button>
    <button
      class="rounded-full px-4 py-2 hover:bg-gray-400"
      @click="emit('modechange', 'auto')"
      :class="{ 'bg-gray-400': props.mode === 'auto' }"
    >
      <span class="text-white text-xs font-medium px-4">Auto</span>
    </button>
    <button
      class="rounded-full px-4 py-2 hover:bg-gray-400 group"
      @click="emit('modechange', 'strat')"
      :class="{ 'bg-gray-400': props.mode === 'strat' }"
    >
      <svg
        fill="currentColor"
        viewBox="0 0 64 64"
        class="w-4 h-6 text-gray-300 group-hover:text-gray-200 transition"
        style=""
      >
        <title></title>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.34 16.13h29.17L46.63 22l4.24 4.24L64 13.13 50.87 0l-4.24 4.24 5.88 5.89H23.34c-7.732 0-14 6.268-14 14h6a8 8 0 0 1 8-8Zm17.32 31.74H11.49L17.37 42l-4.24-4.24L0 50.87 13.13 64l4.24-4.24-5.88-5.89h29.17c7.732 0 14-6.268 14-14h-6a8 8 0 0 1-8 8Zm-5.23-12.44V44h-6.86v-8.57H20v-6.86h8.57V20h6.86v8.57H44v6.86h-8.57Z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ mode: string }>();
const emit = defineEmits(["modechange"]);
</script>
