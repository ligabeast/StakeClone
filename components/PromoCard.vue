<template>
  <div class="flex w-96 h-56 rounded-md bg-gray-500">
    <div class="flex flex-col justify-between space-y-3 w-1/2 p-4">
      <div class="flex flex-col space-y-2">
        <div
          class="bg-white px-1 rounded-sm flex justify-center items-center w-12"
        >
          <span class="text-black font-medium text-xs">Promo</span>
        </div>
        <div class="flex flex-col space-y-2">
          <p class="font-semibold text-white text-base">{{ props.title }}</p>
          <p class="text-white text-sm">{{ props.description }}</p>
        </div>
      </div>
      <Button2 :text="'Play Now'" />
    </div>
    <div class="w-1/2">
      <img :src="props.image" alt="promo" class="w-full h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  image: string;
}>();
</script>
