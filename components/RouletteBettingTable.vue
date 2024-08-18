<template>
    <div class="rounded-lg mx-auto w-full max-w-screen-lg">
        <!-- Roulette Board -->
        <div class="grid grid-cols-custom w-full">
            <!-- 0 Section -->
            <button
                class="row-span-3 bg-green-600 hover:bg-green-700 transition  duration-300 flex justify-center items-center rounded-md"
                @click="handleNumberClick(0)"
            >
                <span class="font-bold text-white ">0</span>
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="placedNumberBets[0] > 0"
                        :amount="placedNumberBets[0]"
                        color="#FDE047"
                    />
                </div>
            </button>

            <!-- Numbers Section -->
            <button
                v-for="number in numbers"
                :key="number.value"
                class="h-11 rounded-md relative transition flex flex-col items-center justify-center"
                @click="handleNumberClick(number.value)"
                :class="{
                    'bg-red-500 hover:bg-red-400': !isHighlighted(number) && number.color === 'red',
                    'bg-gray-500 hover:bg-gray-400': !isHighlighted(number) && number.color === 'black',
                    'bg-gray-300': isHighlighted(number) && number.color === 'black',
                    'bg-red-400': isHighlighted(number) && number.color === 'red',
                    'ring-2 ring-yellow-300': isHighlighted(number)
                }"
            >
                <span class="text-white font-bold">{{ number.value }}</span>
                <!-- Placed Bets -->
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="placedNumberBets[number.value] > 0"
                        :amount="placedNumberBets[number.value]"
                        color="#FDE047"
                    />
                </div>
            </button>

            <div></div>

            <!-- Bet Range Section -->
            <button
                class="col-span-4 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('1-12')"
                @mouseleave="clearHighlight"
                @click="handleAdditionalClick(0)"
            >
                <span class="text-white font-medium text-base">1 to 12</span>
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="props.placedAdditionalBets[0] > 0"
                        :amount="props.placedAdditionalBets[0]"
                        color="#FDE047"
                    />
                </div>
            </button>
            <button
                class="col-span-4 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('13-24')"
                @mouseleave="clearHighlight"
                @click="handleAdditionalClick(1)"
            >
                <span class="text-white font-medium text-base">12 to 23</span>
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="props.placedAdditionalBets[1] > 0"
                        :amount="props.placedAdditionalBets[1]"
                        color="#FDE047"
                    />
                </div>
            </button>
            <button
                class="col-span-4 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('25-36')"
                @mouseleave="clearHighlight"
                @click="handleAdditionalClick(2)"
            >
                <span class="text-white font-medium text-base">24 to 36</span>
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="props.placedAdditionalBets[2] > 0"
                        :amount="props.placedAdditionalBets[2]"
                        color="#FDE047"
                    />
                </div>
            </button>

            <div></div>

            <!-- Additional Betting Options -->
            <button
                class="col-span-2 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('1-18')"
                @mouseleave="clearHighlight"
                @click="handleAdditionalClick(3)"
            >
                <span class="text-white font-medium text-base">1 to 18</span>
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="props.placedAdditionalBets[3] > 0"
                        :amount="props.placedAdditionalBets[3]"
                        color="#FDE047"
                    />
                </div>
            </Button>
            <button
                class="col-span-2 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('even')"
                @mouseleave="clearHighlight"
                @click="handleAdditionalClick(4)"
            >
                <span class="text-white font-medium text-base">Even</span>
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="props.placedAdditionalBets[4] > 0"
                        :amount="props.placedAdditionalBets[4]"
                        color="#FDE047"
                    />
                </div>
            </button>
            <button
                class="col-span-2 h-10 flex items-center justify-center bg-red-500 rounded-sm hover:bg-red-400 transition"
                @mouseover="highlightRange('red')"
                @mouseleave="clearHighlight"
                @click="handleAdditionalClick(5)"
            >
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="props.placedAdditionalBets[5] > 0"
                        :amount="props.placedAdditionalBets[5]"
                        color="#FDE047"
                    />
                </div>
            </button>
            <button
                class="col-span-2 h-10 bg-gray-400 flex items-center justify-center rounded-sm hover:bg-gray-300 transition"
                @mouseover="highlightRange('black')"
                @mouseleave="clearHighlight"
                @click="handleAdditionalClick(6)"
            >
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="props.placedAdditionalBets[6] > 0"
                        :amount="props.placedAdditionalBets[6]"
                        color="#FDE047"
                    />
                </div>
            </button>
            <button
                class="col-span-2 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('odd')"
                @mouseleave="clearHighlight"
                @click="handleAdditionalClick(7)"
            >
                <span class="text-white font-medium text-base">Odd</span>
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="props.placedAdditionalBets[7] > 0"
                        :amount="props.placedAdditionalBets[7]"
                        color="#FDE047"
                    />
                </div>
            </button>
            <button
                class="col-span-2 h-10 flex items-center justify-center ring-2 ring-gray-400 rounded-sm hover:bg-gray-400 transition"
                @mouseover="highlightRange('19-36')"
                @mouseleave="clearHighlight"
                @click="handleAdditionalClick(8)"
            >
                <span class="text-white font-medium text-base">19 to 36</span>
                <div class="absolute z-40 ">
                    <RouletteCoin
                        v-if="props.placedAdditionalBets[8] > 0"
                        :amount="props.placedAdditionalBets[8]"
                        color="#FDE047"
                    />
                </div>
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">

const props = defineProps<{
    selectedBet: number;
    openMoney: number;
    placedNumberBets: number[];
    placedAdditionalBets: number[];
}>();

const emit = defineEmits<{
    newBet: ({ amount: number, index: number, type: string, }) => void;
}>();


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

function handleNumberClick(number) {
    if (props.openMoney < props.selectedBet) return;
    emit('newBet', { amount: props.selectedBet, index: number, type: 'number' });
}

function handleAdditionalClick(index) {
    if (props.openMoney < props.selectedBet) return;
    emit('newBet', { amount: props.selectedBet, index, type: 'additional' });
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
