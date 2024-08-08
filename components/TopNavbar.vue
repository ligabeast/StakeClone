<template>
  <div
    class="flex justify-between px-52 bg-[#1a2c38]"
    id="box"
    :class="fullWidthMinusSidebar"
  >
    <NuxtLink to="/casino">
      <StakeIcon />
    </NuxtLink>
    <div v-if="authStore.isAuthenticated" class="flex items-center">
      <div
        class="w-28 bg-gray-700 h-10 rounded-l-md hover:cursor-pointer hover:bg-gray-800 transition"
      >
        <div
          class="flex space-x-1 justify-between px-5 items-center text-white h-full"
        >
          <span></span>
          <div class="text-sm text-gray-300 flex space-x-2">
            <span class="font-medium text-white select-none">{{ deposit }}</span
            ><span class="select-none">$</span>
          </div>
          <svg
            fill="currentColor"
            viewBox="0 0 64 64"
            class="w-3 text-gray-300"
            style="transform: rotate(0deg)"
          >
            <title></title>
            <path
              d="M32.271 49.763 9.201 26.692l6.928-6.93 16.145 16.145 16.144-16.144 6.93 6.929-23.072 23.07h-.005Z"
            ></path>
          </svg>
        </div>
      </div>
      <div
        class="rounded-r-md bg-blue-500 hover:cursor-pointer hover:bg-blue-600 w-14 font-medium h-10 flex items-center justify-center"
      >
        <span class="text-white text-xs font-medium">Wallet</span>
      </div>
    </div>
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
        <div class="flex space-x-5 items-center">
          <button
            class="flex space-x-2 text-gray-200 hover:text-white transition"
          >
            <svg fill="currentColor" viewBox="0 0 64 64" class="w-3" style="">
              <title></title>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.266 3.893a23.1 23.1 0 1 1 25.668 38.414A23.1 23.1 0 0 1 10.266 3.893Zm5.112 30.764a13.9 13.9 0 1 0 15.444-23.114 13.9 13.9 0 0 0-15.444 23.114ZM38.55 46.33a28.002 28.002 0 0 0 7.78-7.78L64 56.22 56.22 64 38.55 46.33Z"
              ></path>
            </svg>
            <span class="text-sm font-medium">Search</span>
          </button>
          <button>
            <svg
              fill="currentColor"
              viewBox="0 0 64 64"
              class="w-4 text-white"
              style=""
            >
              <title></title>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M48.322 30.536A19.63 19.63 0 0 0 51.63 19.63 19.619 19.619 0 0 0 32 0a19.63 19.63 0 1 0 16.322 30.536ZM42.197 43.97a26.63 26.63 0 0 0 8.643-5.78A19.84 19.84 0 0 1 64 56.86V64H0v-7.14a19.84 19.84 0 0 1 13.16-18.67 26.63 26.63 0 0 0 29.037 5.78Z"
              ></path>
            </svg>
          </button>
          <button>
            <svg
              fill="currentColor"
              viewBox="0 0 64 64"
              class="text-white w-4"
              style=""
            >
              <title></title>
              <path
                d="M56.213 38.053v10.374H7.787V38.053h6.906v-15.84c.038-8.3 5.912-15.216 13.728-16.86l.112-.02V3.467a3.466 3.466 0 0 1 6.932 0v1.866c7.954 1.668 13.84 8.624 13.84 16.956v15.844l6.908-.08ZM32 63.999c5.73 0 10.374-4.644 10.374-10.374H21.627c0 5.73 4.644 10.374 10.374 10.374H32Z"
              ></path>
            </svg>
          </button>
          <button>
            <svg
              fill="currentColor"
              viewBox="0 0 64 64"
              class="w-4 text-white"
              style=""
            >
              <title></title>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.998.025h38.97a2.998 2.998 0 0 1 2.997 2.998v32.974a2.998 2.998 0 0 1-2.998 2.998H20.484L3.997 49.986V38.995h-1A2.998 2.998 0 0 1 0 35.997V3.023A2.998 2.998 0 0 1 2.998.025ZM51.96 8.02h8.993A2.998 2.998 0 0 1 64 11.017v52.958h-4.996a5.885 5.885 0 0 0-5.535-4.996 5.886 5.886 0 0 0-5.506 4.996h-7.994a5.886 5.886 0 0 0-5.485-4.996 5.896 5.896 0 0 0-5.506 4.996h-4.996V45.99h20.254a7.724 7.724 0 0 0 7.724-7.723V8.019Z"
              ></path>
            </svg>
          </button>
          <button class="text-white" @click="handleLogoutRequest">
            Logout
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyFetch } from "~/composable/useMyFetch";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const cookie = useCookie("token");

const deposit = ref(authStore.deposit);

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

      console.log("login success: ", data);
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

      console.log("register success: ", data);
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
