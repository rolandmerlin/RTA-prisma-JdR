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
    private w:number=0
    private h:number=0
    public all:TMaps[][]
    constructor(public viewRange:number){ 
        let GP = this.getPartialMap()
        this.calMaxPost()
        this.w = this._map.length
        this.h = this._map[0]?.length||0
        this.xm = this.w - viewRange 
        this.all = mapStore._maps
    }
  //  setPartialMap(){
  //      this._map.map((ms,x)=>{ ms.map((m,y)=>{ mapStore._maps[x+this.x][y+this.y] = m }) })
  //  }
    getPartialMap(){
        let lx = this.x + this.viewRange - 1
        let ly = this.y + this.viewRange - 1
        this._map = mapStore._maps.filter((ms,x) => this.x<=x && x<=lx )
        this._map = this._map.map((ms,x) => ms.filter((m,y)=> this.y<=y && y<=ly))
        return this._map
    }
    position(x:number|null=null,y:number|null=null):TPosition|null{
        if (x==null || y==null) return { x:this.x, y:this.y }
        this.x = (x<=0?0:(x>=this.w?mapStore.w-1:x))
        if (this.x>=mapStore.w-this.viewRange) this.x = mapStore.w - this.viewRange
        this.y = (y<=0?0:(y>=this.h?mapStore.h-1:y))
        if (this.y>=mapStore.h-this.viewRange) this.y = mapStore.h - this.viewRange
        return null
    }
    calMaxPost(){
        let xm = mapStore.w - this.viewRange
        let ym = mapStore.h - this.viewRange
        this.xm = xm>0?xm:0
        this.ym = ym>0?ym:0
    }
    map(){ return ref(this._map); }
    All() { return this.all; }
}

const mapgest = new CMapGest(37)
mapgest.position(0,0)

watch(mapStore._maps,()=>{ mapgest.getPartialMap() })

export default CMapGest
export const p_maps = mapgest.map()