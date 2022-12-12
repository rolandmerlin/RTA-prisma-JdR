import { TPosition } from './../type';
import { TMaps, useMapStore } from './../store/map'
import pinia from '../store/pinia'
import { ref,watch } from 'vue'

const mapStore = useMapStore(pinia)

class CMapGest {
    private _map:TMaps[][] = []
    private x:number=0
    private y:number=0
    private xm:number=0
    private ym:number=0
    constructor(private viewRange:number){ 
        let GP = this.getPartialMap()
        this.calMaxPost()
    }
    setPartialMap(){
        this._map.map((ms,x)=>{ ms.map((m,y)=>{ mapStore._maps[x+this.x][y+this.y] = m }) })
    }
    getPartialMap(){
        this._map = []
        for(let kx = 0; kx<this.viewRange; kx++ ){
            this._map.push([])
            for(let ky = 0; ky<this.viewRange; ky++)
                this._map[kx].push(mapStore.maps(kx+this.x,ky+this.y))            
        }
        return this._map
    }
    position(x:number|null=null,y:number|null=null):TPosition|null{
        if (x==null || y==null) return { x:this.x, y:this.y }
        this.x = (x<=0?0:(x>=mapStore.w?mapStore.w-1:x))
        this.y = (y<=0?0:(y>=mapStore.h?mapStore.h-1:y))
        return null
    }
    calMaxPost(){
        let xm = mapStore.w - this.viewRange
        let ym = mapStore.h - this.viewRange
        this.xm = xm>0?xm:0
        this.ym = ym>0?ym:0
    }
    map(){ return ref(this._map); }
}

const mapgest = new CMapGest(37)
mapgest.position(0,0)

watch(mapStore._maps,()=>{ mapgest.getPartialMap() })

export default mapgest
export const p_maps = mapgest.map()