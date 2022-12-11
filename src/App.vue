<template>
  <navigation />
  <div class="app--content">
    <router-view class="z-10" />
    <ceditormap class="w-screen h-[800px]" :grille="12" />
  </div>
</template>
<script setup lang="ts">
  import ceditormap from "./components/editor_map.vue"
  import navigation from "./components/navigation.vue"
  import Socket from "./lib/websocket"
  import { typeTerrainSet } from './store/typeTerrain'
  import { Tmessage, Tterrain } from "./type"

  const Wsocket = new Socket()

  ///// Initialisation des types de terrains
  Wsocket.OnMessage("terrain:get",(message: Tmessage) => {
    if (typeof message.terrain === 'object')
      typeTerrainSet(message.terrain)
  })
  Wsocket.SendAction('terrain:get',{})
</script>
<style>
.app--content {
  @apply absolute top-[64px] bottom-0 left-0 right-0 p-2;
}
</style>
