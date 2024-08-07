<template>
  <div
    class="flex justify-between px-60 bg-gray-700"
    id="box"
    :class="fullWidthMinusSidebar"
  >
    <NuxtLink to="/casino">
      <StakeIcon />
    </NuxtLink>
    <div class="flex items-center">
      <template v-if="!authStore.isAuthenticated">
        <button
          class="rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-transparent text-white hover:bg-transparent hover:text-white focus-visible:outline-none text-sm leading-none py-[0.9375rem] px-[1.25rem]"
          @click="handleLoginRequest"
        >
          Sign in
        </button>
        <button
          class="rounded-sm font-semibold whitespace-nowrap ring-offset-background transition disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] bg-blue-500 text-white hover:bg-blue-600 hover: focus-visible:outline-white text-sm leading-none shadow-md py-[0.9375rem] px-[1.25rem]"
          @click="handleRegisterRequest"
        >
          Register
        </button>
      </template>
      <template v-else>
        <button class="text-white" @click="handleLogoutRequest">Logout</button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ObjectEmitsOptions } from "vue";
import { useMyFetch } from "~/composable/useMyFetch";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const props = defineProps<{
  fullWidthMinusSidebar: Object;
}>();

function handleLogoutRequest() {
  // delete cookie
  const cookie = useCookie("token");
  cookie.value = "";

  // delete store
  authStore.reset();
}

function handleLoginRequest() {
  useMyFetch("/login", {
    method: "POST",
    body: JSON.stringify({
      username: "test",
      password: "123",
    }),
  })
    .then((data) => {
      authStore.setDeposit(data.deposit);
      authStore.setUsername(data.username);
      authStore.setToken(data.token);

      const token = useCookie("token");
      token.value = data.token;
    })
    .catch((error) => {
      console.log("login failed: ", error);
    });
}

function handleRegisterRequest() {
  useMyFetch("/register", {
    method: "POST",
    body: JSON.stringify({
      username: "test",
      password: "123",
    }),
  })
    .then((data) => {
      authStore.setDeposit(data.deposit);
      authStore.setUsername(data.username);
      authStore.setToken(data.token);

      const token = useCookie("token");
      token.value = data.token;
    })
    .catch((error) => {
      console.log("register failed ", error);
    });
}
</script>
<style>
#box {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.12) 0px 2px 4px -1px;
}
</style>
