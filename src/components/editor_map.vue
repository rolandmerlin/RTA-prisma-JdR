<template>
  <div class="grid grid-cols-[740px_1fr] w-screen gap-x-4">
    <cmap class="w-[740px] max-h-[740px] h-screen" v-model:grille="Terrain.topo" v-model:sel="sel" :edit="edit"/>
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
        <div class="w-full col-span-2"><cminimap :grille="Terrain"/></div>
      </div>
      <div :class="'edtmap--panel ' + (selectPanel == 1 && 'active')">
        <div class="w-full">
        &nbsp;<br/>
          <div class="grid grid-cols-3 gap-2 h-10 leading-10 w-full">
            <span><label class="font-bold">Hauteur</label> &nbsp; <input v-model="terrainHauteur" class="w-12"/></span>
            <span><label class="font-bold">Plafond</label> &nbsp; <input v-model="terrainPlafond" class="w-12"/></span>
            <input v-model="terrainType" type="hidden"/>
            <span>
              <button class="btn btn-primary h-10" v-on:click="(styleLockTerrain=!styleLockTerrain)"><img :src="styleLockTerrain&&'./lock.svg'||'./lock-open.svg'" width="25"/></button>
              &nbsp;
              <button class="btn btn-primary h-10" v-on:click="(edit=!edit)"><img :src="edit&&'./pen.svg'||'./eye.svg'" width="25"/></button>            
            </span>
          </div>
          &nbsp;<br/>
          <div class="tabs w-[345px] mx-auto">
            <a :class="'tab tab-lifted '+((filter == 0   )&&'tab-active')" v-on:click="filter = 0   ">Base</a> 
            <a :class="'tab tab-lifted '+((filter == -500)&&'tab-active')" v-on:click="filter =-500">Néfaste</a> 
            <a :class="'tab tab-lifted '+((filter == -999)&&'tab-active')" v-on:click="filter =-999">Triggers</a>
            <a :class="'tab tab-lifted '+((filter ==  999)&&'tab-active')" v-on:click="filter = 999">Obstable</a>
          </div>
          <div class="min-w-full w-full overflow-x-hidden overflow-y-hidden flex justify-start items-start flex-wrap h-auto">
            <template v-for="terrain in DATA?.terrain.value" :key="'ter_'+terrain.id">
              <template v-if="((typeof terrain === 'object') && (terrain.hauteur == filter))">
                <div
                  :class="('w-24 h-24 m-2 flex items-center border-4 border-solid select-none border-transparent '+((lastTerrainId==terrain.id)&&'border-red-700'))"
                  :style="('background-color:'+terrain?.couleur)+';box-shadow:0 0 3px black;'"
                  v-on:click="setTerrain(terrain?.id||0)">
                  <span class="block text-center text-white font-bold opacity-100 bg-gray-700/50 w-full py-2 text-sm">{{terrain.name}}</span>
                </div>
              </template>
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

  let carte = Array(25).fill(Array(25).fill({t:0,h:0,p:0,i:0,c:[]}))
  carte = carte.map(cx => cx.map((st:object) => ({...st})))
  const Terrain = reactive<Topo>({ topo:carte, description:"" })

  const filter = ref<number>(0)

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
    @apply h-full w-full hidden overflow-x-hidden overflow-y-auto;
    max-height: calc(100% - 44px);
  }
  .edtmap--panel.active { @apply flex; }
</style>
