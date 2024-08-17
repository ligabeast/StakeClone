<template>
  <div class="flex flex-col justify-center">
    <span class="text-gray-200 text-xs font-medium px-1">
      {{ props.title }}</span>
    <div
      class="bg-gray-400 shadow-md rounded-md h-10 group w-full p-2 hover:ring-[1.5px] hover:ring-gray-300 transition hover:cursor-text">
      <span class="font-medium text-sm text-white">
        {{ formattedAmount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const formattedAmount = computed(() => {
  if (!props.amount) return "0.00";
  if (!props.multiplicator) return props.amount.toFixed(2);
  return (props.amount * props.multiplicator).toFixed(2);
});

const props = defineProps<{
  amount: number;
  multiplicator?: number;
  title: string;
}>();
</script>
