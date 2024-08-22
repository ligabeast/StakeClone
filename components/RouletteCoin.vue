<template>
    <div class="relative w-9 h-9">
        <!-- Coin Button -->
        <button
            class="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden shadow-lg"
            @click="$emit('clicked')"
            :disabled="props?.deposit && props.amount > props.deposit ? true : false"
            :class="{
                ' hover:shadow-2xl hover:scale-105 transition': props.deposit && props.amount <= props?.deposit,
                'cursor-not-allowed': props.deposit && props.amount > props?.deposit,
                'ring-1 ring-white': props.deposit && props.amount <= props?.deposit && props.amount !== props?.selectedBet,
                'ring-4 ring-white': props?.selectedBet === props.amount,
            }"
            :style="{
                backgroundColor: props.color,
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }"
        >
            <span class="text-xs font-bold text-black">{{ props.amount }}</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import bg from '../assets/backgrounds/CoinBackground.svg';

const props = defineProps<{
    amount: number,
    color: string,
    deposit?: number,
    selectedBet?: number,
}>();
</script>
