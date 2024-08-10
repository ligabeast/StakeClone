<template>
  <div class="w-3/4 bg-gray-400 h-14 rounded-full p-4">
    <div class="bg-gray-700 rounded-full p-2 w-full h-full">
      <div
        class="w-full h-full flex justify-center items-center relative"
        ref="track"
      >
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

<style scoped>
#slider {
  position: absolute;
  translate: var(--x) 0;
}
</style>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const props = defineProps<{
  modelValue: number;
  overMode: boolean;
}>();

const track = ref<HTMLElement | null>(null);
const slider = ref<HTMLElement | null>(null);
const dragging = ref(false);
const currentX = ref(0);

const minValue = 0;
const maxValue = 100;

const emits = defineEmits(["update:modelValue"]);

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
