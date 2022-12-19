<template>
  <div class="grid grid-cols-[740px_1fr] w-screen gap-x-4">
    <cmap class="w-[740px] max-h-[740px] h-screen" v-model:sel="sel" :edit="edit"/>
      <div class="w-full">
        <div class="tabs mx-auto w-[330px]">
        <a :class="'tab tab-lifted '+((selectPanel == 0)&&'tab-active')" v-on:click="selectPanel = 0">Cartes</a> 
        <a :class="'tab tab-lifted '+((selectPanel == 1)&&'tab-active')" v-on:click="selectPanel = 1">Terrains</a> 
        <a :class="'tab tab-lifted '+((selectPanel == 2)&&'tab-active')" v-on:click="selectPanel = 2">Evénements</a>
        <a :class="'tab tab-lifted '+((selectPanel == 3)&&'tab-active')" v-on:click="selectPanel = 3">Pièges</a>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 0 && 'active')">
        <div class="grid grid-cols-2 overflow-x-hidden min-w-full text-center h-[100px] leading-10">
          <span><label class="font-bold h-10">Position X</label><input type="number" v-model="sel.x" class="w-1/2"/></span>
          <span><label class="font-bold h-10">Position Y</label><input type="number" v-model="sel.y" class="w-1/2"/></span>
        </div>
        <div class="w-full col-span-2"></div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 1 && 'active')">
        <div class="w-full">
        &nbsp;<br/>
          <div class="grid grid-cols-2 gap-2 h-10 leading-10 w-full">
            <span><label class="font-bold">Hauteur</label> &nbsp; <input v-model="terrainHauteur" class="w-12"/></span>
            <span><label class="font-bold">Plafond</label> &nbsp; <input v-model="terrainPlafond" class="w-12"/></span>
            <input v-model="terrainType" type="hidden"/>

          </div>
          <div class="leading-10 p-2 flex justify-center">
            <button class="btn btn-primary h-5 mx-1" v-on:click="(styleLockTerrain=!styleLockTerrain)"><img :src="styleLockTerrain&&'./lock.svg'||'./lock-open.svg'" width="20"/></button>
            <button class="btn btn-primary h-5 mx-1" v-on:click="(edit=!edit)"><img :src="edit&&'./pen.svg'||'./eye.svg'" width="20"/></button>
            <button :class="'btn btn-primary h-5 mx-1 '+(rect?'btn-secondary':'')" v-on:click="switch_rect"><div class="h-5 w-5 border-2 border-solid border-black"></div></button>
          </div>          
          &nbsp;<br/>
          <div class="tabs w-[345px] mx-auto">
            <a :class="'tab tab-lifted '+((filter == TypeTerrain.BASE    )&&'tab-active')" v-on:click="filter = TypeTerrain.BASE    ">Base</a> 
            <a :class="'tab tab-lifted '+((filter == TypeTerrain.NEFASTE )&&'tab-active')" v-on:click="filter = TypeTerrain.NEFASTE ">Néfaste</a> 
            <a :class="'tab tab-lifted '+((filter == TypeTerrain.TRIGGER )&&'tab-active')" v-on:click="filter = TypeTerrain.TRIGGER ">Triggers</a>
            <a :class="'tab tab-lifted '+((filter == TypeTerrain.OBSTACLE)&&'tab-active')" v-on:click="filter = TypeTerrain.OBSTACLE">Obstable</a>
          </div>
          <div class="min-w-full w-full overflow-x-hidden overflow-y-hidden flex justify-start items-start flex-wrap h-auto">
            <template v-for="terrain in typeTerrain.byType(filter)" :key="'ter_'+terrain.id">
                <div
                  :class="('w-24 h-24 m-2 flex items-center border-4 border-solid select-none border-transparent '+((lastTerrainId==terrain.id)&&'border-red-700'))"
                  :style="('background-color:'+terrain?.couleur)+';box-shadow:0 0 3px black;'"
                  v-on:click="setTerrain(terrain?.id||0)">
                  <span class="block text-center text-white font-bold opacity-100 bg-gray-700/50 w-full py-2 text-sm">{{terrain.name}}</span>
                </div>
            </template>
          </div>
          &nbsp;<br/>
          &nbsp;<br/>
        </div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 2 && 'active')">2</div>
      <div :class="'edtmap--panel ' + (selectPanel == 3 && 'active')">3</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch, reactive } from "vue";
  import cmap from "./map.vue";
  import { typeTerrain,TypeTerrain } from "../store/typeTerrain"
  import { useGestMap } from "../store/gestmap"
  const mapStore = useGestMap()
  mapStore.create(100,100)

  const terrainType = ref<number>(0)
  const terrainHauteur = ref<number>(0)
  const terrainPlafond = ref<number>(0)
  const terrainContenant = ref<number[]>([])

  const sel = reactive<{x:number,y:number}>( { x:0, y:0 } )

  const edit = ref<boolean>(true)

  const selectPanel = ref<number>(0)
  const infoBlock = ref<string>("")

  const filter = ref<number>(0)

  const lastTerrainId = ref<number>(0)
  const styleLockTerrain = ref<boolean>()

  const rect = ref<boolean>(false)
  const rect_pos = ref<{x:number,y:number, t:number}>({x:0,y:0,t:0})
  const switch_rect = () => {
    rect.value = !rect.value
    try {

    } catch (e){

    }
    rect_pos.value = {
      x: sel.x,
      y: sel.y,
      t: lastTerrainId.value
    }
  }

  const setTerrain= (terrainId:number) => {
    mapStore.setTerrain(sel.x,sel.y,terrainId)
    lastTerrainId.value = terrainId
  }

  watch(sel,()=>{
    if (sel.x<0) sel.x = 0
    if (sel.x>=mapStore.w) sel.x = mapStore.w - 1
    if (sel.y<0) sel.y = 0
    if (sel.y>=mapStore.h) sel.y = mapStore.h - 1
    if (!edit.value) return 
    if (styleLockTerrain.value){
      mapStore.setTerrain(sel.x, sel.y, lastTerrainId.value)
    } else {
      try {
        lastTerrainId.value = mapStore._map[sel.x][sel.y].t
      } catch (e){
        console.log(' SELECTION = ',sel)
      }
    }
    if (rect.value){
      let rangeX = [sel.x,rect_pos.value.x].sort((a,b)=> a<b?-1:1 )
      let rangeY = [sel.y,rect_pos.value.y].sort((a,b)=> a<b?-1:1 )

      console.log(rect_pos.value)
      for (let x = rangeX[0]; x<=rangeX[1]; x++)
        for(let y = rangeY[0]; y<=rangeY[1]; y++)
          mapStore.setTerrain(x,y,rect_pos.value.t)
      rect.value = false
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
    @apply h-full w-full hidden overflow-x-hidden overflow-y-auto;
    max-height: calc(100% - 44px);
  }
  .edtmap--panel.active { @apply flex; }
</style>
