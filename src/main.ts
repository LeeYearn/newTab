import './assets/main.css'
import './assets/icon/iconfont.css'
import './assets/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import Time from './components/Time.vue'
import Search from './components/Search.vue'


createApp(App).mount('#app')
createApp(Time).mount('#time')
createApp(Search).mount('#search')
