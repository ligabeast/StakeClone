<template>
  <div class="w-full h-full flex flex-col space-y-4 py-8">
    <div class="flex flex-col space-y-0">
      <div class="w-full h-[600px] bg-gray-500 rounded-t-lg">
        <component :is="GameComponent" />
      </div>
      <div class="flex justify-between items-center px-8 bg-gray-700 h-16 rounded-b-lg border-t-2 border-gray-500">
        <div class="flex space-x-2 items-center">
          <Button1 :svg="icons.settings"></Button1>
          <Button1 :svg="icons.cinemaMode"></Button1>
          <Button1 :svg="icons.liveStatistics"></Button1>
          <div class="border-r py-5 w-2 border-gray-400"></div>
        </div>
        <!-- Logo -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 396.11 197.92"
          fill="white"
          class="w-16 h-16 fill-current text-gray-600"
        >
          <g
            id="Layer_5"
            data-name="Layer 5"
          >
            <path
              fill="currentColor"
              d="M25.68,56.89c-.1-26.47,16.84-41.15,47.94-41.26C96,15.55,100,30.19,100,35.51c0,10.19-14.42,21-14.42,21s.8,6.35,13.18,6.3,24.44-8.22,24.37-28.67C123.07,10.65,98.46-.09,74.13,0,53.78.07-.19,2.93,0,56.51c.18,47.59,90,51.79,90.07,82.26.12,33.09-37,42-49.56,42S22.84,171.88,22.82,167c-.09-26.8,26.58-34.26,26.58-34.26,0-2-1.56-10.91-11.89-10.87C10.9,121.92.3,144.8.38,167.14c.07,19,13.5,30.86,33.78,30.78,38.78-.14,82.51-19.06,82.35-61.08C116.37,97.54,25.79,87.28,25.68,56.89Z"
            >
            </path>
            <path
              fill="currentColor"
              d="M395.37,162.18c-.31-.75-1.18-.57-2.33.38-4.4,3.63-14.46,13.91-38,14-42.92.16-50.37-70.58-50.37-70.58s32.71-24.42,37.82-34.27-11.15-12-11.15-12-22.88,27.84-39.1,36C294,83.6,306,56,306.69,40.13s-19.11-12-22.27-10.48c0,6.93-17.49,69.84-23.86,104.42-3.75,6-9.11,12.86-13.91,12.87-2.78,0-3.8-5.15-3.83-12.53,0-10.24,5.64-26.65,5.6-36.62,0-6.9-3.17-7.31-5.9-7.3-.59,0-3.87.09-4.47.09-7,0-4.7-6-11-5.94-19.28.07-43.84,21.12-44.91,52.89-6.51,4.31-15.62,9.74-20.27,9.76-4.88,0-6.09-4.51-6.1-8.41,0-6.85,11.08-47.55,11.08-47.55s14.11-3.62,20.27-4.81c4.66-.91,6-1.25,7.81-3.5s5.35-6.9,8.21-11.08.05-7.41-5.24-7.39c-6.94,0-25.51,4.4-25.51,4.4s8.92-38.46,8.91-39.24-1-1.19-2.51-1.18c-3.38,0-9.41,1.82-13.27,3.2-5.91,2.11-10.72,9.35-11.69,12.72s-7.65,29.76-7.65,29.76-35.77,12.35-40.66,14.2a.74.74,0,0,0-.5.7c0,.32,4.09,16,12.48,15.94,6,0,23.63-7.22,23.63-7.22s-9.06,36-9,48c0,7.7,3.63,16.72,18.67,16.67,14,0,26.25-7.23,33.11-12.26,3.75,9.49,12.61,12.09,18.66,12.07,13.56,0,24-10.82,25.34-12.27,1.76,4.16,5.91,12.15,15.39,12.12,5.36,0,10.91-6,15-11.82a23.38,23.38,0,0,0,.05,3.63c1.64,14.92,23.79,6.15,25,4.07.75-10.79.28-32.85,4.59-46.47,5.72,46.46,27.42,77.71,66.43,77.57,21.81-.08,33-6.35,37.63-11.52A15.9,15.9,0,0,0,395.37,162.18ZM208.2,146.86c-18.73.07,5.73-48.48,21.71-48.54C229.93,104.58,229.58,146.79,208.2,146.86Z"
            >
            </path>
            <path
              fill="currentColor"
              d="M360.26,161.74c16.91-.06,30-11.19,32.4-14.81,3.1-4.71-3.6-11.82-5.73-11.7-5.34,5.11-10.92,11.29-23.45,11.33-14.75.06-11.41-16.17-11.41-16.17s28.39,3.67,39.8-16.74c3.65-6.53,3.8-15.56,2.33-19.45s-9.73-11.09-22.87-10c-16.14,1.36-36.48,18.19-40.95,38.4C326.79,138.86,333.58,161.84,360.26,161.74Zm18-68.1c2.66-.09,2.42,4.29,1.71,8.87-1,6.21-9.53,22-25.81,21.38C355.29,114.7,367.4,94,378.29,93.64Z"
            >
            </path>
          </g>
        </svg>
        <span class="text-sm px-2 text-gray-200 font-medium select-none">Fairness</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const queryGetLast7Bets = gql`
//   query {
//     bets(
//       status: ["won", "lost"]
//       limit: 7
//       order_by: "createdAt"
//       order_dir: "desc"
//     ) {
//       id
//       gameid
//       createdAt
//       bet_status
//       payout
//     }
//   }
// `;

