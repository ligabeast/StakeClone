<template>
  <div
    class="w-full h-full flex flex-col relative overflow-x-hidden bg-gray-500"
  >
    <SideNavbar
      class="fixed left-0 top-0 z-50"
      @toggleSideNavbar="
        (e) => {
          openSideNavbar = e;
        }
      "
      :open="openSideNavbar"
      :computedSidebar="computedSidebar"
    />
    <div
      class="h-full flex flex-col w-full bg-gray-600"
      :class="fullWidthMinusSidebar"
    >
      <div class="flex justify-end">
        <TopNavbar
          class="fixed z-40 h-16 right-0 top-0"
          :fullWidthMinusSidebar="fullWidthMinusSidebar"
        />
      </div>
      <div
        class="mt-16 px-52"
        :class="{ ...marginLeftContainer, ...fullWidthMinusSidebar }"
      >
        <!-- Content -->
        <slot />
      </div>
      <div
        :class="{ ...marginLeftContainer, ...fullWidthMinusSidebar }"
        class="bg-[#071d2a]"
      >
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
const openSideNavbar = ref(false);

const computedSidebar = computed(() => {
  return {
    "w-60": openSideNavbar.value,
    "w-16": !openSideNavbar.value,
  };
});
const marginLeftContainer = computed(() => {
  return {
    "ml-60": openSideNavbar.value,
    "ml-16": !openSideNavbar.value,
  };
});
const fullWidthMinusSidebar = computed(() => {
  return {
    "w-[calc(100vw_-_15rem)]": openSideNavbar.value,
    "w-[calc(100vw_-_4rem)]": !openSideNavbar.value,
  };
});
</script>

<style>
html,
body,
#__nuxt {
  width: 100% !important;
  height: 100% !important;
  margin: 0;
  padding: 0;
}
</style>
