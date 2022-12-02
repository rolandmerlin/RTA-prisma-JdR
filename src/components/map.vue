<template>
  <div class="block relative w-full h-full">
    <div class="w-full h-full grid" :style="'grid-template-columns:repeat('+gx+',1fr)'" v-if="(typeof DATA !== 'undefined')">
      <template v-for="x in gx" :key="'gridXmap_' + x">
        <template v-for="y in gx" :key="'gridYmap_' + y">
          <div
            :class="'block w-full h-full border-[2px] border-solid border-transparent text-xs text-right '+((x==posPerso)&&(y==posPerso)&&'border-black blink'|| '')"
            @click="Sel(x,y)"
            :style="'background-color:'+Color(x,y)+';width:calc(850px / '+gx+');height:calc(850px / '+gx+') '"
            v-html="Delta(x,y)"></div>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref ,inject, computed } from "vue";
  import type { Ref } from 'vue';
  import { Tterrain } from "../type";
  const props = defineProps({
    grille: { type: Object, default: ([]) },
    dx:{ type: Number, default: 0 },
    dy:{ type:Number, default: 0 }
  });

  const gx = 37;
  const posPerso = Math.floor(gx/2)+1

  type TRefTerrain = { terrain: Ref<Tterrain[]> }

  const DATA = inject<{ terrain: Ref<Tterrain[]> }>('terrain');

  const Sx = ref(posPerso)
  const Sy = ref(posPerso)

  const Sel = (x:number,y:number) => {
    Sx.value = x
    Sy.value = y
  }

  const Color = (x:number,y:number) => {
    let X = x - posPerso + props.dx
    let Y = y - posPerso + props.dy
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
    let X = x - posPerso + props.dx
    let Y = y - posPerso + props.dy
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
</style>
