<template>
  <div>
    <p>CountDown: {{ countDown }}</p>
    <p v-if="winningNumber">Winning Number: {{ winningNumber }}</p>
    <p v-if="last100Numbers.length > 0">
      Last100 Games: {{ last100Numbers.join(",") }}
    </p>
  </div>
</template>

<script setup lang="ts">
const countDown = ref(0);
const winningNumber = ref(null);
const last100Numbers = ref([]);

onMounted(() => {
  const config = useRuntimeConfig();
  const ws = new WebSocket(`${config.public.websocketUrl}/roulette`);

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data && data.action && data.action === "countdown") {
      countDown.value = data.countdown;
    }
    if (data && data.action && data.action === "drawn") {
      winningNumber.value = data.winningNumber;
      last100Numbers.value = data.last100Numbers;
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };
});
</script>
