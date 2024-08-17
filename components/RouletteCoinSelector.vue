<template>
    <div class="w-full h-14 rounded-md shadow-md bg-gray-400 flex justify-center">
        <button
            @click="handleLeft"
            class="w-12 flex items-center bg-gray-400 justify-center hover:bg-gray-300 hover:cursor-pointer h-full rounded-l-md"
        >
            <svg
                fill="currentColor"
                viewBox="0 0 64 64"
                class="text-white w-4"
                style=""
            >
                <title></title>
                <path d="M36.998 53.995 16 32.998 36.998 12l6.306 6.306L28.61 33l14.694 14.694L36.998 54v-.005Z"></path>
            </svg>
        </button>
        <div class="flex-grow relative bg-transparent transition flex justify-center items-center">
            <div
                class="w-full bg-gray-500 py-1.5 flex items-center px-2  flex-nowrap space-x-2 overflow-y-hidden absolute scroll-smooth hover:ring-1 ring-gray-300 scrollbar-hide"
                ref="coinContainer"
            >
                <div
                    class="w-full h-10 flex items-center justify-center"
                    v-for="bet in possibleBets"
                    :key="bet.color"
                >
                    <RouletteCoin
                        @clicked="selectedBet = bet.amount"
                        :selectedBet="selectedBet"
                        :deposit="deposit"
                        :color="bet.color"
                        :amount="bet.amount"
                    />
                </div>
            </div>
        </div>
        <button
            @click="handleRight"
            class="w-12 flex items-center bg-gray-400 justify-center hover:bg-gray-300 hover:cursor-pointer h-full rounded-r-md"
        >
            <svg
                fill="currentColor"
                viewBox="0 0 64 64"
                class="rotate-180 w-4 text-white"
                style=""
            >
                <title></title>
                <path d="M36.998 53.995 16 32.998 36.998 12l6.306 6.306L28.61 33l14.694 14.694L36.998 54v-.005Z"></path>
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    deposit: amount;
}>();

const selectedBet = ref(0);
if (props.deposit.value > 0.5) {
    selectedBet.value = 0.5;
}

const coinContainer = ref<HTMLElement | null>(null);

function handleLeft() {
    // 40px == 2.5rem == One Coins width
    coinContainer.value.scrollLeft -= 80;
}

function handleRight() {
    // 40px == 2.5rem == One Coins width
    coinContainer.value.scrollLeft += 80;
}

const maxWidth = computed(() => {
    // 40px == 2.5rem == One Coins width
    return 40 * possibleBets.value.length;
})

const possibleBets = ref([
    {
        amount: 0.5,
        color: '#F8EDE3',
    },
    {
        amount: 1,
        color: '#DFD3C3',
    },
    {
        amount: 2,
        color: '#D0B8A8',
    },
    {
        amount: 5,
        color: '#a88c79',
    },
    {
        amount: 25,
        color: '#806757',
    },
    {
        amount: 100,
        color: '#735746',
    }
]);

</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>