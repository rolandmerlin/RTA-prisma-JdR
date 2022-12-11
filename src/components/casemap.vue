<template>
    <div
            :class="'block w-[20px] h-[20px] border-[1px] border-solid border-transparent text-xs text-right select-none box-border '+(props.blink?'border-black blink':'')+(props.edit?' border-gray-500/60':'')"
            :style="Style"
            v-html="props.case.hauteur"
            :title="props.case.title||''"></div>
</template>
<script setup lang="ts">
    import { computed } from 'vue'

    type TCase = {
        color:string
        style:string
        title:string
        hauteur:string        
    }

    const props = defineProps<{
        case:TCase,
        nmbcx:number,
        blink:boolean,
        edit:boolean
    }>()

   // console.log(props.case)

    const Style = computed<string>(()=>{
      return 'background-color:'+props.case.color+';width:calc(720px / ${props.nmbcx});height:calc(720px / ${props.nmbcx});'+ props.case.style
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
</style>