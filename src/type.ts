import type { Ref } from 'vue'

export type Tmessage = {
    id?:number
    pseudo?:string
    email?:string
    token?:string
    error?:string
    login?:string
    password?:string
    success?:string
    terrain?:Tterrain[]
    user?:{
        id:number
        pseudo:string
        token:string
    }
}

export type LoginAuth = {
    login:Ref<string>
    passwd:Ref<string>
    errorLogin:Ref<string>
    time:Ref<number>
}

export type Tterrain = {
    id:number
    name:string
    typeTerrain:number
    hauteur:number 
    difficulte:number
    couleur:string
    image:string
    plafond:number
    props:string
}

export type sTopo = {
    t:number    /// Type de terrain
    h:number    /// Hauteur de terrain
    p:number    /// Hauteur de plafond
    i:number    /// Item du conteneur
    c:number[]  /// Liste d'items
}[][]

export type Topo = {
    topo:sTopo
    description:string
}

export type Tpiege = {

}

export type Poste = {
    id:number
    name:String
    life:number
    desc:String
}

export type TGrille = Ref<{
    terrain:Tterrain
    piege?:Tpiege
}>

export type TResponeApi<T> = {
    action:string
    result:boolean
    params:T
}

export type TPosition = {
    x:number
    y:number
}