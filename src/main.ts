import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import AntDesignVue from 'ant-design-vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(AntDesignVue)
app.mount('#app')
