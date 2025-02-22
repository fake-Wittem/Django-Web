import {createApp} from 'vue'
import SvgIcon from '@/icons'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/reset.css'
import '@/assets/styles/border.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'


// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')

const app = createApp(App)
SvgIcon(app)
app.use(store)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
