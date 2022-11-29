<template>
  <div class="grid grid-cols-[600px_1fr] w-screen">
    <cmap class="w-[600px] h-[600px]" :grille="12" />
    <div class="w-full">
      <div class="tabTitle">
        <span :class="selectPanel == 0 && 'active'" v-on:click="selectPanel = 0"
          >Terrains</span
        >
        <span :class="selectPanel == 1 && 'active'" v-on:click="selectPanel = 1"
          >Portes</span
        >
        <span :class="selectPanel == 2 && 'active'" v-on:click="selectPanel = 2"
          >Pièges</span
        >
        <div class="text-right">
          {{ infoBlock }}
        </div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 0 && 'active')">1</div>
      <div :class="'edtmap--panel ' + (selectPanel == 1 && 'active')">2</div>
      <div :class="'edtmap--panel ' + (selectPanel == 2 && 'active')">3</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import cmap from "./map.vue";

const selectPanel = ref<number>(0);
const infoBlock = ref<string>("");
</script>
<style lang="postcss">
.tabTitle {
  @apply flex justify-start;
}
.tabTitle > span {
  @apply px-4 py-2 border-2 border-black cursor-pointer;
}
.tabTitle > span {
  @apply border-r-0;
}
.tabTitle > div {
  @apply border-l-2 border-b-2 border-black w-full;
}

.tabTitle > span.active {
  @apply border-b-0;
}
.edtmap--panel {
  @apply h-full border-2 border-t-0 border-black hidden;
  max-height: calc(100% - 44px);
}
.edtmap--panel.active {
  @apply flex justify-center items-center;
}
</style>
