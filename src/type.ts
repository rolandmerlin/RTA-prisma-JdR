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
}

export type TGrille = Ref<Tterrain>;