import CasinoDice from "~/components/CasinoDice.vue";
import CasinoMines from "~/components/CasinoMines.vue";
import CasinoRoulette from "~/components/CasinoRoulette.vue";

const icons = {
  settings:
    '<svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path d="M55.441 32a26.082 26.082 0 0 0-.34-3.99l.02.15 8.16-6-7.12-12.32-9.254 4.054a23.83 23.83 0 0 0-6.502-3.784l-.164-.056L39.121 0h-14.24l-1.12 10.054c-2.554.98-4.76 2.276-6.71 3.874l.042-.034L7.84 9.84.72 22.16l8.16 6a25.007 25.007 0 0 0-.32 3.828V32c.012 1.366.128 2.694.34 3.99l-.02-.15-8.16 6 7.12 12.32 9.254-4.054a23.83 23.83 0 0 0 6.502 3.784l.164.056L24.88 64h14.24l1.12-10.054c2.554-.98 4.76-2.276 6.71-3.874l-.042.034 9.254 4.054 7.12-12.32-8.16-6c.192-1.146.308-2.474.32-3.828V32Zm-23.44 8.666A8.666 8.666 0 1 1 40.667 32c-.016 4.78-3.886 8.652-8.666 8.666H32h.002Z"></path></svg> ',
  cinemaMode:
    '<svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path d="M64 58.5H0v-53h64v53Zm-56-8h48v-37H8v37Z"></path></svg>',
  liveStatistics:
    '<svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M33.013 19.707 64 0v12.64L30.987 33.627 18.133 18.853 0 30.693V17.947L20.107 4.853l12.906 14.854ZM16 64H5.333V35.173L16 28.213V64Zm13.707-21.653-3.04-3.52V64h10.666V37.493l-2.773 1.76-4.853 3.094ZM58.667 64H48V30.72l10.667-6.8V64Z"></path></svg>',
};

const route = useRoute();
const requestedGame = route.params.name as string;

const resolveComponent = (game: string) => {
  switch (game) {
    case "Dice":
      return CasinoDice;
    case "Mines":
      return CasinoMines;
    case "Roulette":
      return CasinoRoulette;
    default:
      return null; // or a fallback component
  }
};

const GameComponent = resolveComponent(requestedGame);
</script>
