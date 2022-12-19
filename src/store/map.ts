import { defineStore } from 'pinia'
import pinia from './pinia'

/**                 TYPE               */

export type TMaps = {
    t:number
    h:number 
    p:number 
    i:number
    c:number[]
}

type TStore = {
    _maps:TMaps[][]
    w:number
    h:number
    mw:number
    mh:number
    title:string
    reqPending:boolean
}

/**             STORE PINIA           */

export const useMapStore = defineStore(
    'userMap',{
    state(){
        return {
            _maps:[],
            title:'',
            w:0,
            h:0,
            mw:0,
            mh:0,
            reqPending:true
        } as TStore
    },
    getters:{
        maps(state){
            return (x:number,y:number) => {
                try {
                    return state._maps[x][y]
                } catch(e){
                //    console.log(x,y)
                    return { t:25, h:0,p:0,i:0,c:[] }
                }
            }
        }
    },
    actions:{
        create(w:number,h:number){
            let carte = Array(w).fill(Array(h).fill({t:2,h:0,p:0,c:[]}))
            this._maps = carte.map(cx => cx.map((st:object) => ({...st})))
            this.w = w
            this.h = h
            this.mw = w / 2
            this.mh = h / 2
            this.reqPending = false
          //  console.log(this._maps)
        },
        setTerrain(x:number,y:number,t:number){ try { this._maps[x][y].t = t } catch (e){ } },
        setHauteur(x:number,y:number,h:number){ try { this._maps[x][y].h = h } catch (e){ } },
        setPlafond(x:number,y:number,p:number){ try { this._maps[x][y].p = p } catch (e){ } },
        setInteraction(x:number,y:number,i:number){ try { this._maps[x][y].i = i } catch (e){ } },
        setContenteur(x:number,y:number,t:number|null,h:number|null,p:number|null,i:number|null,c:number[]|null){
            try {
                if (t!==null) this._maps[x][y].t = t
                if (h!==null) this._maps[x][y].h = h
                if (p!==null) this._maps[x][y].p = p
                if (i!==null) this._maps[x][y].i = i
                if (c!==null) this._maps[x][y].c = c                
            } catch(e){ }
        }
    }
})
