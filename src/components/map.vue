<template>
  <div class="block relative w-full h-full">
    <div class="w-full h-full grid" :style="styleGrid">
      <template v-for="x in nmbX" :key="'gridXmap_' + x">
        <template v-for="y in nmbY" :key="'gridYmap_' + y">
          <div class="block w-full h-full border-[1px] border-gray-300"></div>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Ref } from "vue";
import { TGrille } from "../type";
const props = defineProps({
  grille: {
    type: Number,
    default: 12,
  },
});
const styleGrid = computed(() => {
  return `grid-template-columns:repeat(${props.grille},1fr)`;
});
const nmbX = computed(() => props.grille);
const nmbY = computed(() => props.grille);

let Grille: TGrille[][] = [];

const InitMap = () => {
  Grille = Array(props.grille).fill(Array(props.grille).fill(ref<TGrille>()));
};
InitMap();

watch(
  () => props.grille,
  () => {
    InitMap();
  }
);
</script>
<style lang="postcss"></style>
