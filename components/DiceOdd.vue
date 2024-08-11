<template>
  <div class="w-full flex flex-col space-y-1 px-4 py-2">
    <span class="text-gray-200 font-medium text-xs">{{ props.title }}</span>
    <div
      class="flex ring-2 ring-gray-400 h-8 bg-gray-700 rounded-sm px-3 items-center justify-between"
      @click="if (props.clickable) $emit('click');"
      :class="{ 'hover:cursor-pointer': props.clickable }"
    >
      <span class="text-white text-sm font-medium select-none">{{
        Number.parseFloat(props.value).toFixed(2)
      }}</span>
      <div v-html="props.icon" class="w-4 text-gray-200"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["click"]);
const props = defineProps<{
  title: string;
  icon: string;
  value: string;
  clickable: boolean;
}>();
</script>
