import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Router from "@/router";

import App from './App.vue'


const pinia = createPinia()
const app = createApp(App)

app.use(Router,[pinia,VueAxios, axios ])
app.mount('#app')
