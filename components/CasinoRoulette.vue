<template>
  <div class="flex h-full">
    <div class="w-80 p-4 flex flex-col space-y-4">
      <ModeSelector
        :mode="mode"
        @modechange="mode = $event"
      />
      <RouletteCoinSelector
        :openMoney="openMoney"
        @betChanged="handleBetChange"
        :selectedBet="selectedBet"
      />
      <StaticAmount
        :amount="totalBet"
        title="Total Bet"
      />
      <BetButton @clicked="handleRequestBet" />
    </div>
    <div class="p-4 bg-gray-700 w-full h-full flex flex-col justify-between">
      <div class="flex flex-col justify-between items-center h-full">
        <RouletteWheel />
        <RouletteBettingTable
          :selectedBet="selectedBet"
          @totalBetChanged="totalBet = $event"
          :openMoney="openMoney"
        />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";

const countDown = ref(0);
const winningNumber = ref(null);
const mode = ref("manu");
const last100Numbers = ref([]);
const totalBet = ref(0);

const authStore = useAuthStore();
const deposit = ref(authStore.deposit);

const selectedBet = ref(0);
if (deposit.value > 0.5) {
  selectedBet.value = 0.5;
}

const openMoney = computed(() => {
  return deposit.value - totalBet.value;
});

watch(() => authStore.deposit, (newDeposit) => {
  deposit.value = newDeposit;
});

const multiplicator = computed(() => {
  return 1;
});

function handleRequestBet() {
  console.log("Bet requested");
}

function handleBetChange(amount: number) {
  selectedBet.value = amount;
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
