import { TSocket } from './lib/websocket'
import 'tw-elements'

//// Permet l'acces à l'API partout dans l'application
declare global {
    interface Window {
        Wsocket?:TSocket
    }
}

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {store} from './store/index'
import router from './router/index'

const AppVue = createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
