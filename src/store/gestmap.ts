import { defineStore } from "pinia"
import { TPosition } from "../type"
import { ref } from 'vue'
import type { Ref } from 'vue'

export type TMaps = {
    t:number
    h:number 
    p:number 
    i:number
    c:number[]
}

type TStore = {
    _all:TMaps[][]
    _map:Ref<TMaps[][]>
    w:number
    h:number
    x:number
    y:number
    mw:number
    mh:number
    xm:number
    ym:number
    viewRange:number
    title:string
    reqPending:boolean
}

export const useGestMap = defineStore(
    'userGestMap',{
        state(){
            return {
                _map:ref<TMaps[][]>([]),
                _all:[],
                title:'',
                w:0,
                h:0,
                x:0,
                y:0,
                mw:0,
                mh:0,
                xm:0,
                ym:0,
                viewRange:37,
                reqPending:true
            } as TStore
        },
        getters:{
            all(state){
                return (x:number,y:number) => {
                    try {
                        return state._all[x][y]
                    } catch(e){
                        return { t:25, h:0,p:0,i:0,c:[] }
                    }
                }
            },
            map(state){
                return state._map;
            }
        },
        actions:{
            create(w:number,h:number){
                let carte = Array(w).fill(Array(h).fill({t:2,h:0,p:0,c:[]}))
                this._all = carte.map(cx => cx.map((st:object) => ({...st})))
                this.w = w
                this.h = h
                this.getPartialMap()
                this.mw = w / 2
                this.mh = h / 2
                this.reqPending = false
            },
            setTerrain(x:number,y:number,t:number){ try { this._all[this.x+x][this.y+y].t = t } catch (e){ } },
            setHauteur(x:number,y:number,h:number){ try { this._all[this.x+x][this.y+y].h = h } catch (e){ } },
            setPlafond(x:number,y:number,p:number){ try { this._all[this.x+x][this.y+y].p = p } catch (e){ } },
            setInteraction(x:number,y:number,i:number){ try { this._all[this.x+x][this.y+y].i = i } catch (e){ } },
            setContenteur(x:number,y:number,t:number|null,h:number|null,p:number|null,i:number|null,c:number[]|null){
                try {
                    if (t!==null) this._all[this.x+x][this.y+y].t = t
                    if (h!==null) this._all[this.x+x][this.y+y].h = h
                    if (p!==null) this._all[this.x+x][this.y+y].p = p
                    if (i!==null) this._all[this.x+x][this.y+y].i = i
                    if (c!==null) this._all[this.x+x][this.y+y].c = c                
                } catch(e){ }
            },
            getTerrain(x:number,y:number){
                return this._all[this.x+x][this.y+y]
            },
            getPartialMap(){
                let lx = this.x + this.viewRange - 1
                let ly = this.y + this.viewRange - 1
                let p = []
                p = this._all.filter((ms,x) => this.x<=x && x<=lx )
                this._map.value = p.map((ms,x) => ms.filter((m,y)=> this.y<=y && y<=ly)) || []
            },
            calMaxPost(){
                let xm = this.w - this.viewRange
                let ym = this.h - this.viewRange
                this.xm = xm>0?xm:0
                this.ym = ym>0?ym:0
            },
            position(x:number|null=null,y:number|null=null):TPosition|null{
                if (x==null || y==null) return { x:this.x, y:this.y }
                this.x = (x<=0?0:(x>=this.w?this.w-1:x))
                if (this.x>=this.w-this.viewRange) this.x = this.w - this.viewRange
                this.y = (y<=0?0:(y>=this.h?this.h-1:y))
                if (this.y>=this.h-this.viewRange) this.y = this.h - this.viewRange
                this.getPartialMap()
                return null
            }
        }
    }
)