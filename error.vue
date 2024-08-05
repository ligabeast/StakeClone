<template>
  <div class="h-full w-full flex flex-col items-center justify-center">
    <div class="text-[15rem] font-bold relative">
      <span>404</span>
    </div>
    <p class="text-xl mt-8">
      Oops! The page you were looking for doesn't exist.
    </p>
    <p class="mt-4">
      You may have mistyped the address or the page may have moved.
    </p>
    <nuxt-link
      to="/"
      class="mt-8 inline-block px-4 py-2 bg-blue-600 text-white rounded"
    >
      Go to home page
    </nuxt-link>
  </div>
</template>
