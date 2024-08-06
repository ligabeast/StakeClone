<template>
  <p>Game: {{ games }}</p>
  <p>Bets: {{ bets }}</p>
</template>

<script setup lang="ts">
const queryGetAllGames = gql`
  query {
    games {
      id
      name
    }
  }
`;
const queryGetLast7Bets = gql`
  query {
    bets(
      status: ["won", "lost"]
      limit: 7
      order_by: "createdAt"
      order_dir: "desc"
    ) {
      id
      gameid
      createdAt
      bet_status
      payout
    }
  }
`;

const { data: games } = await useAsyncQuery(queryGetAllGames);
const { data: bets } = await useAsyncQuery(queryGetLast7Bets);
</script>
