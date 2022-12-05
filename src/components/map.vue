<template>
  <div class="block relative w-full h-full bg-grid">
    <div class="w-full h-full grid" :style="'grid-template-columns:repeat('+gx+',1fr)'" v-if="(typeof DATA !== 'undefined')">
      <template v-for="y in gx" :key="'gridXmap_' + y">
        <template v-for="x in gx" :key="'gridYmap_' + x">
          <div
            :class="'block w-full h-full border-[1px] border-solid border-transparent text-xs text-right '+((x==posPerso)&&(y==posPerso)&&'border-black blink'|| '')+(props.edit&&' border-gray-500/60'||'')"
            :style="'background-color:'+Color(x,y)+';width:calc(850px / '+gx+');height:calc(850px / '+gx+');'"
            v-html="Delta(x,y)"
            v-on:click="setPos(x,y)"></div>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref ,inject, watch } from "vue";
  import type { Ref } from 'vue';
  import { sTopo, Tterrain } from "../type";

  const props = defineProps<{
    sel:{
        x:number
        y:number
    },
    grille:sTopo,
    edit:boolean
  }>();

  const gx = 37;
  const posPerso = Math.floor(gx/2)+1

  type TRefTerrain = { terrain: Ref<Tterrain[]> }

  const DATA = inject<{ terrain: Ref<Tterrain[]> }>('terrain');

  const setPos = (x:number, y:number) => {
    props.sel.x= x - 19 + props.sel.x
    props.sel.y= y - 19 + props.sel.y
  }

  const Sel = (x:number,y:number) => {
    props.sel.x = x - 18 + props.sel.x
    props.sel.y = y - 18 + props.sel.y
  }

  const Color = (x:number,y:number) => {
    let X = props.sel.x + ( x - 19 )
    let Y = props.sel.y + ( y - 19 )
    if (X<0) return 'black'
    if (Y<0) return 'black'
    if (X>(props.grille.length-1)) return 'black'
    if (Y>(props.grille.length-1)) return 'black'
    let id = props.grille[X][Y].t
    if (id==0) return 'blank'
    if (typeof DATA ==='undefined') return 'transparent'
    //if (typeof DATA.terrain.value[id-1] === 'undefined') console.log(DATA.terrain.value[0])
    return DATA.terrain.value[id-1]?.couleur
  }

  const Delta = (x:number,y:number) => {
    let X = props.sel.x + ( x - 19 )
    let Y = props.sel.y + ( y - 19 )
    let h 
    if (X<0) return ''
    if (Y<0) return ''
    if (X>(props.grille.length-1)) return '-1'
    if (Y>(props.grille.length-1)) return '-1'
    h = props.grille[X][Y].h - props.grille[X][Y].h
    if (h==0) return ''
    return '<span class="'+((h>0)?'text-green-800 font-bold':'text-red-800 font-bold')+'">'+Math.abs(h)+'</span>'
    //return `<span class="text-green-800 font-bold text-xs">${X},${Y}</span>'`
  }

  watch(props.sel,()=>{
    if (props.sel.x<0) props.sel.x = 0
    if (props.sel.x>(props.grille.length-1)) props.sel.x = (props.grille.length-1)
    if (props.sel.y<0) props.sel.y = 0
    if (props.sel.y>(props.grille.length-1)) props.sel.y = (props.grille.length-1)
  })

</script>
<style lang="postcss">
  @keyframes blink {
    0%  { @apply border-gray-300/25   }
    49% { @apply border-gray-300/25   }
    50% { @apply border-gray-300/75   }
    99% { @apply border-gray-300/75   }
  }
  .blink {
    animation: blink 0.75s infinite;
    @apply transition-colors duration-[0];
  }
  .bg-grid {
    background:linear-gradient(45deg,0% white, 50% black, 100% white);
    background-size: 25px 25px;
  }
</style>
