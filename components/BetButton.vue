<template>
  <button
    class="h-14 bg-green-500 hover:bg-green-400 w-full rounded-md shadow-sm hover:shadow-lg transition disabled:bg-green-800"
    :disabled="props.betPlaced || props.betsClosed"
    @click="emit('clicked')"
  >
    <span class="font-semibold text-md text-white">{{ title }}</span>
  </button>
</template>

<script lang="ts" setup>
const emit = defineEmits(["clicked"]);
const props = defineProps<{
  betPlaced: boolean,
  betsClosed: boolean
}>();

const title = computed(() => {
  if (props.betPlaced) {
    return "Bet is placed";
  }
  if (props.betsClosed) {
    return "Bets are closed";
  }
  return "Bet";
})

</script>
