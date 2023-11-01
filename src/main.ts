import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import AntDesignVue from 'ant-design-vue'
import router from './routes'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(AntDesignVue)
app.use(router)
app.mount('#app')
