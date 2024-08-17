<template>
    <div class="w-10 h-10 rounded-full flex items-center justify-center ring-white ring-1" :style="{
        backgroundColor: props.color,
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover', // Ensures the image covers the div
        backgroundRepeat: 'no-repeat', // Prevents tiling of the background 
    }">
        <span class="text-sm font-bold" :style="{ color: props.textColor }">{{ props.amount }}</span>
    </div>
</template>

<script setup lang="ts">
import bg from '../assets/backgrounds/CoinBackground.svg';

const props = defineProps<{
    amount: number,
    color: string
}>();
</script>
