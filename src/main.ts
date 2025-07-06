import './assets/main.css'

import App from './App.vue'
import router from './router'

import { firebaseApp } from '@/firebase'
import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { VueFireDatabaseOptionsAPI } from 'vuefire'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth(), VueFireDatabaseOptionsAPI()],
})
app.use(router)
app.use(pinia)

app.mount('#app')
