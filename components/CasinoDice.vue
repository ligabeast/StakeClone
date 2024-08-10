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
      <BetButton />
    </div>
    <div class="p-4 bg-gray-700 w-full h-full flex flex-col justify-between">
      <div></div>
      <div class="flex justify-center items-center">
        <DiceOddSelector v-model="sliderPrecentage" :overMode="overMode" />
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
const amount = ref("");
const amountError = ref(false);

const mode = ref("manu");
const sliderPrecentage = ref(50);
const overMode = ref(true);

const multiplicator = computed(() => {
  return 100 / sliderPrecentage.value;
});

const rollUnder = computed(() => {
  if (overMode.value) {
    return 100 - sliderPrecentage.value;
  } else {
    return sliderPrecentage.value;
  }
});

const winChance = computed(() => {
  return overMode.value ? sliderPrecentage.value : 100 - sliderPrecentage.value;
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
