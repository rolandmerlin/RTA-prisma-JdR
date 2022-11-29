import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
    auth:{
        pseudo:string
        token:string
        email:string
    }|false
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
       auth:false,
    },
    getters:{
        auth:state=>state.auth,
    },
    mutations:{
        auth:(state,a)=>{
            console.log('Store commit auth = ',a)
            state.auth=a
        }
    }
})