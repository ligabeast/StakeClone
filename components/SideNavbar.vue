<template>
  <div
    class="flex flex-col h-screen bg-gray-700 space-y-3"
    :class="{
      ...computedSidebar,
      'items-center overflow-y-hidden overflow-x-hidden ': !open,
    }"
  >
    <div class="w-full flex h-16 flex-row items-center" id="top">
      <button
        class="w-16 h-16 flex items-center justify-center group"
        @click="emit('toggleSideNavbar', props.open ? false : true)"
      >
        <svg
          fill="currentColor"
          viewBox="0 0 64 64"
          class="w-4 h-4 fill-[#b1bad3] group-hover:fill-white transition hover:cursor-pointer"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 0h64v13H0V0Zm0 25.5h64v13H0v-13ZM64 51H0v13h64V51Z"
          ></path>
        </svg>
      </button>
      <template v-if="open">
        <button
          class="text-white justify-center flex items-center rounded-md w-16 h-10 relative shadow-sm hover:shadow-lg mr-2"
          @click="selected = 'casino'"
          @mouseover="hover = 'casino'"
          @mouseleave="hover = ''"
        >
          <img
            :src="
              selected === 'casino' || hover === 'casino'
                ? casinoSelected
                : casinoIdle
            "
            alt="logo"
            class="w-full h-full rounded-md absolute -z-10"
          />
          <span class="font-bold">Casino</span>
        </button>
        <button
          class="text-white justify-center flex items-center rounded-md w-16 h-10 relative shadow-sm hover:shadow-lg"
          @click="selected = 'sport'"
          @mouseover="hover = 'sport'"
          @mouseleave="hover = ''"
        >
          <img
            :src="
              selected === 'sport' || hover === 'sport'
                ? sportSelected
                : sportIdle
            "
            alt="logo"
            class="w-full h-full rounded-md absolute -z-10"
          />
          <span class="font-bold">Sport</span>
        </button>
      </template>
    </div>
    <template v-if="!open">
      <button
        class="text-white justify-center flex items-center px-2 py-1 rounded-sm w-10 h-10 relative shadow-sm hover:shadow-lg"
        @click="selected = 'casino'"
        @mouseover="hover = 'casino'"
        @mouseleave="hover = ''"
      >
        <img
          :src="
            selected === 'casino' || hover === 'casino'
              ? casinoSmallSelected
              : casinoSmallIdle
          "
          alt="logo"
          class="w-full h-full rounded-sm absolute -z-10"
        />
      </button>
      <button
        class="text-white justify-center flex items-center px-2 py-1 rounded-sm w-10 h-10 relative shadow-sm hover:shadow-lg"
        @click="selected = 'sport'"
        @mouseover="hover = 'sport'"
        @mouseleave="hover = ''"
      >
        <img
          :src="
            selected === 'sport' || hover === 'sport'
              ? sportsSmallSelected
              : sportsSmallIdle
          "
          alt="logo"
          class="w-full h-full rounded-sm absolute -z-10"
        />
      </button>
    </template>
    <SliderMenu :open="open" />
  </div>
</template>

<script setup>
import casinoSelected from "../assets/backgrounds/CasinoButtonSelected.jpg";
import casinoIdle from "../assets/backgrounds/CasinoButtonIdle.jpg";
import sportSelected from "../assets/backgrounds/SportsButtonSelected.jpg";
import sportIdle from "../assets/backgrounds/SportsButtonIdle.jpg";
import sportsSmallSelected from "../assets/backgrounds/SportsButtonSmallSelected.jpg";
import sportsSmallIdle from "../assets/backgrounds/SportsButtonSmallIdle.jpg";
import casinoSmallSelected from "../assets/backgrounds/CasinoButtonSmallSelected.jpg";
import casinoSmallIdle from "../assets/backgrounds/CasinoButtonSmallIdle.jpg";

const emit = defineEmits(["toggleSideNavbar"]);
const props = defineProps({
  open: Boolean,
  computedSidebar: Object,
});

const selected = ref("casino");
const hover = ref("");
</script>

<style scoped>
#top {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.1) 0px 4px 6px -2px;
}
</style>
