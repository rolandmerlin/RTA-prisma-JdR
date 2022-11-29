<template>
  <div class="grid grid-cols-[600px_1fr] w-screen">
    <cmap class="w-[600px] h-[600px]" :grille="12" />
    <div class="w-full">
      <div class="tabTitle">
        <span class="active">Terrains</span>
        <span>Portes</span>
        <span>Pièges</span>
        <div></div>
      </div>
      <div class="edtmap--panel"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import cmap from "./map.vue";
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
  @apply h-full border-2 border-t-0 border-black;
  max-height: calc(100% - 44px);
}
</style>
