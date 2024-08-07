<template>
  <div
    class="inline-flex space-x-2 w-fit rounded-full bg-gray-700 p-1 h-16 text-white text-xs"
  >
    <template v-for="item in selectionBar">
      <div
        class="inline-flex justify-center rounded-full items-center px-4 py-2 hover:bg-gray-500 transition duration-500 ease-in-out hover:cursor-pointer"
        :class="{ 'bg-gray-500': item.selected }"
      >
        <div class="flex space-x-2">
          <div class="w-4 text-gray-200" v-html="props.icons[item.name]"></div>
          <span class="font-bold">{{ item.name }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icons: { [key: string]: string };
}>();
const selectionBar: {
  name:
    | "Lobby"
    | "Stake Originals"
    | "Slots"
    | "Live Casino"
    | "Game Shows"
    | "Stake Exclusives"
    | "New Releases";
  selected: boolean;
}[] = [
  { name: "Lobby", selected: true },
  { name: "Stake Originals", selected: false },
  { name: "Slots", selected: false },
  { name: "Live Casino", selected: false },
  { name: "Game Shows", selected: false },
  { name: "Stake Exclusives", selected: false },
  { name: "New Releases", selected: false },
];
</script>
