<template>
  <div class="flex flex-col justify-center">
    <span class="text-gray-200 text-xs font-medium px-1">Bet Amount</span>
    <div class="flex bg-gray-400 shadow-md rounded-sm h-10 group">
      <div class="bg-gray-700 w-2/3 m-0.5 rounded-sm hover:cursor-text">
        <input
          type="text"
          v-model="amount"
          placeholder="0.00"
          class="w-full text-sm h-full bg-transparent focus:outline-none focus:placeholder-transparent text-white placeholder-white px-2 focus:ring-[1.5px] focus:ring-gray-300 rounded-sm"
          :class="{
            'ring-[1.5px] ring-red-500':
              props.amountError || props.deposit < Number.parseFloat(amount),
          }"
          @change="emit('amountchange', amount)"
        />
      </div>
      <div class="flex items-center justify-between w-1/3">
        <button
          @click="emit('halveamount')"
          class="text-white text-xs font-semibold hover:bg-gray-300 text-center py-3 w-16 select-none hover:cursor-pointer transition"
        >
          ½
        </button>
        <div class="border-r-2 border-gray-600 py-3"></div>
        <button
          @click="emit('doubleamount')"
          class="text-white text-xs font-semibold hover:bg-gray-300 text-center py-3 w-16 rounded-r-md select-none hover:cursor-pointer transition"
        >
          2x
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  amount: string;
  amountError: boolean;
  deposit: number;
}>();
const emit = defineEmits(["amountchange", "doubleamount", "halveamount"]);
const amount = ref(props.amount);

watch(
  () => props.amount,
  (newAmount) => {
    amount.value = newAmount;
  }
);
</script>
