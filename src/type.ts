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
    hauteur:number 
    difficulte:number
    couleur:string
    image:string
}

export type Topo = {
    t:number    /// Type de terrain
    h:number    /// Hauteur de terrain
    p:number    /// Hauteur de profond
    i:number    /// Item du conteneur
    c:number[]  /// Liste d'items
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
}>;