<template>
  <div class="flex h-full">
    <div class="w-80 p-4 flex flex-col space-y-4">
      <ModeSelector :mode="mode" @modechange="mode = $event" />
      <RouletteCoinSelector />
      <StaticAmount :amount="50" title="Total Bet" />
      <BetButton @clicked="handleRequestBet" />
    </div>
    <div class="p-4 bg-gray-700 w-full h-full flex flex-col justify-between">
      <div></div>
      <div class="flex justify-center items-center">rechts</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const countDown = ref(0);
const winningNumber = ref(null);
const mode = ref("manu");
const last100Numbers = ref([]);

const multiplicator = computed(() => {
  return 1;
});

function handleRequestBet() {
  console.log("Bet requested");
}

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
