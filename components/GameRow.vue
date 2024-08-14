<template>
  <div class="h-fit flex flex-col space-y-6">
    <div class="flex space-x-2 items-center">
      <div v-html="props.icon" class="w-4 text-gray-300"></div>
      <p class="text-white text-base font-bold">{{ props.name }}</p>
    </div>
    <div class="flex items-center">
      <div class="flex flex-col justify-between relative">
        <div class="flex items-center space-x-5">
          <template v-for="game in props.games">
            <div class="flex flex-col space-y-2">
              <div class="h-40 w-full rounded-md">
                <NuxtLink :to="`/casino/game/${game.name}`">
                  <img
                    :src="imageSrc(game.name)"
                    alt="game"
                    class="h-full w-full rounded-md hover:-translate-y-1 transition hover:scale-105 hover:cursor-pointer"
                  />
                </NuxtLink>
              </div>
              <div class="flex space-x-2 items-center px-1">
                <div
                  class="animate-pulse bg-[#1fff23] w-2 rounded-full h-2"
                ></div>
                <p class="text-white text-xs">
                  <span class="font-bold">5,953</span> playing
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Mines from "~/assets/games/Mines.jpg";
import Dice from "~/assets/games/Dice.jpg";
import Roulette from "~/assets/games/Roulette.jpg";

const props = defineProps<{
  name?: string;
  games?: { name: string }[];
  icon?: string;
}>();

const imageSrc = (imgName: string) => {
  switch (imgName) {
    case "Mines":
      return Mines;
    case "Dice":
      return Dice;
    case "Roulette":
      return Roulette;
    default:
      return "";
  }
};
</script>
