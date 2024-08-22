<template>
  <div class="w-full h-full flex flex-col relative overflow-x-hidden bg-gray-500">
    <Notivue v-slot="item">
      <Notification
        :item="item"
        :theme="slateTheme"
      >
        <NotificationProgress :item="item" />
      </Notification>
    </Notivue>
    <Transition name="fade">
      <LoginModal
        v-if="showLoginModal"
        @close-modal="showLoginModal = false"
        @success="push.success('Login successful!')"
        @userNotFound="push.error('Username of password is incorrect!')"
      />
    </Transition>
    <Transition name="fade">
      <RegisterModal
        v-if="showRegisterModal"
        @close-modal="showRegisterModal = false"
        @success="push.success('Registration successful!')"
        @usernameExists="push.error('Username already exists!')"
      />
    </Transition>
    <SideNavbar
      class="fixed left-0 top-0 z-40"
      @toggleSideNavbar="(e) => {
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
          class="fixed z-20 h-16 right-0 top-0"
          :fullWidthMinusSidebar="fullWidthMinusSidebar"
          @loginRequest="showLoginModal = true"
          @registerRequest="showRegisterModal = true"
          @logoutRequest="push.success('Logout successful!')"
        />
      </div>
      <div
        class="mt-16 pl-52 pr-64"
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
const showLoginModal = ref(false);
const showRegisterModal = ref(false);

import { slateTheme } from 'notivue'

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
