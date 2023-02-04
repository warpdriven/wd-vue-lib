import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import "font-awesome/css/font-awesome.min.css"

const app = createApp(App)

app.use(ElementPlus).mount('#app')



