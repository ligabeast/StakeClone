<template>
    <div class="w-full flex justify-between items-center relative space-x-4">
        <div class="w-60 h-60 flex items-center justify-center">
            <div class="rounded-xl w-16 h-16 bg-gray-500"></div>
        </div>
        <div class="relative h-60 mt-10 w-fit">
            <div
                class="w-60 h-60 z-30 rounded-full shadow-inner"
                :style="{
                    backgroundImage: `url(${Wheel})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }"
            >
                <div class="absolute scale-[103%] inset-0 rounded-full border-8 border-gray-900"></div>
            </div>
        </div>
        <div class="flex-grow flex flex-col justify-center items-center space-y-2">
            <div class="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span class="text-white font-bold">31</span>
            </div>
            <div class="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span class="text-white font-bold">31</span>
            </div>
            <div class="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span class="text-white font-bold">31</span>
            </div>
            <div class="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span class="text-white font-bold">31</span>
            </div>
            <div class="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center">
                <span class="text-white font-bold">31</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Wheel from '../assets/backgrounds/Wheel.png';

console.log(Wheel)

</script>