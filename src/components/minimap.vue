<template>
    <div class="w-full">
        <div class="w-full h-full mx-auto" :style="'width:'+props.grille.length+'px;height:'+props.grille.length+'px'">
            <canvas id="carte" :width="props.grille.length" :height="props.grille.length"></canvas>
            <!--canvas id="brouillard" class="w-full h-full"></canvas-->        
        </div>
    </div>
</template>
<script setup lang="ts">
    import { inject, ref, computed, onMounted, watch } from 'vue'
    import type { Ref } from 'vue'
    import { Tterrain } from "../type"

    const props = defineProps(['grille'])

    type TRefTerrain = { terrain: Ref<Tterrain[]> }

    const DATA = inject<{ terrain: Ref<Tterrain[]> }>('terrain')

    const SCM = () => {
        const canvas = document.getElementById('carte') as HTMLCanvasElement;
        if (DATA===undefined) return
        if (typeof canvas == 'undefined') return 
        const ctx = canvas.getContext('2d')
        if (ctx === null) return 

        let length = props.grille.length
        for(let x=0;x<length;x++){
            for(let y=0;y<length;y++){
                ctx.fillStyle = DATA?.terrain.value[props.grille[x][y].t-1]?.couleur || 'black'
                ctx.fillRect(x,y,1,1)
            }
        }        
    }

    const Mounted = ref<boolean>(false)
    onMounted(()=>{ Mounted.value = true })
    watch(props.grille,()=> SCM() )
    let hwnd = setInterval(()=>{
        if (DATA===undefined) return
        if (DATA.terrain.value===undefined) return
        clearInterval(hwnd)
        SCM()
    },1000)
</script>
<style lang="postcss">

</style>