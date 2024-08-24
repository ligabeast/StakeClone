<template>
  <div class="flex h-full">
    <div class="w-80 p-4 flex flex-col space-y-4 rounded-tl-lg">
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
      <BetButton
        @clicked="handleRequestBet"
        :betPlaced="betPlaced"
        :betsClosed="betsClosed"
      />
    </div>
    <div class="p-4 bg-gray-700 w-full h-full flex flex-col justify-between rounded-tr-lg">
      <div class="flex flex-col justify-between items-center h-full">
        <RouletteWheel
          :countDown="countDown"
          :showWinningNumber="showWinningNumber"
          :winningNumber="winningNumber"
          :last5Numbers="last5Numbers"
        />
        <div class="flex flex-row justify-between w-full items-center h-10">
          <button
            class="flex space-x-2 justify-center items-center h-full w-40 ring-gray-300 hover:ring-1 transition rounded-xl"
            @click="handleUndo"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 64 64"
              class="w-3 h-3 text-white"
              style=""
            >
              <title></title>
              <path
                d="M37.973 11.947H16.24l5.84-5.84L15.973 0 .053 15.92l15.92 15.92 6.107-6.107-5.76-5.76h21.653C47.92 19.973 56 28.053 56 38c0 9.947-8.08 18.027-18.027 18.027h-21.76v8h21.76C52.347 64.027 64 52.373 64 38c0-14.373-11.653-26.027-26.027-26.027v-.026Z"
              ></path>
            </svg>
            <span class="text-white font-medium">
              undo
            </span>
          </button>
          <button
            class="flex space-x-2 justify-center items-center h-full w-40 ring-gray-300 hover:ring-1 transition rounded-xl"
            @click="handleClean"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 64 64"
              class="w-3 h-3 text-white"
              style=""
            >
              <title></title>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M31.943 13.08c-9.37 0-17.128 6.904-18.476 16.004l4.798-.002-9.146 12.96-9.12-12.96h5.334l.012-.124C6.889 15.536 18.291 5.112 32.127 5.112a26.823 26.823 0 0 1 17.5 6.452l-5.334 6.186.02.018a18.584 18.584 0 0 0-12.37-4.688Zm22.937 8.752L64 34.792h-5.174l-.01.12C57.332 48.398 45.902 58.888 32.02 58.888a26.826 26.826 0 0 1-17.646-6.576l5.334-6.186a18.597 18.597 0 0 0 12.47 4.776c9.406 0 17.188-6.96 18.49-16.11h-4.934l9.146-12.96ZM19.708 46.126l-.016-.014.016.014Z"
              ></path>
            </svg>
            <span class="text-white font-medium">
              clean
            </span>
          </button>
        </div>
        <RouletteBettingTable
          :selectedBet="selectedBet"
          @newBet="handleNewBet"
          :openMoney="openMoney"
          :placedNumberBets="placedNumberBets"
          :placedAdditionalBets="placedAdditionalBets"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { useMyFetch } from "~/composable/useMyFetch";

const countDown = ref(0);
const winningNumber = ref(0);
const mode = ref("manu");
const last5Numbers = ref([]);

const history = ref<{ amount: number, type: string, index: number }[]>([]);

const placedNumberBets = ref(Array.from({ length: 37 }, () => 0));
const placedAdditionalBets = ref(Array.from({ length: 9 }, () => 0));

const authStore = useAuthStore();
const deposit = computed(() => authStore.deposit);

const betPlaced = ref(false);
const showWinningNumber = ref(false);

const selectedBet = ref(0);
if (deposit.value > 0.5) {
  selectedBet.value = 0.5;
}

const betsClosed = computed(() => {
  return (countDown.value <= 5);
})

const totalBet = computed(() => {
  return placedNumberBets.value.reduce((acc, curr) => acc + curr, 0) + placedAdditionalBets.value.reduce((acc, curr) => acc + curr, 0);
});

const openMoney = computed(() => {
  return deposit.value - totalBet.value;
});



async function handleRequestBet() {
  if (!authStore.isAuthenticated) {
    push.error("You need to be logged in to place a bet");
    return;
  }
  betPlaced.value = true;
  const data = await useMyFetch("/play/roulette", {
    method: "POST",
    body: JSON.stringify({
      placedNumberBets: placedNumberBets.value,
      placedAdditionalBets: placedAdditionalBets.value,
    }),
  }).catch((err) => {
    console.error(err);
  })
  if (!data) return;
  authStore.setDeposit(data.newBalance);
}

function handleBetChange(amount: number) {
  selectedBet.value = amount;
}

function handleUndo() {
  const lastBet = history.value.pop();
  if (lastBet) {
    const { amount, type, index } = lastBet;
    if (type === "number") {
      placedNumberBets.value[index] -= amount;
    } else {
      placedAdditionalBets.value[index] -= amount;
    }
  }
}

function handleNewBet({ amount, type, index }: { amount: number, type: string, index: number }) {
  if (type === "number") {
    placedNumberBets.value[index] += amount;
  } else {
    placedAdditionalBets.value[index] += amount;
  }
  history.value.push({ amount, type, index });
}

function handleClean() {
  placedNumberBets.value = Array.from({ length: 37 }, () => 0);
  placedAdditionalBets.value = Array.from({ length: 9 }, () => 0);
  history.value = [];
}

const config = useRuntimeConfig();
const ws = new WebSocket(`${config.public.websocketUrl}/roulette`);

ws.onopen = () => {
  console.log("Connected to WebSocket server");
  ws.send(JSON.stringify({ action: "authenticate", token: authStore.token }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data && data.action && data.action === "countdown") {
    showWinningNumber.value = false;
    countDown.value = Number(data.countdown);
    last5Numbers.value = data.last5Numbers;
  }
  if (data && data.action && data.action === "drawn") {
    winningNumber.value = Number(data.winningNumber);
    showWinningNumber.value = true;
    last5Numbers.value = data.last5Numbers;
    if (betPlaced.value) {
      betPlaced.value = false;
      authStore.setDeposit(Number.parseFloat(data.newBalance));
    }
  }
};

ws.onerror = (error) => {
  console.error("WebSocket error:", error);
  push.error("The WebSocket seems to be down, contact support");
};

ws.onclose = () => {
  console.log("WebSocket connection closed");
};

</script>