import { defineStore } from 'pinia'
import pinia from './pinia'

/**                 TYPE               */

export type TTypeTerrain = {
    id?:number
    name:string
    typeTerrain:number
    hauteur:number
    difficulte:number
    couleur:string
    image:string
    plafond:number
    props:string
}

/** CONSTANT DE FILTRE  */

export const TypeTerrain = {
    BASE:0,
    NEFASTE:1,
    TRIGGER:2,
    OBSTACLE:3
}

/**             STORE PINIA           */

const useTypeTerrainStore = defineStore(
    'userStore',{
    state(){
        return {
            terrains:[] as TTypeTerrain[],
            reqPending:true
        }
    },
    getters:{
        byId(state){ return (id:number) => ( state.terrains.find(terrain => terrain.id === id) ) },
        byType(state){ return (typeTerrain:number) => ( state.terrains.filter(terrain => terrain.typeTerrain === typeTerrain )) }
    }
})
export const typeTerrain = useTypeTerrainStore(pinia)
export const typeTerrainById = (id:number) => typeTerrain.byId(id)
export const typeTerrainByType = (typeid:number) => typeTerrain.byType(typeid)
export const typeTerrainSet = (terrains:TTypeTerrain[]) => {
    typeTerrain.terrains = terrains
    typeTerrain.reqPending = false
    console.log(typeTerrain.byId(1))
    console.log(typeTerrain.byType(0))
}
