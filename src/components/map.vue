<template>
  <div class="block relative w-full h-full">
    <div class="w-full h-full grid bg-grid" :style="'grid-template-columns:repeat('+gx+',1fr)'" v-if="(typeof DATA !== 'undefined')">
      <template v-for="y in gx" :key="'gridXmap_' + y">
        <template v-for="x in gx" :key="'gridYmap_' + x">
          <div
            :class="'block w-[20px] h-[20px] border-[1px] border-solid border-transparent text-xs text-right select-none box-border '+((x==posPerso)&&(y==posPerso)&&'border-black blink'|| '')+(props.edit&&' border-gray-500/60'||'')"
            :style="'background-color:'+Color(x,y)+';width:calc(740px / '+gx+');height:calc(740px / '+gx+');'+Img(x,y)"
            v-html="Delta(x,y)"
            :title="Title(x,y)"
            v-on:click="setPos(x,y)"></div>
        </template>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref ,inject, watch } from "vue"
  import type { Ref } from 'vue'
  import { sTopo, Tterrain } from "../type"

  const props = defineProps<{
    sel:{
        x:number
        y:number
    },
    grille:sTopo,
    edit:boolean
  }>()

  const gx = 37
  const posPerso = Math.floor(gx/2)+1

  //type TRefTerrain = { terrain: Ref<Tterrain[]> }

  const DATA = inject<{ terrain: Ref<Tterrain[]> }>('terrain')

  const setPos = (x:number, y:number) => {
    props.sel.x= x - 19 + props.sel.x
    props.sel.y= y - 19 + props.sel.y
  }

  let data:Tterrain[] = []

  let lastColor = 'transparent'
  const Color = (x:number,y:number) => {
    if (data.length==0){
      DATA?.terrain.value.forEach(element => {
        data[element.id]={
          id:         element.id,
          name:       element.name,
          hauteur:    element.hauteur,
          difficulte: element.difficulte,
          couleur:    element.couleur,
          image:      element.image,
          plafond:    element.plafond,
          props:      element.props
        }
      })
    }
    let X = props.sel.x + ( x - 19 )
    let Y = props.sel.y + ( y - 19 )
    if (X<0) return 'black'
    if (Y<0) return 'black'
    if (X>(props.grille.length-1)) return 'black'
    if (Y>(props.grille.length-1)) return 'black'
    let id = props.grille[X][Y].t
    if (id==0) return 'blank'
    if (typeof DATA ==='undefined') return 'transparent'
    if (data[id].couleur!=='orange') lastColor = data[id].couleur
    if (X<2) lastColor = data[props.grille[X+1][Y].t||0]?.couleur || 'transparent'
    if (X>gx-3) lastColor = data[props.grille[X-1][Y].t||0]?.couleur || 'transparent'
    if (Y<2) lastColor = data[props.grille[X][Y+1].t||0]?.couleur || 'transparent'
    if (Y>gx-3) lastColor = data[props.grille[X][Y-1].t||0]?.couleur || 'transparent'
    return data[id]?.couleur=='orange'?lastColor:data[id]?.couleur
  }

  const Img = (x:number,y:number) => {
    let X = props.sel.x + ( x - 19 )
    let Y = props.sel.y + ( y - 19 )
    if (X<0) return ''
    if (Y<0) return ''
    if (X>(props.grille.length-1)) return ''
    if (Y>(props.grille.length-1)) return ''
    let id = props.grille[X][Y].t
    if (id==0) return ''
    if (typeof DATA ==='undefined') return ''
    return 'background-image:url('+data[id]?.image+');background-size:20px 20px;background-repeat:no-repeat;background-position:center center;'
  }

  const Title = (x:number,y:number) => {
    let X = props.sel.x + ( x - 19 )
    let Y = props.sel.y + ( y - 19 )
    if (X<0) return ''
    if (Y<0) return ''
    if (X>(props.grille.length-1)) return ''
    if (Y>(props.grille.length-1)) return ''
    let id = props.grille[X][Y].t
    if (id==0) return ''
    return data[id].name
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
    0%  { @apply border-gray-700/100  }
    49% { @apply border-gray-700/100  }
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
