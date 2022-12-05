<template>
  <div class="grid grid-cols-[850px_1fr] w-screen gap-x-4">
    <cmap class="w-[850px] h-[850px]" v-model:grille="Terrain.topo" v-model:sel="sel" :edit="edit"/>
    <div class="w-full">
      <div class="tabTitle select-none">
        <span :class="selectPanel == 0 && 'active'" v-on:click="selectPanel = 0">Cartes</span>
        <span :class="selectPanel == 1 && 'active'" v-on:click="selectPanel = 1">Terrains</span>
        <span :class="selectPanel == 2 && 'active'" v-on:click="selectPanel = 2">Portes</span>
        <span :class="selectPanel == 3 && 'active'" v-on:click="selectPanel = 3">Pièges</span>
        <div class="text-right"> {{ infoBlock }} </div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 0 && 'active')">
        <div class="grid grid-cols-4 gap-4 overflow-y-scroll overflow-x-hidden min-w-full">
          <label class="text-right font-bold">Position X = </label><span class="text-center"><input type="number" v-model="sel.x" class="w-1/2"/></span>
          <label class="text-right font-bold">Position Y = </label><span class="text-center"><input type="number" v-model="sel.y" class="w-1/2"/></span>
        </div>
        <div class="w-full col-span-2"><!--cminimap :grille="Terrain"/--></div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 1 && 'active')">
        <div class="flex flex-wrap justify-center">
          <div class="grid grid-cols-6 gap-2 w-full h-10 leading-10">
            <label class="font-bold">Hauteur</label><input v-model="terrainHauteur"/>
            <label class="font-bold">Plafond</label><input v-model="terrainPlafond"/>
            <input v-model="terrainType" type="hidden"/>
            <span>
              <button><img :src="styleLockTerrain&&'./lock.svg'||'./lock-open.svg'" width="25" v-on:click="(styleLockTerrain=!styleLockTerrain)"/></button>
              &nbsp;
              <button><img :src="edit&&'./pen.svg'||'./eye.svg'" width="25" v-on:click="(edit=!edit)"/></button>            
            </span>
          </div>
          <div class="min-w-full h-full overflow-x-hidden overflow-y-auto flex justify-start flex-wrap">
            <template v-for="terrain in DATA?.terrain.value" :key="'ter_'+terrain.id">
              <template v-if="typeof terrain === 'object'">
                <div
                  :class="('w-24 h-24 mx-auto my-2 flex items-center border-4 border-solid border-transparent select-none '+((lastTerrainId==terrain.id)&&'border-red-700'))"
                  :style="('background-color:'+terrain?.couleur)"
                  v-on:click="setTerrain(terrain?.id||0)">
                  <span class="block text-center text-white font-bold opacity-100 bg-gray-700/50 w-full py-2 text-sm">{{terrain.name}}</span>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 2 && 'active')">2</div>
      <div :class="'edtmap--panel ' + (selectPanel == 3 && 'active')">3</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, inject, watch, reactive } from "vue";
  import type { Ref } from "vue";
  import { Topo, Tterrain } from "../type";
  import cmap from "./map.vue";
  import cminimap from './minimap.vue'

  const terrainType = ref<number>(0)
  const terrainHauteur = ref<number>(0)
  const terrainPlafond = ref<number>(0)
  const terrainContenant = ref<number[]>([])

  const sel = reactive<{x:number,y:number}>({x:16,y:16})

  const edit = ref<boolean>(true)

  const selectPanel = ref<number>(0);
  const infoBlock = ref<string>("");

  const Terrain = reactive<Topo>({
    topo:Array(25)
            .fill(
              structuredClone(
                Array(25)
                  .fill(
                    structuredClone( {...{t:0,h:0,p:0,i:0,c:[]}} )
                  )
              )
            ),
    description:""
  })

  let carte = Terrain.topo.map(t => t.map(st => ({...st})))
  
  const DATA = inject<{ terrain: Ref<Tterrain[]> }>('terrain')

  const lastTerrainId = ref<number>(0)
  const styleLockTerrain = ref<boolean>()
  const setTerrain = (TerrainId:number) => {
    if (!edit.value) return 
    if (sel.x>=carte.length) return
    if (sel.y>=carte.length) return
    lastTerrainId.value = TerrainId
    carte[sel.x][sel.y].t = TerrainId
    Terrain.topo = [...carte]
  }

  watch(sel,()=>{
    if (sel.x<0) sel.x = 0
    if (sel.x>(carte.length-1)) sel.x = (carte.length-1)
    if (sel.y<0) sel.y = 0
    if (sel.y>(carte.length-1)) sel.y = (carte.length-1) 
    if (!edit.value) return 
    if (styleLockTerrain.value){
      setTerrain(lastTerrainId.value)
    } else {
      if (typeof carte[sel.x][sel.y].t == 'number') lastTerrainId.value = carte[sel.x][sel.y].t
    }
  })
</script>
<style lang="postcss">
  .tabTitle { @apply flex justify-start; }
  .tabTitle > span { @apply px-4 py-2 border-2 border-black cursor-pointer; }
  .tabTitle > span { @apply border-r-0; }
  .tabTitle > div { @apply border-l-2 border-b-2 border-black w-full; }
  .tabTitle > span.active { @apply border-b-0; }
  .edtmap--panel {
    @apply h-full w-full border-2 border-t-0 border-black hidden overflow-x-hidden overflow-y-auto;
    max-height: calc(100% - 44px);
  }
  .edtmap--panel.active { @apply flex; }
</style>
