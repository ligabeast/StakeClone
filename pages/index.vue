<template>
  <p>Home {{ game }}</p>
</template>

<script setup lang="ts">
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
const { data: game } = await useAsyncQuery(query, variables);
</script>
