<template>
    <div class="rounded-lg mx-auto w-full max-w-screen-lg">
        <!-- Roulette Board -->
        <div class="grid grid-cols-custom w-full">
            <!-- 0 Section -->
            <button
                class="row-span-3 bg-green-600 hover:bg-green-700 transition  duration-300 flex justify-center items-center rounded-md"
            >
                <span class="font-bold text-white ">0</span>
            </button>

            <!-- Numbers Section -->
            <button
                v-for="number in numbers"
                :key="number.value"
                class="h-11 rounded-md transition"
                :class="{
                    'bg-red-500 hover:bg-red-400': !isHighlighted(number) && number.color === 'red',
                    'bg-gray-500 hover:bg-gray-400': !isHighlighted(number) && number.color === 'black',
                    'bg-gray-300': isHighlighted(number) && number.color === 'black',
                    'bg-red-400': isHighlighted(number) && number.color === 'red',
                    'ring-2 ring-yellow-300': isHighlighted(number)
                }"
            >
                <span class="text-white font-bold">{{ number.value }}</span>
            </button>

            <div></div>

            <!-- Bet Range Section -->
            <button
                class="col-span-4 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('1-12')"
                @mouseleave="clearHighlight"
            >
                <span class="text-white font-medium text-base">1 to 12</span>
            </button>
            <button
                class="col-span-4 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('13-24')"
                @mouseleave="clearHighlight"
            >
                <span class="text-white font-medium text-base">12 to 23</span>
            </button>
            <button
                class="col-span-4 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('25-36')"
                @mouseleave="clearHighlight"
            >
                <span class="text-white font-medium text-base">24 to 36</span>
            </button>

            <div></div>

            <!-- Additional Betting Options -->
            <button
                class="col-span-2 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('1-18')"
                @mouseleave="clearHighlight"
            >
                <span class="text-white font-medium text-base">1 to 18</span>
            </Button>
            <button
                class="col-span-2 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('even')"
                @mouseleave="clearHighlight"
            >
                <span class="text-white font-medium text-base">Even</span>
            </button>
            <button
                class="col-span-2 h-10 flex items-center justify-center bg-red-500 rounded-sm hover:bg-red-400 transition"
                @mouseover="highlightRange('red')"
                @mouseleave="clearHighlight"
            ></button>
            <button
                class="col-span-2 h-10 bg-gray-400 flex items-center justify-center rounded-sm hover:bg-gray-300 transition"
                @mouseover="highlightRange('black')"
                @mouseleave="clearHighlight"
            ></button>
            <button
                class="col-span-2 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('odd')"
                @mouseleave="clearHighlight"
            >
                <span class="text-white font-medium text-base">Odd</span>
            </button>
            <button
                class="col-span-2 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('19-36')"
                @mouseleave="clearHighlight"
            >
                <span class="text-white font-medium text-base">19 to 36</span>
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
const numbers = ref([
    { value: 3, color: 'red' },
    { value: 6, color: 'black' },
    { value: 9, color: 'red' },
    { value: 12, color: 'red' },
    { value: 15, color: 'black' },
    { value: 18, color: 'red' },
    { value: 21, color: 'red' },
    { value: 24, color: 'black' },
    { value: 27, color: 'red' },
    { value: 30, color: 'red' },
    { value: 33, color: 'black' },
    { value: 36, color: 'red' },
    { value: 2, color: 'black' },
    { value: 5, color: 'red' },
    { value: 8, color: 'black' },
    { value: 11, color: 'black' },
    { value: 14, color: 'red' },
    { value: 17, color: 'black' },
    { value: 20, color: 'black' },
    { value: 23, color: 'red' },
    { value: 26, color: 'black' },
    { value: 29, color: 'black' },
    { value: 32, color: 'red' },
    { value: 35, color: 'black' },
    { value: 1, color: 'red' },
    { value: 4, color: 'black' },
    { value: 7, color: 'red' },
    { value: 10, color: 'black' },
    { value: 13, color: 'black' },
    { value: 16, color: 'red' },
    { value: 19, color: 'red' },
    { value: 22, color: 'black' },
    { value: 25, color: 'red' },
    { value: 28, color: 'black' },
    { value: 31, color: 'black' },
    { value: 34, color: 'red' }
]);

const highlightedRange = ref('');

function highlightRange(range) {
    highlightedRange.value = range;
}

function clearHighlight() {
    highlightedRange.value = '';
}

function isHighlighted(number) {
    if (highlightedRange.value === '') return false;

    if (highlightedRange.value === '1-12') {
        return number.value >= 1 && number.value <= 12;
    } else if (highlightedRange.value === '13-24') {
        return number.value >= 13 && number.value <= 24;
    } else if (highlightedRange.value === '25-36') {
        return number.value >= 25 && number.value <= 36;
    } else if (highlightedRange.value === '1-18') {
        return number.value >= 1 && number.value <= 18;
    } else if (highlightedRange.value === 'even') {
        return number.value % 2 === 0;
    } else if (highlightedRange.value === 'red') {
        return number.color === 'red';
    } else if (highlightedRange.value === 'black') {
        return number.color === 'black';
    } else if (highlightedRange.value === 'odd') {
        return number.value % 2 !== 0;
    } else if (highlightedRange.value === '19-36') {
        return number.value >= 19 && number.value <= 36;
    }

    return false;
}
</script>

<style scoped>
.grid-cols-custom {
    display: grid;
    grid-template-columns: repeat(13, minmax(0, 1fr));
    gap: 6px;
}
</style>
