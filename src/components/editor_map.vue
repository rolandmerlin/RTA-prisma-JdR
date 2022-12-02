<template>
  <div class="grid grid-cols-[850px_1fr] w-screen gap-x-4">
    <cmap class="w-[850px] h-[850px]" v-model:grille="Terrain" :dx="dx" :dy="dy" v-on:change="updateGrille"/>
    <div class="w-full">
      <div class="tabTitle select-none">
        <span :class="selectPanel == 0 && 'active'" v-on:click="selectPanel = 0">Cartes</span>
        <span :class="selectPanel == 1 && 'active'" v-on:click="selectPanel = 1">Terrains</span>
        <span :class="selectPanel == 2 && 'active'" v-on:click="selectPanel = 2">Portes</span>
        <span :class="selectPanel == 3 && 'active'" v-on:click="selectPanel = 3">Pièges</span>
        <div class="text-right"> {{ infoBlock }} </div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 0 && 'active')">
        <div class="grid grid-cols-2 gap-4">
          <label class="text-right font-bold">Position X = </label><span class="text-center"><input type="number" v-model="dx" class="w-1/2"/></span>
          <label class="text-right font-bold">Position Y = </label><span class="text-center"><input type="number" v-model="dy" class="w-1/2"/></span>
          <div class="w-full col-span-2"><cminimap :grille="Terrain"/></div>
        </div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 1 && 'active')">
        <div class="flex">
          <div class="w-10 h-10"></div>
        </div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 2 && 'active')">2</div>
      <div :class="'edtmap--panel ' + (selectPanel == 3 && 'active')">3</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, inject, watch } from "vue";
  import type { Ref } from "vue";
  import { Topo, Tterrain } from "../type";
  import cmap from "./map.vue";
  import cminimap from './minimap.vue'

  const dx = ref<number>(16);
  const dy = ref<number>(16);
  const selectPanel = ref<number>(0);
  const infoBlock = ref<string>("");

  const Terrain = ref<Topo[][]>( Array(250).fill(Array(250).fill({t:1,h:0,p:0,i:0,c:[]})) )

  const updateGrille = (G:Topo[][]) => Terrain.value = G

  watch(dx,()=>{
    if (dx.value<0) dx.value = 0
    if (dx.value>(Terrain.value.length-1)) dx.value = (Terrain.value.length-1)
  })
  watch(dy,()=>{
    if (dy.value<0) dy.value = 0
    if (dy.value>(Terrain.value.length-1)) dy.value = (Terrain.value.length-1)
  })
</script>
<style lang="postcss">
  .tabTitle { @apply flex justify-start; }
  .tabTitle > span { @apply px-4 py-2 border-2 border-black cursor-pointer; }
  .tabTitle > span { @apply border-r-0; }
  .tabTitle > div { @apply border-l-2 border-b-2 border-black w-full; }
  .tabTitle > span.active { @apply border-b-0; }
  .edtmap--panel {
    @apply h-full border-2 border-t-0 border-black hidden;
    max-height: calc(100% - 44px);
  }
  .edtmap--panel.active { @apply flex justify-center items-center; }
</style>
