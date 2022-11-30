<template>
  <div class="block relative w-full h-full">
    <div class="w-full h-full grid" style="grid-template-columns:repeat(37,1fr);" v-if="(typeof DATA !== 'undefined')">
      <template v-for="x in 37" :key="'gridXmap_' + x">
        <template v-for="y in 37" :key="'gridYmap_' + y">
          <div class="block w-full h-full border-[1px] border-gray-300 text-xs text-right" :style="'background-color:'+Color(x,y)" v-html="Delta(x,y)"></div>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, computed } from "vue";
import type { Ref } from 'vue';
import { Tterrain } from "../type";
const props = defineProps({
  grille: { type: Object, default: ([]) },
  dx:{ type: Number, default: 0 },
  dy:{ type:Number, default: 0 }
});

type TRefTerrain = { terrain: Ref<Tterrain[]> }

const DATA = inject<{ terrain: Ref<Tterrain[]> }>('terrain');

const Color = (x:number,y:number) => {
  let X = x - 18 + props.dx
  let Y = y - 18 + props.dy
  if (X<0) return 'black'
  if (Y<0) return 'black'
  if (X>(props.grille.length-1)) return 'black'
  if (Y>(props.grille.length-1)) return 'black'
  let id = props.grille[X][Y].t
  if (id==0) return 'blank'
  if (typeof DATA ==='undefined') return
  //if (typeof DATA.terrain.value[id-1] === 'undefined') console.log(DATA.terrain.value[0])
  return DATA.terrain.value[id-1]?.couleur
}

const Delta = (x:number,y:number) => {
  let X = x - 18 + props.dx
  let Y = y - 18 + props.dy
  let h 
  if (X<0) return ''
  if (Y<0) return ''
  if (X>(props.grille.length-1)) return '-1'
  if (Y>(props.grille.length-1)) return '-1'
  h = props.grille[props.dx][props.dy].h - props.grille[X][Y].h
  if (h==0) return ''
  return '<span class="'+((h>0)?'text-green-800 font-bold':'text-red-800 font-bold')+'">'+Math.abs(h)+'</span>'
}

</script>
<style lang="postcss"></style>
