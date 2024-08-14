<template>
  <div class="w-full bg-gray-500 h-20 rounded-md shadow-md flex space-x-2">
    <template v-for="item in items">
      <DiceOdd
        :title="item.title"
        :icon="item.icon"
        :value="item.value"
        :clickable="item.clickable"
        @click="$emit('click', item)"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  multiplier: number;
  rollUnder: number;
  winChance: number;
  overMode: boolean;
}>();

const items = computed(() => {
  return [
    {
      title: "Multiplier",
      icon: '<svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path d="M55.92 7.227H43.493L32 23.307 20.507 7.227H8.08L25.787 32 8.08 56.773h12.453L32 40.693l11.467 16.08H55.92L38.213 32 55.92 7.227Z"></path></svg>',
      value: props.multiplier.toString(),
      clickable: false,
    },
    {
      title: props.overMode ? "Roll Over" : "Roll Under",
      icon: '<svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.94 21.198a15.999 15.999 0 0 0-3.673 7.496h5.066L10.667 43.707 0 28.694h5.467A26.667 26.667 0 0 1 49.653 11.84l-6.986 8a16 16 0 0 0-22.728 1.358Zm33.394-.904L64 35.307h-5.333A26.667 26.667 0 0 1 14.48 52.16l6.987-8a16 16 0 0 0 26.267-8.853h-5.067l10.667-15.013Z"></path></svg>',
      value: props.rollUnder.toString(),
      clickable: true,
    },
    {
      title: "Win Chance",
      icon: '<svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path d="M18.38 29.904c6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524-6.364 0-11.525 5.16-11.525 11.524 0 6.364 5.16 11.524 11.524 11.524Zm0-14.666a3.142 3.142 0 1 1-.001 6.285 3.142 3.142 0 0 1 0-6.285Zm27.24 18.858c-6.364 0-11.524 5.16-11.524 11.524 0 6.364 5.16 11.524 11.524 11.524 6.364 0 11.524-5.16 11.524-11.524 0-6.364-5.16-11.524-11.524-11.524Zm0 14.666a3.142 3.142 0 1 1 0-6.285 3.142 3.142 0 0 1 0 6.285Zm.585-41.904L6.857 57.144h10.644L56.85 6.858H46.205Z"></path></svg>',
      value: (props.winChance * 100).toString(),
      clickable: false,
    },
  ];
});
</script>
