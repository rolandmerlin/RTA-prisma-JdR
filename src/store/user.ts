import { defineStore } from 'pinia'

import axios,{ setToken } from '../lib/axios'
import { TResponeApi } from '../types/type'

/**                 TYPE               */

export type TUser = {
    username:string
    email:string
    token:string    
}

/**                STORE PINIA           */

export const useUserStore = defineStore(
    'userStore',
    {
        state(){
            return {
                user:null as TUser|null,
                reqPeding:false as boolean
            }
        },
        getters:{
            auth(state){ return (state.user === null)?false:(state.user.token!=='') }
        },
        actions:{
            setUser(user:TUser|null){ this.user = user }
        }
    }
)

/**              Function Interaction asynchrone           */

import pinia from './pinia'

const userStore = useUserStore(pinia)

export const auth_login = (username:string,password:string) => {
    if (userStore.reqPeding) return 
    userStore.reqPeding = true
    axios.put<TResponeApi<TUser>>('/api/auth/',{ username, password })
        .then(d => {
            userStore.reqPeding = false
            userStore.user = d.data.params
            setToken(d.data.params.token)
        }).catch(e => {
            userStore.reqPeding = false
            userStore.user = null
            setToken('')
        }) 
}
export const auth_logout = () => {
    if (userStore.reqPeding) return 
    userStore.reqPeding = true
    axios.delete('/api/auth')
        .then(d=> {
            userStore.user = d.data.params || null
            userStore.reqPeding = false
            setToken('')
        }).catch(e => {
            userStore.reqPeding = false
        })
}