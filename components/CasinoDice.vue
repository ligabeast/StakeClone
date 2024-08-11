<template>
  <div class="flex h-full">
    <div class="w-80 p-4 flex flex-col space-y-4">
      <ModeSelector :mode="mode" @modechange="mode = $event" />
      <BetAmountSelector
        :amount="amount"
        :amount-error="amountError"
        @amountchange="handleAmountChange"
        @doubleamount="handleDoubleAmount"
        @halveamount="handleHalveAmount"
      />
      <ProfitView
        :multiplicator="multiplicator"
        :amount="Number.parseFloat(amount) ?? 0"
      />
      <BetButton @clicked="handleRequestBet" />
    </div>
    <div class="p-4 bg-gray-700 w-full h-full flex flex-col justify-between">
      <div></div>
      <div class="flex justify-center items-center">
        <DiceOddSelector
          v-model="sliderPrecentage"
          :overMode="overMode"
          :last-bet="lastBet"
          :showBet="showBet"
        />
      </div>
      <DiceOddBar
        :multiplier="multiplicator"
        :rollUnder="rollUnder"
        :winChance="winChance"
        :overMode="overMode"
        @click="handleOddItemClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyFetch } from "~/composable/useMyFetch";
import { useAuthStore } from "~/stores/auth";

const amount = ref("");
const amountError = ref(false);

const mode = ref("manu");
const sliderPrecentage = ref(50);
const overMode = ref(true);
const connectionCounter = ref(0);

const showBet = ref(false);
const lastBet = ref({
  value: 0,
  win: false,
});

const authStore = useAuthStore();

const multiplicator = computed(() => {
  return 100 / sliderPrecentage.value;
});

const rollUnder = computed(() => {
  if (overMode.value) {
    return sliderPrecentage.value;
  } else {
    return 100 - sliderPrecentage.value;
  }
});

const winChance = computed(() => {
  return overMode.value ? 100 - sliderPrecentage.value : sliderPrecentage.value;
});

function handleAmountChange(newAmount: string) {
  const regex = /^\d+((\.|\,)\d\d?)?$/;
  amountError.value = newAmount.match(regex) === null;
  if (amountError.value) {
    amount.value = newAmount;
    return;
  }
  if (newAmount === "") {
    amount.value = "0.00";
  }
  // Check if the number is a whole number like "23"
  else if (/^\d+$/.test(newAmount)) {
    amount.value = newAmount + ".00";
  }
  // Check if the number has one digit after the decimal like "23.1"
  else if (/^\d+\.\d$/.test(newAmount)) {
    amount.value = newAmount + "0";
  }
  amount.value = amount.value.replace(",", ".");
}

async function handleRequestBet() {
  if (showBet.value) return;
  showBet.value = false;
  if (amountError.value) return;
  if (connectionCounter.value > 0) return;
  authStore.subtractDeposit(Number.parseFloat(amount.value ?? "0.00"));
  connectionCounter.value += 1;
  const data = await useMyFetch("/play/dice", {
    method: "POST",
    body: JSON.stringify({
      rollMode: overMode.value ? "Roll Over" : "Roll Under",
      rollValue: rollUnder.value,
      amount: Number.parseFloat(amount.value !== "" ? amount.value : "0.00"),
    }),
  })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      connectionCounter.value -= 1;
    });
  if (!data) return;
  if (data.success) {
    authStore.addDeposit(data.win);
  }
  lastBet.value = {
    value: data.randomNumber,
    win: Boolean(data.success),
  };
  showBet.value = true;
  setTimeout(() => {
    if (connectionCounter.value === 0) showBet.value = false;
  }, 1000);
}

function handleDoubleAmount() {
  if (!amount.value) return;
  const convert = Number.parseFloat(amount.value);
  amount.value = (convert * 2).toFixed(2).toString();
}

function handleHalveAmount() {
  if (!amount.value) return;
  const convert = Number.parseFloat(amount.value);
  amount.value = (convert / 2).toFixed(2).toString();
}

function handleOddItemClick(item: {
  title: string;
  icon: string;
  value: string;
  clickable: boolean;
}) {
  if (item.title === "Roll Under") {
    overMode.value = true;
  } else if (item.title === "Roll Over") {
    overMode.value = false;
  }
}
</script>
