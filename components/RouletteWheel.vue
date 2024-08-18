<template>
    <div class="w-full flex justify-between items-center relative space-x-4">
        <div class="w-60 h-60 flex items-center justify-center">
            <div class="rounded-xl w-16 h-16 bg-gray-500 flex items-center justify-center relative">
                <Transition
                    mode="out-in"
                    name="fall"
                >
                    <span
                        v-if="!props.showWinningNumber || !props.winningNumber"
                        :class="{
                            'text-3xl': countDown < 10,
                            'text-xl': countDown >= 10
                        }"
                        class="text-white font-bold transition"
                    >{{ props.countDown }}</span>
                    <div
                        class="w-12 h-12 rounded-full flex items-center justify-center"
                        v-else
                        :class="computedColor"
                    >
                        <span class="text-white font-bold transition text-sm">{{ props.winningNumber }}</span>
                    </div>
                </Transition>
            </div>
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
                :class="{
                    'animate-spin transition': countDown < 10
                }"
            >
                <div class="absolute scale-[103%] inset-0 rounded-full border-8 border-gray-900"></div>
            </div>
        </div>
        <div class="flex-grow flex flex-col justify-center items-center space-y-2">
            <template v-for="item in last5Colorful">
                <div
                    class="rounded-full w-10 h-10 flex items-center justify-center"
                    :class="{
                        'bg-gray-500': item.color === 'black',
                        'bg-green-500': item.color === 'green',
                        'bg-red-500': item.color === 'red'
                    }"
                >
                    <span class="text-white font-bold">{{ item.val }}</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Wheel from '../assets/backgrounds/Wheel.png';
import { computed } from 'vue';

const props = defineProps<{
    countDown: number,
    showWinningNumber: boolean,
    winningNumber: number,
    last5Numbers: number[]
}>();

const last5Colorful = computed(() => {
    return props.last5Numbers.map(num => {
        return { color: getColor(num), val: num };
    });
});


function getColor(num: number) {
    const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

    if (blackNumbers.includes(num)) {
        return 'black';
    } else if (redNumbers.includes(num)) {
        return 'red';
    } else if (num === 0) {
        return 'green';
    }
    return "";
}

const computedColor = computed(() => {
    // Define arrays with black and red winning numbers
    const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

    // Check if the winningNumber is in one of the arrays
    if (blackNumbers.includes(props.winningNumber)) {
        return 'bg-black';
    } else if (redNumbers.includes(props.winningNumber)) {
        return 'bg-red-500';
    } else if (props.winningNumber === 0) {
        return 'bg-green-500';
    }
    return 'bg-gray-500'; // Default class
});
</script>

<style scoped>
.fall-enter-active,
.fall-leave-active {
    position: absolute;
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.fall-enter,
.fall-leave-to

/* .fall-leave-active in <=2.1.8 */
    {
    transform: translateY(-100%);
    opacity: 0;
}

.fall-enter-to,
.fall-leave

/* .fall-enter-active in <=2.1.8 */
    {
    transform: translateY(0);
    opacity: 1;
}

.fall-leave-active {
    transform: translateY(100%);
    opacity: 0;
}
</style>