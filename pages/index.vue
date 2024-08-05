<template>
  <p>Home</p>
</template>

<script setup>
import { useMyFetch } from "~/composable/useMyFetch";

definePageMeta({
  layout: "main",
});

//on mount
onMounted(async () => {
  console.log("Home page mounted");
  useMyFetch("/index", {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
