import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as Elicons from '@element-plus/icons-vue'

const app = createApp(App)

app.use(ElementPlus).mount('#app')

Object.keys(Elicons).forEach(function (key) {
    app.component(Elicons[key].name, Elicons[key])
})


