import { createApp } from 'vue'
import App from './App.vue'
import router from './shared/router'
import './shared/assets/main.css'
import axios from 'axios'

const app = createApp(App)

app.use(router)

app.mount('#app')
