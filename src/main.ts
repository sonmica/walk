import './assets/main.css'

import App from './App.vue'
import router from './router'


import { firebaseApp } from './firebase'
import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import { VueFireDatabaseOptionsAPI } from 'vuefire'

const app = createApp(App)

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
    VueFireDatabaseOptionsAPI()
  ],
})
app.use(router)

app.mount('#app')
