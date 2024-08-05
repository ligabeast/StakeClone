<template>
  <div class="w-full h-full">
    <div class="flex items-center justify-center w-full h-full">
      <div class="h-full bg-[#0f212e] shadow-inner" :class="computedSidebar">
        <SideNavbar
          @toggleSideNavbar="(e : boolean) => { openSideNavbar = e;}"
          :open="openSideNavbar"
        />
      </div>
      <div class="h-full flex flex-col bg-[#1a2c38]" :class="computedMain">
        <div class="w-full h-16 bg-[#1a2c38]"><TopNavbar /></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const openSideNavbar = ref(false);

const computedSidebar = computed(() => {
  return {
    "w-1/6": openSideNavbar.value,
    "w-16": !openSideNavbar.value,
  };
});

const computedMain = computed(() => {
  return {
    "w-5/6": openSideNavbar.value,
    "w-full": !openSideNavbar.value,
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
