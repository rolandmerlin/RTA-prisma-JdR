<template>
  <div class="block relative w-full h-full">
    <div class="w-full h-full grid bg-grid" :style="'grid-template-columns:repeat('+vx+',1fr)'" v-if=" !typeTerrain.reqPending ">
      <template v-for="y in mapgest.viewRange" :key="'gridXmap_' + y">
        <template v-for="x in mapgest.viewRange" :key="'gridYmap_' + (x-1) + '_' + (y-1)">
          <casemap :data-pos="`${x-1} / ${y-1}`" :case="Case(x-1,y-1)" :blink=" x-1 == props.sel.x && y-1 == props.sel.y" :nmbcx="vx" :edit="edit" v-on:click="setPos(x-1,y-1)"/>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { watch } from "vue"
  import { typeTerrain, typeTerrainById } from "../store/typeTerrain"
  import casemap from './casemap.vue'
  import { useMapStore } from "../store/map"

  import CMapGest from '../libdesign/mapGest'

  const mapStore = useMapStore()
  mapStore.create(37,37)

  const mapgest = new CMapGest(37)
  let map = mapgest.map().value

  const props = defineProps<{
    sel:{
        x:number
        y:number
    },
    edit:boolean
  }>()
  const vx = 37
  const vm = Math.ceil(vx/2)
  props.sel.x = Math.floor(mapStore.w/2)
  props.sel.y = Math.floor(mapStore.h/2)

  const setPos = (x:number,y:number) => {
    props.sel.x = x
    props.sel.y = y
  }

  const Case = (x:number,y:number) => {
    let c
    try { 
      c = map[x][y]
    } catch (e){
      console.log('Case MAP = ',`X = ${x}, Y = ${y} , MAPS = `,map)
      c = { t:1, h:0, i:0, c:[] }
    }
    let h = c?.h || 0
    let lastColor = 'transparent'
    let lid = 0
    try {
      if (y>0 && y<=mapStore.w){
        if (x<=vm) lid = map[x+1][y].t
        if (x>=vm) lid = map[x-1][y].t        
      }
      if (x>0 && y<=mapStore.h){
        if (y<=vm) lid = map[x][y+1].t
        if (x>=vm) lid = map[x][y-1].t        
      }
    } catch (e){ }

    lastColor = typeTerrainById(lid)?.couleur || lastColor
    return {
      style   : 'background-image:url('+(typeTerrainById(c.t)?.image||'')+');background-size:20px 20px;background-repeat:no-repeat;background-position:center center;',
      title   : typeTerrainById(c.t)?.name || "",
      hauteur : '<span class="'+((c.h>0)?'text-green-800 font-bold':'text-red-800 font-bold')+'">'+(h?Math.abs(c.h):'')+'</span>',
      color   : 
        (
          typeTerrainById(c.t)?.couleur!='orange'?(typeTerrainById(c.t)?.couleur||'black'):lastColor
        )
    }
  }

  watch(props.sel,()=>{
    if (props.sel.x<0) props.sel.x = 0
    if (props.sel.x>=mapStore.w) props.sel.x = mapStore.w - 1 
    if (props.sel.y<0) props.sel.y = 0
    if (props.sel.y>=mapStore.h) props.sel.y = mapStore.h - 1
  })

</script>
<style lang="postcss">
  .bg-grid {
    background:linear-gradient(45deg,0% white, 50% black, 100% white);
    background-size: 25px 25px;
  }
</style>
