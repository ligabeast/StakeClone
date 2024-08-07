<template>
  <a
    class="inline-flex w-28 hover:cursor-pointer hover:bg-gray-300 relative items-center gap-2 justify-center rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:text-white border border-solid border-white text-sm leading-none py-[0.8125rem] px-[1rem]"
    style="min-width: 7.5rem; max-width: 10.625rem"
    >{{ props.text }}</a
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>
