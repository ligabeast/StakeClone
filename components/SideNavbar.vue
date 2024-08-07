<template>
  <div
    class="flex flex-col items-center h-screen bg-gray-700"
    :class="computedSidebar"
  >
    <div class="w-full h-16 flex items-center justify-center" id="top">
      <svg
        fill="currentColor"
        viewBox="0 0 64 64"
        class="w-4 h-4 fill-[#b1bad3] hover:fill-white transition hover:cursor-pointer"
        @click="emit('toggleSideNavbar', props.open ? false : true)"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 0h64v13H0V0Zm0 25.5h64v13H0v-13ZM64 51H0v13h64V51Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["toggleSideNavbar"]);
const props = defineProps({
  open: Boolean,
  computedSidebar: Object,
});

onMounted(() => {});
</script>

<style>
#top {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.1) 0px 4px 6px -2px;
}
</style>
