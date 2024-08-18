<template>
  <div class="w-3/4 bg-gray-400 h-14 rounded-full p-4">
    <div class="bg-gray-700 rounded-full p-2 w-full h-full">
      <div
        class="w-full h-full flex justify-center items-center relative"
        ref="track"
      >
        <transition>
          <div
            class="absolute -translate-y-10 h-20 w-20 flex items-center justify-center z-0"
            :style="{ left: `${lastX - 40}px` }"
            mode="out-in"
            v-if="showBet"
          >
            <span
              class="text-sm font-medium z-10 select-none"
              :class="{
                'text-red-500': !props.lastBet.win,
                'text-green-500': props.lastBet.win,
              }"
            >{{ (lastBet.value * 100).toFixed(2) }}%</span>
            <svg
              class="h-20 absolute"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 45.55 51.32"
            >
              <g id="games">
                <path
                  class="cls-1"
                  d="M43.28,11.13,25.05.61a4.56,4.56,0,0,0-4.55,0L2.28,11.13A4.55,4.55,0,0,0,0,15.07v21a4.55,4.55,0,0,0,2.28,3.94L20.5,50.58a4.56,4.56,0,0,0,4.55,0L43.28,40.06a4.56,4.56,0,0,0,2.27-3.94v-21A4.56,4.56,0,0,0,43.28,11.13Z"
                />
                <path
                  class="cls-2"
                  d="M21.13,24.64,1.85,13.51A1.23,1.23,0,0,0,0,14.57v22a3.69,3.69,0,0,0,1.84,3.19l19.09,11a3.69,3.69,0,0,0,1.85.49,34.48,34.48,0,0,0,0-23.82A3.3,3.3,0,0,0,21.13,24.64Z"
                />
                <path
                  class="cls-3"
                  d="M43.7,13.51,24.42,24.64a3.3,3.3,0,0,0-1.64,2.86V51.32a3.68,3.68,0,0,0,1.84-.49l19.09-11a3.69,3.69,0,0,0,1.84-3.19v-22A1.23,1.23,0,0,0,43.7,13.51Z"
                />
              </g>
            </svg>
          </div>
        </transition>
        <div
          class="h-full rounded-l-full"
          :style="{
            width: `${currentValue < 2 ? 2 : currentValue}%`,
          }"
          :class="{ 'bg-red-500': overMode, 'bg-green-500': !overMode }"
        ></div>
        <div
          class="w-10 h-9 rounded-md bg-blue-400 flex items-center justify-center space-x-1 hover:cursor-grab shadow-md"
          id="slider"
          ref="slider"
          @mousedown="startDragging"
          @touchstart="startDragging"
          :style="{ left: `${currentX}px` }"
        >
          <div class="border-r-2 border-blue-300 py-2"></div>
          <div class="border-r-2 border-blue-300 py-2"></div>
          <div class="border-r-2 border-blue-300 py-2"></div>
        </div>
        <div
          class="flex-grow h-full rounded-r-full"
          :class="{ 'bg-red-500': !overMode, 'bg-green-500': overMode }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const props = defineProps<{
  modelValue: number;
  overMode: boolean;
  showBet: boolean;
  lastBet: { value: number; win: boolean };
}>();

const track = ref<HTMLElement | null>(null);
const slider = ref<HTMLElement | null>(null);
const dragging = ref(false);
const currentX = ref(0);

const minValue = 0;
const maxValue = 100;

const emits = defineEmits(["update:modelValue"]);

const lastX = computed(() => {
  return props.lastBet.value * (track.value?.clientWidth ?? 0);
});

// Calculate the current value based on slider position
const currentValue = computed(() => {
  if (track.value && slider.value) {
    const trackWidth = track.value.clientWidth - slider.value.clientWidth;
    return Math.round(
      (currentX.value / trackWidth) * (maxValue - minValue) + minValue
    );
  }
  return minValue;
});

watch(currentValue, (value) => {
  emits("update:modelValue", value);
});

const startDragging = (event: MouseEvent | TouchEvent) => {
  dragging.value = true;
  const trackRect = track.value?.getBoundingClientRect() ?? {
    left: 0,
    width: 0,
  };
  const onePercent = (trackRect.width - (slider.value?.clientWidth ?? 0)) / 100;

  const onMouseMove = (event: MouseEvent) => {
    if (dragging.value && track.value && slider.value) {
      let clientX = event.clientX;
      // Calculate new position
      let newX = clientX - trackRect.left - slider.value.clientWidth / 2;

      if (newX < onePercent) {
        newX = 0;
        return;
      } else if (
        newX >=
        trackRect.width - slider.value.clientWidth - onePercent
      ) {
        newX = trackRect.width - slider.value.clientWidth;
        return;
      }
      // we need to know how much px 1% is from the track width so we move only one percent at a time
      // to make it move only one percent at a time
      if (Math.abs(newX - currentX.value) >= onePercent) {
        currentX.value = newX;
      }
    }
  };

  const stopDragging = () => {
    dragging.value = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", stopDragging);
    document.addEventListener("touchend", stopDragging);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", stopDragging);
  document.addEventListener("touchend", stopDragging);
};

onMounted(() => {
  // Center the slider initially if needed
  if (track.value && slider.value) {
    currentX.value = (track.value.clientWidth - slider.value.clientWidth) / 2;
  }
});
</script>

<style scoped>
#slider {
  position: absolute;
  translate: var(--x) 0;
}

.cls-1 {
  fill: #fff;
}

.cls-2 {
  fill: #e9f0f5;
}

.cls-3 {
  fill: #d3dee6;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
