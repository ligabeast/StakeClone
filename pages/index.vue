<template>
  <p>Home</p>
</template>

<script setup lang="ts">
import { useMyFetch } from "~/composable/useMyFetch";

definePageMeta({
  layout: "main",
});

const query = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      name
    }
  }
`;
const variables = { id: 5 };
onMounted(async () => {
  const { data } = await useAsyncQuery(query, variables);
  console.log(data.value);
});
</script>
