<template>
  <div class="block relative w-full h-full">
    <div class="w-full h-full grid bg-grid" :style="'grid-template-columns:repeat('+vx+',1fr)'" v-if="!typeTerrain.reqPending">
      <template v-for="y in vx" :key="'gridXmap_' + y">
        <template v-for="x in vx" :key="'gridYmap_' + x + '_' + y">
          <casemap :case="Case(x,y)" :blink=" x == vm && y == vm" :nmbcx="vx" :edit="edit" v-on:click="setPos(x,y)"/>
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

  const mapStore = useMapStore()

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

  const setPos = (x:number, y:number) => {
    props.sel.x =  props.sel.x + x - vm
    props.sel.y = props.sel.y + y - vm
  }

  const CalPos = ( x:number, y:number ) => {
    let X = props.sel.x + x - vm
    let Y = props.sel.y + y - vm
    return {
      X,
      Y,
      B: (X<0) || (X>=mapStore.w) || (Y<0) || (Y>=mapStore.h)
    }
  }

  const Case = (x:number,y:number) => {
    const { X, Y, B } = CalPos(x,y)
    let id
    let h
    let lastColor
    if (B){
      id=0
      h=0
      lastColor = 'black'
    } else {
      id = mapStore.maps(X,Y).t
      h = mapStore.maps(X,Y).h - mapStore.maps(X,Y).h
      lastColor = 'transparent'
      if (X<mapStore.mw && Y>0 && Y<mapStore.h-1) lastColor = typeTerrainById(mapStore.maps(X+1,Y).t||0)?.couleur || 'black'
      if (X>mapStore.mw && Y>0 && Y<mapStore.h-1) lastColor = typeTerrainById(mapStore.maps(X-1,Y).t||0)?.couleur || 'black'
      if (Y<mapStore.mh && X>0 && X<mapStore.w-1) lastColor = typeTerrainById(mapStore.maps(X,Y+1).t||0)?.couleur || 'black'
      if (Y>mapStore.mh && X>0 && X<mapStore.w-1) lastColor = typeTerrainById(mapStore.maps(X,Y-1).t||0)?.couleur || 'black'
    }

    return {
      style   : 'background-image:url('+(typeTerrainById(id)?.image||'')+');background-size:20px 20px;background-repeat:no-repeat;background-position:center center;',
      title   : typeTerrainById(id)?.name || "",
      hauteur : '<span class="'+((h>0)?'text-green-800 font-bold':'text-red-800 font-bold')+'">'+(h?Math.abs(h):'')+'</span>',
      color   : 
        (
          B?
          'black'
          :typeTerrainById(id)?.couleur=='orange'?lastColor:(typeTerrainById(id)?.couleur||'black')
        )
    }
  }

  watch(mapStore._maps,()=>{
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
