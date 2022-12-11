import { createApp } from 'vue'
import { TSocket } from './lib/websocket'
import App from './App.vue'
import router from './router/index'
import pinia from './store/pinia'
import './style.css'

//// Permet l'acces à l'API partout dans l'application
declare global {
    interface Window {
        Wsocket?:TSocket
    }
}

const AppVue = createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')