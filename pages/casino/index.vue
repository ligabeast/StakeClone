<template>
  <div class="flex flex-col py-8 space-y-8">
    <div class="flex space-x-5 justify-center">
      <template v-for="card in promocards">
        <PromoCard
          :description="card.description"
          :title="card.title"
          :image="card.image"
        />
      </template>
    </div>
    <SearchBar />
    <SelectionBar :icons="icons" />
    <GameRow
      :name="'Stake Originals'"
      :games="games"
      :icon="icons['Stake Originals']"
    />
  </div>
</template>

<script setup lang="ts">
import promo1 from "~/assets/promo1.jpg";
import promo2 from "~/assets/promo2.jpg";
import promo3 from "~/assets/promo3.jpg";

const queryGetAllGames = gql`
  query {
    games {
      name
      img
    }
  }
`;
const games: Ref<{ name: string; img: string }[]> = ref([]);

onMounted(async () => {
  try {
    const { data } = await useAsyncQuery<{
      games: { name: string; img: string }[];
    }>(queryGetAllGames);
    games.value = data.value?.games ?? [];
  } catch (error) {
    console.error(error);
  }
});

const promocards = [
  {
    title: "Daily Races",
    description: "Play in our $100,000 Daily Race Read More",
    image: promo1,
  },
  {
    title: "Weekly Raffle",
    description: "Share in $75,000 each week Read More",
    image: promo2,
  },
  {
    title: "Conquer the Casino",
    description: "Win a share in $50,000 every week Read More",
    image: promo3,
  },
];
const icons = {
  Lobby:
    '<svg fill="currentColor" viewBox="0 0 96 96" class="svg-icon " style=""> <title></title> <path d="M82.013 45.482c-3.172-11.05-9.322-20.4-17.525-27.42L64.41 18h13.6V6H18.005v12h17.521c-.35 11.428-3.087 22.136-7.725 31.752l.204-.47c-2.08-.802-4.483-1.27-6.997-1.282h-.006C9.402 47.999 0 57.402 0 69.001 0 80.6 9.403 90.003 21.002 90.003c11.6 0 21.002-9.403 21.002-21.002a20.707 20.707 0 0 0-4.395-12.727l.035.045c5.542-10.36 9.061-22.562 9.712-35.52l.01-.205c10.572 5.617 18.595 14.86 22.502 26.034l.099.33c-5.914 3.021-9.892 9.07-9.892 16.045 0 9.92 8.04 17.963 17.962 17.963S96 72.926 96 63.003c0-8.526-5.94-15.664-13.91-17.503l-.12-.024.043.006Z"></path></svg>',
  "Stake Originals":
    '<svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path d="M7.36 42.39c1-12.78 14.728-25.29 17.926-29.976 2.778-4.206 1.719-9.203.83-11.4a.78.78 0 0 1 .893-1h-.004c13.889 2.918 14.588 13.48 14.168 18.206-.42 4.726.42 7.913 3.478 7.224 3.057-.69 2.028-8.443 2.028-8.443s14.039 16.676 8.893 33.073c-2.588 8.574-9.033 12.19-14.449 13.89-.28.14-.56-.14-.56-.55.7-2.638 2.509-4.726 3.058-7.644 1.12-4.796-3.327-9.213-6.624-11.71-2.063-1.538-3.386-3.97-3.386-6.712 0-.127.002-.255.008-.381v.018c0-.28-.42-.42-.55-.28a90.106 90.106 0 0 1-6.652 7.202l-.022.022c-5.136 5.696-7.784 12.09-3.197 19.175.14.28-.14.69-.41.56C11.387 60.596 6.67 51.973 7.36 42.39Z"></path></svg>',
  Slots:
    '<svg fill="currentColor" viewBox="0 0 96 96" class="svg-icon " style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="M56.8 47.08a49.761 49.761 0 0 0-5.6 22.8v5H32.32a55.56 55.56 0 0 1 5-22.76A86.916 86.916 0 0 1 50.8 31h-28V16.36H72v7.76a133.838 133.838 0 0 0-15.2 22.96Zm26.4 16.24a30.56 30.56 0 0 0-6 13.04l-.6 3L60 76.32a38.12 38.12 0 0 1 13.36-22.28l-12-2.36 5.04-10.64L96 46.88l-.92 4.64a85.487 85.487 0 0 0-11.88 11.8Zm-58.52 9.32a30.08 30.08 0 0 1 0-14.36 79.675 79.675 0 0 1 5.8-15.84l-1.12-4.6L0 44.88v11.68l12-2.84a37.88 37.88 0 0 0-2.88 25.92l16.28-4-.72-3Z"></path></svg>',
  "Live Casino":
    '<svg fill="currentColor" viewBox="0 0 96 96" class="svg-icon " style=""> <title></title> <path d="M62.8 7.2h-1.2L48 12 34.401 7.2c-2.4-.8-5.199.801-5.6 3.6v10c0 2.798 2.4 4.8 4.8 4.8h1.2l13.2-6 13.598 6c2.8.8 5.2-.802 6-3.6V12c0-2.799-2.4-4.8-4.8-4.8ZM41.199 82.8l-18-60c-1.2-2.4-3.6-3.6-6.399-2.799l-6 2.001c-2.001.4-3.201 2.4-3.201 4.401l-3.6 57.6c0 2.8 2.001 4.8 4.401 5.2h27.999c2.799 0 4.8-2.002 4.8-4.8.399-.4 0-1.204 0-1.603Zm47.202-56.4c0-2-1.2-3.6-3.2-4.4l-6-2.4c-2.4-.802-5.2.398-6 2.798l-18 60c-.802 2.4.8 5.2 3.2 6 .4 0 .801.4 1.6.4h27.6c2.798 0 4.8-2.002 4.8-4.8l-4-57.598Z"></path></svg>',
  "Game Shows":
    '<svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path d="M28.651 60.5H11.883c-1.85 0-3.347-1.5-3.347-3.348V37.036c-1.85 0-3.348-1.5-3.348-3.348v-6.722c0-1.85 1.5-3.348 3.348-3.348h20.116V60.5Zm26.813-36.884H35.347V60.5h16.768c1.85 0 3.349-1.5 3.349-3.348V37.036c1.85 0 3.348-1.5 3.348-3.348v-6.722c0-1.85-1.5-3.348-3.348-3.348v-.002ZM45.416 3.5C38.005 3.5 32 9.508 32 16.918h13.418c1.85 0 3.349-1.5 3.349-3.348V6.848c0-1.85-1.5-3.348-3.349-3.348Zm-26.836 0c-1.85 0-3.348 1.5-3.348 3.348v6.722c0 1.85 1.5 3.348 3.348 3.348H32C32 9.506 25.99 3.5 18.58 3.5Z"></path></svg>',
  "Stake Exclusives":
    '<svg fill="currentColor" viewBox="0 0 96 96" class="svg-icon " style=""> <title></title> <path d="M83.08 4a4 4 0 0 0-4-4H16.92a4 4 0 0 0-4 4v92L48 79.6 83.08 96V4ZM65.16 65.08 48 56l-17.16 9.08L34.12 46 20.24 32.48l19.2-2.8L48 12.32l8.56 17.36 19.2 2.8L61.88 46l3.28 19.08Z"></path></svg>',
  "New Releases":
    '<svg fill="currentColor" viewBox="0 0 64 64" class="svg-icon " style=""> <title></title> <path fill-rule="evenodd" clip-rule="evenodd" d="m56.339.05.03-.004a6.835 6.835 0 0 1 7.586 7.585l-.8 6.835-.012.134a28.89 28.89 0 0 1-8.262 17.083L44.188 42.366l.93 8.474L31.977 64l-1.639-12.92c-8.374-3.029-14.1-8.944-17.437-17.438L0 32.023l13.16-13.14 8.474.929L32.317 9.119C36.807 4.643 42.76 1.63 49.534.845L56.336.05h.002l.03-.004-.03.004ZM36.284 18.932a7.995 7.995 0 0 0 7.994 7.995v.04a7.995 7.995 0 0 0 7.994-7.995v-.04a7.995 7.995 0 0 0-15.988 0ZM8.636 41.125c2.4 6.9 7.869 12.369 14.938 14.82 0 0-4.697 8.465-20.676 5.647C.07 45.613 8.584 40.957 8.584 40.957l.052.168Z"></path></svg>',
};
</script>
